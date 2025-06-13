const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Appointment.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create Admin User
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@medbook.com',
      password: 'admin123',
      phone: '+1234567890',
      role: 'admin',
      isEmailVerified: true
    });

    // Create Staff Members
    const staffMembers = await User.create([
      {
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@medbook.com',
        password: 'staff123',
        phone: '+1234567891',
        role: 'staff',
        isEmailVerified: true
      },
      {
        firstName: 'Dr. Michael',
        lastName: 'Chen',
        email: 'michael.chen@medbook.com',
        password: 'staff123',
        phone: '+1234567892',
        role: 'staff',
        isEmailVerified: true
      },
      {
        firstName: 'Lisa',
        lastName: 'Williams',
        email: 'lisa.williams@medbook.com',
        password: 'staff123',
        phone: '+1234567893',
        role: 'staff',
        isEmailVerified: true
      },
      {
        firstName: 'Dr. James',
        lastName: 'Rodriguez',
        email: 'james.rodriguez@medbook.com',
        password: 'staff123',
        phone: '+1234567894',
        role: 'staff',
        isEmailVerified: true
      },
      {
        firstName: 'Dr. Emily',
        lastName: 'Davis',
        email: 'emily.davis@medbook.com',
        password: 'staff123',
        phone: '+1234567895',
        role: 'staff',
        isEmailVerified: true
      }
    ]);

    // Create Demo Client
    const demoClient = await User.create({
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@medbook.com',
      password: 'demo123',
      phone: '+1234567896',
      role: 'client',
      isEmailVerified: true
    });

    // Create Additional Clients
    const clients = await User.create([
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        password: 'client123',
        phone: '+1234567897',
        role: 'client',
        isEmailVerified: true
      },
      {
        firstName: 'Emma',
        lastName: 'Brown',
        email: 'emma.brown@example.com',
        password: 'client123',
        phone: '+1234567898',
        role: 'client',
        isEmailVerified: true
      },
      {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@example.com',
        password: 'client123',
        phone: '+1234567899',
        role: 'client',
        isEmailVerified: true
      },
      {
        firstName: 'Sophie',
        lastName: 'Taylor',
        email: 'sophie.taylor@example.com',
        password: 'client123',
        phone: '+1234567800',
        role: 'client',
        isEmailVerified: true
      }
    ]);

    console.log('👥 Created users successfully');

    // Create Services
    const services = await Service.create([
      {
        name: 'General Consultation',
        description: 'Comprehensive health checkup and consultation with our experienced physicians. Includes basic health assessment, medical history review, and personalized health recommendations.',
        duration: 30,
        price: { amount: 100, currency: 'USD' },
        category: 'consultation',
        staffMembers: [staffMembers[0]._id, staffMembers[1]._id],
        availability: {
          monday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          tuesday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          wednesday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          thursday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          friday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] }
        },
        tags: ['general', 'checkup', 'consultation'],
        createdBy: adminUser._id
      },
      {
        name: 'Dental Cleaning',
        description: 'Professional dental cleaning and oral health examination. Includes plaque removal, teeth polishing, fluoride treatment, and oral hygiene guidance.',
        duration: 45,
        price: { amount: 80, currency: 'USD' },
        category: 'treatment',
        staffMembers: [staffMembers[1]._id],
        availability: {
          monday: { enabled: true, slots: [{ startTime: '08:00', endTime: '16:00' }] },
          tuesday: { enabled: true, slots: [{ startTime: '08:00', endTime: '16:00' }] },
          wednesday: { enabled: true, slots: [{ startTime: '08:00', endTime: '16:00' }] },
          thursday: { enabled: true, slots: [{ startTime: '08:00', endTime: '16:00' }] },
          friday: { enabled: true, slots: [{ startTime: '08:00', endTime: '16:00' }] }
        },
        tags: ['dental', 'cleaning', 'oral health'],
        preparationInstructions: 'Please avoid eating 2 hours before your appointment. Bring your insurance card and previous dental records if available.',
        createdBy: adminUser._id
      },
      {
        name: 'Physical Therapy Session',
        description: 'Personalized physical therapy session for rehabilitation and pain management. Includes assessment, therapeutic exercises, and treatment planning.',
        duration: 60,
        price: { amount: 120, currency: 'USD' },
        category: 'therapy',
        staffMembers: [staffMembers[2]._id],
        availability: {
          monday: { enabled: true, slots: [{ startTime: '07:00', endTime: '18:00' }] },
          tuesday: { enabled: true, slots: [{ startTime: '07:00', endTime: '18:00' }] },
          wednesday: { enabled: true, slots: [{ startTime: '07:00', endTime: '18:00' }] },
          thursday: { enabled: true, slots: [{ startTime: '07:00', endTime: '18:00' }] },
          friday: { enabled: true, slots: [{ startTime: '07:00', endTime: '18:00' }] }
        },
        tags: ['physical therapy', 'rehabilitation', 'pain management'],
        preparationInstructions: 'Wear comfortable, loose-fitting clothing. Bring any relevant medical reports or imaging results.',
        createdBy: adminUser._id
      },
      {
        name: 'Cardiology Consultation',
        description: 'Specialized cardiac consultation with ECG, blood pressure monitoring, and cardiovascular risk assessment by our cardiologist.',
        duration: 45,
        price: { amount: 200, currency: 'USD' },
        category: 'consultation',
        staffMembers: [staffMembers[3]._id],
        availability: {
          monday: { enabled: true, slots: [{ startTime: '10:00', endTime: '16:00' }] },
          wednesday: { enabled: true, slots: [{ startTime: '10:00', endTime: '16:00' }] },
          friday: { enabled: true, slots: [{ startTime: '10:00', endTime: '16:00' }] }
        },
        tags: ['cardiology', 'heart', 'specialist'],
        preparationInstructions: 'Fast for 12 hours before appointment if blood work is required. Bring list of current medications.',
        createdBy: adminUser._id
      },
      {
        name: 'Dermatology Checkup',
        description: 'Comprehensive skin examination and dermatological consultation. Includes mole mapping, skin cancer screening, and treatment recommendations.',
        duration: 30,
        price: { amount: 150, currency: 'USD' },
        category: 'checkup',
        staffMembers: [staffMembers[4]._id],
        availability: {
          tuesday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          thursday: { enabled: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
          saturday: { enabled: true, slots: [{ startTime: '09:00', endTime: '13:00' }] }
        },
        tags: ['dermatology', 'skin', 'screening'],
        preparationInstructions: 'Remove all makeup and nail polish. Wear comfortable clothing for easy examination.',
        createdBy: adminUser._id
      },
      {
        name: 'Mental Health Counseling',
        description: 'Professional mental health counseling session. Confidential support for anxiety, depression, stress management, and personal development.',
        duration: 50,
        price: { amount: 130, currency: 'USD' },
        category: 'therapy',
        staffMembers: [staffMembers[0]._id, staffMembers[2]._id],
        availability: {
          monday: { enabled: true, slots: [{ startTime: '09:00', endTime: '18:00' }] },
          tuesday: { enabled: true, slots: [{ startTime: '09:00', endTime: '18:00' }] },
          wednesday: { enabled: true, slots: [{ startTime: '09:00', endTime: '18:00' }] },
          thursday: { enabled: true, slots: [{ startTime: '09:00', endTime: '18:00' }] },
          friday: { enabled: true, slots: [{ startTime: '09:00', endTime: '18:00' }] }
        },
        tags: ['mental health', 'counseling', 'therapy'],
        preparationInstructions: 'Come with an open mind and any specific topics you\'d like to discuss.',
        createdBy: adminUser._id
      }
    ]);

    console.log('🏥 Created services successfully');

    // Create Appointments (mix of past, current, and future)
    const now = new Date();
    const appointments = [];

    // Past appointments (completed)
    for (let i = 1; i <= 15; i++) {
      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - i);
      pastDate.setHours(9 + (i % 8), 0, 0, 0);

      appointments.push({
        client: [demoClient._id, ...clients.map(c => c._id)][i % 5],
        service: services[i % services.length]._id,
        staff: services[i % services.length].staffMembers[0],
        dateTime: pastDate,
        status: 'completed'
      });
    }

    // Current/Future appointments (scheduled and confirmed)
    for (let i = 1; i <= 20; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(now.getDate() + i);
      futureDate.setHours(9 + (i % 8), 0, 0, 0);

      const statuses = ['scheduled', 'confirmed'];
      appointments.push({
        client: [demoClient._id, ...clients.map(c => c._id)][i % 5],
        service: services[i % services.length]._id,
        staff: services[i % services.length].staffMembers[0],
        dateTime: futureDate,
        status: statuses[i % 2]
      });
    }

    // Some cancelled appointments
    for (let i = 1; i <= 5; i++) {
      const cancelledDate = new Date(now);
      cancelledDate.setDate(now.getDate() + i + 20);
      cancelledDate.setHours(14 + (i % 3), 0, 0, 0);

      appointments.push({
        client: clients[i % clients.length]._id,
        service: services[i % services.length]._id,
        staff: services[i % services.length].staffMembers[0],
        dateTime: cancelledDate,
        status: 'cancelled'
      });
    }

    await Appointment.create(appointments);
    console.log('📅 Created appointments successfully');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Users: ${await User.countDocuments()}`);
    console.log(`🏥 Services: ${await Service.countDocuments()}`);
    console.log(`📅 Appointments: ${await Appointment.countDocuments()}`);
    
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@medbook.com / admin123');
    console.log('Demo Client: demo@medbook.com / demo123');
    console.log('Staff: sarah.johnson@medbook.com / staff123');
    console.log('Client: john.smith@example.com / client123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = seedData; 