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
  staff: { email: 'sarah.johnson@medbook.com', password: 'staff123', role: 'Staff' }
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
        providerId: 'staff-sarah',
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
        providerId: 'dr-michael',
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
        providerId: 'staff-sarah',
        providerName: 'Dr. Sarah Johnson'
      },
      {
        id: '4',
        name: 'Cardiology Consultation',
        description: 'Specialized cardiac consultation with ECG, blood pressure monitoring, and cardiovascular risk assessment by our cardiologist.',
        duration: 45,
        price: { amount: 200, currency: 'USD' },
        category: 'consultation',
        tags: ['cardiology', 'heart', 'specialist'],
        providerId: 'dr-james',
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
        providerId: 'dr-emily',
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
        providerId: 'staff-sarah',
        providerName: 'Dr. Sarah Johnson'
      },
      {
        id: '7',
        name: 'X-Ray Imaging',
        description: 'Digital X-ray imaging service for diagnostic purposes. Quick and accurate imaging with minimal radiation exposure.',
        duration: 20,
        price: { amount: 75, currency: 'USD' },
        category: 'diagnostic',
        tags: ['x-ray', 'imaging', 'diagnostic'],
        providerId: 'dr-lisa',
        providerName: 'Dr. Lisa Martinez'
      },
      {
        id: '8',
        name: 'Blood Test Panel',
        description: 'Comprehensive blood work including CBC, metabolic panel, and lipid profile. Results available within 24 hours.',
        duration: 15,
        price: { amount: 95, currency: 'USD' },
        category: 'laboratory',
        tags: ['blood test', 'lab work', 'diagnostic'],
        providerId: 'dr-robert',
        providerName: 'Dr. Robert Kim'
      },
      {
        id: '9',
        name: 'Vaccination Service',
        description: 'Complete vaccination services including flu shots, COVID-19 boosters, and travel vaccinations.',
        duration: 15,
        price: { amount: 40, currency: 'USD' },
        category: 'preventive',
        tags: ['vaccine', 'immunization', 'preventive'],
        providerId: 'staff-sarah',
        providerName: 'Dr. Sarah Johnson'
      },
      {
        id: '10',
        name: 'Pediatric Checkup',
        description: 'Comprehensive health checkup for children including growth assessment, developmental screening, and immunization updates.',
        duration: 30,
        price: { amount: 85, currency: 'USD' },
        category: 'pediatric',
        tags: ['pediatric', 'children', 'checkup'],
        providerId: 'dr-amanda',
        providerName: 'Dr. Amanda Wilson'
      }
    ];

    setServices(dummyServices);

    // Generate comprehensive dummy appointments for all roles
    const today = new Date();
    
    // Utility function to create appointment
    const createAppointment = (id: string, serviceId: string, serviceName: string, clientId: string, clientName: string, providerId: string, providerName: string, dayOffset: number, time: string, status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled') => {
      const appointmentDate = new Date(today.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentDateTime = new Date(appointmentDate.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
      
      return {
        id,
        serviceId,
        serviceName,
        clientId,
        clientName,
        providerId,
        providerName,
        date: appointmentDate.toISOString().split('T')[0],
        time,
        status,
        dateTime: appointmentDateTime.toISOString()
      };
    };

    const dummyAppointments: Appointment[] = [
      // Demo Client Appointments (demo@medbook.com)
      createAppointment('1', '1', 'General Consultation', 'demo-client', 'Demo Client', 'staff-sarah', 'Dr. Sarah Johnson', 0, '10:00', 'confirmed'),
      createAppointment('2', '3', 'Physical Therapy Session', 'demo-client', 'Demo Client', 'staff-sarah', 'Dr. Sarah Johnson', 1, '14:00', 'scheduled'),
      createAppointment('3', '2', 'Dental Cleaning', 'demo-client', 'Demo Client', 'dr-michael', 'Dr. Michael Chen', -7, '09:00', 'completed'),
      createAppointment('4', '6', 'Mental Health Counseling', 'demo-client', 'Demo Client', 'staff-sarah', 'Dr. Sarah Johnson', 3, '11:00', 'scheduled'),
      createAppointment('5', '9', 'Vaccination Service', 'demo-client', 'Demo Client', 'staff-sarah', 'Dr. Sarah Johnson', -14, '15:30', 'completed'),

      // Dr. Sarah Johnson's Patient Appointments (staff@medbook.com) 
      createAppointment('6', '1', 'General Consultation', 'client-1', 'John Smith', 'staff-sarah', 'Dr. Sarah Johnson', 0, '09:00', 'confirmed'),
      createAppointment('7', '6', 'Mental Health Counseling', 'client-2', 'Emma Wilson', 'staff-sarah', 'Dr. Sarah Johnson', 0, '15:00', 'confirmed'),
      createAppointment('8', '3', 'Physical Therapy Session', 'client-3', 'David Brown', 'staff-sarah', 'Dr. Sarah Johnson', 1, '10:00', 'scheduled'),
      createAppointment('9', '1', 'General Consultation', 'client-4', 'Sophie Taylor', 'staff-sarah', 'Dr. Sarah Johnson', 1, '16:00', 'scheduled'),
      createAppointment('10', '6', 'Mental Health Counseling', 'client-5', 'Michael Davis', 'staff-sarah', 'Dr. Sarah Johnson', -2, '14:00', 'completed'),
      createAppointment('11', '9', 'Vaccination Service', 'client-6', 'Lisa Anderson', 'staff-sarah', 'Dr. Sarah Johnson', 2, '13:30', 'scheduled'),
      createAppointment('12', '3', 'Physical Therapy Session', 'client-7', 'Robert Johnson', 'staff-sarah', 'Dr. Sarah Johnson', -1, '11:30', 'completed'),
      createAppointment('13', '1', 'General Consultation', 'client-8', 'Jessica White', 'staff-sarah', 'Dr. Sarah Johnson', 4, '08:30', 'scheduled'),

      // Other Providers Appointments (for Admin view)
      createAppointment('14', '2', 'Dental Cleaning', 'client-9', 'Mark Thompson', 'dr-michael', 'Dr. Michael Chen', 0, '11:00', 'confirmed'),
      createAppointment('15', '4', 'Cardiology Consultation', 'client-10', 'Amanda Garcia', 'dr-james', 'Dr. James Rodriguez', 1, '13:00', 'scheduled'),
      createAppointment('16', '5', 'Dermatology Checkup', 'client-11', 'Christopher Lee', 'dr-emily', 'Dr. Emily Davis', 2, '12:00', 'scheduled'),
      createAppointment('17', '7', 'X-Ray Imaging', 'client-12', 'Natalie Brown', 'dr-lisa', 'Dr. Lisa Martinez', -1, '08:30', 'completed'),
      createAppointment('18', '8', 'Blood Test Panel', 'client-13', 'Daniel Wilson', 'dr-robert', 'Dr. Robert Kim', 3, '07:45', 'scheduled'),
      createAppointment('19', '2', 'Dental Cleaning', 'client-14', 'Sarah Miller', 'dr-michael', 'Dr. Michael Chen', -5, '15:30', 'cancelled'),
      createAppointment('20', '10', 'Pediatric Checkup', 'client-15', 'Tommy Johnson', 'dr-amanda', 'Dr. Amanda Wilson', 1, '10:30', 'scheduled'),
      createAppointment('21', '4', 'Cardiology Consultation', 'client-16', 'George Taylor', 'dr-james', 'Dr. James Rodriguez', -3, '14:15', 'completed'),
      createAppointment('22', '5', 'Dermatology Checkup', 'client-17', 'Maria Lopez', 'dr-emily', 'Dr. Emily Davis', 5, '09:45', 'scheduled'),
      createAppointment('23', '7', 'X-Ray Imaging', 'client-18', 'Kevin Clark', 'dr-lisa', 'Dr. Lisa Martinez', 0, '16:15', 'confirmed'),
      createAppointment('24', '8', 'Blood Test Panel', 'client-19', 'Rachel Green', 'dr-robert', 'Dr. Robert Kim', -2, '08:00', 'completed'),
      createAppointment('25', '10', 'Pediatric Checkup', 'client-20', 'Emily Davis Jr', 'dr-amanda', 'Dr. Amanda Wilson', 4, '14:45', 'scheduled'),

      // Additional Mixed Appointments
      createAppointment('26', '2', 'Dental Cleaning', 'client-21', 'Alex Rodriguez', 'dr-michael', 'Dr. Michael Chen', 6, '12:30', 'scheduled'),
      createAppointment('27', '4', 'Cardiology Consultation', 'client-22', 'Jennifer White', 'dr-james', 'Dr. James Rodriguez', -4, '10:15', 'cancelled'),
      createAppointment('28', '5', 'Dermatology Checkup', 'client-23', 'Patrick Brown', 'dr-emily', 'Dr. Emily Davis', 7, '11:30', 'scheduled'),
      createAppointment('29', '7', 'X-Ray Imaging', 'client-24', 'Michelle Jones', 'dr-lisa', 'Dr. Lisa Martinez', 1, '13:45', 'scheduled'),
      createAppointment('30', '8', 'Blood Test Panel', 'client-25', 'Steven Wilson', 'dr-robert', 'Dr. Robert Kim', -6, '09:15', 'completed')
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
        id: email === 'admin@medbook.com' ? 'admin-user' :
            email === 'demo@medbook.com' ? 'demo-client' :
            email === 'sarah.johnson@medbook.com' ? 'staff-sarah' :
            'demo-user',
        firstName: email === 'admin@medbook.com' ? 'Admin' : 
                  email === 'demo@medbook.com' ? 'Demo' :
                  email === 'sarah.johnson@medbook.com' ? 'Sarah' :
                  email.split('@')[0],
        lastName: email === 'admin@medbook.com' ? 'User' : 
                 email === 'demo@medbook.com' ? 'Client' :
                 email === 'sarah.johnson@medbook.com' ? 'Johnson' :
                 'User',
        name: email === 'admin@medbook.com' ? 'Admin User' : 
              email === 'demo@medbook.com' ? 'Demo Client' :
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
            <div className="grid grid-cols-3 gap-2 text-xs">
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
            <div>👨‍💼 Admin: admin@medbook.com / admin123</div>
            <div>👤 Client: demo@medbook.com / demo123</div>
            <div>👩‍⚕️ Staff: sarah.johnson@medbook.com / staff123</div>
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

  const Dashboard = () => {
    const DashboardHeader = () => (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">🩺 MedBook</h1>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentUser?.role?.toUpperCase()}
              </span>
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
    );

    // Admin Dashboard - Full system access
    if (currentUser?.role === 'admin') {
      return (
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-red-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="text-lg font-semibold">All Users</h3>
                  <p className="text-red-100 text-sm">System management</p>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">📅</div>
                  <h3 className="text-lg font-semibold">All Appointments</h3>
                  <p className="text-blue-100 text-sm">{appointments?.length || 0} total</p>
                </div>
                <button
                  onClick={() => setCurrentView('services')}
                  className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
                >
                  <div className="text-3xl mb-2">🏥</div>
                  <h3 className="text-lg font-semibold">Manage Services</h3>
                  <p className="text-green-100 text-sm">Add/Edit services</p>
                </button>
                <div className="bg-purple-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold">Reports</h3>
                  <p className="text-purple-100 text-sm">Analytics & insights</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Admin Overview - All System Appointments</h2>
                {!appointments || appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No appointments in the system yet.</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.serviceName}</h3>
                            <p className="text-gray-600 text-sm">Client: {appointment.clientName}</p>
                            <p className="text-gray-600 text-sm">Provider: {appointment.providerName}</p>
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
    }

    // Staff Dashboard - Patient management and schedule
    if (currentUser?.role === 'staff') {
      const staffAppointments = appointments?.filter(apt => 
        apt.providerName?.includes(currentUser.firstName) || 
        apt.providerId === currentUser.id ||
        apt.providerId === 'staff-sarah' ||
        (currentUser.email === 'sarah.johnson@medbook.com' && apt.providerName?.includes('Sarah'))
      ) || [];

      return (
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader />
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">📅</div>
                  <h3 className="text-lg font-semibold">My Schedule</h3>
                  <p className="text-purple-100 text-sm">{staffAppointments.length} appointments</p>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="text-lg font-semibold">My Patients</h3>
                  <p className="text-blue-100 text-sm">Patient management</p>
                </div>
                <button
                  onClick={() => setCurrentView('services')}
                  className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors"
                >
                  <div className="text-3xl mb-2">🏥</div>
                  <h3 className="text-lg font-semibold">My Services</h3>
                  <p className="text-green-100 text-sm">Services I provide</p>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">👩‍⚕️ My Appointments Schedule</h2>
                {staffAppointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No appointments scheduled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {staffAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.serviceName}</h3>
                            <p className="text-gray-600 text-sm">Patient: {appointment.clientName}</p>
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
    }

    // Client Dashboard - Personal appointments and booking
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
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
                <p className="text-purple-100 text-sm">{appointments?.filter(apt => apt.clientId === currentUser?.id || apt.clientName?.includes(currentUser?.firstName || ''))?.length || 0} total</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">👤 My Appointments</h2>
              {(() => {
                const clientAppointments = appointments?.filter(apt => 
                  apt.clientId === currentUser?.id || 
                  apt.clientName?.includes(currentUser?.firstName || '') ||
                  (currentUser?.email === 'demo@medbook.com' && apt.clientId === 'demo-client')
                ) || [];
                
                return clientAppointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No appointments yet. Book your first appointment!</p>
                ) : (
                  <div className="space-y-4">
                    {clientAppointments.map((appointment) => (
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
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                    {services?.map((service) => (
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
          {services?.map((service) => (
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