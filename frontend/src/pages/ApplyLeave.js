import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';


function ApplyLeave() {
  const [leave, setLeave] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please login again.');
        return;
      }

      const response = await axios.post(
        `${config.API_BASE_URL}${config.endpoints.leave.apply}`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Leave applied successfully');
      console.log('Response:', response.data);
    } catch (err) {
      console.error('Apply leave error:', err.response ? err.response.data : err.message);
      alert(`Failed to apply leave: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div>
      <h2>Apply Leave</h2>
      <input
        placeholder="Leave Type"
        onChange={e => setLeave({ ...leave, leaveType: e.target.value })}
      />
      <input
        type="date"
        onChange={e => setLeave({ ...leave, fromDate: e.target.value })}
      />
      <input
        type="date"
        onChange={e => setLeave({ ...leave, toDate: e.target.value })}
      />
      <textarea
        placeholder="Reason"
        onChange={e => setLeave({ ...leave, reason: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ApplyLeave;
