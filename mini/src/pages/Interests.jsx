import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Interests.css';

const categories = {
        Music: ["Blues & Jazz", "Country", "EDM", "Hip Hop", "RAP", "Pop", "R&B", "Electronic", "Experimental", "Psychedelic", "Rock", "Classical", "Folk", "World Music", "Metal", "Indie"],
        Dance: ["Hip Hop", "Salsa", "Ballroom", "Sattriya", "Kathak", "Ballet", "Jazz", "Classic", "Folk", "Contemporary", "Modern", "Tap", "Street Dance", "Latin", "Swing"],
        Business: ["Trade Shows", "Product Launches", "Business Seminars", "Workshops", "Business Awards", "Investor Pitch Events", "Networking Events", "Conferences", "Leadership Summit", "Startup Meetups"],
        "StandUp Comedy": ["Stand Up", "Sketch", "Open Mic", "Parody", "Improv", "Satire", "Comedy Shows", "Comedy Festivals"],
        Sports: ["Cricket", "Football", "Basketball", "Tennis", "Swimming", "Athletics", "Volleyball", "Boxing", "Wrestling", "Marathon"],
        Art: ["Painting", "Sculpture", "Photography", "Digital Art", "Installation Art", "Performance Art", "Mixed Media", "Printmaking", "Ceramics"],
        Theatre: ["Drama", "Musical Theatre", "Opera", "Puppet Shows", "Street Theatre", "Experimental Theatre", "Classical Theatre"],
        Technology: ["Tech Conferences", "Hackathons", "Gaming Events", "AI & ML Workshops", "Web Development", "Mobile Development", "Cybersecurity", "Blockchain"],
        Food: ["Food Festivals", "Cooking Workshops", "Wine Tasting", "Food Pairing", "Culinary Tours", "Baking Classes", "International Cuisine"],
        Literature: ["Book Launches", "Poetry Readings", "Literary Festivals", "Writing Workshops", "Author Meets", "Book Clubs"]
    };
const Interests = () => {
    const [selectedInterests, setSelectedInterests] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterests = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get(
                    'http://localhost:5002/api/users/interests',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // response.data.interests is now an object: { category: [interest, ...] }
                const selected = {};
                if (response.data.interests && typeof response.data.interests === 'object') {
                    for (const [category, interestsArr] of Object.entries(response.data.interests)) {
                        // Only include categories that exist in the frontend
                        if (categories[category]) {
                            selected[category] = Array.from(new Set(interestsArr)).filter(i => categories[category].includes(i));
                        }
                    }
                }
                setSelectedInterests(selected);
            } catch (err) {
                // Optionally handle error
            }
        };
        fetchInterests();
    }, []);

    const toggleInterest = (category, interest) => {
        const updated = { ...selectedInterests };
        if (!updated[category]) {
            updated[category] = [interest];
        } else if (updated[category].includes(interest)) {
            updated[category] = updated[category].filter(i => i !== interest);
            if (updated[category].length === 0) {
                delete updated[category];
            }
        } else {
            updated[category].push(interest);
        }
        setSelectedInterests(updated);
    };

    const handleNext = async () => {
        let interestsToSave = selectedInterests;
        if (Object.keys(selectedInterests).length === 0) {
            const firstCategory = Object.keys(categories)[0];
            const firstInterest = categories[firstCategory][0];
            interestsToSave = { [firstCategory]: [firstInterest] };
            setSelectedInterests(interestsToSave);
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please log in again.');
                navigate('/login');
                return;
            }

            // Send the category-to-interests mapping to the backend
            const response = await axios.post(
                'http://localhost:5002/api/users/interests',
                { interests: interestsToSave },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Response from server:', response.data);
            // After saving, fetch the latest interests and update state before navigating
            try {
                const refreshed = await axios.get(
                    'http://localhost:5002/api/users/interests',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const selected = {};
                if (refreshed.data.interests && typeof refreshed.data.interests === 'object') {
                    for (const [category, interestsArr] of Object.entries(refreshed.data.interests)) {
                        if (categories[category]) {
                            selected[category] = Array.from(new Set(interestsArr)).filter(i => categories[category].includes(i));
                        }
                    }
                }
                setSelectedInterests(selected);
            } catch (refreshErr) {
                // Optionally handle error
            }
            navigate('/location');
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response) {
                console.error('Server responded with error:', error.response.data);
                alert(error.response.data.message || 'Something went wrong');
            } else if (error.request) {
                console.error('No response received from server');
                alert('Server did not respond. Please check backend server.');
            } else {
                console.error('Request setup error:', error.message);
                alert('Error: ' + error.message);
            }
        }
        navigate('/location');
    };

        
    return (
        <div className="interests-page">
            <div className="page-container">
                <div className="left-section">
                    <div className="stepper-wrapper">
                        <div className="stepper-line"></div>
                        <div className="step-circle active"></div>
                        <div className="step-circle upcoming"></div>
                    </div>
                    <div className="text-content">
                        <p className="step-text">Tell us</p>
                        <h2 className="main-question">
                            What Are Your <br /> Interests?
                        </h2>
                        <p className="next-step">What is your preferred location?</p>
                    </div>
                </div>

                <div className="right-section">
                    <div className="scrollable-content">
                        {Object.entries(categories).map(([category, interests]) => (
                            <div key={category} className="category-box">
                                <h3 className="category-title">{category}</h3>
                                <div className="chip-container">
                                    {interests.map((interest) => (
                                        <button
                                            key={interest}
                                            onClick={() => toggleInterest(category, interest)}
                                            className={`chip ${selectedInterests[category]?.includes(interest) ? "chip-selected" : ""}`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-bar">
                    <button className="skip-btn" onClick={() => navigate('/location')}>Skip</button>
                    <div className="footer-btns">
                        <button className="next-btn" onClick={handleNext}>Next →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interests;
