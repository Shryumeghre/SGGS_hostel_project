import React, { useState,useEffect }from "react";
import "./HomePageGuard.css";
import { Link } from 'react-router-dom';
import SignupOptions from "../SignupOptions/SignupOptions.js";
// import collegeLogo from "./collegeLogo.png";

const HomePageGuard = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
   const [notices, setNotices] = useState([]);

     useEffect(() => {
       const fetchNotices = async () => {
         const response = await fetch("http://localhost:5001/api/notices/All");
         const data = await response.json();
         setNotices(data);
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
      <h1> Guard Section</h1>
        <section className="section attendance-section">
          <h2 className="section-title">Attendance</h2>
          <p></p>
          <button className="primary-button">Check Attendance</button>
        </section>

        {/* <section className="section leaving-section">
          <h2 className="section-title">Leaving Form</h2>
          <p>Submit your leave request:</p>
          <button className="primary-button">Fill Leaving Form</button>
        </section> */}

        <section className="section notices-section">
          <h2 className="section-title">Hostel Notices</h2>
          <ul>
        {notices.map((notice) => (
          <li key={notice._id}>
            <h3>{notice.title}</h3>
            <p>{notice.description}</p>
            <small>{new Date(notice.createdAt).toLocaleString()}</small>
          </li>
        ))}
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

export default HomePageGuard;