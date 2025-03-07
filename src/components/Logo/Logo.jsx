import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css"; // Import as a module
import logo from "../../assets/images/logo.png"

const Logo = () => {
  return (
    <Link to="/" className={styles.logoLink}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
