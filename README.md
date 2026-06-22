<div align="center">
  <h1>🏥 MediRoute</h1>
  <p><strong>Right Doctor · Right Cost · Right Now</strong></p>
  
  <p>An AI-powered healthcare navigation platform developed for <strong>Bharat Academix CodeQuest 2026</strong>.</p>

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini AI" />
  
</div>

---

## 🎯 The Problem

Finding the right specialist while experiencing severe symptoms can be stressful, inefficient, and fraught with jargon. Too often, patients seek the wrong clinical track, leading to delayed treatments, frustration, and higher healthcare expenditures.

## 💡 Our Solution: MediRoute

MediRoute translates **plain language symptoms** into a verified actionable **Care Route**. In 60 seconds, utilizing Google Gemini AI, it automatically triages severity, routes to correct specialties, and recommends NMC-verified nearby providers equipped with clear, upfront pricing parameters. 

**Note on Patient Safety:** *MediRoute operates solely as a navigation tool, not a diagnostic medical service. Emergency scenarios heavily trigger high-urgency notifications directing intervention to the National Help Line (112).*

---

## ✨ Features (MVP Round 2)

*   **Intelligent AI Triage:** Employs `gemini-2.5-flash` to extract semantic medical need from casual sentence structures.
*   **Safety-First Critical Assessment:** Sorts logic severity immediately; outputs prompt 112 routing modal over low-impact issues.
*   **Geolocated Provider Database:** Highly responsive JSON indexing across 5 primary Indian cities mapping directly to major specialties.
*   **Clean Actionable UI:** Modern, lightweight frontend focused heavily on removing cognitive interface clutter.

---

## 🧬 Project Architecture 

```text
User Input -> Gemini AI Triage Engine -> Severity & Specialty Sorting -> Deterministic Doctor Filter Search -> Recommendation Action Cards
```

MediRoute operates with a clear separation of concerns.
*   **`frontend/`**: The presentation and UI flow (React + Vite). [More Info](frontend/README.md)
*   **`backend/`**: The central routing logic integrating LLMs and serving Doctor endpoints (Node.JS + Express). [More Info](backend/README.md)

---

## 🏁 Quick Start Setup

To test out MediRoute locally on your machine, you must boot both the frontend and backend microservices concurrently.

### 1️⃣ Launching the Backend Server

Open Terminal #1:
```bash
cd backend
npm install
cp .env.example .env
```
*Be sure to open `backend/.env` and inject your active Google Gemini API authentication key.*
```bash
npm start
```
*(Runs locally on port 5000)*

### 2️⃣ Launching the Frontend Application

Open Terminal #2:
```bash
cd frontend
npm install
cp .env.example .env
```
*(Requires `VITE_API_URL=http://localhost:5000` to be established within the created `.env`)*
```bash
npm run dev
```

The React interface should securely boot and provide you the local hot-deployment URI (usually `localhost:5173`).

---

## 📈 Scalability Roadmap

Moving forward beyond CodeQuest 2026, the application structure intends to adopt:
*   Full persistent vector database incorporation for hospital matching.
*   Regional Multi-Language transcription integration.
*   Direct clinic live appointment scheduling systems via API bridges.

## ⚖️ Disclaimer
*All demonstrated providers and pricing within the current dataset represent static JSON prototyping for assessment. In real-world integration, this connects directly via clinical API feeds.*
