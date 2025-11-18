// routes/appointments.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

// Basic CRUD routes
router.get('/', protect, appointmentController.getAllAppointments);
router.post('/', protect, appointmentController.createAppointment);
router.get('/:id', protect, appointmentController.getAppointment);
router.put('/:id', protect, appointmentController.updateAppointment);
router.delete('/:id', protect, appointmentController.deleteAppointment);

// Special action routes
router.post('/:id/complete', protect, appointmentController.completeAppointment);
router.post('/:id/reschedule', protect, appointmentController.rescheduleAppointment);
router.post('/:id/cancel', protect, appointmentController.cancelAppointment);

// Filter routes
router.get('/date/:date', protect, appointmentController.getAppointmentsByDate);
router.get('/status/:status', protect, appointmentController.getAppointmentsByStatus);

module.exports = router;