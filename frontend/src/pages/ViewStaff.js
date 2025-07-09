import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function ViewStaff() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_BASE_URL}${config.endpoints.auth.viewStaff}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStaffList(res.data);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
        alert("Error loading staff list");
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <h2>Registered Staff</h2>
      {staffList.length === 0 ? (
        <p>No staff found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewStaff;
