const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const doctorController = require('../controllers/doctorController');

// Dashboard and overview routes
router.get('/dashboard', protect, doctorController.getDoctorDashboard);
router.get('/profile', protect, doctorController.getDoctorProfile);
router.get('/patients', protect, doctorController.getDoctorPatients);
router.get('/prescriptions', protect, doctorController.getDoctorPrescriptions);

module.exports = router;