# MediRoute Frontend

React + Vite frontend for the MediRoute hackathon MVP.

## What It Does

- Lets a user describe symptoms in plain English.
- Lets the user choose one supported city: Delhi, Mumbai, Jaipur, Goa, or Bangalore.
- Sends symptoms to the backend triage endpoint.
- Shows recommended specialty, urgency, reasoning, and matching doctors.
- Shows high-urgency emergency guidance with a `tel:112` action.
- Supports an emergency mode modal and downloadable PDF emergency card.

MediRoute is a healthcare navigation tool, not a diagnosis tool. The UI should never claim to diagnose a disease.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The frontend expects:

```env
VITE_API_URL=http://localhost:5000
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment

Deploy target: Vercel.

Set `VITE_API_URL` to the deployed Render backend URL before production deployment.
