import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css"; // Import the CSS Module

import Logo from "../../components/Logo/Logo";

const LandingPage = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "Upload your Chevening essay.",
    },
    {
      title:
        "Mock with our voice AI interviewerr, closely simulating your final Chevening interview.",
    },
    {
      title:
        "Get detailed, Chevening evaluation aligned feedback that radically improves your chances of winning the Chevening Scholarship this year.",
    },
  ];

  return (
    <div className={styles.container}>
      <Logo />
      <p>
        Ace your Chevening interview by mocking with our voice-enabled AI expert
        interviewer. <br />
        Built for aspiring Chevening scholars by Chevening alumni.
      </p>
      {/* Timeline Section */}
      <div className={styles["timeline-container"]}>
        <div className={styles.timeline}>
          {events.map((event, index) => (
            <div key={index} className={styles["timeline-event"]}>
              <div className={styles["timeline-bullet"]}></div>
              <div className={styles["timeline-content"]}>
                <div className={styles["timeline-event-title"]}>
                  {event.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start button using CSS Module class */}
      <button
        className={styles.landingPageButton}
        onClick={() => navigate("/upload")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LandingPage;
