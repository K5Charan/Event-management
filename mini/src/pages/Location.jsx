import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Location.css';
import API_URL from '../config/api';

const Location = () => {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState(['Hyderabad']); // Array to store multiple locations
  const navigate = useNavigate();

   const saveLocations = async (locs) => {
    try {
      const token = localStorage.getItem('token');
      // Ensure locs is always an array
      const locationsArray = Array.isArray(locs) ? locs : [locs];
      await axios.post(
        `${API_URL}/users/locations`,
        { locations: locationsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error saving locations:', error);
      // Optionally, show error UI feedback here
    }
  };

  useEffect(() => {
    // Fetch user's saved locations on mount (optional, for pre-selection)
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/users/locations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && Array.isArray(res.data.locations)) {
          setLocations(res.data.locations);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleNext = async () => {
    await saveLocations(locations);
    navigate('/events', { state: { locations } });
  };

  const handlePrev = () => {
    navigate('/interests');
  };

  const handleSkip = () => {
    navigate('/events', { state: { locations: ['Hyderabad'] } });
  };

  const handleAddLocation = async () => {
    if (location.trim() && !locations.includes(location.trim())) {
      const newLocations = [...locations, location.trim()];
      setLocations(newLocations);
      setLocation('');
      await saveLocations(newLocations); 
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
