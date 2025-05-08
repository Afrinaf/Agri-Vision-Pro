![Agrivision_Primary_Logo](https://github.com/user-attachments/assets/cdab885f-d131-45be-ba63-871e37b6ae31)

# 🌾 Agri Vision Pro

Agri Vision Pro is a full-stack AI-powered platform built to empower farmers with cutting-edge agricultural technologies. It combines:

- **Crop Recommendation**  
- **Disease Detection**  
- **Real-Time Environmental Analysis**  
- **Inventory & Bidding System**  
- **AI Chatbot Support**  
- **Farmer Community Forum**  
- **Mobile App Integration**  

— all under one roof!

---

## 🏷️ Tech & Tools

![Python](https://img.shields.io/badge/Python-3670A0?logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1B1F23?logo=expo&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-4F1C75?logo=razorpay&logoColor=white)

---

## ✨ Features

| Icon | Feature                                               |
|:---: |:----------------------------------------------------- |
| 🧠   | **AI-Powered Crop Recommendation**<br>Yield-based suggestions using ML. |
| 🦠   | **Disease Detection**<br>Image-based plant disease diagnostics.    |
| ☁️   | **Real-Time Soil & Weather Data**<br>Tamil Nadu-specific analytics. |
| 🛒   | **Inventory & Bidding System**<br>Buy/sell via Razorpay wallet.     |
| 🤖   | **AI Chatbot**<br>Gemini API assistant for 24/7 support.            |
| 💬   | **Farmer Forum**<br>Share blogs, tips & collaborate.                |
| 📱   | **Mobile App**<br>Android/iOS support via Expo.                     |
| 🔐   | **Secure Auth**<br>JWT-based login & session handling.             |

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Afrinaf/Agri-Vision-Pro.git
cd Agri-Vision-Pro
````

### 2. Website Setup

#### Tamil Nadu Soil Dashboard & Chatbot

```bash
cd Tn_Soil_Dashboard
npm install
node proxyServer.js
```

#### Main Web Module

```bash
cd frontend
npm install

cd ../backend
npm install

cd ../ML
pip install -r requirements.txt
```

#### Forum Module

```bash
cd AgriVisionProForum_BackEnd
npm install

cd ../AgriVisionProForum_FrontEnd
npm install
```

#### Inventory System Module

```bash
cd InventorySystem_Backend
npm install

cd ../InventorySystem_frontend
npm install
```

#### Environment Files

Create `.env` files with your credentials:

* **Frontend** (`frontend/.env`)

  ```
  VITE_API_URL=http://localhost:<PORT>/api/v1
  VITE_API_KEY=<JWT_TOKEN>
  ```
* **Backend** (`backend/.env`)

  ```
  MONGO_URI=<YOUR_MONGO_URI>
  PORT=<PORT>
  JWT_SECRET=<YOUR_JWT_SECRET>
  ML_URL=<ML_SERVICE_URL>
  
  ```

* **Tn_Soil_Dashboard** (`proxyServer.js`)

  ```
  GEMINI_API_KEY=<YOUR_GEMINI_KEY>
  ```

* **Forum BackEnd** (`AgriVisionProForum_BackEnd/.env`)

  ```
  MONGO_URI=<YOUR_FORUM_DB_URI>
  JWT_SECRET=<YOUR_FORUM_JWT_SECRET>
  ```
* **Inventory Backend** (fill in your Razorpay keys)

  ```js
  const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_KEY_SECRET"
  });
  ```

### 3. Run All Modules (Windows)

```bash
./run_AgriVisionPro.bat
./run_ForumModule.bat
./run_InventorySystem.bat
```

Open your browser at 👉 `http://localhost:5173/`

---

### 📱 Mobile App (Android/iOS)

```bash
cd android/frontend
npx expo install
npx expo start

cd ../../backend
npm install
npm start

cd ../ML
pip install -r requirements.txt
uvicorn app:app --reload
```

1. Install **Expo Go** on your device.
2. Scan the QR code from terminal.
3. Enjoy Agri Vision Pro on the move!

---

## 📊 Dataset Sources

| 🌿 **Feature**               | 🧾 **Description**                      | 📐 **Range**     |
| ---------------------------- | --------------------------------------- | ---------------- |
| 🌧️ **Rainfall**             | Actual vs Normal rainfall (mm)          | 0 – 1200 mm      |
| 🧪 **NPK Ratio**             | Soil Nutrient Levels (Nitrogen content) | N: 0 – 140 kg/ha |
| 🌡️ **Temperature/Humidity** | Real-time microclimate sensor data      | 15°C – 45°C      |
| 🌱 **Crop Patterns**         | Historical crop trends (2010–2023)      | Categorical      |

**Primary Sources:**

* India Meteorological Department (IMD)
* Tamil Nadu Agricultural Department
* Soil Health Card Program

---

## 🧩 System Architecture
![Screenshot 2025-05-08 160042](https://github.com/user-attachments/assets/29445631-07a4-49ae-b448-272b7f04f171)


---

## 🖼️ Output Screenshot
![photo-collage png (1)](https://github.com/user-attachments/assets/e9f62d43-292f-4d00-b605-9a407e3bb286)



---



## 🤝 Contribution

1. **Fork** the repo
2. **Create** a feature branch (`git checkout -b feature/YourFeature`)
3. **Commit** your changes (`git commit -m "Add feature"`)
4. **Push** (`git push origin feature/YourFeature`)
5. **Open** a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---
## 🌾 Cultivating Innovation, Harvesting Success
Empowering Tamil Nadu farmers through data-driven agriculture 🚀

---


