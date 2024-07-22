const bookingService = require("../services/booking");
const divingCenterService = require("../../divingCenter/services/divingCenter");
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
    const { page = 1, limit = 10, sort = "latest" } = req.query; // Default values for pagination and sorting

    const centers = await divingCenterService.getAllDivingCentersOfUser(
      null,
      null,
      userId
    );
    console.log(centers);

    let bookingsPromises = centers.map(async (center) => {
      // Adjust the method to accept and handle pagination and sorting parameters
      const centerBookings = await bookingService.getAllBookingsOfCenter({
        centerId: center._id,
        page,
        limit,
        sort,
      });

      return {
        center: center,
        centerBooking: centerBookings,
      };
    });

    let bookings = await Promise.all(bookingsPromises);
    console.log(bookings);

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
