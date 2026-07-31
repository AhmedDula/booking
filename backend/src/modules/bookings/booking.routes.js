const router = require("express").Router();
const {
  createBooking,
  getMyBookings,
  getallBookings,
  updateBooking,
  cancelBooking,
} = require("./booking.controller");

const validate = require("../../middlewares/validate");
const {
  createBookingSchema,
  updateBookingStatusSchema,
} = require("./booking.validation");

router
  .route("/")
  .post(validate(createBookingSchema), createBooking)
  .get(getallBookings); //get(authMiddleware, restrictTo("admin"), getallBookings);

router.route("/my-bookings").get(getMyBookings);

router.route("/cancel/:id").patch(cancelBooking);
router
  .route("/status/:id")
  .patch(validate(updateBookingStatusSchema), updateBooking); //route("/status/:id", authMiddleware, restrictTo("admin"), updateBooking);
module.exports = router;
