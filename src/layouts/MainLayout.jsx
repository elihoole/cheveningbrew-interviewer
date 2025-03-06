import React from "react";
import Tabs from "../components/Header/Tabs/Tabs";
import Footer from "../components/Footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainLayout}>
        <div className={styles.navigationContainer}>
          <Tabs />
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
      <Footer /> {}
    </div>
  );
};

export default MainLayout;
