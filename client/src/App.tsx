import React, { useState, useEffect } from 'react';
import './App.css';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  providerId: string;
  providerName: string;
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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'book' | 'services'>('login');
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockServices: Service[] = [
      {
        id: '1',
        name: 'General Consultation',
        description: 'Complete health checkup and consultation',
        duration: 30,
        price: 100,
        providerId: 'dr1',
        providerName: 'Dr. Sarah Johnson'
      },
      {
        id: '2',
        name: 'Dental Cleaning',
        description: 'Professional dental cleaning and examination',
        duration: 45,
        price: 80,
        providerId: 'dr2',
        providerName: 'Dr. Mike Chen'
      },
      {
        id: '3',
        name: 'Physical Therapy',
        description: 'Rehabilitation and physical therapy session',
        duration: 60,
        price: 120,
        providerId: 'pt1',
        providerName: 'Lisa Williams, PT'
      }
    ];
    setServices(mockServices);
  }, []);

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    // Mock login - in real app, this would call the API
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'client'
      };
      setCurrentUser(mockUser);
      setCurrentView('dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'client'
      };
      setCurrentUser(mockUser);
      setCurrentView('dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleBookAppointment = (serviceId: string, date: string, time: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service || !currentUser) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      serviceId,
      serviceName: service.name,
      clientId: currentUser.id,
      clientName: currentUser.name,
      providerId: service.providerId,
      providerName: service.providerName,
      date,
      time,
      status: 'pending'
    };

    setAppointments([...appointments, newAppointment]);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setAppointments([]);
  };

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🩺 MedBook</h1>
            <p className="text-gray-600">Sign in to your account</p>
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
        </div>
      </div>
    );
  };

  const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🩺 MedBook</h1>
            <p className="text-gray-600">Create your account</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(name, email, password); }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
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
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
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
                        {service.name} - ${service.price} ({service.duration} min)
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
                  <span className="font-medium">${service.price}</span>
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