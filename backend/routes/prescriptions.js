const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const prescriptionController = require('../controllers/prescriptionController');

// GET all prescriptions
router.get('/', protect, prescriptionController.getAllPrescriptions);

// GET prescription count - ADD THIS LINE
router.get('/count', protect, prescriptionController.getPrescriptionCount);

// POST new prescription
router.post('/', protect, prescriptionController.createPrescription);

// GET single prescription
router.get('/:id', protect, prescriptionController.getPrescription);

// PUT update prescription
router.put('/:id', protect, prescriptionController.updatePrescription);

// DELETE prescription
router.delete('/:id', protect, prescriptionController.deletePrescription);

// GET prescriptions by patient
router.get('/patient/:patientId', protect, prescriptionController.getPrescriptionsByPatient);

module.exports = router;