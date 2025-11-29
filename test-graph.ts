import { graph } from "./lib/agents/graph";
import { HumanMessage } from "@langchain/core/messages";

async function main() {
  const video_link = "https://www.youtube.com/watch?v=jNQXAC9IVRw"; // Me at the zoo
  console.log(`Testing graph with: ${video_link}`);

  const initialState = {
    messages: [
      new HumanMessage(
        `Here is the video link: ${video_link}. Please analyze the transcript and verify claims.`
      ),
    ],
  };

  try {
    const finalState = await graph.invoke(initialState);
    console.log("Graph execution finished successfully.");
    console.log("Claims:", finalState.claims?.length);
  } catch (error) {
    console.error("Graph execution failed:", error);
  }
}

main();
