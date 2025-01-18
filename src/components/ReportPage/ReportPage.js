import React from 'react';
import { useLocation } from 'react-router-dom';

const ReportPage = () => {
  const { state } = useLocation(); // Use useLocation to get passed state
  const answers = state?.answers || []; // Check if answers exist, otherwise default to an empty array

  if (!answers.length) {
    return <div>No answers available</div>; // Handle case where no answers exist
  }

  return (
    <div className="report-page">
      <h1>Your Quiz Report</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Question {index + 1}: {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;
