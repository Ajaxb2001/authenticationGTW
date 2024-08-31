import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!email.includes("@")) {
      setError("Email must contain '@'");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });

      // Display success message
      alert(response.data.message);

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      // Handle errors
      console.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-input-container">
            <label className="signup-label">
              <FaUser className="signup-icon" /> Username
            </label>
            <input
              type="text"
              className="signup-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label className="signup-label">
              <FaEnvelope className="signup-icon" /> Email
            </label>
            <input
              type="email"
              className="signup-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label className="signup-label">
              <FaLock className="signup-icon" /> Password
            </label>
            <input
              type="password"
              className="signup-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="signup-error-message">{error}</p>}
          <button type="submit" className="signup-submit-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
