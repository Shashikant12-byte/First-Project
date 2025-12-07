// backend/server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const productRoutes = require('./routes/productRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Register Product Routes
app.use('/api/products', productRoutes);

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/shop/chat', async (req, res) => {
  const { message } = req.body;

  const prompt = `
    You are the Sales Agent Orchestrator for BlockBusters Retail.
    User Input: "${message}"
    
    Determine the user's intent.
    1. If they want to find/buy products (e.g., "buy shoes", "summer outfits"), return a JSON object:
       { "type": "SEARCH", "query": "extracted keywords", "reply": "Sure! Here are some..." }
    2. If they ask about stock/inventory (e.g., "is this available?"), return:
       { "type": "INVENTORY", "query": "product name", "reply": "Let me check the stock..." }
    3. If it's a general question, return:
       { "type": "CHAT", "reply": "Your conversational response..." }
       
    ONLY return the JSON string, no markdown.
  `;

  try {
    // We use 'gemini-1.5-flash' here. If it fails, try 'gemini-pro'
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    let text = response.text();
    
    // Clean up markdown if Gemini adds it (e.g. ```json ... ```)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(text);

    res.json({
      id: Date.now().toString(),
      role: 'assistant',
      ...data, 
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ 
      error: "AI Error", 
      details: error.message 
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 BlockBusters AI running on port ${PORT}`));