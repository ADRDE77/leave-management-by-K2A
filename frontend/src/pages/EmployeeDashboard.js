import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveHistory from './LeaveHistory';
import config from '../config';

function EmployeeDashboard() {
  const [balance, setBalance] = useState({
    casual: 0,
    sick: 0,
    earned: 0
  });

  const total = { casual: 14, sick: 12, earned: 9 };

  const [formData, setFormData] = useState({
    type: '',
    from: '',
    to: '',
    reason: ''
  });

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_BASE_URL}${config.endpoints.leave.balance}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(res.data);
      } catch (err) {
        console.error('❌ Failed to load dashboard data:', err);
        alert('Failed to load dashboard data');
      }
    };
    fetchBalance();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${config.API_BASE_URL}${config.endpoints.leave.apply}`, {
        leaveType: formData.type,
        fromDate: formData.from,
        toDate: formData.to,
        reason: formData.reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Leave applied successfully');
      setFormData({ type: '', from: '', to: '', reason: '' });
      window.location.reload();
    } catch (err) {
      console.error('❌ Apply error:', err);
      alert('Failed to apply leave');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 style={{
          textAlign: 'center',
          flexGrow: 1,
          fontWeight: 'bold',
          color: '#007bff',
          fontSize: '2.5rem'
        }}>
          <i className="fas fa-user"></i> Welcome, Employee
        </h1>
        <button onClick={handleLogout} style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <h2 style={{ marginTop: '30px', color: '#333' }}>Leave Summary</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '30px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px' }}>Leave Type</th>
              <th style={{ padding: '10px' }}>Total Leave</th>
              <th style={{ padding: '10px' }}>Leave Taken</th>
              <th style={{ padding: '10px' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {['casual', 'sick', 'earned'].map((type, index) => (
              <tr key={type} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={{ padding: '10px', textTransform: 'capitalize' }}>
                  <i className="fas fa-calendar-alt"></i> {type}
                </td>
                <td style={{ padding: '10px' }}>{total[type]}</td>
                <td style={{ padding: '10px', color: '#dc3545', fontWeight: 'bold' }}>
                  {total[type] - balance[type]}
                </td>
                <td style={{ padding: '10px', color: '#28a745', fontWeight: 'bold' }}>
                  {balance[type]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ color: '#333' }}>Apply for Leave</h2>
      <form onSubmit={handleApply} style={{
        maxWidth: '500px',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}>
            <option value="">Select</option>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="earned">Earned</option>
          </select>
        </div>
        <div>
          <label>From:</label>
          <input type="date" name="from" value={formData.from} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div>
          <label>To:</label>
          <input type="date" name="to" value={formData.to} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div>
          <label>Reason:</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}></textarea>
        </div>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#218838'}
        onMouseOut={e => e.target.style.backgroundColor = '#28a745'}
        >
          <i className="fas fa-paper-plane"></i> Apply
        </button>
      </form>

      <LeaveHistory />
    </div>
  );
}

export default EmployeeDashboard;
