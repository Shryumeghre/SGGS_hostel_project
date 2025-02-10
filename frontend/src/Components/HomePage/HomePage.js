import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from 'react-router-dom';
import SignupOptions from "../SignupOptions/SignupOptions.js";

const HomePage = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [notices, setNotices] = useState([]); // Ensure it's an empty array initially

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/notices/All");
        const data = await response.json();

        // Debugging: Log the data received
        console.log("Fetched Notices:", data);

        // Ensure that 'data' is an array before setting it
        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          console.error("Expected an array of notices, but received:", data);
          setNotices([]); // Set to empty array if the data is not an array
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setNotices([]); // Set to empty array in case of error
      }
    };

    fetchNotices();
  }, []);

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
          <Link to="/login" className="nav-link">Signin</Link>
        </nav>
      </header>

      {showSignupOptions && <SignupOptions onClose={closeSignupOptions} />}

      <main className="container">
        <h1>HomePage</h1>

        <section className="section notices-section">
          <h2 className="section-title">Hostel Notices</h2>
          {notices.length === 0 ? (
            <p>No notices available.</p>
          ) : (
            <ul>
              {notices.map((notice) => (
                <li key={notice._id}>
                  <h3>{notice.title}</h3>
                  <small>{new Date(notice.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
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
