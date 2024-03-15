const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  divingCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'DivingCenter' },
  date: { type: Date, required: true },
  numberOfDivers: { type: Number, required: true },
  // add more fields as needed
});

module.exports = mongoose.model('Booking', bookingSchema);
