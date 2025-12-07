// backend/agents/orchestrator.js
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { checkInventory } = require("./inventory"); // Re-using your existing inventory logic

// Initialize Gemini (using the key from your new.js)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

const processMessage = async (userMessage) => {
  try {
    // 1. The "Orchestrator" System Prompt
    // We tell Gemini to act as the Middleman who controls the website.
    const prompt = `
      You are the Sales Orchestrator for BlockBusters Retail.
      Your goal is to understand the user's intent and return a strictly formatted JSON object.
      
      User Input: "${userMessage}"
      
      Available Tools:
      1. SEARCH: User wants to find products, see outfits, or filter the grid (e.g., "show me red shoes", "summer clothes").
      2. INVENTORY: User asks about stock availability specifically (e.g., "do you have this in store?", "stock check").
      3. CHAT: General greeting or questions (e.g., "hello", "how are you").

      Output Format (JSON ONLY):
      - If SEARCH: { "type": "SEARCH", "query": "extracted keywords", "reply": "I've updated the catalogue with..." }
      - If INVENTORY: { "type": "INVENTORY", "query": "product name", "reply": "Let me check the stock..." }
      - If CHAT: { "type": "CHAT", "reply": "Your friendly response..." }
    `;

    // 2. Get Response from Gemini
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    // 3. Parse JSON (Cleaning up markdown if Gemini adds it)
    let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const decision = JSON.parse(text);

    // 4. Execute Logic based on Decision
    if (decision.type === 'INVENTORY') {
      // If Gemini says check inventory, we call your existing local tool
      const inventoryData = await checkInventory(decision.query);
      return {
        type: 'inventory_response',
        message: decision.reply,
        product: inventoryData.product, // Pass the product data found
        found: inventoryData.found
      };
    }

    if (decision.type === 'SEARCH') {
      return {
        type: 'recommendation_response', // Matches your frontend type
        message: decision.reply,
        searchQuery: decision.query // This is the key payload for the frontend
      };
    }

    // Default Chat
    return {
      type: 'text',
      message: decision.reply
    };

  } catch (error) {
    console.error("Orchestrator Error:", error);
    return { type: 'text', message: "I'm having trouble connecting to the Orchestrator. Please try again." };
  }
};

module.exports = { processMessage };