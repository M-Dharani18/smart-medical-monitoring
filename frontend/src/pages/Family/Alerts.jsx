import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Clock, 
  User, 
  Calendar, 
  Filter,
  Search,
  X,
  Phone,
  Mail,
  MapPin,
  Activity,
  Heart,
  Thermometer,
  Pill,
  Star,
  Archive,
  Eye,
  MoreHorizontal
} from 'lucide-react';

const FamilyAlerts = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      title: 'Blood Sugar Reading High',
      message: 'Eleanor\'s blood sugar reading of 185 mg/dL is above normal range (target: <140 mg/dL)',
      type: 'critical',
      category: 'vitals',
      timestamp: '2024-03-21T14:30:00Z',
      isRead: false,
      isStarred: true,
      patient: 'Eleanor Johnson',
      source: 'Glucose Monitor',
      actionRequired: true,
      relatedData: {
        reading: '185 mg/dL',
        normal: '<140 mg/dL',
        location: 'Home',
        device: 'OneTouch Verio'
      },
      recommendations: [
        'Contact healthcare provider if readings remain elevated',
        'Review recent meals and medication timing',
        'Monitor for symptoms of hyperglycemia'
      ]
    },
    {
      id: 2,
      title: 'Medication Reminder',
      message: 'Evening Metformin dose (500mg) is overdue by 2 hours',
      type: 'warning',
      category: 'medication',
      timestamp: '2024-03-21T20:15:00Z',
      isRead: false,
      isStarred: false,
      patient: 'Eleanor Johnson',
      source: 'Medication Tracker',
      actionRequired: true,
      relatedData: {
        medication: 'Metformin',
        dosage: '500mg',
        scheduledTime: '8:00 PM',
        currentTime: '10:15 PM'
      },
      recommendations: [
        'Take medication now if not too late',
        'Set additional reminders for tomorrow',
        'Contact caregiver if assistance needed'
      ]
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      message: 'Upcoming appointment with Dr. Sarah Mitchell tomorrow at 10:30 AM',
      type: 'info',
      category: 'appointment',
      timestamp: '2024-03-21T09:00:00Z',
      isRead: true,
      isStarred: false,
      patient: 'Eleanor Johnson',
      source: 'Calendar System',
      actionRequired: false,
      relatedData: {
        doctor: 'Dr. Sarah Mitchell',
        specialty: 'Internal Medicine',
        date: 'March 22, 2024',
        time: '10:30 AM',
        location: 'HealthCenter Clinic'
      },
      recommendations: [
        'Prepare list of current medications',
        'Bring recent blood sugar logs',
        'Arrive 15 minutes early for check-in'
      ]
    },
    {
      id: 4,
      title: 'Heart Rate Anomaly Detected',
      message: 'Heart rate reading of 45 bpm is below normal range during rest period',
      type: 'warning',
      category: 'vitals',
      timestamp: '2024-03-21T06:45:00Z',
      isRead: true,
      isStarred: false,
      patient: 'Eleanor Johnson',
      source: 'Heart Rate Monitor',
      actionRequired: true,
      relatedData: {
        reading: '45 bpm',
        normal: '60-100 bpm',
        duration: '15 minutes',
        activity: 'Resting'
      },
      recommendations: [
        'Monitor for symptoms like dizziness or fatigue',
        'Contact healthcare provider if symptoms develop',
        'Continue regular monitoring'
      ]
    },
    {
      id: 5,
      title: 'Weekly Health Summary Available',
      message: 'Your weekly health report for Eleanor is ready for review',
      type: 'success',
      category: 'report',
      timestamp: '2024-03-21T08:00:00Z',
      isRead: false,
      isStarred: false,
      patient: 'Eleanor Johnson',
      source: 'Health Analytics',
      actionRequired: false,
      relatedData: {
        period: 'March 14-20, 2024',
        metrics: '5 categories tracked',
        trends: 'Generally stable',
        insights: '3 new insights available'
      },
      recommendations: [
        'Review trends and patterns',
        'Share with healthcare provider',
        'Note any concerning changes'
      ]
    },
    {
      id: 6,
      title: 'Emergency Contact Update Needed',
      message: 'Emergency contact information was last updated 6 months ago',
      type: 'info',
      category: 'system',
      timestamp: '2024-03-20T16:00:00Z',
      isRead: true,
      isStarred: false,
      patient: 'Eleanor Johnson',
      source: 'Account Management',
      actionRequired: false,
      relatedData: {
        lastUpdated: 'September 2023',
        contacts: '2 emergency contacts on file',
        status: 'Action recommended'
      },
      recommendations: [
        'Verify current contact information',
        'Update phone numbers and addresses',
        'Add additional emergency contacts if needed'
      ]
    }
  ];

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vitals': return <Activity className="w-4 h-4" />;
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'report': return <Eye className="w-4 h-4" />;
      case 'system': return <Info className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
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

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'unread') return matchesSearch && !alert.isRead;
    if (selectedFilter === 'critical') return matchesSearch && alert.type === 'critical';
    if (selectedFilter === 'action-required') return matchesSearch && alert.actionRequired;
    if (selectedFilter === 'starred') return matchesSearch && alert.isStarred;
    
    return matchesSearch;
  });

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical').length;
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;
  const actionRequiredAlerts = alerts.filter(alert => alert.actionRequired).length;

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
          <p className="text-gray-600">Stay informed about Eleanor's health status and care updates</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{unreadAlerts}</p>
              </div>
              <div className="relative">
                <Bell className="w-8 h-8 text-orange-500" />
                {unreadAlerts > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Action Required</p>
                <p className="text-2xl font-bold text-purple-600">{actionRequiredAlerts}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex space-x-2">
                {['all', 'unread', 'critical', 'action-required', 'starred'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      selectedFilter === filter
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all cursor-pointer ${
                !alert.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-lg font-semibold ${!alert.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {alert.title}
                      </h3>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      {alert.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{alert.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(alert.category)}
                        <span className="capitalize">{alert.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{alert.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getAlertTypeColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </div>
                  
                  {alert.actionRequired && (
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      ACTION REQUIRED
                    </div>
                  )}
                </div>
              </div>
              
              {alert.recommendations && alert.recommendations.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 mt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Quick Actions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {alert.recommendations.slice(0, 2).map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className={`p-6 border-b border-gray-200 ${
                selectedAlert.type === 'critical' ? 'bg-red-50' :
                selectedAlert.type === 'warning' ? 'bg-yellow-50' :
                selectedAlert.type === 'success' ? 'bg-green-50' :
                'bg-blue-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(selectedAlert.type)}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedAlert.title}</h2>
                      <p className="text-gray-600">{formatTimestamp(selectedAlert.timestamp)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(null)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Alert Details</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedAlert.message}</p>
                  </div>

                  {selectedAlert.relatedData && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Related Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(selectedAlert.relatedData).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="text-sm font-medium text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedAlert.recommendations && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Recommended Actions</h3>
                      <ul className="space-y-2">
                        {selectedAlert.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    {selectedAlert.actionRequired && (
                      <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        Take Action
                      </button>
                    )}
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Mark as Read
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      {selectedAlert.isStarred ? 'Unstar' : 'Star'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyAlerts;