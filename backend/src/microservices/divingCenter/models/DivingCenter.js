const mongoose = require('mongoose');

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  // add more fields as needed
});

module.exports = mongoose.model('DivingCenter', divingCenterSchema);
