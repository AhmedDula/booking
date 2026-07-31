const router = require("express").Router();
const protect = require("../../middlewares/protect");
const ROLES = require("../../constants/roles");
const restrictTo = require("../../middlewares/restrictTo");
const {
  createBooking,
  getMyBookings,
  getallBookings,
  updateBooking,
  cancelBooking,
} = require("./booking.controller");

const validate = require("../../middlewares/validateYup");
const {
  createBookingSchema,
  updateBookingStatusSchema,
} = require("./booking.validation");

router
  .route("/")

  .post(protect, validate(createBookingSchema), createBooking)

  .get(protect, restrictTo(ROLES.ADMIN), getallBookings);

router.route("/my-bookings").get(protect, getMyBookings);

router.route("/cancel/:id").patch(protect, cancelBooking);
router
  .route("/status/:id")
  .patch(
    protect,
    validate(updateBookingStatusSchema),
    restrictTo(ROLES.ADMIN),
    updateBooking,
  );
module.exports = router;
