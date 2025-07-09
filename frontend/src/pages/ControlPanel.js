import React from 'react';

function ControlPanel({ setView }) {
  return (
    <div style={{ width: '200px', background: '#343a40', color: 'white', minHeight: '100vh', padding: '1rem' }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>Control Panel</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><button onClick={() => setView('dashboard')} style={btn}>Dashboard</button></li>
       
        <li><button onClick={() => setView('viewStaff')} style={btn}>View Staff</button></li>
     
      </ul>
    </div>
  );
}

const btn = {
  display: 'block',
  background: 'none',
  color: '#fff',
  border: 'none',
  padding: '10px',
  textAlign: 'left',
  width: '100%',
  cursor: 'pointer'
};

export default ControlPanel;
