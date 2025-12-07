// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
// Import the NEW Gemini-powered orchestrator
const { processMessage } = require('../agents/orchestrator'); 

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    // This now calls Gemini, not the hardcoded logic
    const response = await processMessage(message);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Orchestrator Malfunction" });
  }
});

module.exports = router;