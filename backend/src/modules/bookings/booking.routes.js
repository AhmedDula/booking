const router = require("express").Router();
const {
  createBooking,
  getMyBookings,
  getallBookings,
  updateBooking,
  cancelBooking,
} = require("./booking.controller");

router.route("/").post(createBooking).get(getallBookings); //get(authMiddleware, restrictTo("admin"), getallBookings);

router.route("/my-bookings").get(getMyBookings);

router.route("/cancel/:id").patch(cancelBooking);
router.route("/status/:id").patch(updateBooking); //route("/status/:id", authMiddleware, restrictTo("admin"), updateBooking);
module.exports = router;
