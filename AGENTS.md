# MediRoute — Project Context for AI Agents

## What this is
MediRoute: AI-powered healthcare navigation MVP, built for Bharat Academix CodeQuest 2026, Round 2 (Prototype Development).
Goal: take a user's symptoms and city, return a verified doctor recommendation with transparent pricing, in under 60 seconds.
This is NAVIGATION, not diagnosis — the AI must never state a definitive medical diagnosis, only recommend which type of doctor to see.

## Tech stack — do not deviate without asking
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- AI: Gemini API, model id `gemini-2.5-flash` — NOT `gemini-2.0-flash` (that model was shut down by Google on June 1, 2026 and will 404)
- Data: static JSON file at `/backend/data/doctors.json` — no database for this MVP, that's intentional, not a placeholder
- Deploy target: Render (backend), Vercel (frontend)

## Brand
- Primary: navy `#1E2761`
- Accent: teal `#028090`
- Background: white
- Style: clean rounded cards, generous spacing (0.5in-equivalent margins), mobile-responsive, left-aligned body text

## Specialty whitelist — must match exactly, character for character, everywhere
`General Physician`, `Cardiologist`, `Dermatologist`, `Orthopedic`, `Pediatrician`, `ENT Specialist`, `Gynecologist`, `Dentist`

The Gemini triage prompt must only ever return one of these exact strings. The doctor seed data must only ever use these exact strings. If they drift apart, search breaks silently.

## Cities in scope
Delhi, Mumbai, Jaipur, Goa, Bangalore

## In scope — build these
- AI symptom triage: free-text symptom → `{specialty, urgency, reasoning}`
- Doctor search: filter the static dataset by specialty + city, sorted by rating
- Results UI: doctor cards with fee range, rating, NMC-verified badge, "Get Directions" (plain Google Maps search URL, no Maps API key needed)
- High-urgency banner with `tel:112` when triage returns `urgency: "high"`
- If time allows only: Emergency Mode modal (static hospital list per city), downloadable PDF emergency card (jsPDF)

## Explicitly OUT of scope — do not build these even if a prompt is vague enough to imply them
- WhatsApp bot / Twilio
- Authentication of any kind (JWT, OAuth, OTP)
- Multi-language UI / i18n
- A real vector database (ChromaDB, Pinecone, etc.) — plain JSON filtering is the deliberate MVP choice
- React Native / mobile app
- Payments, bookings, revenue features

## Conventions
- Every backend route must be defensive: wrap external calls (especially Gemini) in try/catch and return a sensible fallback JSON, never let a route 500 with no response.
- Comment any non-obvious logic, especially the specialty-fallback search — the developer needs to be able to explain every line to hackathon judges in a live Q&A.
- Keep PRs/commits scoped to one feature at a time so it's easy to tell what changed.
- Never fabricate or hardcode statistics presented as live/real data (user counts, search
  trends, etc.) without clearly labeling them as illustrative/demo, matching the existing
  confidence-score disclaimer pattern.
- Every interactive button or link must have a working handler. Never add a button with
  no real destination or function.