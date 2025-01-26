import React, { useState }from "react";
import "./HomePage.css";
import { Link } from 'react-router-dom';
import SignupOptions from "../SignupOptions/SignupOptions.js";
// import collegeLogo from "./collegeLogo.png";

const HomePage = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const openSignupOptions = () => {
    setShowSignupOptions(true);
  };
  const closeSignupOptions = () => {
    setShowSignupOptions(false);
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo-container">
          <img
            src="/collegeLogo.png"
            alt="College Logo"
            className="college-logo"
          />
        </div>
        <nav className="nav">
          <Link to="/HomePage" className="nav-link">Home</Link>
          <Link to="/hostel-notices" className="nav-link">Hostel Notices</Link>
          <Link to="/facilities" className="nav-link">Facilities</Link>
          <a href="#!" onClick={openSignupOptions} className="nav-link">Signup</a>
          <Link to="/signin" className="nav-link">Signin</Link>
        </nav>
      </header>

      {showSignupOptions && <SignupOptions onClose={closeSignupOptions} />}

      <main className="container">

        <section className="section attendance-section">
          <h2 className="section-title">Attendance</h2>
          <p>Mark your attendance for today:</p>
          <button className="primary-button">Mark Attendance</button>
        </section>

        <section className="section leaving-section">
          <h2 className="section-title">Leaving Form</h2>
          <p>Submit your leave request:</p>
          <button className="primary-button">Fill Leaving Form</button>
        </section>

        <section className="section notices-section">
          <h2 className="section-title">Hostel Notices</h2>
          <ul className="notices-list">
            <li className="notice-item">Notice 1: Important meeting at 5 PM.</li>
            <li className="notice-item">Notice 2: Hostel cleanup drive on Sunday.</li>
            <li className="notice-item">Notice 3: New rules for late-night entries.</li>
          </ul>
        </section>

        <section className="section facilities-section">
          <h2 className="section-title">Facilities Provided</h2>
          <div className="facilities-grid">
            <div className="facility-item">
              <img
                src="https://via.placeholder.com/100"
                alt="Facility 1"
                className="facility-image"
              />
              <p className="facility-text">Wi-Fi Enabled Campus</p>
            </div>
            <div className="facility-item">
              <img
                src="https://via.placeholder.com/100"
                alt="Facility 2"
                className="facility-image"
              />
              <p className="facility-text">24/7 Security</p>
            </div>
            <div className="facility-item">
              <img
                src="https://via.placeholder.com/100"
                alt="Facility 3"
                className="facility-image"
              />
              <p className="facility-text">Recreational Rooms</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 SGGS Institute | All Rights Reserved.</p>
        <p>Contact: hostel-admin@sggs.ac.in</p>
      </footer>
    </div>
  );
};

export default HomePage;
