# 🩺 Professional Appointment Booking System

A modern, full-stack appointment booking system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring TypeScript, Tailwind CSS, and comprehensive security measures.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)

## 🌟 Features

### 📊 **Enhanced Functionalities**
- **🗓️ Calendar Integration**: Full calendar view with drag-and-drop functionality
- **📧 Email Notifications**: Automated email confirmations and reminders using Nodemailer
- **⏰ Smart Time Slots**: Intelligent time slot management with conflict prevention
- **🔄 Rescheduling & Cancellation**: Flexible appointment management with policies
- **📱 Real-time Updates**: Live appointment updates using Socket.IO
- **🔍 Advanced Filtering**: Comprehensive search and filter capabilities
- **📄 Pagination**: Efficient data loading with pagination

### 🛡️ **Security Features**
- **🔐 JWT Authentication**: Secure token-based authentication
- **🚫 Rate Limiting**: Prevent abuse with configurable rate limits
- **🔒 Password Hashing**: Bcrypt with salt rounds for secure password storage
- **🛡️ CSRF Protection**: Cross-site request forgery protection
- **🧼 Data Sanitization**: MongoDB injection and XSS prevention
- **⚡ Security Headers**: Helmet.js for security headers
- **🔐 Account Lockout**: Automatic account lockout after failed attempts

### 🧪 **Validation & Error Handling**
- **✅ Zod Validation**: Comprehensive form validation with Zod
- **🚨 Error Boundaries**: React error boundaries for graceful error handling
- **📝 Field Validation**: Real-time form validation with helpful error messages
- **🔄 Async Error Handling**: Proper async/await error handling throughout

### 💨 **Performance Optimizations**
- **🚀 Code Splitting**: Lazy loading for optimal bundle sizes
- **🧠 Memoization**: React.memo and useMemo for performance
- **⚡ React Query**: Efficient data fetching with caching
- **🔄 Debounced Search**: Optimized search with debouncing
- **📦 Bundle Optimization**: Webpack optimizations for production

### 🎨 **Modern UI/UX**
- **🌓 Dark/Light Mode**: System preference detection with manual toggle
- **📱 Responsive Design**: Mobile-first responsive design
- **🎭 Animations**: Smooth transitions with Framer Motion
- **🔔 Toast Notifications**: User-friendly notifications with react-hot-toast
- **💀 Loading Skeletons**: Skeleton loading states for better UX
- **🎨 Tailwind CSS**: Modern utility-first CSS framework

### ♿ **Accessibility (a11y)**
- **🎯 ARIA Labels**: Comprehensive ARIA attributes
- **⌨️ Keyboard Navigation**: Full keyboard accessibility
- **🔍 Screen Reader Support**: Optimized for screen readers
- **🌈 Color Contrast**: WCAG compliant color contrast ratios
- **🎨 Focus Indicators**: Clear focus indicators for interactive elements

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/appointment-booking-system.git
   cd appointment-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   **Server (.env):**
   ```bash
   cp server/env.example server/.env
   ```
   
   Update the server/.env file with your configurations:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/appointment_booking
   
   # JWT
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   
   # Email (Gmail example)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Other configurations...
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the server (port 5000) and client (port 3000) concurrently.

## 📁 Project Structure

```
appointment-booking-system/
├── 📁 client/                  # React frontend
│   ├── 📁 public/             # Static assets
│   │   ├── 📁 common/     # Common components
│   │   ├── 📁 forms/      # Form components
│   │   ├── 📁 layout/     # Layout components
│   │   ├── 📁 ui/         # UI components
│   │   ├── 📁 contexts/       # React contexts
│   │   ├── 📁 hooks/          # Custom hooks
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 services/       # API services
│   │   ├── 📁 types/          # TypeScript types
│   │   └── 📁 styles/         # CSS and Tailwind
│   ├── 📄 package.json
│   └── 📄 tailwind.config.js
├── 📁 server/                 # Node.js backend
│   ├── 📁 src/
│   │   ├── 📁 config/         # Database config
│   │   ├── 📁 controllers/    # Route controllers
│   │   ├── 📁 middleware/     # Custom middleware
│   │   ├── 📁 models/         # Mongoose models
│   │   ├── 📁 routes/         # API routes
│   │   ├── 📁 utils/          # Utility functions
│   │   └── 📄 server.js       # Main server file
│   ├── 📄 package.json
│   └── 📄 env.example         # Environment template
├── 📄 package.json            # Root package.json
└── 📄 README.md              # This file
```

## 🎯 Usage

### 👥 User Roles

**👤 Client:**
- Browse and book appointments
- View appointment history
- Reschedule/cancel appointments
- Rate and review services
- Manage profile and preferences

**👨‍💼 Staff:**
- View assigned appointments
- Manage schedule and availability
- Update appointment status
- Add notes and follow-ups
- View client information

**👨‍💻 Admin:**
- Full system management
- User and staff management
- Service configuration
- Analytics and reporting
- System settings

### 📊 Key Features Walkthrough

1. **🗓️ Calendar View**
   - Monthly/weekly calendar display
   - Drag-and-drop appointments
   - Color-coded status indicators
   - Quick appointment details

2. **📧 Email System**
   - Booking confirmations
   - Reminder notifications
   - Cancellation notices
   - Custom email templates

3. **⏰ Time Slot Management**
   - Automatic conflict detection
   - Buffer time handling
   - Business hours enforcement
   - Holiday/blackout dates

4. **📱 Real-time Features**
   - Live appointment updates
   - Staff availability changes
   - Instant notifications
   - Multi-user synchronization

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
PUT  /api/auth/profile     # Update profile
PUT  /api/auth/change-password  # Change password
```

### Appointment Endpoints
```
GET    /api/appointments          # Get appointments
POST   /api/appointments          # Create appointment
GET    /api/appointments/:id      # Get appointment by ID
PUT    /api/appointments/:id      # Update appointment
DELETE /api/appointments/:id      # Cancel appointment
GET    /api/appointments/available-slots  # Get available slots
```

### Service Endpoints
```
GET    /api/services              # Get services
POST   /api/services              # Create service (admin)
GET    /api/services/:id          # Get service by ID
PUT    /api/services/:id          # Update service (admin)
DELETE /api/services/:id          # Delete service (admin)
```

## 🔒 Security Best Practices

- **Input Validation**: All inputs validated with Zod schemas
- **Authentication**: JWT tokens with secure expiration
- **Authorization**: Role-based access control
- **Rate Limiting**: Prevents brute force attacks
- **Data Sanitization**: Prevents injection attacks
- **Secure Headers**: Helmet.js security headers
- **HTTPS**: SSL/TLS encryption in production
- **Password Security**: Bcrypt with salt rounds
- **Session Management**: Secure token handling

## 🧪 Testing

```bash
# Run server tests
cd server && npm test

# Run client tests
cd client && npm test

# Run all tests
npm test
```

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
MONGODB_URI_PROD=your-production-mongodb-uri
CLIENT_URL_PROD=https://your-domain.com
```

### Deployment Options
- **Heroku**: Ready for Heroku deployment
- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment
- **AWS**: Enterprise deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and the React team
- Node.js community
- MongoDB team
- Tailwind CSS creators
- All open-source contributors

## 📞 Support

For support, email support@yourcompany.com or join our Slack channel.

---

**Made with ❤️ by [Your Name]** 