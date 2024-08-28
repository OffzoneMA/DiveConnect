const express = require("express");
const router = express.Router();
const divingCenterController = require("../controllers/divingCenter");
const { authenticateUser } = require("../../../middleware/authentication");

router.get("/", divingCenterController.getDivingCenters);
router.get("/user", [
  authenticateUser,
  divingCenterController.getDivingCenterUser,
]);
router.get("/cities", divingCenterController.getCities);

router.get("/:id", divingCenterController.getDivingCenter);
router.post("/", [authenticateUser, divingCenterController.createDivingCenter]);
router
  .route("/deviseForm")
  .post([authenticateUser, divingCenterController.createDeviseForm]);

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

module.exports = router;
