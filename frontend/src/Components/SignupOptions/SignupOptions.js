import React from "react";
import { Link } from "react-router-dom";
import "./SignupOptions.css";

function SignupOptions({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Select Signup Role</h2>
        <div className="signup-buttons">
          <Link to="/RegisterForm" className="signup-link">
            Signup as Student
          </Link>
          <Link to="/SignupRector" className="signup-link">
            Signup as Rector/Warden/Guard
          </Link>
          {/* <Link to="/SignupGuard" className="signup-link">
            Signup as Guard
          </Link> */}
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SignupOptions;
