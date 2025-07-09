import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ControlPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: '#343a40',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '10px',
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
      <Link to="/admin-dashboard" style={{ color: 'white', textDecoration: 'none' }}>👨‍💼 Admin Dashboard</Link>
      <Link to="/employee-dashboard" style={{ color: 'white', textDecoration: 'none' }}>👤 Employee Dashboard</Link>
      <button 
        onClick={handleLogout}
        style={{
          background: '#dc3545',
          border: 'none',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ControlPanel;
