import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
import ImageSlider from "../ImageSlider/ImageSlider.js"
import SignupOptions from "../SignupOptions/SignupOptions.js";
import GuestRoom from "../GuestRoom/GuestRoom.js";
import { motion } from "framer-motion";

const Home = () => {
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
        <img src="/collegeLogo.png" alt="College Logo" className="college-logo" />

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
      <ImageSlider />

        <main className="container">
        {/* <h1>HomePage</h1> */}

        <motion.section 
          className="section notices-section"
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Hostel Notices</h2>
          {notices.length === 0 ? (
            <p>No notices available.</p>
          ) : (
            <ul>
            {notices.map((notice) => (
                <motion.li 
                key={notice._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                <h3>{notice.title}</h3>
                <small>{new Date(notice.createdAt).toLocaleString()}</small>
                </motion.li>
            ))}
            </ul>
          )}
        </motion.section>

        <motion.section 
          className="section facilities-section"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">Facilities Provided</h2>
          <div className="facilities-grid">
            <motion.div className="facility-item">
              <img
                src="/images/maggi.jpg"
                alt="Facility 1"
                className="facility-image"
              />
              <p className="facility-text">Wi-Fi Enabled Campus</p>
            </motion.div>
            <motion.div className="facility-item">
              <img
                src="/images/momo.jpg"
                alt="Facility 2"
                className="facility-image"
              />
              <p className="facility-text">24/7 Security</p>
            </motion.div>
            <motion.div className="facility-item">
              <img
                src="/images/pizza.jpg"
                alt="Facility 3"
                className="facility-image"
              />
              <p className="facility-text">Recreational Rooms</p>
            </motion.div>
            <motion.div className="facility-item">
              <img
                src="/images/puri.jpg"
                alt="Facility 3"
                className="facility-image"
              />
              <p className="facility-text">Recreational Rooms</p>
            </motion.div>
            <motion.div className="facility-item">
              <img
                src="/images/rajmarice.jpg"
                alt="Facility 3"
                className="facility-image"
              />
              <p className="facility-text">Recreational Rooms</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="statistics-section"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stat-container">
            <motion.div className="stat-item">
              <h2 className="stat-number">2853</h2>
              <p className="stat-text">Undergraduate & Postgraduate Students</p>
            </motion.div>
            <motion.div className="stat-item">
              <h2 className="stat-number">171</h2>
              <p className="stat-text">SGGS College Faculty & Staff</p>
            </motion.div>
            <motion.div className="stat-item">
              <h2 className="stat-number">209202</h2>
              <p className="stat-text">Total Visitors</p>
            </motion.div>
            <motion.div className="stat-item">
              <h2 className="stat-number">400</h2>
              <p className="stat-text">Total Placement</p>
            </motion.div>
          </div>
        </motion.section>
        <GuestRoom />

        </main>

      {/* Footer Section */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 5, delay: 0.6 }}
      >
        <p>&copy; 2025 SGGS Institute | All Rights Reserved.</p>
        <p>Contact: hostel-admin@sggs.ac.in</p>
      </motion.footer>
    </div>
  );
};

export default Home;