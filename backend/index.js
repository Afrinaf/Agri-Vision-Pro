import "./sentry/instrument.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import * as Sentry from "@sentry/node";

import { client } from "./redis/client.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import stripe from "./stripe/stripeInit.js";

import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/predictions.routes.js";
import elevatedUserRoutes from "./routes/elevatedUser.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
//import proxyRoutes from "./routes/proxy.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'baggage',
        'sentry-trace'
    ],
    credentials: true
};

app.use(cors(corOpts));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '1000mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }))
app.use(cookieParser());

// Sentry setup
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.get("/api/v1", (req, res) => {
    res.send("<h1>Server Up & Running</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/predictions", predictionRoutes);
app.use("/api/v1/elevatedUser", elevatedUserRoutes);
app.use("/api/v1/dashboard", analysisRoutes);
app.use("/api/v1/marketplace", marketplaceRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
//app.use("/api/v1/proxy", proxyRoutes);


app.post("/api/v1/proxy/soildata", async (req, res) => { 
    console.log("Received request to /api/v1/proxy/soildata");
    //console.log("Request body:", req.body);

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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/v1/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: userMessage }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn’t get that.";
    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API error" });
  }
});


app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);

    connectToMongoDB();

    if (client) {
        console.log("Connected to Redis");
    } else {
        console.log("Error in connecting to Redis");
    }

    if (stripe) {
        console.log("Stripe Initialized");
    } else {
        console.log("Error in connecting to Stripe");
    }
});