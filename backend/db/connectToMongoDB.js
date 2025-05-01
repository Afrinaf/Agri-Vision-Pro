
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debug log

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URL is undefined! Check your .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB port 5000");
    } catch (error) {
        console.log("❌ Error in connecting to MongoDB:", error.message);
    }
}

export default connectToMongoDB;

