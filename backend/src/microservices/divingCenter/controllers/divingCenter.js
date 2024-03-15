const express = require("express");
const router = express.Router();
const divingCenterService = require("../services/divingCenter");

// Get all diving centers
router.get("/", async (req, res) => {
  try {
    const divingCenters = await divingCenterService.getAllDivingCenters();
    res.status(200).json(divingCenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single diving center by ID
router.get("/:id", async (req, res) => {
  try {
    const divingCenter = await divingCenterService.getDivingCenterById(req.params.id);
    if (!divingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    res.status(200).json(divingCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new diving center
router.post("/", async (req, res) => {
  try {
    const newDivingCenter = await divingCenterService.createDivingCenter(req.body);
    res.status(201).json(newDivingCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a diving center by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDivingCenter = await divingCenterService.updateDivingCenter(
      req.params.id,
      req.body
    );
    if (!updatedDivingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    res.status(200).json(updatedDivingCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a diving center by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDivingCenter = await divingCenterService.deleteDivingCenter(
      req.params.id
    );
    if (!deletedDivingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    res.status(200).json({ message: "Diving center deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
