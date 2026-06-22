<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini AI" />
</div>

# MediRoute Backend API

This directory powers the core AI and data Retrieval logic for the **MediRoute** healthcare navigation application. It provides robust API endpoints to securely interact with the Google Gemini AI and filter our verified doctor database.

## 🚀 Key Responsibilities
* **AI Triage System**: Interfaces with the `gemini-2.5-flash` model to analyze patient symptoms and categorize clinical urgency.
* **Deterministic Provider Search**: Fast JSON-based querying engine for matched specialties and locations.
* **CORS & Security**: Configured to securely handle cross-origin requests from the React frontend.

---

## 🛠 Prerequisites

Make sure you have installed:
* [Node.js](https://nodejs.org/) (v16.14.0 or newer)
* npm (bundled with Node.js)

---

## ⚙️ Getting Started

Follow these steps to set up the backend locally:

1. **Navigate to the backed context**
   ```sh
   cd backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file from the example template:
   ```sh
   cp .env.example .env
   ```
   Open `.env` and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_api_key_here"
   PORT=5000
   ```

4. **Boot the Server**
   ```sh
   npm start
   ```
   *The server will boot up via `http://localhost:5000`.*

---

## 📡 API Endpoints

### 1. Health Status
Verify the backend is actively running.
* **Endpoint:** `GET /api/health`
* **Response:**
  ```json
  { "status": "ok" }
  ```

### 2. AI Symptom Triage
Submits user symptoms for LLM-based categorization.
* **Endpoint:** `POST /api/triage`
* **Request Body:**
  ```json
  {
    "symptomText": "I have chest pain and shortness of breath"
  }
  ```
* **Response Output:** Recommends appropriate medical division (e.g., Cardiologist) and notes urgency triage metric.

### 3. Doctor Search Filter
Fetches local available doctors based on output criteria from the Triage API.
* **Endpoint:** `POST /api/search`
* **Request Body:**
  ```json
  {
    "specialty": "Cardiologist",
    "city": "Delhi"
  }
  ```

---

<div align="center">
  <i>Built for Bharat Academix CodeQuest 2026</i>
</div>
