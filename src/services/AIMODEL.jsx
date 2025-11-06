import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (formData) => {
  try {
    const { location, numberOfDays, budget, traveler } = formData;

    const prompt = `
Generate a ${numberOfDays}-day travel plan for ${location} for a ${budget} budget traveler.
Include hotel options and itinerary.
You can just give plain text. Do NOT worry about JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", text: prompt }],
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2000,
    });

    const outputText = response.output?.[0]?.content?.[0]?.text || "No text from Gemini";
    console.log("Gemini output text:", outputText);
    return outputText;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "⚠️ Something went wrong. Try again.";
  }
};
