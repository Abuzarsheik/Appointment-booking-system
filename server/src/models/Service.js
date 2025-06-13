const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [480, 'Duration cannot exceed 8 hours (480 minutes)']
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Service price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    }
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    trim: true,
    enum: {
      values: ['consultation', 'treatment', 'therapy', 'checkup', 'procedure', 'other'],
      message: 'Category must be one of: consultation, treatment, therapy, checkup, procedure, other'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  staffMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  availability: {
    monday: {
      enabled: { type: Boolean, default: true },
      slots: [{
        startTime: String, // Format: "09:00"
        endTime: String   // Format: "17:00"
      }]
    },
    tuesday: {
      enabled: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String
      }]
    },
    wednesday: {
      enabled: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String
      }]
    },
    thursday: {
      enabled: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String
      }]
    },
    friday: {
      enabled: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String
      }]
    },
    saturday: {
      enabled: { type: Boolean, default: false },
      slots: [{
        startTime: String,
        endTime: String
      }]
    },
    sunday: {
      enabled: { type: Boolean, default: false },
      slots: [{
        startTime: String,
        endTime: String
      }]
    }
  },
  bufferTime: {
    before: {
      type: Number,
      default: 0,
      min: [0, 'Buffer time cannot be negative']
    },
    after: {
      type: Number,
      default: 0,
      min: [0, 'Buffer time cannot be negative']
    }
  },
  maxAdvanceBooking: {
    type: Number,
    default: 30, // days
    min: [1, 'Max advance booking must be at least 1 day'],
    max: [365, 'Max advance booking cannot exceed 365 days']
  },
  minAdvanceBooking: {
    type: Number,
    default: 0, // hours
    min: [0, 'Min advance booking cannot be negative'],
    max: [168, 'Min advance booking cannot exceed 168 hours (1 week)']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  preparationInstructions: {
    type: String,
    trim: true,
    maxlength: [2000, 'Preparation instructions cannot exceed 2000 characters']
  },
  aftercareInstructions: {
    type: String,
    trim: true,
    maxlength: [2000, 'Aftercare instructions cannot exceed 2000 characters']
  },
  bookingSettings: {
    allowOnlineBooking: {
      type: Boolean,
      default: true
    },
    requireApproval: {
      type: Boolean,
      default: false
    },
    cancellationPolicy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    refundPolicy: {
      type: String,
      trim: true,
      maxlength: [500, 'Refund policy cannot exceed 500 characters']
    }
  },
  statistics: {
    totalBookings: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for performance
serviceSchema.index({ name: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ 'price.amount': 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ createdAt: -1 });
serviceSchema.index({ 'statistics.averageRating': -1 });

// Text search index
serviceSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  tags: 'text'
}, {
  weights: {
    name: 10,
    category: 5,
    description: 2,
    tags: 1
  }
});

// Virtual for formatted duration
serviceSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  
  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
});

// Virtual for formatted price
serviceSchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.price.currency
  }).format(this.price.amount);
});

// Method to check if service is available on a specific day
serviceSchema.methods.isAvailableOnDay = function(dayName) {
  const day = dayName.toLowerCase();
  return this.availability[day] && this.availability[day].enabled;
};

// Method to get available time slots for a specific day
serviceSchema.methods.getAvailableSlots = function(dayName) {
  const day = dayName.toLowerCase();
  if (!this.isAvailableOnDay(day)) {
    return [];
  }
  return this.availability[day].slots || [];
};

// Method to calculate total service time including buffer
serviceSchema.methods.getTotalServiceTime = function() {
  return this.duration + this.bufferTime.before + this.bufferTime.after;
};

// Static method to find services by category
serviceSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ name: 1 });
};

// Static method to search services
serviceSchema.statics.searchServices = function(query) {
  return this.find(
    { 
      $text: { $search: query },
      isActive: true 
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// Pre-save middleware to ensure only one primary image
serviceSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    let primaryCount = 0;
    this.images.forEach(image => {
      if (image.isPrimary) primaryCount++;
    });
    
    // If no primary image, make the first one primary
    if (primaryCount === 0) {
      this.images[0].isPrimary = true;
    }
    
    // If multiple primary images, keep only the first one as primary
    if (primaryCount > 1) {
      let foundPrimary = false;
      this.images.forEach(image => {
        if (image.isPrimary && !foundPrimary) {
          foundPrimary = true;
        } else if (image.isPrimary && foundPrimary) {
          image.isPrimary = false;
        }
      });
    }
  }
  
  next();
});

module.exports = mongoose.model('Service', serviceSchema); 