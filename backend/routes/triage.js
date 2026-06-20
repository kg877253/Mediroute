const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Fallback returned whenever Gemini is unreachable or returns bad JSON.
const FALLBACK = {
  specialty: "General Physician",
  urgency: "medium",
  reasoning: "Defaulted to general consultation.",
};

// The only specialties the app supports — Gemini must pick from this list.
const VALID_SPECIALTIES = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "ENT Specialist",
  "Gynecologist",
  "Dentist",
];

const VALID_URGENCIES = ["low", "medium", "high"];

const SYSTEM_INSTRUCTION =
  'You are a medical triage assistant for a navigation app. Given a patient\'s symptom ' +
  "description, determine: 1) the single most appropriate specialty from EXACTLY this list: " +
  '["General Physician", "Cardiologist", "Dermatologist", "Orthopedic", ' +
  '"Pediatrician", "ENT Specialist", "Gynecologist", "Dentist"], 2) urgency as ' +
  'exactly "low", "medium", or "high", 3) a one-sentence reasoning in plain language, ' +
  '4) a confidence integer from 0 to 100 estimating how clearly the symptoms map to one ' +
  'specialty — specific, textbook symptoms like "chest pain and shortness of breath" should ' +
  'score 85-95, moderately clear symptoms 60-80, and vague descriptions like "I don\'t feel ' +
  'well" should score 30-55. ' +
  "This is navigation, not diagnosis — never state a definitive diagnosis, only recommend " +
  "which type of doctor to see. If symptoms suggest a medical emergency (chest pain, " +
  'difficulty breathing, severe bleeding, loss of consciousness), set urgency to "high". ' +
  "Respond with ONLY valid JSON, no markdown code fences, no extra text: " +
  '{"specialty": "...", "urgency": "...", "reasoning": "...", "confidence": <0-100>}';

/**
 * POST /api/triage
 * Body: { symptomText: string }
 * Returns: { specialty, urgency, reasoning }
 */
router.post("/", async (req, res) => {
  try {
    const { symptomText } = req.body;

    if (!symptomText || typeof symptomText !== "string" || !symptomText.trim()) {
      return res.status(400).json({
        error: "symptomText is required and must be a non-empty string.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: { temperature: 0.2 },
    });

    const result = await model.generateContent(symptomText.trim());
    let text = result.response.text();

    // Strip markdown code fences if present (e.g. ```json ... ```)
    text = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);

    // Validate that the returned specialty is in our whitelist.
    // If Gemini hallucinated a specialty, fall back to General Physician.
    if (!VALID_SPECIALTIES.includes(parsed.specialty)) {
      console.warn(
        `Gemini returned unknown specialty "${parsed.specialty}", falling back.`
      );
      parsed.specialty = "General Physician";
    }

    // Gemini is instructed to return only low/medium/high, but we still
    // validate it so the UI never receives an unexpected urgency label.
    if (!VALID_URGENCIES.includes(parsed.urgency)) {
      console.warn(
        `Gemini returned unknown urgency "${parsed.urgency}", falling back.`
      );
      parsed.urgency = FALLBACK.urgency;
    }

    if (typeof parsed.reasoning !== "string" || !parsed.reasoning.trim()) {
      console.warn("Gemini returned empty reasoning, falling back.");
      parsed.reasoning = FALLBACK.reasoning;
    }

    // Validate the AI-estimated confidence score: must be an integer 0-100.
    // Default to 70 (moderate confidence) if missing or non-numeric.
    let confidence = typeof parsed.confidence === "number" ? parsed.confidence : 70;
    confidence = Math.round(confidence);
    confidence = Math.max(0, Math.min(100, confidence));

    return res.json({
      specialty: parsed.specialty,
      urgency: parsed.urgency,
      reasoning: parsed.reasoning.trim(),
      confidence,
      fallbackUsed: false,
    });
  } catch (err) {
    console.error("Triage error:", err.message || err);
    return res.json({ ...FALLBACK, confidence: 0, fallbackUsed: true });
  }
});

module.exports = router;
