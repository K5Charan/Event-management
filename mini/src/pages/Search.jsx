import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Search.css';

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
import passionImg from '../Images/passion.jpg';
import businessImg from '../Images/business.jpeg';
import comedyImg from '../Images/comedy.jpeg';
import danceImg from '../Images/dance.jpeg';
import partyImg from '../Images/party.jpeg';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
    const [selectedCategories, setSelectedCategories] = useState(location.state?.category ? [location.state.category] : []);
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [locationTerm, setLocationTerm] = useState('Hyderabad');

    useEffect(() => {
        if (location.state?.searchTerm) {
            setSearchTerm(location.state.searchTerm);
        }
        if (location.state?.category) {
            setSelectedCategories(location.state.category === 'All' ? [] : [location.state.category]);
        }
    }, [location.state]);

    const eventData = {
        'urban-jungle-marathon': {
            title: 'Urban Jungle Marathon',
            date: 'JUNE 05',
            startTime: '06:00 AM',
            location: 'Hyderabad',
            price: 4500,
            maxTickets: 4,
            category: 'Sports',
            image: marathonImg
        },
        'rockin-stage': {
            title: 'Rockin\' the Stage',
            date: 'MARCH 14',
            startTime: '04:00 PM',
            location: 'Hyderabad',
            price: 6500,
            maxTickets: 4,
            category: 'Music',
            image: rockImg
        },
        'melody-mania': {
            title: 'Melody Mania',
            date: 'JUNE 24',
            startTime: '07:00 PM',
            location: 'Hyderabad',
            price: 0,
            maxTickets: 2,
            category: 'Music',
            image: melodyImg
        },
        'musical-fusion': {
            title: 'Musical Fusion Festival',
            date: 'JUNE 05',
            startTime: '06:00 PM',
            location: 'Madhapur, Hyderabad',
            price: 1500,
            maxTickets: 6,
            category: 'Music',
            image: fusionImg
        },
        'metropolis-marathon': {
            title: 'Metropolis Marathon',
            date: 'JUNE 07',
            startTime: '06:00 AM',
            location: 'Hi-Tech city, Hyderabad',
            price: 500,
            maxTickets: 8,
            category: 'Sports',
            image: metropolisImg
        },
        'rock-fest': {
            title: 'Rock Fest',
            date: 'JULY 15',
            startTime: '05:00 PM',
            location: 'Hyderabad',
            price: 3500,
            maxTickets: 4,
            category: 'Music',
            image: rockFestImg
        },
        'rock-icons': {
            title: 'Rock Icons',
            date: 'AUGUST 22',
            startTime: '06:00 PM',
            location: 'Hyderabad',
            price: 4000,
            maxTickets: 4,
            category: 'Music',
            image: rockIconsImg
        },
        'rock-revolt': {
            title: 'Rock Revolt',
            date: 'SEPTEMBER 10',
            startTime: '07:00 PM',
            location: 'Hyderabad',
            price: 3000,
            maxTickets: 4,
            category: 'Dance',
            image: rockRevoltImg
        },
        'classic-rock': {
            title: 'Classic Rock Night',
            date: 'OCTOBER 05',
            startTime: '08:00 PM',
            location: 'Hyderabad',
            price: 2500,
            maxTickets: 4,
            category: 'Music',
            image: classicRockImg
        },
        'business-summit': {
            title: 'Global Business Summit 2024',
            date: 'JULY 20',
            startTime: '09:00 AM',
            location: 'HICC, Hyderabad',
            price: 7500,
            maxTickets: 2,
            category: 'Business',
            image: businessImg
        },
        'comedy-night': {
            title: 'Laugh Out Loud Comedy Night',
            date: 'JUNE 15',
            startTime: '08:00 PM',
            location: 'Shilpakala Vedika, Hyderabad',
            price: 999,
            maxTickets: 4,
            category: 'Stand-up Comedy',
            image: comedyImg
        },
        'dance-fusion': {
            title: 'Rhythmic Fusion Dance Festival',
            date: 'AUGUST 05',
            startTime: '06:30 PM',
            location: 'Ravindra Bharathi, Hyderabad',
            price: 1200,
            maxTickets: 3,
            category: 'Dance',
            image: danceImg
        },
        'passion-power': {
            title: 'Passion Power: Dance & Motivation',
            date: 'JULY 30',
            startTime: '10:00 AM',
            location: 'JRC Convention, Hyderabad',
            price: 2500,
            maxTickets: 2,
            category: 'Music',
            image: passionImg
        },
        'neon-nights': {
            title: 'Neon Nights: Summer Beach Party',
            date: 'JUNE 25',
            startTime: '08:00 PM',
            location: 'Novotel HICC, Hyderabad',
            price: 1500,
            maxTickets: 6,
            category: 'Party',
            image: partyImg
        }
    };

    const categories = ['All', 'Music', 'Sports', 'Stand-up Comedy', 'Business', 'Dance', 'Party'];

    const handleSearch = (e) => {
        e.preventDefault();
        // The filtering is now handled by the filteredEvents variable
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (category === 'All') {
                return prev.length === categories.length ? [] : categories;
            }
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            }
            return [...prev, category];
        });
    };

    const filteredEvents = Object.entries(eventData).filter(([_, event]) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        return matchesSearch && matchesCategory;
    });

    const recommendedEvents = Object.entries(eventData)
        .filter(([id, event]) => event.category === 'Music')
        .slice(0, 2);

    return (
        <>
            <Header />
            <div className="search-page">
                <div className="search-header">
                    <h1 className="search-title">Search Event</h1>
                    <button className="back-to-events" onClick={() => navigate('/events')}>
                        ← Back to Events
                    </button>
                </div>
                
                <div className="search-container">
                    <form className="search-input-container" onSubmit={handleSearch}>
                        <div className="input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search events"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="input-wrapper">
                            <span className="location-icon">📍</span>
                            <input 
                                type="text" 
                                placeholder="Enter location"
                                value={locationTerm}
                                onChange={(e) => setLocationTerm(e.target.value)}
                                className="location-input"
                            />
                        </div>
                        <button type="submit" className="search-button">
                            Search
                        </button>
                    </form>
                </div>

                <div className="search-content">
                    <div className="filter-section">
                        <h3>Filter</h3>
                        <div className="filter-group">
                            <h4>Category</h4>
                            {categories.map(category => (
                                <label key={category}>
                                    <input 
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    /> 
                                    {category}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Price</h4>
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={selectedPrice.includes('Free')}
                                    onChange={() => setSelectedPrice(prev => 
                                        prev.includes('Free') 
                                            ? prev.filter(p => p !== 'Free')
                                            : [...prev, 'Free']
                                    )}
                                /> 
                                Free
                            </label>
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={selectedPrice.includes('Paid')}
                                    onChange={() => setSelectedPrice(prev => 
                                        prev.includes('Paid') 
                                            ? prev.filter(p => p !== 'Paid')
                                            : [...prev, 'Paid']
                                    )}
                                /> 
                                Paid
                            </label>
                        </div>

                        <div className="filter-buttons">
                            <button 
                                className="clear-filter"
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedPrice([]);
                                    setSearchTerm('');
                                }}
                            >
                                Clear Filter
                            </button>
                            <button className="apply-filter">Apply</button>
                        </div>
                    </div>

                    <div className="events-section">
                        {filteredEvents.map(([id, event]) => (
                            <div 
                                key={id} 
                                className="event-card" 
                                onClick={() => navigate(`/event/${id}`)}
                            >
                                <div 
                                    className="event-image"
                                    style={{ backgroundImage: `url(${event.image})` }}
                                >
                                    <div className="event-category">{event.category}</div>
                                    <div className="event-price">
                                        {event.price === 0 ? 'Free' : `From ₹${event.price}`}
                                    </div>
                                </div>
                                <div className="event-info">
                                    <h3>{event.title}</h3>
                                    <p className="event-date">{event.date} | {event.startTime}</p>
                                    <p className="event-location">{event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="recommended-section">
                    <h2>Recommended for you</h2>
                    <div className="recommended-events">
                        {recommendedEvents.map(([id, event]) => (
                            <div 
                                key={id}
                                className="recommended-card" 
                                onClick={() => navigate(`/event/${id}`)}
                            >
                                <div 
                                    className="event-image"
                                    style={{ backgroundImage: `url(${event.image})` }}
                                >
                                    <div className="event-category">{event.category}</div>
                                    <div className="event-price">
                                        {event.price === 0 ? 'Free' : `From ₹${event.price}`}
                                    </div>
                                </div>
                                <div className="recommended-info">
                                    <h3>{event.title}</h3>
                                    <p className="event-date">{event.date} | {event.startTime}</p>
                                    <p className="event-location">{event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Search; 