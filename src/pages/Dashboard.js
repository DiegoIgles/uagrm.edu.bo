import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
