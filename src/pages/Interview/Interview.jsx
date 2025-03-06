import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import styles from "./Interview.module.css";

const Interview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining] = useState("20:00");

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Add stop logic here
  };

  return (
    <MainLayout>
      <ActionBox>
        <div className={styles.interviewContent}>
          <div className={styles.header}>
            <div className={styles.progressDots}>
              <div className={`${styles.dot} ${styles.active}`}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.tipsButton}>
              <span className={styles.tipsIcon}>💡</span>
              <span className={styles.tipsText}>TIPS</span>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.timerSection}>
              <div className={styles.timerDisplay}>
                <div className={styles.time}>{timeRemaining}</div>
                <div className={styles.timeLabel}>Time Remaining</div>
              </div>
            </div>

            <div className={styles.controlsContainer}>
              <button
                className={`${styles.controlButton} ${styles.playPauseButton}`}
                onClick={handlePlayPause}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button
                className={`${styles.controlButton} ${styles.stopButton}`}
                onClick={handleStop}
              >
                ⏹️
              </button>
            </div>
          </div>
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Interview;
