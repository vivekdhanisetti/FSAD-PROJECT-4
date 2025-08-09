import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/" end><b>Home</b></NavLink></li>
        <li><NavLink to="/patient-management"><b>Patients</b></NavLink></li>
        <li><NavLink to="/doctor"><b>Doctors</b></NavLink></li>
        <li><NavLink to="/appointments"><b>Appointments</b></NavLink></li>
        <li><NavLink to="/departments"><b>Departments</b></NavLink></li>
        <li><NavLink to="/reports"><b>Reports</b></NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation; 