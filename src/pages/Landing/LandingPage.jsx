import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Logo from "../../components/Logo/Logo";
import g from "../../assets/images/G.webp";
import { useGoogleLogin } from "@react-oauth/google";
import googleOAuthService from "../../services/google_oauth";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        setIsLoading(true);
        // Send the token to your backend to validate and create a session
        const response = await googleOAuthService.authenticate(
          credentialResponse.access_token
        );

        // Store user data or token in localStorage if needed
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);

        // Navigate to upload page after successful authentication
        navigate("/upload");
      } catch (error) {
        console.error("Authentication failed:", error);
        // Handle login failure - you might want to show an error message to the user
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      console.log("Login Failed");
      setIsLoading(false);
    },
  });

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
          onClick={() => login()}
          disabled={isLoading}
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
    </div>
  );
};

export default LandingPage;
