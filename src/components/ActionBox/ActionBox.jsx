import React from "react";
import styles from "./ActionBox.module.css";

const ActionBox = ({ children }) => {
  return <div className={styles.actionBox}>{children}</div>;
};

export default ActionBox;
