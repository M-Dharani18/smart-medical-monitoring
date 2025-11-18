import React, { useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const FamilyVitals = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedVital, setSelectedVital] = useState('bloodPressure');

  // Sample data - would come from API in real app
  const currentVitals = [
    {
      id: 'bloodPressure',
      name: 'Blood Pressure',
      value: '125/80',
      unit: 'mmHg',
      status: 'normal',
      icon: Heart,
      color: 'blue',
      lastUpdated: '2 hours ago',
      trend: 'stable',
      normal: '120-139 / 80-89'
    },
    {
      id: 'heartRate',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      icon: Activity,
      color: 'red',
      lastUpdated: '2 hours ago',
      trend: 'down',
      normal: '60-100 bpm'
    },
    {
      id: 'bloodSugar',
      name: 'Blood Sugar',
      value: '145',
      unit: 'mg/dL',
      status: 'high',
      icon: Droplets,
      color: 'orange',
      lastUpdated: '4 hours ago',
      trend: 'up',
      normal: '<140 mg/dL'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      icon: Thermometer,
      color: 'green',
      lastUpdated: '6 hours ago',
      trend: 'stable',
      normal: '97.8-99.1°F'
    },
    {
      id: 'oxygen',
      name: 'Oxygen Level',
      value: '98',
      unit: '%',
      status: 'normal',
      icon: Wind,
      color: 'cyan',
      lastUpdated: '2 hours ago',
      trend: 'stable',
      normal: '95-100%'
    }
  ];

  const chartData7Days = [
    { date: 'Mar 15', bloodPressure: 120, heartRate: 68, bloodSugar: 140, temperature: 98.4, oxygen: 97 },
    { date: 'Mar 16', bloodPressure: 122, heartRate: 72, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
    { date: 'Mar 17', bloodPressure: 118, heartRate: 70, bloodSugar: 138, temperature: 98.2, oxygen: 98 },
    { date: 'Mar 18', bloodPressure: 125, heartRate: 75, bloodSugar: 142, temperature: 98.8, oxygen: 97 },
    { date: 'Mar 19', bloodPressure: 123, heartRate: 69, bloodSugar: 148, temperature: 98.5, oxygen: 98 },
    { date: 'Mar 20', bloodPressure: 127, heartRate: 73, bloodSugar: 151, temperature: 98.7, oxygen: 97 },
    { date: 'Mar 21', bloodPressure: 125, heartRate: 72, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
  ];

  const chartData30Days = [
    { date: 'Feb 22', bloodPressure: 125, heartRate: 70, bloodSugar: 142, temperature: 98.5, oxygen: 98 },
    { date: 'Feb 29', bloodPressure: 123, heartRate: 72, bloodSugar: 138, temperature: 98.4, oxygen: 97 },
    { date: 'Mar 7', bloodPressure: 128, heartRate: 74, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
    { date: 'Mar 14', bloodPressure: 122, heartRate: 71, bloodSugar: 140, temperature: 98.3, oxygen: 98 },
    { date: 'Mar 21', bloodPressure: 125, heartRate: 72, bloodSugar: 145, temperature: 98.6, oxygen: 98 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'high': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'high': case 'low': return <AlertTriangle className="w-4 h-4" />;
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

  const getChartData = () => {
    return selectedPeriod === '7days' ? chartData7Days : chartData30Days;
  };

  const getVitalColor = (vitalId) => {
    const vital = currentVitals.find(v => v.id === vitalId);
    switch (vital?.color) {
      case 'blue': return '#3B82F6';
      case 'red': return '#EF4444';
      case 'orange': return '#F97316';
      case 'green': return '#10B981';
      case 'cyan': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Vital Signs</h1>
            <p className="text-gray-600">Monitor Eleanor's health metrics and trends</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
            <div className="text-sm text-gray-500 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Current Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {currentVitals.map((vital) => {
            const Icon = vital.icon;
            return (
              <div
                key={vital.id}
                className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedVital === vital.id ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
                onClick={() => setSelectedVital(vital.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    vital.color === 'blue' ? 'bg-blue-100' :
                    vital.color === 'red' ? 'bg-red-100' :
                    vital.color === 'orange' ? 'bg-orange-100' :
                    vital.color === 'green' ? 'bg-green-100' :
                    'bg-cyan-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      vital.color === 'blue' ? 'text-blue-600' :
                      vital.color === 'red' ? 'text-red-600' :
                      vital.color === 'orange' ? 'text-orange-600' :
                      vital.color === 'green' ? 'text-green-600' :
                      'text-cyan-600'
                    }`} />
                  </div>
                  
                  <div className="flex flex-col items-end space-y-1">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                      {getStatusIcon(vital.status)}
                      <span className="capitalize">{vital.status}</span>
                    </div>
                    {getTrendIcon(vital.trend)}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{vital.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                    <span className="text-sm text-gray-500">{vital.unit}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Normal: {vital.normal}</div>
                  <div className="text-xs text-gray-400">Updated {vital.lastUpdated}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trends & Analytics</h2>
                <p className="text-gray-600">
                  {currentVitals.find(v => v.id === selectedVital)?.name} over time
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedPeriod('7days')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === '7days'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setSelectedPeriod('30days')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === '30days'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id={`gradient-${selectedVital}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getVitalColor(selectedVital)} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={getVitalColor(selectedVital)} stopOpacity={0.1}/>
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedVital}
                  stroke={getVitalColor(selectedVital)}
                  strokeWidth={3}
                  fill={`url(#gradient-${selectedVital})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Alert Readings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Recent Alerts</h3>
              </div>
              <p className="text-sm text-red-700">Blood sugar reading of 151 mg/dL recorded on March 20th - Above normal range</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Good Progress</h3>
              </div>
              <p className="text-sm text-green-700">Blood pressure has remained stable within normal range for the past week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyVitals;