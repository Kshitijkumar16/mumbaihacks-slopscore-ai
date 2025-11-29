import {
  HumanMessage,
  BaseMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { StateGraph, END, START, Annotation } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { aiConfig } from "@/config";
import { system_prompt } from "@/prompts/claim-extractor-agent-prompts";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { getYoutubeTranscript } from "@/lib/tools/youtube-transcript";

// Initialize LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: aiConfig.models.llm.apiKey,
  temperature: 0,
});

// Define the state
const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  transcript: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  claims: Annotation<any[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  verification_results: Annotation<any[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  next: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "supervisor",
  }),
});

// Supervisor Node
const supervisorNode = async (state: typeof GraphState.State) => {
  const supervisorSystemPrompt = `You are a supervisor tasked with managing a conversation between the following workers: [ClaimVerifier]. 
  
  1. If the user provides a YouTube URL and you don't have the transcript yet, call 'get_youtube_transcript' to get it.
  2. Once you have the transcript, call 'ClaimVerifier' to extract and verify claims.
  3. Once verification is done, respond with 'FINISH'.

  Current Transcript Status: ${state.transcript ? "Available" : "Missing"}
  Current Claims Status: ${
    state.claims && state.claims.length > 0 ? "Available" : "Missing"
  }

  Given the conversation history, decide which worker to act next or call a tool.`;

  const routeSchema = z.object({
    next: z
      .enum(["ClaimVerifier", "FINISH"])
      .describe(
        "The next worker to route to. Use 'ClaimVerifier' after getting a transcript. Use 'FINISH' when done."
      ),
  });

  const routeTool = tool((input) => input, {
    name: "route",
    description: "Route to the next worker.",
    schema: routeSchema,
  });

  const tools = [getYoutubeTranscript, routeTool];

  const llmWithTools = llm.bindTools(tools);

  const response = await llmWithTools.invoke([
    new SystemMessage(supervisorSystemPrompt),
    ...state.messages,
  ]);
  console.log("Supervisor response:", response);

  // Handle tool calls
  if (response.tool_calls && response.tool_calls.length > 0) {
    const toolCall = response.tool_calls[0];

    if (toolCall.name === "get_youtube_transcript") {
      // Execute the transcript tool
      console.log("Supervisor calling get_youtube_transcript...");
      const toolOutput = await getYoutubeTranscript.invoke(
        toolCall.args as any
      );

      // If it's an error message
      if (typeof toolOutput === "string" && toolOutput.startsWith("Error")) {
        return {
          messages: [new AIMessage(toolOutput)],
          next: "supervisor", // Retry or let supervisor handle the error
        };
      }

      return {
        transcript: toolOutput,
        messages: [
          new AIMessage(
            `Transcript extracted successfully. Length: ${toolOutput.length} characters.`
          ),
        ],
        next: "supervisor", // Loop back to supervisor to decide next step (which should be ClaimVerifier)
      };
    } else if (toolCall.name === "route") {
      return { next: toolCall.args.next };
    }
  }

  // Fallback if no tool called (shouldn't happen ideally)
  return { next: "FINISH" };
};

// Claim Verifier Node
const claimVerifierNode = async (state: typeof GraphState.State) => {
  let claims = state.claims;

  // 1. Extract claims if missing
  if ((!claims || claims.length === 0) && state.transcript) {
    console.log("ClaimVerifier: Extracting claims from transcript...");
    const extractionPrompt = `
    ${system_prompt}
    
    Here is the transcript:
    ${state.transcript}
    `;

    const response = await llm.invoke([new HumanMessage(extractionPrompt)]);
    console.log("Claim extraction response:", response);

    // Parse the JSON response
    try {
      const content = response.content as string;
      const jsonMatch =
        content.match(/```json\s*([\s\S]*?)\s*```/) ||
        content.match(/{[\s\S]*}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        if (parsed.claims && Array.isArray(parsed.claims.content)) {
          claims = parsed.claims.content;
        }
      }
    } catch (e) {
      console.error("Error parsing claims:", e);
    }
  }

  if (!claims || claims.length === 0) {
    return {
      messages: [new AIMessage("No claims found or extracted.")],
    };
  }

  const tool = new TavilySearchAPIRetriever({
    k: 3,
  });

  const verificationResults = [];

  for (const claim of claims) {
    try {
      const searchResults = await tool.invoke(claim);
      // Use LLM to verify based on search results
      const verifyPrompt = `
      Claim: "${claim}"
      
      Search Results:
      ${JSON.stringify(searchResults)}
      
      Based on the search results, verify if the claim is True, False, or Unverified. Provide a brief explanation.
      Return JSON: { "status": "True/False/Unverified", "explanation": "..." }
      `;

      const verifyResponse = await llm.invoke([new HumanMessage(verifyPrompt)]);
      console.log(
        `Verification response for claim "${claim}":`,
        verifyResponse
      );
      const content = verifyResponse.content as string;

      let parsedVerification = {
        status: "Unverified",
        explanation: "Failed to parse verification result.",
      };
      try {
        // Attempt to parse JSON from the response
        const jsonMatch =
          content.match(/```json\s*([\s\S]*?)\s*```/) ||
          content.match(/{[\s\S]*}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[1] || jsonMatch[0];
          parsedVerification = JSON.parse(jsonStr);
        } else {
          // Fallback if no JSON structure found, try to parse the whole content if it looks like JSON
          parsedVerification = JSON.parse(content);
        }
      } catch (e) {
        console.error("Error parsing verification JSON:", e);
        // Fallback: treat the whole content as explanation if it's not JSON
        parsedVerification = { status: "Unverified", explanation: content };
      }

      verificationResults.push({
        claim,
        verification_status: parsedVerification.status,
        explanation: parsedVerification.explanation,
      });
    } catch (e) {
      console.error(`Error verifying claim "${claim}":`, e);
      verificationResults.push({
        claim,
        verification_status: "Unverified",
        explanation: "Verification process failed.",
      });
    }
  }

  return {
    messages: [new AIMessage(`Verified ${claims.length} claims.`)],
    claims: claims, // Update claims in state if they were extracted
    verification_results: verificationResults,
  };
};

// Build the graph
const workflow = new StateGraph(GraphState)
  .addNode("supervisor", supervisorNode)
  .addNode("ClaimVerifier", claimVerifierNode)
  .addEdge(START, "supervisor")
  .addConditionalEdges("supervisor", (state) => state.next, {
    ClaimVerifier: "ClaimVerifier",
    FINISH: END,
    supervisor: "supervisor",
  })
  .addEdge("ClaimVerifier", "supervisor");

export const graph = workflow.compile();
