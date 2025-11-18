// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Users,
//   Search,
//   Filter,
//   Plus,
//   X,
//   Edit,
//   Calendar,
//   FileText,
//   MessageSquare,
//   Activity,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Phone,
//   Mail,
//   MapPin,
//   User,
//   Heart,
//   Pill,
//   Clock,
//   TrendingUp,
//   Download,
//   Eye,
//   Stethoscope,
//   UserCheck
// } from 'lucide-react';

// const DoctorPatients = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedCard, setExpandedCard] = useState(null);

//   // New patient form state
//   const [newPatient, setNewPatient] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     phone: '',
//     email: '',
//     address: '',
//     emergencyContact: '',
//     emergencyPhone: '',
//     bloodType: '',
//     allergies: '',
//     diagnosis: '',
//     caregiver: '',
//     notes: ''
//   });

//   // Sample patient data - replace with API call
//   const [patients, setPatients] = useState([
//     {
//       id: 1,
//       name: 'Priya Selvam',
//       age: 68,
//       gender: 'Female',
//       patientId: 'PT-2024-001',
//       photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
//       diagnosis: 'Type 2 Diabetes',
//       status: 'critical',
//       lastVisit: '2024-03-20',
//       caregiver: 'Anitha Krishnan',
//       phone: '+91 98765 43210',
//       email: 'priya.selvam@email.com',
//       address: 'Salem, Tamil Nadu',
//       bloodType: 'O+',
//       allergies: 'Penicillin',
//       medications: ['Metformin 500mg', 'Insulin Glargine'],
//       emergencyContact: 'Rajesh Selvam',
//       emergencyPhone: '+91 98765 43211',
//       nextAppointment: '2024-03-25'
//     },
//     {
//       id: 2,
//       name: 'Murugan Raman',
//       age: 72,
//       gender: 'Male',
//       patientId: 'PT-2024-002',
//       photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
//       diagnosis: 'Hypertension',
//       status: 'stable',
//       lastVisit: '2024-03-18',
//       caregiver: 'Lakshmi Murugan',
//       phone: '+91 98765 43212',
//       email: 'murugan.r@email.com',
//       address: 'Erode, Tamil Nadu',
//       bloodType: 'A+',
//       allergies: 'None',
//       medications: ['Amlodipine 5mg', 'Atenolol 50mg'],
//       emergencyContact: 'Lakshmi Murugan',
//       emergencyPhone: '+91 98765 43213',
//       nextAppointment: '2024-04-01'
//     },
//     {
//       id: 3,
//       name: 'Lakshmi Devi',
//       age: 65,
//       gender: 'Female',
//       patientId: 'PT-2024-003',
//       photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
//       diagnosis: 'Osteoarthritis',
//       status: 'monitoring',
//       lastVisit: '2024-03-15',
//       caregiver: 'Karthik Sundar',
//       phone: '+91 98765 43214',
//       email: 'lakshmi.devi@email.com',
//       address: 'Coimbatore, Tamil Nadu',
//       bloodType: 'B+',
//       allergies: 'Sulfa drugs',
//       medications: ['Diclofenac 50mg', 'Calcium supplements'],
//       emergencyContact: 'Karthik Sundar',
//       emergencyPhone: '+91 98765 43215',
//       nextAppointment: '2024-03-28'
//     },
//     {
//       id: 4,
//       name: 'Venkatesh Kumar',
//       age: 70,
//       gender: 'Male',
//       patientId: 'PT-2024-004',
//       photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
//       diagnosis: 'COPD',
//       status: 'monitoring',
//       lastVisit: '2024-03-19',
//       caregiver: 'Meena Venkatesh',
//       phone: '+91 98765 43216',
//       email: 'venkatesh.k@email.com',
//       address: 'Madurai, Tamil Nadu',
//       bloodType: 'AB+',
//       allergies: 'Aspirin',
//       medications: ['Salbutamol inhaler', 'Budesonide'],
//       emergencyContact: 'Meena Venkatesh',
//       emergencyPhone: '+91 98765 43217',
//       nextAppointment: '2024-03-27'
//     },
//     {
//       id: 5,
//       name: 'Anitha Balan',
//       age: 66,
//       gender: 'Female',
//       patientId: 'PT-2024-005',
//       photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
//       diagnosis: 'Heart Disease',
//       status: 'critical',
//       lastVisit: '2024-03-21',
//       caregiver: 'Suresh Balan',
//       phone: '+91 98765 43218',
//       email: 'anitha.balan@email.com',
//       address: 'Trichy, Tamil Nadu',
//       bloodType: 'O-',
//       allergies: 'None',
//       medications: ['Atorvastatin 20mg', 'Aspirin 75mg', 'Metoprolol'],
//       emergencyContact: 'Suresh Balan',
//       emergencyPhone: '+91 98765 43219',
//       nextAppointment: '2024-03-24'
//     },
//     {
//       id: 6,
//       name: 'Raghavan Iyer',
//       age: 69,
//       gender: 'Male',
//       patientId: 'PT-2024-006',
//       photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
//       diagnosis: 'Diabetes & Hypertension',
//       status: 'stable',
//       lastVisit: '2024-03-17',
//       caregiver: 'Prema Raghavan',
//       phone: '+91 98765 43220',
//       email: 'raghavan.iyer@email.com',
//       address: 'Chennai, Tamil Nadu',
//       bloodType: 'A-',
//       allergies: 'Iodine',
//       medications: ['Metformin 850mg', 'Lisinopril 10mg'],
//       emergencyContact: 'Prema Raghavan',
//       emergencyPhone: '+91 98765 43221',
//       nextAppointment: '2024-03-30'
//     }
//   ]);

//   // Stats calculation
//   const stats = {
//     total: patients.length,
//     critical: patients.filter(p => p.status === 'critical').length,
//     appointmentsToday: 2,
//     newThisWeek: 1
//   };

//   // Filter patients
//   const filteredPatients = patients.filter(patient => {
//     const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Status badge colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'critical': return 'bg-red-100 text-red-800 border-red-300';
//       case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case 'stable': return 'bg-green-100 text-green-800 border-green-300';
//       case 'discharged': return 'bg-gray-100 text-gray-800 border-gray-300';
//       default: return 'bg-blue-100 text-blue-800 border-blue-300';
//     }
//   };

//   const handleAddPatient = async (e) => {
//     e.preventDefault();
    
//     // In production, make API call to backend
//     const newPatientData = {
//       id: patients.length + 1,
//       name: `${newPatient.firstName} ${newPatient.lastName}`,
//       age: new Date().getFullYear() - new Date(newPatient.dateOfBirth).getFullYear(),
//       gender: newPatient.gender,
//       patientId: `PT-2024-${String(patients.length + 1).padStart(3, '0')}`,
//       photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop',
//       diagnosis: newPatient.diagnosis,
//       status: 'stable',
//       lastVisit: new Date().toISOString().split('T')[0],
//       caregiver: newPatient.caregiver,
//       phone: newPatient.phone,
//       email: newPatient.email,
//       address: newPatient.address,
//       bloodType: newPatient.bloodType,
//       allergies: newPatient.allergies,
//       medications: [],
//       emergencyContact: newPatient.emergencyContact,
//       emergencyPhone: newPatient.emergencyPhone,
//       nextAppointment: ''
//     };

