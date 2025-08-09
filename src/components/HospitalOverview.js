import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalOverview.css';

const HospitalOverview = () => {
  const navigate = useNavigate();

  const handleFindDoctorClick = () => {
    navigate('/find-doctor');
  };

  const stats = [
    { number: '70+', text: 'YEARS OF EXPERIENCE' },
    { number: '37', text: 'HOSPITALS' },
    { number: '5600+', text: 'DOCTORS' },
    { number: '10500+', text: 'BEDS' },
    { number: '19', text: 'SERVING CITIES' },
    { number: '45+', text: 'MILLION LIVES TOUCHED' }
  ];

  return (
    <div className="overview-container">
      <div className="left-section">
        <h1><span className="highlight">Human</span> Care Experts</h1>
        <p>
          The seeds of our origin were sown as early as 1953 when the founder of the Medicure 
          and Medical Group (AHMG), Dr. G.C.V. Pai, established the Medical College in Chittoor, 
          Karnataka. Today, we are one of India's leading healthcare groups with over 10,500 
          beds across 37 hospitals.
        </p>
        <p>
          Our core values are built around the thought of patient-first and that each doctor at 
          Medicure Hospitals is a human care expert, going above and beyond the call of duty.
        </p>
        <button className="find-doctor-btn" onClick={handleFindDoctorClick}>Find a Doctor</button>
      </div>
      <div className="right-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-box">
            <span className="stat-number">{stat.number}</span>
            <span className="stat-text">{stat.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalOverview; 