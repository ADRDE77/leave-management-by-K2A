import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${config.API_BASE_URL}${config.endpoints.auth.login}`, {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/admin-dashboard');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url("/your-image-path/image1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'rgba(184, 179, 179, 0.9)',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        textAlign: 'center',
        width: '300px'
      }}>
        <h2>Admin Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button 
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLoginPage;
