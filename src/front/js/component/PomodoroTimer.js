import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          fetchPainting();
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

  const fetchPainting = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
      const data = await response.json();

      if (response.ok) {
        const imageUrl = data.url;
        setBackgroundImage(imageUrl);
      } else {
        console.error('Error fetching painting:', data.message);
      }
    } catch (error) {
      console.error('Error fetching painting:', error.message);
    }
  };

  return (
    <div className="h-100 p-5 bg-body-tertiary border rounded-3 custom-container weather-box" >
      <div className="text-center">
        <h5 className="box-heading">Pomodoro Timer</h5>
        <p className="card-text display-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        {backgroundImage && <img src={backgroundImage} alt="Art Painting" className="img-fluid mb-3 rounded" />}
        <div className="btn-group" role="group" aria-label="Timer Controls">
          <button onClick={() => startTimer(25)} className="btn btn-secondary" style={{ opacity: 0.8 }}>
            Pomodoro (25 min)
          </button>
          <button onClick={() => startTimer(5)} className="btn btn-secondary" style={{ opacity: 0.8 }}>
            Short Break (5 min)
          </button>
          <button onClick={() => startTimer(15)} className="btn btn-secondary" style={{ opacity: 0.8 }}>
            Long Break (15 min)
          </button>
          <button onClick={stopTimer} className="btn btn-secondary" style={{ opacity: 0.8 }}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;


