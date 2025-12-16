// backend/server.js

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Product Routes -------------------- */
app.use("/api/products", productRoutes);

/* -------------------- Gemini Setup -------------------- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* -------------------- Chat Orchestrator -------------------- */
app.post("/api/shop/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      type: "text",
      message: "Message is required."
    });
  }

  const prompt = `
You are the Sales Agent Orchestrator for BlockBusters Retail.

User input:
"${message}"

Classify the intent and respond ONLY with valid JSON.

INTENTS:
1. Product discovery / buying intent
   → type: "SEARCH"
   → query: short product keywords
   → reply: friendly response

2. Inventory / availability check
   → type: "INVENTORY"
   → query: product name
   → reply: confirmation message

3. General conversation
   → type: "CHAT"
   → reply: conversational answer

Rules:
- Output ONLY raw JSON
- No markdown
- No explanations
- If unsure, use CHAT
If you do not return valid JSON, the system will fail.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;

    let text = response.text();

    // Cleanup accidental markdown
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON Parse Failed:", text);
      return res.json({
        type: "text",
        message: response.text()
      });
    }

    /* -------------------- Frontend Contract Mapping -------------------- */
    let frontendResponse = {
      type: "text",
      message: data.reply || "How can I help you today?"
    };

    if (data.type === "SEARCH") {
      frontendResponse = {
        type: "recommendation_response",
        message: data.reply,
        searchQuery: data.query
      };
    }

    if (data.type === "INVENTORY") {
      frontendResponse = {
        type: "inventory_response",
        message: data.reply,
        product: {
          name: data.query,
          price: 2499,
          imageUrl: "https://via.placeholder.com/150",
          stock: {
            inStore: {
              available: true,
              location: "MG Road"
            }
          }
        }
      };
    }

    res.json(frontendResponse);

  } catch (error) {
    console.error("🔥 Gemini Error:", error);
    res.status(500).json({
      type: "text",
      message: "The AI service is temporarily unavailable. Please try again."
    });
  }
});

/* -------------------- Server Startup -------------------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 BlockBusters AI Backend running at http://localhost:${PORT}`);
});
