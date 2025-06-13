const express = require('express');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  // Placeholder for notifications - would integrate with actual notification system
  const notifications = [];

  res.json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

router.use(protect);
router.get('/', getNotifications);

module.exports = router; 