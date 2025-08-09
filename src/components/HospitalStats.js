import React from 'react';
import './HospitalStats.css';

const HospitalStats = () => {
  const statsData = [
    {
      title: 'Years of Excellence',
      count: '70+',
      image: '/images/years.jpg',
      updateTime: 'Legacy of Care',
      backTitle: 'Our Journey',
      backStats: [
        { number: '1953', text: 'Founded' },
        { number: '70+', text: 'Years Experience' },
        { number: '45M+', text: 'Lives Touched' },
        { number: '19', text: 'Cities Served' }
      ],
      backContent: 'A legacy of excellence in healthcare since 1953, continuously evolving and expanding our reach.'
    },
    {
      title: 'Hospital Network',
      count: '37',
      image: '/images/hospitals.jpg',
      updateTime: 'Growing Network',
      backTitle: 'Our Presence',
      backStats: [
        { number: '37', text: 'Hospitals' },
        { number: '19', text: 'Cities' },
        { number: '10500+', text: 'Beds' },
        { number: '100%', text: 'Accredited' }
      ],
      backContent: 'State-of-the-art facilities across India, bringing quality healthcare closer to you.'
    },
    {
      title: 'Medical Experts',
      count: '5600+',
      image: '/images/experts.jpg',
      updateTime: 'Expert Team',
      backTitle: 'Our Team',
      backStats: [
        { number: '5600+', text: 'Doctors' },
        { number: '50+', text: 'Specialties' },
        { number: '15K+', text: 'Staff' },
        { number: '24/7', text: 'Care' }
      ],
      backContent: 'A team of dedicated healthcare professionals committed to excellence in patient care.'
    },
    {
      title: 'Lives Touched',
      count: '45M+',
      image: '/images/patients.jpg',
      updateTime: 'Growing Impact',
      backTitle: 'Our Impact',
      backStats: [
        { number: '45M+', text: 'Patients' },
        { number: '98%', text: 'Satisfaction' },
        { number: '1M+', text: 'Surgeries' },
        { number: '5⭐', text: 'Rating' }
      ],
      backContent: 'Making a difference in millions of lives through compassionate and quality healthcare.'
    }
  ];

  return (
    <div className="stats-dashboard">
      <div className="stats-header">
        <h2>Our <span className="highlight">Legacy</span> in Numbers</h2>
        <p>Seven decades of excellence in healthcare delivery</p>
      </div>
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
          >
            <div className="card-inner">
              <div 
                className="card-front"
                style={{ backgroundImage: `url(${stat.image})` }}
              >
                <div className="card-body">
                  <h5 className="card-title">{stat.title}</h5>
                  <p className="card-count">{stat.count}</p>
                  <p className="card-update">{stat.updateTime}</p>
                </div>
              </div>
              <div className="card-back">
                <h3 className="card-back-title">{stat.backTitle}</h3>
                <div className="back-stats">
                  {stat.backStats.map((item, idx) => (
                    <div key={idx} className="stat-box">
                      <strong>{item.number}</strong>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="card-back-content">{stat.backContent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalStats; 