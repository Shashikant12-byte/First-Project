// src/services/api.js

// 1. Define the Root URL (matches your backend port 5000)
const SERVER_URL = "http://localhost:5000";

// 2. Define Specific Endpoints
const CHAT_ENDPOINT = `${SERVER_URL}/api/shop/chat`;
const PRODUCT_ENDPOINT = `${SERVER_URL}/api/products`;

export const sendMessageToAgent = async (message, userId = "guest_123") => {
  try {
    // FIX: Use the correct variable CHAT_ENDPOINT
    const response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { 
      type: "text", 
      message: "⚠️ System Offline: Cannot connect to BlockBusters Core." 
    };
  }
};

export const searchProducts = async (query = "") => {
  try {
    // FIX: Use PRODUCT_ENDPOINT so the URL is correct
    const response = await fetch(`${PRODUCT_ENDPOINT}?search=${encodeURIComponent(query)}`);
    
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};