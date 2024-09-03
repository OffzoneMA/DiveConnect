const bookingService = require("../services/booking");
const divingCenterService = require("../services/divingCenter");
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllBookingsOfUser = async (req, res) => {
  try {
    const userId = req.body.user.userId;
    const centers = await divingCenterService.getAllDivingCentersOfUser(
      null,
      null,
      userId
    );
    let bookingsPromises = centers.map(async (center) => {
      return {
        center: center,
        centerBooking: await bookingService.getAllBookingsOfCenter({
          centerId: center._id,
        }),
      };
    });
    let bookings = await Promise.all(bookingsPromises);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBooking(
      req.params.id,
      req.body
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
