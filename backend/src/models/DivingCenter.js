const mongoose = require("mongoose");

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },

  image: { type: String },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  address2: { type: String },
  postalCode: { type: String },
  city: { type: String, required: true },
  website: { type: String },
  country: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("DivingCenter", divingCenterSchema);
