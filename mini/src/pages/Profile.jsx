import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import personImage from '../Images/person.png';
import './Profile.css';
import API_URL from '../config/api';
import { useTickets } from '../context/TicketsContext';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        location: '',
        interests: [],
        profilePicture: '',
        tickets: [],
        createdEvents: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const { purchasedTickets } = useTickets();

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.log('No token found, redirecting to login');
                navigate('/login');
                return;
            }

            const response = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data) {
                setUserData(response.data);
                // Save user data to localStorage when profile is loaded
                localStorage.setItem('user', JSON.stringify({
                    name: response.data.username || response.data.firstName + ' ' + response.data.lastName,
                    email: response.data.email,
                    profileImage: response.data.profilePicture
                }));
            } else {
                console.error('Empty response data received');
                setError('No user data received from server');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();

        // Add event listener for when the page becomes visible
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchUserProfile();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInterestsChange = (e) => {
        const interests = e.target.value.split(',').map(interest => interest.trim());
        setUserData(prev => ({
            ...prev,
            interests
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.put(`${API_URL}/users/profile`, userData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data) {
                setUserData(response.data);
                // Update localStorage with the new user data
                localStorage.setItem('user', JSON.stringify({
                    name: response.data.username,
                    email: response.data.email,
                    profileImage: response.data.profilePicture
                }));
                setSuccess('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <button 
                            className={`edit-profile-btn ${isEditing ? 'cancel' : ''}`}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className="profile-content">
                        <div className="profile-sidebar">
                            <div className="profile-picture">
                                <img 
                                    src={userData.profilePicture || personImage} 
                                    alt="Profile" 
                                    onError={(e) => {
                                        e.target.src = personImage;
                                    }}
                                />
                                {isEditing && (
                                    <button className="change-picture-btn">
                                        Change Picture
                                    </button>
                                )}
                            </div>
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-value">
                                        {purchasedTickets.reduce((total, ticket) => total + ticket.ticketCount, 0)}
                                    </span>
                                    <span className="stat-label">Tickets</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">0</span>
                                    <span className="stat-label">Events Created</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-details">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={userData.location}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Interests (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="interests"
                                        value={userData.interests.join(', ')}
                                        onChange={handleInterestsChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {isEditing && (
                                    <button type="submit" className="save-profile-btn">
                                        Save Changes
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile; 