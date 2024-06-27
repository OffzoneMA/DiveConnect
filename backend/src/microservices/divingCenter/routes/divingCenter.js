const express = require("express");
const router = express.Router();
const divingCenterController = require("../controllers/divingCenter");

router.get("/", divingCenterController.getDivingCenters);
router.get("/:id", divingCenterController.getDivingCenter);
router.post("/", divingCenterController.createDivingCenter);
router.put("/:id", divingCenterController.updateDivingCenter);
router.delete("/:id", divingCenterController.deleteDivingCenter);
router.get("/:id/bookings", divingCenterController.getDivingCenterBookings);
router.post("/:id/bookings", divingCenterController.createDivingCenterBooking);
router.get(
  "/:id/bookings/:bookingId",
  divingCenterController.getDivingCenterBooking
);
router.put(
  "/:id/bookings/:bookingId",
  divingCenterController.updateDivingCenterBooking
);
router.delete(
  "/:id/bookings/:bookingId",
  divingCenterController.deleteDivingCenterBooking
);

router.post("/deviseForm", divingCenterController.createDeviseForm);

module.exports = router;
