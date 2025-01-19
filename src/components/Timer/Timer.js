import React, { useState, useEffect } from 'react';
import './Timer.css'
const Timer = ({ onTimeUp,setRemainingTime }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          onTimeUp(); // Notify parent when time is up
          return prevTime;
        }
        
        setRemainingTime(formatTime(prevTime)); 
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [onTimeUp,setRemainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer">
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
