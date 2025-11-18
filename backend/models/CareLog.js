// backend/models/CareLog.js
const mongoose = require('mongoose');

const careLogSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  condition: {
    type: String,
    required: true,
    enum: ['excellent', 'good', 'fair', 'poor'],
    lowercase: true
  },
  medicationsGiven: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
    default: 'yes'
  },
  medicationNotes: {
    type: String,
    default: ''
  },
  meals: {
    type: String,
    required: true
  },
  hydration: {
    type: String,
    required: true
  },
  concerns: {
    type: String,
    default: ''
  },
  photos: [{
    type: String  // URLs to uploaded photos
  }],
  vitals: {
    bloodPressure: String,
    heartRate: String,
    temperature: String
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

// Index for faster queries
careLogSchema.index({ patient: 1, date: -1 });
careLogSchema.index({ caregiver: 1, date: -1 });

module.exports = mongoose.model('CareLog', careLogSchema);