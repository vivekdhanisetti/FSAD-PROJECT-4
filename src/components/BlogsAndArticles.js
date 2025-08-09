import React from 'react';
import './BlogsAndArticles.css';

const BlogsAndArticles = () => {
    const blogs = [
        {
            id: 1,
            image: "/images/alzheimers-care.jpeg",
            title: "Supporting a Loved One with Dementia: A Guide for Family Caregivers",
            description: "Caring for a loved one with dementia is a journey filled with both emotional and physical challenges. As memory fades and confusion sets in, caregivers become the anchor, providing comfort, security, and unwavering support. Patience, understanding, and structured routines can help ease the daily struggles, while moments of joy and recognition bring invaluable rewards. Seeking community support and practicing self-care are essential to sustaining both the caregiver and the person they cherish.",
            link: "#"
        },
        {
            id: 2,
            image: "/images/worldheart.jpeg",
            title: "Physiotherapy: A Key to Orthopedic Recovery",
            description: "Orthopedic recovery is a journey that requires patience, dedication, and the right support system—this is where physiotherapy plays a crucial role. Whether recovering from a surgery, injury, or chronic musculoskeletal condition, physiotherapy provides structured rehabilitation that restores strength, flexibility, and mobility. Through a combination of personalized exercises, manual therapy, and innovative techniques such as hydrotherapy or ultrasound therapy, physiotherapists help reduce pain, prevent stiffness, and accelerate healing. Beyond physical recovery, physiotherapy enhances confidence, allowing patients to regain independence in their daily activities.",
            link: "#"
        },
        {
            id: 3,
            image: "/images/physiotherapy.jpeg",
            title: "World Heart Day 2023: Love Your Heart, Live Longer",
            description: "Every beat counts! World Heart Day is a global initiative dedicated to raising awareness about cardiovascular health. Heart disease remains a leading cause of mortality, but with early prevention, lifestyle changes, and regular check-ups, we can reduce the risks. This year's focus is on heart-healthy habits—eating a balanced diet, staying active, managing stress, and avoiding smoking. Small daily choices can lead to a lifetime of better heart health. On this World Heart Day, let's pledge to prioritize our hearts, educate others, and encourage a world where every heartbeat is strong and healthy.",
            link: "#"
        }
    ];

    return (
        <section className="blogs-section">
            <h1>Things that keep you Healthy</h1>
            <h2> Articles and Blogs</h2>
            <div className="blogs-container">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="blog-image"
                        />
                        <div className="blog-content">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-description">{blog.description}</p>
                            <a href={blog.link} className="read-more">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogsAndArticles; 