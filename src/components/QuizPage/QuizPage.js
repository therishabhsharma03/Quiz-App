import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../Timer/Timer';
import QuestionCard from '../QuestionCard/QuestionCard';
import './QuizPage.css';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionStatus, setQuestionStatus] = useState(Array(15).fill(1)); // 1 = Unvisited, 2 = Visited, 3 = Answered, 4 = Marked for Review
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState('30:00');
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(1800);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=15&type=multiple')
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });

    const newStatus = [...questionStatus];
    newStatus[currentQuestion] = 3; // Answered
    setQuestionStatus(newStatus);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const newStatus = [...questionStatus];
      
      // Update current question status
      if (answers[currentQuestion]) {
        newStatus[currentQuestion] = 3; // Answered
      } else if (newStatus[currentQuestion] !== 4) {
        newStatus[currentQuestion] = 2; // Visited (if not marked for review)
      }
  
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      
      // Update the status of the next question if not already answered
      if (newStatus[currentQuestion + 1] !== 3) {
        newStatus[currentQuestion + 1] = 2; // Visited
      }
  
      setQuestionStatus(newStatus);
    }
  };
  

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      const newStatus = [...questionStatus];
  
      // Update current question status
      if (answers[currentQuestion]) {
        newStatus[currentQuestion] = 3; // Answered
      } else if (newStatus[currentQuestion] !== 4) {
        newStatus[currentQuestion] = 2; // Visited (if not marked for review)
      }
  
      // Move to the previous question
      setCurrentQuestion(currentQuestion - 1);
  
      // Update the status of the previous question if not already answered
      if (newStatus[currentQuestion - 1] !== 3) {
        newStatus[currentQuestion - 1] = 2; // Visited
      }
  
      setQuestionStatus(newStatus);
    }
  };
  const jumpToQuestion = (index) => {
    setCurrentQuestion(index);  
    const newStatus = [...questionStatus];
    if (newStatus[index] !== 3) newStatus[index] = 2; // Visited if not answered
    setQuestionStatus(newStatus);
  };

  const toggleMarkForReview = () => {
    const newStatus = [...questionStatus];
    newStatus[currentQuestion] = newStatus[currentQuestion] === 4 ? 2 : 4; // Toggle between Marked for Review and Visited
    setQuestionStatus(newStatus);
  };

  const handleSubmit = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const confirmSubmit = () => {
    navigate('/report', {
      state: { answers, questions },
    });
    setShowPopup(false);
  };

  const handleTimeUp = () => {
    handleSubmit(); // Auto-submit when time's up
  };
  const updateTimeRemaining = (time) => {
    setTimeRemaining(time); // Update the time remaining state
  };

  const getStatusCounts = () => {
    const answered = questionStatus.filter((status) => status === 3).length;
    const reviewed = questionStatus.filter((status) => status === 4).length;
    const unvisited = questionStatus.filter((status) => status === 1).length;
    const unattempted = questionStatus.filter((status) => status === 2).length;

    return { answered, reviewed, unvisited, unattempted };
  };

  const { answered, reviewed, unvisited, unattempted } = getStatusCounts();

  return (
    <div className="quiz-page">
      <div className={`quiz-container ${showPopup ? 'blur-background' : ''}`}>
      <Timer onTimeUp={handleTimeUp} setRemainingTime={updateTimeRemaining} />
        <div className="sidebar">
          <h2>Questions</h2>
          <div className="question-list">
            {questionStatus.map((status, index) => {
              let boxClass = '';
              switch (status) {
                case 1:
                  boxClass = 'unvisited'; // Red for unvisited
                  break;
                case 2:
                  boxClass = 'visited'; // Grey for visited
                  break;
                case 3:
                  boxClass = 'answered'; // Green for answered
                  break;
                case 4:
                  boxClass = 'marked-for-review'; // Yellow for marked for review
                  break;
                default:
                  boxClass = 'unvisited';
                  break;
              }
              const isCurrent = index === currentQuestion ? 'current' : '';
              return (
                <div
                  key={index}
                  className={`question-box ${boxClass} ${isCurrent}`}
                  onClick={() => jumpToQuestion(index)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          <button onClick={toggleMarkForReview} className="mark-review-button">
            Mark for Review
          </button>
        </div>

        <div className='align-ops'>
          <div className="question-content">
            {questions.length > 0 && (
              <QuestionCard
                question={questions[currentQuestion].question}
                choices={[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]}
                onAnswer={handleAnswer}
                userAnswer={answers[currentQuestion]}
              />
            )}
          </div>
          <div className="actions">
            <div className="action-buttons">
              <button onClick={previousQuestion}>Previous Question</button>
              <button onClick={nextQuestion}>Next Question</button>
              <button onClick={handleSubmit} className="submit-button">Submit Quiz</button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}></div>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Submission</h2>
            <p>Are you sure you want to submit the quiz?</p>
            <p>Quiz Summary:</p>
            <ul>
              <li>Answered: {answered}</li>
              <li>Reviewed: {reviewed}</li>
              <li>Unvisited: {unvisited}</li>
              <li>Unattempted: {unattempted}</li>
              <li>Time Left: {timeRemaining}</li>
            </ul>
            <div className="actions">
              <button onClick={confirmSubmit}>Yes, Submit</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
