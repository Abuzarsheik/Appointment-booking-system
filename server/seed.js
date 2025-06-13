require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./src/utils/seedData');

const runSeeder = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/appointment-booking';
    await mongoose.connect(mongoURI);
    console.log('📦 Connected to MongoDB');

    // Run the seeder
    await seedData();

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
};

runSeeder(); 