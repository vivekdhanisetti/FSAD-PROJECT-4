import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HospitalName from './components/HospitalName';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import HospitalCards from './components/HospitalCards';
import HospitalOverview from './components/HospitalOverview';
import Review from './components/Review';
import FindDoctor from './components/FindDoctor';
import BlogsAndArticles from './components/BlogsAndArticles';
import Footer from './components/Footer';
import Locations from './components/Locations';
import LocationDetail from './components/LocationDetail'; 

const HomePage = () => (
  <>
    <div className="carousel-section">
      <Carousel />
    </div>
    <div className="main-content">
      <div className="cards-section">
        <HospitalCards />
      </div>
      <div className="overview-section">
        <HospitalOverview />
      </div>
      <Review />
      <Locations />
      <BlogsAndArticles />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="header-section">
          <div className="header-container">
            <HospitalName />
            <Login />
          </div>
          <Navigation />
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/location/:city" element={<LocationDetail />} /> {/* Add route for LocationDetail */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;