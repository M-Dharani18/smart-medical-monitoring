// import React, { useState } from 'react';
// import { 
//   Activity, 
//   Heart, 
//   Thermometer, 
//   Droplets, 
//   Wind, 
//   TrendingUp, 
//   TrendingDown, 
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   Calendar,
//   RefreshCw,
//   BarChart3,
//   Download,
//   Filter,
//   Search,
//   User,
//   AlertCircle,
//   Eye,
//   FileText,
//   ArrowUpRight,
//   ArrowDownRight
// } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// const DoctorVitals = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('7days');
//   const [selectedPatient, setSelectedPatient] = useState('all');
//   const [selectedVital, setSelectedVital] = useState('bloodPressure');
//   const [viewMode, setViewMode] = useState('overview'); // overview, detailed, export

//   // Sample patients vitals data
//   const patientsVitals = [
//     {
//       id: 1,
//       name: "Eleanor Johnson",
//       photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
//       age: 68,
//       condition: "Type 2 Diabetes, Hypertension",
//       severity: "moderate",
//       lastReading: "2 hours ago",
//       vitals: {
//         bloodPressure: { current: "125/80", status: "normal", trend: "stable" },
//         heartRate: { current: 72, status: "normal", trend: "down" },
//         bloodSugar: { current: 145, status: "high", trend: "up" },
//         temperature: { current: 98.6, status: "normal", trend: "stable" },
//         oxygen: { current: 98, status: "normal", trend: "stable" }
//       },
//       alerts: 1,
//       compliance: 95
//     },
//     {
//       id: 2,
//       name: "Robert Chen",
//       photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       age: 45,
//       condition: "Hypertension, High Cholesterol",
//       severity: "critical",
//       lastReading: "1 hour ago",
//       vitals: {
//         bloodPressure: { current: "165/95", status: "high", trend: "up" },
//         heartRate: { current: 88, status: "elevated", trend: "up" },
//         bloodSugar: { current: 110, status: "normal", trend: "stable" },
//         temperature: { current: 99.1, status: "elevated", trend: "up" },
//         oxygen: { current: 96, status: "low", trend: "down" }
//       },
//       alerts: 3,
//       compliance: 87
//     },
//     {
//       id: 3,
//       name: "Maria Garcia",
//       photo: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
//       age: 52,
//       condition: "Type 1 Diabetes",
//       severity: "stable",
//       lastReading: "30 minutes ago",
//       vitals: {
//         bloodPressure: { current: "118/75", status: "normal", trend: "stable" },
//         heartRate: { current: 68, status: "normal", trend: "stable" },
//         bloodSugar: { current: 128, status: "normal", trend: "down" },
//         temperature: { current: 98.4, status: "normal", trend: "stable" },
//         oxygen: { current: 99, status: "normal", trend: "stable" }
//       },
//       alerts: 0,
//       compliance: 98
//     },
//     {
//       id: 4,
//       name: "John Davis",
//       photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//       age: 73,
//       condition: "Heart Disease, Diabetes",
//       severity: "moderate",
//       lastReading: "45 minutes ago",
//       vitals: {
//         bloodPressure: { current: "135/85", status: "elevated", trend: "up" },
//         heartRate: { current: 65, status: "normal", trend: "stable" },
//         bloodSugar: { current: 142, status: "elevated", trend: "stable" },
//         temperature: { current: 98.2, status: "normal", trend: "stable" },
//         oxygen: { current: 97, status: "normal", trend: "stable" }
//       },
//       alerts: 1,
//       compliance: 92
//     }
//   ];

