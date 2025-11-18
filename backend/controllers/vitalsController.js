// // controllers/vitalsController.js
// const Vital = require('../models/Vital');
// const Patient = require('../models/Patient');

// // Get all vitals for a patient
// exports.getPatientVitals = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { limit = 50, sortBy = 'timestamp', order = 'desc' } = req.query;

//     const vitals = await Vital.find({ patientId })
//       .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
//       .limit(parseInt(limit))
//       .populate('enteredBy', 'name');

//     res.status(200).json({
//       success: true,
//       count: vitals.length,
//       data: vitals
//     });
//   } catch (error) {
//     console.error('Error fetching vitals:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals', 
//       error: error.message 
//     });
//   }
// };

// // Get latest vitals for all patients
// exports.getAllPatientsLatestVitals = async (req, res) => {
//   try {
//     const doctorId = req.user.id;
    
//     // Get all patients for this doctor
//     const patients = await Patient.find({ doctor: doctorId });
//     const patientIds = patients.map(p => p._id);

//     // Get latest vital for each patient
//     const vitalsPromises = patientIds.map(async (patientId) => {
//       const latestVital = await Vital.findOne({ patientId })
//         .sort({ timestamp: -1 })
//         .populate('patientId', 'name age gender photo condition');
//       return latestVital;
//     });

//     const vitals = (await Promise.all(vitalsPromises)).filter(v => v !== null);

//     res.status(200).json({
//       success: true,
//       count: vitals.length,
//       data: vitals
//     });
//   } catch (error) {
//     console.error('Error fetching all patient vitals:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals', 
//       error: error.message 
//     });
//   }
// };

// // Get vitals trends for a patient
// exports.getPatientVitalsTrends = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { days = 7 } = req.query;

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - parseInt(days));

//     const vitals = await Vital.find({
//       patientId,
//       timestamp: { $gte: startDate }
//     }).sort({ timestamp: 1 });

//     res.status(200).json({
//       success: true,
//       count: vitals.length,
//       data: vitals
//     });
//   } catch (error) {
//     console.error('Error fetching vitals trends:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals trends', 
//       error: error.message 
//     });
//   }
// };

// // Create manual vital entry
// exports.createVitalEntry = async (req, res) => {
//   try {
//     const {
//       patientId,
//       heartRate,
//       bloodPressure,
//       bloodSugar,
//       temperature,
//       oxygenSaturation,
//       weight,
//       notes
//     } = req.body;

//     const vital = await Vital.create({
//       patientId,
//       timestamp: new Date(),
//       heartRate,
//       bloodPressure,
//       bloodSugar,
//       temperature,
//       oxygenSaturation,
//       weight,
//       notes,
//       status: determineVitalStatus(req.body),
//       enteredBy: req.user.id
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Vital entry created successfully',
//       data: vital
//     });
//   } catch (error) {
//     console.error('Error creating vital entry:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error creating vital entry', 
//       error: error.message 
//     });
//   }
// };

// function determineVitalStatus(vitals) {
//   const { bloodPressure, heartRate, bloodSugar, temperature, oxygenSaturation } = vitals;
  
//   if (bloodPressure.systolic > 180 || bloodPressure.diastolic > 120 ||
//       heartRate > 120 || heartRate < 40 ||
//       (bloodSugar && (bloodSugar > 300 || bloodSugar < 50)) ||
//       temperature > 103 || temperature < 95 ||
//       oxygenSaturation < 90) {
//     return 'critical';
//   }
  
//   if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90 ||
//       heartRate > 100 || heartRate < 60 ||
//       (bloodSugar && (bloodSugar > 180 || bloodSugar < 70)) ||
//       temperature > 100.4 || temperature < 97 ||
//       oxygenSaturation < 95) {
//     return 'warning';
//   }
  
//   return 'normal';
// }

// module.exports = exports;

// // controllers/vitalsController.js
// const Vital = require('../models/Vital');
// const Patient = require('../models/Patient');

// // Get all vitals for a patient
// exports.getPatientVitals = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { limit = 50, sortBy = 'timestamp', order = 'desc' } = req.query;

//     const vitals = await Vital.find({ patientId })
//       .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
//       .limit(parseInt(limit))
//       .populate('enteredBy', 'name');

//     res.status(200).json({
//       success: true,
//       count: vitals.length,
//       data: vitals
//     });
//   } catch (error) {
//     console.error('Error fetching vitals:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals', 
//       error: error.message 
//     });
//   }
// };

// // Get latest vitals for all patients - FIXED VERSION
// exports.getAllPatientsLatestVitals = async (req, res) => {
//   try {
//     const doctorId = req.user.id;
    
//     // Get all patients for this doctor
//     const patients = await Patient.find({ doctor: doctorId }).select('_id');
    
