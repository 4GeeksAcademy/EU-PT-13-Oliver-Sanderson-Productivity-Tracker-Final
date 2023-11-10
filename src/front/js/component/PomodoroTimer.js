import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
         
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds, timerRunning]);

  const startTimer = (duration) => {
    setMinutes(duration);
    setSeconds(0);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setTimerRunning(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Pomodoro Timer</h5>
        <p className="card-text">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <button onClick={() => startTimer(25)}>Start Pomodoro</button>
        <button onClick={() => startTimer(5)}>Short Break</button>
        <button onClick={() => startTimer(15)}>Long Break</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
