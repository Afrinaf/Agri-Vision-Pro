import express from "express";
import axios from "axios";

const router = express.Router();

// Proxy route to forward requests to the external API
router.post("/soildata", async (req, res) => {
    console.log("Received request to /soildata");
    console.log("Request body:", req.body);
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"; 
    try {
        const response = await axios.post(apiUrl, req.body, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Response data:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
