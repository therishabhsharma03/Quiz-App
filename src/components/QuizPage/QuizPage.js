import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../Timer/Timer';
import QuestionCard from '../QuestionCard/QuestionCard';
import './QuizPage.css'; // Importing the CSS for styling
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=15&type=multiple')
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
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Redirect to the report page when quiz ends, passing answers as state
      navigate('/report', { state: { answers } });
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <Timer />
        {questions.length > 0 && (
          <>
            <QuestionCard
              question={questions[currentQuestion].question}
              choices={[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]}
              onAnswer={handleAnswer}
              userAnswer={answers[currentQuestion]}
            />
            <button onClick={nextQuestion} className="next-button">
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
