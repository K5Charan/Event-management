import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { eventData } from '../data/events';
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

// Import album images
import album1 from '../Images/album/album1.jpg';
import album2 from '../Images/album/album2.jpg';
import album3 from '../Images/album/album3.jpg';
import album4 from '../Images/album/album4.jpg';
import album5 from '../Images/album/album5.jpg';
import album6 from '../Images/album/album6.jpeg';
import album7 from '../Images/album/album7.jpeg';
import album8 from '../Images/album/album8.jpeg';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const event = eventData[id];

    if (!event) {
        return <div>Event not found</div>;
    }

    const getEventAlbumImages = (eventId) => {
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

        // Get a number from the eventId, handling any format
        let eventNumber;
        try {
            // Try to extract a number from the eventId string
            const matches = eventId.match(/\d+/);
            eventNumber = matches ? parseInt(matches[0]) : 0;
        } catch (error) {
            // If any error occurs, default to 0
            eventNumber = 0;
        }

        // Ensure we get 5 valid images
        let selectedImages = [];
        const totalImages = allImages.length;

        // Use modulo to ensure we stay within array bounds
        const startIdx = eventNumber % totalImages;
        
        // Select 5 images, wrapping around if needed
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
        return Object.entries(eventData)
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
                    style={{ backgroundImage: `url(${event.heroImage})` }}
                >
                    <div className="hero-content">
                        <p className="event-date">{event.date}</p>
                        <h1 className="event-title">{event.title}</h1>
                        <p className="event-description">{event.description}</p>
                        <div className="hero-actions">
                            <button className="hero-btn primary-btn" onClick={() => navigate(`/event/${id}/purchase`)}>
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
                            <h2 className="section-title">Latest Event Album</h2>
                            <p className="album-description">Relive the magical moments from our last event</p>
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