# MediRoute

MediRoute is an AI-powered healthcare navigation MVP built for Bharat Academix CodeQuest 2026, Round 2 Prototype Development.

The app helps a user enter symptoms and a city, then recommends the right type of doctor and shows verified doctor options with transparent consultation fees. It is navigation support, not medical diagnosis.

## Current MVP Scope

- AI symptom triage using Gemini `gemini-2.5-flash`
- Specialty recommendation from a strict whitelist
- Urgency classification: `low`, `medium`, or `high`
- Static JSON doctor search by city and specialty
- Doctor cards with fee range, rating, and NMC-verified badge
- Google Maps search links for directions
- High-urgency emergency banner with `tel:112`
- Emergency mode modal with city hospital contacts
- Downloadable emergency PDF card

## Out Of Scope For This MVP

- WhatsApp/Twilio bot
- Authentication
- Multi-language UI
- Vector database
- React Native app
- Payments or bookings

These can be described as roadmap items, not current prototype features.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- AI: Gemini API, model `gemini-2.5-flash`
- Data: static JSON at `backend/data/doctors.json`
- Deployment target: Render for backend, Vercel for frontend

## How It Works

```text
Symptom text -> Gemini triage -> specialty whitelist -> JSON doctor filter -> sorted doctor cards
```

The AI only decides the recommended specialty and urgency. The doctor search itself is deterministic: it filters the static doctor dataset by city and specialty, then sorts by rating.

## Supported Cities

- Delhi
- Mumbai
- Jaipur
- Goa
- Bangalore

## Supported Specialties

The app only uses these exact specialty strings:

- General Physician
- Cardiologist
- Dermatologist
- Orthopedic
- Pediatrician
- ENT Specialist
- Gynecologist
- Dentist

## Quick Start

Terminal 1:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Terminal 2:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

Frontend runs on the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Environment Setup

Add your Gemini API key to `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Set the frontend API URL in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Local Setup Details

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Sample Demo Symptoms

- `I have chest pain and difficulty breathing` - should show high urgency guidance.
- `I have an itchy skin rash on my arm` - should route toward Dermatologist.
- `My tooth hurts badly when I eat` - should route toward Dentist.
- `My child has fever and cough` - should route toward Pediatrician.
- `I have ear pain and blocked nose` - should route toward ENT Specialist.

## API Endpoints

Backend default URL:

```text
http://localhost:5000
```

Health check:

```http
GET /api/health
```

Symptom triage:

```http
POST /api/triage
Content-Type: application/json

{
  "symptomText": "I have chest pain and difficulty breathing"
}
```

Doctor search:

```http
POST /api/search
Content-Type: application/json

{
  "specialty": "Cardiologist",
  "city": "Delhi"
}
```

## Demo Flow For Judges

1. Enter a symptom such as `I have chest pain and breathing difficulty`.
2. Select a city.
3. Submit the form.
4. Show the recommended specialty and urgency.
5. Show the doctor recommendation cards.
6. Open the high-urgency `112` action or emergency mode.
7. Download the emergency PDF card.

## Safety Positioning

MediRoute does not diagnose illness. It only routes users toward an appropriate medical specialty and nearby care options.

For emergencies, users should call `112` or visit the nearest emergency facility.
