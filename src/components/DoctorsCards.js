import React, { useState, useEffect, useCallback, useRef } from "react";
import "./DoctorsCard.css";
import ViewProfile from './ViewProfile';  // Add this import

// Removed invalid <link> tag. Include it in public/index.html instead.

// Update speech recognition setup with error handling
const initializeSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return null;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    return recognition;
};

const recognition = initializeSpeechRecognition();

// Add sentiment analysis function
const analyzeSentiment = (text) => {
    const negativeWords = ['pain', 'severe', 'worst', 'unbearable', 'agony', 'terrible'];
    const urgentWords = ['emergency', 'critical', 'urgent', 'help', 'serious'];
    let sentiment = 0;
    let isUrgent = false;

    text.toLowerCase().split(' ').forEach(word => {
        if (negativeWords.includes(word)) sentiment--;
        if (urgentWords.includes(word)) isUrgent = true;
    });

    return { sentiment, isUrgent };
};

// Add after analyzeSentiment function
const findSimilarSymptoms = (input, keywords) => {
    input = input.toLowerCase();
    // Split input into words
    const words = input.split(' ');
    
    // Check for direct matches
    for (const keyword of keywords) {
        if (input.includes(keyword.toLowerCase())) {
            return true;
        }
    }
    
    // Check for partial matches
    for (const word of words) {
        if (word.length > 3) { // Only check words longer than 3 characters
            for (const keyword of keywords) {
                if (keyword.toLowerCase().includes(word) || 
                    word.includes(keyword.toLowerCase())) {
                    return true;
                }
            }
        }
    }
    
    return false;
};

const doctors = [
    {
        location: "Delhi",
        name: "DR. RAKESH SHARMA",
        specialty: "Senior Consultant - General Medicine",
        qualifications: ["MD (General Medicine) - 2005 From AIIMS", "MBBS - 2000 From MAMC Delhi"],
        image: "images/image2.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (General Medicine) - 2005 From AIIMS",
                "MBBS - 2000 From MAMC Delhi"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Mumbai",
        name: "DR. PRIYA PATEL",
        specialty: "Senior Consultant - General Medicine",
        qualifications: ["MD (General Medicine) - 2008 From KEM Hospital", "MBBS - 2003 From GMC Mumbai"],
        image: "images/image4.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (General Medicine) - 2008 From KEM Hospital",
                "MBBS - 2003 From GMC Mumbai"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Gurugram",
        name: "(COL) DR. MONIK MEHTA",
        specialty: "Senior Consultant - Cardiology",
        qualifications: ["DM (Cardiology) - 2003 From AFMC, University Of Pune", "MD (Medicine) - 1991 From Army Hospital"],
        image: "images/image1.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Cardiology) - 2003 From AFMC, University Of Pune",
                "MD (Medicine) - 1991 From Army Hospital"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Mumbai",
        name: "DR. ANITA SHARMA",
        specialty: "Senior Consultant - Neurology",
        qualifications: ["DM (Neurology) - 2005 From AIIMS", "MD (Medicine) - 1999 From JIPMER"],
        image: "images/image2.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Neurology) - 2005 From AIIMS",
                "MD (Medicine) - 1999 From JIPMER"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Delhi",
        name: "DR. RAVI VERMA",
        specialty: "Senior Consultant - Orthopedics",
        qualifications: ["MS (Orthopedics) - 2002 From PGI Chandigarh", "MBBS - 1998 From KMC Manipal"],
        image: "images/image3.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MS (Orthopedics) - 2002 From PGI Chandigarh",
                "MBBS - 1998 From KMC Manipal"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Chennai",
        name: "DR. PRIYA KUMAR",
        specialty: "Senior Consultant - Pediatrics",
        qualifications: ["MD (Pediatrics) - 2008 From CMC Vellore", "MBBS - 2004 From MMC Chennai"],
        image: "images/image4.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (Pediatrics) - 2008 From CMC Vellore",
                "MBBS - 4 From MMC Chennai"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Hyderabad",
        name: "DR. ARUN REDDY",
        specialty: "Senior Consultant - Gastroenterology",
        qualifications: ["DM (Gastroenterology) - 2010 From NIMS Hyderabad", "MD (Medicine) - 2006 From Osmania Medical College"],
        image: "images/image5.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Gastroenterology) - 2010 From NIMS Hyderabad",
                "MD (Medicine) - 2006 From Osmania Medical College"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Kolkata",
        name: "DR. SOUMYA GHOSH",
        specialty: "Senior Consultant - Dermatology",
        qualifications: ["MD (Dermatology) - 2012 From IPGMER Kolkata", "MBBS - 2008 From RG Kar Medical College"],
        image: "images/image1.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (Dermatology) - 2012 From IPGMER Kolkata",
                "MBBS - 2008 From RG Kar Medical College"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Pune",
        name: "DR. VIKAS PATIL",
        specialty: "Senior Consultant - Oncology",
        qualifications: ["DM (Oncology) - 2015 From Tata Memorial Hospital", "MD (Medicine) - 2011 From BJMC Pune"],
        image: "images/image3.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Oncology) - 2015 From Tata Memorial Hospital",
                "MD (Medicine) - 2011 From BJMC Pune"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Bangalore",
        name: "DR. MEERA NAIR",
        specialty: "Senior Consultant - Endocrinology",
        qualifications: ["DM (Endocrinology) - 2013 From St. John's Medical College", "MD (Medicine) - 2009 From Bangalore Medical College"],
        image: "images/image5.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Endocrinology) - 2013 From St. John's Medical College",
                "MD (Medicine) - 2009 From Bangalore Medical College"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Chittoor",
        name: "DR. MEERA NAIR",
        specialty: "Senior Consultant - Endocrinology",
        qualifications: ["DM (Endocrinology) - 2013 From St. John's Medical College", "MD (Medicine) - 2009 From Bangalore Medical College"],
        image: "images/image4.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Endocrinology) - 2013 From St. John's Medical College",
                "MD (Medicine) - 2009 From Bangalore Medical College"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Ahmedabad",
        name: "DR. KIRAN SHAH",
        specialty: "Senior Consultant - Pulmonology",
        qualifications: ["DM (Pulmonology) - 2014 From NHL Medical College", "MD (Medicine) - 2010 From BJMC Ahmedabad"],
        image: "images/image2.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Pulmonology) - 2014 From NHL Medical College",
                "MD (Medicine) - 2010 From BJMC Ahmedabad"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Lucknow",
        name: "DR. ANIL KUMAR",
        specialty: "Senior Consultant - Nephrology",
        qualifications: ["DM (Nephrology) - 2016 From SGPGI Lucknow", "MD (Medicine) - 2012 From KGMU Lucknow"],
        image: "images/image3.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Nephrology) - 2016 From SGPGI Lucknow",
                "MD (Medicine) - 2012 From KGMU Lucknow"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Jaipur",
        name: "DR. RITU SINGH",
        specialty: "Senior Consultant - Gynecology",
        qualifications: ["MD (Gynecology) - 2011 From SMS Medical College", "MBBS - 2007 From SMS Medical College"],
        image: "images/image1.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (Gynecology) - 2011 From SMS Medical College",
                "MBBS - 2007 From SMS Medical College"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Patna",
        name: "DR. RAJESH KUMAR",
        specialty: "Senior Consultant - Urology",
        qualifications: ["MCh (Urology) - 2015 From AIIMS Delhi", "MS (Surgery) - 2011 From PMCH Patna"],
        image: "images/image4.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MCh (Urology) - 2015 From AIIMS Delhi",
                "MS (Surgery) - 2011 From PMCH Patna"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Bhopal",
        name: "DR. ANITA VERMA",
        specialty: "Senior Consultant - Psychiatry",
        qualifications: ["MD (Psychiatry) - 2013 From AIIMS Bhopal", "MBBS - 2009 From GMC Bhopal"],
        image: "images/image5.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "MD (Psychiatry) - 2013 From AIIMS Bhopal",
                "MBBS - 2009 From GMC Bhopal"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    },
    {
        location: "Thiruvananthapuram",
        name: "DR. SURESH NAIR",
        specialty: "Senior Consultant - Rheumatology",
        qualifications: ["DM (Rheumatology) - 2017 From SCTIMST", "MD (Medicine) - 2013 From GMC Trivandrum"],
        image: "images/image1.jpg",
        profileDetails: {
            about: "Experienced general physician with expertise in managing chronic diseases.",
            experience: "15+ years",
            languages: ["English", "Hindi", "Telugu"],
            education: [
                "DM (Rheumatology) - 2017 From SCTIMST",
                "MD (Medicine) - 2013 From GMC Trivandrum"
            ],
            specializations: ["Diabetes Management", "Hypertension", "Preventive Medicine"],
            awards: ["Best Physician Award 2022", "Healthcare Excellence 2021"],
            publications: ["Research on Diabetes Management", "Study on Hypertension Control"],
            memberships: ["Indian Medical Association", "Royal College of Physicians"],
            registrationNumber: "IMC123456",
            expertise: ["General Medicine", "Diabetes", "Thyroid Disorders"],
            services: ["General Checkup", "Diabetes Management", "Health Screening"],
            acceptedInsurance: ["Apollo Insurance", "Star Health", "LIC Health"],
            hospitalAffiliations: ["Apollo Hospitals", "KIMS Hospital"],
            researchInterests: ["Preventive Medicine", "Chronic Disease Management"],
            patientTestimonials: [
                {
                    name: "John D.",
                    review: "Excellent doctor, very thorough in diagnosis",
                    rating: 5,
                    date: "2023-10-15"
                }
                // ...more testimonials
            ]
        }
    }
];

