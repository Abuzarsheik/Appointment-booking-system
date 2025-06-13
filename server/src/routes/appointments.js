const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const Appointment = require('../models/Appointment');

const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  let query = {};
  
  // If not admin, only show user's appointments
  if (req.user.role !== 'admin') {
    if (req.user.role === 'staff') {
      query.staff = req.user.id;
    } else {
      query.client = req.user.id;
    }
  }

  const appointments = await Appointment.find(query)
    .populate('client', 'firstName lastName email phone')
    .populate('service', 'name duration price')
    .populate('staff', 'firstName lastName email')
    .sort({ dateTime: 1 });

  res.json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, staffId, dateTime, notes } = req.body;

  const appointment = await Appointment.create({
    client: req.user.id,
    service: serviceId,
    staff: staffId,
    dateTime: new Date(dateTime),
    notes: { client: notes },
    createdBy: req.user.id
  });

  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('client', 'firstName lastName email phone')
    .populate('service', 'name duration price')
    .populate('staff', 'firstName lastName email');

  res.status(201).json({
    success: true,
    data: populatedAppointment
  });
});

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);

module.exports = router; 