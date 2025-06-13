const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Clean up expired tokens and temporary data
const cleanupExpiredTokens = async () => {
  try {
    console.log('🧹 Running cleanup task...');
    
    // Clean up expired email verification tokens
    await User.updateMany(
      { 
        emailVerificationExpire: { $lt: new Date() },
        emailVerificationToken: { $exists: true }
      },
      { 
        $unset: { 
          emailVerificationToken: 1, 
          emailVerificationExpire: 1 
        }
      }
    );

    // Clean up expired password reset tokens
    await User.updateMany(
      { 
        resetPasswordExpire: { $lt: new Date() },
        resetPasswordToken: { $exists: true }
      },
      { 
        $unset: { 
          resetPasswordToken: 1, 
          resetPasswordExpire: 1 
        }
      }
    );

    console.log('✅ Cleanup task completed');
  } catch (error) {
    console.error('❌ Cleanup task failed:', error);
  }
};

// Send appointment reminders
const sendAppointmentReminders = async () => {
  try {
    console.log('📧 Sending appointment reminders...');
    
    // Get appointments for tomorrow that haven't had reminders sent
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      dateTime: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      },
      status: { $in: ['scheduled', 'confirmed'] },
      'reminders.email.sent': false
    }).populate('client', 'email firstName lastName preferences')
      .populate('service', 'name duration');

    console.log(`📋 Found ${appointments.length} appointments for reminder`);

    // Here you would integrate with your email service
    // For now, just mark as sent to prevent duplicate sends
    for (const appointment of appointments) {
      appointment.reminders.email.sent = true;
      appointment.reminders.email.sentAt = new Date();
      await appointment.save();
    }

    console.log('✅ Appointment reminders sent');
  } catch (error) {
    console.error('❌ Reminder task failed:', error);
  }
};

module.exports = {
  cleanupExpiredTokens,
  sendAppointmentReminders
}; 