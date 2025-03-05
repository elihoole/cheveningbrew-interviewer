import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './Feedback.module.css';  // Import the CSS module
import  '../../index.css';

const Feedback = () => {
  return (
    <MainLayout>
      <div className={styles.feedbackContainer}>
        <div className={styles.content}>
          <h1 className="text-3xl font-bold mb-8 text-white">Interview Feedback</h1>

          <div className={styles.feedbackBox}>
            <div className={styles.feedbackSection}>
              <h2 className="text-white text-xl mb-4">Content Analysis</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '75%' }}></div>
              </div>
              <p className="text-white/70 mt-2">Your response was clear and structured.</p>
            </div>

            <div className={styles.feedbackSection}>
              <h2 className="text-white text-xl mb-4">Delivery</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '85%' }}></div>
              </div>
              <p className="text-white/70 mt-2">The delivery was confident and articulate.</p>
            </div>

            <div className={styles.feedbackSection}>
              <h2 className="text-white text-xl mb-4">Technical Knowledge</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '60%' }}></div>
              </div>
              <p className="text-white/70 mt-2">The technical knowledge was strong, but more depth could be shown in some areas.</p>
            </div>

            <div className={styles.feedbackSection}>
              <h2 className="text-white text-xl mb-4">Overall Impression</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '80%' }}></div>
              </div>
              <p className="text-white/70 mt-2">Great overall impression, just work on specific technical aspects.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;
