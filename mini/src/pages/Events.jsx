import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Events.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import highlight images
import artImg from '../Images/art.jpg';

const Events = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedLocations = location.state?.locations || ['Hyderabad'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        { name: 'All', icon: '🎭' },
        { name: 'Music', icon: '🎵' },
        { name: 'Party', icon: '🎉' },
        { name: 'Business', icon: '💼' },
        { name: 'Dance', icon: '💃' },
        { name: 'Stand-up Comedy', icon: '🎤' }
    ];

    const handleSearchClick = () => {
        navigate('/search', { state: { searchTerm } });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate('/search', { state: { searchTerm: searchTerm.trim() } });
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate('/search', { state: { category: category } });
    };

    // Sample upcoming events data
    const upcomingEvents = [
        {
            id: 1,
            title: "Urban Jungle Marathon",
            date: "Monday, June 05",
            time: "06:00 AM",
            location: "Hyderabad",
            price: "From ₹4500",
            imageClass: "marathon",
            link: "/event/urban-jungle-marathon"
        },
        {
            id: 2,
            title: "Rockin' the Stage",
            date: "Monday, March 14",
            time: "04:00 PM",
            location: "Hyderabad",
            price: "From ₹6500",
            imageClass: "rock-festival",
            link: "/event/rockin-stage"
        },
        {
            id: 3,
            title: "Melody Mania",
            date: "Wednesday, June 24",
            time: "07:00 PM",
            location: "Hyderabad",
            price: "Free ticket",
            imageClass: "melody-mania",
            link: "/event/melody-mania"
        }
    ];

    // Sample upcoming in 24h events
    const upcomingIn24h = [
        {
            id: 1,
            title: "Musical Fusion Festival",
            date: "Monday, June 06",
            time: "06:00 AM",
            location: "Madhapur, Hyderabad",
            price: "From ₹6000",
            imageClass: "musical-fusion",
            tag: "20% OFF",
            link: "/event/musical-fusion"
        },
        {
            id: 2,
            title: "Metropolis Marathon",
            date: "Tuesday, June 7",
            time: "04:00 PM",
            location: "Hyderabad",
            price: "From ₹500",
            imageClass: "metropolis-marathon",
            tag: "Buy 2 get 1 free",
            link: "/event/metropolis-marathon"
        }
    ];

    return (
        <>
            <Header />
            <div className="events-container">
                <header className="events-header">
                    <h1>Discover Unforgettable Experience at</h1>
                    <h2 className="highlight">Spectacular Events</h2>
                    <div className="search-container">
                        <form onSubmit={handleSearchSubmit}>
                            <input 
                                type="search" 
                                placeholder="Search events, artists, or venues" 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                </header>

                <div className="section-container">
                    <div className="category-icons">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div className="icon">{category.icon}</div>
                                <span>{category.name}</span>
                            </div>
                        ))}
                    </div>

                    <h1 className="events-heading">
                        New events in <span className="location-text">{selectedLocations[0]}</span>
                        {selectedLocations.length > 1 && (
                            <span className="additional-locations">
                                +{selectedLocations.length - 1} more
                            </span>
                        )}
                    </h1>

                    {/* Regular Events Grid */}
                    <div className="events-grid">
                        {upcomingEvents.map(event => (
                            <Link to={event.link} className="event-card" key={event.id}>
                                <div className={`event-image ${event.imageClass}`}>
                                    <div className="event-price">{event.price}</div>
                                </div>
                                <div className="event-details">
                                    <h4>{event.title}</h4>
                                    <div className="event-info">
                                        <div className="event-datetime">
                                            <i className="calendar-icon">📅</i>
                                            {event.date} | {event.time}
                                        </div>
                                        <div className="event-location">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Upcoming in 24h Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h3>Upcoming in <span className="highlight-time">24h</span></h3>
                        <button className="view-more-link" onClick={() => navigate('/search')}>View more</button>
                    </div>
                    <div className="events-grid">
                        {upcomingIn24h.map(event => (
                            <Link to={event.link} className="event-card" key={event.id}>
                                <div className={`event-image ${event.imageClass}`}>
                                    <div className="event-tag">{event.tag}</div>
                                    <div className="event-price">{event.price}</div>
                                </div>
                                <div className="event-details">
                                    <h4>{event.title}</h4>
                                    <div className="event-info">
                                        <div className="event-datetime">
                                            <i className="calendar-icon">📅</i>
                                            {event.date} | {event.time}
                                        </div>
                                        <div className="event-location">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Highlights Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h3>Highlights of <span className="highlight-time">this week</span></h3>
                        <button className="view-more-link" onClick={() => navigate('/search')}>View more</button>
                    </div>
                    <div className="highlights-grid">
                        <Link to="/event/brushstrokes-beyond" className="highlight-card">
                            <img src={artImg} alt="Brushstrokes & Beyond" className="highlight-image" />
                            <div className="highlight-content">
                                <span className="highlight-tag">Open today</span>
                                <h3 className="highlight-title">Brushstrokes & Beyond: An Oil Painting Odyssey</h3>
                                <div className="highlight-details">
                                    <span>Saturday, April 15 | 10:00 AM</span>
                                    <span>Hyderabad</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Events;