//   // Chart data for trends
//   const chartData7Days = [
//     { date: 'Mar 15', bloodPressure: 120, heartRate: 68, bloodSugar: 140, temperature: 98.4, oxygen: 97 },
//     { date: 'Mar 16', bloodPressure: 122, heartRate: 72, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
//     { date: 'Mar 17', bloodPressure: 118, heartRate: 70, bloodSugar: 138, temperature: 98.2, oxygen: 98 },
//     { date: 'Mar 18', bloodPressure: 125, heartRate: 75, bloodSugar: 142, temperature: 98.8, oxygen: 97 },
//     { date: 'Mar 19', bloodPressure: 123, heartRate: 69, bloodSugar: 148, temperature: 98.5, oxygen: 98 },
//     { date: 'Mar 20', bloodPressure: 127, heartRate: 73, bloodSugar: 151, temperature: 98.7, oxygen: 97 },
//     { date: 'Mar 21', bloodPressure: 125, heartRate: 72, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'normal': return 'text-green-600 bg-green-50 border-green-200';
//       case 'elevated': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
//       case 'high': return 'text-red-600 bg-red-50 border-red-200';
//       case 'low': return 'text-orange-600 bg-orange-50 border-orange-200';
//       default: return 'text-gray-600 bg-gray-50 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'normal': return <CheckCircle className="w-4 h-4" />;
//       case 'elevated': case 'high': case 'low': return <AlertTriangle className="w-4 h-4" />;
//       default: return <CheckCircle className="w-4 h-4" />;
//     }
//   };

//   const getTrendIcon = (trend) => {
//     switch (trend) {
//       case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
//       case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
//       default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
//     }
//   };

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case 'critical': return 'border-l-red-500 bg-red-50';
//       case 'moderate': return 'border-l-yellow-500 bg-yellow-50';
//       case 'stable': return 'border-l-green-500 bg-green-50';
//       default: return 'border-l-gray-500 bg-gray-50';
//     }
//   };

//   const getVitalIcon = (vital) => {
//     switch (vital) {
//       case 'bloodPressure': return <Heart className="w-5 h-5" />;
//       case 'heartRate': return <Activity className="w-5 h-5" />;
//       case 'bloodSugar': return <Droplets className="w-5 h-5" />;
//       case 'temperature': return <Thermometer className="w-5 h-5" />;
//       case 'oxygen': return <Wind className="w-5 h-5" />;
//       default: return <Activity className="w-5 h-5" />;
//     }
//   };

//   const criticalAlerts = patientsVitals.reduce((sum, patient) => sum + patient.alerts, 0);
//   const abnormalReadings = patientsVitals.filter(patient => 
//     Object.values(patient.vitals).some(vital => vital.status !== 'normal')
//   ).length;
//   const avgCompliance = Math.round(patientsVitals.reduce((sum, patient) => sum + patient.compliance, 0) / patientsVitals.length);

//   const exportData = () => {
//     alert('Exporting patient health data to CSV...');
//     // In real implementation, generate and download CSV
//   };

//   const filteredPatients = selectedPatient === 'all' 
//     ? patientsVitals 
//     : patientsVitals.filter(patient => patient.id === parseInt(selectedPatient));

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
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Vitals & Health Data</h1>
//             <p className="text-gray-600">Monitor patient vital signs and health trends</p>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
//               <button
//                 onClick={() => setViewMode('overview')}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   viewMode === 'overview'
//                     ? 'bg-blue-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 Overview
//               </button>
//               <button
//                 onClick={() => setViewMode('detailed')}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   viewMode === 'detailed'
//                     ? 'bg-blue-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 Detailed
//               </button>
//             </div>
            
//             <button 
//               onClick={exportData}
//               className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               <span>Export CSV</span>
//             </button>
            
//             <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
//               <RefreshCw className="w-4 h-4" />
//               <span>Refresh Data</span>
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Patients</p>
//                 <p className="text-2xl font-bold text-gray-900">{patientsVitals.length}</p>
//               </div>
//               <User className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Critical Alerts</p>
//                 <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-red-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Abnormal Readings</p>
//                 <p className="text-2xl font-bold text-orange-600">{abnormalReadings}</p>
//               </div>
//               <AlertCircle className="w-8 h-8 text-orange-500" />
//             </div>
//           </div>
          
//           <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Avg Compliance</p>
//                 <p className="text-2xl font-bold text-green-600">{avgCompliance}%</p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <Filter className="w-5 h-5 text-gray-500" />
//                 <select
//                   value={selectedPatient}
//                   onChange={(e) => setSelectedPatient(e.target.value)}
//                   className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="all">All Patients</option>
//                   {patientsVitals.map((patient) => (
//                     <option key={patient.id} value={patient.id}>{patient.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex space-x-2">
//                 {['7days', '30days', '90days'].map((period) => (
//                   <button
//                     key={period}
//                     onClick={() => setSelectedPeriod(period)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       selectedPeriod === period
//                         ? 'bg-blue-500 text-white shadow-lg'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {period === '7days' ? '7 Days' : period === '30days' ? '30 Days' : '90 Days'}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-500 flex items-center space-x-1">
//               <Clock className="w-4 h-4" />
//               <span>Last updated: 5 minutes ago</span>
//             </div>
//           </div>
//         </div>

