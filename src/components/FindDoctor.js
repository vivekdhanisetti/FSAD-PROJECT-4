import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelection from './CategorySelection';
import DoctorList from './DoctorList';
import AppointmentForm from './AppointmentForm';
import './FindDoctor.css';

const FindDoctor = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('categories');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentView('doctors');
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setCurrentView('appointment');
    };

    const handleBack = () => {
        switch (currentView) {
            case 'doctors':
                setCurrentView('categories');
                setSelectedCategory(null);
                break;
            case 'appointment':
                setCurrentView('doctors');
                setSelectedDoctor(null);
                break;
            case 'categories':
                navigate('/');
                break;
            default:
                break;
        }
    };

    const handleAppointmentSubmit = (formData) => {
        // Here you would typically send this to your backend
        console.log('Appointment submitted:', { doctor: selectedDoctor, ...formData });
        alert(`Appointment confirmed with ${selectedDoctor.name}`);
        navigate('/');
    };

    return (
        <div className="find-doctor-container">
            {currentView === 'categories' && (
                <div className="category-section">
                    <CategorySelection onSelectCategory={handleCategorySelect} />
                    <button className="back-button" onClick={handleBack}>← Back</button>
                </div>
            )}
            
            {currentView === 'doctors' && selectedCategory && (
                <DoctorList 
                    category={selectedCategory}
                    onSelectDoctor={handleDoctorSelect}
                    onBack={handleBack}
                />
            )}
            
            {currentView === 'appointment' && selectedDoctor && (
                <AppointmentForm 
                    doctor={selectedDoctor}
                    onSubmit={handleAppointmentSubmit}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default FindDoctor; 