import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import styles from "./Interview.module.css";

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("20:00");

  return (
    <MainLayout>
      <ActionBox>
        <div className={styles.interviewContent}>
          <div className={styles.progressDots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          <div className={styles.timerSection}>
            <div className={styles.timerDisplay}>
              <div className={styles.time}>{timeRemaining}</div>
              <div className={styles.timeLabel}>Time Remaining</div>
            </div>
          </div>

          <div className={styles.recordButtonContainer}>
            <button
              className={`${styles.recordButton} ${
                isRecording ? styles.recording : ""
              }`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <div className={styles.recordButtonInner}></div>
            </button>
          </div>

          <div className={styles.tipsButton}>
            <span className={styles.tipsIcon}>💡</span>
            <span className={styles.tipsText}>TIPS</span>
          </div>
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Interview;
