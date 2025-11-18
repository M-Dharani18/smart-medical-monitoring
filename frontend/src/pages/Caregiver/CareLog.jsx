
import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Camera, Download, ChevronRight,
  Clock, Utensils, Droplet, AlertTriangle, FileText,
  Thermometer, Activity, TrendingUp, Edit, Eye, X
} from 'lucide-react';

const CareLog = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    condition: '',
    medicationsGiven: 'yes',
    medicationNotes: '',
    meals: '',
    hydration: '',
    concerns: '',
    photos: []
  });

  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2024-03-18',
      condition: 'Good',
      medicationsGiven: true,
      meals: 'All meals consumed',
      hydration: 'Adequate - 6 glasses',
      concerns: 'None reported',
      vitals: { bp: '128/82', hr: '74', temp: '98.2' }
    },
    {
      id: 2,
      date: '2024-03-17',
      condition: 'Fair',
      medicationsGiven: true,
      meals: 'Light appetite at dinner',
      hydration: 'Below target - 4 glasses',
      concerns: 'Slight fatigue in afternoon, rested well',
      vitals: { bp: '132/85', hr: '76', temp: '98.4' }
    },
    {
      id: 3,
      date: '2024-03-16',
      condition: 'Excellent',
      medicationsGiven: true,
      meals: 'All meals consumed, good appetite',
      hydration: 'Good - 7 glasses',
      concerns: 'None',
      vitals: { bp: '125/80', hr: '72', temp: '98.1' }
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully!');
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      condition: '',
      medicationsGiven: 'yes',
      medicationNotes: '',
      meals: '',
      hydration: '',
      concerns: '',
      photos: []
    });
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportToPDF = () => {
    alert('Exporting reports to PDF...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Daily Care Log</h1>
          <p className="text-gray-600">Record and track Eleanor's daily observations and care activities</p>
        </div>

        {/* Today's Report Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Report Form</h2>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-xl font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Overall Condition */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Overall Condition <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select condition...</option>
                  <option value="excellent">😊 Excellent - Very energetic and alert</option>
                  <option value="good">🙂 Good - Normal activity level</option>
                  <option value="fair">😐 Fair - Slightly tired or low energy</option>
                  <option value="poor">😟 Poor - Weak or concerning symptoms</option>
                </select>
              </div>

              {/* Medications Given */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medications Given <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 flex-1">
                    <input
                      type="radio"
                      value="yes"
                      checked={formData.medicationsGiven === 'yes'}
                      onChange={(e) => setFormData({...formData, medicationsGiven: e.target.value})}
                      className="w-5 h-5 text-green-600"
                    />
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Yes, All Given</span>
                  </label>
                  <label className="flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 flex-1">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.medicationsGiven === 'no'}
                      onChange={(e) => setFormData({...formData, medicationsGiven: e.target.value})}
                      className="w-5 h-5 text-red-600"
                    />
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-medium">No, Missed</span>
                  </label>
                </div>
                {formData.medicationsGiven === 'no' && (
                  <input
                    type="text"
                    placeholder="Please specify reason for missed medication..."
                    value={formData.medicationNotes}
                    onChange={(e) => setFormData({...formData, medicationNotes: e.target.value})}
                    className="mt-3 w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Meals & Appetite */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meals & Appetite <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.meals}
                  onChange={(e) => setFormData({...formData, meals: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select meal status...</option>
                  <option value="all-consumed">All meals consumed (100%)</option>
                  <option value="good-appetite">Good appetite (75-90%)</option>
                  <option value="partial">Partial consumption (50-75%)</option>
                  <option value="light-appetite">Light appetite (25-50%)</option>
                  <option value="poor-appetite">Poor appetite (&lt;25%)</option>
                  <option value="refused">Refused meals</option>
                </select>
              </div>

              {/* Hydration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hydration Status <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.hydration}
                  onChange={(e) => setFormData({...formData, hydration: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select hydration level...</option>
                  <option value="excellent">Excellent (8+ glasses)</option>
                  <option value="good">Good (6-7 glasses)</option>
                  <option value="adequate">Adequate (4-5 glasses)</option>
                  <option value="below-target">Below Target (2-3 glasses)</option>
                  <option value="poor">Poor (&lt;2 glasses)</option>
                </select>
              </div>

              {/* Concerns & Observations */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Concerns & Observations
                </label>
                <textarea
                  value={formData.concerns}
                  onChange={(e) => setFormData({...formData, concerns: e.target.value})}
                  placeholder="Record any concerns, unusual symptoms, behaviors, or positive observations...&#10;&#10;Examples:&#10;- Complained of mild headache after lunch&#10;- Seemed more energetic during afternoon walk&#10;- Appetite improved compared to yesterday&#10;- Blood sugar reading at 2 PM: 128 mg/dL&#10;- Napped for 1 hour in afternoon"
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
                <p className="mt-2 text-sm text-gray-500">Be specific about timing, severity, and any actions taken</p>
              </div>

              {/* Photo Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo Upload (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Click to upload photos</p>
                  <p className="text-xs text-gray-500">Meals, activities, or any visual observations</p>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 10MB each • Max 5 photos</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg transform hover:scale-[1.02] transition-all"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>Submit Today's Report</span>
              </button>
              <button 
                type="button"
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>

        {/* Report History */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Report History</h2>
              <p className="text-sm text-gray-600 mt-1">View and manage past daily reports</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 font-medium transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Calendar View</span>
              </button>
              <button 
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 font-medium transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Export to PDF</span>
              </button>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {reports.map(report => (
              <div 
                key={report.id} 
                className="p-5 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-green-300 transition-all cursor-pointer bg-white"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <p className="font-bold text-gray-900 text-lg">
                        {new Date(report.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getConditionColor(report.condition)}`}>
                          {report.condition}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className={`w-4 h-4 ${report.medicationsGiven ? 'text-green-600' : 'text-red-600'}`} />
                        <span className="text-sm text-gray-600">
                          Meds: {report.medicationsGiven ? '✓ Given' : '✗ Missed'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Utensils className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">{report.meals}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplet className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{report.hydration}</span>
                      </div>
                    </div>

                    {report.concerns !== 'None' && report.concerns !== 'None reported' && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Concerns: </span>{report.concerns}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                      <Edit className="w-5 h-5" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="mt-6 w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-all">
            Load More Reports
          </button>
        </div>

        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Daily Care Report</h2>
                    <p className="text-green-100">
                      {new Date(selectedReport.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedReport(null)}
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-150px)] p-6">
                <div className="space-y-6">
                  {/* Overall Condition */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Overall Condition</h3>
                    <span className={`inline-block px-4 py-2 rounded-xl font-medium border-2 ${getConditionColor(selectedReport.condition)}`}>
                      {selectedReport.condition}
                    </span>
                  </div>

                  {/* Vitals */}
                  {selectedReport.vitals && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-3">Vitals Recorded</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <p className="text-sm text-gray-600 mb-1">Blood Pressure</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedReport.vitals.bp}</p>
                          <p className="text-xs text-gray-500">mmHg</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                          <p className="text-sm text-gray-600 mb-1">Heart Rate</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedReport.vitals.hr}</p>
                          <p className="text-xs text-gray-500">bpm</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <p className="text-sm text-gray-600 mb-1">Temperature</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedReport.vitals.temp}</p>
                          <p className="text-xs text-gray-500">°F</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Medications */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Medications</h3>
                    <div className={`p-4 rounded-xl border-2 ${
                      selectedReport.medicationsGiven 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {selectedReport.medicationsGiven ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <span className="font-medium text-green-900">All medications given as prescribed</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                            <span className="font-medium text-red-900">Medications missed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Meals & Hydration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-3">Meals & Appetite</h3>
                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Utensils className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-gray-900">Meal Status</span>
                        </div>
                        <p className="text-gray-700">{selectedReport.meals}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-3">Hydration</h3>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Droplet className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">Water Intake</span>
                        </div>
                        <p className="text-gray-700">{selectedReport.hydration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Concerns */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Concerns & Observations</h3>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-gray-700">{selectedReport.concerns}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium transition-all">
                    <Download className="w-5 h-5" />
                    <span>Download Report</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-all">
                    <Edit className="w-5 h-5" />
                    <span>Edit Report</span>
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

export default CareLog;





