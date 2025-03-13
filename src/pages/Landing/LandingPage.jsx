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
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Handle successful login
      setIsLoading(true);

      console.log("Token response:", tokenResponse);

      // Extract ID token
      const idToken = tokenResponse.credential || tokenResponse.code;

      console.log("ID token:", idToken);


      // Send to your backend for verification
      fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: tokenResponse.code })

      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Response:", response);
        return response.json();
      })
      .then(data => {
        // Backend should verify token and return user info or session token
        if (data.authenticated) {
          // Store user session information
          localStorage.setItem('authToken', data.authToken);

        if (data.user && data.user.name) {
            localStorage.setItem('userName', data.user.name);
        }


          navigate("/upload");
        } else {
          // Handle authentication failure
          setIsLoading(false);
          setError("Authentication failed");
        }
      })
      .catch(error => {
        console.error("Authentication error:", error);
        setIsLoading(false);
        setError("Authentication failed");
      });
    },
    onError: (error) => { // Handle error
      console.error("Authentication error:", error);
      setIsLoading(false);
      setError("Authentication failed");
    },
    flow: "auth-code", // or 'auth-code' depending on your backend
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
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo />
          <div className={styles.description}>
            <b>
              Ace your Chevening interview by mocking with our voice-enabled AI
              expert interviewer.{" "}
            </b>
            Built for Chevening aspirants . . . by Chevening alumni.
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
      </div>
      <div className={styles.footerContainer}>
        <Footer className={styles.landingPageFooter} />
      </div>
    </>
  );
};

export default LandingPage;
