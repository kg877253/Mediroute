const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
// Demo configuration: Open CORS for hackathon judging accessibility
app.use(cors());
app.use(express.json());

// ---------- Routes ----------

// Health-check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Symptom-triage endpoint (Gemini-powered)
const triageRouter = require("./routes/triage");
app.use("/api/triage", triageRouter);

// Doctor search endpoint
const searchRouter = require("./routes/search");
app.use("/api/search", searchRouter);

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`MediRoute backend running on http://localhost:${PORT}`);
});
