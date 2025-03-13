import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import styles from './SignOut.module.css';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Sign out from Google
    googleLogout();

    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');

    // Redirect to landing page
    navigate('/');
  }
  return (
    <div className={styles.signoutContainer}>
      <button
        onClick={handleSignOut}
        className={styles.signoutText}
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOut;