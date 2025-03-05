import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css"; // Import as a module

const Logo = () => {
  return (
    <Link to="/" className={styles.logoLink}>
      <div />
      <h1 className="text-3xl font-bold bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-transparent bg-clip-text">
        cheveningbrew.com
      </h1>
    </Link>
  );
};

export default Logo;
