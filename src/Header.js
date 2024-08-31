import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="logo">MyApp</h1>
        <nav className="nav-links">
          <a href="/" className="nav-link">
            Home
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
