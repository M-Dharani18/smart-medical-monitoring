// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   dateOfBirth: { type: Date, required: true },
//   gender: { type: String, enum: ['male', 'female', 'other'], required: true },
//   medicalConditions: [{ type: String, trim: true }],
//   allergies: [{ type: String, trim: true }],
//   emergencyContact: {
//     name: String,
//     phone: String,
//     relationship: String
//   },
//   profilePicture: String,  // URL to image
//   assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   assignedCaregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

// module.exports = mongoose.model('Patient', patientSchema);


const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  // Make it required so every patient has a doctor
  },
  
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  allergies: {
    type: String,
    default: 'None'
  },
  diagnosis: {
    type: String,
    required: true
  },
  caregiver: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: String,
    required: true
  },
  emergencyPhone: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['critical', 'monitoring', 'stable', 'discharged'],
    default: 'stable'
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  medications: [{
    type: String
  }],
  photo: {
    type: String
  },
  nextAppointment: {
    type: Date
  },
  clinicalNotes: [{
  note: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  doctor: {
    type: String,
    required: true
  }
}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);