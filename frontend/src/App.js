<<<<<<< HEAD
import React from "react";
import RegisterForm from "../src/Components/RegisterForm";

const App = () => {
    return <RegisterForm />;
};
=======
import React, { useState } from "react";
import SignupRector from "./Components/SignupRector/SignupRector.js";
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
        </Routes>
      </div>
    </Router>
  );
}
>>>>>>> db60472de0c70613d9054bcca74c3d82c9cb3808

export default App;