//         {viewMode === 'overview' ? (
//           /* Overview Mode */
//           <>
//             {/* Patients Vitals Cards */}
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
//               {filteredPatients.map((patient) => (
//                 <div key={patient.id} className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border border-white/20 p-6 ${getSeverityColor(patient.severity)}`}>
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={patient.photo}
//                         alt={patient.name}
//                         className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
//                       />
//                       <div>
//                         <h3 className="font-bold text-gray-900">{patient.name}</h3>
//                         <p className="text-sm text-gray-600">{patient.age} years • {patient.condition}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-2">
//                       {patient.alerts > 0 && (
//                         <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
//                           <AlertTriangle className="w-3 h-3" />
//                           <span>{patient.alerts} alerts</span>
//                         </div>
//                       )}
//                       <div className="text-xs text-gray-500">{patient.lastReading}</div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     {/* Blood Pressure */}
//                     <div className="text-center">
//                       <div className="flex items-center justify-center mb-1">
//                         <Heart className="w-4 h-4 text-blue-600 mr-1" />
//                         <span className="text-xs text-gray-600">BP</span>
//                       </div>
//                       <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.bloodPressure.status)}`}>
//                         {patient.vitals.bloodPressure.current}
//                       </div>
//                       <div className="flex items-center justify-center mt-1">
//                         {getTrendIcon(patient.vitals.bloodPressure.trend)}
//                       </div>
//                     </div>

//                     {/* Heart Rate */}
//                     <div className="text-center">
//                       <div className="flex items-center justify-center mb-1">
//                         <Activity className="w-4 h-4 text-red-600 mr-1" />
//                         <span className="text-xs text-gray-600">HR</span>
//                       </div>
//                       <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.heartRate.status)}`}>
//                         {patient.vitals.heartRate.current}
//                       </div>
//                       <div className="flex items-center justify-center mt-1">
//                         {getTrendIcon(patient.vitals.heartRate.trend)}
//                       </div>
//                     </div>

//                     {/* Blood Sugar */}
//                     <div className="text-center">
//                       <div className="flex items-center justify-center mb-1">
//                         <Droplets className="w-4 h-4 text-orange-600 mr-1" />
//                         <span className="text-xs text-gray-600">Sugar</span>
//                       </div>
//                       <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.bloodSugar.status)}`}>
//                         {patient.vitals.bloodSugar.current}
//                       </div>
//                       <div className="flex items-center justify-center mt-1">
//                         {getTrendIcon(patient.vitals.bloodSugar.trend)}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
//                     <div className="text-sm">
//                       <span className="text-gray-600">Compliance: </span>
//                       <span className={`font-medium ${patient.compliance >= 95 ? 'text-green-600' : patient.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
//                         {patient.compliance}%
//                       </span>
//                     </div>
//                     <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Trends Chart */}
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <BarChart3 className="w-6 h-6 text-blue-600" />
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Health Trends Overview</h2>
//                     <p className="text-gray-600">Patient vital signs trends over time</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                   {['bloodPressure', 'heartRate', 'bloodSugar'].map((vital) => (
//                     <button
//                       key={vital}
//                       onClick={() => setSelectedVital(vital)}
//                       className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                         selectedVital === vital
//                           ? 'bg-blue-500 text-white shadow-lg'
//                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                       }`}
//                     >
//                       {getVitalIcon(vital)}
//                       <span className="capitalize">{vital.replace(/([A-Z])/g, ' $1')}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData7Days}>
//                     <defs>
//                       <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis 
//                       dataKey="date" 
//                       stroke="#6B7280"
//                       fontSize={12}
//                     />
//                     <YAxis 
//                       stroke="#6B7280"
//                       fontSize={12}
//                     />
//                     <Tooltip 
//                       contentStyle={{
//                         backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                         border: 'none',
//                         borderRadius: '12px',
//                         boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
//                       }}
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey={selectedVital}
//                       stroke="#3B82F6"
//                       strokeWidth={3}
//                       fill="url(#gradient)"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         ) : (
//           /* Detailed Mode */
//           <div className="space-y-6">
//             {filteredPatients.map((patient) => (
//               <div key={patient.id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={patient.photo}
//                       alt={patient.name}
//                       className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
//                     />
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
//                       <p className="text-gray-600">{patient.condition}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Last Reading</p>
//                     <p className="font-medium">{patient.lastReading}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                   {Object.entries(patient.vitals).map(([vitalName, vital]) => (
//                     <div key={vitalName} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-2">
//                           {getVitalIcon(vitalName)}
//                           <h4 className="text-sm font-medium text-gray-700 capitalize">
//                             {vitalName.replace(/([A-Z])/g, ' $1')}
//                           </h4>
//                         </div>
//                         {getTrendIcon(vital.trend)}
//                       </div>
                      
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-gray-900 mb-1">
//                           {vital.current}
//                           {vitalName === 'heartRate' && ' bpm'}
//                           {vitalName === 'bloodSugar' && ' mg/dL'}
//                           {vitalName === 'temperature' && '°F'}
//                           {vitalName === 'oxygen' && '%'}
//                         </p>
                        
