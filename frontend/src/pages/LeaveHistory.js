import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function LeaveHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_BASE_URL}${config.endpoints.leave.list}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("❌ Error loading leave history:", err);
        alert("Failed to load leave history");
      }
    };

    loadHistory();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Your Leave History</h2>
      {history.length === 0 ? (
        <p>No leave applications yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>No. of Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map(leave => {
              const from = new Date(leave.fromDate);
              const to = new Date(leave.toDate);
              const noOfDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

              return (
                <tr key={leave._id}>
                  <td>{leave.leaveType}</td>
                  <td>{from.toLocaleDateString()}</td>
                  <td>{to.toLocaleDateString()}</td>
                  <td>{noOfDays}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaveHistory;
