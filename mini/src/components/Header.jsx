import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Images/Logo.jpg';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }

        // Listen for changes in localStorage
        const handleStorageChange = () => {
            const updatedUserData = JSON.parse(localStorage.getItem('user'));
            setUser(updatedUserData);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        // Clear all user-related data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('purchasedTickets');
        localStorage.removeItem('events');
        
        // Clear any other relevant data
        localStorage.removeItem('selectedEvent');
        localStorage.removeItem('eventDraft');
        
        // Close the dropdown
        setShowDropdown(false);
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="nav-header">
            <div className="nav-left">
                <img src={Logo} alt="BASC Logo" className="nav-logo" onClick={() => navigate('/')} />
                <div className="nav-links">
                    <Link 
                        to="/events" 
                        className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
                    >
                        Explore
                    </Link>
                    <Link 
                        to="/upcoming-events" 
                        className={`nav-link ${location.pathname === '/upcoming-events' ? 'active' : ''}`}
                    >
                        Upcoming Events
                    </Link>
                    <Link 
                        to="/my-tickets" 
                        className={`nav-link ${location.pathname === '/my-tickets' ? 'active' : ''}`}
                    >
                        My Tickets
                    </Link>
                    <Link 
                        to="/profile" 
                        className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    >
                        Profile
                    </Link>
                </div>
            </div>
            <div className="nav-right">
                <button className="create-event-btn" onClick={() => navigate('/create-event')}>
                    <span className="plus-icon">+</span>
                    Create event
                </button>
                <div 
                    className="notification-icon"
                    onClick={() => navigate('/dashboard')}
                >
                    <span className="notification-bell">🔔</span>
                </div>
                <div 
                    className="profile-section" 
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img 
                        src={user?.profileImage || require("../Images/person.png")} 
                        alt="Profile" 
                        className="profile-img" 
                        onError={(e) => {
                            e.target.src = require("../Images/person.png");
                        }}
                    />
                    <span className="profile-name">{user?.name || 'Guest'}</span>
                    <span className="dropdown-arrow">▼</span>
                    
                    {showDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">
                                <img 
                                    src={user?.profileImage || require("../Images/person.png")} 
                                    alt="Profile" 
                                    className="dropdown-profile-img"
                                    onError={(e) => {
                                        e.target.src = require("../Images/person.png");
                                    }}
                                />
                                <div className="dropdown-user-info">
                                    <span className="dropdown-name">{user?.name || 'Guest'}</span>
                                    <span className="dropdown-email">{user?.email || ''}</span>
                                </div>
                            </div>
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">
                                    My Profile
                                </Link>
                                <Link to="/my-tickets" className="dropdown-item">
                                    My Tickets
                                </Link>
                                <div 
                                    className="dropdown-item"
                                    onClick={() => alert("Not added for a reason, FOOL😜")}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Settings
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header; 