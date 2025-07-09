import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function AdminPendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Admin not logged in. Please login first.");
        return;
      }

      const { data } = await axios.get(`${config.API_BASE_URL}${config.endpoints.leave.pending}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ Pending requests fetched:", data);
      setRequests(data);
    } catch (err) {
      console.error('❌ Error fetching pending requests:', err);
      alert('Failed to load pending requests');
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${config.API_BASE_URL}/api/leave/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Leave ${action}d`);
      fetchPendingRequests(); 
    } catch (err) {
      console.error(`❌ ${action} error:`, err);
      alert(`Failed to ${action} leave`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin - Pending Leave Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.userId?.name || 'N/A'}</td>
                <td>{req.userId?.email || 'N/A'}</td>
                <td>{req.leaveType}</td>
                <td>{new Date(req.fromDate).toLocaleDateString()}</td>
                <td>{new Date(req.toDate).toLocaleDateString()}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => handleAction(req._id, 'approve')}>Approve</button>
                  <button onClick={() => handleAction(req._id, 'reject')} style={{ marginLeft: '5px' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPendingRequests;
