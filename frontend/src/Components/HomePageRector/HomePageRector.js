import React, { useState,useEffect }from "react";
import "./HomePageRector.css";
import { Link ,useNavigate} from 'react-router-dom';
import SignupOptions from "../SignupOptions/SignupOptions.js";
// import collegeLogo from "./collegeLogo.png";

const HomePageRector = () => {
  const navigate = useNavigate();
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [notices, setNotices] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5001/api/notices/All")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title cannot be empty");

    const response = await fetch("http://localhost:5001/api/notices/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      const newNotice = await response.json();
      setNotices([...notices, newNotice]);
      setTitle("");
    }
  };

  const handleRemoveNotice = async (id) => {
    await fetch(`http://localhost:5001/api/notices/${id}`, { method: "DELETE" });

    setNotices(notices.filter((notice) => notice._id !== id));
  };

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
      <h1> Rector/Warden Section</h1>
        <section className="section attendance-section">
          <h2 className="section-title">Attendance</h2>
          {/* <p></p> */}
          <button className="primary-button">Check Attendance</button>
        </section>

        <section className="section leaving-section">
          <h2 className="section-title">Leaving Form</h2>
          {/* <p>Submit your leave request:</p> */}
          <button className="primary-button" onClick={()=> navigate('/LeaveApplicationPage')}>check all Leaving Forms</button>
        </section>

        <section className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <div className="notice-board">
      <h2 className="title">📢 Notice Board</h2>
      <form onSubmit={handleAddNotice} className="notice-form">
        <input
          type="text"
          placeholder="Enter Notice Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notice-input"
        />
        <button type="submit" className="post-button">Post Notice</button>
      </form>

      {/* Notices List */}
      <div className="notice-list">
        {notices.length === 0 ? (
          <p className="no-notices">No notices posted yet.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice._id} className="notice-item">
              <span>{notice.title}</span>
              <button onClick={() => handleRemoveNotice(notice._id)} className="delete-button">❌ Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
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

export default HomePageRector;