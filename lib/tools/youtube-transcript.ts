import { tool } from "@langchain/core/tools";
import { z } from "zod";
import {
  extractYouTubeID,
  getInnertubeApiKey,
  getPlayerResponse,
  extractCaptionTrackUrl,
} from "@/lib/transcript-extractor";
import { parseStringPromise } from "xml2js";

export const getYoutubeTranscript = tool(
  async ({ url }: { url: string }) => {
    try {
      console.log(`Extracting transcript for ${url}`);
      const videoId = extractYouTubeID(url);
      if (!videoId) {
        return "Error: Invalid YouTube URL. Could not extract video ID.";
      }

      const apiKey = await getInnertubeApiKey(url);
      if (!apiKey) {
        return "Error: Could not find Innertube API Key on the video page.";
      }

      const playerResponse = await getPlayerResponse(videoId, apiKey);

      if (playerResponse.playabilityStatus?.status !== "OK") {
        return `Error: Video is not playable. Status: ${playerResponse.playabilityStatus?.status}`;
      }

      let captionUrl: string;
      try {
        captionUrl = extractCaptionTrackUrl(playerResponse);
      } catch (e) {
        return "Error: No captions found for this video.";
      }

      const response = await fetch(captionUrl);
      if (!response.ok) {
        return `Error: Failed to fetch captions. Status: ${response.status}`;
      }

      const xml = await response.text();

      const result = await parseStringPromise(xml);

      if (!result.transcript || !result.transcript.text) {
        return "Error: Unexpected caption format.";
      }

      const texts = result.transcript.text
        .map((t: any) => t._)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      return texts;
    } catch (error) {
      console.error("Transcript extraction error:", error);
      return `Error extracting transcript: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  },
  {
    name: "get_youtube_transcript",
    description:
      "Extracts the transcript (captions) from a YouTube video URL. Use this tool when you have a YouTube URL and need to get the spoken text content of the video.",
    schema: z.object({
      url: z
        .string()
        .describe(
          "The full YouTube video URL, e.g., https://www.youtube.com/watch?v=..."
        ),
    }),
  }
);
