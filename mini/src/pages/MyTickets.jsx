import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTickets } from '../context/TicketsContext';
import axios from 'axios';
import './MyTickets.css';
import comedyImg from '../Images/comedy.jpeg';
import marathonImg from '../Images/marathon.jpg';
import rockImg from '../Images/rock.jpg';
import melodyImg from '../Images/melody.jpg';
import fusionImg from '../Images/fusion.jpg';
import businessImg from '../Images/business.jpeg';
import artImg from '../Images/art.jpg';
import rockRevoltImg from '../Images/rock-revolt.jpg';
import { eventData } from '../data/events';
import API_URL from '../config/api';

const MyTickets = () => {
    const { purchasedTickets, deleteTicket } = useTickets();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

                console.log('Fetching user profile with token:', token.substring(0, 10) + '...');
                
                const response = await axios.get(`${API_URL}/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log('Profile response:', response.data);
                
                if (response.data) {
                    setUser(response.data);
                } else {
                    console.error('Empty response data received');
                    setError('No user data received from server');
                }
            } catch (error) {
                console.error('Detailed error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                
                if (error.code === 'ECONNREFUSED') {
                    setError('Cannot connect to the server. Please make sure the backend server is running on port 5002.');
                } else if (error.response?.status === 401) {
                    setError('Session expired. Please login again.');
                    navigate('/login');
                } else if (error.response?.status === 404) {
                    setError('Profile not found. Please try again later.');
                } else if (error.response?.status === 500) {
                    setError('Server error. Please try again later.');
                } else if (!error.response) {
                    setError('Network error. Please check your connection and make sure the backend server is running.');
                } else {
                    setError('Failed to load profile data. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleDeleteTicket = (purchaseCode) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            deleteTicket(purchaseCode);
        }
    };

    const filteredTickets = purchasedTickets.filter(ticket => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            ticket.title.toLowerCase().includes(searchTerm) ||
            ticket.location.toLowerCase().includes(searchTerm) ||
            ticket.date.toLowerCase().includes(searchTerm) ||
            ticket.purchaseCode.toLowerCase().includes(searchTerm)
        );
    });

    const recommendedEvents = [
        {
            id: 'rock-revolt',
            title: 'Rock Revolt Live',
            date: 'Monday, August 18',
            time: '06:00 PM',
            location: 'Jubilee Hills, Hyderabad',
            eventType: 'rock-revolt'
        },
        {
            id: 'melody-mania',
            title: 'Melody Mania 2024',
            date: 'Monday, June 05',
            time: '06:00 PM',
            location: 'Madhapur, Hyderabad',
            eventType: 'melody'
        },
        {
            id: 'business-summit',
            title: 'Business Summit 2024',
            date: 'Friday, July 20',
            time: '09:00 AM',
            location: 'HICC, Hyderabad',
            eventType: 'business'
        },
        {
            id: 'brushstrokes-beyond',
            title: 'Art Exhibition',
            date: 'Saturday, June 15',
            time: '11:00 AM',
            location: 'Hitec City, Hyderabad',
            eventType: 'art'
        }
    ];

    const getEventImage = (eventType) => {
        switch (eventType) {
            case 'comedy':
                return comedyImg;
            case 'marathon':
                return marathonImg;
            case 'rock-music':
                return rockImg;
            case 'melody':
                return melodyImg;
            case 'musical-fusion':
                return fusionImg;
            case 'business':
                return businessImg;
            case 'art':
                return artImg;
            case 'rock-revolt':
                return rockRevoltImg;
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="my-tickets-page">
                <h1>My Tickets</h1>
                
                <div className="profile-section">
                    {loading ? (
                        <div className="loading-state">Loading profile...</div>
                    ) : error ? (
                        <div className="error-state">{error}</div>
                    ) : (
                        <>
                            <div className="profile-image">
                                <img 
                                    src={user?.profilePicture || '../Images/person.png'} 
                                    alt="Profile" 
                                    onError={(e) => {
                                        e.target.src = '../Images/person.png';
                                    }}
                                />
                            </div>
                            <h2>{user?.firstName} {user?.lastName}</h2>
                            <p className="user-email">{user?.email}</p>
                            <div className="user-stats">
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
                            <button className="edit-profile-btn" onClick={() => navigate('/profile')}>
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>

                <div className="tickets-section">
                    <div className="tickets-header">
                        <div className="tabs">
                            <button className="active">
                                Tickets Purchased
                            </button>
                        </div>
                        <div className="search-box">
                            <input 
                                type="text" 
                                placeholder="       Search" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-icon"></span>
                        </div>
                    </div>

                    <div className="tickets-list">
                        {purchasedTickets.length === 0 ? (
                            <div className="no-tickets-message">
                                <p>You haven't purchased any tickets yet.</p>
                                <button 
                                    className="browse-events-btn"
                                    onClick={() => navigate('/events')}
                                >
                                    Browse Events
                                </button>
                            </div>
                        ) : filteredTickets.length === 0 ? (
                            <div className="no-tickets-message">
                                <p>No tickets found matching your search.</p>
                            </div>
                        ) : (
                            filteredTickets.map(ticket => (
                                <div key={ticket.id} className="ticket-card">
                                    <div className="ticket-header">
                                        <div className="ticket-header-info">
                                            <h3>Ticket Details</h3>
                                            <div className="purchase-info">
                                                Purchase Code: {ticket.purchaseCode}
                                                <br />
                                                Purchase Date: {ticket.purchaseDate}
                                                <br />
                                                Number of Tickets: {ticket.ticketCount}
                                            </div>
                                        </div>
                                        <button 
                                            className="delete-ticket-btn"
                                            onClick={() => handleDeleteTicket(ticket.purchaseCode)}
                                        >
                                            Delete Ticket
                                        </button>
                                    </div>
                                    <div className="ticket-main">
                                        <div className="ticket-image">
                                            <img 
                                                src={getEventImage(ticket.eventType)}
                                                alt={`${ticket.title} event`}
                                            />
                                        </div>
                                        <div className="ticket-content">
                                            <div className="ticket-info">
                                                <div className="date-time">
                                                    <h3>{ticket.date} | {ticket.time}</h3>
                                                </div>
                                                <h2 className="event-name">{ticket.title}</h2>
                                                {ticket.location && (
                                                    <div className="location">
                                                        📍 {ticket.location}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ticket-right">
                                                <div className="qr-code">
                                                    <img 
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.tickets[0].code}&format=png&margin=0`} 
                                                        alt="QR Code"
                                                    />
                                                </div>
                                                <div className="ticket-code">
                                                    <div className="code-info">
                                                        <span>Ticket Code</span>
                                                        <span className="code-value">{ticket.tickets[0].code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {recommendedEvents.length > 0 && (
                    <div className="recommended-section">
                        <div className="section-header">
                            <h2>Recommended Events</h2>
                        </div>
                        <div className="recommended-events">
                            {recommendedEvents.map(event => (
                                <div 
                                    key={event.id} 
                                    className="event-card"
                                    onClick={() => navigate(`/event/${event.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="event-image">
                                        <img 
                                            src={
                                                event.eventType === 'rock-revolt' ? rockRevoltImg :
                                                event.eventType === 'melody' ? melodyImg :
                                                event.eventType === 'business' ? businessImg :
                                                event.eventType === 'art' ? artImg :
                                                null
                                            }
                                            alt={`${event.title} event`}
                                        />
                                    </div>
                                    <div className="event-info">
                                        <div className="event-date">
                                            <span>{event.date}</span>
                                            <span>{event.time}</span>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <div className="event-location">
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyTickets; 