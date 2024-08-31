import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { auth, googleProvider, signInWithPopup } from "./firebase";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * The function `handleSubmit` is an asynchronous function that handles form submission for a login
   * request, displaying appropriate error messages based on the response received.
   * @param e - The `e` parameter in the `handleSubmit` function is typically an event object that
   * represents the event being handled, in this case, it's likely an event related to form submission.
   * By calling `e.preventDefault()`, you are preventing the default behavior of the form submission,
   * which allows you to handle
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (response.data.token) {
        alert("Login successful");
        navigate("/admin-dashboard");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        if (err.response.data.message === "Invalid email") {
          setError("Invalid email. Please check your email.");
        } else if (err.response.data.message === "Invalid password") {
          setError("Invalid password. Please check your password.");
        } else {
          setError("Invalid email or password");
        }
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result._tokenResponse.idToken;
      const { email, displayName } = result.user;

      const response = await axios.post("http://localhost:5000/google-login", {
        token,
        email,
        username: displayName,
      });

      if (response.data.token) {
        alert("Login successful");
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Failed to login with Google");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <FaGoogle className="google-icon" /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
