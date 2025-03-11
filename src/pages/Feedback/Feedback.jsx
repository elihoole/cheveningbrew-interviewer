import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import styles from "./Feedback.module.css";
import Logo from "../../components/Logo/Logo";

const Feedback = () => {
  return (
    <MainLayout>
      {/* Logo positioned at the top-left corner */}

      <ActionBox>
        <div className={styles.feedbackContent}>
          <h1 className={styles.title}>Performance feedback</h1>
          <div className={styles.feedbackSections}>
            <div className={styles.feedbackSection}>
              <h2>Content Analysis</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: "75%" }}></div>
              </div>
              <p>Your response was clear and structured.</p>
            </div>

            <div className={styles.feedbackSection}>
              <h2>Delivery</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: "85%" }}></div>
              </div>
              <p>The delivery was confident and articulate.</p>
            </div>

            <div className={styles.feedbackSection}>
              <h2>Technical Knowledge</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: "60%" }}></div>
              </div>
              <p>
                The technical knowledge was strong, but more depth could be
                shown in some areas.
              </p>
            </div>
            

            <div className={styles.feedbackSection}>
              <h2>Overall Impression</h2>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: "80%" }}></div>
              </div>
              <p>
                Great overall impression, just work on specific technical
                aspects.
              </p>
            </div>
          </div>
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Feedback;
