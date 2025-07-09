import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import LeaveHistory from './LeaveHistory';

function EmployeeDashboard() {
  const [view, setView] = useState('summary');
  const [balance, setBalance] = useState({ casual: 0, sick: 0, earned: 0 });
  const total = { casual: 14, sick: 12, earned: 9 };

  const [formData, setFormData] = useState({ type: '', from: '', to: '', reason: '' });

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* ✅ Sidebar */}
      <div style={{
        width: '190px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '20px',
        position: 'fixed',
        height: '100vh'
      }}>
        <h3 style={{ marginBottom: '20px' }}><i className="fas fa-bars"></i> Control Panel</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li onClick={() => setView('summary')} style={sidebarItem}><i className="fas fa-chart-bar"></i> Leave Summary</li>
          <li onClick={() => setView('apply')} style={sidebarItem}><i className="fas fa-paper-plane"></i> Apply Leave</li>
          <li onClick={() => setView('history')} style={sidebarItem}><i className="fas fa-history"></i> Leave History</li>
          <li onClick={handleLogout} style={{ ...sidebarItem, color: '#dc3545' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </ul>
      </div>

      {/* ✅ Main Content */}
      <div style={{
        marginLeft: '220px',
        padding: '30px',
        width: '100%',
        background: '#f2f7fb'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: '#007bff',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          <i className="fas fa-user"></i> Welcome, Employee
        </h1>

        {/* ✅ Conditional Views */}
        {view === 'summary' && (
          <div>
            <h2>Leave Summary</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {['casual', 'sick', 'earned'].map((type, i) => (
                <div key={type} style={{
                  backgroundColor: '#fff',
                  borderLeft: `5px solid ${['#17a2b8', '#ffc107', '#28a745'][i]}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  padding: '15px',
                  width: '250px',
                  borderRadius: '6px'
                }}>
                  <h3 style={{ textTransform: 'capitalize' }}>
                    <i className="fas fa-calendar-day"></i> {type} Leave
                  </h3>
                  <p><strong>Total:</strong> {total[type]}</p>
                  <p><strong>Taken:</strong> {total[type] - balance[type]}</p>
                  <p><strong>Balance:</strong> {balance[type]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'apply' && (
          <div>
            <h2>Apply for Leave</h2>
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
                <select name="type" value={formData.type} onChange={handleChange} required style={inputStyle}>
                  <option value="">Select</option>
                  <option value="casual">Casual</option>
                  <option value="sick">Sick</option>
                  <option value="earned">Earned</option>
                </select>
              </div>
              <div>
                <label>From:</label>
                <input type="date" name="from" value={formData.from} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label>To:</label>
                <input type="date" name="to" value={formData.to} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label>Reason:</label>
                <textarea name="reason" value={formData.reason} onChange={handleChange} required style={inputStyle}></textarea>
              </div>
              <button type="submit" style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px'
              }}>
                <i className="fas fa-paper-plane"></i> Apply
              </button>
            </form>
          </div>
        )}

        {view === 'history' && <LeaveHistory />}
      </div>
    </div>
  );
}

// 🔹 Styling
const sidebarItem = {
  padding: '12px 0',
  borderBottom: '1px solid #444',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default EmployeeDashboard;
