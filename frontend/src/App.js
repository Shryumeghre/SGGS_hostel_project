import React, { useState } from "react";
import SignupRector from "./Components/SignupRector/SignupRector.js";
import SignupGuard from "./Components/SignupGuard/SignupGuard.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
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
          {/* <Route path="/SignupStudent" element={<SignupStudent />} /> */}
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/SignupGuard" element={<SignupGuard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