//     if (!patients || patients.length === 0) {
//       return res.status(200).json({
//         success: true,
//         count: 0,
//         data: [],
//         message: 'No patients found for this doctor'
//       });
//     }

//     const patientIds = patients.map(p => p._id);

//     // Get latest vital for each patient using aggregation
//     const latestVitals = await Vital.aggregate([
//       {
//         $match: {
//           patientId: { $in: patientIds }
//         }
//       },
//       {
//         $sort: { timestamp: -1 }
//       },
//       {
//         $group: {
//           _id: '$patientId',
//           latestVital: { $first: '$$ROOT' }
//         }
//       },
//       {
//         $replaceRoot: { newRoot: '$latestVital' }
//       },
//       {
//         $lookup: {
//           from: 'patients',
//           localField: 'patientId',
//           foreignField: '_id',
//           as: 'patientDetails'
//         }
//       },
//       {
//         $unwind: '$patientDetails'
//       },
//       {
//         $project: {
//           _id: 1,
//           patientId: {
//             _id: '$patientDetails._id',
//             name: '$patientDetails.name',
//             age: '$patientDetails.age',
//             gender: '$patientDetails.gender',
//             photo: '$patientDetails.photo',
//             condition: '$patientDetails.condition'
//           },
//           timestamp: 1,
//           heartRate: 1,
//           bloodPressure: 1,
//           bloodSugar: 1,
//           temperature: 1,
//           oxygenSaturation: 1,
//           weight: 1,
//           notes: 1,
//           status: 1,
//           enteredBy: 1
//         }
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       count: latestVitals.length,
//       data: latestVitals
//     });
//   } catch (error) {
//     console.error('Error fetching all patient vitals:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals', 
//       error: error.message 
//     });
//   }
// };

// // Get vitals trends for a patient
// exports.getPatientVitalsTrends = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { days = 7 } = req.query;

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - parseInt(days));

//     const vitals = await Vital.find({
//       patientId,
//       timestamp: { $gte: startDate }
//     }).sort({ timestamp: 1 });

//     res.status(200).json({
//       success: true,
//       count: vitals.length,
//       data: vitals
//     });
//   } catch (error) {
//     console.error('Error fetching vitals trends:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error fetching vitals trends', 
//       error: error.message 
//     });
//   }
// };

// // Create manual vital entry
// exports.createVitalEntry = async (req, res) => {
//   try {
//     const {
//       patientId,
//       heartRate,
//       bloodPressure,
//       bloodSugar,
//       temperature,
//       oxygenSaturation,
//       weight,
//       notes
//     } = req.body;

//     // Validate required fields
//     if (!patientId || !heartRate || !bloodPressure || !bloodPressure.systolic || !bloodPressure.diastolic) {
//       return res.status(400).json({
//         success: false,
//         message: 'Patient ID, heart rate, and blood pressure are required'
//       });
//     }

//     // Verify patient belongs to this doctor
//     const patient = await Patient.findOne({ 
//       _id: patientId, 
//       doctor: req.user.id 
//     });

//     if (!patient) {
//       return res.status(404).json({
//         success: false,
//         message: 'Patient not found or unauthorized'
//       });
//     }

//     const vital = await Vital.create({
//       patientId,
//       timestamp: new Date(),
//       heartRate,
//       bloodPressure,
//       bloodSugar,
//       temperature,
//       oxygenSaturation,
//       weight,
//       notes,
//       status: determineVitalStatus(req.body),
//       enteredBy: req.user.id
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Vital entry created successfully',
//       data: vital
//     });
//   } catch (error) {
//     console.error('Error creating vital entry:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Error creating vital entry', 
//       error: error.message 
//     });
//   }
// };

// function determineVitalStatus(vitals) {
//   const { bloodPressure, heartRate, bloodSugar, temperature, oxygenSaturation } = vitals;
  
//   if (bloodPressure.systolic > 180 || bloodPressure.diastolic > 120 ||
//       heartRate > 120 || heartRate < 40 ||
//       (bloodSugar && (bloodSugar > 300 || bloodSugar < 50)) ||
//       (temperature && (temperature > 103 || temperature < 95)) ||
//       (oxygenSaturation && oxygenSaturation < 90)) {
//     return 'critical';
//   }
  
//   if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90 ||
//       heartRate > 100 || heartRate < 60 ||
//       (bloodSugar && (bloodSugar > 180 || bloodSugar < 70)) ||
//       (temperature && (temperature > 100.4 || temperature < 97)) ||
//       (oxygenSaturation && oxygenSaturation < 95)) {
//     return 'warning';
//   }
  
//   return 'normal';
// }

// // Add this to vitalsController.js for debugging

// // Debug endpoint - Add to exports
// exports.debugVitals = async (req, res) => {
//   try {
//     const doctorId = req.user.id;
    
