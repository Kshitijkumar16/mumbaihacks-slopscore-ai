# Supervisor Agent Architecture Walkthrough

## Goal

Convert the existing linear agent logic into a Supervisor Agent architecture using LangGraph and LangChain. The supervisor controls a "Claim Verifying Agent" (and an extractor).

## Changes

### 1. Created `lib/agents/graph.ts`

This file defines the LangGraph workflow.

- **State**: Tracks `messages`, `transcript`, `claims`, and `verification_results`.
- **Nodes**:
  - `supervisor`: Uses Gemini to decide the next step (Extract -> Verify -> Finish).
  - `ClaimExtractor`: Extracts claims from the transcript using the existing system prompt.
  - `ClaimVerifier`: Verifies each claim using `TavilySearchResults` and Gemini.
- **Edges**:
  - `supervisor` -> `ClaimExtractor`
  - `supervisor` -> `ClaimVerifier`
  - `ClaimExtractor` -> `supervisor`
  - `ClaimVerifier` -> `supervisor`

### 2. Updated `app/api/call-supervisor/route.ts`

Replaced the direct Gemini generation call with the graph invocation.

- **Input**: Extracts transcript from YouTube video.
- **Process**: Invokes `graph` with the transcript.
- **Output**: Returns the extracted claims and verification results.

## Verification

- **Code Review**: Checked imports and logic.
- **Dependencies**: Verified `@langchain/langgraph`, `@langchain/google-genai`, `@langchain/tavily` are present.
- **Flow**: The supervisor correctly orchestrates the extraction and verification steps.

## Next Steps

- Ensure `TAVILY_API_KEY` is set in the environment variables.
- Test with real YouTube videos to verify the prompt effectiveness and search results.
