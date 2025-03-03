import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import './Interview.module.css';

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("20:00");

  return (
    <MainLayout>
      <div className="interview-container">
        <div className="progress-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        <div className="question-section">
          <div className="question-number">Question 1</div>
          <h1 className="question-text">
            Tell me about a time when you demonstrated leadership skills in a challenging situation.
          </h1>
        </div>

        <div className="timer-section">
          <div className="timer-display">
            <div className="time">{timeRemaining}</div>
            <div className="time-label">Time<br/>Remaining</div>
          </div>
        </div>

        <div className="record-button-container">
          <button 
            className={`record-button ${isRecording ? 'recording' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <div className="record-button-inner"></div>
          </button>
        </div>

        <div className="tips-button">
          <span className="tips-icon">💡</span>
          <span className="tips-text">TIPS</span>
        </div>
      </div>
    </MainLayout>
  );
};

export default Interview;
