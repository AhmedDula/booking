const Booking = require("../booking/booking.model");

const Booking = require("../booking/booking.model");

exports.getDashboardStats = async () => {
  const totalBookings = await Booking.countDocuments();

  const pendingBookings = await Booking.countDocuments({
    status: "pending",
  });

  const confirmedBookings = await Booking.countDocuments({
    status: "confirmed",
  });

  const cancelledBookings = await Booking.countDocuments({
    status: "cancelled",
  });

  return {
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
  };
};
