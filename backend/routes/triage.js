const express = require("express");
const { GoogleGenerativeAI, Type } = require("@google/generative-ai");

const router = express.Router();

const FALLBACK = {
  specialty: "General Physician",
  urgency: "medium",
  reasoning: "Defaulted to general consultation.",
};

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
  "You are a medical triage assistant for a navigation app. Given a patient's symptom description, determine: 1) the single most appropriate specialty from the whitelist, 2) urgency as low, medium, or high, 3) a one-sentence reasoning, 4) confidence score. Do not diagnose.";

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
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialty: {
              type: Type.STRING,
              enum: VALID_SPECIALTIES
            },
            urgency: {
              type: Type.STRING,
              enum: VALID_URGENCIES
            },
            reasoning: { type: Type.STRING },
            confidence: { type: Type.INTEGER }
          },
          required: ["specialty", "urgency", "reasoning", "confidence"]
        }
      },
    });

    const result = await model.generateContent(symptomText.trim());
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return res.json({
      specialty: parsed.specialty,
      urgency: parsed.urgency,
      reasoning: parsed.reasoning,
      confidence: Math.max(0, Math.min(100, parsed.confidence)),
      fallbackUsed: false,
    });
  } catch (err) {
    console.error("Triage error:", err.message || err);
    return res.json({ ...FALLBACK, confidence: 50, fallbackUsed: true });
  }
});

module.exports = router;