// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'client' | 'staff' | 'admin';
  isActive: boolean;
  isEmailVerified: boolean;
  avatar?: string;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    timezone: string;
    language: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: {
    amount: number;
    currency: string;
  };
  category: 'consultation' | 'treatment' | 'therapy' | 'checkup' | 'procedure' | 'other';
  isActive: boolean;
  staffMembers: string[];
  availability: WeeklyAvailability;
  bufferTime: {
    before: number;
    after: number;
  };
  maxAdvanceBooking: number;
  minAdvanceBooking: number;
  tags: string[];
  images: ServiceImage[];
  requirements: string[];
  preparationInstructions?: string;
  aftercareInstructions?: string;
  bookingSettings: {
    allowOnlineBooking: boolean;
    requireApproval: boolean;
    cancellationPolicy: 'flexible' | 'moderate' | 'strict';
    refundPolicy?: string;
  };
  statistics: {
    totalBookings: number;
    averageRating: number;
    totalReviews: number;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface WeeklyAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // Format: "09:00"
  endTime: string;   // Format: "17:00"
}

// Appointment Types
export interface Appointment {
  id: string;
  client: User;
  service: Service;
  staff: User;
  dateTime: Date;
  endDateTime: Date;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show' | 'rescheduled';
  notes: {
    client?: string;
    staff?: string;
    internal?: string;
  };
  price: {
    amount: number;
    currency: string;
    paid: boolean;
    paymentMethod?: 'cash' | 'card' | 'online' | 'insurance' | 'other';
    paymentDate?: Date;
  };
  reminders: {
    email: { sent: boolean; sentAt?: Date };
    sms: { sent: boolean; sentAt?: Date };
    push: { sent: boolean; sentAt?: Date };
  };
  cancellation?: {
    cancelledAt: Date;
    cancelledBy: string;
    reason?: string;
    refundAmount?: number;
    refundStatus: 'none' | 'pending' | 'processed' | 'failed';
  };
  rescheduling?: {
    previousDateTime: Date;
    rescheduledAt: Date;
    rescheduledBy: string;
    reason?: string;
    rescheduleCount: number;
  };
  rating?: {
    score: number;
    review?: string;
    reviewDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ValidationError[];
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role?: 'client' | 'staff';
}

export interface AppointmentFormData {
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  category: string;
  staffMembers: string[];
  tags: string[];
  preparationInstructions?: string;
  aftercareInstructions?: string;
  availability: WeeklyAvailability;
  bufferTime: {
    before: number;
    after: number;
  };
  bookingSettings: {
    allowOnlineBooking: boolean;
    requireApproval: boolean;
    cancellationPolicy: string;
  };
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// Socket Types
export interface SocketContextType {
  socket: any;
  isConnected: boolean;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  extendedProps?: {
    appointment: Appointment;
    status: string;
  };
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  dateTime: Date;
  isAvailable: boolean;
}

// Filter and Search Types
export interface AppointmentFilters {
  status?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  serviceId?: string;
  staffId?: string;
  clientId?: string;
}

export interface ServiceFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: {
    min: number;
    max: number;
  };
  staffId?: string;
  tags?: string[];
  isActive?: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  totalClients: number;
  totalServices: number;
  averageRating: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'cancellation' | 'system';
  title: string;
  message: string;
  read: boolean;
  userId: string;
  data?: any;
  createdAt: Date;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  field?: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
} 