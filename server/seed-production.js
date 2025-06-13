const mongoose = require('mongoose');
const seedData = require('./src/utils/seedData');

// Production MongoDB URI (same as Railway)
const PRODUCTION_MONGODB_URI = 'mongodb+srv://abuzarsheikh:abuzarsheikh123@cluster0.1lqcf.mongodb.net/appointment-booking?retryWrites=true&w=majority&appName=Cluster0';

const seedProduction = async () => {
  try {
    console.log('🚀 Connecting to PRODUCTION MongoDB Atlas...');
    await mongoose.connect(PRODUCTION_MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    console.log('✅ Connected to production database');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

    // Run the seeding
    await seedData();

    console.log('🎉 Production database seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Production seeding failed:', error);
    process.exit(1);
  }
};

seedProduction(); 