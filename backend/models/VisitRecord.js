// models/VisitRecord.js
const mongoose = require('mongoose');

const visitRecordSchema = new mongoose.Schema({
  appointmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now, 
    required: true 
  },
  diagnosis: { 
    type: String, 
    required: true 
  },
  treatment: { 
    type: String, 
    required: true 
  },
  prescriptions: String,
  followUpDate: Date,
  notes: String,
  vitals: {
    bloodPressure: {
      systolic: { type: Number, required: true },
      diastolic: { type: Number, required: true }
    },
    heartRate: { type: Number, required: true },
    bloodSugar: Number,
    temperature: Number,
    oxygenSaturation: Number
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('VisitRecord', visitRecordSchema);