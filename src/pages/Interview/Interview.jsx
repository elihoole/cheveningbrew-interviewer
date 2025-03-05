import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from'./Interview.module.css';

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("20:00");

  return (
    <MainLayout>
      <div className={styles.interviewContainer}>
      <h1 className="text-3xl font-bold mb-8 text-white">Interview</h1>
      <div className="interview-container">
        <div className="progress-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        

        <div className="timer-section">
          <div className="timer-display">
            <div className="time">{timeRemaining}</div>
            <div className="time-label ">Time Remaining</div>
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
      </div>
    </MainLayout>
  );
};

export default Interview;
