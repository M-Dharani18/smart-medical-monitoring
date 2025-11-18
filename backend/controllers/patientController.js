// controllers/patientController.js
const Patient = require('../models/Patient');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching patients', 
      error: error.message 
    });
  }
};

// @desc    Get single patient by ID
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error fetching patient', 
      error: error.message 
    });
  }
};

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
exports.createPatient = async (req, res) => {
  try {
    console.log('Received patient data:', req.body);
    
    const {
      firstName,
      lastName,
      name,
      dateOfBirth,
      age,
      gender,
      phone,
      email,
      address,
      bloodType,
      allergies,
      diagnosis,
      caregiver,
      emergencyContact,
      emergencyPhone,
      notes,
      status,
      lastVisit,
      medications,
      photo
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !gender || !phone || 
        !diagnosis || !caregiver || !emergencyContact || !emergencyPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields',
        required: [
          'firstName', 
          'lastName', 
          'dateOfBirth', 
          'gender', 
          'phone', 
          'diagnosis', 
          'caregiver', 
          'emergencyContact', 
          'emergencyPhone'
        ]
      });
    }

    // Generate unique patient ID
    const patientCount = await Patient.countDocuments();
    const currentYear = new Date().getFullYear();
    const patientId = `PT-${currentYear}-${String(patientCount + 1).padStart(3, '0')}`;

    console.log('Generated patient ID:', patientId);

    // Calculate age if not provided
    const calculatedAge = age || new Date().getFullYear() - new Date(dateOfBirth).getFullYear();

    // Create new patient
    const newPatient = new Patient({
      firstName,
      lastName,
      name: name || `${firstName} ${lastName}`,
      patientId,
      dateOfBirth,
      age: calculatedAge,
      gender,
      phone,
      email,
      address,
      bloodType,
      allergies: allergies || 'None',
      diagnosis,
      caregiver,
      emergencyContact,
      emergencyPhone,
      notes,
      status: status || 'stable',
      lastVisit: lastVisit || new Date(),
      medications: medications || [],
      photo: photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop',
      nextAppointment: null
    });

    const savedPatient = await newPatient.save();
    
    console.log('Patient saved successfully:', savedPatient._id);
    
    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: savedPatient
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    // Handle duplicate patientId (shouldn't happen but just in case)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Patient ID already exists. Please try again.' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error creating patient', 
      error: error.message 
    });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  try {
    // Don't allow updating patientId
    if (req.body.patientId) {
      delete req.body.patientId;
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    console.log('Patient updated successfully:', patient._id);

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error updating patient', 
      error: error.message 
    });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    console.log('Patient deleted successfully:', patient._id);

    res.status(200).json({ 
      success: true,
      message: 'Patient deleted successfully', 
      data: {} 
    });
  } catch (error) {
    console.error('Error deleting patient:', error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error deleting patient', 
      error: error.message 
    });
  }
};

// @desc    Get patients by status
// @route   GET /api/patients/status/:status
// @access  Private
exports.getPatientsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    // Validate status
    const validStatuses = ['critical', 'monitoring', 'stable', 'discharged'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const patients = await Patient.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching patients by status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching patients', 
      error: error.message 
    });
  }
};

// @desc    Get patients by caregiver
// @route   GET /api/patients/caregiver/:caregiverName
// @access  Private
exports.getPatientsByCaregiver = async (req, res) => {
  try {
    const { caregiverName } = req.params;
    
    const patients = await Patient.find({ 
      caregiver: new RegExp(caregiverName, 'i') // Case-insensitive search
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    console.error('Error fetching patients by caregiver:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching patients', 
      error: error.message 
    });
  }
};

// @desc    Add medication to patient
// @route   POST /api/patients/:id/medications
// @access  Private
exports.addMedication = async (req, res) => {
  try {
    const { medication } = req.body;
    
    if (!medication) {
      return res.status(400).json({
        success: false,
        message: 'Medication name is required'
      });
    }

    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    // Add medication if not already in the list
    if (!patient.medications.includes(medication)) {
      patient.medications.push(medication);
      await patient.save();
    }

    res.status(200).json({
      success: true,
      message: 'Medication added successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error adding medication', 
      error: error.message 
    });
  }
};

// @desc    Remove medication from patient
// @route   DELETE /api/patients/:id/medications/:medication
// @access  Private
exports.removeMedication = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    // Remove medication from array
    patient.medications = patient.medications.filter(
      med => med !== req.params.medication
    );
    
    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Medication removed successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error removing medication:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error removing medication', 
      error: error.message 
    });
  }
};

// @desc    Update patient status
// @route   PATCH /api/patients/:id/status
// @access  Private
exports.updatePatientStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['critical', 'monitoring', 'stable', 'discharged'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Patient status updated successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error updating patient status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating patient status', 
      error: error.message 
    });
  }
};
// @desc    Add clinical note to patient
// @route   POST /api/patients/:id/notes
// @access  Private
exports.addClinicalNote = async (req, res) => {
  try {
    const { note, date, doctor } = req.body;
    
    if (!note || !doctor) {
      return res.status(400).json({
        success: false,
        message: 'Note and doctor name are required'
      });
    }

    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }

    // Initialize clinicalNotes array if it doesn't exist
    if (!patient.clinicalNotes) {
      patient.clinicalNotes = [];
    }

    // Add the new clinical note
    patient.clinicalNotes.push({
      note,
      date: date || new Date(),
      doctor
    });

    await patient.save();

    console.log('Clinical note added successfully for patient:', patient._id);

    res.status(200).json({
      success: true,
      message: 'Clinical note added successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error adding clinical note:', error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false,
        message: 'Patient not found' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error adding clinical note', 
      error: error.message 
    });
  }
};