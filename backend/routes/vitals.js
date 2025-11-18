// routes/vitals.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const vitalsController = require('../controllers/vitalsController');
const Patient = require('../models/Patient');


router.post('/fix-relationships', protect, async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    console.log('\n=== FIXING PATIENT-DOCTOR RELATIONSHIPS ===');
    console.log('Doctor ID:', doctorId);
    
    // Get current state
    const totalPatients = await Patient.countDocuments();
    const beforeCount = await Patient.countDocuments({ doctor: doctorId });
    
    console.log(`Total patients in database: ${totalPatients}`);
    console.log(`Patients already linked to you: ${beforeCount}`);
    
    // Update all patients to belong to this doctor
    const result = await Patient.updateMany(
      {},
      { $set: { doctor: doctorId } }
    );
    
    // Verify the change
    const afterCount = await Patient.countDocuments({ doctor: doctorId });
    
    console.log(`✅ Updated ${result.modifiedCount} patients`);
    console.log(`✅ You now have ${afterCount} patients linked to your account`);
    
    res.status(200).json({
      success: true,
      message: `Successfully linked ${result.modifiedCount} patients to your account`,
      data: {
        totalPatients,
        patientsUpdated: result.modifiedCount,
        yourPatients: afterCount
      }
    });
  } catch (error) {
    console.error('❌ Error fixing relationships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fixing relationships',
      error: error.message
    });
  }
});
// DEBUG ENDPOINT - Add this first (before other routes)
router.get('/debug', protect, vitalsController.debugVitals);

// Get all patients' latest vitals (for dashboard)
router.get('/latest', protect, vitalsController.getAllPatientsLatestVitals);

// Get specific patient vitals
router.get('/patient/:patientId', protect, vitalsController.getPatientVitals);

// Get patient vitals trends
router.get('/patient/:patientId/trends', protect, vitalsController.getPatientVitalsTrends);

// Create manual vital entry
router.post('/', protect, vitalsController.createVitalEntry);

module.exports = router;