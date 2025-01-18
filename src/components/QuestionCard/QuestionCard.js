import React from 'react';
import './QuestionCard.css'; // Make sure to import the CSS for styling

const QuestionCard = ({ question, choices, onAnswer, userAnswer }) => {
  return (
    <div className="question-card">
      <h2 className="question-text">{question}</h2>
      <div className="choices">
        {choices.map((choice, index) => (
          <div key={index} className="choice">
            <input
              type="radio"
              id={`choice${index}`}
              name="answer"
              value={choice}
              checked={userAnswer === choice}
              onChange={() => onAnswer(choice)}
              className="choice-input"
            />
            <label htmlFor={`choice${index}`} className={`choice-label ${userAnswer === choice ? 'selected' : ''}`}>
              {choice}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
