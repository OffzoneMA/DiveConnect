const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // define your booking schema here
});

module.exports = mongoose.model('Booking', bookingSchema);
