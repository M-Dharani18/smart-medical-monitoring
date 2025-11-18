// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 30,
    required: true
  },
  type: {
    type: String,
    enum: ['routine', 'follow-up', 'emergency', 'consultation'],
    default: 'routine'
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'pending', 'no-show'],
    default: 'scheduled'
  },
  location: {
    type: String,
    default: 'Room 101'
  },
  reason: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['normal', 'high', 'urgent'],
    default: 'normal'
  },
  visitRecord: {
    diagnosis: String,
    treatment: String,
    prescriptions: String,
    followUpDate: Date,
    notes: String,
    completedAt: Date,
    vitalRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vital'
    }
  },
  cancellationReason: {
    type: String
  },
  rescheduleHistory: [{
    oldDate: Date,
    oldTime: String,
    newDate: Date,
    newTime: String,
    reason: String,
    timestamp: Date
  }]
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ doctor: 1, date: 1 });
appointmentSchema.index({ patient: 1, date: 1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);