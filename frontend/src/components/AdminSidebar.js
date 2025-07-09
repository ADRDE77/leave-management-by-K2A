import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#343a40',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: '#17a2b8' }}>Admin Panel</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={liStyle} onClick={() => navigate('/admin-dashboard')}>Dashboard (Admin)</li>
        <li style={liStyle} onClick={() => navigate('/employee-dashboard')}>Dashboard (User)</li>
        <li style={liStyle} onClick={() => navigate('/admin/employees')}>Employees</li>
        <li style={liStyle} onClick={() => navigate('/admin/applied-leaves')}>Applied Leaves</li>
        <li style={liStyle} onClick={() => navigate('/admin/leave-types')}>Leave Types</li>
        <li style={liStyle} onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
}

const liStyle = {
  padding: '10px 0',
  cursor: 'pointer',
  borderBottom: '1px solid #495057'
};

export default AdminSidebar;
