
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import SignupRector from "./Components/SignupRector/SignupRector.js";
import RegisterForm from "./Components/SignupStudent/RegisterForm.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import HomePage from "./Components/HomePage/HomePage.js";
import LeaveForm from "./Components/LeaveForm/LeaveForm.js";
import RejectPage from "./Components/RejectForm.js";
import LoginPage from "./Components/LoginPage/LoginPage.js";
import Home from "./Components/Home/Home.js";
import ErrorBoundary from "./Components/ErrorBoundary.js" // Import error boundary
import GuestRoom from "./Components/GuestRoom/GuestRoom.js";
import "./App.css";

const App = () => {
  return (
   
    <Router> 
      {/* <Home/> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HomePage" element={<HomePage />} /> 
          <Route path="/SignupOptions" element={<SignupOptions />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LeaveForm/>} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
          <Route path="/leave" element={<LeaveForm />} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
          <Route path="/guestRoom" element={<GuestRoom/>}/>
        </Routes>
      </div>

    </Router>
  );
}
export default App;