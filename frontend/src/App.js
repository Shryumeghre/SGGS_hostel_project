
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SignupRector from "./Components/SignupRector/SignupRector.js";
import RegisterForm from "./Components/SignupStudent/RegisterForm.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import HomePage from "./Components/HomePage/HomePage.js";
import LeaveForm from "./Components/LeaveForm/LeaveForm.js";
import RejectPage from "./Components/RejectForm.js";
import LoginPage from "./Components/Login/Login.js";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import "./App.css";

const App = () => {
  return (
   
    <Router> 
      <HomePage/>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignupOptions" element={<SignupOptions />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LeaveForm/>} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
        </Routes>
      </div>

    </Router>
  );
}
export default App;