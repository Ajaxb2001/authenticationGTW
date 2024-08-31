import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
          <a href="/contact" className="footer-link">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
