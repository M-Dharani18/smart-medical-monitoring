import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Hospital, 
  Search,
  Filter,
  Upload,
  Star,
  Clock,
  FileImage,
  FileMinus,
  CheckCircle,
  AlertCircle,
  X,
  ArrowUpRight
} from 'lucide-react';

const FamilyReports = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [starredReports, setStarredReports] = useState(new Set([1, 3]));

  // Sample reports data
  const reports = [
    {
      id: 1,
      title: 'Complete Blood Count (CBC)',
      type: 'lab',
      date: '2024-03-18',
      doctor: 'Dr. Sarah Mitchell',
      facility: 'HealthCenter Labs',
      status: 'normal',
      priority: 'routine',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      summary: 'All blood parameters within normal range. Slight improvement in glucose levels.',
      keyFindings: [
        { parameter: 'Hemoglobin', value: '13.8 g/dL', normal: '12.0-15.5 g/dL', status: 'normal' },
        { parameter: 'White Blood Cells', value: '6.2 K/uL', normal: '4.5-11.0 K/uL', status: 'normal' },
        { parameter: 'Glucose', value: '142 mg/dL', normal: '<140 mg/dL', status: 'slightly_high' }
      ],
      downloadUrl: '/reports/cbc-march-2024.pdf'
    },
    {
      id: 2,
      title: 'Chest X-Ray Report',
      type: 'imaging',
      date: '2024-03-15',
      doctor: 'Dr. Robert Chen',
      facility: 'City Medical Center',
      status: 'normal',
      priority: 'routine',
      fileSize: '8.7 MB',
      fileType: 'PDF + Images',
      summary: 'Clear chest X-ray with no acute findings. Lungs appear clear.',
      keyFindings: [
        { parameter: 'Heart Size', value: 'Normal', normal: 'Normal', status: 'normal' },
        { parameter: 'Lung Fields', value: 'Clear', normal: 'Clear', status: 'normal' },
        { parameter: 'Bones', value: 'Intact', normal: 'Intact', status: 'normal' }
      ],
      downloadUrl: '/reports/chest-xray-march-2024.pdf'
    },
    {
      id: 3,
      title: 'Prescription - Diabetes Management',
      type: 'prescription',
      date: '2024-03-10',
      doctor: 'Dr. Sarah Mitchell',
      facility: 'HealthCenter Clinic',
      status: 'active',
      priority: 'important',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      summary: 'Updated diabetes medication regimen with dosage adjustments.',
      keyFindings: [
        { parameter: 'Metformin', value: 'Increased to 1000mg', normal: 'Twice daily', status: 'updated' },
        { parameter: 'Lisinopril', value: '10mg', normal: 'Once daily', status: 'unchanged' }
      ],
      downloadUrl: '/reports/prescription-march-2024.pdf'
    },
    {
      id: 4,
      title: 'Hospital Discharge Summary',
      type: 'discharge',
      date: '2024-02-28',
      doctor: 'Dr. Michael Torres',
      facility: 'General Hospital',
      status: 'recovered',
      priority: 'important',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      summary: 'Successfully treated for minor respiratory infection. Full recovery achieved.',
      keyFindings: [
        { parameter: 'Admission Reason', value: 'Respiratory infection', normal: 'Resolved', status: 'resolved' },
        { parameter: 'Length of Stay', value: '2 days', normal: 'Short stay', status: 'normal' },
        { parameter: 'Follow-up', value: 'Required', normal: 'Scheduled', status: 'scheduled' }
      ],
      downloadUrl: '/reports/discharge-summary-feb-2024.pdf'
    },
    {
      id: 5,
      title: 'Lipid Profile Test',
      type: 'lab',
      date: '2024-02-20',
      doctor: 'Dr. Sarah Mitchell',
      facility: 'HealthCenter Labs',
      status: 'borderline',
      priority: 'monitor',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      summary: 'Cholesterol levels slightly elevated, dietary changes recommended.',
      keyFindings: [
        { parameter: 'Total Cholesterol', value: '210 mg/dL', normal: '<200 mg/dL', status: 'high' },
        { parameter: 'LDL Cholesterol', value: '135 mg/dL', normal: '<100 mg/dL', status: 'high' },
        { parameter: 'HDL Cholesterol', value: '45 mg/dL', normal: '>40 mg/dL', status: 'normal' }
      ],
      downloadUrl: '/reports/lipid-profile-feb-2024.pdf'
    },
    {
      id: 6,
      title: 'ECG Report',
      type: 'test',
      date: '2024-02-15',
      doctor: 'Dr. Sarah Mitchell',
      facility: 'HealthCenter Clinic',
      status: 'normal',
      priority: 'routine',
      fileSize: '2.9 MB',
      fileType: 'PDF',
      summary: 'Normal sinus rhythm, no irregular heartbeats detected.',
      keyFindings: [
        { parameter: 'Rhythm', value: 'Normal Sinus', normal: 'Normal Sinus', status: 'normal' },
        { parameter: 'Rate', value: '72 bpm', normal: '60-100 bpm', status: 'normal' },
        { parameter: 'Intervals', value: 'Normal', normal: 'Normal', status: 'normal' }
      ],
      downloadUrl: '/reports/ecg-feb-2024.pdf'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Reports', icon: FileText },
    { id: 'lab', name: 'Lab Results', icon: FileMinus },
    { id: 'imaging', name: 'Imaging', icon: FileImage },
    { id: 'prescription', name: 'Prescriptions', icon: FileText },
    { id: 'discharge', name: 'Discharge Reports', icon: Hospital },
    { id: 'test', name: 'Tests', icon: FileText }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'borderline': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recovered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'recovered': return <CheckCircle className="w-4 h-4" />;
      case 'borderline': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lab': return <FileMinus className="w-5 h-5 text-white" />;
      case 'imaging': return <FileImage className="w-5 h-5 text-white" />;
      case 'prescription': return <FileText className="w-5 h-5 text-white" />;
      case 'discharge': return <Hospital className="w-5 h-5 text-white" />;
      case 'test': return <FileText className="w-5 h-5 text-white" />;
      default: return <FileText className="w-5 h-5 text-white" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'important': return 'text-red-600 bg-red-50 border-red-200';
      case 'monitor': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'routine': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const toggleStar = (reportId) => {
    const newStarred = new Set(starredReports);
    if (newStarred.has(reportId)) {
      newStarred.delete(reportId);
    } else {
      newStarred.add(reportId);
    }
    setStarredReports(newStarred);
  };

  const handleDownload = (report) => {
    alert(`Downloading ${report.title}...`);
    // In real implementation, trigger actual download
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.facility.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && report.type === selectedCategory;
  });

  const recentReports = reports.filter(report => {
    const reportDate = new Date(report.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return reportDate >= thirtyDaysAgo;
  }).length;

  const pendingReports = reports.filter(report => report.status === 'borderline').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Medical Reports</h1>
            <p className="text-gray-600">Access Eleanor's lab results, prescriptions, and medical documents</p>
          </div>
          
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg animate-slideInRight">
            <Upload className="w-5 h-5" />
            <span>Upload Report</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-white/20 hover:shadow-xl transition-all duration-300 animate-slideInUp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Reports</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-white/20 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Recent Reports</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{recentReports}</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-white/20 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Pending Review</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-600">{pendingReports}</p>
              </div>
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-white/20 hover:shadow-xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Starred Reports</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{starredReports.size}</p>
              </div>
              <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Categories and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-white/20 mb-8 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <div 
              key={report.id} 
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{report.title}</h3>
                      <p className="text-xs text-gray-500">{report.fileType} • {report.fileSize}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleStar(report.id)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          starredReports.has(report.id) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`} 
                      />
                    </button>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(report.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{report.doctor}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Hospital className="w-4 h-4" />
                    <span>{report.facility}</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm px-2 py-1 rounded-lg border ${getPriorityColor(report.priority)}`}>
                    <AlertCircle className="w-4 h-4" />
                    <span className="capitalize">{report.priority} Priority</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{report.summary}</p>
                </div>

                {/* Key Findings */}
                {report.keyFindings && report.keyFindings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Findings</h4>
                    <div className="space-y-2">
                      {report.keyFindings.slice(0, 2).map((finding, index) => (
                        <div key={index} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2">
                          <span className="text-gray-600 font-medium">{finding.parameter}</span>
                          <span className={`font-semibold ${
                            finding.status === 'normal' ? 'text-green-600' :
                            finding.status === 'high' || finding.status === 'slightly_high' ? 'text-red-600' :
                            finding.status === 'updated' ? 'text-blue-600' :
                            'text-gray-900'
                          }`}>
                            {finding.value}
                          </span>
                        </div>
                      ))}
                      {report.keyFindings.length > 2 && (
                        <p className="text-xs text-gray-400 text-center">+{report.keyFindings.length - 2} more findings</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium transform hover:scale-[1.02]"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button 
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium transform hover:scale-[1.02]"
                    onClick={() => handleDownload(report)}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedReport.title}</h2>
                    <p className="text-blue-100">
                      {selectedReport.doctor} • {new Date(selectedReport.date).toLocaleDateString()}
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
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">Report Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 font-medium">Date:</span>
                          <span className="font-semibold">{new Date(selectedReport.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 font-medium">Doctor:</span>
                          <span className="font-semibold">{selectedReport.doctor}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 font-medium">Facility:</span>
                          <span className="font-semibold">{selectedReport.facility}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 font-medium">Status:</span>
                          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedReport.status)}`}>
                            {getStatusIcon(selectedReport.status)}
                            <span className="capitalize">{selectedReport.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">Summary</h3>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-gray-700 leading-relaxed">{selectedReport.summary}</p>
                      </div>
                    </div>
                  </div>

                  {selectedReport.keyFindings && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 text-lg mb-4 border-b border-gray-200 pb-2">Detailed Findings</h3>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left py-4 px-6 text-gray-700 font-semibold">Parameter</th>
                                <th className="text-left py-4 px-6 text-gray-700 font-semibold">Value</th>
                                <th className="text-left py-4 px-6 text-gray-700 font-semibold">Normal Range</th>
                                <th className="text-left py-4 px-6 text-gray-700 font-semibold">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedReport.keyFindings.map((finding, index) => (
                                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                  <td className="py-4 px-6 text-gray-900 font-medium">{finding.parameter}</td>
                                  <td className="py-4 px-6 font-semibold">{finding.value}</td>
                                  <td className="py-4 px-6 text-gray-600">{finding.normal}</td>
                                  <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      finding.status === 'normal' ? 'bg-green-100 text-green-800' :
                                      finding.status === 'high' || finding.status === 'slightly_high' ? 'bg-red-100 text-red-800' :
                                      finding.status === 'updated' ? 'bg-blue-100 text-blue-800' :
                                      finding.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                      finding.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                                      finding.status === 'unchanged' ? 'bg-gray-100 text-gray-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {finding.status.replace('_', ' ')}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4">
                    <button 
                      className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium transform hover:scale-[1.02] shadow-lg"
                      onClick={() => handleDownload(selectedReport)}
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Full Report</span>
                    </button>
                    <button 
                      className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium transform hover:scale-[1.02]"
                      onClick={() => toggleStar(selectedReport.id)}
                    >
                      <Star className={`w-5 h-5 ${
                        starredReports.has(selectedReport.id) 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-400'
                      }`} />
                      <span>
                        {starredReports.has(selectedReport.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </span>
                    </button>
                    <button 
                      className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium transform hover:scale-[1.02]"
                      onClick={() => alert('Share functionality would be implemented here')}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      <span>Share Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FamilyReports;