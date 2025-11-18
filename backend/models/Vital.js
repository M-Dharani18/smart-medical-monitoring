const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  bloodSugar: Number,
  temperature: Number,
  oxygenSaturation: Number,
  weight: Number,
  notes: String,
  status: { type: String, enum: ['normal', 'warning', 'critical'], default: 'normal' },
  enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vital', vitalSchema);