//                         <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vital.status)}`}>
//                           {getStatusIcon(vital.status)}
//                           <span className="capitalize">{vital.status}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorVitals;





import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  RefreshCw,
  BarChart3,
  Download,
  Filter,
  Search,
  User,
  AlertCircle,
  Eye,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const DoctorVitals = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedVital, setSelectedVital] = useState('bloodPressure');
  const [viewMode, setViewMode] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [patientsVitals, setPatientsVitals] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch vitals data on component mount and when period changes
  useEffect(() => {
    fetchAllPatientsVitals();
  }, [selectedPeriod]);

  // Fetch chart data when patient or vital type changes
  useEffect(() => {
    if (selectedPatient !== 'all') {
      fetchPatientTrends(selectedPatient);
    }
  }, [selectedPatient, selectedPeriod]);

  // Key section of Vitals.jsx - Replace the fetchAllPatientsVitals function

const fetchAllPatientsVitals = async () => {
  try {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    
    console.log('Fetching vitals from: http://localhost:5000/api/vitals/latest');
    
    const response = await fetch('http://localhost:5000/api/vitals/latest', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || 'Failed to fetch vitals data');
    }

    const result = await response.json();
    console.log('Vitals API Response:', result);
    console.log('Number of vitals records:', result.data?.length || 0);

    const vitalsData = result.data || [];

    if (vitalsData.length === 0) {
      console.warn('No vitals data returned from API');
      setPatientsVitals([]);
      setLoading(false);
      return;
    }

    // Transform the data to match the component's expected format
    const transformedData = vitalsData.map(vital => {
      console.log('Processing vital:', vital);
      
      const patient = vital.patientId;
      if (!patient) {
        console.error('Vital record missing patient data:', vital);
        return null;
      }

      return {
        id: patient._id,
        name: patient.name,
        photo: patient.photo || 'https://via.placeholder.com/150',
        age: patient.age,
        condition: patient.condition || 'Not specified',
        severity: determinePatientSeverity(vital),
        lastReading: formatTimeAgo(vital.timestamp),
        vitals: {
          bloodPressure: { 
            current: `${vital.bloodPressure.systolic}/${vital.bloodPressure.diastolic}`, 
            status: getVitalStatus('bloodPressure', vital.bloodPressure), 
            trend: 'stable' 
          },
          heartRate: { 
            current: vital.heartRate, 
            status: getVitalStatus('heartRate', vital.heartRate), 
            trend: 'stable' 
          },
          bloodSugar: { 
            current: vital.bloodSugar || 'N/A', 
            status: vital.bloodSugar ? getVitalStatus('bloodSugar', vital.bloodSugar) : 'normal', 
            trend: 'stable' 
          },
          temperature: { 
            current: vital.temperature || 'N/A', 
            status: vital.temperature ? getVitalStatus('temperature', vital.temperature) : 'normal', 
            trend: 'stable' 
          },
          oxygen: { 
            current: vital.oxygenSaturation || 'N/A', 
            status: vital.oxygenSaturation ? getVitalStatus('oxygen', vital.oxygenSaturation) : 'normal', 
            trend: 'stable' 
          }
        },
        alerts: vital.status === 'critical' ? 3 : vital.status === 'warning' ? 1 : 0,
        compliance: 95
      };
    }).filter(item => item !== null); // Remove any null entries

    console.log('Transformed data:', transformedData);
    setPatientsVitals(transformedData);
  } catch (err) {
    console.error('Error fetching vitals:', err);
    setError(err.message);
    setPatientsVitals([]);
  } finally {
    setLoading(false);
  }
};
  const fetchPatientTrends = async (patientId) => {
    try {
      const token = localStorage.getItem('token');
      const days = selectedPeriod === '7days' ? 7 : selectedPeriod === '30days' ? 30 : 90;
      
      const response = await fetch(`http://localhost:5000/api/vitals/patient/${patientId}/trends?days=${days}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trends');
      }

      const result = await response.json();
      const trendsData = result.data || [];

      // Transform data for charts
      const chartData = trendsData.map(vital => ({
        date: new Date(vital.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        bloodPressure: vital.bloodPressure.systolic,
        heartRate: vital.heartRate,
        bloodSugar: vital.bloodSugar || 0,
        temperature: vital.temperature || 0,
        oxygen: vital.oxygenSaturation || 0
      }));

      setChartData(chartData);
    } catch (err) {
      console.error('Error fetching trends:', err);
    }
  };

  const determinePatientSeverity = (vital) => {
    if (vital.status === 'critical') return 'critical';
    if (vital.status === 'warning') return 'moderate';
    return 'stable';
  };

  const getVitalStatus = (type, value) => {
    switch (type) {
      case 'bloodPressure':
        if (value.systolic >= 180 || value.diastolic >= 120) return 'high';
        if (value.systolic >= 140 || value.diastolic >= 90) return 'elevated';
        return 'normal';
      
      case 'heartRate':
        if (value > 120 || value < 40) return 'high';
        if (value > 100 || value < 60) return 'elevated';
        return 'normal';
      
      case 'bloodSugar':
        if (value > 300 || value < 50) return 'high';
        if (value > 180 || value < 70) return 'elevated';
        return 'normal';
      
      case 'temperature':
        if (value > 103 || value < 95) return 'high';
        if (value > 100.4 || value < 97) return 'elevated';
        return 'normal';
      
      case 'oxygen':
        if (value < 90) return 'low';
        if (value < 95) return 'elevated';
        return 'normal';
      
      default:
        return 'normal';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'elevated': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'low': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'elevated': case 'high': case 'low': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'moderate': return 'border-l-yellow-500 bg-yellow-50';
      case 'stable': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getVitalIcon = (vital) => {
    switch (vital) {
      case 'bloodPressure': return <Heart className="w-5 h-5" />;
      case 'heartRate': return <Activity className="w-5 h-5" />;
      case 'bloodSugar': return <Droplets className="w-5 h-5" />;
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'oxygen': return <Wind className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const criticalAlerts = patientsVitals.reduce((sum, patient) => sum + patient.alerts, 0);
  const abnormalReadings = patientsVitals.filter(patient => 
    Object.values(patient.vitals).some(vital => vital.status !== 'normal')
  ).length;
  const avgCompliance = patientsVitals.length > 0 
    ? Math.round(patientsVitals.reduce((sum, patient) => sum + patient.compliance, 0) / patientsVitals.length)
    : 0;

  const exportData = () => {
    // Create CSV content
    let csvContent = "Patient Name,Age,Blood Pressure,Heart Rate,Blood Sugar,Temperature,Oxygen,Status,Last Reading\n";
    
    patientsVitals.forEach(patient => {
      csvContent += `${patient.name},${patient.age},${patient.vitals.bloodPressure.current},${patient.vitals.heartRate.current},${patient.vitals.bloodSugar.current},${patient.vitals.temperature.current},${patient.vitals.oxygen.current},${patient.severity},${patient.lastReading}\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-vitals-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredPatients = selectedPatient === 'all' 
    ? patientsVitals 
    : patientsVitals.filter(patient => patient.id === selectedPatient);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vitals data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllPatientsVitals}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (patientsVitals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
        <div className="text-center py-16">
          <Activity className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Vitals Data Available</h3>
          <p className="text-gray-600 mb-4">
            Vitals data will appear here after you complete appointments and record patient vitals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Vitals & Health Data</h1>
            <p className="text-gray-600">Monitor patient vital signs and health trends</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'overview'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'detailed'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Detailed
              </button>
            </div>
            
            <button 
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            
            <button 
              onClick={fetchAllPatientsVitals}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patientsVitals.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Abnormal Readings</p>
                <p className="text-2xl font-bold text-orange-600">{abnormalReadings}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Compliance</p>
                <p className="text-2xl font-bold text-green-600">{avgCompliance}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Patients</option>
                  {patientsVitals.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-2">
                {['7days', '30days', '90days'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period === '7days' ? '7 Days' : period === '30days' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Last updated: {patientsVitals.length > 0 ? patientsVitals[0].lastReading : 'Never'}</span>
            </div>
          </div>
        </div>

        {viewMode === 'overview' ? (
          /* Overview Mode */
          <>
            {/* Patients Vitals Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border border-white/20 p-6 ${getSeverityColor(patient.severity)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={patient.photo}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">{patient.age} years • {patient.condition}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {patient.alerts > 0 && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{patient.alerts} alerts</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">{patient.lastReading}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Blood Pressure */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-xs text-gray-600">BP</span>
                      </div>
                      <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.bloodPressure.status)}`}>
                        {patient.vitals.bloodPressure.current}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {getTrendIcon(patient.vitals.bloodPressure.trend)}
                      </div>
                    </div>

                    {/* Heart Rate */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Activity className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-xs text-gray-600">HR</span>
                      </div>
                      <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.heartRate.status)}`}>
                        {patient.vitals.heartRate.current}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {getTrendIcon(patient.vitals.heartRate.trend)}
                      </div>
                    </div>

                    {/* Blood Sugar */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Droplets className="w-4 h-4 text-orange-600 mr-1" />
                        <span className="text-xs text-gray-600">Sugar</span>
                      </div>
                      <div className={`text-sm font-semibold px-2 py-1 rounded-lg border ${getStatusColor(patient.vitals.bloodSugar.status)}`}>
                        {patient.vitals.bloodSugar.current}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {getTrendIcon(patient.vitals.bloodSugar.trend)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Compliance: </span>
                      <span className={`font-medium ${patient.compliance >= 95 ? 'text-green-600' : patient.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {patient.compliance}%
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient.id);
                        setViewMode('detailed');
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Trends Chart */}
            {selectedPatient !== 'all' && chartData.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Health Trends</h2>
                      <p className="text-gray-600">Vital signs over time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {['bloodPressure', 'heartRate', 'bloodSugar'].map((vital) => (
                      <button
                        key={vital}
                        onClick={() => setSelectedVital(vital)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedVital === vital
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getVitalIcon(vital)}
                        <span className="capitalize">{vital.replace(/([A-Z])/g, ' $1')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6B7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={selectedVital}
                        stroke="#3B82F6"
                        strokeWidth={3}
                        fill="url(#gradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Detailed Mode */
          <div className="space-y-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-gray-600">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last Reading</p>
                    <p className="font-medium">{patient.lastReading}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Object.entries(patient.vitals).map(([vitalName, vital]) => (
                    <div key={vitalName} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getVitalIcon(vitalName)}
                          <h4 className="text-sm font-medium text-gray-700 capitalize">
                            {vitalName.replace(/([A-Z])/g, ' $1')}
                          </h4>
                        </div>
                        {getTrendIcon(vital.trend)}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          {vital.current}
                          {vitalName === 'heartRate' && ' bpm'}
                          {vitalName === 'bloodSugar' && ' mg/dL'}
                          {vitalName === 'temperature' && '°F'}
                          {vitalName === 'oxygen' && '%'}
                        </p>
                        
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vital.status)}`}>
                          {getStatusIcon(vital.status)}
                          <span className="capitalize">{vital.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorVitals;