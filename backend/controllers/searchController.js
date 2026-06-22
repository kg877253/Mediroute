const fs = require("fs");
const path = require("path");

const DOCTORS_FILE_PATH = path.join(__dirname, "../data/doctors.json");

exports.searchDoctors = (req, res) => {
  try {
    const { specialty, city } = req.body;

    // Validate inputs
    if (!city || typeof city !== "string" || !city.trim()) {
      return res.status(400).json({ error: "city is required and must be a string" });
    }
    if (!specialty || typeof specialty !== "string" || !specialty.trim()) {
      return res.status(400).json({ error: "specialty is required and must be a string" });
    }

    const cleanCity = city.trim().toLowerCase();
    const cleanSpecialty = specialty.trim().toLowerCase();

    // Read static doctors dataset
    const rawData = fs.readFileSync(DOCTORS_FILE_PATH, "utf8");
    const doctors = JSON.parse(rawData);

    // 1. Filter by both city AND specialty (case-insensitive)
    let filtered = doctors.filter((doc) => {
      return (
        doc.city.toLowerCase() === cleanCity &&
        doc.specialty.toLowerCase() === cleanSpecialty
      );
    });

    // 2. Specialty fallback search:
    // If no doctors match the requested specialty in that city,
    // fall back to showing all doctors in that city regardless of specialty.
    let usedFallback = false;
    if (filtered.length === 0) {
      filtered = doctors.filter((doc) => doc.city.toLowerCase() === cleanCity);
      usedFallback = true;
    }

    // 3. Sort results by rating descending
    filtered.sort((a, b) => b.rating - a.rating);

    // 4. Take the top 8 results so users can compare more options
    // while keeping the MVP results page easy to scan during a demo.
    const results = filtered.slice(0, 8);

    return res.json({
      success: true,
      fallbackUsed: usedFallback,
      results
    });
  } catch (err) {
    console.error("Search error:", err.message || err);
    return res.status(500).json({ error: "Failed to perform search" });
  }
};
