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
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const decodeHtmlEntity = (str) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  };
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=15&type=multiple')
      .then((response) => {
        // Decode questions before setting them to state
        const decodedQuestions = response.data.results.map((question) => ({
          ...question,
          question: decodeHtmlEntity(question.question),
          correct_answer: decodeHtmlEntity(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(decodeHtmlEntity),
        }));

        setQuestions(decodedQuestions);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  
  // Trigger the timer only when questions have been loaded
  useEffect(() => {
    if (!loading) {
      // Start the timer when questions are loaded
      setTimeRemaining(1800); // Set the timer duration (in seconds)
    }
  }, [loading]);

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
      // Only update if it's not already answered or marked for review
      if (!answers[currentQuestion] && newStatus[currentQuestion] !== 4) {
        newStatus[currentQuestion] = 2; // Visited
      }
      setCurrentQuestion(currentQuestion + 1);
      if (newStatus[currentQuestion + 1] === 1) {
        newStatus[currentQuestion + 1] = 2; // Mark the next question as visited
      }
      setQuestionStatus(newStatus);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      const newStatus = [...questionStatus];
      if (!answers[currentQuestion] && newStatus[currentQuestion] !== 4) {
        newStatus[currentQuestion] = 2; // Visited
      }
      setCurrentQuestion(currentQuestion - 1);
      setQuestionStatus(newStatus);
    }
  };

  const jumpToQuestion = (index) => {
    const newStatus = [...questionStatus];
    if (!answers[index] && newStatus[index] !== 4) {
      newStatus[index] = 2; // Visited
    }
    setCurrentQuestion(index);
    setQuestionStatus(newStatus);
  };

  const toggleMarkForReview = () => {
    const newStatus = [...questionStatus];
    if (newStatus[currentQuestion] === 4) {
      // If currently marked for review, revert to answered or visited
      newStatus[currentQuestion] = answers[currentQuestion] ? 3 : 2;
    } else {
      newStatus[currentQuestion] = 4; // Mark for review
    }
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

  // New function to clear selection
  const clearSelection = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = ''; // Clear the current answer
    setAnswers(newAnswers);

    const newStatus = [...questionStatus];
    newStatus[currentQuestion] = 1; // Set question status to unvisited
    setQuestionStatus(newStatus);
  };

  return (
    <div className="quiz-page">
      <div className={`quiz-container ${showPopup ? 'blur-background' : ''}`}>
        <Timer onTimeUp={handleTimeUp} setRemainingTime={updateTimeRemaining} />
        <div className="sidebar">
          <div className="sidebar-content">
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
          </div>
          <button onClick={handleSubmit} className="submit-button visibility-x">Submit Quiz</button>
        </div>
        <div className="major-pane">
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
              <button className='action-btn' onClick={previousQuestion} disabled={currentQuestion === 0}>
                Previous Question
              </button>
              <button className='action-btn mark-review-button' onClick={toggleMarkForReview}>
                {questionStatus[currentQuestion] === 4 ? 'Unmark' : 'Mark For Review'}
              </button>
              <button className='action-btn' onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>
                Next Question
              </button>
            </div>
            


            <div className='mobile-flex'>
            <button className="clear-selection-btn" onClick={clearSelection}>
              Clear Selection
            </button>
            <button onClick={handleSubmit} className="submit-button visibility-y">Submit Quiz</button>
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
