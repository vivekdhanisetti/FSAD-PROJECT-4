import React from 'react';
import './FindDoctor.css';

const doctors = {
    Dentist: [
        { name: "Dr. Gnanesh", image: "/images/image1.jpg", experience: "10 years", specialization: "Dentistry", location: "Good-Cure Health Care", languages: "English, Hindi, Telugu" },
        { name: "Dr. Laxmi Chaitanya", image: "/images/doctor1.jpg", experience: "8 years", specialization: "Dentistry", location: "Good-Cure Health Care", languages: "English, Telugu" }
    ],
    Physiotherapist: [
        { name: "Dr. Gutta Gnanesh", image: "/images/doctor2.jpg", experience: "5 years", specialization: "Physiotherapy", location: "Good-Cure Health Care", languages: "English, Hindi" }
    ],
    Cardiologist: [
        { name: "Dr. Staya Narayana", image: "/images/doctor4.jpg", experience: "12 years", specialization: "Cardiology", location: "Good-Cure Health Care", languages: "English, Telugu" }
    ],
    Dermatologist: [
        { name: "Dr. Gnanesh", image: "/images/image1.jpg", experience: "10 years", specialization: "Dermatology", location: "Good-Cure Health Care", languages: "English, Hindi, Telugu" },
        { name: "Dr. Keerthi", image: "/images/doctor5.jpg", experience: "7 years", specialization: "Dermatology", location: "Good-Cure Health Care", languages: "English, Hindi, Telugu" }
    ],
    Pediatrician: [
        { name: "Dr. Kavya", image: "/images/doctor6.jpg", experience: "15 years", specialization: "Pediatrics", location: "Good-Cure Health Care", languages: "English, Telugu" }
    ],
    Neurologist: [
        { name: "Dr. Saketh", image: "/images/doctor7.jpg", experience: "20 years", specialization: "Neurology", location: "Good-Cure Health Care", languages: "English, Hindi" }
    ],
    Orthopedic: [
        { name: "Dr. Gnanesh", image: "/images/doctor8.jpg", experience: "18 years", specialization: "Orthopedics", location: "Good-Cure Health Care", languages: "English, Telugu" }
    ],
    Gynecologist: [
        { name: "Dr. Narayana", image: "/images/doctor9.jpg", experience: "22 years", specialization: "Gynecology", location: "Good-Cure Health Care", languages: "English, Hindi, Telugu" }
    ],
    Oncologist: [
        { name: "Dr. Sindhu", image: "/images/doctor5.jpg", experience: "25 years", specialization: "Oncology", location: "Good-Cure Health Care", languages: "English, Telugu" }
    ],
    Psychiatrist: [
        { name: "Dr. U.S.L Chaithanya", image: "/images/doctor1.jpg", experience: "30 years", specialization: "Psychiatry", location: "Good-Cure Health Care", languages: "English, Hindi, Telugu, Tamil" }
    ]
};

const DoctorList = ({ category, onSelectDoctor, onBack }) => {
    const categoryDoctors = doctors[category.name] || [];

    return (
        <div className="doctor-section">
            <h2>Available Doctors</h2>
            <div className="doctors">
                {categoryDoctors.map((doctor) => (
                    <div key={doctor.name} className="doctor-card">
                        <div className="doctor-info">
                            <img src={doctor.image} alt={doctor.name} className="doctor-img" />
                            <div className="doctor-details">
                                <h2>{doctor.name}</h2>
                                <span className="experience-tag">{doctor.experience}, {doctor.specialization}</span>
                                <p><strong>{doctor.specialization}</strong></p>
                                <p><strong>Language:</strong> {doctor.languages}</p>
                                <p>📍 {doctor.location}</p>
                                <p>{doctor.name} is an experienced {doctor.specialization.toLowerCase()} based in Hyderabad.</p>
                            </div>
                        </div>
                        <div className="appointment">
                            <h3>Mon - Sat</h3>
                            <p>(9:00 AM - 4:00 PM)</p>
                            <button 
                                className="appointment-btn"
                                onClick={() => onSelectDoctor(doctor)}
                            >
                                BOOK AN APPOINTMENT
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={onBack}>← Back</button>
        </div>
    );
};

export default DoctorList; 