import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });

  const handleRegister = async () => {
    try {
      await axios.post(`${config.API_BASE_URL}${config.endpoints.auth.register}`, form);
      alert('Registration successful');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
