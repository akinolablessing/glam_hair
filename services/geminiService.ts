import { GoogleGenAI } from "@google/genai";

export const getStyleRecommendations = async (prompt: string): Promise<string> => {
  try {
    // Initialize here to avoid potential top-level initialization issues
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    const systemInstruction = "You are a high-end fashion and beauty stylist AI. Provide 3 short, trendy, and specific style recommendations (hair, makeup, or outfit) based on the user's vibe/occasion. Keep it punchy and inspiring. Use formatting like *Bold* for key terms.";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Removed maxOutputTokens to allow the model to manage its own token usage (including thinking)
      }
    });

    return response.text || "Sorry, I couldn't generate style ideas right now. Try again later!";
  } catch (error) {
    console.error("Error fetching style recommendations:", error);
    return "Unable to connect to the stylist AI. Please check your connection.";
  }
};