const symptomsMap = {
    'general medicine': [
        // Common symptoms
        'fever', 'cold', 'cough', 'headache', 'body pain',
        'weakness', 'fatigue', 'throat pain', 'running nose',
        'mild fever', 'viral fever', 'seasonal fever',
        
        // Common phrases people use
        'not feeling well', 'feeling sick', 'under the weather',
        'feeling feverish', 'having cold', 'general checkup',
        'regular checkup', 'health checkup',
        
        // Basic health issues
        'common cold', 'flu symptoms', 'viral infection',
        'seasonal illness', 'basic health issues',
        'minor health problems', 'routine checkup',
        
        // Duration based
        'fever for 2 days', 'cold since yesterday',
        'not feeling well for a week', 'continuous fever',
        'recurring fever', 'frequent illness'
    ],
    'pulmonology': [
        'cough', 'breathing difficulty', 'asthma', 'lung', 'respiratory',
        'shortness of breath', 'wheezing', 'chronic cough', 'breathing problems',
        'chest congestion', 'copd symptoms', 'bronchitis', 'pneumonia symptoms',
        'sleep apnea', 'tuberculosis', 'lung infection', 'difficulty breathing', 'fever with cough', 'fever with breathing difficulty',
        'covid symptoms', 'flu symptoms', 'cold and fever',
        'fever with sore throat', 'chest congestion with fever',
        'bronchitis symptoms', 'pneumonia symptoms',
        'bad cough', 'continuous cough', 'coughing a lot',
        'chest congestion', 'mucus', 'phlegm',
        'difficulty breathing', 'breathing problem',
        'chest cold', 'chest congestion'
    ],
    
    'pediatrics': [
        'child fever', 'vaccination', 'growth issues', 'child cough', 'child development',
        'baby checkup', 'childhood illness', 'child flu', 'baby health', 'infant care',
        'child vaccination', 'newborn care', 'child nutrition', 'baby growth',
        'child asthma', 'child allergies', 'pediatric concerns', 'child ear infection', 'child fever', 'baby fever', 'high fever', 'recurring fever',
        'fever with cold', 'fever with cough', 'fever in infants',
        'fever with rash in children', 'fever and not eating',
        'teething fever', 'viral fever', 'dengue symptoms',
        'fever with stomach pain in children', 'seasonal fever',
        'fever with throat pain', 'fever with ear pain',
        'continuous fever', 'intermittent fever',
        'child fever', 'baby fever', 'kid not well',
        'baby cold', 'child cough', 'baby not eating',
        'child not feeling well', 'baby crying a lot',
        'child runny nose', 'baby coughing'
    ],

    'cardiology': [
        'chest pain', 'shortness of breath', 'heart', 'palpitations', 'high blood pressure', 'dizziness',
        'irregular heartbeat', 'chest tightness', 'heart racing', 'fainting', 'chest pressure',
        'difficulty breathing', 'swollen ankles', 'fatigue with activity', 'arm pain', 'jaw pain',
        'sweating with chest pain', 'heart attack symptoms', 'chest pain with fever', 'fever with body pain', 'fever with chest pain'
    ],
    'neurology': [
        'headache', 'migraine', 'seizure', 'brain', 'numbness', 'tremors', 'memory loss',
        'dizziness', 'balance problems', 'stroke symptoms', 'facial weakness', 'confusion',
        'difficulty speaking', 'weak arms or legs', 'tingling sensation', 'vision problems',
        'frequent headaches', 'severe head pain', 'loss of consciousness', 'vertigo', 'fever with headache', 'fever with neck stiffness', 'high fever with confusion'
    ],
    'orthopedics': [
        'joint pain', 'back pain', 'fracture', 'bone', 'sprain', 'arthritis',
        'knee pain', 'shoulder pain', 'hip pain', 'neck pain', 'ankle pain',
        'sports injury', 'broken bone', 'muscle pain', 'stiffness', 'swollen joints',
        'difficulty walking', 'limited movement', 'spine problems', 'joint stiffness', 'fever with joint pain', 'fever with muscle pain', 'fever after injury'
    ],
    'dermatology': [
        'skin', 'rash', 'acne', 'itching', 'hair loss', 'nail problems',
        'skin infection', 'skin allergy', 'eczema', 'psoriasis', 'moles',
        'skin cancer screening', 'warts', 'dry skin', 'skin patches',
        'skin discoloration', 'dermatitis', 'fungal infection', 'skin growth', 'fever with rash', 'skin infection with fever', 'fever with itching'
    ],
    'gastroenterology': [
        'stomach pain', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'acid reflux',
        'abdominal pain', 'bloating', 'indigestion', 'heartburn', 'blood in stool',
        'difficulty swallowing', 'loss of appetite', 'stomach burning', 'gas',
        'irritable bowel', 'liver problems', 'ulcer symptoms', 'food intolerance', 'fever with stomach pain', 'fever with diarrhea', 'fever with vomiting',
        'food poisoning', 'typhoid symptoms', 'jaundice', 'hepatitis symptoms'
    ],
    'endocrinology': [
        'diabetes', 'thyroid', 'hormone', 'weight issues', 'metabolism',
        'thyroid problems', 'diabetes management', 'hormone imbalance', 'growth issues',
        'excessive thirst', 'frequent urination', 'weight gain', 'weight loss',
        'fatigue', 'metabolic disorders', 'endocrine problems', 'blood sugar', 'fever with excessive sweating', 'fever with thyroid problems'
    ],
    'gynecology': [
        'pregnancy', 'menstruation', 'women health', 'fertility', 'pcos',
        'irregular periods', 'menstrual pain', 'pregnancy care', 'womens health',
        'pelvic pain', 'abnormal bleeding', 'contraception', 'menopause',
        'reproductive health', 'vaginal infection', 'breast problems', 'pap smear', 'fever during pregnancy', 'postpartum fever', 'fever with menstruation'
    ],
    'psychiatry': [
        'anxiety', 'depression', 'stress', 'sleep issues', 'mental health',
        'mood swings', 'panic attacks', 'behavioral issues', 'addiction',
        'eating disorders', 'obsessive thoughts', 'phobias', 'bipolar symptoms',
        'concentration problems', 'emotional issues', 'psychological support', 'fever with anxiety', 'psychogenic fever'
    ],
    'urology': [
        'kidney', 'urinary', 'prostate', 'bladder', 'uti',
        'frequent urination', 'burning urination', 'kidney stones', 'bladder problems',
        'urinary infection', 'prostate problems', 'male fertility', 'erectile dysfunction',
        'blood in urine', 'incontinence', 'urological problems', 'fever with urinary problems', 'fever with kidney pain',
        'urinary infection with fever', 'fever with back pain'
    ],
    'rheumatology': [
        'arthritis', 'joint swelling', 'autoimmune', 'lupus', 'muscle pain',
        'joint inflammation', 'rheumatoid arthritis', 'gout', 'osteoarthritis',
        'joint stiffness', 'muscle weakness', 'autoimmune disease', 'fibromyalgia',
        'chronic pain', 'bone pain', 'connective tissue problems', 'fever with multiple joint pains', 'autoimmune fever',
        'rheumatic fever', 'fever with inflammation'
    ]
};

