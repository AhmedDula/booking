const Booking = require("./booking.model");
//const property = require("../properties/property.model");
const calculatePrice = require("../../utils/priceCalculator");
const BOOKING_STATUS = require("../../constants/bookingStatus");
const ApiError = require("../../utils/ApiError");

exports.createBooking = async (bookingData) => {
  const { user, property, checkIn, checkOut, guests, specialRequests } =
    bookingData;

  const existingProperty = await property.findById(property);
  if (!existingProperty) {
    throw new Error("property not found");
  }
  // const { user, property, checkIn, checkOut, guests, specialRequests } =
  //   bookingData;

  // Validate dates
  if (new Date(checkIn) >= new Date(checkOut)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }
  const totalPrice = calculatePrice(existingProperty.price, checkIn, checkOut);

  const booking = await Booking.create({
    user,
    property,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    specialRequests,
  });

  return booking;
};

exports.getMyBookings = async (userId) => {
  const bookings = await Booking.find({
    user: userId,
  }).populate("property");
  return bookings;
};

exports.getAllBookings = async () => {
  const bookings = await Booking.find().populate("user").populate("property");
  return bookings;
};

exports.cancelBooking = async (bookingId, userID) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userID,
  });
  if (!booking) {
    throw new ApiError(404, "booking not found");
  }

  booking.status = BOOKING_STATUS.CANCELLED;

  await booking.save();

  return booking;
};

exports.updateBooking = async (bookingId, status) => {
  if (!Object.values(BOOKING_STATUS).includes(status)) {
    throw new ApiError(400, "booking status is invalid");
  }
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "no booking found");
  }

  booking.status = status;
  await booking.save();
  return booking;
};
