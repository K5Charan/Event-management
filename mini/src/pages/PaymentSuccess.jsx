import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTickets } from '../context/TicketsContext';
import axios from 'axios';
import API_URL from '../config/api';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const paymentDetails = location.state?.paymentDetails;
    const { addPurchasedTicket } = useTickets();
    const [ticketAdded, setTicketAdded] = useState(false);

    useEffect(() => {
        if (paymentDetails && !ticketAdded) {
            const { 
                event,
                tickets,
                contactInfo,
                paymentMethod,
                totalAmount,
                purchaseDate,
                purchaseCode
            } = paymentDetails;

            // Save ticket to backend
            const saveTicketToBackend = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error('No token found');
                        return;
                    }

                    const ticketData = {
                        eventId: event.id,
                        quantity: tickets.length,
                        totalAmount: totalAmount,
                        purchaseDate: new Date().toISOString()
                    };

                    const response = await axios.post(`${API_URL}/tickets/purchase`, ticketData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data) {
                        console.log('Ticket saved to backend:', response.data);
                    }
                } catch (error) {
                    console.error('Error saving ticket to backend:', error);
                }
            };

            // Function to determine event type from title
            const getEventType = (eventTitle) => {
                const eventTypeMap = {
                    'Urban Jungle Marathon': 'marathon',
                    'Rockin\' the Stage': 'rock-festival',
                    'Melody Mania': 'melody-mania',
                    'Musical Fusion Festival': 'musical-fusion',
                    'Rock Fest': 'rock-music',
                    'Rock Icons': 'rock-music',
                    'Rock Revolt': 'rock-revolt',
                    'Classic Rock Night': 'rock-music',
                    'Brushstrokes & Beyond': 'art',
                    'Global Business Summit 2024': 'business',
                    'Laugh Out Loud Comedy Night': 'comedy'
                };

                if (eventTypeMap[eventTitle]) return eventTypeMap[eventTitle];

                // If no exact match, try to match by keywords
                const titleLower = eventTitle.toLowerCase();
                if (titleLower.includes('comedy')) return 'comedy';
                if (titleLower.includes('marathon')) return 'marathon';
                if (titleLower.includes('rock')) return 'rock-music';
                if (titleLower.includes('business')) return 'business';
                if (titleLower.includes('art')) return 'art';

                return 'default';
            };

            const newTicket = {
                id: Date.now(),
                title: event.title,
                date: event.date,
                time: event.startTime,
                location: event.location,
                ticketCount: tickets.length,
                amount: totalAmount,
                purchaseCode: purchaseCode,
                purchaseDate: purchaseDate,
                tickets: tickets,
                eventType: getEventType(event.title)
            };

            // Save to backend first, then add to local state
            saveTicketToBackend().then(() => {
                addPurchasedTicket(newTicket);
                setTicketAdded(true);
            });
        }
    }, [paymentDetails, addPurchasedTicket, ticketAdded]);

    if (!paymentDetails) {
        navigate('/');
        return null;
    }

    const { 
        event,
        tickets,
        contactInfo,
        paymentMethod,
        paymentInfo,
        totalAmount,
        purchaseDate,
        purchaseCode
    } = paymentDetails;

    return (
        <>
            <Header />
            <div className="payment-success-page">
                <div className="success-message">
                    <span className="success-icon">✓</span>
                    <h2>Successful payment!</h2>
                </div>

                <div className="ticket-details">
                    <h1>{event.title}</h1>
                    
                    <div className="event-info-grid">
                        <div className="info-item">
                            <span className="icon">📅</span>
                            <div className="info-content">
                                <h3>DATE AND TIME</h3>
                                <p>{event.date}<br/>{event.startTime}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="icon">⏱️</span>
                            <div className="info-content">
                                <h3>DURATION</h3>
                                <p>{event.duration} hours</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="icon">📍</span>
                            <div className="info-content">
                                <h3>PLACE</h3>
                                <p>{event.location}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="icon">🎟️</span>
                            <div className="info-content">
                                <h3>{tickets.length} TICKETS</h3>
                                <p>Email eTicket</p>
                            </div>
                        </div>
                    </div>

                    <div className="purchase-info">
                        <h3>Purchase information</h3>
                        <div className="info-grid">
                            <div className="info-row">
                                <span>Date</span>
                                <span>{purchaseDate}</span>
                            </div>
                            <div className="info-row">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className="info-row">
                                <span>Payment method</span>
                                <div className="payment-method">
                                    {paymentMethod === 'card' && <span className="card-icon">💳</span>}
                                    <span>{paymentInfo}</span>
                                </div>
                            </div>
                            <div className="ticket-code">
                                <div className="code-info">
                                    <span>Ticket Code</span>
                                    <span className="code-value">{purchaseCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info">
                        <h3>Contact information</h3>
                        <div className="info-grid">
                            <div className="info-row">
                                <span>First name</span>
                                <span>{contactInfo.firstName}</span>
                            </div>
                            <div className="info-row">
                                <span>Last name</span>
                                <span>{contactInfo.lastName}</span>
                            </div>
                            <div className="info-row">
                                <span>Email</span>
                                <span>{contactInfo.email}</span>
                            </div>
                            <div className="info-row">
                                <span>Phone number</span>
                                <span>{contactInfo.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="tickets-section">
                        <h3>Ticket ({tickets.length}) total: ₹{totalAmount}</h3>
                        <div className="ticket-card">
                            <div className="ticket-icon">🎟️</div>
                            <div className="ticket-info">
                                <div className="ticket-details">
                                    <div className="info-row">
                                        <span>First name</span>
                                        <span>{tickets[0].firstName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Last name</span>
                                        <span>{tickets[0].lastName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Email</span>
                                        <span>{tickets[0].email}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Phone number</span>
                                        <span>{tickets[0].phone}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Number of tickets</span>
                                        <span>{tickets.length}</span>
                                    </div>
                                </div>
                                <div className="ticket-code">
                                    <div className="code-info">
                                        <span>Ticket Code</span>
                                        <span className="code-value">{tickets[0].code}</span>
                                    </div>
                                    <img src={tickets[0].qrCode} alt="Ticket QR Code" className="qr-code" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="go-to-ticket-btn" onClick={() => navigate('/my-tickets')}>
                        Go to my tickets
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSuccess; 