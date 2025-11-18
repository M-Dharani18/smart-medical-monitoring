// src/pages/Caregiver/Profile.jsx
import React, { useState } from 'react';
import { 
  User, Calendar, Droplet, Phone, Mail, MapPin, AlertTriangle,
  Activity, Heart, Thermometer, Weight, TrendingUp, Download,
  FileText, Utensils, Dumbbell, Info, Edit, Save, X, Bell,
  Shield, Lock, Eye, EyeOff, Settings as SettingsIcon, Clock
} from 'lucide-react';
import { Box } from '@mui/material';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [timeRange, setTimeRange] = useState('30');
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const tabs = [
    { id: 'info', label: 'Patient Info', icon: User },
    { id: 'vitals', label: 'Vitals History', icon: Activity },
    { id: 'care-plan', label: 'Care Plan', icon: FileText },
    { id: 'settings', label: 'Caregiver Settings', icon: SettingsIcon }
  ];

  const vitalsHistory = [
    { date: '2024-03-18', bp: '128/82', hr: '74', temp: '98.2', oxygen: '97', sugar: '142', weight: '165' },
    { date: '2024-03-15', bp: '132/85', hr: '76', temp: '98.4', oxygen: '96', sugar: '156', weight: '166' },
    { date: '2024-03-12', bp: '130/84', hr: '72', temp: '98.1', oxygen: '98', sugar: '138', weight: '165' },
    { date: '2024-03-09', bp: '135/88', hr: '78', temp: '98.3', oxygen: '97', sugar: '148', weight: '167' },
    { date: '2024-03-06', bp: '129/83', hr: '75', temp: '98.2', oxygen: '97', sugar: '145', weight: '166' }
  ];

  const [caregiverSettings, setCaregiverSettings] = useState({
    name: 'Jane Doe',
    relationship: 'Daughter',
    email: 'jane.doe@email.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      push: true,
      sms: true,
      email: false
    }
  });

  const exportVitals = () => {
    alert('Exporting vitals report to PDF...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Patient Profile & Settings</h1>
            <p className="text-gray-600">View patient details, vitals history, and manage your caregiver account</p>
          </div>

          {/* Tabs */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patient Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-bold text-gray-900 text-lg">Eleanor Thompson</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age / Date of Birth</p>
                      <p className="font-bold text-gray-900 text-lg">82 years old</p>
                      <p className="text-sm text-gray-500">Born: March 15, 1942</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-bold text-gray-900 text-lg">Female</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Droplet className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Type</p>
                      <p className="font-bold text-gray-900 text-lg">O Positive (O+)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h2>
                <div className="space-y-6">
                  {/* Primary Diagnosis */}
                  <div className="p-5 bg-red-50 rounded-xl border-2 border-red-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <h3 className="font-bold text-gray-900 text-lg">Primary Diagnosis</h3>
                    </div>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Condition:</span> Type 2 Diabetes Mellitus</p>
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Diagnosed:</span> January 2018</p>
                    <p className="text-gray-700"><span className="font-semibold">Details:</span> Managed with oral medications (Metformin). Regular monitoring of blood glucose levels required. Diet-controlled with medication support.</p>
                  </div>

                  {/* Secondary Conditions */}
                  <div className="p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <Heart className="w-6 h-6 text-orange-600" />
                      <h3 className="font-bold text-gray-900 text-lg">Secondary Conditions</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <div>
                          <p className="font-semibold text-gray-900">Hypertension (Stage 1)</p>
                          <p className="text-sm text-gray-600">Controlled with Lisinopril 10mg daily</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <div>
                          <p className="font-semibold text-gray-900">Mild Osteoarthritis</p>
                          <p className="text-sm text-gray-600">Managed with exercise and occasional pain relief</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Allergies */}
                  <div className="p-5 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-bold text-gray-900 text-lg">Known Allergies</h3>
                    </div>
                    <ul className="space-y-1">
                      <li className="text-gray-700">• Penicillin (Severe reaction - hives, swelling)</li>
                      <li className="text-gray-700">• Shellfish (Mild - digestive discomfort)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-3">Primary Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">Jane Doe (Daughter)</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">+1 (555) 123-4567</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">jane.doe@email.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                    <h3 className="font-bold text-gray-900 mb-3">Secondary Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">Robert Thompson (Son)</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">+1 (555) 987-6543</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-700">robert.t@email.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Doctor</h2>
                <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Dr. Sarah Mitchell</h3>
                      <p className="text-blue-100">Internal Medicine Specialist</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <p>+1 (555) 234-5678</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <p>dr.mitchell@healthcenter.com</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <p>HealthCenter Medical, Suite 200</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Info className="w-4 h-4" />
                        <p>License: TNMC-2018-7542</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vitals History Tab */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              {/* Latest Readings */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900">Latest Vitals Readings</h2>
                  <div className="flex items-center space-x-3">
                    <select 
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                    </select>
                    <button 
                      onClick={exportVitals}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 font-medium transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                    <Heart className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Blood Pressure</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].bp}</p>
                    <p className="text-xs text-gray-500">mmHg</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Normal</span>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200">
                    <Activity className="w-8 h-8 text-red-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Heart Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].hr}</p>
                    <p className="text-xs text-gray-500">bpm</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Normal</span>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                    <Thermometer className="w-8 h-8 text-orange-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].temp}</p>
                    <p className="text-xs text-gray-500">°F</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Normal</span>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border-2 border-cyan-200">
                    <Activity className="w-8 h-8 text-cyan-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Oxygen Level</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].oxygen}</p>
                    <p className="text-xs text-gray-500">%</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Normal</span>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                    <Droplet className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Blood Sugar</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].sugar}</p>
                    <p className="text-xs text-gray-500">mg/dL</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">High</span>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                    <Weight className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Weight</p>
                    <p className="text-2xl font-bold text-gray-900">{vitalsHistory[0].weight}</p>
                    <p className="text-xs text-gray-500">lbs</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Stable</span>
                  </div>
                </div>
              </div>

              {/* Trend Charts */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Vitals Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blood Pressure Trend */}
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Blood Pressure Trend</h3>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      {vitalsHistory.slice(0, 5).map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                          <span className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="font-semibold text-gray-900">{record.bp} mmHg</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blood Sugar Trend */}
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Blood Sugar Trend</h3>
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      {vitalsHistory.slice(0, 5).map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                          <span className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className={`font-semibold ${parseInt(record.sugar) > 140 ? 'text-red-600' : 'text-green-600'}`}>
                            {record.sugar} mg/dL
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Data Table */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Vitals History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">BP</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Heart Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Temp</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">O2</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Blood Sugar</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitalsHistory.map((record, index) => (
                        <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              year: 'numeric',
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </td>
                          <td className="py-3 px-4 text-gray-700">{record.bp}</td>
                          <td className="py-3 px-4 text-gray-700">{record.hr} bpm</td>
                          <td className="py-3 px-4 text-gray-700">{record.temp}°F</td>
                          <td className="py-3 px-4 text-gray-700">{record.oxygen}%</td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${parseInt(record.sugar) > 140 ? 'text-red-600' : 'text-green-600'}`}>
                              {record.sugar}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{record.weight} lbs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Doctor's Notes */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor's Notes on Vitals</h2>
                <div className="p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Blood Sugar Monitoring Required</p>
                      <p className="text-gray-700 text-sm mb-2">
                        Blood glucose levels have been trending slightly higher than target range. Please monitor before each meal for the next 7 days and record results.
                      </p>
                      <p className="text-xs text-gray-500">Dr. Sarah Mitchell • March 18, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Care Plan Tab */}
          {activeTab === 'care-plan' && (
            <div className="space-y-6">
              {/* Daily Routine */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Routine</h2>
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AM</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Morning Routine (7:00 AM - 10:00 AM)</h3>
                    </div>
                    <ul className="space-y-2 ml-15">
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <p className="text-gray-700">Wake up and assist with morning hygiene</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <p className="text-gray-700">Check blood sugar before breakfast (target: 80-130 mg/dL)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <p className="text-gray-700">Administer morning medications with breakfast</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <p className="text-gray-700">Light stretching exercises (10 minutes)</p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">PM</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Afternoon Routine (12:00 PM - 5:00 PM)</h3>
                    </div>
                    <ul className="space-y-2 ml-15">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Lunch and midday medications</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Short walk or light physical activity (15-20 minutes)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Rest period (1 hour)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Social activities or hobbies</p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">EVE</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Evening Routine (6:00 PM - 9:00 PM)</h3>
                    </div>
                    <ul className="space-y-2 ml-15">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <p className="text-gray-700">Dinner and evening medications</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <p className="text-gray-700">Relaxation time (TV, reading, or family conversation)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <p className="text-gray-700">Bedtime routine and sleep preparation</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Utensils className="w-8 h-8 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Dietary Restrictions & Guidelines</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                    <h3 className="font-bold text-gray-900 mb-3">Recommended Foods</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <p className="text-gray-700">Whole grains (brown rice, oats, whole wheat)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <p className="text-gray-700">Lean proteins (chicken, fish, tofu)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <p className="text-gray-700">Fresh vegetables and leafy greens</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <p className="text-gray-700">Low-fat dairy products</p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="font-bold text-gray-900 mb-3">Foods to Avoid</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <p className="text-gray-700">Refined sugars and sweets</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <p className="text-gray-700">High sodium processed foods</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <p className="text-gray-700">Fried and high-fat foods</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">✗</span>
                        <p className="text-gray-700">Shellfish (allergy)</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Exercise Recommendations */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Dumbbell className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Exercise Recommendations</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2">Daily Physical Activity</h3>
                    <p className="text-gray-700 mb-3">Aim for 20-30 minutes of light to moderate activity daily</p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Morning stretching routine (10 minutes)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Afternoon walk outdoors or indoors (15-20 minutes)</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <p className="text-gray-700">Chair exercises (seated leg lifts, arm circles)</p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                    <div className="flex items-start space-x-3">
                      <Info className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Important Notes</p>
                        <p className="text-gray-700 text-sm">Monitor for signs of fatigue, dizziness, or joint discomfort. Stop activity if any concerning symptoms occur and rest.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Info className="w-8 h-8 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Special Instructions from Doctor</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
                    <h3 className="font-bold text-gray-900 mb-2">Blood Sugar Monitoring</h3>
                    <p className="text-gray-700">Check blood glucose levels before each meal and 2 hours after dinner. Record all readings in care log. Target range: 80-130 mg/dL (fasting), &lt;180 mg/dL (after meals).</p>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2">Medication Timing</h3>
                    <p className="text-gray-700">Metformin must be taken with food to prevent stomach upset. Ensure patient has eaten before administering. Lisinopril can be taken with or without food but maintain consistent timing.</p>
                  </div>

                  <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
                    <h3 className="font-bold text-gray-900 mb-2">Hydration Goals</h3>
                    <p className="text-gray-700">Ensure minimum 6-8 glasses of water daily. Monitor for signs of dehydration especially during warmer weather. Limit caffeine intake to 1-2 cups per day.</p>
                  </div>

                  <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="font-bold text-gray-900 mb-2">Warning Signs to Watch</h3>
                    <p className="text-gray-700 mb-2">Contact doctor immediately if any of the following occur:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Blood sugar &lt;70 or &gt;250 mg/dL</li>
                      <li>• Severe dizziness, confusion, or disorientation</li>
                      <li>• Chest pain or severe shortness of breath</li>
                      <li>• Extreme fatigue lasting more than a day</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Caregiver Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium transition-all"
                  >
                    {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    <span>{editMode ? 'Save Changes' : 'Edit Profile'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={caregiverSettings.name}
                      disabled={!editMode}
                      onChange={(e) => setCaregiverSettings({...caregiverSettings, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship to Patient</label>
                    <input
                      type="text"
                      value={caregiverSettings.relationship}
                      disabled={!editMode}
                      onChange={(e) => setCaregiverSettings({...caregiverSettings, relationship: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={caregiverSettings.email}
                      disabled={!editMode}
                      onChange={(e) => setCaregiverSettings({...caregiverSettings, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={caregiverSettings.phone}
                      disabled={!editMode}
                      onChange={(e) => setCaregiverSettings({...caregiverSettings, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Receive alerts on your device</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={caregiverSettings.notifications.push}
                        onChange={(e) => setCaregiverSettings({
                          ...caregiverSettings,
                          notifications: {...caregiverSettings.notifications, push: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Receive text messages for important updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={caregiverSettings.notifications.sms}
                        onChange={(e) => setCaregiverSettings({
                          ...caregiverSettings,
                          notifications: {...caregiverSettings.notifications, sms: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive daily summaries via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={caregiverSettings.notifications.email}
                        onChange={(e) => setCaregiverSettings({
                          ...caregiverSettings,
                          notifications: {...caregiverSettings.notifications, email: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                  <div className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Notification Types</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Medication reminders</li>
                        <li>• Appointment alerts</li>
                        <li>• Critical vital signs notifications</li>
                        <li>• Doctor's new instructions</li>
                        <li>• Daily care log reminders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Security & Privacy</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-medium transition-all">
                    <Lock className="w-5 h-5" />
                    <span>Update Password</span>
                  </button>
                </div>

                <div className="mt-6 p-5 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Password Requirements</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Minimum 8 characters</li>
                        <li>• At least one uppercase letter</li>
                        <li>• At least one number</li>
                        <li>• At least one special character</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 md:p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <p className="mb-6">Our support team is here to assist you with any questions or concerns.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 font-medium transition-all">
                    <Phone className="w-5 h-5" />
                    <span>Call Support</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 font-medium transition-all">
                    <Mail className="w-5 h-5" />
                    <span>Email Support</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Profile;