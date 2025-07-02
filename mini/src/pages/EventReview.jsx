import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './EventReview.css';

const EventReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        startTime: '',
        duration: '',
        price: '',
        totalTickets: '',
        image: null,
        previewImage: null
    });
    const [publishSchedule, setPublishSchedule] = useState(false);
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state?.eventData) {
            setEventData(location.state.eventData);
        } else {
            // Try to load from localStorage if no state
            const savedDraft = localStorage.getItem('eventDraft');
            if (savedDraft) {
                setEventData(JSON.parse(savedDraft));
            } else {
                // If no data found, redirect back to create event
                navigate('/create-event');
            }
        }
    }, [location.state, navigate]);

    const handleBack = () => {
        // Save current state before going back
        localStorage.setItem('eventDraft', JSON.stringify(eventData));
        navigate('/create-event');
    };

    const handleSaveDraft = () => {
        try {
            // Save form data without the image
            const draftData = {
                ...eventData,
                previewImage: null
            };
            localStorage.setItem('eventDraft', JSON.stringify(draftData));
            alert('Draft saved successfully!');
        } catch (error) {
            console.error('Error saving draft:', error);
            alert('Failed to save draft. Please try again.');
        }
    };

    const handlePublish = () => {
        try {
            // Prepare event data
            const newEvent = {
                id: `event-${Date.now()}`, // Generate a unique ID
                title: eventData.title,
                description: eventData.description,
                date: eventData.date,
                startTime: eventData.startTime,
                duration: eventData.duration,
                location: eventData.location,
                price: parseFloat(eventData.price),
                maxTickets: parseInt(eventData.totalTickets),
                category: eventData.category,
                heroImage: eventData.previewImage,
                images: [eventData.previewImage],
                ticketTypes: [
                    { id: 'regular', name: 'Regular Entry', price: parseFloat(eventData.price) },
                    { id: 'vip', name: 'VIP Experience', price: parseFloat(eventData.price) * 2 },
                    { id: 'backstage', name: 'Backstage Pass', price: parseFloat(eventData.price) * 3 }
                ],
                status: 'upcoming',
                createdAt: new Date().toISOString()
            };

            // Save to localStorage
            const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
            
            // Add new event
            existingEvents.push(newEvent);
            
            // Save back to localStorage
            localStorage.setItem('events', JSON.stringify(existingEvents));

            // Clear the draft
            localStorage.removeItem('eventDraft');

            // Navigate to event details page
            navigate(`/event/${newEvent.id}`);
        } catch (error) {
            console.error('Error publishing event:', error);
            setError('Failed to publish event. Please try again.');
        }
    };

    // Handle browser back button
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            try {
                // Save current state without image
                const dataToSave = {
                    ...eventData,
                    previewImage: null
                };
                localStorage.setItem('eventDraft', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('Error saving draft:', error);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [eventData]);

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
        <>
            <Header />
            <div className="event-review-page">
                <div className="review-header">
                    <button className="back-button" onClick={handleBack}>
                        <span className="back-arrow">←</span> Event Information
                    </button>
                    <div className="new-event-tag">New event</div>
                </div>

                <div className="review-content">
                    <div className="review-sidebar">
                        <div className="last-update">
                            <h3>Last update</h3>
                            <p>{new Date().toLocaleString()}</p>
                        </div>
                        <div className="status-section">
                            <h3>Status</h3>
                            <p className="draft-status">Draft</p>
                        </div>
                        <div className="event-nav">
                            <h3>EVENT INFORMATION</h3>
                            <ul>
                                <li className="completed">Upload cover</li>
                                <li className="completed">General information</li>
                                <li className="completed">Location and time</li>
                                <li className="completed">Ticket</li>
                            </ul>
                        </div>
                        <div className="publish-section">
                            <h3>PUBLISH EVENT</h3>
                            <button className="review-publish-btn" onClick={handlePublish}>Review and Publish</button>
                        </div>
                    </div>

                    <div className="review-main">
                        <h2>Review</h2>
                        <div className="event-preview">
                            {eventData.previewImage && (
                                <div className="preview-image">
                                    <img src={eventData.previewImage} alt="Event cover" />
                                    <button className="favorite-btn">♡</button>
                                </div>
                            )}
                            <div className="preview-details">
                                <div className="price-tag">From ₹{eventData.price || '0'}</div>
                                <h1>{eventData.title || 'Event Title'}</h1>
                                <div className="event-meta">
                                    <div className="event-time">
                                        <span className="calendar-icon">📅</span>
                                        {formatDate(eventData.date)} | {formatTime(eventData.startTime)}
                                    </div>
                                    <div className="event-location">
                                        {eventData.location || 'Location TBD'}
                                    </div>
                                    <div className="event-category">
                                        <span className="category-icon">🏷️</span>
                                        {eventData.category || 'Category TBD'}
                                    </div>
                                    <div className="event-quantity">
                                        <span className="ticket-icon">🎟️</span>
                                        {eventData.totalTickets || '0'} tickets available
                                    </div>
                                </div>
                                <div className="event-description">
                                    <p>{eventData.description || 'No description provided'}</p>
                                </div>
                                <div className="event-duration">
                                    <h3>Event Duration</h3>
                                    <p>Duration: {eventData.duration} hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="publish-schedule">
                            <div className="schedule-header">
                                <h3>Publish schedule</h3>
                                <label className="switch">
                                    <input 
                                        type="checkbox"
                                        checked={publishSchedule}
                                        onChange={(e) => setPublishSchedule(e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <p className="schedule-desc">Set the publishing time to ensure that your event appears on the website at the designated time</p>
                            
                            {publishSchedule && (
                                <div className="schedule-inputs">
                                    <div className="date-input">
                                        <label>Publish Date</label>
                                        <input 
                                            type="date" 
                                            value={publishDate}
                                            onChange={(e) => setPublishDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="time-input">
                                        <label>Publish Time</label>
                                        <input 
                                            type="time" 
                                            value={publishTime}
                                            onChange={(e) => setPublishTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="review-actions">
                    <div className="actions-container">
                        <button className="save-draft-btn" onClick={handleSaveDraft}>
                            Save draft
                        </button>
                        <button className="publish-btn" onClick={handlePublish}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventReview; 