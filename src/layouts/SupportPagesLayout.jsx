import React from "react";
import Footer from "../components/Footer/Footer";
import Logo from "../components/Logo/Logo";
import styles from "./layout.module.css";

const SupportPagesLayout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainLayout}>
        <div className={styles.navigationContainer}>
          <Logo />
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPagesLayout;