const findGeneralMedicineDoctor = () => {
    return doctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes('general medicine')
    );
};

const analyzeSymptomSeverity = (symptoms) => {
    const severityIndicators = {
        high: ['severe', 'intense', 'extreme', 'unbearable', 'emergency', 'critical'],
        medium: ['moderate', 'significant', 'concerning', 'persistent'],
        low: ['mild', 'slight', 'minor', 'occasional']
    };

    const words = symptoms.toLowerCase().split(' ');
    for (const word of words) {
        if (severityIndicators.high.includes(word)) return 'high';
        if (severityIndicators.medium.includes(word)) return 'medium';
        if (severityIndicators.low.includes(word)) return 'low';
    }
    return 'medium';
};

const getFollowUpQuestions = (symptoms) => {
    const commonFollowUps = {
        'pain': ['How long have you been experiencing this pain?', 'On a scale of 1-10, how severe is the pain?'],
        'fever': ['What\'s your temperature?', 'Are you experiencing any other symptoms?'],
        'cough': ['Is it a dry cough or productive?', 'How long have you been coughing?'],
        'headache': ['Is it constant or intermittent?', 'Have you taken any medication?'],
        'breathing': ['Does it worsen with activity?', 'Are you experiencing chest pain?']
    };

    return Object.entries(commonFollowUps)
        .filter(([key]) => symptoms.toLowerCase().includes(key))
        .map(([_, questions]) => questions)
        .flat();
};

