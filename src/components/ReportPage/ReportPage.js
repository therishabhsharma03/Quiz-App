import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReportPage.css';

const CustomReportPage = () => {
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
    <div className="custom-report-page">
    <div className="custom-report-container">
      <div className="custom-sidebar">
        <h2>Quiz Summary</h2>
        <ul>
          <li>Total Questions: {totalQuestions}</li>
          <li>Answered Correctly: {score}</li>
          <li>Score: {score}/{totalQuestions}</li>
        </ul>
      </div>
      <div className="custom-report-content">
        <h2>Review Your Answers</h2>
        <div className="custom-answer-review">
          {questions.map((question, index) => {
            const isCorrect = answers[index] === question.correct_answer;
            return (
              <div
                key={index}
                className={`custom-answer-card ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <p><strong>Q{index + 1}: </strong>{question.question}</p>
                <p><strong>Your Answer: </strong>{answers[index]}</p>
                <p><strong>Correct Answer: </strong>{question.correct_answer}</p>
              </div>
            );
          })}
        </div>
        <div className="custom-actions">
          <button onClick={handleRetake}>Retake Quiz</button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CustomReportPage;