//     setPatients([...patients, newPatientData]);
//     setShowAddPatient(false);
    
//     // Reset form
//     setNewPatient({
//       firstName: '',
//       lastName: '',
//       dateOfBirth: '',
//       gender: '',
//       phone: '',
//       email: '',
//       address: '',
//       emergencyContact: '',
//       emergencyPhone: '',
//       bloodType: '',
//       allergies: '',
//       diagnosis: '',
//       caregiver: '',
//       notes: ''
//     });

//     alert('Patient added successfully!');
//   };

//   const handleViewVitals = (patient) => {
//     // Navigate to vitals page with patient pre-selected
//     navigate('/doctor/vitals', { state: { patientId: patient.id, patientName: patient.name } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
//       {/* Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h2>
//           <p className="text-gray-600">Manage and monitor all your patients</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Patients</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//               </div>
//               <Users className="w-10 h-10 text-blue-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Critical Cases</p>
//                 <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
//               </div>
//               <AlertCircle className="w-10 h-10 text-red-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Appointments Today</p>
//                 <p className="text-3xl font-bold text-green-600">{stats.appointmentsToday}</p>
//               </div>
//               <Calendar className="w-10 h-10 text-green-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">New This Week</p>
//                 <p className="text-3xl font-bold text-purple-600">{stats.newThisWeek}</p>
//               </div>
//               <TrendingUp className="w-10 h-10 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, ID, or diagnosis..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Status Filter */}
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="all">All Status</option>
//               <option value="critical">Critical</option>
//               <option value="monitoring">Monitoring</option>
//               <option value="stable">Stable</option>
//               <option value="discharged">Discharged</option>
//             </select>

//             {/* View Mode Toggle */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`px-4 py-3 rounded-lg transition-colors ${
//                   viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-4 py-3 rounded-lg transition-colors ${
//                   viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 List
//               </button>
//             </div>

//             {/* Add Patient Button */}
//             <button
//               onClick={() => setShowAddPatient(true)}
//               className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add Patient</span>
//             </button>
//           </div>
//         </div>

//         {/* Patient List */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPatients.map((patient) => (
//               <div
//                 key={patient.id}
//                 className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all overflow-hidden"
//               >
//                 {/* Patient Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-start space-x-4">
//                     <img
//                       src={patient.photo}
//                       alt={patient.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
//                     />
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
//                       <p className="text-sm text-gray-600">{patient.patientId}</p>
//                       <div className="flex items-center space-x-2 mt-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
//                           {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Patient Info */}
//                 <div className="p-6 space-y-3">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <User className="w-4 h-4 mr-2" />
//                     <span>{patient.age} years • {patient.gender}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Heart className="w-4 h-4 mr-2" />
//                     <span>{patient.diagnosis}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <UserCheck className="w-4 h-4 mr-2" />
//                     <span>Caregiver: {patient.caregiver}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
//                   <button
//                     onClick={() => setSelectedPatient(patient)}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>View</span>
//                   </button>
//                   <button
//                     onClick={() => handleViewVitals(patient)}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
//                   >
//                     <Activity className="w-4 h-4" />
//                     <span>Vitals</span>
//                   </button>
//                   <button
//                     className="flex items-center justify-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//                   >
//                     <MessageSquare className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Diagnosis</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Caregiver</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Visit</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredPatients.map((patient) => (
//                   <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={patient.photo}
//                           alt={patient.name}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-900">{patient.name}</p>
//                           <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.patientId}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.diagnosis}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
//                         {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.caregiver}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {new Date(patient.lastVisit).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => setSelectedPatient(patient)}
//                           className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleViewVitals(patient)}
//                           className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
//                           title="View Vitals"
//                         >
//                           <Activity className="w-4 h-4" />
//                         </button>
//                         <button
//                           className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
//                           title="Send Message"
//                         >
//                           <MessageSquare className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* No Results */}
//         {filteredPatients.length === 0 && (
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-white/20">
//             <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
//             <p className="text-gray-600">Try adjusting your search or filters</p>
//           </div>
//         )}
//       </div>

//       {/* Add Patient Modal */}
//       {showAddPatient && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto pt-20">
//           <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl my-8">
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-1">Add New Patient</h3>
//                   <p className="text-blue-100">Register a new patient in the system</p>
//                 </div>
//                 <button
//                   onClick={() => setShowAddPatient(false)}
//                   className="text-white/80 hover:text-white p-2"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleAddPatient} className="p-6 space-y-6">
//               {/* Personal Information */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={newPatient.phone}
//                       onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+91 98765 43210"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       value={newPatient.email}
//                       onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="patient@email.com"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <textarea
//                       value={newPatient.address}
//                       onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter full address"
//                       rows="2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Medical Information */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Blood Type
//                     </label>
//                     <select
//                       value={newPatient.bloodType}
//                       onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select blood type</option>
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Primary Diagnosis <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.diagnosis}
//                       onChange={(e) => setNewPatient({...newPatient, diagnosis: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., Type 2 Diabetes"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Known Allergies
//                     </label>
//                     <input
//                       type="text"
//                       value={newPatient.allergies}
//                       onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., Penicillin, Sulfa drugs (or 'None')"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.emergencyContact}
//                       onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter emergency contact name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={newPatient.emergencyPhone}
//                       onChange={(e) => setNewPatient({...newPatient, emergencyPhone: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+91 98765 43210"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Caregiver Assignment */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Care Assignment</h4>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Assign Caregiver <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.caregiver}
//                       onChange={(e) => setNewPatient({...newPatient, caregiver: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter caregiver name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Initial Notes
//                     </label>
//                     <textarea
//                       value={newPatient.notes}
//                       onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Add any initial observations or notes..."
//                       rows="3"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex space-x-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
//                 >
//                   Add Patient
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddPatient(false)}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Patient Detail Modal */}
//       {selectedPatient && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0 rounded-t-2xl">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={selectedPatient.photo}
//                     alt={selectedPatient.name}
//                     className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                   <div>
//                     <h3 className="text-2xl font-bold mb-1">{selectedPatient.name}</h3>
//                     <p className="text-blue-100">{selectedPatient.patientId} • {selectedPatient.age} years • {selectedPatient.gender}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSelectedPatient(null)}
//                   className="text-white/80 hover:text-white p-2"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Tabs */}
//               <div className="flex space-x-4 mt-6">
//                 {['overview', 'medical', 'appointments', 'notes'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                       activeTab === tab
//                         ? 'bg-white text-blue-600'
//                         : 'text-white/80 hover:text-white hover:bg-white/10'
//                     }`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-6 max-h-[600px] overflow-y-auto">
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   {/* Status Card */}
//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="text-lg font-semibold text-gray-900">Patient Status</h4>
//                       <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
//                         {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
//                       </span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
//                         <p className="font-medium text-gray-900">{selectedPatient.diagnosis}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Blood Type</p>
//                         <p className="font-medium text-gray-900">{selectedPatient.bloodType}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Last Visit</p>
//                         <p className="font-medium text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Next Appointment</p>
//                         <p className="font-medium text-gray-900">
//                           {selectedPatient.nextAppointment 
//                             ? new Date(selectedPatient.nextAppointment).toLocaleDateString()
//                             : 'Not scheduled'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-white border border-gray-200 rounded-xl p-6">
//                       <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                         <User className="w-5 h-5 text-blue-500 mr-2" />
//                         Contact Information
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex items-center text-sm">
//                           <Phone className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.phone}</span>
//                         </div>
//                         <div className="flex items-center text-sm">
//                           <Mail className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.email}</span>
//                         </div>
//                         <div className="flex items-center text-sm">
//                           <MapPin className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.address}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white border border-gray-200 rounded-xl p-6">
//                       <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                         <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
//                         Emergency Contact
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Name</p>
//                           <p className="font-medium text-gray-900">{selectedPatient.emergencyContact}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Phone</p>
//                           <p className="font-medium text-gray-900">{selectedPatient.emergencyPhone}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Assigned Caregiver */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                       <UserCheck className="w-5 h-5 text-green-500 mr-2" />
//                       Assigned Caregiver
//                     </h4>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-medium text-gray-900 text-lg">{selectedPatient.caregiver}</p>
//                         <p className="text-sm text-gray-600">Primary caregiver assigned to this patient</p>
//                       </div>
//                       <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
//                         <MessageSquare className="w-4 h-4" />
//                         <span>Send Message</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'medical' && (
//                 <div className="space-y-6">
//                   {/* Allergies */}
//                   <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-red-900 mb-3 flex items-center">
//                       <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
//                       Allergies
//                     </h4>
//                     <p className="text-red-800">{selectedPatient.allergies}</p>
//                   </div>

