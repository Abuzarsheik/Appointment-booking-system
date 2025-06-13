const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔗 User connected: ${socket.id}`);

    // Join user to their own room for personal notifications
    socket.on('join-user-room', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`👤 User ${userId} joined room: user-${userId}`);
    });

    // Join appointment room for real-time updates
    socket.on('join-appointment-room', (appointmentId) => {
      socket.join(`appointment-${appointmentId}`);
      console.log(`📅 User joined appointment room: appointment-${appointmentId}`);
    });

    // Handle appointment updates
    socket.on('appointment-update', (data) => {
      // Broadcast to appointment room
      socket.to(`appointment-${data.appointmentId}`).emit('appointment-updated', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = { initializeSocket }; 