//     // Get all patients for this doctor
//     const patients = await Patient.find({ doctor: doctorId });
//     console.log(`Doctor ${doctorId} has ${patients.length} patients`);
    
//     // Get all vitals
//     const allVitals = await Vital.find({})
//       .populate('patientId', 'name age gender photo condition')
//       .populate('enteredBy', 'name');
//     console.log(`Total vitals in database: ${allVitals.length}`);
    
//     // Get vitals for this doctor's patients
//     const patientIds = patients.map(p => p._id);
//     const doctorVitals = await Vital.find({ 
//       patientId: { $in: patientIds } 
//     })
//       .populate('patientId', 'name age gender photo condition')
//       .populate('enteredBy', 'name')
//       .sort({ timestamp: -1 });
    
//     console.log(`Vitals for this doctor's patients: ${doctorVitals.length}`);
    
//     res.status(200).json({
//       success: true,
//       debug: {
//         doctorId,
//         totalPatients: patients.length,
//         patients: patients.map(p => ({ id: p._id, name: p.name })),
//         totalVitalsInDB: allVitals.length,
//         doctorVitalsCount: doctorVitals.length,
//         doctorVitals: doctorVitals.map(v => ({
//           id: v._id,
//           patient: v.patientId?.name || 'Unknown',
//           timestamp: v.timestamp,
//           heartRate: v.heartRate,
//           bloodPressure: v.bloodPressure,
//           enteredBy: v.enteredBy?.name || 'Unknown'
//         }))
//       }
//     });
//   } catch (error) {
//     console.error('Debug error:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Debug error', 
//       error: error.message 
//     });
//   }
// };

// // Add this route to vitals.js
// // router.get('/debug', protect, vitalsController.debugVitals);

// module.exports = exports;



// controllers/vitalsController.js - COMPLETE VERSION WITH DEBUG LOGGING

const Vital = require('../models/Vital');
const Patient = require('../models/Patient');

// Get all vitals for a patient
exports.getPatientVitals = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { limit = 50, sortBy = 'timestamp', order = 'desc' } = req.query;

    const vitals = await Vital.find({ patientId })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(parseInt(limit))
      .populate('enteredBy', 'name');

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching vitals', 
      error: error.message 
    });
  }
};

// Get latest vitals for all patients - WITH EXTENSIVE LOGGING
exports.getAllPatientsLatestVitals = async (req, res) => {
  try {
    const doctorId = req.user.id;
    console.log('\n=== GET ALL PATIENTS LATEST VITALS ===');
    console.log('Doctor ID:', doctorId);
    
    // Get all patients for this doctor
    const patients = await Patient.find({ doctor: doctorId }).select('_id name');
    console.log(`Found ${patients.length} patients for this doctor`);
    console.log('Patient IDs:', patients.map(p => ({ id: p._id, name: p.name })));
    
    if (!patients || patients.length === 0) {
      console.log('❌ No patients found for this doctor');
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No patients found for this doctor'
      });
    }

    const patientIds = patients.map(p => p._id);

    // Check if ANY vitals exist in the database
    const totalVitals = await Vital.countDocuments();
    console.log(`Total vitals in database: ${totalVitals}`);

    // Check vitals for these patients
    const vitalsForPatients = await Vital.countDocuments({ 
      patientId: { $in: patientIds } 
    });
    console.log(`Vitals for doctor's patients: ${vitalsForPatients}`);

    // If no vitals found, return early with helpful message
    if (vitalsForPatients === 0) {
      console.log('❌ No vitals found for any patients');
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No vitals recorded yet. Complete an appointment to record vitals.'
      });
    }

    // Get latest vital for each patient using aggregation
    const latestVitals = await Vital.aggregate([
      {
        $match: {
          patientId: { $in: patientIds }
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$patientId',
          latestVital: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$latestVital' }
      },
      {
        $lookup: {
          from: 'patients',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patientDetails'
        }
      },
      {
        $unwind: '$patientDetails'
      },
      {
        $project: {
          _id: 1,
          patientId: {
            _id: '$patientDetails._id',
            name: '$patientDetails.name',
            age: '$patientDetails.age',
            gender: '$patientDetails.gender',
            photo: '$patientDetails.photo',
            condition: '$patientDetails.condition'
          },
          timestamp: 1,
          heartRate: 1,
          bloodPressure: 1,
          bloodSugar: 1,
          temperature: 1,
          oxygenSaturation: 1,
          weight: 1,
          notes: 1,
          status: 1,
          enteredBy: 1
        }
      }
    ]);

    console.log(`✅ Returning ${latestVitals.length} latest vitals`);
    console.log('Latest vitals preview:', latestVitals.map(v => ({
      patient: v.patientId?.name,
      heartRate: v.heartRate,
      timestamp: v.timestamp
    })));

    res.status(200).json({
      success: true,
      count: latestVitals.length,
      data: latestVitals
    });
  } catch (error) {
    console.error('❌ Error fetching all patient vitals:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching vitals', 
      error: error.message 
    });
  }
};

