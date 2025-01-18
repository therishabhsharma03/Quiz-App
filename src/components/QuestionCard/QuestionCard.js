import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, choices, onAnswer, userAnswer }) => {
  return (
    <div className="question-card">
      <div className="question-text">
        <p>{question}</p>
      </div>
      <div className="choices">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onAnswer(choice)}
            className={`choice-button ${userAnswer === choice ? 'selected' : ''}`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
