// components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      // Auto-submit quiz (add functionality for auto-submit)
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="timer">
      <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
    </div>
  );
};

export default Timer;
