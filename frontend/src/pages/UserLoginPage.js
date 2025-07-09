import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function UserLoginPage() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.API_BASE_URL}${config.endpoints.auth.login}`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/employee-dashboard');
      }
    } catch (err) {
      setMessage('Invalid login credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.API_BASE_URL}${config.endpoints.auth.register}`, { name, email, password, role: 'employee' });
      setMessage('Registration successful. Please login.');
      setView('login');
    } catch (err) {
      setMessage('Registration failed. Try a different email.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('Password reset link has been sent to your email.');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url("/your-image-path/userlog.png")',  // Make sure userlog.png is in your public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: '5vw',
      overflow: 'hidden'
    }}>
      <div style={{ color: '#fff', maxWidth: '400px' }}>
        <h2>{view === 'login' ? 'Login' : view === 'register' ? 'Register' : 'Forgot Password'}</h2>

        {message && <p style={{ color: 'yellow' }}>{message}</p>}

        <form onSubmit={view === 'login' ? handleLogin : view === 'register' ? handleRegister : handleForgotPassword}>
          {view === 'register' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
          />
          {(view === 'login' || view === 'register') && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '8px 0' }}
            />
          )}
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            margin: '10px 0',
            cursor: 'pointer'
          }}>
            {view === 'login' ? 'Login' : view === 'register' ? 'Register' : 'Send Reset Link'}
          </button>
        </form>

        <div>
          {view !== 'login' && (
            <button onClick={() => setView('login')} style={{ margin: '5px' }}>Back to Login</button>
          )}
          {view === 'login' && (
            <>
              <button onClick={() => setView('register')} style={{ margin: '5px' }}>New Registration</button>
              <button onClick={() => setView('forgot')} style={{ margin: '5px' }}>Forgot Password?</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLoginPage;
