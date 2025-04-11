import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Interests.css';
import Logo from '../Images/Logo.jpg';

const Interests = () => {
    const [selectedInterests, setSelectedInterests] = useState({});
    const navigate = useNavigate();

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

    const handleNext = () => {
        if (Object.keys(selectedInterests).length === 0) {
            const firstCategory = Object.keys(categories)[0];
            const firstInterest = categories[firstCategory][0];
            setSelectedInterests({ [firstCategory]: [firstInterest] });
        }
        navigate('/location');
    };

    const handleSkip = () => {
        navigate('/location');
    };

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