//                   {/* Current Medications */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="font-semibold text-gray-900 flex items-center">
//                         <Pill className="w-5 h-5 text-blue-500 mr-2" />
//                         Current Medications
//                       </h4>
//                       <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
//                         <Plus className="w-4 h-4" />
//                         <span>Add Prescription</span>
//                       </button>
//                     </div>
//                     <div className="space-y-3">
//                       {selectedPatient.medications.map((med, index) => (
//                         <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                               <Pill className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900">{med}</p>
//                               <p className="text-sm text-gray-600">Daily dose</p>
//                             </div>
//                           </div>
//                           <button className="p-2 text-gray-400 hover:text-gray-600">
//                             <Edit className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Medical History Summary */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                       <FileText className="w-5 h-5 text-purple-500 mr-2" />
//                       Medical History
//                     </h4>
//                     <div className="space-y-3 text-sm text-gray-600">
//                       <p>• Primary diagnosis: {selectedPatient.diagnosis}</p>
//                       <p>• Blood type: {selectedPatient.bloodType}</p>
//                       <p>• Known allergies: {selectedPatient.allergies}</p>
//                       <p>• Currently under treatment since {new Date(selectedPatient.lastVisit).getFullYear()}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'appointments' && (
//                 <div className="space-y-6">
//                   {/* Upcoming Appointment */}
//                   <div className="bg-green-50 border border-green-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-green-900 mb-4 flex items-center">
//                       <Calendar className="w-5 h-5 text-green-600 mr-2" />
//                       Next Appointment
//                     </h4>
//                     {selectedPatient.nextAppointment ? (
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-lg font-medium text-green-900">
//                             {new Date(selectedPatient.nextAppointment).toLocaleDateString('en-US', {
//                               weekday: 'long',
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </p>
//                           <p className="text-sm text-green-700">10:00 AM - Routine checkup</p>
//                         </div>
//                         <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//                           Reschedule
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-green-800">No appointment scheduled</p>
//                     )}
//                   </div>

//                   {/* Schedule New Appointment */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Schedule New Appointment</h4>
//                     <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                       <Plus className="w-5 h-5" />
//                       <span>Book Appointment</span>
//                     </button>
//                   </div>

