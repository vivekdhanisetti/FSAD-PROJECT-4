import React, { useState } from 'react';
import './FindDoctor.css';

const AppointmentForm = ({ doctor, onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        dob: '',
        gender: '',
        session: '',
        time: '',
        mobile: '',
        email: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="appointment-section">
            <h2>Book Appointment</h2>
            <form className="appointment-form" onSubmit={handleSubmit}>
                <p>Doctor: <strong>{doctor.name}</strong></p>
                
                <input
                    type="text"
                    id="patientName"
                    placeholder="Your Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    id="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <select
                    id="session"
                    value={formData.session}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Session</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                </select>

                <select
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Time</option>
                    <option value="9:00-12:00">9:00 - 12:00</option>
                    <option value="2:00-4:00">2:00 - 4:00</option>
                </select>

                <input
                    type="tel"
                    id="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Confirm Appointment</button>
            </form>
            <button className="back-button" onClick={onBack}>← Back</button>
        </div>
    );
};

export default AppointmentForm; 