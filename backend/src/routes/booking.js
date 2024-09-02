const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { authenticateUser } = require("../middleware/authentication");

// router.use("/:divingCenterId", (req, res, next) => {
//   req.divingCenterId = req.params.divingCenterId;
//   next();
// });

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/user", [authenticateUser, bookingController.getAllBookingsOfUser]);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
