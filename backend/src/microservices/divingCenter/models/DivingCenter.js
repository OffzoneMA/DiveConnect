const mongoose = require("mongoose");

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("DivingCenter", divingCenterSchema);
