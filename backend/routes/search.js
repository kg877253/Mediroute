const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

/**
 * POST /api/search
 * Body: { specialty: string, city: string }
 * Returns: array of up to 5 doctor objects sorted by rating descending
 */
router.post("/", searchController.searchDoctors);

module.exports = router;
