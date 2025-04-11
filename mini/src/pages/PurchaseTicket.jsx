import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { eventData } from '../data/events';
import './PurchaseTicket.css';

// Import bank logos
import hdfcLogo from '../Images/banks/hdfc.png';
import iciciLogo from '../Images/banks/icici.png';
import sbiLogo from '../Images/banks/sbi.png';
import axisLogo from '../Images/banks/axis.png';
import upiLogo from '../Images/payment/upi.png';
import cardLogo from '../Images/payment/card.png';

const PurchaseTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedTicketType, setSelectedTicketType] = useState('regular');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const event = eventData[id];

    if (!event) {
        return <div>Event not found</div>;
    }

    const ticketTypes = {
        regular: {
            name: 'Regular Ticket',
            price: event.price,
            description: 'Standard entry to the event'
        },
        vip: {
            name: 'VIP Ticket',
            price: event.price * 2,
            description: 'Premium seating and exclusive perks'
        }
    };

    const paymentOptions = [
        { id: 'netbanking', name: 'Net Banking', icon: '🏦', isEmoji: true },
        { id: 'upi', name: 'UPI Payment', icon: upiLogo, isEmoji: false },
        { id: 'card', name: 'Credit/Debit Card', icon: cardLogo, isEmoji: false }
    ];

    const banks = [
        { id: 'hdfc', name: 'HDFC Bank', logo: hdfcLogo },
        { id: 'icici', name: 'ICICI Bank', logo: iciciLogo },
        { id: 'sbi', name: 'State Bank of India', logo: sbiLogo },
        { id: 'axis', name: 'Axis Bank', logo: axisLogo }
    ];

    const calculateSubtotal = () => {
        return ticketTypes[selectedTicketType].price * quantity;
    };

    const calculateServiceFee = () => {
        return Math.round(calculateSubtotal() * 0.05); // 5% service fee
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateServiceFee();
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= event.maxTickets) {
            setQuantity(newQuantity);
        }
    };

    const handleCardInputChange = (field, value) => {
        setCardDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isCardValid = () => {
        return cardDetails.number && 
               cardDetails.name && 
               cardDetails.expiry && 
               cardDetails.cvv;
    };

    const generateTicketCode = () => {
        return 'MRCE-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    };

    const generateQRCode = (ticketCode) => {
        // In a real app, you would generate a QR code here
        // For now, we'll return a placeholder URL
        return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticketCode}`;
    };

    const handleContactInfoChange = (field, value) => {
        setContactInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePayment = () => {
        // Generate purchase code
        const purchaseCode = '#' + Math.random().toString().substr(2, 8);
        
        // Create tickets array
        const tickets = Array(quantity).fill(null).map(() => ({
            firstName: contactInfo.firstName,
            lastName: contactInfo.lastName,
            email: contactInfo.email,
            phone: contactInfo.phone,
            code: generateTicketCode(),
            qrCode: generateQRCode(generateTicketCode())
        }));

        // Get payment info text
        let paymentInfo = '';
        if (paymentMethod === 'card') {
            paymentInfo = `Master Card - **** ${cardDetails.number.slice(-4)}`;
        } else if (paymentMethod === 'upi') {
            paymentInfo = upiId;
        } else if (paymentMethod === 'netbanking') {
            paymentInfo = banks.find(bank => bank.id === selectedBank)?.name || '';
        }

        // Create payment details object
        const paymentDetails = {
            event: {
                ...event,
                duration: 5 // Add duration if not in event data
            },
            tickets,
            contactInfo,
            paymentMethod,
            paymentInfo,
            totalAmount: calculateTotal(),
            purchaseDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            }),
            purchaseCode
        };

        // Navigate to success page with payment details
        navigate('/payment-success', { state: { paymentDetails } });
    };

    return (
        <>
            <Header />
            <div className="purchase-ticket-page">
                <div className="purchase-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <h1>Purchase Tickets</h1>
                </div>

                <div className="purchase-content">
                    <div className="purchase-details">
                        <div className="event-details">
                            <div className="event-card">
                                <div 
                                    className="event-image"
                                    style={{ backgroundImage: `url(${event.heroImage})` }}
                                />
                                <div className="event-info">
                                    <h2>{event.title}</h2>
                                    <p className="event-date">{event.date} | {event.startTime}</p>
                                    <p className="event-location">{event.location}</p>
                                </div>
                            </div>

                            <div className="ticket-selection">
                                <h3>Select Ticket Type</h3>
                                <div className="ticket-types">
                                    {Object.entries(ticketTypes).map(([type, details]) => (
                                        <div
                                            key={type}
                                            className={`ticket-type ${selectedTicketType === type ? 'selected' : ''}`}
                                            onClick={() => setSelectedTicketType(type)}
                                        >
                                            <div className="ticket-info">
                                                <h4>{details.name}</h4>
                                                <p>{details.description}</p>
                                            </div>
                                            <div className="ticket-price">
                                                <span>₹{details.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="contact-info">
                                <h3>Contact Information</h3>
                                <div className="form-group">
                                    <div className="input-row">
                                        <div className="input-field">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter first name"
                                                value={contactInfo.firstName}
                                                onChange={(e) => handleContactInfoChange('firstName', e.target.value)}
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter last name"
                                                value={contactInfo.lastName}
                                                onChange={(e) => handleContactInfoChange('lastName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <div className="input-field">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter email address"
                                                value={contactInfo.email}
                                                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="input-field">
                                            <label>Phone number</label>
                                            <input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                value={contactInfo.phone}
                                                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-section">
                                <h3>Payment Method</h3>
                                <div className="payment-options">
                                    {paymentOptions.map(option => (
                                        <div
                                            key={option.id}
                                            className={`payment-option ${paymentMethod === option.id ? 'selected' : ''}`}
                                            onClick={() => {
                                                setPaymentMethod(option.id);
                                                setSelectedBank('');
                                                setUpiId('');
                                                setCardDetails({
                                                    number: '',
                                                    name: '',
                                                    expiry: '',
                                                    cvv: ''
                                                });
                                            }}
                                        >
                                            {option.isEmoji ? (
                                                <span className="payment-icon">{option.icon}</span>
                                            ) : (
                                                <img src={option.icon} alt={option.name} className="payment-icon" />
                                            )}
                                            <span>{option.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {paymentMethod === 'netbanking' && (
                                    <div className="bank-selection">
                                        <h4>Select Bank</h4>
                                        <div className="bank-options">
                                            {banks.map(bank => (
                                                <div
                                                    key={bank.id}
                                                    className={`bank-option ${selectedBank === bank.id ? 'selected' : ''}`}
                                                    onClick={() => setSelectedBank(bank.id)}
                                                >
                                                    <img src={bank.logo} alt={bank.name} className="bank-icon" />
                                                    <span>{bank.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className="upi-section">
                                        <h4>Enter UPI ID</h4>
                                        <div className="upi-input">
                                            <input
                                                type="text"
                                                placeholder="username@bank"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                            />
                                            <p className="upi-hint">Example: username@okicici or username@okhdfc</p>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="card-section">
                                        <h4>Enter Card Details</h4>
                                        <div className="card-form">
                                            <div className="card-input">
                                                <label>Card Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                    value={cardDetails.number}
                                                    onChange={(e) => handleCardInputChange('number', e.target.value)}
                                                />
                                            </div>
                                            <div className="card-input">
                                                <label>Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Name on card"
                                                    value={cardDetails.name}
                                                    onChange={(e) => handleCardInputChange('name', e.target.value)}
                                                />
                                            </div>
                                            <div className="card-row">
                                                <div className="card-input">
                                                    <label>Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                        value={cardDetails.expiry}
                                                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                                                    />
                                                </div>
                                                <div className="card-input">
                                                    <label>CVV</label>
                                                    <input
                                                        type="password"
                                                        placeholder="123"
                                                        maxLength="3"
                                                        value={cardDetails.cvv}
                                                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="ticket-quantity">
                                <div className="quantity-label">
                                    <span>{ticketTypes[selectedTicketType].name}</span>
                                    <span>₹{ticketTypes[selectedTicketType].price} × {quantity}</span>
                                </div>
                                <div className="quantity-controls">
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
                            </div>

                            <div className="price-breakdown">
                                <div className="price-row">
                                    <span>Subtotal</span>
                                    <span>₹{calculateSubtotal()}</span>
                                </div>
                                <div className="price-row">
                                    <span>Service Fee</span>
                                    <span>₹{calculateServiceFee()}</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total</span>
                                    <span>₹{calculateTotal()}</span>
                                </div>
                            </div>

                            <button 
                                className="purchase-btn"
                                onClick={handlePayment}
                                disabled={
                                    !paymentMethod || 
                                    (paymentMethod === 'netbanking' && !selectedBank) ||
                                    (paymentMethod === 'upi' && !upiId) ||
                                    (paymentMethod === 'card' && !isCardValid())
                                }
                            >
                                Pay ₹{calculateTotal()}
                            </button>

                            <p className="terms">
                                By clicking "Pay", you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PurchaseTicket; 