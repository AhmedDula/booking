const Booking = require("./booking.model");
const Property = require("../properties/properties.model");
const calculatePrice = require("../../utils/priceCalculator");
const BOOKING_STATUS = require("../../constants/bookingStatus");
const ApiError = require("../../utils/ApiError");

exports.createBooking = async (bookingData) => {
  console.log(bookingData);
  const { user, property, checkIn, checkOut, guests, specialRequests } =
    bookingData;
  console.log("Property ID:", property);
  const existingProperty = await Property.findById(property);
  if (!existingProperty) {
    throw new Error("property not found");
  }
  // const { user, property, checkIn, checkOut, guests, specialRequests } =
  //   bookingData;

  // Validate dates
  if (new Date(checkIn) >= new Date(checkOut)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }
  console.log("Property:", existingProperty);
  console.log("Price per night:", existingProperty.pricePerNight);
  console.log("Check in:", checkIn);
  console.log("Check out:", checkOut);
  const totalPrice = calculatePrice(
    existingProperty.pricePerNight,
    checkIn,
    checkOut,
  );
  console.log("Calculated price:", totalPrice);

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
