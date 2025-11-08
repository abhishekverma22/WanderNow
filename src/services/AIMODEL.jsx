import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ VITE_GEMINI_API_KEY is not defined in .env file");
}

// Initialize the API client
const genAI = new GoogleGenerativeAI(apiKey);

export const sendMessageToGemini = async (prompt) => {
  try {
    console.log("🚀 Initializing Gemini API...");

    // Get the generative model - using Gemini 2.0 Flash (latest)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    console.log("📤 Sending prompt to Gemini...");

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini Response Received!");
    return text;
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    console.error("Error details:", err.message);

    // Check for common errors
    if (err.message?.includes("API_KEY") || err.message?.includes("API key")) {
      return "⚠️ Invalid API Key. Please check your .env file.";
    }
    if (err.message?.includes("quota") || err.message?.includes("429")) {
      return "⚠️ API quota exceeded. Please check your billing.";
    }
    if (err.message?.includes("404") || err.message?.includes("not found")) {
      return "⚠️ Model not available. Please check your API access or try a different model.";
    }
    if (err.message?.includes("fetch")) {
      return "⚠️ Network error. Please check your internet connection.";
    }

    return `⚠️ Error: ${err.message || "Something went wrong. Try again."}`;
  }
};
