import React from 'react';
import './HospitalCards.css';

const HospitalCards = () => {
  const cardData = [
    {
      title: 'Total Patients',
      count: '1,234',
      image: '/images/patient.jpg',
      updateTime: 'Last updated 3 mins ago',
      backContent: 'Currently admitted patients across all departments. This includes both inpatient and outpatient cases. Our hospital maintains a comprehensive patient management system to ensure quality care for all.'
    },
    {
      title: 'Available Doctors',
      count: '45',
      image: '/images/doctor.jpg',
      updateTime: 'Last updated 3 mins ago',
      backContent: 'Active medical professionals including specialists, general practitioners, and resident doctors. Our team of healthcare providers ensures 24/7 medical coverage across all departments.'
    },
    {
      title: "Today's Appointments",
      count: '28',
      image: '/images/appointment.jpg',
      updateTime: 'Last updated 3 mins ago',
      backContent: 'Scheduled consultations and procedures for today. This includes regular check-ups, specialist consultations, and follow-up visits. Our appointment system ensures efficient patient flow.'
    },
    {
      title: 'Available Beds',
      count: '52',
      image: '/images/beds.jpg',
      updateTime: 'Last updated 3 mins ago',
      backContent: 'Current bed availability across all wards. This includes ICU, general ward, and special care units. We maintain optimal bed management to ensure immediate care when needed.'
    }
  ];

  return (
    <div className="dashboard">
      {cardData.map((card, index) => (
        <div 
          key={index} 
          className="hospital-card"
        >
          <div className="card-inner">
            <div 
              className="card-front"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-count">{card.count}</p>
                <p className="card-update">{card.updateTime}</p>
              </div>
            </div>
            <div className="card-back">
              <h3 className="card-back-title">{card.title}</h3>
              <p className="card-back-content">{card.backContent}</p>
            </div>
          </div>
        </div>
      ))} 
    </div>
  );
};

export default HospitalCards;