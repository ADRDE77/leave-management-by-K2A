// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminPendingRequests from './pages/AdminPendingRequests';
import AdminApprovedRequests from './pages/AdminApprovedRequests';
import AdminRejectedRequests from './pages/AdminRejectedRequests';
import UserLoginPage from './pages/UserLoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave';
import LeaveList from './pages/LeaveList';
import LeaveHistory from './pages/LeaveHistory';
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pending" element={<AdminPendingRequests />} />
        <Route path="/admin/approved" element={<AdminApprovedRequests />} />
        <Route path="/admin/rejected" element={<AdminRejectedRequests />} />
      

        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<ApplyLeave />} />
        <Route path="/leaves" element={<LeaveList />} />
        <Route path="/employee-dashboard" element={<LeaveHistory />} />
      </Routes>
    </Router>
  );
}

export default App;