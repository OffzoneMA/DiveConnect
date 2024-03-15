const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

const getAllBookings = async () => {
  return await Booking.find({});
};

const getBookingById = async (id) => {
  return await Booking.findById(id);
};

const updateBooking = async (id, bookingData) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    bookingData,
    { new: true }
  );
  return updatedBooking;
};

const deleteBooking = async (id) => {
  const deletedBooking = await Booking.findByIdAndDelete(id);
  return deletedBooking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
