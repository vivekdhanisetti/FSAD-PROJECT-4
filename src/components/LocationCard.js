import React from 'react';
import './LocationCard.css';

const LocationCard = ({ name, image, address, contact, directions }) => {
    return (
        <div className="hospital-card">
            <img src={image} alt={name} />
            <div className="hospital-info">
                <h3>{name}</h3>
                <p>{address}</p>
                <p className="contact">{contact}</p>
                <a href={directions}>Get Hospital Directions</a>
                <div className="button-group">
                    <button className="button">KNOW MORE →</button>
                    <button className="button">BOOK AN APPOINTMENT →</button>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
