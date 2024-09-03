const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: "DivingCenter", required: true }, // Added `required: true` for consistency
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Equipment", equipmentSchema);