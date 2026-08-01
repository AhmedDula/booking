const Booking = require("./booking.model");

const Rooms = require("../../modules/rooms/room.model");

const calculatePrice = require("../../utils/priceCalculator");
const BOOKING_STATUS = require("../../constants/bookingStatus");
const ApiError = require("../../utils/ApiError");

exports.createBooking = async (bookingData) => {
  const { user, room, checkIn, checkOut, guests, specialRequests } =
    bookingData.value;

  const existingRoom = await Rooms.findOne({ _id: room, available: true });
  if (!existingRoom) {
    throw new Error("Room not found");
  }
  if (guests > existingRoom.maxGuests) {
    throw new ApiError(
      400,
      `Maximum guests allowed for this room is ${existingRoom.maxGuests}`,
    );
  }
  console.log("max guets:", room.maxGuests);

  // Validate dates
  if (new Date(checkIn) >= new Date(checkOut)) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

  const totalPrice = calculatePrice(existingRoom.price, checkIn, checkOut);

  existingRoom.available = false; // Mark the room as unavailable
  await existingRoom.save(); // Save the room to ensure any changes are persisted
  const booking = await Booking.create({
    user,
    room,
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
  }).populate("room");
  return bookings;
};
// exports.getBookings = async () => {
//   const bookings = await Booking.find({}).populate("user").populate("room","");
//   return bookings;
// };

exports.getAllBookings = async () => {
  const bookings = await Booking.find().populate("user").populate("room");
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
  console.log(status);
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

exports.getBookings = async () => {
  const bookings = await Booking.find().populate("user").populate("room");
  return bookings;
};
