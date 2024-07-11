const Equipment = require("../models/Equipment"); // Assuming you have an Equipment model
const DivingCenter = require("../models/DivingCenter"); // Assuming you have a DivingCenter model
const equipmentController = {
  getEquipments: async (req, res) => {
    try {
      const equipments = await Equipment.find({});
      res.json(equipments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEquipment: async (req, res) => {
    try {
      const equipment = await Equipment.findById(req.params.id);
      if (!equipment) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createEquipment: async (req, res) => {
    try {
      if (
        !req.body.divingCenter ||
        !DivingCenter.findById(req.body.divingCenter)
      ) {
        return res.status(404).json({ error: "Diving center not found" });
      }
      const newEquipment = new Equipment(req.body);
      const savedEquipment = await newEquipment.save();
      res.status(201).json(savedEquipment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateEquipment: async (req, res) => {
    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEquipment) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json(updatedEquipment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteEquipment: async (req, res) => {
    try {
      const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
      if (!deletedEquipment) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json({ message: "Equipment successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = equipmentController;
