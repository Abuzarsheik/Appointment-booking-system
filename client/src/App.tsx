import React, { useState, useEffect } from 'react';
import './App.css';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: 'client' | 'staff' | 'admin';
  phone?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: { amount: number; currency: string };
  category: string;
  tags: string[];
  providerId?: string;
  providerName?: string;
}

interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  dateTime: string;
}

// Demo credentials for portfolio showcase
const DEMO_CREDENTIALS = {
  admin: { email: 'admin@medbook.com', password: 'admin123', role: 'Admin' },
  client: { email: 'demo@medbook.com', password: 'demo123', role: 'Client' },
  staff: { email: 'sarah.johnson@medbook.com', password: 'staff123', role: 'Staff' },
  user: { email: 'john.smith@example.com', password: 'client123', role: 'User' }
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'book' | 'services'>('login');
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Enhanced API call with error handling
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem('authToken');
      // Use Railway URL in production, localhost in development
      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://appointment-booking-system-production.up.railway.app';
      const response = await fetch(`${API_URL}/api${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      setApiError(error.message || 'Connection error - using demo data');
      throw error;
    }
  };

  // Load dummy data on app start
  useEffect(() => {
    loadDummyData();
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, verify token validity here
      const userData = localStorage.getItem('userData');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
        setCurrentView('dashboard');
      }
    }
  }, []);

  const loadDummyData = () => {
    // Enhanced dummy services matching backend seed data
    const dummyServices: Service[] = [
      {
        id: '1',
        name: 'General Consultation',
        description: 'Comprehensive health checkup and consultation with our experienced physicians. Includes basic health assessment, medical history review, and personalized health recommendations.',
        duration: 30,
        price: { amount: 100, currency: 'USD' },
        category: 'consultation',
        tags: ['general', 'checkup', 'consultation'],
        providerId: 'dr1',
        providerName: 'Dr. Sarah Johnson'
      },
      {
        id: '2',
        name: 'Dental Cleaning',
        description: 'Professional dental cleaning and oral health examination. Includes plaque removal, teeth polishing, fluoride treatment, and oral hygiene guidance.',
        duration: 45,
        price: { amount: 80, currency: 'USD' },
        category: 'treatment',
        tags: ['dental', 'cleaning', 'oral health'],
        providerId: 'dr2',
        providerName: 'Dr. Michael Chen'
      },
      {
        id: '3',
        name: 'Physical Therapy Session',
        description: 'Personalized physical therapy session for rehabilitation and pain management. Includes assessment, therapeutic exercises, and treatment planning.',
        duration: 60,
        price: { amount: 120, currency: 'USD' },
        category: 'therapy',
        tags: ['physical therapy', 'rehabilitation', 'pain management'],
        providerId: 'pt1',
        providerName: 'Lisa Williams, PT'
      },
      {
        id: '4',
        name: 'Cardiology Consultation',
        description: 'Specialized cardiac consultation with ECG, blood pressure monitoring, and cardiovascular risk assessment by our cardiologist.',
        duration: 45,
        price: { amount: 200, currency: 'USD' },
        category: 'consultation',
        tags: ['cardiology', 'heart', 'specialist'],
        providerId: 'dr3',
        providerName: 'Dr. James Rodriguez'
      },
      {
        id: '5',
        name: 'Dermatology Checkup',
        description: 'Comprehensive skin examination and dermatological consultation. Includes mole mapping, skin cancer screening, and treatment recommendations.',
        duration: 30,
        price: { amount: 150, currency: 'USD' },
        category: 'checkup',
        tags: ['dermatology', 'skin', 'screening'],
        providerId: 'dr4',
        providerName: 'Dr. Emily Davis'
      },
      {
        id: '6',
        name: 'Mental Health Counseling',
        description: 'Professional mental health counseling session. Confidential support for anxiety, depression, stress management, and personal development.',
        duration: 50,
        price: { amount: 130, currency: 'USD' },
        category: 'therapy',
        tags: ['mental health', 'counseling', 'therapy'],
        providerId: 'dr5',
        providerName: 'Dr. Sarah Johnson'
      }
    ];

    setServices(dummyServices);

    // Generate dummy appointments for demo user
    const today = new Date();
    const dummyAppointments: Appointment[] = [
      {
        id: '1',
        serviceId: '1',
        serviceName: 'General Consultation',
        clientId: 'demo-user',
        clientName: 'Demo User',
        providerId: 'dr1',
        providerName: 'Dr. Sarah Johnson',
        date: today.toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmed',
        dateTime: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString() // 2 hours from now
      },
      {
        id: '2',
        serviceId: '3',
        serviceName: 'Physical Therapy Session',
        clientId: 'demo-user',
        clientName: 'Demo User',
        providerId: 'pt1',
        providerName: 'Lisa Williams, PT',
        date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
        time: '14:00',
        status: 'scheduled',
        dateTime: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        serviceId: '2',
        serviceName: 'Dental Cleaning',
        clientId: 'demo-user',
        clientName: 'Demo User',
        providerId: 'dr2',
        providerName: 'Dr. Michael Chen',
        date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last week
        time: '09:00',
        status: 'completed',
        dateTime: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString()
      }
    ];

    setAppointments(dummyAppointments);
  };

  // Real API login with fallback to demo mode
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setApiError(null);

    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const user: User = {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        name: `${response.user.firstName} ${response.user.lastName}`,
        email: response.user.email,
        role: response.user.role,
        phone: response.user.phone
      };

      setCurrentUser(user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(user));
      setCurrentView('dashboard');

      // Load user's real data
      await loadUserData();

    } catch (error) {
      console.log('API login failed, using demo mode');
      
      // Fallback to demo mode if API is not available
      const demoUser: User = {
        id: 'demo-user',
        firstName: 'Demo',
        lastName: 'User',
        name: email === 'admin@medbook.com' ? 'Admin User' : 
              email === 'sarah.johnson@medbook.com' ? 'Dr. Sarah Johnson' :
              email.split('@')[0],
        email,
        role: email === 'admin@medbook.com' ? 'admin' : 
              email.includes('staff') || email.includes('sarah') ? 'staff' : 'client'
      };

      setCurrentUser(demoUser);
      localStorage.setItem('userData', JSON.stringify(demoUser));
      setCurrentView('dashboard');
    }

    setLoading(false);
  };

  // Demo login function for portfolio showcase
  const handleDemoLogin = (userType: keyof typeof DEMO_CREDENTIALS) => {
    const credentials = DEMO_CREDENTIALS[userType];
    handleLogin(credentials.email, credentials.password);
  };

  const loadUserData = async () => {
    try {
      // Load services
      const servicesResponse = await apiCall('/services');
      if (servicesResponse.success) {
        setServices(servicesResponse.services);
      }

      // Load appointments
      const appointmentsResponse = await apiCall('/appointments');
      if (appointmentsResponse.success) {
        setAppointments(appointmentsResponse.appointments);
      }
    } catch (error) {
      console.log('Using dummy data due to API error');
    }
  };

  const handleRegister = async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
    setLoading(true);
    setApiError(null);

    try {
      const response = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, phone }),
      });

      const user: User = {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        name: `${response.user.firstName} ${response.user.lastName}`,
        email: response.user.email,
        role: response.user.role,
        phone: response.user.phone
      };

      setCurrentUser(user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(user));
      setCurrentView('dashboard');

    } catch (error) {
      // Fallback to demo mode
      const demoUser: User = {
        id: 'new-user',
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        role: 'client'
      };

      setCurrentUser(demoUser);
      setCurrentView('dashboard');
    }

    setLoading(false);
  };

  const handleBookAppointment = async (serviceId: string, date: string, time: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service || !currentUser) return;

    try {
      const appointmentData = {
        serviceId,
        dateTime: new Date(`${date}T${time}`).toISOString(),
      };

      const response = await apiCall('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });

      if (response.success) {
        await loadUserData(); // Reload appointments
      }
    } catch (error) {
      // Fallback to local state update
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        serviceId,
        serviceName: service.name,
        clientId: currentUser.id,
        clientName: currentUser.name,
        providerId: service.providerId || 'provider',
        providerName: service.providerName || 'Provider',
        date,
        time,
        status: 'scheduled',
        dateTime: new Date(`${date}T${time}`).toISOString()
      };

      setAppointments([...appointments, newAppointment]);
    }

    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setAppointments([]);
    setApiError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fillCredentials = (userType: keyof typeof DEMO_CREDENTIALS) => {
      const credentials = DEMO_CREDENTIALS[userType];
      setEmail(credentials.email);
      setPassword(credentials.password);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🩺 MedBook</h1>
            <p className="text-gray-600">Professional Appointment Booking System</p>
            {apiError && (
              <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-xs">
                Demo Mode: API connection unavailable
              </div>
            )}
          </div>

          {/* Portfolio Demo Section */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 text-center">
              🎯 Portfolio Demo - Quick Login
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => fillCredentials('admin')}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded transition-colors"
              >
                👨‍💼 Admin Demo
              </button>
              <button
                onClick={() => fillCredentials('client')}
                className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded transition-colors"
              >
                👤 Client Demo
              </button>
              <button
                onClick={() => fillCredentials('staff')}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded transition-colors"
              >
                👩‍⚕️ Staff Demo
              </button>
              <button
                onClick={() => fillCredentials('user')}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded transition-colors"
              >
                👨‍💼 User Demo
              </button>
            </div>
            <div className="mt-2 text-center">
              <button
                onClick={() => handleDemoLogin('client')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                🚀 Quick Demo Login
              </button>
            </div>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView('register')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Don't have an account? Sign up
            </button>
          </div>

          {/* Credentials Reference */}
          <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
            <div className="font-semibold mb-1">Demo Credentials:</div>
            <div>Admin: admin@medbook.com / admin123</div>
            <div>Client: demo@medbook.com / demo123</div>
            <div>Staff: sarah.johnson@medbook.com / staff123</div>
          </div>
        </div>
      </div>
    );
  };

  const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🩺 MedBook</h1>
            <p className="text-gray-600">Create your account</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(firstName, lastName, email, password, phone); }}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password (min 6 characters)"
                  minLength={6}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView('login')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">🩺 MedBook</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {currentUser?.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setCurrentView('book')}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-lg font-semibold">Book Appointment</h3>
              <p className="text-blue-100 text-sm">Schedule a new appointment</p>
            </button>
            
            <button
              onClick={() => setCurrentView('services')}
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
            >
              <div className="text-3xl mb-2">🏥</div>
              <h3 className="text-lg font-semibold">View Services</h3>
              <p className="text-green-100 text-sm">Browse available services</p>
            </button>
            
            <div className="bg-purple-600 text-white p-6 rounded-xl">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-lg font-semibold">My Appointments</h3>
              <p className="text-purple-100 text-sm">{appointments.length} total</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No appointments yet. Book your first appointment!</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.serviceName}</h3>
                        <p className="text-gray-600 text-sm">with {appointment.providerName}</p>
                        <p className="text-gray-500 text-sm">{appointment.date} at {appointment.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const BookingForm = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
              <div></div>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (selectedService && selectedDate && selectedTime) {
                handleBookAppointment(selectedService, selectedDate, selectedTime);
              }
            }}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a service...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price.amount} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedService || !selectedDate || !selectedTime}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ServicesView = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-gray-900">Our Services</h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{service.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">${service.price.amount} {service.price.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Provider:</span>
                  <span className="font-medium">{service.providerName}</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('book')}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'login') return <LoginForm />;
  if (currentView === 'register') return <RegisterForm />;
  if (currentView === 'dashboard') return <Dashboard />;
  if (currentView === 'book') return <BookingForm />;
  if (currentView === 'services') return <ServicesView />;

  return <LoginForm />;
}

export default App; 