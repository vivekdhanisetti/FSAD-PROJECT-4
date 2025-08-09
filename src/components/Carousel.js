import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const carouselData = [
    {
      image: '/images/Good-cure.jpg',
      title: 'Welcome to Good-Cure Hospital',
      description: 'State-of-the-art medical facility providing comprehensive healthcare services',
      stats: 'Over 200+ Doctors | 24/7 Emergency Care | 500+ Beds'
    },
    {
      image: '/images/hospital4.jpg',
      title: 'Advanced Medical Care',
      description: 'Equipped with the latest medical technology and expert healthcare professionals',
      stats: 'Modern Operation Theaters | ICU Facilities | Advanced Diagnostic Center'
    },
    {
      image: '/images/hospital6.jpg',
      title: 'Patient-Centered Care',
      description: 'Committed to providing compassionate and personalized healthcare services',
      stats: 'Private Rooms | Specialized Departments | Expert Medical Staff'
    }
  ];

  // Create an extended array with cloned data for infinite effect
  const extendedData = [...carouselData, carouselData[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        if (currentSlide === carouselData.length - 1) {
          setCurrentSlide(curr => curr + 1);
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentSlide(0);
          }, 500);
        } else {
          setCurrentSlide(curr => curr + 1);
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const handleTransitionEnd = () => {
    if (currentSlide === carouselData.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    if (currentSlide === 0) {
      setCurrentSlide(carouselData.length - 1);
    } else {
      setCurrentSlide(curr => curr - 1);
    }
  };

  const goToNext = () => {
    setIsTransitioning(true);
    if (currentSlide === carouselData.length - 1) {
      setCurrentSlide(curr => curr + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 500);
    } else {
      setCurrentSlide(curr => curr + 1);
    }
  };

  return (
    <div className="carousel-container">
      <div 
        className="carousel"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedData.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-info">
              <h2>{slide.title}</h2>
              <p className="description">{slide.description}</p>
              <p className="stats">{slide.stats}</p>
            </div>
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </div>
      
      <button className="carousel-button prev" onClick={goToPrevious}>
        <span className="carousel-arrow">❮</span>
      </button>
      <button className="carousel-button next" onClick={goToNext}>
        <span className="carousel-arrow">❯</span>
      </button>

      <div className="carousel-dots">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === (currentSlide % carouselData.length) ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 