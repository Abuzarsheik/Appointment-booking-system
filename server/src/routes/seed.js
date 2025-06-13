const express = require('express');
const seedData = require('../utils/seedData');
const router = express.Router();

// Temporary seeding endpoint (remove after use)
router.post('/seed-production', async (req, res) => {
  try {
    console.log('🌱 Starting production database seeding...');
    await seedData();
    
    res.status(200).json({
      success: true,
      message: 'Production database seeded successfully!',
      credentials: {
        admin: 'admin@medbook.com / admin123',
        client: 'demo@medbook.com / demo123',
        staff: 'sarah.johnson@medbook.com / staff123',
        user: 'john.smith@example.com / client123'
      }
    });
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router; 