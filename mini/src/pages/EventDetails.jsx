import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { eventData, getAllEvents } from '../data/events';
import './EventDetails.css';

// Import images
import marathonImg from '../Images/marathon.jpg';
import rockImg from '../Images/rock.jpg';
import melodyImg from '../Images/melody.jpg';
import fusionImg from '../Images/fusion.jpg';
import metropolisImg from '../Images/metropolis.jpg';
import rockFestImg from '../Images/rock-fest.jpg';
import rockIconsImg from '../Images/rock-icons.jpg';
import rockRevoltImg from '../Images/rock-revolt.jpg';
import classicRockImg from '../Images/classic-rock.jpg';
import album1 from '../Images/album/album1.jpg';
import album2 from '../Images/album/album2.jpg';
import album3 from '../Images/album/album3.jpg';
import album4 from '../Images/album/album4.jpg';
import album5 from '../Images/album/album5.jpg';
import album6 from '../Images/album/album6.jpeg';
import album7 from '../Images/album/album7.jpeg';
import album8 from '../Images/album/album8.jpeg';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                setIsLoading(true);
                console.log('Fetching event with ID:', id);

                // First try to get from backend
                try {
                    const response = await axios.get(`${API_URL}/api/events/${id}`);
                    console.log('API Response:', response.data);
                    
                    if (response.data && response.data._id) {
                        console.log('Event found in backend:', response.data);
                        setEvent(response.data);
                        return;
                    }
                } catch (error) {
                    console.log('Event not found in backend, checking other sources');
                }

                // If not found in backend, check localStorage
                const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                const localEvent = savedEvents.find(e => e._id === id || e.id === id);
                
                if (localEvent) {
                    console.log('Event found in local storage:', localEvent);
                    setEvent(localEvent);
                    return;
                }

                // Check predefined events
                const predefinedEvent = eventData[id];
                if (predefinedEvent) {
                    console.log('Event found in predefined events:', predefinedEvent);
                    setEvent(predefinedEvent);
                    return;
                }

                // Try to get from getAllEvents
                const allEvents = await getAllEvents();
                const event = allEvents[id];
                if (event) {
                    console.log('Event found in all events:', event);
                    setEvent(event);
                    return;
                }

                // If event is not found anywhere
                console.log('Event not found anywhere');
                setError('Event not found');
            } catch (error) {
                console.error('Error loading event:', error);
                setError('Failed to load event details');
            } finally {
                setIsLoading(false);
            }
        };
        loadEvent();
    }, [id]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="loading">Loading event details...</div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="error-message">{error}</div>
                <Footer />
            </>
        );
    }

    if (!event) {
        return (
            <>
                <Header />
                <div className="event-not-found">
                    <h2>Event not found</h2>
                    <button onClick={() => navigate('/events')}>Back to Events</button>
                </div>
                <Footer />
            </>
        );
    }

    const handlePurchaseTickets = () => {
        try {
            // Prepare ticket data
            const ticketData = {
                eventId: event._id || event.id,
                eventTitle: event.title,
                eventDate: event.date,
                eventTime: event.startTime,
                eventLocation: event.location,
                eventImage: event.heroImage || event.image,
                ticketTypes: event.ticketTypes || [
                    { id: 'regular', name: 'Regular Entry', price: parseFloat(event.price) }
                ],
                maxTickets: event.maxTickets || 4,
                price: parseFloat(event.price)
            };

            // Navigate to the existing purchase ticket page
            navigate(`/event/${event._id || event.id}/purchase`, { 
                state: { 
                    ticketData,
                    event
                }
            });
        } catch (error) {
            console.error('Error navigating to purchase page:', error);
        }
    };

    const getEventAlbumImages = (eventId) => {
        // For user-created events, use a default set of images
        if (eventId.startsWith('event-')) {
            return [
                { img: album1, caption: "Event Preview" },
                { img: album2, caption: "Event Setup" },
                { img: album3, caption: "Event Venue" },
                { img: album4, caption: "Event Atmosphere" },
                { img: album5, caption: "Event Highlights" }
            ];
        }

        // Original logic for predefined events
        const allImages = [
            { img: album1, caption: "Main Stage" },
            { img: album2, caption: "Crowd Moments" },
            { img: album3, caption: "Light Show" },
            { img: album4, caption: "Performances" },
            { img: album5, caption: "Backstage" },
            { img: album6, caption: "Fan Zone" },
            { img: album7, caption: "Evening Vibes" },
            { img: album8, caption: "Closing Moments" }
        ];

        let eventNumber;
        try {
            const matches = eventId.match(/\d+/);
            eventNumber = matches ? parseInt(matches[0]) : 0;
        } catch (error) {
            eventNumber = 0;
        }

        let selectedImages = [];
        const totalImages = allImages.length;
        const startIdx = eventNumber % totalImages;
        
        for (let i = 0; i < 5; i++) {
            const index = (startIdx + i) % totalImages;
            selectedImages.push(allImages[index]);
        }

        return selectedImages;
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= event.maxTickets) {
            setQuantity(newQuantity);
        }
    };

    const getSimilarEvents = () => {
        // Get both predefined and user-created events
        const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        const allEvents = { ...eventData, ...Object.fromEntries(savedEvents.map(e => [e.id, e])) };
        
        return Object.entries(allEvents)
            .filter(([eventId, eventData]) => 
                eventId !== id && 
                eventData.category === event.category
            )
            .slice(0, 3)
            .map(([eventId, eventData]) => ({
                id: eventId,
                ...eventData
            }));
    };

    const similarEvents = getSimilarEvents();
    const eventAlbumImages = getEventAlbumImages(id);

    const handleShare = async () => {
        const eventUrl = window.location.href;
        const eventTitle = event.title;
        const shareData = {
            title: eventTitle,
            text: `Check out this event: ${eventTitle}`,
            url: eventUrl
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                await navigator.clipboard.writeText(eventUrl);
                alert('Event link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="event-details-page">
                <div 
                    className="event-hero"
                    style={{ backgroundImage: `url(${event.heroImage || event.image})` }}
                >
                    <div className="hero-content">
                        <p className="event-date">{event.date}</p>
                        <h1 className="event-title">{event.title}</h1>
                        <p className="event-description">{event.description}</p>
                        <div className="hero-actions">
                            <button 
                                className="hero-btn primary-btn" 
                                onClick={handlePurchaseTickets}
                            >
                                Purchase Tickets
                            </button>
                            <button className="hero-btn secondary-btn" onClick={handleShare}>
                                Share Event
                            </button>
                        </div>
                    </div>
                </div>

                <div className="event-content">
                    <div className="event-info">
                        <h2 className="section-title">Event Details</h2>
                        <div className="event-details-list">
                            <div className="detail-item">
                                <span className="detail-icon">📅</span>
                                <div className="detail-content">
                                    <h4>Date & Time</h4>
                                    <p>{event.date} | {event.startTime}</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">📍</span>
                                <div className="detail-content">
                                    <h4>Location</h4>
                                    <p>{event.location}</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">⏱️</span>
                                <div className="detail-content">
                                    <h4>Duration</h4>
                                    <p>{event.duration}</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">🎵</span>
                                <div className="detail-content">
                                    <h4>Category</h4>
                                    <p>{event.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="event-album-section">
                            <h2 className="section-title">Event Preview</h2>
                            <div className="album-grid">
                                {eventAlbumImages.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className={`album-item ${index === 0 ? 'large' : ''}`}
                                        style={{ backgroundImage: `url(${image.img})` }}
                                    >
                                        <div className="album-overlay">
                                            <span>{image.caption}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="ticket-sidebar">
                        <div className="ticket-info">
                            <div className="price-info">
                                <span className="price-label">Price:</span>
                                <span className="price-amount">₹{event.price}</span>
                            </div>

                            <div className="quantity-section">
                                <div className="quantity-selector">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= event.maxTickets}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="max-tickets">Maximum {event.maxTickets} tickets per order</p>
                            </div>

                            <button 
                                className="purchase-btn"
                                onClick={() => navigate(`/event/${id}/purchase`)}
                            >
                                Purchase Tickets
                            </button>
                        </div>
                    </div>
                </div>

                <div className="similar-events">
                    <div className="similar-events-header">
                        <h2 className="section-title">Similar Events</h2>
                        <button className="view-more-btn">View More</button>
                    </div>
                    <div className="similar-events-grid">
                        {similarEvents.map(similarEvent => (
                            <div 
                                key={similarEvent.id}
                                className="similar-event-card"
                                onClick={() => navigate(`/event/${similarEvent.id}`)}
                            >
                                <div 
                                    className="similar-event-image"
                                    style={{ backgroundImage: `url(${similarEvent.heroImage})` }}
                                />
                                <div className="similar-event-info">
                                    <h3 className="similar-event-title">{similarEvent.title}</h3>
                                    <p className="similar-event-date">{similarEvent.date} | {similarEvent.startTime}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventDetails; 