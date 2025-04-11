import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Location.css';

const Location = () => {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState(['Hyderabad']); // Array to store multiple locations
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/events', { state: { locations } });
  };

  const handlePrev = () => {
    navigate('/interests');
  };

  const handleSkip = () => {
    navigate('/events', { state: { locations: ['Hyderabad'] } });
  };

  const handleAddLocation = () => {
    if (location.trim() && !locations.includes(location.trim())) {
      setLocations([...locations, location.trim()]);
      setLocation(''); // Clear input after adding
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setLocations(locations.filter(loc => loc !== locationToRemove));
  };

  return (
    <div className="page-container">
      <div className="left-section">
        <div className="stepper-wrapper">
          <div className="stepper-line"></div>
          <div className="step-circle done"></div>
          <div className="step-circle current"></div>
        </div>
        <div className="text-content">
          <p className="step-text">Tell us</p>
          <h2 className="main-question dimmed">
            What Are Your <br /> Interests?
          </h2>
          <p className="next-step highlighted main-question">What is your preferred location?</p>
        </div>
      </div>

      <div className="right-section">
        <div className="location-card">
          <p className="location-label">Looking for an event in</p>
          <div className="location-box">
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="location-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddLocation();
                  e.preventDefault();
                }
              }}
            />
          </div>
          <button className="add-location-btn" onClick={handleAddLocation}>+ Add location</button>
          
          <div className="locations-list">
            {locations.map((loc, index) => (
              <div key={index} className="location-item">
                <span>{loc}</span>
                <button 
                  className="remove-location-btn"
                  onClick={() => handleRemoveLocation(loc)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <button className="skip-btn" onClick={handleSkip}>Skip</button>
        <div className="footer-btns">
          <button className="back-btn" onClick={handlePrev}>←Back</button>
          <button className="next-btn" onClick={handleNext}>Finish✔</button>
        </div>
      </div>
    </div>
  );
};

export default Location;
