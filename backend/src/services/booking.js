const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

const getAllBookings = async () => {
  return await Booking.find({});
};
// const getAllBookingsOfCenter = async ({ centerId }) => {
//   let bookings = await Booking.find({ divingCenter: centerId });
//   let bookingsPromises = bookings.map(async (booking) => {
//     let equipmentsPromises = booking.equipments.map(async (equipment) => {
//       let equipmentData = await Equipment.findById(equipment.equipment);
//     });
//   });
//   const finalBookings = await Promise.all(bookingsPromises);
//   return finalBookings;
// };

const getAllBookingsOfCenter = async ({ centerId }) => {
  let bookings = await Booking.find({ divingCenter: centerId });
  return bookings;
};
const getBookingById = async (id) => {
  return await Booking.findById(id);
};

const updateBooking = async (id, bookingData) => {
  const updatedBooking = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
  });
  return updatedBooking;
};

const deleteBooking = async (id) => {
  // const deletedBooking = await Booking.findByIdAndDelete(id);
  const deletedBooking = await Booking.deleteMany({});

  return deletedBooking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookingsOfCenter,
};
