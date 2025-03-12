import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({ className }) => {
  return (
    <footer className={`styles.footer ${className} || ""`}>
      <div className="container flex flex-col md:flex-row justify-between items-center md:items-center relative">
        {/* Links aligned to the left */}
        <div className="footer-links flex flex-wrap justify-center gap-4 md:gap-6">
          <Link to="/help" className="nav-link">
            Help
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/privacy" className="nav-link">
            Privacy
          </Link>
          <Link to="/terms" className="nav-link">
            Terms
          </Link>
        </div>

        {/* Copyright aligned to the right-bottom corner */}
        <div className="copyright text-center md:text-right opacity-50 text-sm mt-4 md:mt-0">
          <p>
            © cheveningbrew.com {new Date().getFullYear()} | All rights
            reserved. Version 1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