//                   {/* Past Appointments */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Past Appointments</h4>
//                     <div className="space-y-3">
//                       <div className="p-4 bg-gray-50 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">
//                               {new Date(selectedPatient.lastVisit).toLocaleDateString()}
//                             </p>
//                             <p className="text-sm text-gray-600">Routine checkup - Completed</p>
//                           </div>
//                           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                             View Notes
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'notes' && (
//                 <div className="space-y-6">
//                   {/* Add New Note */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Add Clinical Note</h4>
//                     <textarea
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
//                       rows="4"
//                       placeholder="Enter your clinical observations and notes..."
//                     />
//                     <button className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                       <Plus className="w-4 h-4" />
//                       <span>Save Note</span>
//                     </button>
//                   </div>

//                   {/* Previous Notes */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Clinical Notes History</h4>
//                     <div className="space-y-4">
//                       <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
//                         <div className="flex items-start justify-between mb-2">
//                           <p className="text-sm font-medium text-gray-900">
//                             {new Date(selectedPatient.lastVisit).toLocaleDateString()}
//                           </p>
//                           <span className="text-xs text-gray-500">Dr. {JSON.parse(localStorage.getItem('user') || '{}').name || 'Doctor'}</span>
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           Patient showing good progress with current treatment plan. Blood sugar levels stable. 
//                           Continue current medication dosage. Schedule follow-up in 2 weeks.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Actions */}
//             <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => handleViewVitals(selectedPatient)}
//                   className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
//                 >
//                   <Activity className="w-5 h-5" />
//                   <span>View Vitals</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
//                   <FileText className="w-5 h-5" />
//                   <span>Write Prescription</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
//                   <MessageSquare className="w-5 h-5" />
//                   <span>Message Caregiver</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
//                   <Download className="w-5 h-5" />
//                   <span>Export Data</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorPatients;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Users,
//   Search,
//   Filter,
//   Plus,
//   X,
//   Edit,
//   Calendar,
//   FileText,
//   MessageSquare,
//   Activity,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Phone,
//   Mail,
//   MapPin,
//   User,
//   Heart,
//   Pill,
//   Clock,
//   TrendingUp,
//   Download,
//   Eye,
//   Stethoscope,
//   UserCheck
// } from 'lucide-react';

// const DoctorPatients = () => {
//   const navigate = useNavigate();

//   const API_URL = 'http://localhost:5000/api';
//   const getAuthHeaders = () => ({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   });


//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // New patient form state
//   const [newPatient, setNewPatient] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     phone: '',
//     email: '',
//     address: '',
//     emergencyContact: '',
//     emergencyPhone: '',
//     bloodType: '',
//     allergies: '',
//     diagnosis: '',
//     caregiver: '',
//     notes: ''
//   });

//   const [patients, setPatients] = useState([]);

//   // Fetch patients from backend on component mount
//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//   try {
//     setLoading(true);
//     const response = await fetch(`${API_URL}/patients`, {
//       headers: getAuthHeaders()
//     });
    
//     if (response.status === 401) {
//       setError('Unauthorized. Please login again.');
//       return;
//     }
    
//     if (!response.ok) throw new Error('Failed to fetch patients');
    
//     const result = await response.json();
//     // Extract the data array from the response
//     setPatients(result.data || result); // Handle both formats
//   } catch (err) {
//     setError(err.message);
//     console.error('Error fetching patients:', err);
//   } finally {
//     setLoading(false);
//   }
// };

//   // Stats calculation
//   const stats = {
//     total: patients.length,
//     critical: patients.filter(p => p.status === 'critical').length,
//     appointmentsToday: patients.filter(p => {
//       if (!p.nextAppointment) return false;
//       const today = new Date().toDateString();
//       const appointmentDate = new Date(p.nextAppointment).toDateString();
//       return today === appointmentDate;
//     }).length,
//     newThisWeek: patients.filter(p => {
//       const weekAgo = new Date();
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       return new Date(p.createdAt) > weekAgo;
//     }).length
//   };

//   // Filter patients
//   const filteredPatients = patients.filter(patient => {
//     const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          patient.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          patient.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Status badge colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'critical': return 'bg-red-100 text-red-800 border-red-300';
//       case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case 'stable': return 'bg-green-100 text-green-800 border-green-300';
//       case 'discharged': return 'bg-gray-100 text-gray-800 border-gray-300';
//       default: return 'bg-blue-100 text-blue-800 border-blue-300';
//     }
//   };

//   const handleAddPatient = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Calculate age from date of birth
//       const age = newPatient.dateOfBirth 
//         ? new Date().getFullYear() - new Date(newPatient.dateOfBirth).getFullYear()
//         : 0;
      
//       // Prepare patient data for API
//       const patientData = {
//         firstName: newPatient.firstName,
//         lastName: newPatient.lastName,
//         name: `${newPatient.firstName} ${newPatient.lastName}`,
//         dateOfBirth: newPatient.dateOfBirth,
//         age: age,
//         gender: newPatient.gender,
//         phone: newPatient.phone,
//         email: newPatient.email,
//         address: newPatient.address,
//         bloodType: newPatient.bloodType,
//         allergies: newPatient.allergies || 'None',
//         diagnosis: newPatient.diagnosis,
//         caregiver: newPatient.caregiver,
//         emergencyContact: newPatient.emergencyContact,
//         emergencyPhone: newPatient.emergencyPhone,
//         notes: newPatient.notes,
//         status: 'stable',
//         photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop'
//       };

//       // Make API call to backend
//       const response = await fetch('http://localhost:5000/api/patients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(patientData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to add patient');
//       }

//       const result = await response.json();
//       const savedPatient = result.data || result;
      
//       // Add the new patient to the local state
//       setPatients([...patients, savedPatient]);
//       setShowAddPatient(false);
      
//       // Reset form
//       setNewPatient({
//         firstName: '',
//         lastName: '',
//         dateOfBirth: '',
//         gender: '',
//         phone: '',
//         email: '',
//         address: '',
//         emergencyContact: '',
//         emergencyPhone: '',
//         bloodType: '',
//         allergies: '',
//         diagnosis: '',
//         caregiver: '',
//         notes: ''
//       });

//       alert('Patient added successfully!');
      
//       // Optionally refresh the patient list from backend
//       fetchPatients();
      
//     } catch (error) {
//       console.error('Error adding patient:', error);
//       alert(`Failed to add patient: ${error.message}`);
//     }
//   };

//   const handleViewVitals = (patient) => {
//     navigate('/doctor/vitals', { state: { patientId: patient._id || patient.id, patientName: patient.name } });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading patients...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
//       {/* Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h2>
//           <p className="text-gray-600">Manage and monitor all your patients</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <p className="text-red-800">Error: {error}</p>
//             <button 
//               onClick={fetchPatients}
//               className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Patients</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//               </div>
//               <Users className="w-10 h-10 text-blue-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Critical Cases</p>
//                 <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
//               </div>
//               <AlertCircle className="w-10 h-10 text-red-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Appointments Today</p>
//                 <p className="text-3xl font-bold text-green-600">{stats.appointmentsToday}</p>
//               </div>
//               <Calendar className="w-10 h-10 text-green-500" />
//             </div>
//           </div>

//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">New This Week</p>
//                 <p className="text-3xl font-bold text-purple-600">{stats.newThisWeek}</p>
//               </div>
//               <TrendingUp className="w-10 h-10 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, ID, or diagnosis..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Status Filter */}
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="all">All Status</option>
//               <option value="critical">Critical</option>
//               <option value="monitoring">Monitoring</option>
//               <option value="stable">Stable</option>
//               <option value="discharged">Discharged</option>
//             </select>

//             {/* View Mode Toggle */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`px-4 py-3 rounded-lg transition-colors ${
//                   viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-4 py-3 rounded-lg transition-colors ${
//                   viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 List
//               </button>
//             </div>

//             {/* Add Patient Button */}
//             <button
//               onClick={() => setShowAddPatient(true)}
//               className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add Patient</span>
//             </button>
//           </div>
//         </div>

//         {/* Patient List */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPatients.map((patient) => (
//               <div
//                 key={patient._id || patient.id}
//                 className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all overflow-hidden"
//               >
//                 {/* Patient Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-start space-x-4">
//                     <img
//                       src={patient.photo}
//                       alt={patient.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
//                     />
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
//                       <p className="text-sm text-gray-600">{patient.patientId}</p>
//                       <div className="flex items-center space-x-2 mt-2">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
//                           {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Patient Info */}
//                 <div className="p-6 space-y-3">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <User className="w-4 h-4 mr-2" />
//                     <span>{patient.age} years • {patient.gender}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Heart className="w-4 h-4 mr-2" />
//                     <span>{patient.diagnosis}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <UserCheck className="w-4 h-4 mr-2" />
//                     <span>Caregiver: {patient.caregiver}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
//                   <button
//                     onClick={() => setSelectedPatient(patient)}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>View</span>
//                   </button>
//                   <button
//                     onClick={() => handleViewVitals(patient)}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
//                   >
//                     <Activity className="w-4 h-4" />
//                     <span>Vitals</span>
//                   </button>
//                   <button
//                     className="flex items-center justify-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//                   >
//                     <MessageSquare className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Diagnosis</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Caregiver</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Visit</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredPatients.map((patient) => (
//                   <tr key={patient._id || patient.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={patient.photo}
//                           alt={patient.name}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-900">{patient.name}</p>
//                           <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.patientId}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.diagnosis}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
//                         {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{patient.caregiver}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {new Date(patient.lastVisit).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => setSelectedPatient(patient)}
//                           className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleViewVitals(patient)}
//                           className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
//                           title="View Vitals"
//                         >
//                           <Activity className="w-4 h-4" />
//                         </button>
//                         <button
//                           className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
//                           title="Send Message"
//                         >
//                           <MessageSquare className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* No Results */}
//         {filteredPatients.length === 0 && !loading && (
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-white/20">
//             <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
//             <p className="text-gray-600">
//               {searchTerm || statusFilter !== 'all' 
//                 ? 'Try adjusting your search or filters' 
//                 : 'Click "Add Patient" to register your first patient'}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Add Patient Modal - keeping your existing modal code with the form */}
//       {showAddPatient && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto pt-20">
//           <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl my-8">
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-2xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-1">Add New Patient</h3>
//                   <p className="text-blue-100">Register a new patient in the system</p>
//                 </div>
//                 <button
//                   onClick={() => setShowAddPatient(false)}
//                   className="text-white/80 hover:text-white p-2"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleAddPatient} className="p-6 space-y-6">
//               {/* Personal Information */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.firstName}
//                       onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter first name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.lastName}
//                       onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter last name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Date of Birth <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       required
//                       value={newPatient.dateOfBirth}
//                       onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       required
//                       value={newPatient.gender}
//                       onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={newPatient.phone}
//                       onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+91 98765 43210"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       value={newPatient.email}
//                       onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="patient@email.com"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <textarea
//                       value={newPatient.address}
//                       onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter full address"
//                       rows="2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Medical Information */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Blood Type
//                     </label>
//                     <select
//                       value={newPatient.bloodType}
//                       onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select blood type</option>
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Primary Diagnosis <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.diagnosis}
//                       onChange={(e) => setNewPatient({...newPatient, diagnosis: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., Type 2 Diabetes"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Known Allergies
//                     </label>
//                     <input
//                       type="text"
//                       value={newPatient.allergies}
//                       onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., Penicillin, Sulfa drugs (or 'None')"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.emergencyContact}
//                       onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter emergency contact name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={newPatient.emergencyPhone}
//                       onChange={(e) => setNewPatient({...newPatient, emergencyPhone: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="+91 98765 43210"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Caregiver Assignment */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Care Assignment</h4>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Assign Caregiver <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={newPatient.caregiver}
//                       onChange={(e) => setNewPatient({...newPatient, caregiver: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter caregiver name"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Initial Notes
//                     </label>
//                     <textarea
//                       value={newPatient.notes}
//                       onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Add any initial observations or notes..."
//                       rows="3"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex space-x-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
//                 >
//                   Add Patient
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddPatient(false)}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Patient Detail Modal - keeping your existing modal */}
//       {selectedPatient && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0 rounded-t-2xl">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={selectedPatient.photo}
//                     alt={selectedPatient.name}
//                     className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                   <div>
//                     <h3 className="text-2xl font-bold mb-1">{selectedPatient.name}</h3>
//                     <p className="text-blue-100">{selectedPatient.patientId} • {selectedPatient.age} years • {selectedPatient.gender}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSelectedPatient(null)}
//                   className="text-white/80 hover:text-white p-2"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Tabs */}
//               <div className="flex space-x-4 mt-6">
//                 {['overview', 'medical', 'appointments', 'notes'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                       activeTab === tab
//                         ? 'bg-white text-blue-600'
//                         : 'text-white/80 hover:text-white hover:bg-white/10'
//                     }`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-6 max-h-[600px] overflow-y-auto">
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   {/* Status Card */}
//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="text-lg font-semibold text-gray-900">Patient Status</h4>
//                       <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
//                         {selectedPatient.status?.charAt(0).toUpperCase() + selectedPatient.status?.slice(1)}
//                       </span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
//                         <p className="font-medium text-gray-900">{selectedPatient.diagnosis}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Blood Type</p>
//                         <p className="font-medium text-gray-900">{selectedPatient.bloodType || 'Not specified'}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Last Visit</p>
//                         <p className="font-medium text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Next Appointment</p>
//                         <p className="font-medium text-gray-900">
//                           {selectedPatient.nextAppointment 
//                             ? new Date(selectedPatient.nextAppointment).toLocaleDateString()
//                             : 'Not scheduled'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-white border border-gray-200 rounded-xl p-6">
//                       <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                         <User className="w-5 h-5 text-blue-500 mr-2" />
//                         Contact Information
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex items-center text-sm">
//                           <Phone className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.phone}</span>
//                         </div>
//                         <div className="flex items-center text-sm">
//                           <Mail className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.email || 'Not provided'}</span>
//                         </div>
//                         <div className="flex items-center text-sm">
//                           <MapPin className="w-4 h-4 text-gray-400 mr-3" />
//                           <span className="text-gray-600">{selectedPatient.address || 'Not provided'}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white border border-gray-200 rounded-xl p-6">
//                       <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                         <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
//                         Emergency Contact
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Name</p>
//                           <p className="font-medium text-gray-900">{selectedPatient.emergencyContact}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Phone</p>
//                           <p className="font-medium text-gray-900">{selectedPatient.emergencyPhone}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Assigned Caregiver */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                       <UserCheck className="w-5 h-5 text-green-500 mr-2" />
//                       Assigned Caregiver
//                     </h4>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-medium text-gray-900 text-lg">{selectedPatient.caregiver}</p>
//                         <p className="text-sm text-gray-600">Primary caregiver assigned to this patient</p>
//                       </div>
//                       <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
//                         <MessageSquare className="w-4 h-4" />
//                         <span>Send Message</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'medical' && (
//                 <div className="space-y-6">
//                   {/* Allergies */}
//                   <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-red-900 mb-3 flex items-center">
//                       <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
//                       Allergies
//                     </h4>
//                     <p className="text-red-800">{selectedPatient.allergies || 'None'}</p>
//                   </div>

