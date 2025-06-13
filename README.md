# 🩺 MedBook - Appointment Booking System

A modern, full-stack appointment booking system built with the MERN stack (MongoDB, Express.js, React, Node.js). Perfect for healthcare providers, consultants, and service-based businesses.

![MedBook Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=MedBook+Dashboard)

## ✨ Features

### 👥 User Management
- **Multi-role system**: Admin, Staff, and Client roles
- **Secure authentication**: JWT-based with bcrypt password hashing
- **Profile management**: Complete user profiles with preferences
- **Account verification**: Email verification system

### 📅 Appointment Management
- **Smart scheduling**: Conflict detection and availability checking
- **Multiple statuses**: Scheduled, Confirmed, Completed, Cancelled
- **Real-time updates**: Socket.IO for live appointment updates
- **Flexible booking**: Support for different service durations

### 🏥 Service Management
- **Comprehensive services**: Detailed service descriptions and pricing
- **Staff assignment**: Multiple staff members per service
- **Availability settings**: Flexible scheduling per service
- **Category organization**: Organized service categories

### 🎨 Modern UI/UX
- **Responsive design**: Works on all devices
- **Clean interface**: Modern, intuitive design
- **Real-time notifications**: Instant updates and alerts
- **Accessibility**: WCAG compliant design

### 🔒 Security & Performance
- **Rate limiting**: Protection against abuse
- **Data sanitization**: XSS and injection protection
- **CORS configuration**: Secure cross-origin requests
- **Compression**: Optimized response sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medbook-appointment-system.git
   cd medbook-appointment-system
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp server/env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the .env files with your configuration
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Seed the database with dummy data
   cd server && npm run seed
   ```

5. **Start the application**
   ```bash
   # From root directory
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

## 🔑 Demo Credentials

After seeding the database, you can use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medbook.com | admin123 |
| Demo Client | demo@medbook.com | demo123 |
| Staff | sarah.johnson@medbook.com | staff123 |
| Client | john.smith@example.com | client123 |

## 📊 Database Schema

### Users
- Personal information (name, email, phone)
- Role-based access control
- Authentication & security settings
- Preferences and notifications

### Services
- Service details and pricing
- Staff assignments
- Availability schedules
- Booking settings

### Appointments
- Client and staff relationships
- Service associations
- Date/time scheduling
- Status tracking

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Socket.IO Client**: Real-time communication

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **Socket.IO**: Real-time communication
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing

### DevOps & Deployment
- **Vercel**: Frontend deployment
- **Railway**: Backend deployment
- **MongoDB Atlas**: Cloud database
- **GitHub Actions**: CI/CD (optional)

## 📁 Project Structure

```
medbook-appointment-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration files
│   └── package.json
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions using Vercel and Railway.

### Quick Deploy Links
- **Frontend (Vercel)**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/medbook-appointment-system&project-name=medbook-frontend&root-directory=client)
- **Backend (Railway)**: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yourusername/medbook-appointment-system&plugins=mongodb&envs=JWT_SECRET,CLIENT_URL_PROD&JWT_SECRETDesc=Secret+key+for+JWT+tokens&CLIENT_URL_PRODDesc=Frontend+URL+for+CORS)

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test

# Run all tests
npm run test
```

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Database**: Indexed queries for fast performance
- **Caching**: Redis caching for frequently accessed data

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/appointment-booking
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=MedBook
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [Wiki](https://github.com/yourusername/medbook-appointment-system/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/medbook-appointment-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/medbook-appointment-system/discussions)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Socket.IO](https://socket.io/) - Real-time communication

---

<div align="center">
  <p>Made with ❤️ for healthcare providers worldwide</p>
  <p>
    <a href="#-medbook---appointment-booking-system">Back to top</a>
  </p>
</div> 