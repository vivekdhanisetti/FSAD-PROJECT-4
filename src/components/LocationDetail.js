import React from 'react';
import { useParams } from 'react-router-dom';
import './LocationDetail.css';
import LocationCard from './LocationCard'; // Ensure correct import

const locationDetails = {
    Bangalore: {
        name: "Good-cure Hospital, Bangalore - Main Branch",
        image: "/images/bangalore.jpg",
        address: "123, MG Road, Bangalore, Karnataka - 560001",
        contact: "📞 1234567890",
        directions: "#",
        locations: [
            { name: "Good-cure Hospital, Bangalore - Branch 1", address: "123, MG Road, Bangalore, Karnataka - 560001" },
            { name: "Good-cure Hospital, Bangalore - Branch 2", address: "456, Megistic Road, Bangalore, Karnataka - 560002" },
            { name: "Good-cure Hospital, Bangalore - Branch 3", address: "789, Gandhi Road, Bangalore, Karnataka - 560003" },
            { name: "Good-cure Hospital, Bangalore - Branch 4", address: "101, Nehru Road, Bangalore, Karnataka - 560004" },
            { name: "Good-cure Hospital, Bangalore - Branch 5", address: "102, Anna Road, Bangalore, Karnataka - 560005" }
        ]
    },
    Chennai: {
        name: "Good-cure Hospital, Chennai - Main Branch",
        image: "/images/chennai.jpg",
        address: "456, Anna Salai, Chennai, Tamil Nadu - 600002",
        contact: "📞 0987654321",
        directions: "#",
        locations: [
            { name: "Good-cure Hospital, Chennai - Branch 1", address: "456, Anna Salai, Chennai, Tamil Nadu - 600002" },
            { name: "Good-cure Hospital, Chennai - Branch 2", address: "789, Anna Salai, Chennai, Tamil Nadu - 600003" },
            { name: "Good-cure Hospital, Chennai - Branch 3", address: "101, Anna Salai, Chennai, Tamil Nadu - 600004" },
            { name: "Good-cure Hospital, Chennai - Branch 4", address: "102, Anna Salai, Chennai, Tamil Nadu - 600005" },
            { name: "Good-cure Hospital, Chennai - Branch 5", address: "103, Anna Salai, Chennai, Tamil Nadu - 600006" },
            { name: "Good-cure Hospital, Chennai - Branch 6", address: "104, Anna Salai, Chennai, Tamil Nadu - 600007" },
            { name: "Good-cure Hospital, Chennai - Branch 7", address: "105, Anna Salai, Chennai, Tamil Nadu - 600008" },
            { name: "Good-cure Hospital, Chennai - Branch 8", address: "106, Anna Salai, Chennai, Tamil Nadu - 600009" },
            { name: "Good-cure Hospital, Chennai - Branch 9", address: "107, Anna Salai, Chennai, Tamil Nadu - 600010" },
            { name: "Good-cure Hospital, Chennai - Branch 10", address: "108, Anna Salai, Chennai, Tamil Nadu - 600011" },
            { name: "Good-cure Hospital, Chennai - Branch 11", address: "109, Anna Salai, Chennai, Tamil Nadu - 600012" },
            { name: "Good-cure Hospital, Chennai - Branch 12", address: "110, Anna Salai, Chennai, Tamil Nadu - 600013" },
            { name: "Good-cure Hospital, Chennai - Branch 13", address: "111, Anna Salai, Chennai, Tamil Nadu - 600014" }
        ]
    },
    Vijayawada: {
        name: "Good-cure Hospital, Vijayawada - Main Branch",
        image: "/images/vijayawada.jpg",
        address: "789, Eluru Road, Vijayawada, Andhra Pradesh - 520002",
        contact: "📞 1122334455",
        directions: "#",
        locations: [
            { name: "Good-cure Hospital, Vijayawada - Branch 1", address: "789, Benz circle Road, Vijayawada, Andhra Pradesh - 520002" },
            { name: "Good-cure Hospital, Vijayawada - Branch 2", address: "101, MG Road, Vijayawada, Andhra Pradesh - 520003" }
        ]
    },
    Hyderabad: {
        name: "Good-cure Hospital, Hyderabad - Main Branch",
        image: "/images/hyderabad.jpg",
        address: "101, Banjara Hills, Hyderabad, Telangana - 500034",
        contact: "📞 6677889900",
        directions: "#",
        locations: [
            { name: "Good-cure Hospital, Hyderabad - Branch 1", address: "101, Jubli Hills, Hyderabad, Telangana - 500034" },
            { name: "Good-cure Hospital, Hyderabad - Branch 2", address: "102, Amirpet, Hyderabad, Telangana - 500035" },
            { name: "Good-cure Hospital, Hyderabad - Branch 3", address: "103, Kukatpalli Hills, Hyderabad, Telangana - 500036" },
            { name: "Good-cure Hospital, Hyderabad - Branch 4", address: "104, Banjara Hills, Hyderabad, Telangana - 500037" }
        ]
    }
};

const LocationDetail = () => {
    const { city } = useParams();
    const location = locationDetails[city];

    if (!location) {
        return <div>Location not found</div>;
    }

    return (
        <div className="container">
            <div className="header-box">
                <h1>Good-cure Hospital</h1>
                <p>Providing top-notch healthcare services with state-of-the-art facilities and experienced doctors.</p>
            </div>
            <LocationCard
                name={location.name}
                image={location.image}
                address={location.address}
                contact={location.contact}
                directions={location.directions}
            />
            <h3>Other Locations</h3>
            <ul>
                {location.locations.map((loc, index) => (
                    <li key={index}>
                        <LocationCard
                            name={loc.name}
                            image={location.image} /* Use the same image for branches */
                            address={loc.address}
                            contact={location.contact} /* Use the same contact for branches */
                            directions={location.directions} /* Use the same directions for branches */
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationDetail;
