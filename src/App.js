import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import StartPage from './components/StartPage/StartPage';
import QuizPage from './components/QuizPage/QuizPage';
import ReportPage from './components/ReportPage/ReportPage';

const App = () => {
  return (
    <Router>
      <Routes> {/* Replaced Switch with Routes */}
        <Route path="/" element={<StartPage />} /> {/* Updated component prop to element */}
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
