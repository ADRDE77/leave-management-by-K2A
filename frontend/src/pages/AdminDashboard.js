import React, { useState } from 'react';
import AdminPendingRequests from './AdminPendingRequests';
import AdminApprovedRequests from './AdminApprovedRequests';
import AdminRejectedRequests from './AdminRejectedRequests';
import ViewStaff from './ViewStaff';

const sidebarItems = [
  { label: "Pending Requests", key: "pending", icon: "fas fa-hourglass-half" },
  { label: "Approved Requests", key: "approved", icon: "fas fa-check-circle" },
  { label: "Rejected Requests", key: "rejected", icon: "fas fa-times-circle" },
  { label: "View Staff", key: "viewStaff", icon: "fas fa-users" }
];

// ✅ Control Panel Sidebar
const AdminSidebar = ({ setView, currentView }) => (
  <div style={styles.sidebar}>
    <h3 style={styles.sidebarTitle}><i className="fas fa-cogs"></i> Control Panel</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {sidebarItems.map(({ label, key, icon }) => (
        <li
          key={key}
          onClick={() => setView(key)}
          style={{
            ...styles.sidebarItem,
            backgroundColor: currentView === key ? '#1abc9c' : 'transparent'
          }}
        >
          <i className={icon} style={{ marginRight: '10px' }}></i>
          {label}
        </li>
      ))}
    </ul>
  </div>
);

// ✅ Admin Dashboard
function AdminDashboard() {
  const [view, setView] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (view) {
      case 'pending': return <AdminPendingRequests />;
      case 'approved': return <AdminApprovedRequests />;
      case 'rejected': return <AdminRejectedRequests />;
      case 'viewStaff': return <ViewStaff />;
      default: return <div style={styles.welcomeBox}><h3>Select an option from the Control Panel</h3></div>;
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      <AdminSidebar setView={setView} currentView={view} />

      <div style={styles.main}>
        <header style={styles.header}>
          Admin Dashboard
          <button onClick={handleLogout} style={styles.logoutButton}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '6px' }}></i> Logout
          </button>
        </header>

        <div style={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  sidebar: {
    width: '170px',
    backgroundColor: '#2c3e50',
    color: 'white',
    minHeight: '100vh',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    left: 0
  },
  sidebarTitle: {
    borderBottom: '1px solid gray',
    paddingBottom: '10px',
    marginBottom: '20px',
    fontSize: '1.2rem'
  },
  sidebarItem: {
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '10px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center'
  },
  main: {
    marginLeft: '220px',
    width: '100%',
    background: '#f4f4f4',
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative'
  },
  logoutButton: {
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
  },
  content: {
    padding: '2rem'
  },
  welcomeBox: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  }
};

export default AdminDashboard;
