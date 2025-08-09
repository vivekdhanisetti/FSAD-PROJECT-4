import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const location = useLocation();

    // Only display the footer on the home page
    if (location.pathname !== '/') {
        return null;
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className="hospital-logo">
                        <img src="/images/logo.jpg" alt="Good-Cure Hospital Logo" />
                        <div className="hospital-name">
                            <h2>GOOD-CURE</h2>
                            <p>GOOD-CURE INSTITUTES OF MEDICAL SCIENCE</p>
                            <p className="location">CHENNAI</p>
                        </div>
                    </div>
                    <p className="hospital-description">
                        GOOD-CURE Hospital is a Multi-Speciality Hospital in Chennai. As 
                        a new-age healthcare provider, GOOD-CURE Hospital will 
                        continue making a difference in everyone's life and will 
                        take the spirit of healthcare excellence well beyond 
                        business metrics.
                    </p>
                </div>

                <div className="footer-center">
                    <h3>CHITTOOR</h3>
                    <p className="metro-info">(Next to Gandhi Circle)</p>
                    <p className="address">
                        No.1, Gandhi Circle,<br />
                        Chittoor, Andhra Pradesh, India
                    </p>
                    <div className="contact-info">
                        <p>Email: <a href="mailto:enquiry@simshospitals.com">sevice@goodcurehospitals.com</a></p>
                        <p>Phone: 
                            <a href="tel:+917013580016">+91 7013580016</a>, 
                            <a href="tel:+919398706655">+91 9398706655</a>
                        </p>
                    </div>
                </div>

                <div className="footer-right">
                    <h3>Follow Us On</h3>
                    <div className="social-links">
                        <a href="#facebook" className="social-icon"><FaFacebookF /></a>
                        <a href="#instagram" className="social-icon"><FaInstagram /></a>
                        <a href="#twitter" className="social-icon"><FaTwitter /></a>
                        <a href="#linkedin" className="social-icon"><FaLinkedinIn /></a>
                        <a href="#youtube" className="social-icon"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-links">
                    <a href="#about">About Us</a><span>|</span>
                    <a href="#specialties">Specialties</a><span>|</span>
                    <a href="#services">Services</a><span>|</span>
                    <a href="#news">News</a><span>|</span>
                    <a href="#blogs">Blogs</a><span>|</span>
                    <a href="#contact">Contact Us</a><span>|</span>
                    <a href="#privacy">Privacy Policy</a><span>|</span>
                    <a href="#terms">Terms and Conditions</a><span>|</span>
                    <a href="#international">International Patients</a><span>|</span>
                    <a href="#insurance">Insurance / TPA</a><span>|</span>
                    <a href="#ambulance">Ambulance Services</a><span>|</span>
                    <a href="#daycare">Day Care Surgeries / Procedures</a><span>|</span>
                    <a href="#pharmacy">Pharmacy</a><span>|</span>
                    <a href="#bmv">BMV Data</a><span>|</span>
                    <a href="#careers">Careers @ Good-Cure Hospital</a>
                </div>
                <p className="copyright">© 2024 Good-Cure Hospital. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;