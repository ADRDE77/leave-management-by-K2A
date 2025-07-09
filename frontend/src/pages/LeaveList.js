import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_BASE_URL}${config.endpoints.leave.list}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setLeaves(res.data);
      } catch {
        alert('Failed to fetch leaves');
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div>
      <h2>Leave History</h2>
      <ul>
        {leaves.map(leave => (
          <li key={leave._id}>{leave.leaveType} | {leave.fromDate?.substring(0, 10)} to {leave.toDate?.substring(0, 10)} | {leave.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default LeaveList;
