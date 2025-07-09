import React from 'react';
import { FaChartPie, FaCalendarPlus, FaHistory } from 'react-icons/fa';

const EmployeeSidebar = ({ setView }) => {
  const items = [
    { label: 'Leave Summary', key: 'summary', icon: <FaChartPie /> },
    { label: 'Apply Leave', key: 'apply', icon: <FaCalendarPlus /> },
    { label: 'Leave History', key: 'history', icon: <FaHistory /> },
  ];

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#2c3e50',
      color: 'white',
      minHeight: '100vh',
      padding: '20px 10px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      <h3 style={{ borderBottom: '1px solid gray', paddingBottom: '10px', textAlign: 'center' }}>Employee Panel</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(({ label, key, icon }) => (
          <li
            key={key}
            onClick={() => setView(key)}
            style={{
              padding: '12px',
              cursor: 'pointer',
              borderBottom: '1px solid #444',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'background 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#34495e'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {icon} {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
