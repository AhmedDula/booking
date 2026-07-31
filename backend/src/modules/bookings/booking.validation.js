const yup = require("yup");
const BOOKING_STATUS = require("../../constants/bookingStatus");

exports.createBookingSchema = yup.object({
  user: yup.string().trim().required("User is required"),

  property: yup.string().trim().required("Property is required"),

  checkIn: yup.date().required("Check-in date is required"),

  checkOut: yup
    .date()
    .required("Check-out date is required")
    .min(yup.ref("checkIn"), "Check-out date must be after check-in date"),

  guests: yup
    .number()
    .integer("Guests must be an integer")
    .min(1, "Guests must be at least 1")
    .required("Guests is required"),

  specialRequests: yup.string().nullable(),
});

exports.updateBookingStatusSchema = yup.object({
  status: yup
    .string()
    .oneOf(Object.values(BOOKING_STATUS), "Invalid booking status")
    .required("Status is required"),
});
