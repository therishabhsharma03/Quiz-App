import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(5); // Countdown starting at 5 seconds
  const [isCountingDown, setIsCountingDown] = useState(false); // To check if countdown is in progress
  const navigate = useNavigate();

  // Function to begin countdown
  const beginCountDown = () => {
    setIsCountingDown(true);
    let timer = countdown;
    
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setCountdown(timer - 1);
        timer--;
      } else {
        clearInterval(countdownInterval);
        setIsCountingDown(false);
        navigate('/quiz'); // Navigate to quiz page when countdown finishes
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      beginCountDown();
    }
  };

  return (
    <div className="start-page">
      <div className="container">
        <h1 className="title">Welcome to the Quiz</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <button type="submit" className="start-button" disabled={isCountingDown}>
            {isCountingDown ? `Starting in ${countdown}s` : 'Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;
