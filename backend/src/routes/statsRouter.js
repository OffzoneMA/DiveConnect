const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const { authenticateUser } = require("../middleware/authentication");

// Route to get dive center stats
router.get("/divecenters",  statsController.getDiveCenterStats);

module.exports = router;