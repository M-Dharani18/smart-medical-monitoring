const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  patientName: String,
  patientAge: Number,
  date: {
    type: Date,
    default: Date.now
  },
  diagnosis: {
    type: String,
    required: true
  },
  medications: [{
    name: { type: String, required: true },
    strength: { type: String, required: true },
    route: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, required: true },
    refills: { type: Number, default: 0 },
    genericAllowed: { type: Boolean, default: true }
  }],
  pharmacy: String,
  doctorNotes: String,
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Expired'],
    default: 'Active'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Prescription', prescriptionSchema);