//                   {/* Current Medications */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="font-semibold text-gray-900 flex items-center">
//                         <Pill className="w-5 h-5 text-blue-500 mr-2" />
//                         Current Medications
//                       </h4>
//                       <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
//                         <Plus className="w-4 h-4" />
//                         <span>Add Prescription</span>
//                       </button>
//                     </div>
//                     <div className="space-y-3">
//                       {selectedPatient.medications && selectedPatient.medications.length > 0 ? (
//                         selectedPatient.medications.map((med, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <Pill className="w-5 h-5 text-blue-600" />
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900">{med}</p>
//                                 <p className="text-sm text-gray-600">Daily dose</p>
//                               </div>
//                             </div>
//                             <button className="p-2 text-gray-400 hover:text-gray-600">
//                               <Edit className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-500 text-center py-4">No medications recorded</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Medical History Summary */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
//                       <FileText className="w-5 h-5 text-purple-500 mr-2" />
//                       Medical History
//                     </h4>
//                     <div className="space-y-3 text-sm text-gray-600">
//                       <p>• Primary diagnosis: {selectedPatient.diagnosis}</p>
//                       <p>• Blood type: {selectedPatient.bloodType || 'Not specified'}</p>
//                       <p>• Known allergies: {selectedPatient.allergies || 'None'}</p>
//                       <p>• Currently under treatment since {new Date(selectedPatient.lastVisit).getFullYear()}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'appointments' && (
//                 <div className="space-y-6">
//                   {/* Upcoming Appointment */}
//                   <div className="bg-green-50 border border-green-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-green-900 mb-4 flex items-center">
//                       <Calendar className="w-5 h-5 text-green-600 mr-2" />
//                       Next Appointment
//                     </h4>
//                     {selectedPatient.nextAppointment ? (
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-lg font-medium text-green-900">
//                             {new Date(selectedPatient.nextAppointment).toLocaleDateString('en-US', {
//                               weekday: 'long',
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </p>
//                           <p className="text-sm text-green-700">10:00 AM - Routine checkup</p>
//                         </div>
//                         <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//                           Reschedule
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-green-800">No appointment scheduled</p>
//                     )}
//                   </div>

