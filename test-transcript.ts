import { getYoutubeTranscript } from "./lib/tools/youtube-transcript";

async function main() {
  // "Me at the zoo" - the first video on YouTube, usually has captions
  const url = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
  console.log(`Testing transcript extraction for: ${url}`);
  try {
    const result = await getYoutubeTranscript.invoke({ url });
    console.log("Result length:", result.length);
    console.log("Result preview:", result.substring(0, 200));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
