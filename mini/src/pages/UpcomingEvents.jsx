import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { eventData } from '../data/events';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = () => {
            try {
                // Get events from localStorage
                const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                console.log('Saved events from localStorage:', savedEvents);
                
                // Get predefined events from eventData
                const predefinedEvents = Object.entries(eventData).map(([id, event]) => ({
                    id: id,
                    ...event,
                    status: 'upcoming'
                }));
                console.log('Predefined events:', predefinedEvents);

                // Combine both sources of events
                const allEvents = [...savedEvents, ...predefinedEvents];
                console.log('All combined events:', allEvents);

                // Filter and sort events
                const now = new Date();
                const filteredEvents = allEvents.filter(event => {
                    try {
                        const eventDate = new Date(event.date);
                        console.log('Checking event:', event.title, 'Date:', eventDate);
                        return eventDate >= now;
                    } catch (error) {
                        console.error('Error processing event date:', event, error);
                        return false;
                    }
                }).sort((a, b) => new Date(a.date) - new Date(b.date));

                console.log('Filtered events:', filteredEvents);
                setEvents(filteredEvents);
            } catch (error) {
                console.error('Error loading events:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
        // Set up interval to check for new events
        const interval = setInterval(loadEvents, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    return (
        <div className="upcoming-events">
            <Header />
            <div className="events-container">
                <h1>Upcoming Events</h1>
                {loading ? (
                    <div className="loading">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="no-events">No upcoming events found.</div>
                ) : (
                    <div className="events-grid">
                        {events.map(event => (
                            <div 
                                key={event.id} 
                                className="event-card"
                                onClick={() => {
                                    console.log('Navigating to event:', event.id);
                                    navigate(`/event/${event.id}`);
                                }}
                            >
                                <div className="event-image">
                                    <img src={event.heroImage || event.image} alt={event.title} />
                                </div>
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <div className="event-details">
                                        <div className="event-date">
                                            <span className="date">{formatDate(event.date)}</span>
                                            <span className="time">{formatTime(event.startTime)}</span>
                                        </div>
                                        <div className="event-location">
                                            <span className="location">{event.location}</span>
                                        </div>
                                        <div className="event-category">
                                            <span className="category">{event.category}</span>
                                        </div>
                                        <div className="event-price">
                                            <span className="price">₹{event.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UpcomingEvents; 