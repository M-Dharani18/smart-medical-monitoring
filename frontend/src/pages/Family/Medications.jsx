import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Bell,
  User,
  FileText,
  Timer,
  Filter,
  Search
} from 'lucide-react';

const FamilyMedications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample medication data
  const medications = [
    {
      id: 1,
      name: 'Metformin',
      dosage: '100mg',
      frequency: 'Twice daily',
      times: ['08:00 AM', '08:00 PM'],
      purpose: 'HyperTension',
      prescribedBy: 'Vanathi J',
      startDate: '2025-10-06',
      nextDose: '08:00 PM',
      status: 'active',
      adherence: 95,
      sideEffects: 'Nausea, stomach upset',
      instructions: 'Take with meals to reduce stomach upset',
      recentDoses: [
        { date: '2024-03-21', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-20', time: '08:00 PM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-20', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-19', time: '08:00 PM', status: 'missed', takenBy: null },
        { date: '2024-03-19', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' }
      ]
    },
    {
      id: 2,
      name: 'Amoxicillin',
      dosage: '200mg',
      frequency: 'Once daily',
      times: ['08:00 AM'],
      purpose: 'HyperTension',
      prescribedBy: 'Vanathi J',
      startDate: '2025-10-06',
      nextDose: 'Tomorrow 08:00 AM',
      status: 'active',
      adherence: 98,
      sideEffects: 'Dry cough, dizziness',
      instructions: 'Take at the same time each day',
      recentDoses: [
        { date: '2024-03-21', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-20', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-19', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-18', time: '08:00 AM', status: 'taken', takenBy: 'Eleanor Johnson' },
        { date: '2024-03-17', time: '08:00 AM', status: 'taken', takenBy: 'Maria Rodriguez' }
      ]
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      times: ['10:00 PM'],
      purpose: 'HyperTension',
      prescribedBy: 'Vanathi J',
      startDate: '2025-10-05',
      nextDose: '10:00 PM',
      status: 'active',
      adherence: 92,
      sideEffects: 'Muscle pain, headache',
      instructions: 'Take in the evening with or without food',
      recentDoses: [
        { date: '2024-03-20', time: '10:00 PM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-19', time: '10:00 PM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-18', time: '10:00 PM', status: 'missed', takenBy: null },
        { date: '2024-03-17', time: '10:00 PM', status: 'taken', takenBy: 'Maria Rodriguez' },
        { date: '2024-03-16', time: '10:00 PM', status: 'taken', takenBy: 'Maria Rodriguez' }
      ]
    },
  ];

  const upcomingDoses = [
    { medication: 'Metformin', dose: '100mg', time: '08:00 PM', status: 'pending' },
    { medication: 'Amoxicillin', dose: '200mg', time: '10:00 PM', status: 'pending' },
    { medication: 'Atorvastatin', dose: '10mg', time: 'Tomorrow 08:00 AM', status: 'scheduled' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'taken': return 'bg-green-100 text-green-800';
      case 'missed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'taken': return <CheckCircle2 className="w-4 h-4" />;
      case 'missed': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Timer className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 95) return 'text-green-600';
    if (adherence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && med.status === 'active';
    if (selectedFilter === 'critical') return matchesSearch && med.adherence < 95;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Medications</h1>
          <p className="text-gray-600">Manage Eleanor's medication schedule and track adherence</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Medications</p>
                <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
              </div>
              <Pill className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Doses</p>
                <p className="text-2xl font-bold text-gray-900">6/7</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Missed This Week</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Adherence</p>
                <p className="text-2xl font-bold text-green-600">96%</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">A+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Doses */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Doses (Next 24 Hours)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingDoses.map((dose, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{dose.medication}</h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dose.status)}`}>
                    {getStatusIcon(dose.status)}
                    <span className="capitalize">{dose.status}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{dose.dose}</p>
                <p className="text-sm font-medium text-orange-700">{dose.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex space-x-2">
                {['all', 'active', 'critical'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      selectedFilter === filter
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-6">
          {filteredMedications.map((medication) => (
            <div key={medication.id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Pill className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{medication.name}</h3>
                      <p className="text-gray-600">{medication.dosage} • {medication.frequency}</p>
                      <p className="text-sm text-gray-500">For {medication.purpose}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getAdherenceColor(medication.adherence)}`}>
                      {medication.adherence}%
                    </div>
                    <p className="text-xs text-gray-500">Adherence Rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Medication Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Prescribed by {medication.prescribedBy}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Started {new Date(medication.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Next dose: {medication.nextDose}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
                      <p className="text-sm text-gray-600">{medication.instructions}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Side Effects</h4>
                      <p className="text-sm text-gray-600">{medication.sideEffects}</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Daily Schedule</h4>
                    <div className="space-y-2">
                      {medication.times.map((time, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-medium text-blue-900">{time}</span>
                          </div>
                          <span className="text-sm text-blue-700">{medication.dosage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent History */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recent History</h4>
                    <div className="space-y-2">
                      {medication.recentDoses.slice(0, 5).map((dose, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded">
                          <div className="flex items-center space-x-2">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(dose.status)}`}>
                              {getStatusIcon(dose.status)}
                            </div>
                            <span className="text-sm text-gray-600">
                              {dose.date} at {dose.time}
                            </span>
                          </div>
                          {dose.takenBy && (
                            <span className="text-xs text-gray-500">by {dose.takenBy}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Critical Alert */}
              {medication.adherence < 95 && (
                <div className="bg-red-50 border-t border-red-200 p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">
                      Low adherence rate - Please ensure medication is taken as prescribed
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyMedications;

