import React, { useState } from 'react';
import Dashboard from './Dashboard';
import PredictiveAnalytics from './predictiveAnalytics';
import { Brain, Home } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="App">
      {/* Navigation Header */}
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">GAB - SLM60 Service Management</h1>
            <span className="text-blue-200 text-sm"> Demo for Service Level Analyst Role</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-200 hover:bg-blue-800'
              }`}
            >
              <Home size={16} className="mr-2" />
              Main Dashboard
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'analytics' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-200 hover:bg-blue-800'
              }`}
            >
              <Brain size={16} className="mr-2" />
              AI Analytics
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'dashboard' ? <Dashboard /> : <PredictiveAnalytics />}
    </div>
  );
}

export default App;
