import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UpcomingEvents.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

const UpcomingEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoadErrors, setImageLoadErrors] = useState({});

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                // Get events from backend
                const response = await axios.get(`${API_URL}/api/events`);
                const backendEvents = response.data.events || [];
                console.log('Backend events:', backendEvents);

                // Get events from localStorage
                const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                const eventIdMap = JSON.parse(localStorage.getItem('eventIdMap') || '{}');
                
                // Combine all events
                const allEvents = [...backendEvents, ...savedEvents];

                // Set current date to 2024
                const now = new Date('2024-01-01');
                now.setHours(0, 0, 0, 0);
                console.log('Current date for comparison:', now.toISOString());

                const filteredEvents = allEvents
                    .filter(event => {
                        if (!event.date) {
                            console.log('Event missing date:', event);
                            return false;
                        }

                        const eventDate = new Date(event.date);
                        eventDate.setHours(0, 0, 0, 0);
                        
                        console.log(`Comparing dates for ${event.title}:`);
                        console.log('Event date:', eventDate.toISOString());
                        console.log('Current date:', now.toISOString());
                        console.log('Is event date >= now?', eventDate >= now);
                        
                        return eventDate >= now;
                    })
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                console.log('Filtered upcoming events:', filteredEvents);
                setEvents(filteredEvents);
            } catch (error) {
                console.error('Error loading events:', error);
                // Fallback to localStorage if backend fails
                const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
                setEvents(savedEvents);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
        // Set up interval to check for new events every 5 minutes
        const interval = setInterval(loadEvents, 300000);
        return () => clearInterval(interval);
    }, []);

    const handleImageError = (eventId) => {
        setImageLoadErrors(prev => ({
            ...prev,
            [eventId]: true
        }));
    };

    const getImageUrl = (event) => {
        // If there's an error loading the image, return default
        if (event.imageLoadError) {
            return '/images/default-event.jpg';
        }

        // Get image URL from either heroImage or first image in images array
        const imageUrl = event.heroImage || (event.images && event.images[0]);

        // If it's a Cloudinary or any absolute URL, use it directly
        if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }

        // If it's a base64 string, return it directly
        if (imageUrl && imageUrl.startsWith('data:image')) {
            return imageUrl;
        }

        // If it's a relative path, map it to the correct image file
        if (imageUrl) {
            const eventTitle = event.title.toLowerCase();
            const imageMap = {
                'rock concert': '/images/rock.jpg',
                'marathon': '/images/marathon.jpg',
                'music festival': '/images/music.jpg',
                'business conference': '/images/business.jpg',
                'comedy night': '/images/comedy.jpeg',
                'dance party': '/images/dance.jpeg',
                'party': '/images/party.jpeg',
                'nature walk': '/images/natu.jpeg',
                'rock revolt': '/images/rock-revolt.jpg',
                'rock fest': '/images/rock-fest.jpg',
                'rock icons': '/images/rock-icons.jpg',
                'classic rock': '/images/classic-rock.jpg',
                'fusion': '/images/fusion.jpg',
                'melody': '/images/melody.jpg'
            };

            // Try to find a matching image based on event title
            for (const [key, value] of Object.entries(imageMap)) {
                if (eventTitle.includes(key)) {
                    return value;
                }
            }

            // If no match found, try to use the image name directly
            const imageName = imageUrl.split('/').pop();
            if (imageName) {
                return `/images/${imageName}`;
            }
        }

        // Return default image if no valid image found
        return '/images/default-event.jpg';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        try {
            // Handle both "HH:MM AM/PM" and "HH:MM" formats
            if (timeString.includes('AM') || timeString.includes('PM')) {
                return timeString;
            }
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
        } catch (error) {
            console.error('Error formatting time:', timeString, error);
            return timeString;
        }
    };

    const handleEventClick = (event) => {
        // Format the event data to ensure all required fields are present
        const formattedEvent = {
            id: event._id || event.id,
            title: event.title,
            date: event.date,
            description: event.description,
            location: event.location,
            startTime: event.time || event.startTime,
            duration: event.duration || '4 hours',
            price: parseFloat(event.price),
            maxTickets: event.capacity || event.maxTickets || 4,
            category: event.category,
            coordinates: event.coordinates || { lat: 17.3850, lng: 78.4867 },
            images: event.images || [],
            heroImage: event.heroImage || event.images?.[0],
            ticketTypes: event.ticketTypes || [
                { id: 'regular', name: 'Regular Entry', price: parseFloat(event.price) }
            ],
            status: event.status || 'upcoming',
            tags: event.tags || []
        };

        navigate(`/event/${formattedEvent.id}`, { state: { event: formattedEvent } });
    };

    return (
        <div className="upcoming-events-container">
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
                                key={event._id || event.id}
                                className="event-card"
                                onClick={() => handleEventClick(event)}
                            >
                                <div className="event-image">
                                    <img 
                                        src={getImageUrl(event)}
                                        alt={event.title}
                                        onError={() => handleImageError(event._id || event.id)}
                                    />
                                </div>
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <div className="event-details">
                                        <div className="event-date">
                                            <span className="date">{formatDate(event.date)}</span>
                                            <span className="time">{formatTime(event.time || event.startTime)}</span>
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