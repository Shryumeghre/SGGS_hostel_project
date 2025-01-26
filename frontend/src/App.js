
import RegisterForm from "../src/Components/RegisterForm";
import React, { useState } from "react";
import SignupRector from "./Components/SignupRector/SignupRector.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


const App = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  return (
    <Router>
      <div className="app">
        <button
          className="open-signup-btn"
          onClick={() => setShowSignupOptions(true)}
        >
          Signup
        </button>

        {showSignupOptions && (
          <SignupOptions onClose={() => setShowSignupOptions(false)} />
        )}

        <Routes>
          <Route path="/SignupRector" element={<SignupRector />} />
          {/* Add any other routes here */}
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
