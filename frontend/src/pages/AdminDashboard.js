import React, { useState } from 'react';
import AdminPendingRequests from './AdminPendingRequests';
import AdminApprovedRequests from './AdminApprovedRequests';
import AdminRejectedRequests from './AdminRejectedRequests';
import ControlPanel from './ControlPanel';
// Ensure Font Awesome is loaded in your index.html or via npm

function AdminDashboard() {
  const [view, setView] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f4f4',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <header style={{
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        position: 'relative'
      }}>
        Admin Dashboard

        {/* Logout button top right */}
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ marginRight: '6px' }}></i>
          Logout
        </button>
      </header>

      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1rem',
        backgroundColor: '#e9ecef',
        boxShadow: '0 2px 4px rgba(22, 18, 18, 0.1)',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}>
        <button onClick={() => setView('pending')} style={navButtonStyle}>
          <i className="fas fa-hourglass-half" style={{ marginRight: '6px' }}></i>
          Pending
        </button>
        <button onClick={() => setView('approved')} style={navButtonStyle}>
          <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
          Approved
        </button>
        <button onClick={() => setView('rejected')} style={navButtonStyle}>
          <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i>
          Rejected
        </button>
      </nav>

      <div style={{ padding: '2rem' }}>
        {view === 'pending' && <AdminPendingRequests />}
        {view === 'approved' && <AdminApprovedRequests />}
        {view === 'rejected' && <AdminRejectedRequests />}
      </div>
    </div>
  );
}

const navButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  transition: 'background 0.3s',
};

export default AdminDashboard;
