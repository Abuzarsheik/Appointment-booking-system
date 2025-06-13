const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const Service = require('../models/Service');

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true })
    .populate('staffMembers', 'firstName lastName email')
    .sort({ name: 1 });

  res.json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate('staffMembers', 'firstName lastName email');

  if (!service) {
    return res.status(404).json({
      success: false,
      error: 'Service not found'
    });
  }

  res.json({
    success: true,
    data: service
  });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private (Admin only)
const createService = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', protect, authorize('admin'), createService);

module.exports = router; 