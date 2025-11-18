




// backend/routes/caregivers.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
//const auth = require('../middleware/auth');
const caregiverController = require('../controllers/caregiverController');

// All routes require authentication
router.use(protect);

// Overview/Dashboard route
router.get('/dashboard', caregiverController.getDashboard);

// Patient Profile routes
router.get('/patient-profile', caregiverController.getPatientProfile);
router.get('/patient-vitals', caregiverController.getPatientVitals);
router.get('/patient-vitals-history', caregiverController.getVitalsHistory);

// Medications routes
router.get('/medications', caregiverController.getMedications);
router.post('/medications', caregiverController.addMedication);
router.put('/medications/:id', caregiverController.updateMedication);
router.delete('/medications/:id', caregiverController.deleteMedication);
router.patch('/medications/:id/mark-given', caregiverController.markMedicationGiven);

// Care Log routes
router.get('/care-logs', caregiverController.getCareLogs);
router.post('/care-logs', caregiverController.submitCareLog);
router.get('/care-logs/:id', caregiverController.getCareLogById);
router.put('/care-logs/:id', caregiverController.updateCareLog);
router.delete('/care-logs/:id', caregiverController.deleteCareLog);

// Messages/Communication routes
router.get('/messages', caregiverController.getMessages);
router.post('/messages', caregiverController.sendMessage);
router.get('/appointments', caregiverController.getAppointments);
router.post('/appointments', caregiverController.createAppointment);

// Caregiver settings
router.get('/settings', caregiverController.getSettings);
router.put('/settings', caregiverController.updateSettings);
router.put('/change-password', caregiverController.changePassword);

// Notifications
router.get('/notifications', caregiverController.getNotifications);
router.put('/notifications/:id/read', caregiverController.markNotificationRead);

// Tasks
router.get('/tasks', caregiverController.getTasks);
router.post('/tasks', caregiverController.createTask);
router.patch('/tasks/:id/complete', caregiverController.toggleTaskComplete);

module.exports = router;