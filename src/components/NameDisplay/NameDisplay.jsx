import React from 'react';
import styles from './NameDisplay.module.css';

const NameDisplay = ({ userName }) => {
  return (
    <div className={styles.nameContainer}>
      <p className={styles.welcomeText}><span className={styles.userName}>{userName}</span></p>
    </div>
  );
};

export default NameDisplay;