import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReportPage.css';

const ReportPage = () => {
  const { state } = useLocation();
  const { answers, questions } = state || { answers: [], questions: [] };
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate('/quiz');
  };

  const calculateResults = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct_answer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateResults();
  const totalQuestions = questions.length;

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="sidebar">
          <h2>Quiz Summary</h2>
          <ul>
            <li>Total Questions: {totalQuestions}</li>
            <li>Answered Correctly: {score}</li>
            <li>Score: {score}/{totalQuestions}</li>
          </ul>
        </div>
        <div className="report-content">
          <h2>Review Your Answers</h2>
          <div className="answer-review">
            {questions.map((question, index) => (
              <div key={index} className="answer-card">
                <p><strong>Q{index + 1}: </strong>{question.question}</p>
                <p><strong>Your Answer: </strong>{answers[index]}</p>
                <p><strong>Correct Answer: </strong>{question.correct_answer}</p>
              </div>
            ))}
          </div>
          <div className="actions">
            <button onClick={handleRetake}>Retake Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
