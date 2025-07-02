import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CreateEvent.css';
import API_URL from '../config/api';

const CreateEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        duration: '',
        location: '',
        price: '',
        totalTickets: '',
        category: '',
        images: []
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Load draft data if exists
    useEffect(() => {
        const savedDraft = localStorage.getItem('eventDraft');
        if (savedDraft) {
            const draftData = JSON.parse(savedDraft);
            setFormData(draftData);
            if (draftData.images && draftData.images.length > 0) {
                setPreviewImages(draftData.images);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setLoading(true);
            try {
                const formData = new FormData();
                files.forEach(file => {
                    formData.append('images', file);
                });

                // Get the token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Please log in to upload images');
                }

                const response = await axios.post(`${API_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const newImages = response.data.urls;
                setPreviewImages(prev => [...prev, ...newImages]);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...newImages]
                }));
            } catch (err) {
                setError(err.message || 'Failed to upload images. Please try again.');
                console.error('Image upload error:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSaveDraft = () => {
        try {
            const draftData = {
                ...formData,
                images: previewImages
            };
            localStorage.setItem('eventDraft', JSON.stringify(draftData));
            alert('Draft saved successfully!');
        } catch (error) {
            console.error('Error saving draft:', error);
            alert('Failed to save draft. Please try again.');
        }
    };

    const validateForm = () => {
        const errors = [];

        // Check required fields
        if (!formData.title.trim()) errors.push('Event title is required');
        if (!formData.description.trim()) errors.push('Event description is required');
        if (!formData.date) errors.push('Event date is required');
        if (!formData.startTime) errors.push('Start time is required');
        if (!formData.duration) errors.push('Duration is required');
        if (!formData.location.trim()) errors.push('Location is required');
        if (!formData.price) errors.push('Price is required');
        if (!formData.totalTickets) errors.push('Total tickets is required');
        if (!formData.category) errors.push('Category is required');
        if (previewImages.length === 0) errors.push('At least one event image is required');

        // Validate date and time
        const eventDate = new Date(formData.date);
        const now = new Date();
        if (eventDate < now) errors.push('Event date must be in the future');

        // Validate numbers
        if (formData.duration <= 0) errors.push('Duration must be greater than 0');
        if (formData.price < 0) errors.push('Price cannot be negative');
        if (formData.totalTickets <= 0) errors.push('Total tickets must be greater than 0');

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form
            const validationErrors = validateForm();
            if (validationErrors.length > 0) {
                setError(validationErrors.join(', '));
                setLoading(false);
                return;
            }

            // Create the event object
            const eventData = {
                ...formData,
                images: previewImages
            };

            // Navigate to review page with form data
            navigate('/create-event/review', { 
                state: { eventData }
            });
        } catch (err) {
            setError(err.message || 'Failed to proceed to review');
        } finally {
            setLoading(false);
        }
    };

    // Handle browser back button
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            try {
                // Save current form state without image
                const dataToSave = {
                    ...formData,
                    images: previewImages
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
    }, [formData, previewImages]);

    return (
        <>
            <Header />
            <div className="create-event-page">
                <div className="create-event-container">
                    <h1>Create New Event</h1>
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="create-event-form">
                        <div className="form-group">
                            <label>Event Images</label>
                            <div className="upload-container">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                                <div 
                                    className="upload-area"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {previewImages.length > 0 ? (
                                        <div className="image-grid">
                                            {previewImages.map((image, index) => (
                                                <div key={index} className="image-preview-container">
                                                    <img 
                                                        src={image} 
                                                        alt={`Preview ${index + 1}`} 
                                                        className="preview-image"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="remove-image"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <div className="upload-icon">📷</div>
                                            <div>Click to upload images</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Event Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter event title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter event description"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startTime">Start Time</label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="duration">Duration (hours)</label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter event location"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">Ticket Price (₹)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalTickets">Total Tickets</label>
                                <input
                                    type="number"
                                    id="totalTickets"
                                    name="totalTickets"
                                    value={formData.totalTickets}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Music">Music</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts">Arts</option>
                                <option value="Food">Food</option>
                                <option value="Business">Business</option>
                                <option value="Technology">Technology</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="save-draft-btn"
                                onClick={handleSaveDraft}
                            >
                                Save Draft
                            </button>
                            <button 
                                type="submit" 
                                className="create-event-btn"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateEvent; 