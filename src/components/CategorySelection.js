import React, { useState } from 'react';
import './FindDoctor.css';

const categories = [
    { name: "Dentist", image: "/images/dental.jpg" },
    { name: "Physiotherapist", image: "/images/physiotherapist.jpg" },
    { name: "Cardiologist", image: "/images/cardiologist.jpg" },
    { name: "Dermatologist", image: "/images/dermatologist.jpg" },
    { name: "Pediatrician", image: "/images/pediatrician.jpg" },
    { name: "Neurologist", image: "/images/neurologist.jpg" },
    { name: "Orthopedic", image: "/images/orthopedic.jpg" },
    { name: "Gynecologist", image: "/images/gynecologist.jpg" },
    { name: "Oncologist", image: "/images/oncologist.jpg" },
    { name: "Psychiatrist", image: "/images/psychiatrist.jpg" }
];

const CategorySelection = ({ onSelectCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="category-section">
            <div className="category-nav">
                <h2>Select a Category</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder=" "
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <label className="search-label">Search category...</label>
                    {searchTerm && (
                        <button className="clear-search" onClick={clearSearch}>
                            ×
                        </button>
                    )}
                </div>
            </div>
            <div className="categories">
                {filteredCategories.map((category) => (
                    <div 
                        key={category.name}
                        className="category-card"
                        onClick={() => onSelectCategory(category)}
                    >
                        <img src={category.image} alt={category.name} />
                        <p>{category.name}</p>
                    </div>
                ))}
                {filteredCategories.length === 0 && (
                    <div className="no-results">
                        No categories found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorySelection; 