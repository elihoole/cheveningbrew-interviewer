import React from "react";
import Tabs from "../components/Header/Tabs/Tabs";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.navigationContainer}>
        <Tabs />
      </div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default MainLayout;
