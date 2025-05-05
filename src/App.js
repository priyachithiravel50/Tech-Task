// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import Dashboard from './Pages/Dashboard';
import EmployeeManagement from './Pages/EmployeeManagement';  // Fixed path
import ProjectManagement from './Pages/ProjectManagement';
import TaskManagement from './Pages/TaskManagement';
import Navbar from './Component/Navbar';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/tasks" element={<TaskManagement />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
