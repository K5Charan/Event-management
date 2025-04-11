import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="overlay">
        <h1 className="title">WELCOME</h1>
        <p className="subtitle">
          Elevate your event experience - create, explore, and <br />
          celebrate with ease
        </p>
        <button className="start-btn" onClick={() => navigate("/interests")}>
          Let's get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome; 