import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./LandingPage.module.css";
import Logo from "../../components/Logo/Logo";

import { useGoogleLogin } from "@react-oauth/google"; 

const LandingPage = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse); 
      navigate("/upload"); 
    },
    onError: () => console.log("Login Failed"),
  });

  const events = [
    {
      title: "Upload your Chevening essay.",
    },
    {
      title: "Mock with our voice AI interviewer, closely simulating your final Chevening interview.",
    },
    {
      title: "Get detailed feedback to radically improve your chances of winning the Chevening Scholarship this year.",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>

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
          onClick={() => login()}  // Trigger Google login directly
        >
          Sign in with Google
        </button>
      </div>
      
      
    </div>
  );
};

export default LandingPage;
