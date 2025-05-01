const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173", // frontend port
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());



app.post("/proxy/soildata", async (req, res) => {
  try {
    const response = await axios.post("https://soilhealth4.dac.gov.in/", req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});



const GEMINI_API_KEY = "AIzaSyCNlY3qIQxbGc2vuSmGPZBFvrRgr8qbcIE";

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  
  console.log("User message:", userMessage); // Log the user message

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: userMessage }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    console.log("API Response:", response.data); // Log the full response from Gemini API

    const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn’t get that.";
    res.json({ reply: botReply });
  } catch (err) {
    console.error("Gemini API error:", err.response ? err.response.data : err.message); // Log error details
    res.status(500).json({ error: "Gemini API error" });
  }
});
app.listen(5004, () => console.log("Proxy server running on port 5004"));
