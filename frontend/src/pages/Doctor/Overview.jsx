
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Heart, 
  Activity, 
  AlertTriangle, 
  CheckCircle2,
  Stethoscope,
  UserCheck,
  Clock,
  MapPin,
  TrendingUp,
  Shield,
  Users,
  AlertCircle,
  FileText,
  Award,
  Hospital,
  Navigation,
  ExternalLink,
  Edit,
  X
} from 'lucide-react';

const DoctorOverview = () => {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({
    specialization: '',
    license: '',
    experience: '',
    hospitalName: '',
    hospitalAddress: '',
    hospitalPhone: '',
    department: '',
    photo: ''
  });
  
  const [doctorData, setDoctorData] = useState({
    name: "Loading...",
    email: "",
    specialization: "",
    license: "",
    experience: "",
    hospital: {
      name: "Not provided",
      address: "Not provided",
      phone: "Not provided",
      department: "Not provided"
    },
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    isProfileComplete: false,
    stats: {
      totalPatients: 0,
      criticalCases: 0,
      appointmentsToday: 0,
      prescriptionsWritten: 0
    }
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
    fetchAppointments();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/doctors/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        const { doctor, recentActivity, notifications } = result.data;
        
        setDoctorData({
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          license: doctor.license,
          experience: doctor.experience,
          hospital: doctor.hospital,
          photo: doctor.photo,
          isProfileComplete: doctor.isProfileComplete,
          stats: doctor.stats
        });

        setRecentActivity(recentActivity);
        setNotifications(notifications);

        // Pre-fill form
        setProfileForm({
          specialization: doctor.specialization || '',
          license: doctor.license || '',
          experience: doctor.experience || '',
          hospitalName: doctor.hospital.name || '',
          hospitalAddress: doctor.hospital.address || '',
          hospitalPhone: doctor.hospital.phone || '',
          department: doctor.hospital.department || '',
          photo: doctor.photo || ''
        });

        // Show modal if profile incomplete
        if (!doctor.isProfileComplete) {
          setShowProfileModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchAppointments = async () => {
    try {
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
      
      // Update stats based on real appointment data
      updateStatsFromAppointments(appointmentsData);
      
      // Generate recent activity from appointments
      generateRecentActivity(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/updateprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setDoctorData(prev => ({
          ...prev,
          specialization: data.user.specialization,
          license: data.user.license,
          experience: data.user.experience,
          hospital: {
            name: data.user.hospitalName || "Not provided",
            address: data.user.hospitalAddress || "Not provided",
            phone: data.user.hospitalPhone || "Not provided",
            department: data.user.department || "Not provided"
          },
          photo: data.user.photo || prev.photo,
          isProfileComplete: true
        }));
        
        setShowProfileModal(false);
        alert('Profile updated successfully!');
        
        // Refresh dashboard data
        fetchDashboardData();
      } else {
        alert('Failed to update profile: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'prescription': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'report': return <Activity className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const openGoogleMaps = () => {
    const address = doctorData.hospital.address !== "Not provided" 
      ? encodeURIComponent(doctorData.hospital.address)
      : 'Erode+Government+Hospital+Erode+Tamil+Nadu+India';
    const url = `https://maps.google.com/maps?q=${address}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Complete Your Profile</h3>
                  <p className="text-blue-100">Help us provide better service by completing your professional details</p>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-white/80 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.specialization}
                    onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Internal Medicine"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical License <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.license}
                    onChange={(e) => setProfileForm({...profileForm, license: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., TNMC-2018-7542"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.experience}
                    onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 6 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Department of Internal Medicine"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital/Clinic Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.hospitalName}
                    onChange={(e) => setProfileForm({...profileForm, hospitalName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Erode Government Hospital"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={profileForm.hospitalAddress}
                    onChange={(e) => setProfileForm({...profileForm, hospitalAddress: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Collectorate Complex, Erode - 638001, Tamil Nadu"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={profileForm.hospitalPhone}
                    onChange={(e) => setProfileForm({...profileForm, hospitalPhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., +91 424 2240108"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={profileForm.photo}
                    onChange={(e) => setProfileForm({...profileForm, photo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                >
                  Save Profile
                </button>
                <button 
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Skip for Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Doctor Overview</h2>
          <p className="text-gray-600">Welcome back to your medical practice dashboard</p>
        </div>

        {!doctorData.isProfileComplete && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-yellow-800">Profile Incomplete</p>
                  <p className="text-sm text-yellow-700">Complete your professional details to access all features</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={doctorData.photo}
                alt={doctorData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{doctorData.name}</h3>
                  <p className="text-gray-600">
                    {doctorData.specialization || "Specialization not set"} 
                    {doctorData.experience && ` • ${doctorData.experience} Experience`}
                  </p>
                </div>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              {doctorData.license && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-1">Medical License</h4>
                  <p className="text-blue-700">{doctorData.license}</p>
                </div>
              )}
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Hospital className="w-4 h-4" />
                  <span>{doctorData.hospital.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Online • Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{doctorData.stats.totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-red-600">{doctorData.stats.criticalCases}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-green-600">{doctorData.stats.appointmentsToday}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prescriptions Written</p>
                <p className="text-2xl font-bold text-purple-600">{doctorData.stats.prescriptionsWritten}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                Recent Activity
              </h4>
              
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{activity.patient}</p>
                          <p className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                  Hospital Location
                </h4>
                {doctorData.hospital.address !== "Not provided" && (
                  <button 
                    onClick={openGoogleMaps}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
              
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg overflow-hidden border-2 border-blue-200">
                <div className="absolute inset-0 bg-blue-50 opacity-50">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ddd6fe' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3Cpath d='m40 40v-40h-40z' fill='%23c7d2fe'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Hospital className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-white rounded-lg shadow-xl p-4 border">
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-900 mb-1">{doctorData.hospital.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{doctorData.hospital.department}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex items-center justify-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{doctorData.hospital.address}</span>
                          </div>
                          {doctorData.hospital.phone !== "Not provided" && (
                            <div className="flex items-center justify-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{doctorData.hospital.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="border-8 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Click "Get Directions" to open in Google Maps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
            Priority Notifications
          </h4>
          
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${getNotificationColor(notification.priority)}`}
                  onClick={() => setSelectedNotification(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">{notification.title}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{notification.patient || 'System'}</span>
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {notification.type === 'emergency' ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : notification.type === 'caregiver' ? (
                        <UserCheck className="w-5 h-5 text-blue-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No notifications at this time</p>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {selectedNotification && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
              <div className={`p-6 border-b border-gray-200 ${
                selectedNotification.priority === 'high' ? 'bg-red-50' :
                selectedNotification.priority === 'medium' ? 'bg-yellow-50' :
                'bg-blue-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedNotification.title}</h3>
                    <p className="text-sm text-gray-600">{formatTimestamp(selectedNotification.timestamp)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedNotification(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{selectedNotification.message}</p>
                
                {selectedNotification.patient && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">Patient: <span className="font-medium text-gray-900">{selectedNotification.patient}</span></p>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {selectedNotification.priority === 'high' && (
                    <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                      Take Immediate Action
                    </button>
                  )}
                  <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    View Patient Details
                  </button>
                  <button 
                    onClick={() => setSelectedNotification(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

export default DoctorOverview
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
//   const [loading, setLoading] = useState(true);
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

//   const [recentActivity, setRecentActivity] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);

//   // Check if profile is complete
//   const checkProfileCompletion = (userData) => {
//     return userData.specialization && 
//            userData.license && 
//            userData.experience &&
//            userData.hospitalName &&
//            userData.hospitalAddress &&
//            userData.hospitalPhone &&
//            userData.department;
//   };

//   // Fetch all data on mount
//   useEffect(() => {
//     loadDoctorData();
//     fetchPatients();
//     fetchAppointments();
//   }, []);

//   // Fetch appointments from backend
//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/appointments', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch appointments');
      
//       const result = await response.json();
//       const appointmentsData = result.data || result;
//       setAppointments(appointmentsData);
      
//       // Generate activity from appointments
//       generateActivityFromAppointments(appointmentsData);
      
//       // Update stats with appointments data
//       updateStatsWithAppointments(appointmentsData);
      
//     } catch (err) {
//       console.error('Error fetching appointments:', err);
//       setAppointments([]);
//     }
//   };

//   // Update stats with appointments data
//   const updateStatsWithAppointments = (appointmentsData) => {
//     const today = new Date().toDateString();
//     const appointmentsToday = appointmentsData.filter(apt => {
//       const aptDate = new Date(apt.date).toDateString();
//       return aptDate === today;
//     }).length;

//     setDoctorData(prev => ({
//       ...prev,
//       stats: {
//         ...prev.stats,
//         appointmentsToday: appointmentsToday
//       }
//     }));
//   };

//   // Load doctor data from localStorage and update profile form
//   const loadDoctorData = () => {
//     try {
//       const userDataString = localStorage.getItem('user');
//       const role = localStorage.getItem('role');
      
//       if (userDataString && role === 'doctor') {
//         const userData = JSON.parse(userDataString);
        
//         const isComplete = checkProfileCompletion(userData);
        
//         setDoctorData(prev => ({
//           ...prev,
//           name: userData.name || userData.fullName || "Dr. " + (userData.email?.split('@')[0] || "Doctor"),
//           email: userData.email || "",
//           specialization: userData.specialization || "",
//           license: userData.license || "",
//           experience: userData.experience || "",
//           hospital: {
//             name: userData.hospitalName || "Not provided",
//             address: userData.hospitalAddress || "Not provided",
//             phone: userData.hospitalPhone || "Not provided",
//             coordinates: prev.hospital.coordinates,
//             department: userData.department || "Not provided"
//           },
//           photo: userData.photo || prev.photo,
//           isProfileComplete: isComplete
//         }));

//         // Pre-fill form with existing data
//         setProfileForm({
//           specialization: userData.specialization || '',
//           license: userData.license || '',
//           experience: userData.experience || '',
//           hospitalName: userData.hospitalName || '',
//           hospitalAddress: userData.hospitalAddress || '',
//           hospitalPhone: userData.hospitalPhone || '',
//           department: userData.department || '',
//           photo: userData.photo || ''
//         });

//         // Show modal if profile incomplete
//         if (!isComplete) {
//           setShowProfileModal(true);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading doctor data:', error);
//     }
//   };

//   // Fetch patients from backend
//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/patients', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch patients');
      
//       const result = await response.json();
//       const patientsData = result.data || result;
//       setPatients(patientsData);
      
//       // Calculate stats from real data
//       calculateStats(patientsData);
      
//       // Generate notifications from patient data
//       generateNotifications(patientsData);
      
//     } catch (err) {
//       console.error('Error fetching patients:', err);
//       setPatients([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate stats from real data
//   const calculateStats = (patientsData,appointmentsData = appointments) => {
//     const today = new Date().toDateString();
    
//     // Calculate appointments today from appointments array
//     const appointmentsToday = appointmentsData.filter(apt => {
//       const aptDate = new Date(apt.date).toDateString();
//       return aptDate === today;
//     }).length;

//     // Calculate total prescriptions from appointments with visitRecords
//     const prescriptionsWritten = appointmentsData.reduce((total, apt) => {
//       if (apt.visitRecord && apt.visitRecord.prescriptions) {
//         return total + apt.visitRecord.prescriptions.length;
//       }
//       return total;
//     }, 0);

//     const stats = {
//       totalPatients: patientsData.length,
//       criticalCases: patientsData.filter(p => p.status === 'critical').length,
//       appointmentsToday: appointmentsToday,
//       prescriptionsWritten: prescriptionsWritten
//     };
    
//     setDoctorData(prev => ({ ...prev, stats }));
//   };

//   // Generate notifications from patient data
//   const generateNotifications = (patientsData) => {
//     const notifs = [];
    
//     // Critical patients
//     const criticalPatients = patientsData.filter(p => p.status === 'critical');
//     criticalPatients.slice(0, 2).forEach(patient => {
//       notifs.push({
//         id: `critical-${patient._id}`,
//         type: 'emergency',
//         title: 'Critical Patient Alert',
//         message: `${patient.name} requires immediate attention - Status: ${patient.diagnosis}`,
//         timestamp: new Date(patient.lastVisit || patient.updatedAt).toISOString(),
//         priority: 'high',
//         patient: patient.name
//       });
//     });

//     // Monitoring patients
//     const monitoringPatients = patientsData.filter(p => p.status === 'monitoring');
//     if (monitoringPatients.length > 0) {
//       const patient = monitoringPatients[0];
//       notifs.push({
//         id: `monitoring-${patient._id}`,
//         type: 'caregiver',
//         title: 'Patient Monitoring Update',
//         message: `${patient.name} - ${patient.diagnosis}. Caregiver: ${patient.caregiver}`,
//         timestamp: new Date(patient.lastVisit || patient.updatedAt).toISOString(),
//         priority: 'medium',
//         patient: patient.name
//       });
//     }

//     // Appointments today
//     const today = new Date().toDateString();
//     const todayAppointments = patientsData.filter(p => {
//       if (!p.nextAppointment) return false;
//       return new Date(p.nextAppointment).toDateString() === today;
//     });

//     if (todayAppointments.length > 0) {
//       notifs.push({
//         id: 'appointments-today',
//         type: 'system',
//         title: 'Today\'s Appointments',
//         message: `You have ${todayAppointments.length} appointment(s) scheduled for today`,
//         timestamp: new Date().toISOString(),
//         priority: 'low'
//       });
//     }

//     // Default notification if no data
//     if (notifs.length === 0) {
//       notifs.push({
//         id: 'no-alerts',
//         type: 'system',
//         title: 'All Systems Normal',
//         message: 'No critical alerts at this time. All patients are stable.',
//         timestamp: new Date().toISOString(),
//         priority: 'low'
//       });
//     }

//     setNotifications(notifs);
//   };

//   // Generate recent activity from real appointments and patient data
//   const generateActivityFromAppointments = (appointmentsData) => {
//     const activities = [];
    
//     // Get recent completed appointments
//     const completedAppointments = appointmentsData
//       .filter(apt => apt.status === 'completed')
//       .sort((a, b) => {
//         const dateA = apt.visitRecord?.completedAt ? new Date(apt.visitRecord.completedAt) : new Date(apt.date);
//         const dateB = apt.visitRecord?.completedAt ? new Date(apt.visitRecord.completedAt) : new Date(apt.date);
//         return dateB - dateA;
//       })
//       .slice(0, 2);

//     completedAppointments.forEach(apt => {
//       activities.push({
//         id: `apt-${apt._id}`,
//         type: 'appointment',
//         title: 'Appointment Completed',
//         description: `Completed ${apt.type} checkup - ${apt.reason}`,
//         timestamp: apt.visitRecord?.completedAt || apt.updatedAt || apt.date,
//         patient: apt.patient?.name || 'Unknown Patient'
//       });

//       // Add prescription activity if prescriptions were given
//       if (apt.visitRecord?.prescriptions) {
//         activities.push({
//           id: `pres-${apt._id}`,
//           type: 'prescription',
//           title: 'Prescription Written',
//           description: 'Updated medications and prescriptions',
//           timestamp: apt.visitRecord?.completedAt || apt.updatedAt,
//           patient: apt.patient?.name || 'Unknown Patient'
//         });
//       }
//     });

//     // Get upcoming appointments
//     const today = new Date();
//     const upcomingAppointments = appointmentsData
//       .filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= today)
//       .sort((a, b) => new Date(a.date) - new Date(b.date))
//       .slice(0, 2);

//     upcomingAppointments.forEach(apt => {
//       activities.push({
//         id: `upcoming-${apt._id}`,
//         type: 'alert',
//         title: 'Upcoming Appointment',
//         description: `Scheduled ${apt.type} appointment - ${apt.reason}`,
//         timestamp: apt.createdAt || apt.date,
//         patient: apt.patient?.name || 'Unknown Patient'
//       });
//     });

//     // Sort by timestamp and limit to 4 most recent
//     const sortedActivities = activities
//       .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//       .slice(0, 4);

//     // Add default activity if none exist
//     if (sortedActivities.length === 0) {
//       sortedActivities.push({
//         id: 1,
//         type: 'system',
//         title: 'Welcome',
//         description: 'Schedule appointments and manage patients to see activity',
//         timestamp: new Date().toISOString(),
//         patient: 'System'
//       });
//     }

//     setRecentActivity(sortedActivities);
//   };

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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
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
//                     Department <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileForm.department}
//                     onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Department of Internal Medicine"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital/Clinic Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={profileForm.hospitalName}
//                     onChange={(e) => setProfileForm({...profileForm, hospitalName: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Erode Government Hospital"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital Address <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     required
//                     value={profileForm.hospitalAddress}
//                     onChange={(e) => setProfileForm({...profileForm, hospitalAddress: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Collectorate Complex, Erode - 638001, Tamil Nadu"
//                     rows="2"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Hospital Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     required
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

//         {/* Quick Stats - Now with Real Data */}
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
//           {/* Recent Activity - Now with Real Data */}
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