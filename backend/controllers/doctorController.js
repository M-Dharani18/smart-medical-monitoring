const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Prescription = require('../models/Prescription');

// @desc    Get doctor dashboard data
// @route   GET /api/doctors/dashboard
// @access  Private (Doctor only)
exports.getDoctorDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get doctor profile
    const doctor = await Doctor.findOne({ userId });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }

    // Get all patients (in real app, you'd filter by assigned doctor)
    const allPatients = await Patient.find().sort({ createdAt: -1 });
    
    // Count critical cases
    const criticalCases = await Patient.countDocuments({ status: 'critical' });
    
    // Get prescriptions written by this doctor (you'll need to add doctorId to prescriptions)
    const prescriptions = await Prescription.find()
      .populate('patientId', 'name age')
      .sort({ date: -1 });

    // Count today's appointments (would need an appointments collection)
    const appointmentsToday = 0; // Placeholder

    // Update doctor stats
    doctor.stats = {
      totalPatients: allPatients.length,
      criticalCases,
      appointmentsToday,
      prescriptionsWritten: prescriptions.length
    };
    await doctor.save();

    // Get recent activity from prescriptions and patient updates
    const recentPrescriptions = prescriptions.slice(0, 5);
    const recentActivity = recentPrescriptions.map(prescription => ({
      id: prescription._id,
      type: 'prescription',
      title: 'Prescription Written',
      description: `Prescription for ${prescription.patientName || 'Patient'}`,
      timestamp: prescription.date || prescription.createdAt,
      patient: prescription.patientName || 'Unknown'
    }));

    // Get critical alerts
    const criticalPatients = await Patient.find({ status: 'critical' })
      .limit(5)
      .sort({ updatedAt: -1 });

    const notifications = criticalPatients.map(patient => ({
      id: patient._id,
      type: 'emergency',
      title: 'Critical Patient Alert',
      message: `${patient.name} requires immediate attention - Status: ${patient.status}`,
      timestamp: patient.updatedAt,
      priority: 'high',
      patient: patient.name
    }));

    res.status(200).json({
      success: true,
      data: {
        doctor: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          license: doctor.license,
          experience: doctor.experience,
          hospital: {
            name: doctor.hospitalName,
            address: doctor.hospitalAddress,
            phone: doctor.hospitalPhone,
            department: doctor.department
          },
          photo: doctor.photo,
          isProfileComplete: doctor.isProfileComplete,
          stats: doctor.stats
        },
        recentActivity,
        notifications,
        patients: allPatients.slice(0, 10) // First 10 patients
      }
    });
  } catch (error) {
    console.error('Error fetching doctor dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

// @desc    Get doctor's patients
// @route   GET /api/doctors/patients
// @access  Private (Doctor only)
exports.getDoctorPatients = async (req, res) => {
  try {
    // In a real app, you'd filter by doctor assignment
    const patients = await Patient.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching doctor patients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patients',
      error: error.message
    });
  }
};

// @desc    Get doctor's prescriptions
// @route   GET /api/doctors/prescriptions
// @access  Private (Doctor only)
exports.getDoctorPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patientId', 'name age diagnosis')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions',
      error: error.message
    });
  }
};

// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private (Doctor only)
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};