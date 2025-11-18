import React, { useState } from 'react';
import { 
  Pill, Clock, CheckCircle2, AlertTriangle, Plus, Bell,
  Edit, Trash2, Calendar, Sun, Moon, Coffee, Sunset,
  Timer, X, Info, TrendingUp, AlertCircle
} from 'lucide-react';

const Medications = () => {
  const [medications, setMedications] = useState([
    { 
      id: 1, 
      name: 'Metformin', 
      dosage: '500mg', 
      time: '8:00 AM', 
      frequency: 'Twice daily', 
      given: false, 
      instructions: 'Take with food',
      refillDays: 30,
      icon: 'morning'
    },
    { 
      id: 2, 
      name: 'Lisinopril', 
      dosage: '10mg', 
      time: '12:00 PM', 
      frequency: 'Once daily', 
      given: false, 
      instructions: 'Take with water',
      refillDays: 7,
      icon: 'afternoon'
    },
    { 
      id: 3, 
      name: 'Metformin', 
      dosage: '500mg', 
      time: '8:00 PM', 
      frequency: 'Twice daily', 
      given: false, 
      instructions: 'Take with food',
      refillDays: 30,
      icon: 'evening'
    },
    { 
      id: 4, 
      name: 'Aspirin', 
      dosage: '81mg', 
      time: '8:00 AM', 
      frequency: 'Once daily', 
      given: true, 
      instructions: 'Take with breakfast',
      refillDays: 45,
      icon: 'morning'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);

  const complianceData = [
    { day: 'Mon', percentage: 100 },
    { day: 'Tue', percentage: 95 },
    { day: 'Wed', percentage: 100 },
    { day: 'Thu', percentage: 90 },
    { day: 'Fri', percentage: 100 },
    { day: 'Sat', percentage: 100 },
    { day: 'Sun', percentage: 95 }
  ];

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, given: !med.given } : med
    ));
  };

  const getTimeIcon = (icon) => {
    switch (icon) {
      case 'morning': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'afternoon': return <Coffee className="w-5 h-5 text-orange-500" />;
      case 'evening': return <Sunset className="w-5 h-5 text-purple-500" />;
      case 'night': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const todayMeds = medications.filter(m => !m.given);
  const completedMeds = medications.filter(m => m.given);
  const upcomingMeds = medications.filter(m => !m.given).slice(0, 3);
  const weeklyCompliance = Math.round(complianceData.reduce((sum, day) => sum + day.percentage, 0) / complianceData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Medication Management</h1>
            <p className="text-gray-600">Track and manage Eleanor's medication schedule</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-medium shadow-lg transform hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Medication</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Doses</p>
                <p className="text-3xl font-bold text-gray-900">{medications.length}</p>
              </div>
              <Pill className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedMeds.length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-3xl font-bold text-orange-600">{todayMeds.length}</p>
              </div>
              <Clock className="w-10 h-10 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Adherence</p>
                <p className="text-3xl font-bold text-blue-600">{weeklyCompliance}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Medication Schedule</h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="space-y-4">
            {medications.map(med => (
              <div 
                key={med.id} 
                className={`p-5 border-l-4 rounded-xl transition-all ${
                  med.given 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-blue-500 bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div className="flex items-center space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={med.given}
                      onChange={() => toggleMedication(med.id)}
                      className="w-6 h-6 text-green-600 rounded cursor-pointer"
                    />
                    <div className="flex items-center space-x-3">
                      {getTimeIcon(med.icon)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{med.name}</h3>
                          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                            {med.dosage}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {med.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {med.frequency} • {med.instructions}
                        </p>
                        {med.refillDays <= 7 && (
                          <div className="flex items-center space-x-1 mt-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            <p className="text-sm text-orange-600 font-medium">
                              Refill needed in {med.refillDays} days
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!med.given ? (
                      <>
                        <button 
                          onClick={() => toggleMedication(med.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark as Given</span>
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                          <Bell className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 text-green-600 bg-white px-4 py-2 rounded-lg border-2 border-green-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-semibold">Given at 8:05 AM</span>
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedMed(med)}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Doses */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Doses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingMeds.map(med => (
              <div key={med.id} className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Pill className="w-10 h-10 text-blue-600" />
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">2h 30m</p>
                    <p className="text-xs text-gray-500">until dose</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{med.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{med.dosage} at {med.time}</p>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all">
                  <Timer className="w-4 h-4" />
                  <span>Set Reminder</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complete Medication List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Medication List</h2>
              <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Medication</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Dosage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Frequency</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Refill</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">Metformin</td>
                    <td className="py-3 px-4 text-gray-600">500mg</td>
                    <td className="py-3 px-4 text-gray-600">Twice daily</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        30 days
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">Lisinopril</td>
                    <td className="py-3 px-4 text-gray-600">10mg</td>
                    <td className="py-3 px-4 text-gray-600">Once daily</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        7 days
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">Aspirin</td>
                    <td className="py-3 px-4 text-gray-600">81mg</td>
                    <td className="py-3 px-4 text-gray-600">Once daily</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        45 days
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Compliance Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Weekly Medication Compliance</h2>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-xl font-bold text-lg">
                {weeklyCompliance}%
              </span>
            </div>
            <div className="flex items-end justify-between h-64 space-x-3">
              {complianceData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-100 rounded-t-xl overflow-hidden relative" style={{ height: '200px' }}>
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-xl transition-all duration-500 ${
                        day.percentage >= 95 ? 'bg-gradient-to-t from-green-500 to-green-400' : 
                        day.percentage >= 85 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' : 
                        'bg-gradient-to-t from-red-500 to-red-400'
                      }`}
                      style={{ height: `${day.percentage}%` }}
                    >
                      <div className="absolute top-2 left-0 right-0 text-center">
                        <span className="text-white font-bold text-sm">{day.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-700">{day.day}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600">≥95% Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-600">85-94% Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600">&lt;85% Needs Attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Detail Modal */}
        {selectedMed && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedMed.name}</h2>
                    <p className="text-blue-100">{selectedMed.dosage} • {selectedMed.frequency}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedMed(null)}
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Time</p>
                      <p className="text-lg font-bold text-gray-900">{selectedMed.time}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-gray-600 mb-1">Frequency</p>
                      <p className="text-lg font-bold text-gray-900">{selectedMed.frequency}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                  <p className="text-gray-700 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    {selectedMed.instructions}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Refill Status</h3>
                  <div className={`p-4 rounded-xl border-2 ${
                    selectedMed.refillDays <= 7 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {selectedMed.refillDays <= 7 ? (
                        <>
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-900">
                            Refill needed in {selectedMed.refillDays} days
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">
                            {selectedMed.refillDays} days remaining
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium transition-all">
                    Edit Medication
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-all">
                    Set Reminder
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

export default Medications;