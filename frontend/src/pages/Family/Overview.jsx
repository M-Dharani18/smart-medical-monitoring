// import React from 'react';
// import { 
//   User, 
//   Phone, 
//   Mail, 
//   Calendar, 
//   Heart, 
//   Activity, 
//   AlertCircle, 
//   CheckCircle2,
//   Stethoscope,
//   UserCheck,
//   Clock,
//   MapPin,
//   TrendingUp,
//   Shield
// } from 'lucide-react';

// const FamilyOverview = () => {
//   // Sample data - in real app this would come from API
//   const patientData = {
//     name: "Eleanor Johnson",
//     age: 68,
//     gender: "Female",
//     photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
//     condition: "Type 2 Diabetes, Hypertension",
//     status: "Stable",
//     statusColor: "green",
//     lastVisit: {
//       date: "March 15, 2024",
//       purpose: "Routine Checkup & Blood Work Review",
//       doctor: "Dr. Sarah Mitchell"
//     },
//     assignedDoctor: {
//       name: "Dr. Sarah Mitchell",
//       specialty: "Internal Medicine",
//       phone: "+1 (555) 123-4567",
//       email: "s.mitchell@healthcenter.com",
//       photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
//     },
//     assignedCaregiver: {
//       name: "Maria Rodriguez",
//       role: "Licensed Practical Nurse",
//       phone: "+1 (555) 987-6543",
//       email: "m.rodriguez@careservice.com",
//       photo: "https://images.unsplash.com/photo-1594824388607-359c12c2d6b5?w=100&h=100&fit=crop&crop=face"
//     },
//     vitals: {
//       bloodPressure: "125/80",
//       heartRate: "72 bpm",
//       bloodSugar: "145 mg/dl",
//       temperature: "98.6°F"
//     },
//     nextAppointment: "March 29, 2024 - 10:30 AM"
//   };

//   const StatusBadge = ({ status, color }) => (
//     <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//       color === 'green' ? 'bg-green-100 text-green-800' : 
//       color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
//       'bg-red-100 text-red-800'
//     }`}>
//       <div className={`w-2 h-2 rounded-full mr-2 ${
//         color === 'green' ? 'bg-green-500' : 
//         color === 'yellow' ? 'bg-yellow-500' : 
//         'bg-red-500'
//       }`}></div>
//       {status}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Overview</h2>
//           <p className="text-gray-600">Monitor your loved one's health status and care team</p>
//         </div>

//         {/* Patient Profile Card */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
//           <div className="flex items-start space-x-6">
//             <div className="relative">
//               <img
//                 src={patientData.photo}
//                 alt={patientData.name}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
//                 <CheckCircle2 className="w-4 h-4 text-white" />
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">{patientData.name}</h3>
//                   <p className="text-gray-600">{patientData.age} years old • {patientData.gender}</p>
//                 </div>
//                 <StatusBadge status={patientData.status} color={patientData.statusColor} />
//               </div>
              
//               <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                 <h4 className="font-semibold text-blue-900 mb-1">Medical Conditions</h4>
//                 <p className="text-blue-700">{patientData.condition}</p>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm text-gray-600">Next Appointment: {patientData.nextAppointment}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm text-gray-600">Last Updated: 2 hours ago</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Care Team & Last Visit */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Assigned Doctor */}
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
//             <div className="flex items-center space-x-2 mb-4">
//               <Stethoscope className="w-5 h-5 text-blue-600" />
//               <h4 className="font-semibold text-gray-900">Assigned Doctor</h4>
//             </div>
            
//             <div className="flex items-center space-x-4 mb-4">
//               <img
//                 src={patientData.assignedDoctor.photo}
//                 alt={patientData.assignedDoctor.name}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <h5 className="font-medium text-gray-900">{patientData.assignedDoctor.name}</h5>
//                 <p className="text-sm text-gray-600">{patientData.assignedDoctor.specialty}</p>
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-4 h-4 text-gray-400" />
//                 <span className="text-sm text-gray-600">{patientData.assignedDoctor.phone}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="w-4 h-4 text-gray-400" />
//                 <span className="text-sm text-gray-600">{patientData.assignedDoctor.email}</span>
//               </div>
//             </div>
//           </div>

//           {/* Assigned Caregiver */}
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
//             <div className="flex items-center space-x-2 mb-4">
//               <UserCheck className="w-5 h-5 text-green-600" />
//               <h4 className="font-semibold text-gray-900">Primary Caregiver</h4>
//             </div>
            
//             <div className="flex items-center space-x-4 mb-4">
//               <img
//                 src={patientData.assignedCaregiver.photo}
//                 alt={patientData.assignedCaregiver.name}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <h5 className="font-medium text-gray-900">{patientData.assignedCaregiver.name}</h5>
//                 <p className="text-sm text-gray-600">{patientData.assignedCaregiver.role}</p>
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-4 h-4 text-gray-400" />
//                 <span className="text-sm text-gray-600">{patientData.assignedCaregiver.phone}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="w-4 h-4 text-gray-400" />
//                 <span className="text-sm text-gray-600">{patientData.assignedCaregiver.email}</span>
//               </div>
//             </div>
//           </div>

//           {/* Last Doctor Visit */}
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
//             <div className="flex items-center space-x-2 mb-4">
//               <Calendar className="w-5 h-5 text-purple-600" />
//               <h4 className="font-semibold text-gray-900">Last Visit</h4>
//             </div>
            
//             <div className="space-y-3">
//               <div>
//                 <p className="text-lg font-medium text-gray-900">{patientData.lastVisit.date}</p>
//                 <p className="text-sm text-gray-600">with {patientData.lastVisit.doctor}</p>
//               </div>
              
//               <div className="bg-purple-50 rounded-lg p-3">
//                 <h5 className="font-medium text-purple-900 mb-1">Purpose</h5>
//                 <p className="text-sm text-purple-700">{patientData.lastVisit.purpose}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Vitals Summary */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//           <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//             <Activity className="w-5 h-5 text-red-500 mr-2" />
//             Latest Vitals Summary
//           </h4>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {Object.entries(patientData.vitals).map(([key, value]) => (
//               <div key={key} className="bg-gray-50 rounded-lg p-4 text-center">
//                 <p className="text-sm text-gray-600 capitalize mb-1">
//                   {key.replace(/([A-Z])/g, ' $1').trim()}
//                 </p>
//                 <p className="text-lg font-semibold text-gray-900">{value}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-500">Last updated: Today at 9:30 AM</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FamilyOverview;

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Heart, 
  Activity, 
  AlertCircle, 
  CheckCircle2,
  Stethoscope,
  UserCheck,
  Clock,
  MapPin,
  TrendingUp,
  Shield,
  Loader
} from 'lucide-react';

const FamilyOverview = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      // Fetch patients from database
      const response = await fetch('http://localhost:5000/api/patients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch patient data');

      const result = await response.json();
      const patientsData = result.data || result;

      if (!patientsData || patientsData.length === 0) {
        setError('No patients found in the database');
        setLoading(false);
        return;
      }

      // Get the first patient (you can modify this to select a specific patient)
      const patient = patientsData[0];

      // Fetch appointments for this patient
      const appointmentsResponse = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      let nextAppointment = null;
      let lastVisit = null;
      let assignedDoctorInfo = null;

      if (appointmentsResponse.ok) {
        const appointmentsResult = await appointmentsResponse.json();
        const appointments = appointmentsResult.data || appointmentsResult;

        // Filter appointments for this patient
        const patientAppointments = appointments.filter(apt => {
          const aptPatientId = apt.patient?._id || apt.patient;
          return aptPatientId === patient._id;
        });

        // Get next appointment (future, scheduled)
        const today = new Date();
        const futureAppointments = patientAppointments
          .filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        if (futureAppointments.length > 0) {
          nextAppointment = futureAppointments[0];
        }

        // Get last completed visit
        const completedVisits = patientAppointments
          .filter(apt => apt.status === 'completed')
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (completedVisits.length > 0) {
          lastVisit = completedVisits[0];
        }
      }

      // Get doctor info from localStorage (logged in user if they're a doctor)
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const role = localStorage.getItem('role');
      
      
        assignedDoctorInfo = {
        name: 'Dr. Vanathi J',
        specialty: 'General Physician',
        phone: '+91 98765 43210',
        email: 'vanathi.j@hospital.com',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
      };
      

      // Format the data
      const formattedData = {
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        photo: patient.photo || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
        condition: patient.diagnosis || "No conditions recorded",
        status: formatStatus(patient.status),
        statusColor: getStatusColor(patient.status),
        lastVisit: lastVisit ? {
          date: formatDate(lastVisit.date),
          purpose: lastVisit.reason || "Routine Checkup",
          doctor: assignedDoctorInfo?.name || "Doctor"
        } : {
          date: formatDate(patient.lastVisit) || "No recent visit",
          purpose: "No visit recorded",
          doctor: "N/A"
        },
        assignedDoctor: assignedDoctorInfo,
        assignedCaregiver: {
          name: patient.caregiver || "Not assigned",
          role: "Primary Caregiver",
          phone: "Not available",
          email: "Not available",
          photo: "https://images.unsplash.com/photo-1594824388607-359c12c2d6b5?w=100&h=100&fit=crop&crop=face"
        },
        vitals: {
          bloodPressure: "N/A",
          heartRate: "N/A", 
          bloodSugar: "N/A",
          temperature: "N/A"
        },
        vitalsLastUpdated: "No recent data",
        nextAppointment: nextAppointment ? 
          `${formatDate(nextAppointment.date)} - ${nextAppointment.time}` : 
          patient.nextAppointment ? formatDate(patient.nextAppointment) : "No upcoming appointments"
      };

      setPatientData(formattedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError(err.message || 'Failed to load patient data');
      setLoading(false);
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Stable';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status) => {
    if (!status) return 'green';
    const statusLower = status.toLowerCase();
    if (statusLower === 'stable') {
      return 'green';
    } else if (statusLower === 'monitoring') {
      return 'yellow';
    } else if (statusLower === 'critical') {
      return 'red';
    } else {
      return 'green';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const StatusBadge = ({ status, color }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      color === 'green' ? 'bg-green-100 text-green-800' : 
      color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
      'bg-red-100 text-red-800'
    }`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${
        color === 'green' ? 'bg-green-500' : 
        color === 'yellow' ? 'bg-yellow-500' : 
        'bg-red-500'
      }`}></div>
      {status}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPatientData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Patient Data</h3>
          <p className="text-gray-600">No patients found in the system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Overview</h2>
          <p className="text-gray-600">Monitor your loved one's health status and care team</p>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={patientData.photo}
                alt={patientData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                patientData.statusColor === 'green' ? 'bg-green-500' :
                patientData.statusColor === 'yellow' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{patientData.name}</h3>
                  <p className="text-gray-600">{patientData.age} years old • {patientData.gender}</p>
                </div>
                <StatusBadge status={patientData.status} color={patientData.statusColor} />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-1">Medical Conditions</h4>
                <p className="text-blue-700">{patientData.condition}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Next Appointment: {patientData.nextAppointment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Last Updated: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Care Team & Last Visit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Assigned Doctor */}
          {patientData.assignedDoctor ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Assigned Doctor</h4>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={patientData.assignedDoctor.photo}
                  alt={patientData.assignedDoctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-medium text-gray-900">{patientData.assignedDoctor.name}</h5>
                  <p className="text-sm text-gray-600">{patientData.assignedDoctor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{patientData.assignedDoctor.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{patientData.assignedDoctor.email}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <div className="text-center py-8">
                <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No doctor assigned yet</p>
              </div>
            </div>
          )}

          {/* Assigned Caregiver */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
              <UserCheck className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Primary Caregiver</h4>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={patientData.assignedCaregiver.photo}
                alt={patientData.assignedCaregiver.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-medium text-gray-900">{patientData.assignedCaregiver.name}</h5>
                <p className="text-sm text-gray-600">{patientData.assignedCaregiver.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{patientData.assignedCaregiver.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{patientData.assignedCaregiver.email}</span>
              </div>
            </div>
          </div>

          {/* Last Doctor Visit */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Last Visit</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg font-medium text-gray-900">{patientData.lastVisit.date}</p>
                <p className="text-sm text-gray-600">with {patientData.lastVisit.doctor}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3">
                <h5 className="font-medium text-purple-900 mb-1">Purpose</h5>
                <p className="text-sm text-purple-700">{patientData.lastVisit.purpose}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Vitals Summary */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 text-red-500 mr-2" />
            Latest Vitals Summary
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(patientData.vitals).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-lg font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Last updated: {patientData.vitalsLastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyOverview;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   User, 
//   Phone, 
//   Mail, 
//   Calendar, 
//   Heart, 
//   Activity, 
//   AlertTriangle, 
//   CheckCircle2,
//   Stethoscope,
//   UserCheck,
//   Clock,
//   MapPin,
//   TrendingUp,
//   Shield,
//   Users,
//   AlertCircle,
//   FileText,
//   Award,
//   Hospital,
//   Navigation,
//   ExternalLink,
//   Edit,
//   X
// } from 'lucide-react';

// const DoctorOverview = () => {
//   const navigate = useNavigate();
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileForm, setProfileForm] = useState({
//     specialization: '',
//     license: '',
//     experience: '',
//     hospitalName: '',
//     hospitalAddress: '',
//     hospitalPhone: '',
//     department: '',
//     photo: ''
//   });
  
//   const [doctorData, setDoctorData] = useState({
//     name: "Loading...",
//     email: "",
//     specialization: "",
//     license: "",
//     experience: "",
//     hospital: {
//       name: "Not provided",
//       address: "Not provided",
//       phone: "Not provided",
//       coordinates: { lat: 11.3410, lng: 77.7172 },
//       department: "Not provided"
//     },
//     photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
//     isProfileComplete: false,
//     stats: {
//       totalPatients: 0,
//       criticalCases: 0,
//       appointmentsToday: 0,
//       prescriptionsWritten: 0
//     }
//   });

//   // Check if profile is complete
//   const checkProfileCompletion = (userData) => {
//     return userData.specialization && 
//            userData.license && 
//            userData.experience;
//   };

//   // Load doctor data on mount
//   useEffect(() => {
//     const loadDoctorData = () => {
//       try {
//         const userDataString = localStorage.getItem('user');
//         const role = localStorage.getItem('role');
        
//         if (userDataString && role === 'doctor') {
//           const userData = JSON.parse(userDataString);
          
//           const isComplete = checkProfileCompletion(userData);
          
//           setDoctorData(prev => ({
//             ...prev,
//             name: userData.name || userData.fullName || "Dr. " + (userData.email?.split('@')[0] || "Doctor"),
//             email: userData.email || "",
//             specialization: userData.specialization || "",
//             license: userData.license || "",
//             experience: userData.experience || "",
//             hospital: {
//               name: userData.hospitalName || "Not provided",
//               address: userData.hospitalAddress || "Not provided",
//               phone: userData.hospitalPhone || "Not provided",
//               coordinates: prev.hospital.coordinates,
//               department: userData.department || "Not provided"
//             },
//             photo: userData.photo || prev.photo,
//             isProfileComplete: isComplete
//           }));

//           // Pre-fill form with existing data
//           setProfileForm({
//             specialization: userData.specialization || '',
//             license: userData.license || '',
//             experience: userData.experience || '',
//             hospitalName: userData.hospitalName || '',
//             hospitalAddress: userData.hospitalAddress || '',
//             hospitalPhone: userData.hospitalPhone || '',
//             department: userData.department || '',
//             photo: userData.photo || ''
//           });

//           // Show modal if profile incomplete
//           if (!isComplete) {
//             setShowProfileModal(true);
//           }
//         }
//       } catch (error) {
//         console.error('Error loading doctor data:', error);
//       }
//     };

//     loadDoctorData();
//   }, []);

//   // Handle profile form submission
//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/auth/updateprofile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(profileForm)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         // Update localStorage with new data
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         // Update local state
//         setDoctorData(prev => ({
//           ...prev,
//           specialization: data.user.specialization,
//           license: data.user.license,
//           experience: data.user.experience,
//           hospital: {
//             name: data.user.hospitalName || "Not provided",
//             address: data.user.hospitalAddress || "Not provided",
//             phone: data.user.hospitalPhone || "Not provided",
//             coordinates: prev.hospital.coordinates,
//             department: data.user.department || "Not provided"
//           },
//           photo: data.user.photo || prev.photo,
//           isProfileComplete: true
//         }));
        
//         setShowProfileModal(false);
//         alert('Profile updated successfully!');
//       } else {
//         alert('Failed to update profile: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Error updating profile. Please try again.');
//     }
//   };

//   const recentActivity = [
//     {
//       id: 1,
//       type: 'prescription',
//       title: 'Prescription Updated',
//       description: 'Updated Metformin dosage for Priya Selvam',
//       timestamp: '2024-03-21T14:30:00Z',
//       patient: 'Priya Selvam'
//     },
//     {
//       id: 2,
//       type: 'alert',
//       title: 'Critical Alert Handled',
//       description: 'Responded to high blood pressure alert',
//       timestamp: '2024-03-21T13:15:00Z',
//       patient: 'Murugan Raman'
//     },
//     {
//       id: 3,
//       type: 'appointment',
//       title: 'Appointment Completed',
//       description: 'Routine diabetes checkup completed',
//       timestamp: '2024-03-21T11:00:00Z',
//       patient: 'Lakshmi Devi'
//     },
//     {
//       id: 4,
//       type: 'report',
//       title: 'Lab Report Reviewed',
//       description: 'Reviewed blood work results',
//       timestamp: '2024-03-21T09:30:00Z',
//       patient: 'Karthik Sundar'
//     }
//   ];

//   const notifications = [
//     {
//       id: 1,
//       type: 'emergency',
//       title: 'Critical Patient Alert',
//       message: 'Priya Selvam blood sugar: 180 mg/dL - Immediate attention required',
//       timestamp: '2024-03-21T14:45:00Z',
//       priority: 'high',
//       patient: 'Priya Selvam'
//     },
//     {
//       id: 2,
//       type: 'caregiver',
//       title: 'Caregiver Update',
//       message: 'Anitha Krishnan reported medication compliance issue',
//       timestamp: '2024-03-21T13:30:00Z',
//       priority: 'medium',
//       patient: 'Venkatesh Kumar'
//     },
//     {
//       id: 3,
//       type: 'system',
//       title: 'Lab Results Available',
//       message: 'New blood work results for 3 patients',
//       timestamp: '2024-03-21T12:00:00Z',
//       priority: 'low'
//     }
//   ];

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);
    
//     if (diffInHours < 1) {
//       return `${Math.floor(diffInHours * 60)} minutes ago`;
//     } else if (diffInHours < 24) {
//       return `${Math.floor(diffInHours)} hours ago`;
//     } else {
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     }
//   };

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'prescription': return <FileText className="w-4 h-4 text-blue-600" />;
//       case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
//       case 'appointment': return <Calendar className="w-4 h-4 text-green-600" />;
//       case 'report': return <Activity className="w-4 h-4 text-purple-600" />;
//       default: return <Clock className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const getNotificationColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'border-l-red-500 bg-red-50';
//       case 'medium': return 'border-l-yellow-500 bg-yellow-50';
//       case 'low': return 'border-l-blue-500 bg-blue-50';
//       default: return 'border-l-gray-500 bg-gray-50';
//     }
//   };

//   const openGoogleMaps = () => {
//     const address = doctorData.hospital.address !== "Not provided" 
//       ? encodeURIComponent(doctorData.hospital.address)
//       : 'Erode+Government+Hospital+Erode+Tamil+Nadu+India';
//     const url = `https://maps.google.com/maps?q=${address}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
//       {/* Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
//       </div>

//       {/* Profile Completion Modal */}
//       {showProfileModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-1">Complete Your Profile</h3>
//                   <p className="text-blue-100">Help us provide better service by completing your professional details</p>
//                 </div>
//                 <button 
//                   onClick={() => setShowProfileModal(false)}
//                   className="text-white/80 hover:text-white p-2"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>
            
//             <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Specialization <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileForm.specialization}
//                     onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Internal Medicine"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Medical License <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileForm.license}
//                     onChange={(e) => setProfileForm({...profileForm, license: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., TNMC-2018-7542"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Years of Experience <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileForm.experience}
//                     onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 6 years"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     value={profileForm.department}
//                     onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Department of Internal Medicine"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital/Clinic Name
//                   </label>
//                   <input
//                     type="text"
//                     value={profileForm.hospitalName}
//                     onChange={(e) => setProfileForm({...profileForm, hospitalName: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Erode Government Hospital"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital Address
//                   </label>
//                   <textarea
//                     value={profileForm.hospitalAddress}
//                     onChange={(e) => setProfileForm({...profileForm, hospitalAddress: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Collectorate Complex, Erode - 638001, Tamil Nadu"
//                     rows="2"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital Phone
//                   </label>
//                   <input
//                     type="tel"
//                     value={profileForm.hospitalPhone}
//                     onChange={(e) => setProfileForm({...profileForm, hospitalPhone: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., +91 424 2240108"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Profile Photo URL (optional)
//                   </label>
//                   <input
//                     type="url"
//                     value={profileForm.photo}
//                     onChange={(e) => setProfileForm({...profileForm, photo: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="https://example.com/photo.jpg"
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button 
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
//                 >
//                   Save Profile
//                 </button>
//                 <button 
//                   type="button"
//                   onClick={() => setShowProfileModal(false)}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Skip for Now
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Doctor Overview</h2>
//           <p className="text-gray-600">Welcome back to your medical practice dashboard</p>
//         </div>

//         {/* Profile Incomplete Warning */}
//         {!doctorData.isProfileComplete && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
//                 <div>
//                   <p className="font-medium text-yellow-800">Profile Incomplete</p>
//                   <p className="text-sm text-yellow-700">Complete your professional details to access all features</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowProfileModal(true)}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
//               >
//                 Complete Profile
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Doctor Profile Card */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
//           <div className="flex items-start space-x-6">
//             <div className="relative">
//               <img
//                 src={doctorData.photo}
//                 alt={doctorData.name}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
//                 <Stethoscope className="w-4 h-4 text-white" />
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">{doctorData.name}</h3>
//                   <p className="text-gray-600">
//                     {doctorData.specialization || "Specialization not set"} 
//                     {doctorData.experience && ` • ${doctorData.experience} Experience`}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowProfileModal(true)}
//                   className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
//                 >
//                   <Edit className="w-4 h-4" />
//                   <span>Edit Profile</span>
//                 </button>
//               </div>
              
//               {doctorData.license && (
//                 <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                   <h4 className="font-semibold text-blue-900 mb-1">Medical License</h4>
//                   <p className="text-blue-700">{doctorData.license}</p>
//                 </div>
//               )}
              
//               <div className="flex items-center space-x-6 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <Hospital className="w-4 h-4" />
//                   <span>{doctorData.hospital.name}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4" />
//                   <span>Online • Active</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Patients</p>
//                 <p className="text-2xl font-bold text-gray-900">{doctorData.stats.totalPatients}</p>
//               </div>
//               <Users className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Critical Cases</p>
//                 <p className="text-2xl font-bold text-red-600">{doctorData.stats.criticalCases}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-red-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Today's Appointments</p>
//                 <p className="text-2xl font-bold text-green-600">{doctorData.stats.appointmentsToday}</p>
//               </div>
//               <Calendar className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Prescriptions Written</p>
//                 <p className="text-2xl font-bold text-purple-600">{doctorData.stats.prescriptionsWritten}</p>
//               </div>
//               <FileText className="w-8 h-8 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Recent Activity */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//               <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                 <Activity className="w-5 h-5 text-blue-500 mr-2" />
//                 Recent Activity
//               </h4>
              
//               <div className="space-y-4">
//                 {recentActivity.map((activity) => (
//                   <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
//                     {getActivityIcon(activity.type)}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900">{activity.title}</p>
//                       <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-xs text-gray-500">{activity.patient}</p>
//                         <p className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Hospital Location Map */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-semibold text-gray-900 flex items-center">
//                   <MapPin className="w-5 h-5 text-blue-500 mr-2" />
//                   Hospital Location
//                 </h4>
//                 {doctorData.hospital.address !== "Not provided" && (
//                   <button 
//                     onClick={openGoogleMaps}
//                     className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
//                   >
//                     <Navigation className="w-4 h-4" />
//                     <span>Get Directions</span>
//                     <ExternalLink className="w-3 h-3" />
//                   </button>
//                 )}
//               </div>
              
//               {/* Map Container */}
//               <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg overflow-hidden border-2 border-blue-200">
//                 <div className="absolute inset-0 bg-blue-50 opacity-50">
//                   <div className="absolute inset-0" style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ddd6fe' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3Cpath d='m40 40v-40h-40z' fill='%23c7d2fe'/%3E%3C/g%3E%3C/svg%3E")`,
//                     backgroundSize: '40px 40px'
//                   }}></div>
//                 </div>
                
//                 {/* Hospital Marker */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
//                       <Hospital className="w-6 h-6 text-white" />
//                     </div>
//                     {/* Info Popup */}
//                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-white rounded-lg shadow-xl p-4 border">
//                       <div className="text-center">
//                         <h5 className="font-semibold text-gray-900 mb-1">{doctorData.hospital.name}</h5>
//                         <p className="text-sm text-gray-600 mb-2">{doctorData.hospital.department}</p>
//                         <div className="text-xs text-gray-500 space-y-1">
//                           <div className="flex items-center justify-center space-x-1">
//                             <MapPin className="w-3 h-3" />
//                             <span>{doctorData.hospital.address}</span>
//                           </div>
//                           {doctorData.hospital.phone !== "Not provided" && (
//                             <div className="flex items-center justify-center space-x-1">
//                               <Phone className="w-3 h-3" />
//                               <span>{doctorData.hospital.phone}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2">
//                         <div className="border-8 border-transparent border-t-white"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-4 text-center text-sm text-gray-600">
//                 <p>Click "Get Directions" to open in Google Maps</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Notifications Panel */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//           <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//             <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
//             Priority Notifications
//           </h4>
          
//           <div className="space-y-3">
//             {notifications.map((notification) => (
//               <div 
//                 key={notification.id} 
//                 className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${getNotificationColor(notification.priority)}`}
//                 onClick={() => setSelectedNotification(notification)}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <h5 className="font-medium text-gray-900">{notification.title}</h5>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         notification.priority === 'high' ? 'bg-red-100 text-red-800' :
//                         notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-blue-100 text-blue-800'
//                       }`}>
//                         {notification.priority.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
//                     <div className="flex items-center justify-between text-xs text-gray-500">
//                       <span>{notification.patient || 'System'}</span>
//                       <span>{formatTimestamp(notification.timestamp)}</span>
//                     </div>
//                   </div>
                  
//                   <div className="ml-4">
//                     {notification.type === 'emergency' ? (
//                       <AlertTriangle className="w-5 h-5 text-red-500" />
//                     ) : notification.type === 'caregiver' ? (
//                       <UserCheck className="w-5 h-5 text-blue-500" />
//                     ) : (
//                       <CheckCircle2 className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-4 text-center">
//             <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//               View All Notifications
//             </button>
//           </div>
//         </div>

//         {/* Notification Detail Modal */}
//         {selectedNotification && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
//               <div className={`p-6 border-b border-gray-200 ${
//                 selectedNotification.priority === 'high' ? 'bg-red-50' :
//                 selectedNotification.priority === 'medium' ? 'bg-yellow-50' :
//                 'bg-blue-50'
//               }`}>
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedNotification.title}</h3>
//                     <p className="text-sm text-gray-600">{formatTimestamp(selectedNotification.timestamp)}</p>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedNotification(null)}
//                     className="text-gray-500 hover:text-gray-700 p-1"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <p className="text-gray-700 mb-4">{selectedNotification.message}</p>
                
//                 {selectedNotification.patient && (
//                   <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                     <p className="text-sm text-gray-600">Patient: <span className="font-medium text-gray-900">{selectedNotification.patient}</span></p>
//                   </div>
//                 )}
                
//                 <div className="flex space-x-3">
//                   {selectedNotification.priority === 'high' && (
//                     <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
//                       Take Immediate Action
//                     </button>
//                   )}
//                   <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
//                     View Patient Details
//                   </button>
//                   <button 
//                     onClick={() => setSelectedNotification(null)}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorOverview;


