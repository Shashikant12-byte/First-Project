// src/services/api.js

// IMPORTANT:
// Do NOT hardcode backend URL when using Vite proxy
const CHAT_ENDPOINT = "/api/shop/chat";
const PRODUCT_ENDPOINT = "/api/products";

export const sendMessageToAgent = async (message, userId = "guest_123") => {
  try {
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

    return await response.json();
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
    const response = await fetch(
      `${PRODUCT_ENDPOINT}?search=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};
