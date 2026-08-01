const express = require('express');
const adminController = require('./admin.controller');
const protect = require('../../middlewares/protect');
const allowTo = require('../../middlewares/restrictTo');
const ROLES = require('../../constants/roles');

const router = express.Router();

router.use(protect, allowTo(ROLES.ADMIN));

router.get('/stats', adminController.getDashboardStats);
router.get('/activity', adminController.getRecentActivity);

module.exports = router;