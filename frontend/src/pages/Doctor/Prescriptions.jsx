// import React, { useState } from 'react';
// import { 
//   Pill, 
//   Search, 
//   Filter, 
//   Plus, 
//   Calendar, 
//   Clock, 
//   User, 
//   FileText, 
//   Upload, 
//   Download, 
//   Edit, 
//   Eye, 
//   AlertTriangle, 
//   CheckCircle, 
//   Send,
//   Printer,
//   X,
//   Save,
//   Camera,
//   Activity,
//   Heart,
//   Stethoscope,
//   UserCheck,
//   AlertCircle,
//   Archive
// } from 'lucide-react';

// const DoctorPrescriptions = () => {
//   const [selectedPatient, setSelectedPatient] = useState('all');
//   const [selectedTimeframe, setSelectedTimeframe] = useState('week');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showNewPrescription, setShowNewPrescription] = useState(false);
//   const [selectedPrescription, setSelectedPrescription] = useState(null);

//   // Sample patients data
//   const patients = [
//     { id: 1, name: "Priya Selvam", age: 58, condition: "Type 2 Diabetes, Hypertension" },
//     { id: 2, name: "Murugan Raman", age: 65, condition: "Hypertension, Cardiac Arrhythmia" },
//     { id: 3, name: "Lakshmi Devi", age: 72, condition: "Type 1 Diabetes, Osteoporosis" },
//     { id: 4, name: "Karthik Sundar", age: 48, condition: "Hypertension, High Cholesterol" },
//     { id: 5, name: "Venkatesh Kumar", age: 55, condition: "Type 2 Diabetes, Neuropathy" },
//     { id: 6, name: "Sujatha Ravi", age: 43, condition: "Hypothyroidism, PCOD" }
//   ];

//   // Sample prescriptions data
//   const prescriptions = [
//     {
//       id: 1,
//       patientId: 1,
//       patientName: "Priya Selvam",
//       date: "2024-03-21",
//       type: "Regular Visit",
//       status: "Active",
//       visitReason: "Routine diabetes follow-up",
//       medications: [
//         { name: "Metformin", strength: "500mg", frequency: "Twice daily", duration: "30 days", instructions: "Take with meals" },
//         { name: "Amlodipine", strength: "5mg", frequency: "Once daily", duration: "30 days", instructions: "Take in morning" },
//         { name: "Glimepiride", strength: "2mg", frequency: "Once daily", duration: "30 days", instructions: "Take before breakfast" }
//       ],
//       vitalSigns: {
//         bloodPressure: "125/80",
//         heartRate: "72",
//         bloodSugar: "145",
//         weight: "68 kg"
//       },
//       symptoms: ["Mild fatigue", "Occasional headaches"],
//       diagnosis: "Type 2 Diabetes Mellitus - controlled, Essential Hypertension - stable",
//       nextVisit: "2024-04-21",
//       notes: "Patient showing good compliance. Blood sugar levels improving. Continue current regimen.",
//       urgency: "routine"
//     },
//     {
//       id: 2,
//       patientId: 2,
//       patientName: "Murugan Raman",
//       date: "2024-03-21",
//       type: "Emergency",
//       status: "Active",
//       visitReason: "High blood pressure emergency",
//       medications: [
//         { name: "Losartan", strength: "50mg", frequency: "Once daily", duration: "15 days", instructions: "Take in morning" },
//         { name: "Metoprolol", strength: "25mg", frequency: "Twice daily", duration: "15 days", instructions: "Take with food" },
//         { name: "Aspirin", strength: "75mg", frequency: "Once daily", duration: "Ongoing", instructions: "Take after dinner" },
//         { name: "Furosemide", strength: "20mg", frequency: "Once daily", duration: "7 days", instructions: "Take in morning" }
//       ],
//       vitalSigns: {
//         bloodPressure: "165/95",
//         heartRate: "88",
//         bloodSugar: "110",
//         weight: "75 kg"
//       },
//       symptoms: ["Severe headache", "Chest discomfort", "Shortness of breath"],
//       diagnosis: "Hypertensive Crisis - managed, Cardiac Arrhythmia - monitoring required",
//       nextVisit: "2024-03-23",
//       notes: "URGENT: Patient presented with hypertensive crisis. BP controlled with medication. Requires close monitoring. Follow-up in 48 hours mandatory.",
//       urgency: "critical"
//     },
//     {
//       id: 3,
//       patientId: 3,
//       patientName: "Lakshmi Devi",
//       date: "2024-03-19",
//       type: "Regular Visit",
//       status: "Active",
//       visitReason: "Diabetes and bone health checkup",
//       medications: [
//         { name: "Insulin Glargine", strength: "100 units/ml", frequency: "Once daily", duration: "30 days", instructions: "Inject at bedtime" },
//         { name: "Calcium Carbonate", strength: "500mg", frequency: "Twice daily", duration: "30 days", instructions: "Take with meals" },
//         { name: "Vitamin D3", strength: "60000 IU", frequency: "Weekly", duration: "8 weeks", instructions: "Take after breakfast" }
//       ],
//       vitalSigns: {
//         bloodPressure: "118/75",
//         heartRate: "68",
//         bloodSugar: "128",
//         weight: "58 kg"
//       },
//       symptoms: ["Mild joint pain", "Good energy levels"],
//       diagnosis: "Type 1 Diabetes Mellitus - well controlled, Osteoporosis - stable",
//       nextVisit: "2024-04-19",
//       notes: "Excellent medication compliance. Blood sugar well controlled. Continue current insulin regimen.",
//       urgency: "routine"
//     },
//     {
//       id: 4,
//       patientId: 4,
//       patientName: "Karthik Sundar",
//       date: "2024-03-18",
//       type: "Follow-up",
//       status: "Active",
//       visitReason: "Cholesterol and BP monitoring",
//       medications: [
//         { name: "Atorvastatin", strength: "20mg", frequency: "Once daily", duration: "30 days", instructions: "Take at bedtime" },
//         { name: "Lisinopril", strength: "10mg", frequency: "Once daily", duration: "30 days", instructions: "Take in morning" },
//         { name: "Omega-3", strength: "1000mg", frequency: "Twice daily", duration: "30 days", instructions: "Take with meals" }
//       ],
//       vitalSigns: {
//         bloodPressure: "135/85",
//         heartRate: "75",
//         bloodSugar: "105",
//         weight: "72 kg"
//       },
//       symptoms: ["No specific complaints", "Better energy"],
//       diagnosis: "Essential Hypertension - improving, Hyperlipidemia - responding to treatment",
//       nextVisit: "2024-04-18",
//       notes: "Cholesterol levels showing improvement. BP slightly elevated, continue monitoring.",
//       urgency: "routine"
//     }
//   ];

//   const [newPrescription, setNewPrescription] = useState({
//     patientId: '',
//     date: new Date().toISOString().split('T')[0],
//     type: 'Regular Visit',
//     visitReason: '',
//     medications: [{ name: '', strength: '', frequency: '', duration: '', instructions: '' }],
//     vitalSigns: { bloodPressure: '', heartRate: '', bloodSugar: '', weight: '' },
//     symptoms: [''],
//     diagnosis: '',
//     nextVisit: '',
//     notes: '',
//     urgency: 'routine'
//   });

//   const addMedication = () => {
//     setNewPrescription(prev => ({
//       ...prev,
//       medications: [...prev.medications, { name: '', strength: '', frequency: '', duration: '', instructions: '' }]
//     }));
//   };

//   const addSymptom = () => {
//     setNewPrescription(prev => ({
//       ...prev,
//       symptoms: [...prev.symptoms, '']
//     }));
//   };

//   const updateMedication = (index, field, value) => {
//     setNewPrescription(prev => ({
//       ...prev,
//       medications: prev.medications.map((med, i) => 
//         i === index ? { ...med, [field]: value } : med
//       )
//     }));
//   };

//   const updateSymptom = (index, value) => {
//     setNewPrescription(prev => ({
//       ...prev,
//       symptoms: prev.symptoms.map((symptom, i) => 
//         i === index ? value : symptom
//       )
//     }));
//   };

//   const removeMedication = (index) => {
//     if (newPrescription.medications.length > 1) {
//       setNewPrescription(prev => ({
//         ...prev,
//         medications: prev.medications.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const removeSymptom = (index) => {
//     if (newPrescription.symptoms.length > 1) {
//       setNewPrescription(prev => ({
//         ...prev,
//         symptoms: prev.symptoms.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const getUrgencyColor = (urgency) => {
//     switch (urgency) {
//       case 'critical': return 'border-l-red-500 bg-red-50';
//       case 'urgent': return 'border-l-orange-500 bg-orange-50';
//       case 'routine': return 'border-l-green-500 bg-green-50';
//       default: return 'border-l-blue-500 bg-blue-50';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case 'Emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
//       case 'Follow-up': return <Activity className="w-4 h-4 text-blue-500" />;
//       case 'Regular Visit': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       default: return <FileText className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const filteredPrescriptions = prescriptions.filter(prescription => {
//     const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          prescription.visitReason.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesPatient = selectedPatient === 'all' || prescription.patientId === parseInt(selectedPatient);
    
//     const prescriptionDate = new Date(prescription.date);
//     const today = new Date();
//     const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
    
//     const matchesTimeframe = selectedTimeframe === 'all' ||
//                             (selectedTimeframe === 'week' && daysDiff <= 7) ||
//                             (selectedTimeframe === 'month' && daysDiff <= 30) ||
//                             (selectedTimeframe === 'quarter' && daysDiff <= 90);
    
//     return matchesSearch && matchesPatient && matchesTimeframe;
//   });

//   const handleSavePrescription = () => {
//     console.log('Saving prescription:', newPrescription);
//     // Here you would typically save to your backend/database
//     // This would then be visible in the Family Medications page
//     setShowNewPrescription(false);
//     // Reset form
//     setNewPrescription({
//       patientId: '',
//       date: new Date().toISOString().split('T')[0],
//       type: 'Regular Visit',
//       visitReason: '',
//       medications: [{ name: '', strength: '', frequency: '', duration: '', instructions: '' }],
//       vitalSigns: { bloodPressure: '', heartRate: '', bloodSugar: '', weight: '' },
//       symptoms: [''],
//       diagnosis: '',
//       nextVisit: '',
//       notes: '',
//       urgency: 'routine'
//     });
//   };

//   const exportPrescription = (prescription) => {
//     console.log('Exporting prescription:', prescription.id);
//     // Generate PDF prescription
//   };

//   const sendToFamily = (prescription) => {
//     console.log('Sending prescription to family dashboard:', prescription.id);
//     // Send notification to family members
//     alert(`Prescription sent to ${prescription.patientName}'s family members via the Family Dashboard`);
//   };

//   // Stats
//   const totalPrescriptions = prescriptions.length;
//   const activePrescriptions = prescriptions.filter(p => p.status === 'Active').length;
//   const emergencyPrescriptions = prescriptions.filter(p => p.type === 'Emergency').length;
//   const thisWeekPrescriptions = prescriptions.filter(p => {
//     const prescriptionDate = new Date(p.date);
//     const today = new Date();
//     const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
//     return daysDiff <= 7;
//   }).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
//       {/* Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Prescription Management</h1>
//             <p className="text-gray-600">Create, manage, and track patient prescriptions</p>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => setShowNewPrescription(true)}
//               className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
//             >
//               <Plus className="w-5 h-5" />
//               <span>New Prescription</span>
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Prescriptions</p>
//                 <p className="text-2xl font-bold text-blue-600">{totalPrescriptions}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Active Prescriptions</p>
//                 <p className="text-2xl font-bold text-green-600">{activePrescriptions}</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Emergency Scripts</p>
//                 <p className="text-2xl font-bold text-red-600">{emergencyPrescriptions}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-red-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">This Week</p>
//                 <p className="text-2xl font-bold text-purple-600">{thisWeekPrescriptions}</p>
//               </div>
//               <Calendar className="w-8 h-8 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="text"
//                   placeholder="Search prescriptions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <select
//                 value={selectedPatient}
//                 onChange={(e) => setSelectedPatient(e.target.value)}
//                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Patients</option>
//                 {patients.map(patient => (
//                   <option key={patient.id} value={patient.id}>{patient.name}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="week">This Week</option>
//                 <option value="month">This Month</option>
//                 <option value="quarter">Last 3 Months</option>
//                 <option value="all">All Time</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Prescriptions List */}
//         <div className="space-y-6">
//           {filteredPrescriptions.map(prescription => (
//             <div key={prescription.id} className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-l-4 p-6 border border-white/20 ${getUrgencyColor(prescription.urgency)}`}>
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                     <Stethoscope className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{prescription.patientName}</h3>
//                     <p className="text-gray-600">{prescription.visitReason}</p>
//                     <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{formatDate(prescription.date)}</span>
//                       <span>•</span>
//                       {getTypeIcon(prescription.type)}
//                       <span>{prescription.type}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                   <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
//                     {prescription.status}
//                   </div>
//                 </div>
//               </div>

//               {/* Vital Signs */}
//               <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                 <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
//                   <Activity className="w-4 h-4 mr-2" />
//                   Vital Signs
//                 </h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <span className="text-blue-700">BP:</span>
//                     <span className="font-medium ml-1">{prescription.vitalSigns.bloodPressure} mmHg</span>
//                   </div>
//                   <div>
//                     <span className="text-blue-700">HR:</span>
//                     <span className="font-medium ml-1">{prescription.vitalSigns.heartRate} bpm</span>
//                   </div>
//                   <div>
//                     <span className="text-blue-700">Sugar:</span>
//                     <span className="font-medium ml-1">{prescription.vitalSigns.bloodSugar} mg/dL</span>
//                   </div>
//                   <div>
//                     <span className="text-blue-700">Weight:</span>
//                     <span className="font-medium ml-1">{prescription.vitalSigns.weight}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Medications */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
//                   <Pill className="w-4 h-4 mr-2 text-green-600" />
//                   Medications ({prescription.medications.length})
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {prescription.medications.map((med, index) => (
//                     <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
//                       <div className="flex justify-between items-start mb-1">
//                         <h5 className="font-medium text-gray-900">{med.name}</h5>
//                         <span className="text-sm text-blue-600 font-medium">{med.strength}</span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-1">{med.frequency} for {med.duration}</p>
//                       <p className="text-xs text-gray-500 italic">{med.instructions}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Diagnosis & Notes */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-4">
//                 <h4 className="font-semibold text-gray-900 mb-2">Diagnosis & Notes</h4>
//                 <p className="text-sm text-gray-700 mb-2">{prescription.diagnosis}</p>
//                 <p className="text-sm text-gray-600 italic">{prescription.notes}</p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-500">
//                   Next Visit: {formatDate(prescription.nextVisit)}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={() => setSelectedPrescription(prescription)}
//                     className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>View</span>
//                   </button>
//                   <button 
//                     onClick={() => exportPrescription(prescription)}
//                     className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                   >
//                     <Download className="w-4 h-4" />
//                     <span>Export</span>
//                   </button>
//                   <button 
//                     onClick={() => sendToFamily(prescription)}
//                     className="flex items-center space-x-1 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//                   >
//                     <Send className="w-4 h-4" />
//                     <span>Send to Family</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredPrescriptions.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FileText className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No prescriptions found</h3>
//             <p className="text-gray-600">Try adjusting your search criteria or create a new prescription</p>
//           </div>
//         )}

//         {/* New Prescription Modal */}
//         {showNewPrescription && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Stethoscope className="w-6 h-6" />
//                     <h2 className="text-2xl font-bold">New Prescription</h2>
//                   </div>
//                   <button 
//                     onClick={() => setShowNewPrescription(false)}
//                     className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
//                 <div className="space-y-6">
//                   {/* Patient & Visit Info */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
//                       <select
//                         value={newPrescription.patientId}
//                         onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Patient</option>
//                         {patients.map(patient => (
//                           <option key={patient.id} value={patient.id}>{patient.name} - {patient.condition}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                       <input
//                         type="date"
//                         value={newPrescription.date}
//                         onChange={(e) => setNewPrescription({...newPrescription, date: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
//                       <select
//                         value={newPrescription.type}
//                         onChange={(e) => setNewPrescription({...newPrescription, type: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="Regular Visit">Regular Visit</option>
//                         <option value="Follow-up">Follow-up</option>
//                         <option value="Emergency">Emergency</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
//                       <select
//                         value={newPrescription.urgency}
//                         onChange={(e) => setNewPrescription({...newPrescription, urgency: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="routine">Routine</option>
//                         <option value="urgent">Urgent</option>
//                         <option value="critical">Critical</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
//                     <textarea
//                       value={newPrescription.visitReason}
//                       onChange={(e) => setNewPrescription({...newPrescription, visitReason: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
//                       placeholder="Brief description of the visit reason..."
//                     />
//                   </div>

//                   {/* Vital Signs */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
//                       <Heart className="w-5 h-5 mr-2 text-red-500" />
//                       Vital Signs
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
//                         <input
//                           type="text"
//                           placeholder="120/80"
//                           value={newPrescription.vitalSigns.bloodPressure}
//                           onChange={(e) => setNewPrescription({...newPrescription, vitalSigns: {...newPrescription.vitalSigns, bloodPressure: e.target.value}})}
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
//                         <input
//                           type="text"
//                           placeholder="72"
//                           value={newPrescription.vitalSigns.heartRate}
//                           onChange={(e) => setNewPrescription({...newPrescription, vitalSigns: {...newPrescription.vitalSigns, heartRate: e.target.value}})}
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar</label>
//                         <input
//                           type="text"
//                           placeholder="110"
//                           value={newPrescription.vitalSigns.bloodSugar}
//                           onChange={(e) => setNewPrescription({...newPrescription, vitalSigns: {...newPrescription.vitalSigns, bloodSugar: e.target.value}})}
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
//                         <input
//                           type="text"
//                           placeholder="70 kg"
//                           value={newPrescription.vitalSigns.weight}
//                           onChange={(e) => setNewPrescription({...newPrescription, vitalSigns: {...newPrescription.vitalSigns, weight: e.target.value}})}
//                           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Symptoms */}
//                   <div>
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                         <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
//                         Symptoms
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={addSymptom}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                       >
//                         <Plus className="w-4 h-4 mr-1" />
//                         Add Symptom
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       {newPrescription.symptoms.map((symptom, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <input
//                             type="text"
//                             placeholder="Enter symptom..."
//                             value={symptom}
//                             onChange={(e) => updateSymptom(index, e.target.value)}
//                             className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                           />
//                           {newPrescription.symptoms.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeSymptom(index)}
//                               className="text-red-600 hover:text-red-800"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Medications */}
//                   <div>
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                         <Pill className="w-5 h-5 mr-2 text-green-500" />
//                         Medications
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={addMedication}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                       >
//                         <Plus className="w-4 h-4 mr-1" />
//                         Add Medication
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       {newPrescription.medications.map((med, index) => (
//                         <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                           <div className="flex items-center justify-between mb-3">
//                             <h4 className="font-medium text-gray-900">Medication {index + 1}</h4>
//                             {newPrescription.medications.length > 1 && (
//                               <button
//                                 type="button"
//                                 onClick={() => removeMedication(index)}
//                                 className="text-red-600 hover:text-red-800"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., Metformin"
//                                 value={med.name}
//                                 onChange={(e) => updateMedication(index, 'name', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., 500mg"
//                                 value={med.strength}
//                                 onChange={(e) => updateMedication(index, 'strength', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
//                               <select
//                                 value={med.frequency}
//                                 onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               >
//                                 <option value="">Select frequency</option>
//                                 <option value="Once daily">Once daily</option>
//                                 <option value="Twice daily">Twice daily</option>
//                                 <option value="Three times daily">Three times daily</option>
//                                 <option value="Four times daily">Four times daily</option>
//                                 <option value="As needed">As needed</option>
//                                 <option value="Weekly">Weekly</option>
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., 30 days"
//                                 value={med.duration}
//                                 onChange={(e) => updateMedication(index, 'duration', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., Take with meals"
//                                 value={med.instructions}
//                                 onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Diagnosis & Notes */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
//                     <textarea
//                       value={newPrescription.diagnosis}
//                       onChange={(e) => setNewPrescription({...newPrescription, diagnosis: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
//                       placeholder="Enter diagnosis..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
//                     <textarea
//                       value={newPrescription.notes}
//                       onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-24"
//                       placeholder="Additional notes, observations, or instructions..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Next Visit Date</label>
//                     <input
//                       type="date"
//                       value={newPrescription.nextVisit}
//                       onChange={(e) => setNewPrescription({...newPrescription, nextVisit: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
//                   <button 
//                     onClick={handleSavePrescription}
//                     className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
//                   >
//                     <Save className="w-5 h-5" />
//                     <span>Save & Send to Family Dashboard</span>
//                   </button>
//                   <button 
//                     onClick={() => setShowNewPrescription(false)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Prescription Detail Modal */}
//         {selectedPrescription && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold mb-1">Prescription Details</h2>
//                     <p className="text-blue-100">{selectedPrescription.patientName} • {formatDate(selectedPrescription.date)}</p>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedPrescription(null)}
//                     className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
//                 {/* Visit Information */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Visit Information</h3>
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                       <div><span className="text-blue-700">Type:</span> <span className="font-medium ml-1">{selectedPrescription.type}</span></div>
//                       <div><span className="text-blue-700">Urgency:</span> <span className="font-medium ml-1 capitalize">{selectedPrescription.urgency}</span></div>
//                       <div><span className="text-blue-700">Reason:</span> <span className="font-medium ml-1">{selectedPrescription.visitReason}</span></div>
//                       <div><span className="text-blue-700">Next Visit:</span> <span className="font-medium ml-1">{formatDate(selectedPrescription.nextVisit)}</span></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Vital Signs */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <Activity className="w-5 h-5 mr-2 text-red-500" />
//                     Vital Signs
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-red-50 rounded-lg p-3 text-center">
//                       <p className="text-xs text-red-700 mb-1">Blood Pressure</p>
//                       <p className="font-bold text-red-900">{selectedPrescription.vitalSigns.bloodPressure}</p>
//                       <p className="text-xs text-red-600">mmHg</p>
//                     </div>
//                     <div className="bg-blue-50 rounded-lg p-3 text-center">
//                       <p className="text-xs text-blue-700 mb-1">Heart Rate</p>
//                       <p className="font-bold text-blue-900">{selectedPrescription.vitalSigns.heartRate}</p>
//                       <p className="text-xs text-blue-600">bpm</p>
//                     </div>
//                     <div className="bg-orange-50 rounded-lg p-3 text-center">
//                       <p className="text-xs text-orange-700 mb-1">Blood Sugar</p>
//                       <p className="font-bold text-orange-900">{selectedPrescription.vitalSigns.bloodSugar}</p>
//                       <p className="text-xs text-orange-600">mg/dL</p>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-3 text-center">
//                       <p className="text-xs text-green-700 mb-1">Weight</p>
//                       <p className="font-bold text-green-900">{selectedPrescription.vitalSigns.weight}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Symptoms */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
//                     Reported Symptoms
//                   </h3>
//                   <div className="bg-orange-50 rounded-lg p-4">
//                     <ul className="list-disc list-inside space-y-1">
//                       {selectedPrescription.symptoms.map((symptom, index) => (
//                         <li key={index} className="text-orange-800">{symptom}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Medications */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <Pill className="w-5 h-5 mr-2 text-green-500" />
//                     Prescribed Medications ({selectedPrescription.medications.length})
//                   </h3>
//                   <div className="space-y-3">
//                     {selectedPrescription.medications.map((med, index) => (
//                       <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-bold text-green-900">{med.name}</h4>
//                           <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{med.strength}</span>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800 mb-2">
//                           <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
//                           <div><span className="font-medium">Duration:</span> {med.duration}</div>
//                         </div>
//                         <p className="text-sm text-green-700 italic">{med.instructions}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Diagnosis & Notes */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <FileText className="w-5 h-5 mr-2 text-blue-500" />
//                     Diagnosis & Clinical Notes
//                   </h3>
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <div className="mb-3">
//                       <h4 className="font-medium text-blue-900 mb-1">Diagnosis:</h4>
//                       <p className="text-blue-800">{selectedPrescription.diagnosis}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-blue-900 mb-1">Clinical Notes:</h4>
//                       <p className="text-blue-800">{selectedPrescription.notes}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex space-x-3 pt-6 border-t border-gray-200">
//                   <button 
//                     onClick={() => exportPrescription(selectedPrescription)}
//                     className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
//                   >
//                     <Download className="w-5 h-5" />
//                     <span>Export PDF</span>
//                   </button>
//                   <button 
//                     onClick={() => sendToFamily(selectedPrescription)}
//                     className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
//                   >
//                     <Send className="w-5 h-5" />
//                     <span>Send to Family</span>
//                   </button>
//                   <button 
//                     onClick={() => setSelectedPrescription(null)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

// export default DoctorPrescriptions;






// import React, { useState, useEffect } from 'react';
// import { 
//   Pill, 
//   Search, 
//   Plus, 
//   Calendar, 
//   FileText, 
//   Download, 
//   Eye, 
//   AlertTriangle, 
//   CheckCircle, 
//   Send,
//   X,
//   Save,
//   Activity,
//   Heart,
//   Stethoscope,
//   AlertCircle,
//   Loader
// } from 'lucide-react';

// const DoctorPrescriptions = () => {
//   const [selectedPatient, setSelectedPatient] = useState('all');
//   const [selectedTimeframe, setSelectedTimeframe] = useState('week');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showNewPrescription, setShowNewPrescription] = useState(false);
//   const [selectedPrescription, setSelectedPrescription] = useState(null);
  
//   // Database states
//   const [patients, setPatients] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch patients from database
//   useEffect(() => {
//     fetchPatients();
//     fetchPrescriptions();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/patients'); // Adjust your API endpoint
//       if (!response.ok) throw new Error('Failed to fetch patients');
//       const data = await response.json();
//       setPatients(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching patients:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await fetch('/api/prescriptions'); // Adjust your API endpoint
//       if (!response.ok) throw new Error('Failed to fetch prescriptions');
//       const data = await response.json();
//       setPrescriptions(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching prescriptions:', err);
//     }
//   };

//   const [newPrescription, setNewPrescription] = useState({
//     patientId: '',
//     date: new Date().toISOString().split('T')[0],
//     diagnosis: '',
//     medications: [{ 
//       name: '', 
//       strength: '', 
//       route: 'Oral',
//       frequency: '', 
//       duration: '', 
//       instructions: '',
//       refills: 0,
//       genericAllowed: true
//     }],
//     pharmacy: '',
//     doctorNotes: ''
//   });

//   const addMedication = () => {
//     setNewPrescription(prev => ({
//       ...prev,
//       medications: [...prev.medications, { 
//         name: '', 
//         strength: '', 
//         route: 'Oral',
//         frequency: '', 
//         duration: '', 
//         instructions: '',
//         refills: 0,
//         genericAllowed: true
//       }]
//     }));
//   };

//   const updateMedication = (index, field, value) => {
//     setNewPrescription(prev => ({
//       ...prev,
//       medications: prev.medications.map((med, i) => 
//         i === index ? { ...med, [field]: value } : med
//       )
//     }));
//   };

//   const removeMedication = (index) => {
//     if (newPrescription.medications.length > 1) {
//       setNewPrescription(prev => ({
//         ...prev,
//         medications: prev.medications.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const filteredPrescriptions = prescriptions.filter(prescription => {
//     const matchesSearch = prescription.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          prescription.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesPatient = selectedPatient === 'all' || prescription.patientId === selectedPatient;
    
//     const prescriptionDate = new Date(prescription.date);
//     const today = new Date();
//     const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
    
//     const matchesTimeframe = selectedTimeframe === 'all' ||
//                             (selectedTimeframe === 'week' && daysDiff <= 7) ||
//                             (selectedTimeframe === 'month' && daysDiff <= 30) ||
//                             (selectedTimeframe === 'quarter' && daysDiff <= 90);
    
//     return matchesSearch && matchesPatient && matchesTimeframe;
//   });

//   const handleSavePrescription = async () => {
//     try {
//       const selectedPatientData = patients.find(p => p._id === newPrescription.patientId);
      
//       const prescriptionData = {
//         ...newPrescription,
//         patientName: selectedPatientData?.name,
//         patientAge: selectedPatientData?.age,
//         status: 'Active'
//       };

//       const response = await fetch('/api/prescriptions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(prescriptionData)
//       });

//       if (!response.ok) throw new Error('Failed to save prescription');
      
//       await fetchPrescriptions(); // Refresh the list
//       setShowNewPrescription(false);
      
//       // Reset form
//       setNewPrescription({
//         patientId: '',
//         date: new Date().toISOString().split('T')[0],
//         diagnosis: '',
//         medications: [{ 
//           name: '', 
//           strength: '', 
//           route: 'Oral',
//           frequency: '', 
//           duration: '', 
//           instructions: '',
//           refills: 0,
//           genericAllowed: true
//         }],
//         pharmacy: '',
//         doctorNotes: ''
//       });
      
//       alert('Prescription saved successfully!');
//     } catch (err) {
//       console.error('Error saving prescription:', err);
//       alert('Failed to save prescription. Please try again.');
//     }
//   };

//   const exportPrescription = (prescription) => {
//     console.log('Exporting prescription:', prescription._id);
//     alert(`Generating PDF for prescription ${prescription._id}`);
//   };

//   const sendToFamily = (prescription) => {
//     console.log('Sending prescription to family dashboard:', prescription._id);
//     alert(`Prescription sent to ${prescription.patientName}'s family members`);
//   };

//   // Stats
//   const totalPrescriptions = prescriptions.length;
//   const activePrescriptions = prescriptions.filter(p => p.status === 'Active').length;
//   const thisWeekPrescriptions = prescriptions.filter(p => {
//     const prescriptionDate = new Date(p.date);
//     const today = new Date();
//     const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
//     return daysDiff <= 7;
//   }).length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading patients and prescriptions...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <p className="text-red-600 mb-4">Error: {error}</p>
//           <button 
//             onClick={() => { fetchPatients(); fetchPrescriptions(); }}
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Prescription Management</h1>
//             <p className="text-gray-600">Create and manage patient prescriptions</p>
//           </div>
          
//           <button 
//             onClick={() => setShowNewPrescription(true)}
//             className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
//           >
//             <Plus className="w-5 h-5" />
//             <span>New Prescription</span>
//           </button>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Prescriptions</p>
//                 <p className="text-2xl font-bold text-blue-600">{totalPrescriptions}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Active Prescriptions</p>
//                 <p className="text-2xl font-bold text-green-600">{activePrescriptions}</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">This Week</p>
//                 <p className="text-2xl font-bold text-purple-600">{thisWeekPrescriptions}</p>
//               </div>
//               <Calendar className="w-8 h-8 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="text"
//                   placeholder="Search prescriptions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <select
//                 value={selectedPatient}
//                 onChange={(e) => setSelectedPatient(e.target.value)}
//                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Patients</option>
//                 {patients.map(patient => (
//                   <option key={patient._id} value={patient._id}>{patient.name}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="week">This Week</option>
//                 <option value="month">This Month</option>
//                 <option value="quarter">Last 3 Months</option>
//                 <option value="all">All Time</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Prescriptions List */}
//         <div className="space-y-6">
//           {filteredPrescriptions.map(prescription => (
//             <div key={prescription._id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-l-blue-500 p-6 border border-white/20">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                     <Stethoscope className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{prescription.patientName}</h3>
//                     <p className="text-gray-600">Age: {prescription.patientAge}</p>
//                     <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{formatDate(prescription.date)}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
//                   {prescription.status}
//                 </div>
//               </div>

//               {/* Diagnosis */}
//               <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                 <h4 className="font-semibold text-blue-900 mb-2">Diagnosis</h4>
//                 <p className="text-blue-800">{prescription.diagnosis}</p>
//               </div>

//               {/* Medications */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
//                   <Pill className="w-4 h-4 mr-2 text-green-600" />
//                   Medications ({prescription.medications?.length || 0})
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {prescription.medications?.map((med, index) => (
//                     <div key={index} className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
//                       <div className="flex justify-between items-start mb-1">
//                         <h5 className="font-medium text-green-900">{med.name}</h5>
//                         <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{med.strength}</span>
//                       </div>
//                       <p className="text-sm text-green-700 mb-1">
//                         <span className="font-medium">Route:</span> {med.route} | 
//                         <span className="font-medium ml-2">Frequency:</span> {med.frequency}
//                       </p>
//                       <p className="text-sm text-green-700 mb-1">
//                         <span className="font-medium">Duration:</span> {med.duration} | 
//                         <span className="font-medium ml-2">Refills:</span> {med.refills}
//                       </p>
//                       <p className="text-xs text-green-700 italic">{med.instructions}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Pharmacy & Notes */}
//               {prescription.pharmacy && (
//                 <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-gray-700">
//                     <span className="font-medium">Pharmacy:</span> {prescription.pharmacy}
//                   </p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex items-center justify-end space-x-2">
//                 <button 
//                   onClick={() => setSelectedPrescription(prescription)}
//                   className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                 >
//                   <Eye className="w-4 h-4" />
//                   <span>View</span>
//                 </button>
//                 <button 
//                   onClick={() => exportPrescription(prescription)}
//                   className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                 >
//                   <Download className="w-4 h-4" />
//                   <span>Export PDF</span>
//                 </button>
//                 <button 
//                   onClick={() => sendToFamily(prescription)}
//                   className="flex items-center space-x-1 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//                 >
//                   <Send className="w-4 h-4" />
//                   <span>Send to Family</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredPrescriptions.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FileText className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No prescriptions found</h3>
//             <p className="text-gray-600">Try adjusting your search criteria or create a new prescription</p>
//           </div>
//         )}

//         {/* New Prescription Modal */}
//         {showNewPrescription && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Pill className="w-6 h-6" />
//                     <h2 className="text-2xl font-bold">New Prescription</h2>
//                   </div>
//                   <button 
//                     onClick={() => setShowNewPrescription(false)}
//                     className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
//                 <div className="space-y-6">
//                   {/* Patient Selection */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
//                       <select
//                         value={newPrescription.patientId}
//                         onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         required
//                       >
//                         <option value="">Select Patient</option>
//                         {patients.map(patient => (
//                           <option key={patient._id} value={patient._id}>
//                             {patient.name} - {patient.age} yrs - {patient.condition}
//                           </option>
//                         ))}
//                       </select>
//                       {newPrescription.patientId && (
//                         <p className="text-xs text-red-600 mt-1">
//                           Allergies: {patients.find(p => p._id === newPrescription.patientId)?.allergies || 'None'}
//                         </p>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
//                       <input
//                         type="date"
//                         value={newPrescription.date}
//                         onChange={(e) => setNewPrescription({...newPrescription, date: e.target.value})}
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Diagnosis */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
//                     <textarea
//                       value={newPrescription.diagnosis}
//                       onChange={(e) => setNewPrescription({...newPrescription, diagnosis: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
//                       placeholder="Enter diagnosis..."
//                       required
//                     />
//                   </div>

//                   {/* Medications */}
//                   <div>
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                         <Pill className="w-5 h-5 mr-2 text-green-500" />
//                         Medications *
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={addMedication}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                       >
//                         <Plus className="w-4 h-4 mr-1" />
//                         Add Medication
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       {newPrescription.medications.map((med, index) => (
//                         <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                           <div className="flex items-center justify-between mb-3">
//                             <h4 className="font-medium text-gray-900">Medication {index + 1}</h4>
//                             {newPrescription.medications.length > 1 && (
//                               <button
//                                 type="button"
//                                 onClick={() => removeMedication(index)}
//                                 className="text-red-600 hover:text-red-800"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., Metformin"
//                                 value={med.name}
//                                 onChange={(e) => updateMedication(index, 'name', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Strength *</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., 500mg"
//                                 value={med.strength}
//                                 onChange={(e) => updateMedication(index, 'strength', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
//                               <select
//                                 value={med.route}
//                                 onChange={(e) => updateMedication(index, 'route', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               >
//                                 <option value="Oral">Oral</option>
//                                 <option value="Injection">Injection</option>
//                                 <option value="Topical">Topical</option>
//                                 <option value="Inhalation">Inhalation</option>
//                                 <option value="Eye drops">Eye drops</option>
//                                 <option value="Ear drops">Ear drops</option>
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
//                               <select
//                                 value={med.frequency}
//                                 onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               >
//                                 <option value="">Select frequency</option>
//                                 <option value="Once daily">Once daily</option>
//                                 <option value="Twice daily">Twice daily</option>
//                                 <option value="Three times daily">Three times daily</option>
//                                 <option value="Four times daily">Four times daily</option>
//                                 <option value="As needed">As needed</option>
//                                 <option value="Weekly">Weekly</option>
//                                 <option value="Every other day">Every other day</option>
//                               </select>
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., 30 days"
//                                 value={med.duration}
//                                 onChange={(e) => updateMedication(index, 'duration', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
//                               <input
//                                 type="number"
//                                 min="0"
//                                 value={med.refills}
//                                 onChange={(e) => updateMedication(index, 'refills', parseInt(e.target.value))}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                               />
//                             </div>
//                             <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Instructions *</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g., Take with meals"
//                                 value={med.instructions}
//                                 onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 required
//                               />
//                             </div>
//                             <div className="md:col-span-2">
//                               <label className="flex items-center space-x-2">
//                                 <input
//                                   type="checkbox"
//                                   checked={med.genericAllowed}
//                                   onChange={(e) => updateMedication(index, 'genericAllowed', e.target.checked)}
//                                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                 />
//                                 <span className="text-sm text-gray-700">Generic substitution allowed</span>
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Pharmacy */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy (Optional)</label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Apollo Pharmacy, Main Street"
//                       value={newPrescription.pharmacy}
//                       onChange={(e) => setNewPrescription({...newPrescription, pharmacy: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>

//                   {/* Doctor Notes */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
//                     <textarea
//                       value={newPrescription.doctorNotes}
//                       onChange={(e) => setNewPrescription({...newPrescription, doctorNotes: e.target.value})}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
//                       placeholder="Any additional instructions or notes..."
//                     />
//                   </div>
//                 </div>
                
//                 <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
//                   <button 
//                     onClick={handleSavePrescription}
//                     className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
//                   >
//                     <Save className="w-5 h-5" />
//                     <span>Save Prescription</span>
//                   </button>
//                   <button 
//                     onClick={() => setShowNewPrescription(false)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Prescription Detail Modal */}
//         {selectedPrescription && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold mb-1">Prescription Details</h2>
//                     <p className="text-blue-100">{selectedPrescription.patientName} • {formatDate(selectedPrescription.date)}</p>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedPrescription(null)}
//                     className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
//                 {/* Patient Information */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                       <div><span className="text-blue-700">Name:</span> <span className="font-medium ml-1">{selectedPrescription.patientName}</span></div>
//                       <div><span className="text-blue-700">Age:</span> <span className="font-medium ml-1">{selectedPrescription.patientAge} years</span></div>
//                       <div><span className="text-blue-700">Date:</span> <span className="font-medium ml-1">{formatDate(selectedPrescription.date)}</span></div>
//                       <div><span className="text-blue-700">Status:</span> <span className="font-medium ml-1">{selectedPrescription.status}</span></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Diagnosis */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <FileText className="w-5 h-5 mr-2 text-blue-500" />
//                     Diagnosis
//                   </h3>
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <p className="text-blue-800">{selectedPrescription.diagnosis}</p>
//                   </div>
//                 </div>

//                 {/* Medications */}
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                     <Pill className="w-5 h-5 mr-2 text-green-500" />
//                     Prescribed Medications ({selectedPrescription.medications?.length || 0})
//                   </h3>
//                   <div className="space-y-3">
//                     {selectedPrescription.medications?.map((med, index) => (
//                       <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-bold text-green-900">{med.name}</h4>
//                           <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{med.strength}</span>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800 mb-2">
//                           <div><span className="font-medium">Route:</span> {med.route}</div>
//                           <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
//                           <div><span className="font-medium">Duration:</span> {med.duration}</div>
//                           <div><span className="font-medium">Refills:</span> {med.refills}</div>
//                         </div>
//                         <p className="text-sm text-green-700 italic mb-1">{med.instructions}</p>
//                         {med.genericAllowed && (
//                           <p className="text-xs text-green-600">✓ Generic substitution allowed</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Pharmacy & Notes */}
//                 {selectedPrescription.pharmacy && (
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">Pharmacy</h3>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-gray-700">{selectedPrescription.pharmacy}</p>
//                     </div>
//                   </div>
//                 )}

//                 {selectedPrescription.doctorNotes && (
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-3">Additional Notes</h3>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-gray-700">{selectedPrescription.doctorNotes}</p>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="flex space-x-3 pt-6 border-t border-gray-200">
//                   <button 
//                     onClick={() => exportPrescription(selectedPrescription)}
//                     className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
//                   >
//                     <Download className="w-5 h-5" />
//                     <span>Export PDF</span>
//                   </button>
//                   <button 
//                     onClick={() => sendToFamily(selectedPrescription)}
//                     className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
//                   >
//                     <Send className="w-5 h-5" />
//                     <span>Send to Family</span>
//                   </button>
//                   <button 
//                     onClick={() => setSelectedPrescription(null)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

// export default DoctorPrescriptions;



import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Send,
  X,
  Save,
  Activity,
  Heart,
  Stethoscope,
  AlertCircle,
  Loader
} from 'lucide-react';

const DoctorPrescriptions = () => {
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  
  // Database states
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API URL - adjust to your backend URL
  const API_URL = 'http://localhost:5000/api';

  // Get authentication token
  const getAuthToken = () => {
    // Adjust based on how you store your token
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Create headers with authentication
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  });

  // Fetch patients from database
  useEffect(() => {
    fetchPatients();
    fetchPrescriptions();
  }, []);

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
      // Handle both formats: {data: [...]} or [...]
      const patientsData = result.data || result;
      setPatients(Array.isArray(patientsData) ? patientsData : []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching patients:', err);
      setPatients([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`${API_URL}/prescriptions`, {
        headers: getAuthHeaders()
      });
      
      if (response.status === 401) {
        setError('Unauthorized. Please login again.');
        return;
      }
      
      if (!response.ok) throw new Error('Failed to fetch prescriptions');
      
      const result = await response.json();
      // Handle both formats: {data: [...]} or [...]
      const prescriptionsData = result.data || result;
      setPrescriptions(Array.isArray(prescriptionsData) ? prescriptionsData : []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching prescriptions:', err);
      setPrescriptions([]); // Set empty array on error
    }
  };

  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    medications: [{ 
      name: '', 
      strength: '', 
      route: 'Oral',
      frequency: '', 
      duration: '', 
      instructions: '',
      refills: 0,
      genericAllowed: true
    }],
    pharmacy: '',
    doctorNotes: ''
  });

  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { 
        name: '', 
        strength: '', 
        route: 'Oral',
        frequency: '', 
        duration: '', 
        instructions: '',
        refills: 0,
        genericAllowed: true
      }]
    }));
  };

  const updateMedication = (index, field, value) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedication = (index) => {
    if (newPrescription.medications.length > 1) {
      setNewPrescription(prev => ({
        ...prev,
        medications: prev.medications.filter((_, i) => i !== index)
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPatient = selectedPatient === 'all' || prescription.patientId === selectedPatient;
    
    const prescriptionDate = new Date(prescription.date);
    const today = new Date();
    const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
    
    const matchesTimeframe = selectedTimeframe === 'all' ||
                            (selectedTimeframe === 'week' && daysDiff <= 7) ||
                            (selectedTimeframe === 'month' && daysDiff <= 30) ||
                            (selectedTimeframe === 'quarter' && daysDiff <= 90);
    
    return matchesSearch && matchesPatient && matchesTimeframe;
  });

  const handleSavePrescription = async () => {
    try {
      // Validation
      if (!newPrescription.patientId) {
        alert('Please select a patient');
        return;
      }
      if (!newPrescription.diagnosis) {
        alert('Please enter a diagnosis');
        return;
      }
      if (newPrescription.medications.some(med => !med.name || !med.strength || !med.frequency || !med.duration || !med.instructions)) {
        alert('Please fill in all medication fields');
        return;
      }

      const selectedPatientData = patients.find(p => p._id === newPrescription.patientId);
      
      const prescriptionData = {
        ...newPrescription,
        patientName: selectedPatientData?.name,
        patientAge: selectedPatientData?.age,
        status: 'Active'
      };

      const response = await fetch(`${API_URL}/prescriptions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(prescriptionData)
      });

      if (response.status === 401) {
        alert('Unauthorized. Please login again.');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save prescription');
      }
      
      await fetchPrescriptions();
      setShowNewPrescription(false);
      
      // Reset form
      setNewPrescription({
        patientId: '',
        date: new Date().toISOString().split('T')[0],
        diagnosis: '',
        medications: [{ 
          name: '', 
          strength: '', 
          route: 'Oral',
          frequency: '', 
          duration: '', 
          instructions: '',
          refills: 0,
          genericAllowed: true
        }],
        pharmacy: '',
        doctorNotes: ''
      });
      
      alert('Prescription saved successfully!');
    } catch (err) {
      console.error('Error saving prescription:', err);
      alert(`Failed to save prescription: ${err.message}`);
    }
  };

  const exportPrescription = async (prescription) => {
    try {
      const response = await fetch(`${API_URL}/prescriptions/${prescription._id}/export`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prescription_${prescription.patientName}_${prescription.date}.pdf`;
        a.click();
      } else {
        alert('PDF export feature coming soon!');
      }
    } catch (err) {
      console.error('Error exporting prescription:', err);
      alert('Failed to export prescription');
    }
  };

  const sendToFamily = async (prescription) => {
    try {
      const response = await fetch(`${API_URL}/prescriptions/${prescription._id}/send-to-family`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      if (response.status === 401) {
        alert('Unauthorized. Please login again.');
        return;
      }
      
      if (response.ok) {
        alert(`Prescription sent to ${prescription.patientName}'s family members successfully!`);
      } else {
        throw new Error('Failed to send prescription');
      }
    } catch (err) {
      console.error('Error sending to family:', err);
      alert('Failed to send prescription to family');
    }
  };

  const deletePrescription = async (prescriptionId) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/prescriptions/${prescriptionId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.status === 401) {
        alert('Unauthorized. Please login again.');
        return;
      }
      
      if (response.ok) {
        await fetchPrescriptions();
        alert('Prescription deleted successfully');
      } else {
        throw new Error('Failed to delete prescription');
      }
    } catch (err) {
      console.error('Error deleting prescription:', err);
      alert('Failed to delete prescription');
    }
  };

  // Stats
  const totalPrescriptions = prescriptions.length;
  const activePrescriptions = prescriptions.filter(p => p.status === 'Active').length;
  const thisWeekPrescriptions = prescriptions.filter(p => {
    const prescriptionDate = new Date(p.date);
    const today = new Date();
    const daysDiff = (today - prescriptionDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading patients and prescriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => { setError(null); fetchPatients(); fetchPrescriptions(); }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Prescription Management</h1>
            <p className="text-gray-600">Create and manage patient prescriptions</p>
          </div>
          
          <button 
            onClick={() => setShowNewPrescription(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>New Prescription</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Prescriptions</p>
                <p className="text-2xl font-bold text-blue-600">{totalPrescriptions}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Prescriptions</p>
                <p className="text-2xl font-bold text-green-600">{activePrescriptions}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-purple-600">{thisWeekPrescriptions}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Patients</option>
                {patients.map(patient => (
                  <option key={patient._id} value={patient._id}>{patient.name}</option>
                ))}
              </select>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">Last 3 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-6">
          {filteredPrescriptions.map(prescription => (
            <div key={prescription._id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-l-blue-500 p-6 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{prescription.patientName}</h3>
                    <p className="text-gray-600">Age: {prescription.patientAge}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(prescription.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription.status)}`}>
                  {prescription.status}
                </div>
              </div>

              {/* Diagnosis */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">Diagnosis</h4>
                <p className="text-blue-800">{prescription.diagnosis}</p>
              </div>

              {/* Medications */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Pill className="w-4 h-4 mr-2 text-green-600" />
                  Medications ({prescription.medications?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prescription.medications?.map((med, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-green-900">{med.name}</h5>
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{med.strength}</span>
                      </div>
                      <p className="text-sm text-green-700 mb-1">
                        <span className="font-medium">Route:</span> {med.route} | 
                        <span className="font-medium ml-2">Frequency:</span> {med.frequency}
                      </p>
                      <p className="text-sm text-green-700 mb-1">
                        <span className="font-medium">Duration:</span> {med.duration} | 
                        <span className="font-medium ml-2">Refills:</span> {med.refills}
                      </p>
                      <p className="text-xs text-green-700 italic">{med.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pharmacy & Notes */}
              {prescription.pharmacy && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Pharmacy:</span> {prescription.pharmacy}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2">
                <button 
                  onClick={() => setSelectedPrescription(prescription)}
                  className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => exportPrescription(prescription)}
                  className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
                <button 
                  onClick={() => sendToFamily(prescription)}
                  className="flex items-center space-x-1 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Family</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or create a new prescription</p>
          </div>
        )}

        {/* New Prescription Modal */}
        {showNewPrescription && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Pill className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">New Prescription</h2>
                  </div>
                  <button 
                    onClick={() => setShowNewPrescription(false)}
                    className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
                <div className="space-y-6">
                  {/* Patient Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                      <select
                        value={newPrescription.patientId}
                        onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Patient</option>
                        {patients.map(patient => (
                          <option key={patient._id} value={patient._id}>
                            {patient.name} - {patient.age} yrs{patient.condition ? ` - ${patient.condition}` : ''}
                          </option>
                        ))}
                      </select>
                      {newPrescription.patientId && (
                        <p className="text-xs text-red-600 mt-1">
                          Allergies: {patients.find(p => p._id === newPrescription.patientId)?.allergies || 'None'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                      <input
                        type="date"
                        value={newPrescription.date}
                        onChange={(e) => setNewPrescription({...newPrescription, date: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Diagnosis */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
                    <textarea
                      value={newPrescription.diagnosis}
                      onChange={(e) => setNewPrescription({...newPrescription, diagnosis: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Enter diagnosis..."
                      required
                    />
                  </div>

                  {/* Medications */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-green-500" />
                        Medications *
                      </h3>
                      <button
                        type="button"
                        onClick={addMedication}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Medication
                      </button>
                    </div>
                    <div className="space-y-4">
                      {newPrescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Medication {index + 1}</h4>
                            {newPrescription.medications.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeMedication(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                              <input
                                type="text"
                                placeholder="e.g., Metformin"
                                value={med.name}
                                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Strength *</label>
                              <input
                                type="text"
                                placeholder="e.g., 500mg"
                                value={med.strength}
                                onChange={(e) => updateMedication(index, 'strength', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
                              <select
                                value={med.route}
                                onChange={(e) => updateMedication(index, 'route', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="Oral">Oral</option>
                                <option value="Injection">Injection</option>
                                <option value="Topical">Topical</option>
                                <option value="Inhalation">Inhalation</option>
                                <option value="Eye drops">Eye drops</option>
                                <option value="Ear drops">Ear drops</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
                              <select
                                value={med.frequency}
                                onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="">Select frequency</option>
                                <option value="Once daily">Once daily</option>
                                <option value="Twice daily">Twice daily</option>
                                <option value="Three times daily">Three times daily</option>
                                <option value="Four times daily">Four times daily</option>
                                <option value="As needed">As needed</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Every other day">Every other day</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                              <input
                                type="text"
                                placeholder="e.g., 30 days"
                                value={med.duration}
                                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                              <input
                                type="number"
                                min="0"
                                value={med.refills}
                                onChange={(e) => updateMedication(index, 'refills', parseInt(e.target.value) || 0)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions *</label>
                              <input
                                type="text"
                                placeholder="e.g., Take with meals"
                                value={med.instructions}
                                onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={med.genericAllowed}
                                  onChange={(e) => updateMedication(index, 'genericAllowed', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Generic substitution allowed</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pharmacy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Apollo Pharmacy, Main Street"
                      value={newPrescription.pharmacy}
                      onChange={(e) => setNewPrescription({...newPrescription, pharmacy: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Doctor Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                    <textarea
                      value={newPrescription.doctorNotes}
                      onChange={(e) => setNewPrescription({...newPrescription, doctorNotes: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Any additional instructions or notes..."
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={handleSavePrescription}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Prescription</span>
                  </button>
                  <button 
                    onClick={() => setShowNewPrescription(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prescription Detail Modal */}
        {selectedPrescription && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Prescription Details</h2>
                    <p className="text-blue-100">{selectedPrescription.patientName} • {formatDate(selectedPrescription.date)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPrescription(null)}
                    className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-blue-700">Name:</span> <span className="font-medium ml-1">{selectedPrescription.patientName}</span></div>
                      <div><span className="text-blue-700">Age:</span> <span className="font-medium ml-1">{selectedPrescription.patientAge} years</span></div>
                      <div><span className="text-blue-700">Date:</span> <span className="font-medium ml-1">{formatDate(selectedPrescription.date)}</span></div>
                      <div><span className="text-blue-700">Status:</span> <span className="font-medium ml-1">{selectedPrescription.status}</span></div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-500" />
                    Diagnosis
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800">{selectedPrescription.diagnosis}</p>
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-green-500" />
                    Prescribed Medications ({selectedPrescription.medications?.length || 0})
                  </h3>
                  <div className="space-y-3">
                    {selectedPrescription.medications?.map((med, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-green-900">{med.name}</h4>
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{med.strength}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800 mb-2">
                          <div><span className="font-medium">Route:</span> {med.route}</div>
                          <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
                          <div><span className="font-medium">Duration:</span> {med.duration}</div>
                          <div><span className="font-medium">Refills:</span> {med.refills}</div>
                        </div>
                        <p className="text-sm text-green-700 italic mb-1">{med.instructions}</p>
                        {med.genericAllowed && (
                          <p className="text-xs text-green-600">✓ Generic substitution allowed</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pharmacy & Notes */}
                {selectedPrescription.pharmacy && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Pharmacy</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedPrescription.pharmacy}</p>
                    </div>
                  </div>
                )}

                {selectedPrescription.doctorNotes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Additional Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedPrescription.doctorNotes}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => exportPrescription(selectedPrescription)}
                    className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5" />
                    <span>Export PDF</span>
                  </button>
                  <button 
                    onClick={() => sendToFamily(selectedPrescription)}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send to Family</span>
                  </button>
                  <button 
                    onClick={() => setSelectedPrescription(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;