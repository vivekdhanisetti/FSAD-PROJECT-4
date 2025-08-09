import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Locations.css';

const locations = [
    { city: 'Bangalore', image: '/images/bangalore.jpg', locations: 5 },
    { city: 'Chennai', image: '/images/chennai.jpg', locations: 13 },
    { city: 'Vijayawada', image: '/images/vijayawada.jpg', locations: 2 },
    { city: 'Hyderabad', image: '/images/hyderabad.jpg', locations: 4 }
];

const Locations = () => {
    const navigate = useNavigate();

    const handleCardClick = (city) => {
        navigate(`/location/${city}`);
    };

    return (
        <div className="locations-container">
            <h2>Our Hospital Locations</h2>
            <div className="locations-grid">
                {locations.map((location, index) => (
                    <div key={index} className="location-card" onClick={() => handleCardClick(location.city)}>
                        <img src={location.image} alt={location.city} className="location-image" />
                        <div className="location-info">
                            <h3 className="hospital-name">Good-cure Hospital</h3>
                            <p className="city-name">{location.city}</p>
                            <p>{location.locations} Locations</p>
                        </div>
                        <div className="arrow">→</div>
                    </div>
                ))}
            </div>
            <a href="/locations" className="explore">Explore All Locations →</a>
        </div>
    );
};

export default Locations;
