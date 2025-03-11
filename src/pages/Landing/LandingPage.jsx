import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Logo from "../../components/Logo/Logo";
import Footer from "../../components/Footer/Footer";
import g from "../../assets/images/G.webp";
import { useGoogleLogin } from "@react-oauth/google";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Handle successful login
      console.log(tokenResponse);
      setIsLoading(true);
      // Process the token response here
      // You can call your backend with this token

      // Navigate to upload page on successful authentication
      navigate('/upload');
    },
    onError: (errorResponse) => {
      // Handle error
      console.error('Google Login Failed:', errorResponse);
      setIsLoading(false);
    },
    flow: 'implicit' // or 'auth-code' depending on your backend
  });

  // Then in your onClick handler, replace the current implementation with:
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    login();
  };

  const events = [
    {
      title: "Upload your Chevening essay.",
    },
    {
      title:
        "Mock with our voice AI interviewer, closely simulating your final Chevening interview.",
    },
    {
      title:
        "Get detailed, Chevening evaluation aligned feedback that radically improves your chances of winning the Chevening Scholarship this year.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <div className={styles.description}>
          <b>
            Ace your Chevening interview by mocking with our voice-enabled AI
            expert interviewer.{" "}
          </b>
          Built for aspiring Chevening scholars by Chevening alumni.
        </div>

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
          className={`${styles.landingPageButton} ${
            isLoading ? styles.loading : ""
          }`}
          onClick={handleGoogleSignIn}
        >
          {isLoading ? (
            "Signing in..."
          ) : (
            <>
              <img src={g} alt="logo" width="30" /> Sign in with Google
            </>
          )}
        </button>
      </div>
      <div className={styles["image-container"]}></div>
      <Footer />
    </div>
  );
};

export default LandingPage;
