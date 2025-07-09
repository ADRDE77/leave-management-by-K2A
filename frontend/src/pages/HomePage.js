import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'url("/your-image-path/h.png") no-repeat center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px',
          zIndex: 1000
        }}
      >
        <Link to="/admin-login">
          <button style={{
            padding: '10px 20px',
            fontSize: '2rem',
            borderRadius: '5px',
            border: 'none',
            background: '#28A745',
            color: 'white',
            cursor: 'pointer'
          }}>
            Admin Login
          </button>
        </Link>
        <Link to="/user-login">
          <button style={{
            padding: '10px 20px',
            fontSize: '2rem',
            borderRadius: '5px',
            border: 'none',
            background: '#28A745',
            color: 'white',
            cursor: 'pointer'
          }}>
            User Login
          </button>
        </Link>
      </div>

      
    </div>
  );
}

export default HomePage;
