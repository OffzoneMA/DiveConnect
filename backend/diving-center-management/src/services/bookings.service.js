const bookingModel = require('../models/booking.model');

exports.getBookings = async () => {
  return await bookingModel.find({});
};

exports.createBooking = async (bookingData) => {
  const booking = new bookingModel(bookingData);
  return await booking.save();
};

exports.updateBooking = async (id, bookingData) => {
  return await bookingModel.findByIdAndUpdate(id, bookingData);
};

exports.deleteBooking = async (id) => {
  return await bookingModel.findByIdAndDelete(id);
};