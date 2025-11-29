// global imports

import { NextRequest, NextResponse } from "next/server";
import { HumanMessage } from "@langchain/core/messages";

// local imports
import {
  extractYouTubeID,
  getInnertubeApiKey,
  getPlayerResponse,
} from "@/lib/transcript-extractor";

import { graph } from "@/lib/agents/graph";

// route function
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { video_link } = body;
    // console.log(video_link);
    if (!video_link) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      );
    }

    // Extract video ID if URL is provided
    const videoId = extractYouTubeID(video_link);
    // console.log(videoId);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL or video ID" },
        { status: 400 }
      );
    }

    // Get API key and player response
    const apiKey = await getInnertubeApiKey(video_link);
    if (!apiKey) {
      return NextResponse.json(
        { error: "Failed to retrieve YouTube API key" },
        { status: 500 }
      );
    }

    const playerResponse = await getPlayerResponse(videoId!, apiKey);

    // 1. Invoke the Supervisor Agent Graph
    const initialState = {
      messages: [
        new HumanMessage(
          `Here is the video link: ${video_link}. Please analyze the transcript and verify claims.`
        ),
      ],
    };

    const finalState = await graph.invoke(initialState);

    console.log("Graph execution finished");
    console.log("Claims:", finalState.claims?.length);
    console.log(
      "Verification Results:",
      finalState.verification_results?.length
    );

    // Get video metadata
    const videoDetails = playerResponse?.videoDetails;

    return NextResponse.json({
      success: true,
      data: {
        title: videoDetails?.title || "Untitled Video",
        videoId: videoId,
        author: videoDetails?.author || "Unknown",
        thumbnailUrl: videoDetails?.thumbnail?.thumbnails?.[0]?.url,
        fullTranscript: finalState.transcript,
        extractedAIJson: { claims: { content: finalState.claims } }, // Mapping to match previous structure somewhat
        verificationResults: finalState.verification_results,
        playerResponse: playerResponse,
      },
    });
  } catch (error) {
    console.error("Error fetching transcript or running agent:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch transcript",
      },
      { status: 500 }
    );
  }
}