// Get vitals trends for a patient
exports.getPatientVitalsTrends = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const vitals = await Vital.find({
      patientId,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });
  } catch (error) {
    console.error('Error fetching vitals trends:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching vitals trends', 
      error: error.message 
    });
  }
};

// Create manual vital entry
exports.createVitalEntry = async (req, res) => {
  try {
    const {
      patientId,
      heartRate,
      bloodPressure,
      bloodSugar,
      temperature,
      oxygenSaturation,
      weight,
      notes
    } = req.body;

    // Validate required fields
    if (!patientId || !heartRate || !bloodPressure || !bloodPressure.systolic || !bloodPressure.diastolic) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID, heart rate, and blood pressure are required'
      });
    }

    // Verify patient belongs to this doctor
    const patient = await Patient.findOne({ 
      _id: patientId, 
      doctor: req.user.id 
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found or unauthorized'
      });
    }

    const vital = await Vital.create({
      patientId,
      timestamp: new Date(),
      heartRate,
      bloodPressure,
      bloodSugar,
      temperature,
      oxygenSaturation,
      weight,
      notes,
      status: determineVitalStatus(req.body),
      enteredBy: req.user.id
    });

    console.log('✅ Vital entry created:', {
      vitalId: vital._id,
      patientId,
      patientName: patient.name,
      heartRate,
      bloodPressure
    });

    res.status(201).json({
      success: true,
      message: 'Vital entry created successfully',
      data: vital
    });
  } catch (error) {
    console.error('Error creating vital entry:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating vital entry', 
      error: error.message 
    });
  }
};

// DEBUG ENDPOINT - Add this temporarily
exports.debugVitals = async (req, res) => {
  try {
    const doctorId = req.user.id;
    
    console.log('\n=== DEBUG VITALS ===');
    console.log('Doctor ID:', doctorId);
    
    // Get all patients
    const allPatients = await Patient.find().select('_id name doctor');
    console.log('All patients in DB:', allPatients.length);
    
    // Get patients for this doctor
    const doctorPatients = await Patient.find({ doctor: doctorId }).select('_id name');
    console.log('Doctor patients:', doctorPatients.length);
    
    // Get all vitals
    const allVitals = await Vital.find()
      .populate('patientId', 'name')
      .populate('enteredBy', 'name')
      .sort({ timestamp: -1 });
    console.log('All vitals in DB:', allVitals.length);
    
    // Get vitals for doctor's patients
    const patientIds = doctorPatients.map(p => p._id);
    const doctorVitals = await Vital.find({ 
      patientId: { $in: patientIds } 
    })
      .populate('patientId', 'name')
      .populate('enteredBy', 'name')
      .sort({ timestamp: -1 });
    
    res.status(200).json({
      success: true,
      debug: {
        doctorId,
        counts: {
          allPatients: allPatients.length,
          doctorPatients: doctorPatients.length,
          allVitals: allVitals.length,
          doctorVitals: doctorVitals.length
        },
        doctorPatients: doctorPatients.map(p => ({ id: p._id, name: p.name })),
        allPatients: allPatients.map(p => ({ 
          id: p._id, 
          name: p.name, 
          doctor: p.doctor,
          belongsToThisDoctor: p.doctor?.toString() === doctorId 
        })),
        allVitals: allVitals.map(v => ({
          id: v._id,
          patient: v.patientId?.name || 'Unknown',
          patientId: v.patientId?._id,
          heartRate: v.heartRate,
          timestamp: v.timestamp,
          enteredBy: v.enteredBy?.name
        })),
        doctorVitals: doctorVitals.map(v => ({
          id: v._id,
          patient: v.patientId?.name || 'Unknown',
          heartRate: v.heartRate,
          timestamp: v.timestamp
        }))
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Debug error', 
      error: error.message 
    });
  }
};

function determineVitalStatus(vitals) {
  const { bloodPressure, heartRate, bloodSugar, temperature, oxygenSaturation } = vitals;
  
  if (bloodPressure.systolic > 180 || bloodPressure.diastolic > 120 ||
      heartRate > 120 || heartRate < 40 ||
      (bloodSugar && (bloodSugar > 300 || bloodSugar < 50)) ||
      (temperature && (temperature > 103 || temperature < 95)) ||
      (oxygenSaturation && oxygenSaturation < 90)) {
    return 'critical';
  }
  
  if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90 ||
      heartRate > 100 || heartRate < 60 ||
      (bloodSugar && (bloodSugar > 180 || bloodSugar < 70)) ||
      (temperature && (temperature > 100.4 || temperature < 97)) ||
      (oxygenSaturation && oxygenSaturation < 95)) {
    return 'warning';
  }
  
  return 'normal';
}

module.exports = exports;