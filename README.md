# 🌾 Agri Vision Pro

**Agri Vision Pro** is a full-stack AI-powered platform built to empower farmers with cutting-edge technologies in agriculture. It combines crop recommendation, disease detection, real-time environmental analysis, bidding systems (Inventory System), chatbot support, a farmer community forum, and mobile app integration — all under one roof.

![AgriVision Pro Banner](![Agrivision_Primary_Logo](https://github.com/user-attachments/assets/553e0e9c-d0c6-461d-88b9-8ff5cad9e308)
)

---

## 🏷️ Badges


[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://python.org)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-success)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Expo](https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Razorpay](https://img.shields.io/badge/-Razorpay-3A8BCD?logo=razorpay&logoColor=white)](https://razorpay.com/)

---

## ✨ Features

- 📊 **Real-Time Soil Analytics** – Tamil Nadu-specific soil health dashboard
- 🧠 **AI-Powered Crop Recommendation** – Machine Learning for yield-based suggestions
- 🦠 **Disease Detection** – Image-based plant disease identification
- 🛒 **Inventory/Bidding System** – Farmers can buy/sell products via Razorpay wallet
- 🤖 **Chatbot** – Gemini API-powered AI assistant for 24/7 query resolution
- 💬 **Farmer Forum** – Connect, collaborate, and discuss agricultural practices
- 📱 **Mobile App** – Android/iOS support for on-the-go access
- 🔐 **Secure Authentication** – JWT-based login system

---

## 🛠️ Full Tech Stack

**Frontend:**
- React (with Redux or Context API)
- Tailwind CSS / Material UI for styling

**Backend/API:**
- Node.js + Express (or Python with FastAPI)
- RESTful APIs with JWT Authentication
- Razorpay integration for payments

**Machine Learning:**
- Python, TensorFlow/Keras, Scikit-Learn, Pandas
- Crop prediction, disease detection, and trend analytics

**Database:**
- MongoDB for user data, inventory, and forum
- Redis for real-time caching

**Mobile:**
- React Native (or Flutter)
- Expo for Android/iOS deployment

---

## 🚀 Quick Start Guide

### 🌐 Web App Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/AgriVision-Pro.git
cd AgriVision-Pro

# Soil Dashboard & Chatbot
cd Tn_Soil_Dashboard && npm install && node proxyServer.js

# Main App
cd frontend && npm install
cd ../backend && npm install
cd ../ML && pip install -r requirements.txt

# Forum
cd ../Forum/BackEnd && npm install
cd ../FrontEnd && npm install

# Inventory System
cd ../InventorySystem_Backend && npm install
cd ../InventorySystem_frontend && npm install

# Run all modules (for Windows)
./run_AgriVisionPro.bat
./run_ForumModule.bat
./run_InventorySystem.bat
🔗 Open your browser: http://localhost:5173

📱 Mobile App (Android/iOS)
cd android/frontend
npx expo install
npx expo start
Then:

Install Expo Go on your mobile

Scan the QR code from terminal

Enjoy real-time analytics on mobile!

## 📊 Dataset Sources

| 🌿 **Feature**              | 🧾 **Description**                          | 📐 **Range**           |
|----------------------------|---------------------------------------------|------------------------|
| 🌧️ **Rainfall**            | Actual vs Normal rainfall (mm)              | 0 – 1200 mm            |
| 🧪 **NPK Ratio**           | Soil Nutrient Levels (Nitrogen content)     | N: 0 – 140 kg/ha       |
| 🌡️ **Temperature/Humidity** | Real-time microclimate sensor data         | 15°C – 45°C            |



Primary Sources:

India Meteorological Department (IMD)

Tamil Nadu Agricultural Department

Soil Health Card Program

🧩 System Architecture
![major_project drawio](https://github.com/user-attachments/assets/579adce7-1f99-4558-b2b5-2c8567b57794)

🤝 Contribution Guidelines
bash
Copy
Edit
# Fork the repository
# Create a new feature branch
git checkout -b feature/YourFeatureName

# Make your changes
git commit -m "Add YourFeatureName"

# Push to GitHub
git push origin feature/YourFeatureName

# Open a Pull Request
📜 License
Distributed under the MIT License

🌾 Cultivating Innovation, Harvesting Success
Empowering Tamil Nadu Farmers Through Data-Driven Agriculture 🚀
