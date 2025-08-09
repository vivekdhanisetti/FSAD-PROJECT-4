import React, { useState, useEffect } from 'react';
import './ViewProfile.css';

const ViewProfile = ({ doctor, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [review, setReview] = useState({ rating: 5, comment: '' });
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    
    // Remove rotation state and handleMouseMove

    useEffect(() => {
        // Reset animation after mount
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy data for demonstration
    const doctorDetails = {
        ...doctor,
        experience: "15+ years",
        languages: ["English", "Hindi"],
        education: doctor.qualifications,
        specializations: [
            "General Medicine",
            "Internal Medicine",
            "Critical Care"
        ],
        awards: [
            "Best Doctor Award 2022",
            "Excellence in Healthcare 2021"
        ],
        publications: [
            "Modern Medicine Journal 2022: 'Advances in Internal Medicine'",
            "Healthcare Review 2021: 'Patient Care in Critical Situations'"
        ],
        memberships: [
            "Indian Medical Association",
            "World Health Organization"
        ],
        reviews: [
            { name: "John D.", rating: 5, comment: "Excellent doctor, very thorough and professional", date: "2023-10-15" },
            { name: "Sarah M.", rating: 4, comment: "Good experience, would recommend", date: "2023-09-28" }
        ],
        availability: {
            monday: ["09:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
            tuesday: ["09:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
            wednesday: ["09:00 AM - 01:00 PM"],
            thursday: ["09:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
            friday: ["09:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
            saturday: ["09:00 AM - 01:00 PM"],
            sunday: []
        },
        stats: {
            patientsServed: "5000+",
            experience: "15+ years",
            rating: 4.8,
            reviewCount: 350
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        setShowReviewForm(false);
    };

    // Add achievement progress bars
    const achievements = [
        { title: "Patient Satisfaction", percentage: 98 },
        { title: "Success Rate", percentage: 95 },
        { title: "On-time Availability", percentage: 92 }
    ];

    // Add interactive timeline
    const careerTimeline = [
        { year: "2005", event: "Started Medical Practice" },
        { year: "2010", event: "Senior Consultant Position" },
        { year: "2015", event: "Department Head" },
        { year: "2020", event: "Excellence Award" }
    ];

    return (
        <div className="profile-modal">
            <div className={`profile-content ${isAnimating ? 'animate-in' : ''}`}>
                {/* Add new sections here */}
                <div className="profile-quick-actions">
                    <button onClick={() => setShowContactInfo(true)}>
                        <i className="fas fa-phone"></i>
                        Contact
                    </button>
                    <button className="share-btn">
                        <i className="fas fa-share-alt"></i>
                        Share
                    </button>
                </div>

                <button className="close-button" onClick={onClose}>×</button>
                
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={doctor.image} alt={doctor.name} />
                    </div>
                    <div className="profile-info">
                        <h2>{doctor.name}</h2>
                        <p className="specialty">{doctor.specialty}</p>
                        <p className="location"><i className="fas fa-map-marker-alt"></i> {doctor.location}</p>
                        <div className="stats-container">
                            <div className="stat">
                                <i className="fas fa-user-md"></i>
                                <span>{doctorDetails.stats.experience}</span>
                                <label>Experience</label>
                            </div>
                            <div className="stat">
                                <i className="fas fa-users"></i>
                                <span>{doctorDetails.stats.patientsServed}</span>
                                <label>Patients</label>
                            </div>
                            <div className="stat">
                                <i className="fas fa-star"></i>
                                <span>{doctorDetails.stats.rating}</span>
                                <label>Rating</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-navigation">
                    <button 
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >
                        <i className="fas fa-user-md"></i> Overview
                    </button>
                    <button 
                        className={activeTab === 'education' ? 'active' : ''}
                        onClick={() => setActiveTab('education')}
                    >
                        <i className="fas fa-graduation-cap"></i> Education & Experience
                    </button>
                    <button 
                        className={activeTab === 'availability' ? 'active' : ''}
                        onClick={() => setActiveTab('availability')}
                    >
                        <i className="fas fa-calendar-alt"></i> Availability
                    </button>
                    <button 
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveTab('reviews')}
                    >
                        <i className="fas fa-star"></i> Reviews
                    </button>
                </div>

                <div className="profile-content-area">
                    {activeTab === 'overview' && (
                        <div className="overview-section">
                            <div className="section">
                                <h3>About</h3>
                                <p>Dr. {doctor.name.split('DR. ')[1]} is a highly qualified {doctor.specialty} with {doctorDetails.experience} of experience in the field. They are known for their expertise in patient care and medical excellence.</p>
                            </div>
                            
                            <div className="section">
                                <h3>Specializations</h3>
                                <div className="tags">
                                    {doctorDetails.specializations.map((spec, index) => (
                                        <span key={index} className="tag">{spec}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="section">
                                <h3>Languages</h3>
                                <div className="tags">
                                    {doctorDetails.languages.map((lang, index) => (
                                        <span key={index} className="tag">{lang}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Professional Memberships</h3>
                                <ul className="list-styled">
                                    {doctorDetails.memberships.map((membership, index) => (
                                        <li key={index}>{membership}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Move achievements section here */}
                            <div className="section">
                                <h3>Performance Metrics</h3>
                                <div className="achievements-section">
                                    {achievements.map((achievement, index) => (
                                        <div key={index} className="achievement-bar">
                                            <div className="achievement-info">
                                                <span className="achievement-icon">
                                                    <i className={`fas ${
                                                        achievement.title.includes('Patient') ? 'fa-users' :
                                                        achievement.title.includes('Success') ? 'fa-check-circle' :
                                                        'fa-clock'
                                                    }`}></i>
                                                </span>
                                                <div className="achievement-details">
                                                    <span className="achievement-title">{achievement.title}</span>
                                                    <span className="achievement-value">{achievement.percentage}%</span>
                                                </div>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress" 
                                                    style={{width: `${achievement.percentage}%`}}
                                                    data-value={achievement.percentage}
                                                >
                                                    <span className="progress-glow"></span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Move career timeline here */}
                            <div className="section">
                                <h3>Career Growth</h3>
                                <div className="career-timeline">
                                    {careerTimeline.map((item, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-year">{item.year}</div>
                                            <div className="timeline-content">{item.event}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div className="education-section">
                            <div className="section">
                                <h3>Education & Qualifications</h3>
                                <div className="timeline">
                                    {doctorDetails.education.map((edu, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <h4>{edu}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Awards & Recognition</h3>
                                <div className="awards-grid">
                                    {doctorDetails.awards.map((award, index) => (
                                        <div key={index} className="award-item">
                                            <i className="fas fa-award"></i>
                                            <span>{award}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Publications</h3>
                                <ul className="list-styled">
                                    {doctorDetails.publications.map((pub, index) => (
                                        <li key={index}>{pub}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'availability' && (
                        <div className="availability-section">
                            <div className="schedule-grid">
                                {Object.entries(doctorDetails.availability).map(([day, slots]) => (
                                    <div key={day} className={`schedule-day ${slots.length === 0 ? 'off-day' : ''}`}>
                                        <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                                        {slots.length > 0 ? (
                                            <div className="time-slots">
                                                {slots.map((slot, index) => (
                                                    <span key={index} className="time-slot">{slot}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="off-day-text">Closed</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="reviews-section">
                            <div className="reviews-header">
                                <div className="rating-summary">
                                    <div className="average-rating">
                                        <span className="rating-number">{doctorDetails.stats.rating}</span>
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} 
                                                   className={`fas fa-star ${i < Math.floor(doctorDetails.stats.rating) ? 'filled' : ''}`}
                                                ></i>
                                            ))}
                                        </div>
                                        <span className="rating-count">
                                            ({doctorDetails.stats.reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    className="add-review-btn"
                                    onClick={() => setShowReviewForm(true)}
                                >
                                    Write a Review
                                </button>
                            </div>

                            {showReviewForm && (
                                <div className="review-form">
                                    <h4>Write Your Review</h4>
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="rating-input">
                                            <label>Rating:</label>
                                            <div className="stars-input">
                                                {[5,4,3,2,1].map((star) => (
                                                    <i
                                                        key={star}
                                                        className={`fas fa-star ${star <= review.rating ? 'filled' : ''}`}
                                                        onClick={() => setReview({...review, rating: star})}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="comment-input">
                                            <label>Your Review:</label>
                                            <textarea
                                                required
                                                value={review.comment}
                                                onChange={(e) => setReview({...review, comment: e.target.value})}
                                                placeholder="Share your experience..."
                                            ></textarea>
                                        </div>
                                        <div className="form-actions">
                                            <button type="submit" className="submit-review">Submit Review</button>
                                            <button 
                                                type="button" 
                                                className="cancel-review"
                                                onClick={() => setShowReviewForm(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="reviews-list">
                                {doctorDetails.reviews.map((review, index) => (
                                    <div key={index} className="review-item">
                                        <div className="review-header">
                                            <div className="reviewer-info">
                                                <span className="reviewer-name">{review.name}</span>
                                                <span className="review-date">{review.date}</span>
                                            </div>
                                            <div className="review-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} 
                                                       className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {showContactInfo && (
                    <>
                        <div className="modal-overlay" onClick={() => setShowContactInfo(false)}></div>
                        <div className="contact-modal">
                            <button className="modal-close" onClick={() => setShowContactInfo(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                            <h3><i className="fas fa-address-card"></i> Contact Information</h3>
                            <div className="contact-grid">
                                <div className="contact-item">
                                    <i className="fas fa-phone-alt"></i>
                                    <div className="contact-details">
                                        <label>Phone</label>
                                        <p>+1234567890</p>
                                        <small>Available: 9 AM - 5 PM</small>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <div className="contact-details">
                                        <label>Email</label>
                                        <p>doctor@example.com</p>
                                        <small>Response within 24 hrs</small>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-hospital"></i>
                                    <div className="contact-details">
                                        <label>Clinic Address</label>
                                        <p>123 Medical Center</p>
                                        <small>{doctor.location}</small>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-comment-medical"></i>
                                    <div className="contact-details">
                                        <label>WhatsApp</label>
                                        <p>+1234567890</p>
                                        <small>Quick Response</small>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-actions">
                                <button className="action-btn call">
                                    <i className="fas fa-phone"></i> Call Now
                                </button>
                                <button className="action-btn message">
                                    <i className="fas fa-envelope"></i> Send Message
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewProfile;
