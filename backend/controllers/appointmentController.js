//-- correct--


const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Vital = require('../models/Vital');
// @desc    Get all appointments for a doctor
// @route   GET /api/appointments
// @access  Private
exports.getAllAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name age gender phone email address photo')
      .sort({ date: -1, time: -1 });
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching appointments', 
      error: error.message 
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name age gender phone email address photo patientId diagnosis');
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching appointment', 
      error: error.message 
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const {
      patientId,
      date,
      time,
      duration,
      type,
      reason,
      location,
      isVirtual,
      priority,
      notes
    } = req.body;

    // Validate required fields
    if (!patientId || !date || !time || !reason) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide patient, date, time, and reason',
      });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      duration: duration || 30,
      type: type || 'routine',
      reason,
      location: location || 'Room 101',
      isVirtual: isVirtual || false,
      priority: priority || 'normal',
      notes,
      status: 'scheduled'
    });

    // Populate patient data
    await appointment.populate('patient', 'name age gender phone email address photo');

    // Update patient's nextAppointment field
    await Patient.findByIdAndUpdate(patientId, {
      nextAppointment: date
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating appointment', 
      error: error.message 
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'name age gender phone email address photo');

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating appointment', 
      error: error.message 
    });
  }
};

// @desc    Complete appointment and record visit
// @route   POST /api/appointments/:id/complete
// @access  Private
// exports.completeAppointment = async (req, res) => {
//   try {
//     const {
//       diagnosis,
//       treatment,
//       prescriptions,
//       followUpDate,
//       notes
//     } = req.body;

//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: 'completed',
//         visitRecord: {
//           diagnosis,
//           treatment,
//           prescriptions,
//           followUpDate,
//           notes,
//           completedAt: new Date()
//         }
//       },
//       { new: true, runValidators: true }
//     ).populate('patient', 'name age gender phone email address photo');

//     if (!appointment) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Appointment not found' 
//       });
//     }

//     // Update patient's last visit
//     await Patient.findByIdAndUpdate(appointment.patient._id, {
//       lastVisit: new Date()
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Appointment completed and visit recorded',
//       data: appointment
//     });
//   } catch (error) {
//     console.error('Error completing appointment:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error completing appointment', 
//       error: error.message 
//     });
//   }
// };

// @desc    Reschedule appointment
// @route   POST /api/appointments/:id/reschedule
// @access  Private
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { date, time, reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }

    // Store old schedule in history
    const rescheduleRecord = {
      oldDate: appointment.date,
      oldTime: appointment.time,
      newDate: date,
      newTime: time,
      reason,
      timestamp: new Date()
    };

    appointment.rescheduleHistory = appointment.rescheduleHistory || [];
    appointment.rescheduleHistory.push(rescheduleRecord);
    appointment.date = date;
    appointment.time = time;

    await appointment.save();
    await appointment.populate('patient', 'name age gender phone email address photo');

    // Update patient's nextAppointment if needed
    await Patient.findByIdAndUpdate(appointment.patient._id, {
      nextAppointment: date
    });

    res.status(200).json({
      success: true,
      message: 'Appointment rescheduled successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error rescheduling appointment', 
      error: error.message 
    });
  }
};

// @desc    Cancel appointment
// @route   POST /api/appointments/:id/cancel
// @access  Private
exports.cancelAppointment = async (req, res) => {
  try {
    const { reason } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        cancellationReason: reason
      },
      { new: true }
    ).populate('patient', 'name age gender phone email address photo');

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error cancelling appointment', 
      error: error.message 
    });
  }
};

// @desc    Get appointments by date
// @route   GET /api/appointments/date/:date
// @access  Private
exports.getAppointmentsByDate = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { date } = req.params;

    const appointments = await Appointment.find({ 
      doctor: doctorId,
      date: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999)
      }
    })
    .populate('patient', 'name age gender phone email address photo')
    .sort({ time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments by date:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching appointments', 
      error: error.message 
    });
  }
};

// @desc    Get appointments by status
// @route   GET /api/appointments/status/:status
// @access  Private
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { status } = req.params;

    const appointments = await Appointment.find({ 
      doctor: doctorId,
      status
    })
    .populate('patient', 'name age gender phone email address photo')
    .sort({ date: -1, time: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments by status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching appointments', 
      error: error.message 
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Appointment deleted successfully',
      data: {} 
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting appointment', 
      error: error.message 
    });
  }
};




// Add this to controllers/appointmentController.js

//const Vital = require('../models/Vital');

// Update the completeAppointment function
exports.completeAppointment = async (req, res) => {
  try {
    const {
      diagnosis,
      treatment,
      prescriptions,
      followUpDate,
      notes,
      vitals  // NEW: Vitals data
    } = req.body;

    // Validate vitals data
    if (!vitals || !vitals.bloodPressure || !vitals.heartRate || 
        !vitals.bloodSugar || !vitals.temperature || !vitals.oxygenSaturation) {
      return res.status(400).json({ 
        success: false,
        message: 'All vital signs are required' 
      });
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name age gender phone email address photo');

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: 'Appointment not found' 
      });
    }

    // Create vitals record in database
    const vitalRecord = await Vital.create({
      patientId: appointment.patient._id,
      timestamp: new Date(),
      heartRate: parseInt(vitals.heartRate),
      bloodPressure: {
        systolic: parseInt(vitals.bloodPressure.systolic),
        diastolic: parseInt(vitals.bloodPressure.diastolic)
      },
      bloodSugar: parseInt(vitals.bloodSugar),
      temperature: parseFloat(vitals.temperature),
      oxygenSaturation: parseInt(vitals.oxygenSaturation),
      notes: notes || '',
      status: determineVitalStatus(vitals),
      enteredBy: req.user.id
    });

    // Update appointment with visit record
    appointment.status = 'completed';
    appointment.visitRecord = {
      diagnosis,
      treatment,
      prescriptions,
      followUpDate,
      notes,
      completedAt: new Date(),
      vitalRecordId: vitalRecord._id  // Reference to vitals
    };

    await appointment.save();

    // Update patient's last visit
    await Patient.findByIdAndUpdate(appointment.patient._id, {
      lastVisit: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Appointment completed, visit recorded, and vitals saved',
      data: {
        appointment,
        vitals: vitalRecord
      }
    });
  } catch (error) {
    console.error('Error completing appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error completing appointment', 
      error: error.message 
    });
  }
};

// Helper function to determine vital status
function determineVitalStatus(vitals) {
  const { bloodPressure, heartRate, bloodSugar, temperature, oxygenSaturation } = vitals;
  
  // Critical conditions
  if (bloodPressure.systolic > 180 || bloodPressure.diastolic > 120 ||
      heartRate > 120 || heartRate < 40 ||
      bloodSugar > 300 || bloodSugar < 50 ||
      temperature > 103 || temperature < 95 ||
      oxygenSaturation < 90) {
    return 'critical';
  }
  
  // Warning conditions
  if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90 ||
      heartRate > 100 || heartRate < 60 ||
      bloodSugar > 180 || bloodSugar < 70 ||
      temperature > 100.4 || temperature < 97 ||
      oxygenSaturation < 95) {
    return 'warning';
  }
  
  return 'normal';
}


