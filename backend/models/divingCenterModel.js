const mongoose = require('mongoose');

const divingCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  pricing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pricing' }],
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

module.exports = mongoose.model('DivingCenter', divingCenterSchema);
