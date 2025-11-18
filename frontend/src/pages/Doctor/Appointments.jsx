

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  User,
  MapPin,
  Phone,
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Video,
  UserCheck,
  Star,
  Archive,
  X,
  Save,
  Send,
  ChevronLeft,
  ChevronRight,
  List,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    duration: 30,
    type: 'routine',
    reason: '',
    location: 'Room 101',
    isVirtual: false,
    priority: 'normal',
    notes: ''
  });

  const [visitRecord, setVisitRecord] = useState({
    diagnosis: '',
    treatment: '',
    prescriptions: '',
    followUpDate: '',
    notes: '',
    vitals: {
      bloodPressure: {
        systolic: '',
        diastolic: ''
      },
      heartRate: '',
      bloodSugar: '',
      temperature: '',
      oxygenSaturation: ''
    }
  });

  const [rescheduleData, setRescheduleData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  // Fetch appointments and patients on mount
  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch appointments');
      
      const result = await response.json();
      const appointmentsData = result.data || result;
      setAppointments(appointmentsData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/patients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch patients');
    
    const result = await response.json();
    console.log('Patients API Response:', result); // Debug log
    
    // Handle different response structures
    let patientsData = [];
    if (Array.isArray(result)) {
      patientsData = result;
    } else if (result.data && Array.isArray(result.data)) {
      patientsData = result.data;
    } else if (result.patients && Array.isArray(result.patients)) {
      patientsData = result.patients;
    }
    
    console.log('Patients Data:', patientsData); // Debug log
    setPatients(patientsData);
  } catch (err) {
    console.error('Error fetching patients:', err);
    alert('Failed to load patients. Please try again.');
    setPatients([]);
  }
};

  const today = new Date().toISOString().split('T')[0];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'routine': return <CheckCircle className="w-4 h-4" />;
      case 'follow-up': return <Clock className="w-4 h-4" />;
      case 'emergency': return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (dateString) => {
    const appointmentDate = new Date(dateString).toISOString().split('T')[0];
    return appointmentDate === today;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const patientName = appointment.patient?.name || '';
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    const matchesDateRange = !dateRange.start || !dateRange.end || 
      (appointmentDate >= dateRange.start && appointmentDate <= dateRange.end);
    
    const matchesTab = activeTab === 'today' ? 
      isToday(appointment.date) :
      activeTab === 'upcoming' ? 
      new Date(appointment.date) > new Date(today) :
      activeTab === 'all' ? true : false;
    
    return matchesSearch && matchesStatus && matchesType && matchesDateRange && matchesTab;
  });

  const todayAppointments = appointments.filter(apt => isToday(apt.date));
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;
  const upcomingToday = todayAppointments.filter(apt => apt.status === 'scheduled').length;
  const pendingToday = todayAppointments.filter(apt => apt.status === 'pending').length;

  const getNextAppointment = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return todayAppointments
      .filter(apt => apt.status !== 'completed' && apt.status !== 'cancelled')
      .sort((a, b) => {
        const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
        const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
        return timeA - timeB;
      })
      .find(apt => {
        const aptTime = parseInt(apt.time.split(':')[0]) * 60 + parseInt(apt.time.split(':')[1]);
        return aptTime >= currentTime;
      });
  };

  const nextAppointment = getNextAppointment();

  const handleScheduleAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAppointment)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create appointment');
      }

      alert('Appointment scheduled successfully!');
      setShowScheduleModal(false);
      setNewAppointment({
        patientId: '',
        date: '',
        time: '',
        duration: 30,
        type: 'routine',
        reason: '',
        location: 'Room 101',
        isVirtual: false,
        priority: 'normal',
        notes: ''
      });
      
      fetchAppointments();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment: ' + error.message);
    }
  };

  const handleCompleteAppointment = async () => {
    try {
      // Validate vitals data
      const { vitals } = visitRecord;
      if (!vitals.bloodPressure.systolic || !vitals.bloodPressure.diastolic || 
          !vitals.heartRate || !vitals.bloodSugar || 
          !vitals.temperature || !vitals.oxygenSaturation) {
        alert('Please fill in all vital signs');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/${selectedAppointment._id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitRecord)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to complete appointment');
      }

      alert('Visit recorded successfully! Vitals have been saved.');
      setShowCompleteModal(false);
      setShowDetailModal(false);
      setVisitRecord({
        diagnosis: '',
        treatment: '',
        prescriptions: '',
        followUpDate: '',
        notes: '',
        vitals: {
          bloodPressure: { systolic: '', diastolic: '' },
          heartRate: '',
          bloodSugar: '',
          temperature: '',
          oxygenSaturation: ''
        }
      });
      
      fetchAppointments();
    } catch (error) {
      console.error('Error completing appointment:', error);
      alert('Failed to complete appointment: ' + error.message);
    }
  };

  const handleReschedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/${selectedAppointment._id}/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rescheduleData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to reschedule appointment');
      }

      alert('Appointment rescheduled successfully!');
      setShowRescheduleModal(false);
      setShowDetailModal(false);
      setRescheduleData({ date: '', time: '', reason: '' });
      
      fetchAppointments();
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Failed to reschedule appointment: ' + error.message);
    }
  };

  const handleCancelAppointment = async (reason) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/${selectedAppointment._id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to cancel appointment');
      }

      alert('Appointment cancelled successfully!');
      setShowDetailModal(false);
      
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-600">Manage your schedule and patient appointments</p>
          </div>
          
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Schedule Appointment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-3xl font-bold text-blue-600">{todayAppointments.length}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-3xl font-bold text-green-600">{completedToday}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Today</p>
                <p className="text-3xl font-bold text-indigo-600">{upcomingToday}</p>
              </div>
              <Clock className="w-10 h-10 text-indigo-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending/Waiting</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingToday}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {nextAppointment && activeTab === 'today' && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Next Appointment</p>
                  <h3 className="text-2xl font-bold">{nextAppointment.patient?.name || 'Unknown Patient'}</h3>
                  <p className="text-sm opacity-90">{nextAppointment.time} • {nextAppointment.duration} min • {nextAppointment.location}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedAppointment(nextAppointment);
                  setShowDetailModal(true);
                }}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex space-x-2">
              {[
                { id: 'today', label: "Today's Schedule", count: todayAppointments.length },
                { id: 'upcoming', label: 'Upcoming', count: appointments.filter(a => new Date(a.date) > new Date(today)).length },
                { id: 'all', label: 'All Appointments', count: appointments.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                  viewMode === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by patient name or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Filter className="w-5 h-5 text-gray-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="routine">Routine</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment._id} 
                    className={`bg-gradient-to-r from-white to-gray-50 rounded-lg border-2 p-6 hover:shadow-lg transition-all ${
                      nextAppointment?._id === appointment._id && activeTab === 'today' 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={appointment.patient?.photo || 'https://via.placeholder.com/150'}
                          alt={appointment.patient?.name || 'Patient'}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900 text-lg">{appointment.patient?.name || 'Unknown Patient'}</h3>
                            {nextAppointment?._id === appointment._id && activeTab === 'today' && (
                              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                                NEXT
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{appointment.reason}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{appointment.time}</span>
                            <span>•</span>
                            <span>{appointment.duration} min</span>
                            <span>•</span>
                            {appointment.isVirtual ? (
                              <><Video className="w-4 h-4" /><span>Virtual</span></>
                            ) : (
                              <><MapPin className="w-4 h-4" /><span>{appointment.location}</span></>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(appointment.type)}
                          <span className="text-sm text-gray-600 capitalize">{appointment.type}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {appointment.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowDetailModal(true);
                        }}
                        className="flex items-center space-x-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      
                      {appointment.status === 'scheduled' && (
                        <>
                          <button 
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowRescheduleModal(true);
                            }}
                            className="flex items-center space-x-1 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Reschedule</span>
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowCompleteModal(true);
                            }}
                            className="flex items-center space-x-1 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Complete</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
                <p className="text-gray-600">Calendar view coming soon with monthly schedule visualization</p>
              </div>
            )}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600">
                  {appointments.length === 0 
                    ? 'Click "Schedule Appointment" to add your first appointment' 
                    : 'Try adjusting your search or filter criteria'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Complete Appointment Modal with Vitals */}
        {showCompleteModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Record Patient Visit</h2>
                  <button 
                    onClick={() => setShowCompleteModal(false)}
                    className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-white/90 mt-1">Patient: {selectedAppointment.patient?.name || 'Unknown'}</p>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
                <div className="space-y-6">
                  {/* Vitals Section */}
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">Vital Signs</h3>
                      <span className="text-sm text-red-600 font-medium">* Required</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Blood Pressure */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="w-5 h-5 text-red-600" />
                          <label className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg) *</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            placeholder="Systolic"
                            value={visitRecord.vitals.bloodPressure.systolic}
                            onChange={(e) => setVisitRecord({
                              ...visitRecord,
                              vitals: {
                                ...visitRecord.vitals,
                                bloodPressure: {
                                  ...visitRecord.vitals.bloodPressure,
                                  systolic: e.target.value
                                }
                              }
                            })}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <span className="text-gray-500 font-bold">/</span>
                          <input
                            type="number"
                            placeholder="Diastolic"
                            value={visitRecord.vitals.bloodPressure.diastolic}
                            onChange={(e) => setVisitRecord({
                              ...visitRecord,
                              vitals: {
                                ...visitRecord.vitals,
                                bloodPressure: {
                                  ...visitRecord.vitals.bloodPressure,
                                  diastolic: e.target.value
                                }
                              }
                            })}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Normal: 120/80</p>
                      </div>

                      {/* Heart Rate */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-5 h-5 text-pink-600" />
                          <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm) *</label>
                        </div>
                        <input
                          type="number"
                          placeholder="e.g., 72"
                          value={visitRecord.vitals.heartRate}
                          onChange={(e) => setVisitRecord({
                            ...visitRecord,
                            vitals: {
                              ...visitRecord.vitals,
                              heartRate: e.target.value
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Normal: 60-100 bpm</p>
                      </div>

                      {/* Blood Sugar */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Droplets className="w-5 h-5 text-orange-600" />
                          <label className="block text-sm font-medium text-gray-700">Blood Sugar (mg/dL) *</label>
                        </div>
                        <input
                          type="number"
                          placeholder="e.g., 110"
                          value={visitRecord.vitals.bloodSugar}
                          onChange={(e) => setVisitRecord({
                            ...visitRecord,
                            vitals: {
                              ...visitRecord.vitals,
                              bloodSugar: e.target.value
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Normal: 70-130 mg/dL</p>
                      </div>

                      {/* Temperature */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Thermometer className="w-5 h-5 text-red-500" />
                          <label className="block text-sm font-medium text-gray-700">Temperature (°F) *</label>
                        </div>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 98.6"
                          value={visitRecord.vitals.temperature}
                          onChange={(e) => setVisitRecord({
                            ...visitRecord,
                            vitals: {
                              ...visitRecord.vitals,
                              temperature: e.target.value
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Normal: 97.8-99.1°F</p>
                      </div>

                      {/* Oxygen Saturation */}
                      <div className="bg-white rounded-lg p-4 border border-blue-200 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <Wind className="w-5 h-5 text-blue-600" />
                          <label className="block text-sm font-medium text-gray-700">Oxygen Saturation (%) *</label>
                        </div>
                        <input
                          type="number"
                          placeholder="e.g., 98"
                          value={visitRecord.vitals.oxygenSaturation}
                          onChange={(e) => setVisitRecord({
                            ...visitRecord,
                            vitals: {
                              ...visitRecord.vitals,
                              oxygenSaturation: e.target.value
                            }
                          })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Normal: 95-100%</p>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
                      <textarea
                        value={visitRecord.diagnosis}
                        onChange={(e) => setVisitRecord({...visitRecord, diagnosis: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Enter diagnosis..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan *</label>
                      <textarea
                        value={visitRecord.treatment}
                        onChange={(e) => setVisitRecord({...visitRecord, treatment: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Enter treatment plan..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prescriptions</label>
                      <textarea
                        value={visitRecord.prescriptions}
                        onChange={(e) => setVisitRecord({...visitRecord, prescriptions: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Enter prescriptions (medication, dosage, duration)..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                      <input
                        type="date"
                        value={visitRecord.followUpDate}
                        onChange={(e) => setVisitRecord({...visitRecord, followUpDate: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea
                        value={visitRecord.notes}
                        onChange={(e) => setVisitRecord({...visitRecord, notes: e.target.value})}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Any additional notes or observations..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setShowCompleteModal(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCompleteAppointment}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Save & Complete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal - Keeping original */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Schedule New Appointment</h2>
                  <button 
                    onClick={() => setShowScheduleModal(false)}
                    className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                    <select
                      value={newAppointment.patientId}
                      onChange={(e) => setNewAppointment({...newAppointment, patientId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient._id} value={patient._id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                      <input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                      <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                      <select
                        value={newAppointment.duration}
                        onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                      <select
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="routine">Routine</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="emergency">Emergency</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
                    <textarea
                      value={newAppointment.reason}
                      onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter reason for visit..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Room 101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Any additional notes..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScheduleAppointment}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;