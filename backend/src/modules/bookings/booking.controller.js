const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  updateBooking,
} = require("./booking.service");

const catchAsync = require("../../utils/catchAsync");
exports.createBooking = catchAsync(async (req, res) => {
  console.log(req.user);
  
  const booking = await createBooking({
    user: req.user._id,
    ...req.body,
  });
  res.status(201).json({
    status: "success",
    data: { booking },
  });
});

exports.getMyBookings = catchAsync(async (req, res) => {
  const bookings = await getMyBookings(req.user._id);
  res.status(200).json({
    status: "success",
    bookings_num: bookings.length,
    data: { bookings },
  });
});
exports.getallBookings = catchAsync(async (req, res) => {
  const bookings = await getAllBookings();
  res.status(200).json({
    status: "success",
    bookings_num: bookings.length,
    data: { bookings },
  });
});
exports.cancelBooking = catchAsync(async (req, res) => {
  const booking = await cancelBooking(req.params.id, req.user._id);
  res.status(200).json({
    status: "success",
    data: { booking },
  });
});

exports.updateBooking = catchAsync(async (req, res) => {
  const booking = await updateBooking(req.params.id, req.body.status);
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
