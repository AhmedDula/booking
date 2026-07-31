const asyncHandler = require('../../middlewares/asyncHandler');
const adminService = require('./admin.service');

// GET /api/admin/stats
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  res.json({ success: true, data: stats });
});

// GET /api/admin/activity
exports.getRecentActivity = asyncHandler(async (req, res) => {
  const activity = await adminService.getRecentActivity(Number(req.query.limit) || 10);
  res.json({ success: true,totalBookings: activity.recentBookings.length, totalDisputes: activity.recentDisputes.length, data: activity });
});