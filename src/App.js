import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AdminDashboard from "./AdminDashboard";
import Header from "./Header";
import Footer from "./Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="card-container">
                  <div className="form-card">
                    {isLogin ? <Login /> : <Signup />}
                    <button className="toggle-button" onClick={toggleForm}>
                      {isLogin ? (
                        <>
                          <FaArrowRight className="toggle-icon" /> Don't have an
                          account? Sign Up
                        </>
                      ) : (
                        <>
                          <FaArrowLeft className="toggle-icon" /> Already have
                          an account? Login
                        </>
                      )}
                    </button>
                  </div>
                </div>
              }
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
