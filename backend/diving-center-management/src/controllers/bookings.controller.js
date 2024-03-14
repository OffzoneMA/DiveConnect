const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookings.service');

router.get('/', bookingService.getBookings);
router.post('/', bookingService.createBooking);
router.put('/:id', bookingService.updateBooking);
router.delete('/:id', bookingService.deleteBooking);

module.exports = router;