import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Clock, Users, Server, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data representing HMCTS services
  const serviceData = [
    { name: 'Court Listing System', availability: 99.2, responseTime: 1.2, slaTarget: 99.5, status: 'warning', incidents: 2 },
    { name: 'Case Management', availability: 98.8, responseTime: 2.1, slaTarget: 99.0, status: 'critical', incidents: 5 },
    { name: 'Digital Court Services', availability: 99.7, responseTime: 0.8, slaTarget: 99.5, status: 'healthy', incidents: 0 },
    { name: 'Jury Management', availability: 99.1, responseTime: 1.5, slaTarget: 99.0, status: 'healthy', incidents: 1 },
    { name: 'Video Hearing Platform', availability: 97.9, responseTime: 3.2, slaTarget: 99.0, status: 'critical', incidents: 8 }
  ];

  const slaComplianceData = [
    { month: 'Jan', target: 99.0, actual: 98.2 },
    { month: 'Feb', target: 99.0, actual: 98.7 },
    { month: 'Mar', target: 99.0, actual: 99.1 },
    { month: 'Apr', target: 99.0, actual: 98.9 },
    { month: 'May', target: 99.0, actual: 99.3 },
    { month: 'Jun', target: 99.0, actual: 98.6 }
  ];

  const stakeholderData = [
    { name: 'Courts & Tribunals', satisfaction: 85, slaBreaches: 12 },
    { name: 'Legal Professionals', satisfaction: 78, slaBreaches: 18 },
    { name: 'Public Users', satisfaction: 82, slaBreaches: 8 },
    { name: 'Internal Admin', satisfaction: 91, slaBreaches: 5 }
  ];

  const vendorPerformance = [
    { name: 'Vendor A', performance: 94, cost: 'High', contract: 'Expires Dec 2024' },
    { name: 'Vendor B', performance: 87, cost: 'Medium', contract: 'Expires Mar 2025' },
    { name: 'Vendor C', performance: 96, cost: 'Low', contract: 'Expires Aug 2024' }
  ];

  const riskMatrix = [
    { service: 'Video Hearing Platform', riskLevel: 'High', impact: 'Critical', probability: 'High', mitigation: 'Vendor escalation required' },
    { service: 'Case Management', riskLevel: 'Medium', impact: 'High', probability: 'Medium', mitigation: 'Performance monitoring increased' },
    { service: 'Court Listing System', riskLevel: 'Low', impact: 'Medium', probability: 'Low', mitigation: 'Routine maintenance scheduled' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'healthy': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'critical': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium rounded-t-lg ${
        active 
          ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HMCTS Service Level Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and analysis of service performance across the HMCTS estate</p>
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall SLA Compliance</p>
                <p className="text-2xl font-bold text-gray-900">98.6%</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-2xl font-bold text-red-600">16</p>
              </div>
              <AlertTriangle className="text-red-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Services at Risk</p>
                <p className="text-2xl font-bold text-yellow-600">2</p>
              </div>
              <Server className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">1.76s</p>
              </div>
              <Clock className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 border-b">
            <TabButton id="overview" label="Service Overview" active={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="sla" label="SLA Tracking" active={activeTab === 'sla'} onClick={setActiveTab} />
            <TabButton id="stakeholders" label="Stakeholders" active={activeTab === 'stakeholders'} onClick={setActiveTab} />
            <TabButton id="vendors" label="Vendor Performance" active={activeTab === 'vendors'} onClick={setActiveTab} />
            <TabButton id="risks" label="Risk Matrix" active={activeTab === 'risks'} onClick={setActiveTab} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Service Performance Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Service</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Availability</th>
                      <th className="text-left py-3 px-4">Response Time</th>
                      <th className="text-left py-3 px-4">SLA Target</th>
                      <th className="text-left py-3 px-4">Active Incidents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceData.map((service, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{service.name}</td>
                        <td className="py-3 px-4">{getStatusIcon(service.status)}</td>
                        <td className="py-3 px-4">
                          <span className={service.availability >= service.slaTarget ? 'text-green-600' : 'text-red-600'}>
                            {service.availability}%
                          </span>
                        </td>
                        <td className="py-3 px-4">{service.responseTime}s</td>
                        <td className="py-3 px-4">{service.slaTarget}%</td>
                        <td className="py-3 px-4">
                          <span className={service.incidents > 0 ? 'text-red-600' : 'text-green-600'}>
                            {service.incidents}
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

        {activeTab === 'sla' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">SLA Compliance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={slaComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[97, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#10B981" strokeDasharray="5 5" name="SLA Target" />
                  <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual Performance" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Service Availability Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[95, 100]} />
                  <Tooltip />
                  <Bar dataKey="availability" fill="#3B82F6" />
                  <Bar dataKey="slaTarget" fill="#10B981" opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'stakeholders' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Stakeholder Satisfaction & SLA Breaches</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stakeholderData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="satisfaction" fill="#3B82F6" name="Satisfaction %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stakeholderData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="slaBreaches" fill="#EF4444" name="SLA Breaches" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Third-Party Vendor Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Vendor</th>
                      <th className="text-left py-3 px-4">Performance Score</th>
                      <th className="text-left py-3 px-4">Cost Rating</th>
                      <th className="text-left py-3 px-4">Contract Status</th>
                      <th className="text-left py-3 px-4">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorPerformance.map((vendor, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{vendor.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  vendor.performance >= 90 ? 'bg-green-500' : 
                                  vendor.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${vendor.performance}%` }}
                              ></div>
                            </div>
                            <span>{vendor.performance}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            vendor.cost === 'High' ? 'bg-red-100 text-red-800' :
                            vendor.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {vendor.cost}
                          </span>
                        </td>
                        <td className="py-3 px-4">{vendor.contract}</td>
                        <td className="py-3 px-4">
                          {vendor.performance < 90 ? (
                            <span className="text-red-600 text-sm">Performance Review</span>
                          ) : (
                            <span className="text-green-600 text-sm">On Track</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Service Risk Assessment Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Service</th>
                      <th className="text-left py-3 px-4">Risk Level</th>
                      <th className="text-left py-3 px-4">Impact</th>
                      <th className="text-left py-3 px-4">Probability</th>
                      <th className="text-left py-3 px-4">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskMatrix.map((risk, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{risk.service}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                            {risk.riskLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4">{risk.impact}</td>
                        <td className="py-3 px-4">{risk.probability}</td>
                        <td className="py-3 px-4 text-sm">{risk.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Risk Mitigation Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-500 mr-3" size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">Video Hearing Platform - Critical Risk</p>
                    <p className="text-sm text-red-600">Immediate vendor escalation required by July 28, 2025</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <Clock className="text-yellow-500 mr-3" size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">Case Management - Medium Risk</p>
                    <p className="text-sm text-yellow-600">Performance monitoring review scheduled for August 1, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>HMCTS Service Level Management Dashboard | Last Updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">Demonstrating proactive SLM capabilities for HMCTS Service Level Analyst role</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
