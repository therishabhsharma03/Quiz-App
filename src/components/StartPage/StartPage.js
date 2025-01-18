import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/quiz');
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
          <button type="submit" className="start-button">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;
