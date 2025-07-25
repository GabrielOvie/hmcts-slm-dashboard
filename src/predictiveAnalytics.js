import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, AlertTriangle, Brain, Zap, Target, Calendar, Bell, Download } from 'lucide-react';

const PredictiveAnalytics = () => {
  const [selectedService, setSelectedService] = useState('Video Hearing Platform');
  const [predictionHorizon, setPredictionHorizon] = useState(30);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Advanced predictive data with machine learning insights
  const predictiveData = {
    'Video Hearing Platform': {
      currentSLA: 97.9,
      target: 99.0,
      predictions: [
        { day: 1, predicted: 97.8, confidence: 0.95, actual: 97.9 },
        { day: 2, predicted: 97.6, confidence: 0.93, actual: null },
        { day: 3, predicted: 97.4, confidence: 0.91, actual: null },
        { day: 4, predicted: 97.1, confidence: 0.89, actual: null },
        { day: 5, predicted: 96.8, confidence: 0.87, actual: null },
        { day: 7, predicted: 96.2, confidence: 0.82, actual: null },
        { day: 10, predicted: 95.5, confidence: 0.78, actual: null },
        { day: 14, predicted: 94.8, confidence: 0.72, actual: null },
        { day: 21, predicted: 93.9, confidence: 0.65, actual: null },
        { day: 30, predicted: 92.8, confidence: 0.58, actual: null }
      ],
      riskFactors: [
        { factor: 'Vendor Performance Decline', impact: 0.85, trend: 'increasing' },
        { factor: 'Peak Court Session Load', impact: 0.72, trend: 'seasonal' },
        { factor: 'Network Infrastructure Age', impact: 0.65, trend: 'stable' },
        { factor: 'User Adoption Rate', impact: 0.43, trend: 'increasing' }
      ],
      recommendations: {
        immediate: [
          'Escalate to vendor for immediate performance review',
          'Implement load balancing for peak periods',
          'Schedule emergency capacity assessment'
        ],
        shortTerm: [
          'Negotiate enhanced SLA terms with vendor',
          'Deploy redundant infrastructure components',
          'Implement advanced monitoring and alerting'
        ],
        longTerm: [
          'Consider alternative vendor evaluation',
          'Invest in next-generation video conferencing technology',
          'Develop internal technical capabilities'
        ]
      }
    },
    'Case Management': {
      currentSLA: 98.8,
      target: 99.0,
      predictions: [
        { day: 1, predicted: 98.9, confidence: 0.97, actual: 98.8 },
        { day: 2, predicted: 99.1, confidence: 0.95, actual: null },
        { day: 3, predicted: 99.2, confidence: 0.94, actual: null },
        { day: 5, predicted: 99.0, confidence: 0.92, actual: null },
        { day: 7, predicted: 98.9, confidence: 0.89, actual: null },
        { day: 10, predicted: 98.7, confidence: 0.85, actual: null },
        { day: 14, predicted: 98.5, confidence: 0.81, actual: null },
        { day: 21, predicted: 98.3, confidence: 0.76, actual: null },
        { day: 30, predicted: 98.0, confidence: 0.70, actual: null }
      ],
      riskFactors: [
        { factor: 'Database Performance', impact: 0.58, trend: 'stable' },
        { factor: 'User Load Patterns', impact: 0.45, trend: 'predictable' },
        { factor: 'System Updates', impact: 0.38, trend: 'controlled' }
      ]
    }
  };

  const anomalyData = [
    { time: '08:00', normal: 1.2, actual: 1.2, anomaly: false },
    { time: '09:00', normal: 1.5, actual: 1.4, anomaly: false },
    { time: '10:00', normal: 2.1, actual: 3.8, anomaly: true },
    { time: '11:00', normal: 2.3, actual: 4.2, anomaly: true },
    { time: '12:00', normal: 1.8, actual: 2.1, anomaly: false },
    { time: '13:00', normal: 1.6, actual: 1.7, anomaly: false },
    { time: '14:00', normal: 2.0, actual: 1.9, anomaly: false },
    { time: '15:00', normal: 2.2, actual: 2.3, anomaly: false },
    { time: '16:00', normal: 1.9, actual: 2.8, anomaly: true },
    { time: '17:00', normal: 1.4, actual: 1.5, anomaly: false }
  ];

  const currentData = predictiveData[selectedService];

  const calculateBreachProbability = (predictions) => {
    const breachDays = predictions.filter(p => p.predicted < currentData.target).length;
    return Math.round((breachDays / predictions.length) * 100);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#10B981';
    if (confidence >= 0.7) return '#F59E0B';
    return '#EF4444';
  };

  const getRiskTrendIcon = (trend) => {
    switch(trend) {
      case 'increasing': return <TrendingUp className="text-red-500" size={16} />;
      case 'decreasing': return <TrendingUp className="text-green-500 rotate-180" size={16} />;
      case 'stable': return <Target className="text-blue-500" size={16} />;
      case 'seasonal': return <Calendar className="text-purple-500" size={16} />;
      default: return <Target className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Brain className="text-blue-600 mr-3" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Predictive Analytics Engine</h1>
              <p className="text-gray-600">AI-powered service performance forecasting and proactive risk management</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Video Hearing Platform</option>
                <option>Case Management</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prediction Horizon</label>
              <select 
                value={predictionHorizon}
                onChange={(e) => setPredictionHorizon(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
                <option value={30}>30 Days</option>
                <option value={90}>90 Days</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="alerts"
                checked={alertsEnabled}
                onChange={(e) => setAlertsEnabled(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="alerts" className="text-sm font-medium text-gray-700">
                Proactive Alerts
              </label>
            </div>
            <button className="ml-auto flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download size={16} className="mr-2" />
              Export Forecast
            </button>
          </div>
        </div>

        {/* AI Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SLA Breach Risk</p>
                <p className="text-2xl font-bold text-red-600">{calculateBreachProbability(currentData.predictions)}%</p>
              </div>
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Next {predictionHorizon} days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prediction Confidence</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(currentData.predictions[0]?.confidence * 100)}%
                </p>
              </div>
              <Brain className="text-blue-500" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">ML model accuracy</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Until Breach</p>
                <p className="text-2xl font-bold text-orange-600">
                  {currentData.predictions.find(p => p.predicted < currentData.target)?.day || 'N/A'}
                </p>
              </div>
              <Calendar className="text-orange-500" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Estimated timeline</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Recommendations</p>
                <p className="text-2xl font-bold text-green-600">
                  {currentData.recommendations?.immediate?.length || 0}
                </p>
              </div>
              <Zap className="text-green-500" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Immediate actions</p>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Predictive Forecast Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              SLA Performance Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.predictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`, 
                    name === 'predicted' ? 'Predicted SLA' : 'SLA Target'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Predicted Performance"
                />
                <Line 
                  type="monotone" 
                  dataKey={() => currentData.target} 
                  stroke="#EF4444" 
                  strokeDasharray="5 5"
                  name="SLA Target"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="text-yellow-600 mr-2" size={16} />
                <span className="text-sm font-medium text-yellow-800">
                  Prediction Alert: SLA breach predicted in {currentData.predictions.find(p => p.predicted < currentData.target)?.day || 'N/A'} days
                </span>
              </div>
            </div>
          </div>

          {/* Confidence Interval Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="mr-2 text-purple-600" size={20} />
              Prediction Confidence Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData.predictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Confidence Level']} />
                <Area 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {currentData.predictions.slice(0, 3).map((pred, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>Day {pred.day}:</span>
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getConfidenceColor(pred.confidence) }}
                    ></div>
                    <span>{(pred.confidence * 100).toFixed(1)}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Factor Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" size={20} />
              Risk Factor Impact Analysis
            </h3>
            <div className="space-y-4">
              {currentData.riskFactors?.map((factor, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{factor.factor}</span>
                    <div className="flex items-center">
                      {getRiskTrendIcon(factor.trend)}
                      <span className="ml-2 text-sm text-gray-600">{factor.trend}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                        style={{ width: `${factor.impact * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{(factor.impact * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anomaly Detection */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="mr-2 text-yellow-600" size={20} />
              Real-time Anomaly Detection
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Scatter 
                  dataKey="normal" 
                  fill="#10B981" 
                  name="Normal Range"
                />
                <Scatter 
                  dataKey="actual" 
                  fill={(entry) => entry.anomaly ? "#EF4444" : "#3B82F6"}
                  name="Actual Performance"
                />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Normal Performance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Detected Anomalies</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Engine */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-indigo-600" size={20} />
            AI-Powered Recommendations Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-red-700 mb-3 flex items-center">
                <Bell className="mr-2" size={16} />
                Immediate Actions (0-24 hours)
              </h4>
              <ul className="space-y-2">
                {currentData.recommendations?.immediate?.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-3 flex items-center">
                <Calendar className="mr-2" size={16} />
                Short-term (1-4 weeks)
              </h4>
              <ul className="space-y-2">
                {currentData.recommendations?.shortTerm?.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-3 flex items-center">
                <Target className="mr-2" size={16} />
                Strategic (1-6 months)
              </h4>
              <ul className="space-y-2">
                {currentData.recommendations?.longTerm?.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer with Model Information */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Model Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Model Type:</span>
                  <p className="font-medium">Ensemble ML</p>
                </div>
                <div>
                  <span className="text-gray-600">Training Data:</span>
                  <p className="font-medium">24 months</p>
                </div>
                <div>
                  <span className="text-gray-600">Accuracy:</span>
                  <p className="font-medium">94.2%</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Powered by</p>
              <p className="font-bold text-blue-600">HMCTS AI Analytics Engine</p>
              <p className="text-xs text-gray-500">v2.1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