//                   {/* Schedule New Appointment */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Schedule New Appointment</h4>
//                     <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                       <Plus className="w-5 h-5" />
//                       <span>Book Appointment</span>
//                     </button>
//                   </div>

//                   {/* Past Appointments */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Past Appointments</h4>
//                     <div className="space-y-3">
//                       <div className="p-4 bg-gray-50 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">
//                               {new Date(selectedPatient.lastVisit).toLocaleDateString()}
//                             </p>
//                             <p className="text-sm text-gray-600">Routine checkup - Completed</p>
//                           </div>
//                           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                             View Notes
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'notes' && (
//                 <div className="space-y-6">
//                   {/* Add New Note */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Add Clinical Note</h4>
//                     <textarea
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
//                       rows="4"
//                       placeholder="Enter your clinical observations and notes..."
//                     />
//                     <button className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                       <Plus className="w-4 h-4" />
//                       <span>Save Note</span>
//                     </button>
//                   </div>

//                   {/* Previous Notes */}
//                   <div className="bg-white border border-gray-200 rounded-xl p-6">
//                     <h4 className="font-semibold text-gray-900 mb-4">Clinical Notes History</h4>
//                     <div className="space-y-4">
//                       <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
//                         <div className="flex items-start justify-between mb-2">
//                           <p className="text-sm font-medium text-gray-900">
//                             {new Date(selectedPatient.lastVisit).toLocaleDateString()}
//                           </p>
//                           <span className="text-xs text-gray-500">Dr. {JSON.parse(localStorage.getItem('user') || '{}').name || 'Doctor'}</span>
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           {selectedPatient.notes || 'Patient showing good progress with current treatment plan. Continue current medication dosage. Schedule follow-up in 2 weeks.'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Actions */}
//             <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => handleViewVitals(selectedPatient)}
//                   className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
//                 >
//                   <Activity className="w-5 h-5" />
//                   <span>View Vitals</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
//                   <FileText className="w-5 h-5" />
//                   <span>Write Prescription</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
//                   <MessageSquare className="w-5 h-5" />
//                   <span>Message Caregiver</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
//                   <Download className="w-5 h-5" />
//                   <span>Export Data</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorPatients;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  X,
  Edit,
  Calendar,
  FileText,
  MessageSquare,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  User,
  Heart,
  Pill,
  Clock,
  TrendingUp,
  Download,
  Eye,
  Stethoscope,
  UserCheck
} from 'lucide-react';

const DoctorPatients = () => {
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api';
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    diagnosis: '',
    caregiver: '',
    notes: ''
  });

  const [patients, setPatients] = useState([]);
  const [patientMedications, setPatientMedications] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);

  // Fetch patients from backend on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch medications and appointments when a patient is selected
  useEffect(() => {
    if (selectedPatient) {
      fetchPatientMedications(selectedPatient._id || selectedPatient.id);
      fetchPatientAppointments(selectedPatient._id || selectedPatient.id);
    }
  }, [selectedPatient]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/patients`, {
        headers: getAuthHeaders()
      });
      
      if (response.status === 401) {
        setError('Unauthorized. Please login again.');
        return;
      }
      
      if (!response.ok) throw new Error('Failed to fetch patients');
      
      const result = await response.json();
      setPatients(result.data || result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientMedications = async (patientId) => {
    try {
      const response = await fetch(`${API_URL}/medications/patient/${patientId}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const result = await response.json();
        setPatientMedications(result.data || result || []);
      } else {
        setPatientMedications([]);
      }
    } catch (err) {
      console.error('Error fetching medications:', err);
      setPatientMedications([]);
    }
  };

  const fetchPatientAppointments = async (patientId) => {
    try {
      const response = await fetch(`${API_URL}/appointments/patient/${patientId}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const result = await response.json();
        setPatientAppointments(result.data || result || []);
      } else {
        setPatientAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setPatientAppointments([]);
    }
  };

  // Stats calculation
  const stats = {
    total: patients.length,
    critical: patients.filter(p => p.status === 'critical').length,
    appointmentsToday: patients.filter(p => {
      if (!p.nextAppointment) return false;
      const today = new Date().toDateString();
      const appointmentDate = new Date(p.nextAppointment).toDateString();
      return today === appointmentDate;
    }).length,
    newThisWeek: patients.filter(p => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(p.createdAt) > weekAgo;
    }).length
  };

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'stable': return 'bg-green-100 text-green-800 border-green-300';
      case 'discharged': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    
    try {
      const age = newPatient.dateOfBirth 
        ? new Date().getFullYear() - new Date(newPatient.dateOfBirth).getFullYear()
        : 0;
      
      const patientData = {
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        dateOfBirth: newPatient.dateOfBirth,
        age: age,
        gender: newPatient.gender,
        phone: newPatient.phone,
        email: newPatient.email,
        address: newPatient.address,
        bloodType: newPatient.bloodType,
        allergies: newPatient.allergies || 'None',
        diagnosis: newPatient.diagnosis,
        caregiver: newPatient.caregiver,
        emergencyContact: newPatient.emergencyContact,
        emergencyPhone: newPatient.emergencyPhone,
        notes: newPatient.notes,
        status: 'stable',
        photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop'
      };

      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(patientData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add patient');
      }

      const result = await response.json();
      const savedPatient = result.data || result;
      
      setPatients([...patients, savedPatient]);
      setShowAddPatient(false);
      
      setNewPatient({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        bloodType: '',
        allergies: '',
        diagnosis: '',
        caregiver: '',
        notes: ''
      });

      alert('Patient added successfully!');
      fetchPatients();
      
    } catch (error) {
      console.error('Error adding patient:', error);
      alert(`Failed to add patient: ${error.message}`);
    }
  };

  const handleViewVitals = (patient) => {
    navigate('/doctor/vitals', { 
      state: { 
        patientId: patient._id || patient.id, 
        patientName: patient.name 
      } 
    });
  };

  const handleWritePrescription = (patient) => {
    navigate('/doctor/prescription', {
      state: {
        patientId: patient._id || patient.id,
        patientName: patient.name,
        patientAge: patient.age,
        patientGender: patient.gender,
        patientDiagnosis: patient.diagnosis,
        patientAllergies: patient.allergies,
        patientPhone: patient.phone,
        patientEmail: patient.email,
        currentMedications: patientMedications
      }
    });
  };

  const handleBookAppointment = (patient) => {
    navigate('/doctor/appointments', {
      state: {
        openForm: true,
        patientId: patient._id || patient.id,
        patientName: patient.name,
        patientPhone: patient.phone,
        patientEmail: patient.email,
        patientAge: patient.age,
        patientGender: patient.gender,
        returnTo: '/doctor/patients',
        returnState: { selectedPatientId: patient._id || patient.id }
      }
    });
  };

  const handleExportData = async (patient) => {
    try {
      // Fetch all patient data
      const [medsResponse, appointmentsResponse] = await Promise.all([
        fetch(`${API_URL}/medications/patient/${patient._id || patient.id}`, {
          headers: getAuthHeaders()
        }),
        fetch(`${API_URL}/appointments/patient/${patient._id || patient.id}`, {
          headers: getAuthHeaders()
        })
      ]);

      const medications = medsResponse.ok ? await medsResponse.json() : { data: [] };
      const appointments = appointmentsResponse.ok ? await appointmentsResponse.json() : { data: [] };

      // Create PDF content
      const pdfContent = `
        PATIENT MEDICAL RECORD
        =====================================================
        
        PERSONAL INFORMATION
        ---------------------
        Name: ${patient.name}
        Patient ID: ${patient.patientId}
        Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}
        Age: ${patient.age} years
        Gender: ${patient.gender}
        Blood Type: ${patient.bloodType || 'Not specified'}
        
        CONTACT INFORMATION
        -------------------
        Phone: ${patient.phone}
        Email: ${patient.email || 'Not provided'}
        Address: ${patient.address || 'Not provided'}
        
        EMERGENCY CONTACT
        -----------------
        Name: ${patient.emergencyContact}
        Phone: ${patient.emergencyPhone}
        
        MEDICAL INFORMATION
        -------------------
        Primary Diagnosis: ${patient.diagnosis}
        Known Allergies: ${patient.allergies || 'None'}
        Status: ${patient.status}
        Assigned Caregiver: ${patient.caregiver}
        
        CURRENT MEDICATIONS
        -------------------
        ${(medications.data || []).length > 0 
          ? (medications.data || []).map((med, i) => `${i + 1}. ${med.name} - ${med.dosage} - ${med.frequency}`).join('\n        ')
          : 'No current medications'}
        
        APPOINTMENT HISTORY
        -------------------
        ${(appointments.data || []).length > 0
          ? (appointments.data || []).map((apt, i) => 
              `${i + 1}. ${new Date(apt.date).toLocaleDateString()} - ${apt.type || 'Checkup'} - ${apt.status}\n           Notes: ${apt.notes || 'No notes'}`
            ).join('\n        ')
          : 'No appointment history'}
        
        CLINICAL NOTES
        --------------
        ${patient.notes || 'No clinical notes available'}
        
        =====================================================
        Generated on: ${new Date().toLocaleString()}
        Generated by: Dr. ${JSON.parse(localStorage.getItem('user') || '{}').name || 'Doctor'}
      `;

      // Create and download the file
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${patient.name.replace(/\s+/g, '_')}_Medical_Record_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      alert('Patient data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export patient data');
    }
  };

  const handleViewAppointmentNotes = (appointment) => {
    setSelectedAppointment(appointment);
    setShowNotesPopup(true);
  };

  const handleSaveNote = async () => {
    if (!newNote.trim()) {
      alert('Please enter a note');
      return;
    }

    try {
      setSavingNote(true);
      
      // Save note to the patient's record or appointment
      const response = await fetch(`${API_URL}/patients/${selectedPatient._id || selectedPatient.id}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          note: newNote,
          date: new Date().toISOString(),
          doctor: JSON.parse(localStorage.getItem('user') || '{}').name || 'Doctor'
        })
      });

      if (!response.ok) throw new Error('Failed to save note');

      alert('Note saved successfully!');
      setNewNote('');
      
      // Refresh patient data
      await fetchPatients();
      
      // Update selected patient
      const updatedPatient = patients.find(p => (p._id || p.id) === (selectedPatient._id || selectedPatient.id));
      if (updatedPatient) {
        setSelectedPatient(updatedPatient);
      }
      
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h2>
          <p className="text-gray-600">Manage and monitor all your patients</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
            <button 
              onClick={fetchPatients}
              className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Cases</p>
                <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Appointments Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.appointmentsToday}</p>
              </div>
              <Calendar className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Week</p>
                <p className="text-3xl font-bold text-purple-600">{stats.newThisWeek}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="monitoring">Monitoring</option>
              <option value="stable">Stable</option>
              <option value="discharged">Discharged</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                List
              </button>
            </div>

            <button
              onClick={() => setShowAddPatient(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        {/* Patient List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div
                key={patient._id || patient.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.patientId}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                          {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>{patient.age} years • {patient.gender}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Heart className="w-4 h-4 mr-2" />
                    <span>{patient.diagnosis}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <UserCheck className="w-4 h-4 mr-2" />
                    <span>Caregiver: {patient.caregiver}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleViewVitals(patient)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Vitals</span>
                  </button>
                  <button
                    className="flex items-center justify-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Diagnosis</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Caregiver</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Visit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient._id || patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={patient.photo}
                          alt={patient.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.patientId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.diagnosis}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                        {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.caregiver}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewVitals(patient)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="View Vitals"
                        >
                          <Activity className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                          title="Send Message"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Results */}
        {filteredPatients.length === 0 && !loading && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-white/20">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Click "Add Patient" to register your first patient'}
            </p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto pt-20">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl my-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Add New Patient</h3>
                  <p className="text-blue-100">Register a new patient in the system</p>
                </div>
                <button
                  onClick={() => setShowAddPatient(false)}
                  className="text-white/80 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleAddPatient} className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatient.firstName}
                      onChange={(e) => setNewPatient({...newPatient, firstName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatient.lastName}
                      onChange={(e) => setNewPatient({...newPatient, lastName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={newPatient.dateOfBirth}
                      onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="patient@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                      rows="2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Type
                    </label>
                    <select
                      value={newPatient.bloodType}
                      onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Diagnosis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatient.diagnosis}
                      onChange={(e) => setNewPatient({...newPatient, diagnosis: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Type 2 Diabetes"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Known Allergies
                    </label>
                    <input
                      type="text"
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Penicillin, Sulfa drugs (or 'None')"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatient.emergencyContact}
                      onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter emergency contact name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={newPatient.emergencyPhone}
                      onChange={(e) => setNewPatient({...newPatient, emergencyPhone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Care Assignment</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Caregiver <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPatient.caregiver}
                      onChange={(e) => setNewPatient({...newPatient, caregiver: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter caregiver name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Notes
                    </label>
                    <textarea
                      value={newPatient.notes}
                      onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add any initial observations or notes..."
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                >
                  Add Patient
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPatient(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Detail Modal - Fixed positioning */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto pt-4 pb-8">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8 mt-4">
            {/* Header - Sticky */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0 z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPatient.photo}
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedPatient.name}</h3>
                    <p className="text-blue-100">{selectedPatient.patientId} • {selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-white/80 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mt-6">
                {['overview', 'medical', 'appointments', 'notes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-white text-blue-600'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 max-h-[500px] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Patient Status</h4>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status?.charAt(0).toUpperCase() + selectedPatient.status?.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
                        <p className="font-medium text-gray-900">{selectedPatient.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Blood Type</p>
                        <p className="font-medium text-gray-900">{selectedPatient.bloodType || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Last Visit</p>
                        <p className="font-medium text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Appointment</p>
                        <p className="font-medium text-gray-900">
                          {selectedPatient.nextAppointment 
                            ? new Date(selectedPatient.nextAppointment).toLocaleDateString()
                            : 'Not scheduled'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 text-blue-500 mr-2" />
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-600">{selectedPatient.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-600">{selectedPatient.email || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-600">{selectedPatient.address || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        Emergency Contact
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Name</p>
                          <p className="font-medium text-gray-900">{selectedPatient.emergencyContact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone</p>
                          <p className="font-medium text-gray-900">{selectedPatient.emergencyPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Caregiver */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <UserCheck className="w-5 h-5 text-green-500 mr-2" />
                      Assigned Caregiver
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-lg">{selectedPatient.caregiver}</p>
                        <p className="text-sm text-gray-600">Primary caregiver assigned to this patient</p>
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  {/* Allergies */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      Allergies
                    </h4>
                    <p className="text-red-800">{selectedPatient.allergies || 'None'}</p>
                  </div>

                  {/* Current Medications */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Pill className="w-5 h-5 text-blue-500 mr-2" />
                        Current Medications
                      </h4>
                      <button 
                        onClick={() => handleWritePrescription(selectedPatient)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Prescription</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {patientMedications.length > 0 ? (
                        patientMedications.map((med, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Pill className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{med.name || med.medicationName}</p>
                                <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No medications recorded</p>
                      )}
                    </div>
                  </div>

                  {/* Medical History Summary */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 text-purple-500 mr-2" />
                      Medical History
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• Primary diagnosis: {selectedPatient.diagnosis}</p>
                      <p>• Blood type: {selectedPatient.bloodType || 'Not specified'}</p>
                      <p>• Known allergies: {selectedPatient.allergies || 'None'}</p>
                      <p>• Currently under treatment since {new Date(selectedPatient.lastVisit).getFullYear()}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  {/* Upcoming Appointment */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 text-green-600 mr-2" />
                      Next Appointment
                    </h4>
                    {selectedPatient.nextAppointment ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium text-green-900">
                            {new Date(selectedPatient.nextAppointment).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-green-700">Scheduled checkup</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    ) : (
                      <p className="text-green-800">No appointment scheduled</p>
                    )}
                  </div>

                  {/* Schedule New Appointment */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Schedule New Appointment</h4>
                    <button 
                      onClick={() => handleBookAppointment(selectedPatient)}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </button>
                  </div>

                  {/* Past Appointments */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Past Appointments</h4>
                    <div className="space-y-3">
                      {patientAppointments.length > 0 ? (
                        patientAppointments
                          .filter(apt => new Date(apt.date) < new Date())
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((apt, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {new Date(apt.date).toLocaleDateString()}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {apt.type || 'Routine checkup'} - {apt.status}
                                  </p>
                                </div>
                                <button 
                                  onClick={() => handleViewAppointmentNotes(apt)}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View Notes
                                </button>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No past appointments</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Add New Note */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Add Clinical Note</h4>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      rows="4"
                      placeholder="Enter your clinical observations and notes..."
                    />
                    <button 
                      onClick={handleSaveNote}
                      disabled={savingNote}
                      className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{savingNote ? 'Saving...' : 'Save Note'}</span>
                    </button>
                  </div>

                  {/* Previous Notes */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Clinical Notes History</h4>
                    <div className="space-y-4">
                      {selectedPatient.clinicalNotes && selectedPatient.clinicalNotes.length > 0 ? (
                        selectedPatient.clinicalNotes
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((note, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {new Date(note.date).toLocaleDateString()}
                                </p>
                                <span className="text-xs text-gray-500">Dr. {note.doctor}</span>
                              </div>
                              <p className="text-sm text-gray-700">{note.note}</p>
                            </div>
                          ))
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                            </p>
                            <span className="text-xs text-gray-500">Dr. {JSON.parse(localStorage.getItem('user') || '{}').name || 'Doctor'}</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {selectedPatient.notes || 'No clinical notes recorded yet.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions - Sticky at bottom */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl sticky bottom-0">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleViewVitals(selectedPatient)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Activity className="w-5 h-5" />
                  <span>View Vitals</span>
                </button>
                <button 
                  onClick={() => handleWritePrescription(selectedPatient)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <FileText className="w-5 h-5" />
                  <span>Write Prescription</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                  <MessageSquare className="w-5 h-5" />
                  <span>Message Caregiver</span>
                </button>
                <button 
                  onClick={() => handleExportData(selectedPatient)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Notes Popup */}
      {showNotesPopup && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Appointment Notes</h3>
                  <p className="text-purple-100">
                    {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowNotesPopup(false);
                    setSelectedAppointment(null);
                  }}
                  className="text-white/80 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Type:</span> {selectedAppointment.type || 'Routine checkup'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Status:</span> {selectedAppointment.status}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Duration:</span> {selectedAppointment.duration || '30 minutes'}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    Clinical Notes
                  </h4>
                  {selectedAppointment.notes ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedAppointment.notes}</p>
                  ) : (
                    <p className="text-gray-500 italic">No notes recorded for this appointment.</p>
                  )}
                </div>

                {selectedAppointment.prescription && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Pill className="w-5 h-5 text-green-500 mr-2" />
                      Prescriptions Given
                    </h4>
                    <p className="text-gray-700">{selectedAppointment.prescription}</p>
                  </div>
                )}

                {selectedAppointment.followUpDate && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Calendar className="w-5 h-5 text-yellow-500 mr-2" />
                      Follow-up Required
                    </h4>
                    <p className="text-gray-700">
                      {new Date(selectedAppointment.followUpDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowNotesPopup(false);
                  setSelectedAppointment(null);
                }}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;