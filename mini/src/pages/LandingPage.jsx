import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-navbar">
                <div className="admin-nav">
                    <Link to="/adminlogin" className="admin-link">Admin Login</Link>
                </div>
                <div className="user-nav">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
            <div className="landing-content">
                <h1>Welcome to BASC Events</h1>
                <p>Your one-stop solution for managing and attending amazing events!</p>
            </div>
        </div>
    );
};

export default LandingPage;


