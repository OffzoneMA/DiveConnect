const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment");

router.get("/", equipmentController.getEquipments);
router.get("/:id", equipmentController.getEquipment);
router.post("/", equipmentController.createEquipment);

router.put("/:id", equipmentController.updateEquipment);
router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
