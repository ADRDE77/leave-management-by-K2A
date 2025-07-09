import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/apply">Apply for Leave</Link> | <Link to="/leaves">View Leaves</Link>
    </div>
  );
}

export default Dashboard;
