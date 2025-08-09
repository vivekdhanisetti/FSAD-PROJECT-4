import React, { useState, useEffect, useRef } from 'react';
import './Review.css';

const Review = () => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);
    
    const formatText = (text) => {
        const words = text.split(' ');
        const lines = [];
        for (let i = 0; i < words.length; i += 5) {
            lines.push(words.slice(i, i + 5).join(' '));
        }
        return lines.join('\n');
    };
    
    const testimonials = [
        {
            name: "Sakthi",
            initial: "S",
            text: formatText("Excellent diagnosis by the doctor. Nice service by all teams, including housekeeping and nurses. Totally satisfied!")
        },
        {
            name: "Prasanth",
            initial: "P",
            text: formatText("Excellent diagnosis by the doctor. Nice service by all teams, including housekeeping and nurses. Totally satisfied!")
        },
        {
            name: "Deepa",
            initial: "D",
            text: formatText("Excellent diagnosis by the doctor. Nice service by all teams, including housekeeping and nurses. Totally satisfied!")
        },
        {
            name: "Anitha",
            initial: "A",
            text: formatText("Very professional and caring staff. The facilities are top-notch. Highly recommend!")
        },
        {
            name: "Ramesh",
            initial: "R",
            text: formatText("Great experience. The doctors are very knowledgeable and the staff is very helpful.")
        },
        {
            name: "Kavitha",
            initial: "K",
            text: formatText("Wonderful service and care. The hospital is very clean and well-maintained.")
        },
        {
            name: "Manoj",
            initial: "M",
            text: formatText("Excellent facilities and very caring staff. I felt very comfortable during my stay.")
        },
        {
            name: "Lakshmi",
            initial: "L",
            text: formatText("The doctors and nurses are very attentive and provide excellent care. Highly recommend!")
        }
    ];

    // Create a continuous array by adding first item at end and last item at start
    const extendedTestimonials = [
        testimonials[testimonials.length - 1],
        ...testimonials,
        testimonials[0]
    ];

    const handleNext = () => {
        setIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= testimonials.length + 1) {
                // When we reach the clone of first slide, quickly reset to actual first slide
                setTimeout(() => {
                    containerRef.current.style.transition = 'none';
                    setIndex(1);
                    setTimeout(() => {
                        containerRef.current.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
                return nextIndex;
            }
            return nextIndex;
        });
    };

    const handlePrev = () => {
        setIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            if (nextIndex < 0) {
                // When we reach the clone of last slide, quickly reset to actual last slide
                setTimeout(() => {
                    containerRef.current.style.transition = 'none';
                    setIndex(testimonials.length);
                    setTimeout(() => {
                        containerRef.current.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
                return nextIndex;
            }
            return nextIndex;
        });
    };

    const handleDotClick = (i) => {
        setIndex(i + 1); // Add 1 because of the cloned slide at start
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const slideWidth = 300; // width (280px) + margin (20px)
            containerRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    }, [index]);

    // Initialize to the first actual slide (index 1 because of cloned slide)
    useEffect(() => {
        setIndex(1);
    }, []);

    return (
        <section className="testimonial-section">
            <h3>A good word means a lot</h3>
            <h1>What Patients Say About Us</h1>
            <div className="testimonial-wrapper">
                <button className="navigation-button prev-button" onClick={handlePrev}>
                    &#8249;
                </button>
                <button className="navigation-button next-button" onClick={handleNext}>
                    &#8250;
                </button>
                <div className="testimonial-container" ref={containerRef}>
                    {extendedTestimonials.map((testimonial, i) => (
                        <div key={i} className="testimonial">
                            <div className="profile">
                                <div className="avatar">{testimonial.initial}</div>
                                <h4>{testimonial.name}</h4>
                            </div>
                            <div className="stars">★★★★★</div>
                            <p style={{ whiteSpace: 'pre-line' }}>{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dots">
                {testimonials.map((_, i) => (
                    <span 
                        key={i}
                        className={`dot ${i === (index - 1 + testimonials.length) % testimonials.length ? 'active' : ''}`}
                        onClick={() => handleDotClick(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Review; 