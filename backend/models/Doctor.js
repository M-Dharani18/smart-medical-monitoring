// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema({
  // Reference to User account
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  //   unique: true
  // },
  
  // // Basic Information
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // email: {
  //   type: String,
  //   required: true
  // },
  
  // // Professional Information (Required fields)
  // specialization: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // license: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true
  // },
  // experience: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  
  // // Hospital/Clinic Information (Required fields)
  // department: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // hospitalName: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // hospitalAddress: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // hospitalPhone: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  
  // Optional Information
  // photo: {
  //   type: String,
  //   default: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
  //   trim: true
  // },
  
  // // Profile Status
  // isProfileComplete: {
  //   type: Boolean,
  //   default: false
  // },
  
  // // Statistics (for dashboard)
  // stats: {
  //   totalPatients: {
  //     type: Number,
  //     default: 0
  //   },
  //   criticalCases: {
  //     type: Number,
  //     default: 0
  //   },
  //   appointmentsToday: {
  //     type: Number,
  //     default: 0
  //   },
  //   prescriptionsWritten: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  
  // // Additional Professional Details (optional, for future use)
  // qualifications: [{
  //   degree: String,
  //   institution: String,
  //   year: String
  // }],
  
  // certifications: [{
  //   name: String,
  //   issuedBy: String,
  //   year: String
  // }],
  
  // languages: [String],
  
  // consultationFee: {
  //   type: Number,
  //   default: 0
  // },
  
  // availableDays: [{
  //   type: String,
  //   enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // }],
  
  // consultationHours: {
  //   start: String,
  //   end: String
  // },
  
  // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true // This automatically manages createdAt and updatedAt
// });

// // Indexes for faster queries
// doctorSchema.index({ userId: 1 });
// doctorSchema.index({ email: 1 });
// doctorSchema.index({ license: 1 });
// doctorSchema.index({ specialization: 1 });
// doctorSchema.index({ hospitalName: 1 });

// Virtual for full hospital info
// doctorSchema.virtual('hospitalInfo').get(function() {
//   return {
//     name: this.hospitalName,
//     address: this.hospitalAddress,
//     phone: this.hospitalPhone,
//     department: this.department
//   };
// });

// Method to check if profile is complete
// doctorSchema.methods.checkProfileCompletion = function() {
//   const requiredFields = [
//     this.specialization,
//     this.license,
//     this.experience,
//     this.department,
//     this.hospitalName,
//     this.hospitalAddress,
//     this.hospitalPhone
//   ];
  
//   return requiredFields.every(field => field && field.trim() !== '');
// };

// Pre-save middleware to update profile completion status
// doctorSchema.pre('save', function(next) {
//   this.isProfileComplete = this.checkProfileCompletion();
//   next();
// });

// Static method to find doctor by userId
// doctorSchema.statics.findByUserId = function(userId) {
//   return this.findOne({ userId });
// };

// Static method to find doctors by specialization
// doctorSchema.statics.findBySpecialization = function(specialization) {
//   return this.find({ 
//     specialization: new RegExp(specialization, 'i'),
//     isProfileComplete: true 
//   });
// };

// Static method to find doctors by hospital
// doctorSchema.statics.findByHospital = function(hospitalName) {
//   return this.find({ 
//     hospitalName: new RegExp(hospitalName, 'i'),
//     isProfileComplete: true 
//   });
// };

// module.exports = mongoose.model('Doctor', doctorSchema);

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  license: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  hospitalName: {
    type: String,
    required: true,
    trim: true
  },
  hospitalAddress: {
    type: String,
    required: true,
    trim: true
  },
  hospitalPhone: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    trim: true
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  stats: {
    totalPatients: {
      type: Number,
      default: 0
    },
    criticalCases: {
      type: Number,
      default: 0
    },
    appointmentsToday: {
      type: Number,
      default: 0
    },
    prescriptionsWritten: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Check if profile is complete before saving
doctorSchema.pre('save', function(next) {
  const requiredFields = [
    this.specialization,
    this.license,
    this.experience,
    this.department,
    this.hospitalName,
    this.hospitalAddress,
    this.hospitalPhone
  ];
  
  this.isProfileComplete = requiredFields.every(field => field && field.trim() !== '');
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);