
import React, { useState } from 'react';
import { 
  User, Phone, Mail, Calendar, Heart, Activity, AlertTriangle, 
  CheckCircle2, Clock, FileText, Pill, Droplet, Utensils,
  TrendingUp, ChevronRight, Plus, Camera, Download, Edit,
  Bell, Settings, MessageSquare, Video, Send, Stethoscope, 
  Thermometer, Zap
} from 'lucide-react';

const CaregiverOverview = () => {
  const [dailyNote, setDailyNote] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning medication - Metformin 500mg', time: '8:00 AM', completed: true },
    { id: 2, title: 'Blood pressure check', time: '9:00 AM', completed: true },
    { id: 3, title: 'Lunch medication - Lisinopril 10mg', time: '12:00 PM', completed: false },
    { id: 4, title: 'Afternoon walk - 15 minutes', time: '3:00 PM', completed: false },
    { id: 5, title: 'Evening medication - Metformin 500mg', time: '8:00 PM', completed: false }
  ]);

  const vitals = [
    { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', status: 'normal', icon: Heart, color: 'blue' },
    { label: 'Heart Rate', value: '74', unit: 'bpm', status: 'normal', icon: Activity, color: 'red' },
    { label: 'Blood Sugar', value: '142', unit: 'mg/dL', status: 'high', icon: Droplet, color: 'purple' },
    { label: 'Temperature', value: '98.2', unit: '°F', status: 'normal', icon: Thermometer, color: 'orange' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Blood Sugar Monitoring',
      message: 'Please monitor blood sugar levels more frequently (before each meal). Target range: 80-130 mg/dL',
      doctor: 'Dr. Sarah Mitchell',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Medication Reminder',
      message: 'Prescription refill needed for Lisinopril within the next 7 days',
      doctor: 'Pharmacy Alert',
      time: '1 day ago'
    }
  ];

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Caregiver Overview</h1>
          <p className="text-gray-600">Managing Eleanor Thompson's daily care and wellness</p>
        </div>

        {/* Patient Overview Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                  alt="Patient"
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Eleanor Thompson</h2>
                <p className="text-gray-600">82 years old • Female</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Stable</span>
                  </span>
                  <span className="text-sm text-gray-500">Last updated: Today, 9:30 AM</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg transform hover:scale-105">
                <Phone className="w-4 h-4" />
                <span>Call Patient</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg transform hover:scale-105">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* Diagnosis Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Primary Condition</h3>
              </div>
              <p className="text-gray-700">Type 2 Diabetes Mellitus</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Secondary Condition</h3>
              </div>
              <p className="text-gray-700">Hypertension (Stage 1)</p>
            </div>
          </div>
        </div>

        {/* Doctor Contact Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Assigned Doctor</p>
                <h3 className="text-2xl font-bold">Dr. Sarah Mitchell</h3>
                <p className="text-sm text-blue-100">Internal Medicine Specialist</p>
                <p className="text-sm text-blue-100 mt-1">License: TNMC-2018-7542</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 font-medium shadow-lg transition-all transform hover:scale-105">
                <Phone className="w-5 h-5" />
                <span>Call Doctor</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 font-medium transition-all">
                <MessageSquare className="w-5 h-5" />
                <span>Send SMS</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 font-medium transition-all">
                <Video className="w-5 h-5" />
                <span>Video Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Latest Vitals Snapshot */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Latest Vitals Snapshot</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
              <span className="text-sm">View Full History</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitals.map((vital, index) => {
              const Icon = vital.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                red: 'from-red-500 to-red-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600'
              };
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[vital.color]} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vital.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{vital.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {vital.value}
                  </p>
                  <p className="text-sm text-gray-500">{vital.unit}</p>
                  <p className="text-xs text-gray-400 mt-2">Updated: Today 9:30 AM</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note from Doctor:</span> Blood sugar levels slightly elevated. Please ensure medications are taken with meals and monitor before each meal for the next week.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasks Completed Today</p>
                <p className="text-4xl font-bold text-gray-900">{completedTasks}/{totalTasks}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {Math.round((completedTasks / totalTasks) * 100)}% Complete
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Medication Compliance</p>
                <p className="text-4xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-green-600 font-medium mt-1">This Week</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Pill className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
                <p className="text-4xl font-bold text-gray-900">{recentAlerts.length}</p>
                <p className="text-sm text-yellow-600 font-medium mt-1">Needs Attention</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Today's Task Checklist</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {completedTasks}/{totalTasks} Done
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map(task => (
                <div key={task.id} className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                  task.completed ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200 hover:border-green-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-6 h-6 text-green-600 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-500">{task.time}</p>
                    </div>
                  </div>
                  {task.completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                </div>
              ))}
            </div>
            <button className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-medium shadow-lg transition-all">
              <Plus className="w-5 h-5" />
              <span>Add New Task</span>
            </button>
          </div>

          {/* Quick Daily Note */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Daily Note</h3>
            <div className="space-y-4">
              <textarea
                value={dailyNote}
                onChange={(e) => setDailyNote(e.target.value)}
                placeholder="Add observations, concerns, or notes about today's care...&#10;&#10;Example:&#10;- Patient seemed more energetic this morning&#10;- Completed 15-minute walk without fatigue&#10;- Good appetite at lunch&#10;- Blood sugar reading at 2 PM: 128 mg/dL"
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-medium shadow-lg transition-all">
                  <Send className="w-5 h-5" />
                  <span>Save Note</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-all">
                  <Camera className="w-5 h-5" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts from Doctor */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Alerts from Doctor</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentAlerts.map(alert => (
              <div key={alert.id} className={`p-5 border-l-4 rounded-xl ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : 'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-start space-x-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Bell className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Stethoscope className="w-3 h-3" />
                        <span>{alert.doctor}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.time}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverOverview;