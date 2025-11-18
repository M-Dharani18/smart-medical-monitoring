const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Personal Information
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  
  // Professional Details
  certification: {
    type: String // e.g., "Licensed Practical Nurse", "Certified Nursing Assistant"
  },
  experience: {
    type: String // e.g., "5 years"
  },
  specialization: {
    type: String // e.g., "Elderly Care", "Diabetes Management"
  },
  
  // Assigned Patients
  assignedPatients: [{
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    assignedDate: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['primary', 'backup'],
      default: 'primary'
    }
  }],
  
  // Availability
  availability: {
    monday: { available: Boolean, hours: String },
    tuesday: { available: Boolean, hours: String },
    wednesday: { available: Boolean, hours: String },
    thursday: { available: Boolean, hours: String },
    friday: { available: Boolean, hours: String },
    saturday: { available: Boolean, hours: String },
    sunday: { available: Boolean, hours: String }
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'on-leave', 'inactive'],
    default: 'active'
  },
  
  // Profile Completion
  isProfileComplete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Check profile completion
caregiverSchema.methods.checkProfileCompletion = function() {
  this.isProfileComplete = !!(
    this.name &&
    this.email &&
    this.phone &&
    this.certification &&
    this.experience
  );
  return this.isProfileComplete;
};

module.exports = mongoose.model('Caregiver', caregiverSchema);