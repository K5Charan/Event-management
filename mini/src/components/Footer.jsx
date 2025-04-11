import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.jpg';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate('/search', { 
            state: { 
                category: category,
                searchTerm: ''
            }
        });
    };

    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-left">
                    <div className="footer-brand">
                        <img src={Logo} alt="BASC Logo" className="footer-logo" />
                        <h3>BASC EVENTS</h3>
                    </div>
                    
                    <div className="footer-sections">
                        <div className="footer-section">
                            <h4>Categories</h4>
                            <ul>
                                <li><Link to="/search" state={{ category: 'All', searchTerm: '' }}>All</Link></li>
                                <li onClick={() => handleCategoryClick('Music')} style={{ cursor: 'pointer' }}>Music</li>
                                <li onClick={() => handleCategoryClick('Party')} style={{ cursor: 'pointer' }}>Party</li>
                                <li onClick={() => handleCategoryClick('Stand-up Comedy')} style={{ cursor: 'pointer' }}>Stand-up comedy</li>
                                <li onClick={() => handleCategoryClick('Business')} style={{ cursor: 'pointer' }}>Business</li>
                                <li onClick={() => handleCategoryClick('Dance')} style={{ cursor: 'pointer' }}>Dance</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Resources</h4>
                            <ul>
                                <li><Link to="/guides">User guides</Link></li>
                                <li><Link to="/help">Help Center</Link></li>
                                <li><Link to="/partners">Partners</Link></li>
                                <li><Link to="/taxes">Taxes</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/careers">Join us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="newsletter">
                        <h4>Stay in the loop</h4>
                        <p>For product announcements and exclusive insights</p>
                        <div className="newsletter-form">
                            <div className="input-container">
                                <span className="email-icon">✉️</span>
                                <input type="email" placeholder="Input your email" />
                            </div>
                            <button type="submit">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-left">
                    <select className="language-select">
                        <option value="en">English</option>
                        <option value="hin">Hindi</option>
                        <option value="tel">Telugu</option>
                    </select>
                    <div className="footer-legal">
                        <span>© 2025 Brand, Inc.</span>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/sitemap">Sitemap</Link>
                    </div>
                </div>
                <div className="footer-social">
                    <a href="https://twitter.com/bascevents" target="_blank" rel="noopener noreferrer" className="social-icon twitter">Twitter</a>
                    <a href="https://facebook.com/bascevents" target="_blank" rel="noopener noreferrer" className="social-icon facebook">Facebook</a>
                    <a href="https://linkedin.com/company/bascevents" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">LinkedIn</a>
                    <a href="https://youtu.be/xvFZjo5PgG0" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                        <img src={require("../Images/youtube.png")} alt="YouTube" style={{ width: '24px', height: '24px' }} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 