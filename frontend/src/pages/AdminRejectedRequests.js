import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function AdminRejectedRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRejected = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_BASE_URL}${config.endpoints.leave.rejected}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Error fetching rejected requests:", err);
        alert('Failed to load rejected requests');
      }
    };
    fetchRejected();
  }, []);

  return (
    <div>
      <h2>Rejected Leave Requests</h2>
      {requests.length === 0 ? (
        <p>No rejected requests.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.userId?.name} ({req.userId?.email})</td>
                <td>{req.leaveType}</td>
                <td>{new Date(req.fromDate).toLocaleDateString()}</td>
                <td>{new Date(req.toDate).toLocaleDateString()}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminRejectedRequests;
