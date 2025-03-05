import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";  // Import the CSS Module

const LandingPage = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "Boost your preparation – Upload your Chevening essays.",
    },
    {
      title: "Mock interviews with top AI experts, closely mimicking the real Chevening interview.",
    },
    {
      title: "Get feedback and improve your chances of winning a Chevening Scholarship for 2025/2026.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.landingPageH1}>cheveningbrew.com</h1>
      <p>
        Ace your Chevening interview by practicing with Amour Expert,
        our AI-powered interview trainer. <br />
        Powered by Chevening Alumni for aspiring Chevening scholars.
      </p>
      {/* Timeline Section */}
      <div className={styles["timeline-container"]}>
        <div className={styles.timeline}>
          {events.map((event, index) => (
            <div key={index} className={styles["timeline-event"]}>
              <div className={styles["timeline-bullet"]}></div>
              <div className={styles["timeline-content"]}>
                <div className={styles["timeline-event-title"]}>{event.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Start button using CSS Module class */}
      <button className={styles.landingPageButton} onClick={() => navigate("/upload")}>Sign in with Google</button>
    </div>
  );
};

export default LandingPage;