const defaultSuggestions = [
    'I have chest pain',
    'Experiencing headache',
    'Skin problems',
    'Joint pain'
];

const getPersonalizedSuggestions = (userHistory) => {
    if (!userHistory.length) return defaultSuggestions;
    
    const commonSymptoms = userHistory
        .map(msg => msg.text.toLowerCase())
        .filter(text => 
            Object.values(symptomsMap)
                .flat()
                .some(symptom => text.includes(symptom))
        );

    return commonSymptoms.length > 0 
        ? ['Similar to your previous symptoms?', ...defaultSuggestions]
        : defaultSuggestions;
};

const DoctorsCards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCard, setExpandedCard] = useState(null);
    const [consultationType, setConsultationType] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingFormIndex, setBookingFormIndex] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        symptoms: '',
        previousHistory: ''
    });
    
    // New temporary states for filters
    const [tempLocation, setTempLocation] = useState('all');
    const [tempSpecialty, setTempSpecialty] = useState('all');
    
    // Add new state for selected date
    const [selectedDate, setSelectedDate] = useState(null);
    
    const [sortBy, setSortBy] = useState('name');
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    
    const cardsPerPage = 6;
    // Get unique locations and specialties for filters
    const locations = ['all', ...new Set(doctors.map(doc => doc.location))];
    const specialties = ['all', ...new Set(doctors.map(doc => doc.specialty))];

    // Add sorting function
    const sortDoctors = (doctors) => {
        return [...doctors].sort((a, b) => {
            let compareVal;
            switch(sortBy) {
                case 'name':
                    compareVal = a.name.localeCompare(b.name);
                    break;
                case 'specialty':
                    compareVal = a.specialty.localeCompare(b.specialty);
                    break;
                case 'location':
                    compareVal = a.location.localeCompare(b.location);
                    break;
                default:
                    compareVal = 0;
            }
            return sortOrder === 'asc' ? compareVal : -compareVal;
        });
    };

    // Modify the filtered doctors to include sorting
    const filteredDoctors = sortDoctors(doctors.filter(doctor => {
        const locationMatch = selectedLocation === 'all' || doctor.location === selectedLocation;
        const specialtyMatch = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const nameMatch = searchTerms.every(term => 
            doctor.name.toLowerCase().includes(term) ||
            doctor.specialty.toLowerCase().includes(term) ||
            doctor.location.toLowerCase().includes(term)
        );
        return locationMatch && specialtyMatch && nameMatch;
    }));

    // Add loading simulation for better UX
    const handleFilterSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedLocation(tempLocation);
            setSelectedSpecialty(tempSpecialty);
            setCurrentPage(1);
            setIsLoading(false);
        }, 500);
    };

    const clearFilters = () => {
        setSelectedLocation('all');
        setSelectedSpecialty('all');
        setTempLocation('all');
        setTempSpecialty('all');
        setSearchQuery('');
        setCurrentPage(1);
    };
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredDoctors.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filteredDoctors.length / cardsPerPage);

    // Move the useEffect here, after currentCards is defined
    useEffect(() => {
        // Monitor changes to cards and update expanded card if needed
        if (expandedCard !== null) {
            const currentExpandedDoctor = currentCards[expandedCard];
            if (currentExpandedDoctor) {
                const newIndex = currentCards.findIndex(d => d.name === currentExpandedDoctor.name);
                if (newIndex !== expandedCard) {
                    setExpandedCard(newIndex);
                }
            }
        }
    }, [currentCards, expandedCard]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setExpandedCard(null); // Reset expanded card when changing page
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setExpandedCard(null); // Reset expanded card when changing page
        }
    };
    const handleBookAppointment = (index) => {
        if (expandedCard === index) {
            // Close current card
            setExpandedCard(null);
            setConsultationType(null);
            setSelectedTimeSlot(null);
            setSelectedDate(null);
            setBookingFormIndex(null);
            return;
        }
    
        // Reset all states when opening a new card
        setBookingFormIndex(null);
        setSelectedTimeSlot(null);
        setSelectedDate(null);
        setConsultationType(null);
        
        // Set the new expanded card
        setExpandedCard(index);
        
        // Scroll to the expanded card
        setTimeout(() => {
            const element = document.querySelector('.expanded');
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
    };
    const handleConsultationSelect = (type) => {
        setConsultationType(type);
        setSelectedTimeSlot(null);
        setSelectedDate(null);
        setBookingFormIndex(null); // Reset booking form when changing consultation type
    };
    const handleTimeSlotSelect = (slot) => {
        setSelectedTimeSlot(slot);
    };
    const handleDateSelect = (e) => {
        setSelectedDate(e.target.value);
    };
    const handleBookingSubmit = (e) => {
        e.preventDefault();
        // Add your booking logic here
        alert('Appointment booked successfully!');
        setBookingFormIndex(null);
        setExpandedCard(null);
        setConsultationType(null);
        setSelectedTimeSlot(null);
        setSelectedDate(null);  // Reset date
        setBookingDetails({
            name: '',
            email: '',
            phone: '',
            gender: '',
            age: '',
            symptoms: '',
            previousHistory: ''
        });
    };
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        document.querySelectorAll('.doctor-card').forEach((card) => {
            observer.observe(card);
        });
        return () => observer.disconnect();
    }, [currentCards]);

    // Add these new states
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Add these new states after other state declarations
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [chatSettings, setChatSettings] = useState({
        soundEnabled: true,
        autoSuggestions: true,
        darkMode: false,
        fontSize: 'medium'
    });

    // Add new state for chat history
    const [chatHistory, setChatHistory] = useState([]);

    // Add new states for advanced features
    const [isListening, setIsListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [language, setLanguage] = useState('en');
    const [typingSuggestions, setTypingSuggestions] = useState([]);
    const [symptomTimeline, setSymptomTimeline] = useState([]);
    const messagesEndRef = useRef(null);

    // Add state for speech recognition status
    const [voiceSupported] = useState(!!recognition);
    const [voiceError, setVoiceError] = useState('');

    // Add scroll to bottom effect
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    // Add voice input handler
    const handleVoiceInput = () => {
        if (!recognition) {
            setVoiceError('Voice input is not supported in your browser');
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            setVoiceError('');
            recognition.start();
            setIsListening(true);
        }
    };

    // Add voice output handler
    const speakResponse = useCallback((text) => {
        if (!voiceEnabled || !text) return;

        const synth = window.speechSynthesis;
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = 1;
        utterance.pitch = 1;

        // Remove HTML tags and emojis from text
        const cleanText = text.replace(/<[^>]*>/g, '').replace(/[\u{1F300}-\u{1F6FF}]/gu, '');
        utterance.text = cleanText;

        utterance.onend = () => {
            // Play end sound
            const audio = new Audio('/sounds/message-sent.mp3');
            if (chatSettings.soundEnabled) {
                audio.play().catch(() => {});
            }
        };

        synth.speak(utterance);
    }, [voiceEnabled, language, chatSettings.soundEnabled]);

    // Define handleAIResponse first since it's used in handleSendMessage
    const handleAIResponse = useCallback(async (message) => {
        try {
            setIsTyping(true);
            const symptoms = message.toLowerCase();
            const severity = analyzeSymptomSeverity(symptoms);
            const followUpQuestions = getFollowUpQuestions(symptoms);
            const { sentiment, isUrgent } = analyzeSentiment(message);

            // Check for emergency situations
            if (isUrgent || sentiment < -2) {
                const emergencyResponse = {
                    type: 'ai',
                    text: '🚨 This appears to be an emergency situation. Would you like me to:',
                    options: [
                        'Call emergency services',
                        'Show nearest emergency rooms',
                        'Connect with an online doctor immediately',
                        'Continue with regular consultation'
                    ],
                    isEmergency: true
                };
                
                setChatMessages(prev => [...prev, emergencyResponse]);
                if (voiceEnabled) {
                    speakResponse(emergencyResponse.text);
                }
                setIsTyping(false);
                return;
            }

            // Check if it's a basic symptom
            const isBasicSymptom = symptomsMap['general medicine'].some(keyword => {
                const keywordParts = keyword.toLowerCase().split(' ');
                return keywordParts.some(part => 
                    symptoms.includes(part) || part.includes(symptoms)
                );
            });

            let recommendedDoctors = [];
            if (isBasicSymptom && severity !== 'high') {
                recommendedDoctors = findGeneralMedicineDoctor();
            }

            // Find matched specialties
            const matchedSpecialties = Object.entries(symptomsMap)
                .filter(([_, keywords]) => findSimilarSymptoms(symptoms, keywords));

            // Add matched doctors
            const specialtyDoctors = doctors.filter(doctor => 
                matchedSpecialties.some(([specialty]) => 
                    doctor.specialty.toLowerCase().includes(specialty)
                )
            );

            // Prioritize doctors based on severity
            recommendedDoctors = severity === 'high' 
                ? [...specialtyDoctors, ...recommendedDoctors]
                : [...recommendedDoctors, ...specialtyDoctors];

            // Remove duplicates
            recommendedDoctors = [...new Set(recommendedDoctors)];

            // Add typing delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Prepare response
            const response = {
                type: 'ai',
                text: severity === 'high'
                    ? `⚠️ Your symptoms indicate a potentially serious condition. Please consider immediate medical attention. Based on your symptoms "${message}" (${severity} severity), I recommend:`
                    : `Based on your symptoms "${message}" (${severity} severity), I recommend:`,
                doctors: recommendedDoctors.slice(0, 3),
                severity: severity,
                followUp: followUpQuestions
            };

            // Update messages
            setChatMessages(prev => [
                ...prev, 
                response,
                ...(followUpQuestions.length ? [{
                    type: 'ai',
                    text: 'To better assist you, could you please answer:',
                    questions: followUpQuestions
                }] : []),
                {
                    type: 'ai',
                    text: 'Would you like to book an appointment with any of these doctors?',
                    isFollowUp: true
                }
            ]);

            // Update timeline and chat history
            setSymptomTimeline(prev => [...prev, {
                symptom: message,
                timestamp: new Date(),
                severity: severity,
                sentiment: sentiment
            }]);

            setChatHistory(prev => [...prev, { 
                text: message, 
                timestamp: new Date() 
            }]);

            if (voiceEnabled) {
                speakResponse(response.text);
            }

            setIsTyping(false);
            setShowSuggestions(false);

        } catch (error) {
            console.error('Error in handleAIResponse:', error);
            setIsTyping(false);
            setChatMessages(prev => [...prev, {
                type: 'ai',
                text: 'Sorry, I encountered an error. Please try again.',
                isError: true
            }]);
        }
    }, [voiceEnabled, speakResponse]);

    // Define handleSendMessage before it's used in useEffect
    const handleSendMessage = useCallback(async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        setChatMessages(prev => [...prev, { 
            type: 'user', 
            text: userInput 
        }]);
        
        const message = userInput;
        setUserInput('');
        await handleAIResponse(message);
    }, [userInput, handleAIResponse]);

    // Now update the useEffect that uses handleSendMessage
    useEffect(() => {
        if (!recognition) return;

        recognition.onstart = () => {
            setIsListening(true);
            if (chatSettings.soundEnabled) {
                const audio = new Audio('/sounds/start-recording.mp3');
                audio.play().catch(() => {});
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            if (chatSettings.soundEnabled) {
                const audio = new Audio('/sounds/stop-recording.mp3');
                audio.play().catch(() => {});
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
            handleSendMessage({ preventDefault: () => {}, type: 'voice' });
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            setVoiceError(`Error occurred: ${event.error}`);
            console.error('Speech recognition error:', event.error);
        };

    }, [chatSettings.soundEnabled, handleSendMessage]);

    // Remove useEffect with isBasicSymptom error
    useEffect(() => {
        if (isChatbotOpen && chatMessages.length === 0) {
            setChatMessages([{
                type: 'ai',
                text: 'Hello! I\'m your medical assistant. How can I help you today? You can describe your symptoms or select from common conditions below.',
            }]);
            setSuggestions(getPersonalizedSuggestions(chatHistory));
            setShowSuggestions(true);
        }
    }, [isChatbotOpen, chatMessages.length, chatHistory]);

    // Add real-time typing suggestions
    const handleInputChange = (e) => {
        const input = e.target.value;
        setUserInput(input);

        if (input.length > 2) {
            const suggestions = Object.values(symptomsMap)
                .flat()
                .filter(symptom => 
                    symptom.toLowerCase().includes(input.toLowerCase())
                )
                .slice(0, 3);
            setTypingSuggestions(suggestions);
        } else {
            setTypingSuggestions([]);
        }
    };

    // Add this function to handle quick replies
    const handleQuickReply = (reply) => {
        setChatMessages(prev => [...prev, { type: 'user', text: reply }]);
        handleAIResponse(reply);
    };

    // Add this function to handle doctor selection from chat
    const handleDoctorSelect = (doctor) => {
        // Find the doctor's index in the filtered list instead of global list
        const globalIndex = filteredDoctors.findIndex(d => d.name === doctor.name);
        
        // Calculate the correct page number
        const targetPage = Math.floor(globalIndex / cardsPerPage) + 1;
        
        // Set the page first
        setCurrentPage(targetPage);
        
        // Calculate the local index within the current page
        const localIndex = globalIndex % cardsPerPage;
        
        // Wait for the page change and state updates
        setTimeout(() => {
            setExpandedCard(localIndex);
            setIsChatbotOpen(false);
            
            // Scroll to the expanded card
            setTimeout(() => {
                const element = document.querySelector('.expanded');
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 100);
        }, 100);
    };

    // Add this function to handle chat clear
    const handleClearChat = () => {
        setChatMessages([{
            type: 'ai',
            text: 'Chat history has been cleared. How can I help you today?',
        }]);
        setSuggestions([
            'I have chest pain',
            'Experiencing headache',
            'Skin problems',
            'Joint pain'
        ]);
        setShowSuggestions(true);
        setShowClearConfirm(false);
    };

    // Add this function to handle chat download
    const handleDownloadChat = () => {
        const chatText = chatMessages
            .map(msg => `${msg.type}: ${msg.text} (${new Date().toLocaleTimeString()})`)
            .join('\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.txt';
        a.click();
        URL.revokeObjectURL(url);
        setShowOptionsMenu(false);
    };

    // Add this function to handle message feedback
    const handleMessageFeedback = (messageIndex, isHelpful) => {
        setChatMessages(prev => prev.map((msg, idx) => 
            idx === messageIndex ? { ...msg, feedback: isHelpful } : msg
        ));
    };

    // Add this with other state declarations at the top
    const [showProfile, setShowProfile] = useState(null);

    // Add this with other handler functions
    const handleViewProfile = (doctor) => {
        setShowProfile(doctor);
    };

    return (
        <div>
            {/* Add the chatbot button in the banner section */}
            <section className="banner">
                <video autoPlay muted loop id="background-video">
                    <source src="videos/hospital video.mp4" type="video/mp4" />
                </video>
                <h1>OUR DOCTOR'S</h1>
                <button 
                    className="chatbot-toggle"
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                >
                    <i className="fas fa-robot"></i>
                    AI Symptom Checker
                </button>
            </section>
            {/* Add the chatbot interface */}
            {isChatbotOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <div className="header-left">
                            <i className="fas fa-robot"></i>
                            <h3>Medical Assistant</h3>
                            {!voiceSupported && (
                                <span className="voice-status error">
                                    <i className="fas fa-microphone-slash"></i>
                                    Voice input not supported
                                </span>
                            )}
                            {voiceError && (
                                <span className="voice-status error">
                                    <i className="fas fa-exclamation-circle"></i>
                                    {voiceError}
                                </span>
                            )}
                        </div>
                        <div className="header-controls">
                            <button 
                                className="menu-btn"
                                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                                title="Menu"
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                            {showOptionsMenu && (
                                <div className="menu-dropdown">
                                    <button onClick={handleClearChat}>
                                        <i className="fas fa-trash-alt"></i>
                                        Clear Chat
                                    </button>
                                    <button onClick={handleDownloadChat}>
                                        <i className="fas fa-download"></i>
                                        Save Chat
                                    </button>
                                    <button onClick={() => {
                                        setShowOptionsMenu(false);
                                        setShowSettings(true);
                                    }}>
                                        <i className="fas fa-cog"></i>
                                        Settings
                                    </button>
                                    <button onClick={() => {
                                        setChatMessages([]);
                                        setIsChatbotOpen(false);
                                    }}>
                                        <i className="fas fa-times"></i>
                                        Close Chat
                                    </button>
                                </div>
                            )}
                            <button 
                                className="close-btn"
                                onClick={() => setIsChatbotOpen(false)}
                                title="Close chat"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="chatbot-messages" id="chat-messages">
                        {showClearConfirm && (
                            <div className="confirmation-dialog">
                                <p>Clear chat history?</p>
                                <div className="confirmation-actions">
                                    <button 
                                        className="confirm"
                                        onClick={handleClearChat}
                                    >
                                        Yes, clear
                                    </button>
                                    <button 
                                        className="cancel"
                                        onClick={() => setShowClearConfirm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.type}`}>
                                {msg.text}
                                <div className="message-timestamp">
                                    {new Date().toLocaleTimeString()}
                                </div>
                                {msg.type === 'ai' && !msg.feedback && (
                                    <div className="message-feedback">
                                        <button 
                                            className="feedback-btn helpful"
                                            onClick={() => handleMessageFeedback(index, true)}
                                        >
                                            <i className="fas fa-thumbs-up"></i> Helpful
                                        </button>
                                        <button 
                                            className="feedback-btn not-helpful"
                                            onClick={() => handleMessageFeedback(index, false)}
                                        >
                                            <i className="fas fa-thumbs-down"></i> Not Helpful
                                        </button>
                                    </div>
                                )}
                                {msg.doctors && (
                                    <div className="doctor-suggestions">
                                        {msg.doctors.map((doctor, i) => (
                                            <button
                                                key={i}
                                                className="doctor-suggestion-btn"
                                                onClick={() => handleDoctorSelect(doctor)}
                                            >
                                                <strong>{doctor.name}</strong>
                                                <span>{doctor.specialty}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {msg.options && (
                                    <div className="chat-options">
                                        {msg.options.map((option, i) => (
                                            <button
                                                key={i}
                                                className="option-btn"
                                                onClick={() => handleQuickReply(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-message ai typing">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        {showSuggestions && (
                            <div className="quick-suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className="suggestion-btn"
                                        onClick={() => handleQuickReply(suggestion)}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                        {typingSuggestions.length > 0 && (
                            <div className="typing-suggestions">
                                {typingSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setUserInput(suggestion)}
                                        className="suggestion-btn"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                        {symptomTimeline.length > 0 && (
                            <div className="symptom-timeline">
                                <h4>Symptom History</h4>
                                <div className="timeline-items">
                                    {symptomTimeline.map((item, index) => (
                                        <div key={index} className={`timeline-item ${item.severity}`}>
                                            <span className="time">
                                                {item.timestamp.toLocaleTimeString()}
                                            </span>
                                            <span className="symptom">{item.symptom}</span>
                                            <span className="severity">{item.severity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {showSettings && (
                        <div className={`chat-settings ${showSettings ? 'open' : ''}`}>
                            <h3>Chat Settings</h3>
                            <div className="settings-group">
                                <h4>General</h4>
                                <div className="settings-option">
                                    <span>Sound Effects</span>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={chatSettings.soundEnabled}
                                            onChange={e => setChatSettings({
                                                ...chatSettings,
                                                soundEnabled: e.target.checked
                                            })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                                <div className="settings-option">
                                    <span>Auto Suggestions</span>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={chatSettings.autoSuggestions}
                                            onChange={e => setChatSettings({
                                                ...chatSettings,
                                                autoSuggestions: e.target.checked
                                            })}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                                <div className="settings-option">
                                    <span>Voice Controls</span>
                                    <div>
                                        <button 
                                            className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
                                            onClick={() => setVoiceEnabled(prev => !prev)}
                                        >
                                            {voiceEnabled ? 'Voice On' : 'Voice Off'}
                                        </button>
                                        <select 
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="language-select"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="back-btn"
                                onClick={() => setShowSettings(false)}
                            >
                                Close Settings
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSendMessage} className="chatbot-input">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Describe your symptoms..."
                        />
                        <button 
                            type="button" 
                            onClick={handleVoiceInput}
                            className={`voice-btn ${isListening ? 'listening' : ''}`}
                        >
                            <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
                        </button>
                        <button type="submit">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                    <div ref={messagesEndRef} />
                </div>
            )}

            {/* Existing main content */}
            <div className="main-content">
                <div className="sidebar">
                    <div className="filter-section">
                        <h3>Search Doctor</h3>
                        <input
                            type="text"
                            placeholder="Search by doctor name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-section">
                        <h3>Filter By Location</h3>
                        <select 
                            value={tempLocation} 
                            onChange={(e) => setTempLocation(e.target.value)}
                        >
                            {locations.map(location => (
                                <option key={location} value={location}>
                                    {location.charAt(0).toUpperCase() + location.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <h3>Filter By Specialty</h3>
                        <select 
                            value={tempSpecialty} 
                            onChange={(e) => setTempSpecialty(e.target.value)}
                        >
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>
                                    {specialty === 'all' ? 'All' : specialty.split(' - ')[1]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Name</option>
                            <option value="specialty">Specialty</option>
                            <option value="location">Location</option>
                        </select>
                        <button 
                            className="sort-order-btn"
                            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                        </button>
                    </div>
                    <div className="filter-section">
                        <button 
                            className="submit-filter-btn"
                            onClick={handleFilterSubmit}
                        >
                            Apply Filters
                        </button>
                        <button 
                            className="clear-filter-btn"
                            onClick={clearFilters}
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>
                <div className="container">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <div key={index} className="doctor-card skeleton">
                                <div className="image-section skeleton-image"></div>
                                <div className="info-section">
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredDoctors.length === 0 ? (
                            <div className="no-results">
                                <h3>No doctors found matching "{searchQuery}"</h3>
                                <p>Try adjusting your search criteria or clear filters</p>
                            </div>
                        ) : (
                            currentCards.map((doctor, index) => (
                                <div className={`doctor-card ${expandedCard === index ? 'expanded' : ''}`} key={index}>
                                    <div className="image-section">
                                        <p style={{ color: "white", fontWeight: "bold" }}>{doctor.location}</p>
                                        <img src={doctor.image} alt={doctor.name} />
                                    </div>
                                    <div className="info-section">
                                        {bookingFormIndex === index ? (
                                            <div className="final-booking-form">
                                                <h4>Complete Your Booking</h4>
                                                <form onSubmit={handleBookingSubmit}>
                                                    <div className="form-sections-container">
                                                        <div className="form-section">
                                                            <div className="form-group">
                                                                <label>Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    required
                                                                    value={bookingDetails.name}
                                                                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                                                                />
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input
                                                                        type="email"
                                                                        required
                                                                        value={bookingDetails.email}
                                                                        onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Phone Number</label>
                                                                    <input
                                                                        type="tel"
                                                                        required
                                                                        pattern="[0-9]{10}"
                                                                        value={bookingDetails.phone}
                                                                        onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <label>Gender</label>
                                                                    <select
                                                                        required
                                                                        value={bookingDetails.gender}
                                                                        onChange={(e) => setBookingDetails({...bookingDetails, gender: e.target.value})}
                                                                    >
                                                                        <option value="">Select Gender</option>
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>
                                                                        <option value="other">Other</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Age</label>
                                                                    <input
                                                                        type="number"
                                                                        required
                                                                        min="0"
                                                                        max="120"
                                                                        value={bookingDetails.age}
                                                                        onChange={(e) => setBookingDetails({...bookingDetails, age: e.target.value})}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-section">
                                                            <div className="form-group">
                                                                <label>Symptoms</label>
                                                                <textarea
                                                                    required
                                                                    value={bookingDetails.symptoms}
                                                                    onChange={(e) => setBookingDetails({...bookingDetails, symptoms: e.target.value})}
                                                                    style={{ height: '150px' }}
                                                                ></textarea>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Previous Medical History (if any)</label>
                                                                <textarea
                                                                    value={bookingDetails.previousHistory}
                                                                    onChange={(e) => setBookingDetails({...bookingDetails, previousHistory: e.target.value})}
                                                                    style={{ height: '150px' }}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-actions">
                                                        <button 
                                                            type="button" 
                                                            className="back-btn" 
                                                            onClick={() => setBookingFormIndex(null)}
                                                        >
                                                            Back
                                                        </button>
                                                        <button type="submit" className="confirm-btn">
                                                            Confirm Appointment
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <>
                                                <h5>{doctor.name}</h5>
                                                <p>{doctor.specialty}</p>
                                                <p className="qualification">QUALIFICATION:</p>
                                                {doctor.qualifications.map((qual, i) => (
                                                    <p key={i}>{qual}</p>
                                                ))}
                                                
                                                {expandedCard === index && (
                                                    <div className="consultation-section">
                                                        <h4>Select Consultation Type</h4>
                                                        <div className="consultation-buttons">
                                                            <button 
                                                                className="consultation-btn offline"
                                                                onClick={() => handleConsultationSelect('offline')}
                                                            >
                                                                <i className="fas fa-hospital"></i>
                                                                Offline Consultation
                                                                <span>Visit the hospital</span>
                                                            </button>
                                                            <button 
                                                                className="consultation-btn online"
                                                                onClick={() => handleConsultationSelect('online')}
                                                            >
                                                                <i className="fas fa-video"></i>
                                                                Online Consultation
                                                                <span>Video call with doctor</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="buttons">
                                                    <button 
                                                        className="btn btn-primary" 
                                                        onClick={() => handleBookAppointment(index)}
                                                    >
                                                        {expandedCard === index ? 'Close' : 'Book Appointment'}
                                                    </button>
                                                    <button 
                                                        className="btn btn-primary" 
                                                        onClick={() => handleViewProfile(doctor)}
                                                    >
                                                        View Profile
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {expandedCard === index && consultationType && bookingFormIndex === null && (
                                        <div className="appointment-options">
                                            <div className="booking-section">
                                                <h4>{consultationType === 'online' ? 'Online' : 'Offline'} Consultation</h4>
                                                <div className="date-time-selection">
                                                    <div className="date-select">
                                                        <label>Select Date:</label>
                                                        <input 
                                                            type="date" 
                                                            min={new Date().toISOString().split('T')[0]} 
                                                            onChange={handleDateSelect}
                                                            value={selectedDate || ''}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="time-slots">
                                                        <label>Available Slots:</label>
                                                        <div className="slot-buttons">
                                                            {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map((slot) => (
                                                                <button
                                                                    key={slot}
                                                                    className={selectedTimeSlot === slot ? 'selected' : ''}
                                                                    onClick={() => handleTimeSlotSelect(slot)}
                                                                >
                                                                    {slot}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className="proceed-btn"
                                                        onClick={() => setBookingFormIndex(index)}
                                                        disabled={!selectedTimeSlot || !selectedDate}
                                                    >
                                                        Continue Booking
                                                    </button>
                                                    <button 
                                                        className="back-btn" 
                                                        onClick={() => setConsultationType(null)}
                                                    >
                                                        Change Consultation Type
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    )}
                    {filteredDoctors.length > 0 && (
                        <div className="pagination">
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button 
                                className="btn btn-secondary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add this just before the closing div of return statement */}
            {showProfile && (
                <ViewProfile 
                    doctor={showProfile} 
                    onClose={() => setShowProfile(null)}
                />
            )}
        </div>
    );
};


export default DoctorsCards;
