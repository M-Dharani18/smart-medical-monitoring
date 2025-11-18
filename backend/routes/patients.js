// routes/patients.js
// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/Patient');
// const auth = require('../middleware/auth')

// POST - Create new patient
// router.post('/patients', async (req, res) => {
//   try {
//     console.log('Received patient data:', req.body);
//     const {
//       firstName,
//       lastName,
//       name,
//       dateOfBirth,
//       age,
//       gender,
//       phone,
//       email,
//       address,
//       bloodType,
//       allergies,
//       diagnosis,
//       caregiver,
//       emergencyContact,
//       emergencyPhone,
//       notes,
//       status,
//       lastVisit,
//       medications,
//       photo
//     } = req.body;

    // Generate patient ID
    // const patientCount = await Patient.countDocuments();
    // const patientId = `PT-2024-${String(patientCount + 1).padStart(3, '0')}`;

    // console.log('Generated patient ID:', patientId);
    // Create new patient
//     const newPatient = new Patient({
//       firstName,
//       lastName,
//       name,
//       patientId,
//       dateOfBirth,
//       age,
//       gender,
//       phone,
//       email,
//       address,
//       bloodType,
//       allergies: allergies || 'None',
//       diagnosis,
//       caregiver,
//       emergencyContact,
//       emergencyPhone,
//       notes,
//       status: status || 'stable',
//       lastVisit: lastVisit || new Date(),
//       medications: medications || [],
//       photo: photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop',
//       nextAppointment: null
//     });

//     const savedPatient = await newPatient.save();
//     console.log('Patient saved successfully:', savedPatient);
//     res.status(201).json(savedPatient);
//   } catch (error) {
//     console.error('Error creating patient:', error);
//     res.status(500).json({ message: 'Error creating patient', error: error.message });
//   }
// });

// router.get('/patients/:id', async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
//     res.json(patient);
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     res.status(500).json({ message: 'Error fetching patient', error: error.message });
//   }
// });


// module.exports = router;

// routes/patients.js
// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/Patient');
// const auth = require('../middleware/auth');

// // GET all patients
// router.get('/', auth, async (req, res) => {
//   try {
//     const patients = await Patient.find().sort({ createdAt: -1 });
//     res.json(patients);
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ message: 'Error fetching patients', error: error.message });
//   }
// });

// // GET single patient by ID
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
//     res.json(patient);
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     res.status(500).json({ message: 'Error fetching patient', error: error.message });
//   }
// });

// // POST - Create new patient
// router.post('/', auth, async (req, res) => {
//   try {
//     console.log('Received patient data:', req.body);
//     const {
//       firstName,
//       lastName,
//       name,
//       dateOfBirth,
//       age,
//       gender,
//       phone,
//       email,
//       address,
//       bloodType,
//       allergies,
//       diagnosis,
//       caregiver,
//       emergencyContact,
//       emergencyPhone,
//       notes,
//       status,
//       lastVisit,
//       medications,
//       photo
//     } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !dateOfBirth || !gender || !phone || !diagnosis || !caregiver || !emergencyContact || !emergencyPhone) {
//       return res.status(400).json({ 
//         message: 'Please provide all required fields',
//         required: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phone', 'diagnosis', 'caregiver', 'emergencyContact', 'emergencyPhone']
//       });
//     }

//     // Generate patient ID
//     const patientCount = await Patient.countDocuments();
//     const patientId = `PT-${new Date().getFullYear()}-${String(patientCount + 1).padStart(3, '0')}`;

//     console.log('Generated patient ID:', patientId);

//     // Create new patient
//     const newPatient = new Patient({
//       firstName,
//       lastName,
//       name: name || `${firstName} ${lastName}`,
//       patientId,
//       dateOfBirth,
//       age: age || new Date().getFullYear() - new Date(dateOfBirth).getFullYear(),
//       gender,
//       phone,
//       email,
//       address,
//       bloodType,
//       allergies: allergies || 'None',
//       diagnosis,
//       caregiver,
//       emergencyContact,
//       emergencyPhone,
//       notes,
//       status: status || 'stable',
//       lastVisit: lastVisit || new Date(),
//       medications: medications || [],
//       photo: photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop',
//       nextAppointment: null
//     });

//     const savedPatient = await newPatient.save();
//     console.log('Patient saved successfully:', savedPatient);
//     res.status(201).json(savedPatient);
//   } catch (error) {
//     console.error('Error creating patient:', error);
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ 
//         message: 'Validation error', 
//         error: error.message,
//         details: error.errors 
//       });
//     }
    
//     res.status(500).json({ message: 'Error creating patient', error: error.message });
//   }
// });

// // PUT - Update patient
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const patient = await Patient.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     res.json(patient);
//   } catch (error) {
//     console.error('Error updating patient:', error);
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ message: error.message });
//     }
    
//     res.status(500).json({ message: 'Error updating patient', error: error.message });
//   }
// });

// // DELETE patient
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const patient = await Patient.findByIdAndDelete(req.params.id);

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     res.json({ message: 'Patient deleted successfully', patient });
//   } catch (error) {
//     console.error('Error deleting patient:', error);
//     res.status(500).json({ message: 'Error deleting patient', error: error.message });
//   }
// });

// module.exports = router;





// routes/patients.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const patientController = require('../controllers/patientController');


// Additional routes for specific functionality
router.get('/status/:status', protect, patientController.getPatientsByStatus);
router.get('/caregiver/:caregiverName', protect, patientController.getPatientsByCaregiver);

// Basic CRUD routes
router.get('/', protect, patientController.getAllPatients);
router.post('/', protect, patientController.createPatient);
router.get('/:id', protect, patientController.getPatient);
router.put('/:id', protect, patientController.updatePatient);
router.delete('/:id', protect, patientController.deletePatient);


// Medication management routes
router.post('/:id/medications', protect, patientController.addMedication);
router.delete('/:id/medications/:medication', protect, patientController.removeMedication);

//clinical notes
router.post('/:id/notes', protect, patientController.addClinicalNote);

// Status update route
router.patch('/:id/status', protect, patientController.updatePatientStatus);

module.exports = router;