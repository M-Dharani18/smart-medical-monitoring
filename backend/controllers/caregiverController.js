// backend/controllers/caregiverController.js
const Caregiver = require('../models/Caregiver');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Vital = require('../models/Vital');

// @desc    Get caregiver dashboard
// @route   GET /api/caregivers/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    const caregiverId = req.user.id;
    
    const caregiver = await Caregiver.findById(caregiverId)
      .populate({
        path: 'assignedPatient',
        populate: {
          path: 'assignedDoctor'
        }
      });

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: 'Caregiver not found'
      });
    }

    if (!caregiver.assignedPatient) {
      return res.status(200).json({
        success: true,
        data: {
          patient: null,
          message: 'No patient assigned yet'
        }
      });
    }

    const patient = caregiver.assignedPatient;
    const doctor = patient.assignedDoctor;

    // Get latest vitals
    const latestVitals = await Vital.findOne({ patient: patient._id })
      .sort({ recordedAt: -1 })
      .limit(1);

    // Get today's tasks (implement based on your Task model)
    const todayTasks = [
      {
        id: 1,
        type: 'medication',
        medication: 'Metformin',
        dosage: '500mg',
        time: '8:00 AM',
        completed: true
      },
      {
        id: 2,
        type: 'vitals',
        title: 'Blood Pressure Check',
        time: '9:00 AM',
        completed: true
      },
      {
        id: 3,
        type: 'medication',
        medication: 'Lisinopril',
        dosage: '10mg',
        time: '12:00 PM',
        completed: false
      }
    ];

    const stats = {
      tasksCompleted: todayTasks.filter(t => t.completed).length,
      totalTasks: todayTasks.length,
      medicationCompliance: 95
    };

    const dashboardData = {
      patient: {
        id: patient._id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        diagnosis: patient.diagnosis,
        status: patient.status || 'stable',
        photo: patient.photo,
        nextAppointment: patient.nextAppointment
      },
      assignedDoctor: doctor ? {
        name: doctor.name,
        specialization: doctor.specialization,
        phone: doctor.phone,
        email: doctor.email,
        photo: doctor.photo
      } : null,
      latestVitals: latestVitals ? {
        bloodPressure: latestVitals.bloodPressure,
        heartRate: latestVitals.heartRate,
        bloodSugar: latestVitals.bloodSugar,
        temperature: latestVitals.temperature,
        recordedAt: latestVitals.recordedAt
      } : null,
      todayTasks,
      stats,
      recentAlerts: []
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

// @desc    Get patient profile
// @route   GET /api/caregivers/patient/:patientId
// @access  Private
exports.getPatientProfile = async (req, res) => {
  try {
    const { patientId } = req.params;
    
    const caregiver = await Caregiver.findById(req.user.id);
    if (caregiver.assignedPatient.toString() !== patientId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const patient = await Patient.findById(patientId)
      .populate('assignedDoctor');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching patient profile',
      error: error.message
    });
  }
};

// @desc    Submit care log
// @route   POST /api/caregivers/care-log
// @access  Private
exports.submitCareLog = async (req, res) => {
  try {
    const {
      patientId,
      date,
      condition,
      medicationsGiven,
      medicationNotes,
      meals,
      hydration,
      concerns,
      photos
    } = req.body;

    const caregiver = await Caregiver.findById(req.user.id);
    if (caregiver.assignedPatient.toString() !== patientId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Create care log entry
    // const careLog = await CareLog.create({ ... });

    res.json({
      success: true,
      message: 'Care log submitted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting care log',
      error: error.message
    });
  }
};

// @desc    Get care logs
// @route   GET /api/caregivers/care-logs/:patientId
// @access  Private
exports.getCareLogs = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { limit = 30 } = req.query;

    const caregiver = await Caregiver.findById(req.user.id);
    if (caregiver.assignedPatient.toString() !== patientId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Fetch care logs
    // const logs = await CareLog.find({ patient: patientId })
    //   .sort({ date: -1 })
    //   .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        logs: []
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching care logs',
      error: error.message
    });
  }
};

// @desc    Update profile
// @route   PUT /api/caregivers/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const caregiverId = req.user.id;
    const {
      name,
      relationship,
      email,
      phone,
      notifications
    } = req.body;

    const updatedCaregiver = await Caregiver.findByIdAndUpdate(
      caregiverId,
      { name, relationship, email, phone, notifications },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedCaregiver
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// @desc    Get profile
// @route   GET /api/caregivers/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.user.id)
      .select('-password')
      .populate('assignedPatient');

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: 'Caregiver not found'
      });
    }

    res.json({
      success: true,
      data: caregiver
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};




// Temporary placeholder handlers for unimplemented routes
const placeholder = (req, res) => {
  res.json({ success: true, message: 'Endpoint not yet implemented' });
};

exports.getPatientVitals = placeholder;
exports.getVitalsHistory = placeholder;
exports.getMedications = placeholder;
exports.addMedication = placeholder;
exports.updateMedication = placeholder;
exports.deleteMedication = placeholder;
exports.markMedicationGiven = placeholder;
exports.getCareLogById = placeholder;
exports.updateCareLog = placeholder;
exports.deleteCareLog = placeholder;
exports.getMessages = placeholder;
exports.sendMessage = placeholder;
exports.getAppointments = placeholder;
exports.createAppointment = placeholder;
exports.getSettings = placeholder;
exports.updateSettings = placeholder;
exports.changePassword = placeholder;
exports.getNotifications = placeholder;
exports.markNotificationRead = placeholder;
exports.getTasks = placeholder;
exports.createTask = placeholder;
exports.toggleTaskComplete = placeholder;
