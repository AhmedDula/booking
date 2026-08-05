const User = require('../users/user.model');
const Property = require('../properties/properties.model');
const Booking = require('../bookings/booking.model');
const Dispute = require('../disputes/dispute.model');
const BOOKING_STATUS = require('../../constants/bookingStatus');
const DISPUTE_STATUS = require('../../constants/disputes');
const asyncHandler = require('../../middlewares/asyncHandler');

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalProperties,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    openDisputes,
    revenueAgg,
  ] = await Promise.all([
    User.countDocuments(),
    Property.countDocuments({ isDeleted: false }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: BOOKING_STATUS.PENDING }),
    Booking.countDocuments({ status: BOOKING_STATUS.CONFIRMED }),
    Dispute.countDocuments({ status: DISPUTE_STATUS.RESOLVED }),
    Booking.aggregate([
      { $match: { status: { $in: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.COMPLETED] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]),
  ]);

  return {
    totalUsers,
    totalProperties,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    openDisputes,
    totalRevenue: revenueAgg[0]?.total || 0,
  };
};

const getRecentActivity = async (limit = 10) => {
  const [recentBookings, recentDisputes] = await Promise.all([
    Booking.find()
  .populate('user', 'name')
  .populate('room', 'name') // was 'title' — Room schema field is 'name', not 'title'
  .sort('-createdAt')
  .limit(limit),
    Dispute.find().populate('user', 'name').sort('-createdAt').limit(limit),
  ]);
  return { recentBookings, recentDisputes };
};

module.exports = { getDashboardStats, getRecentActivity };