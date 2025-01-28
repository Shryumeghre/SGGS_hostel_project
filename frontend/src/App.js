
import React from "react";
// import { Link } from 'react-router-dom';
import SignupRector from "./Components/SignupRector/SignupRector.js";
import RegisterForm from "./Components/SignupStudent/RegisterForm.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import HomePageRector from "./Components/HomePageRector/HomePageRector.js";
import HomePageGuard from "./Components/HomePageGuard/HomePageGuard.js";
import HomePageStudent from "./Components/HomePageStudent/HomePageStudent.js";
import LeaveApplicationPage from "./Components/LeaveApplicationPage/LeaveApplicationPage.js";
import HomePage from "./Components/HomePage/HomePage.js";
import Login  from "./Components/Login/Login.js";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import "./App.css";

const App = () => {
  return (
   
    <Router> 
      {/* <HomePage/> */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignupOptions" element={<SignupOptions />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/HomePageRector" element={<HomePageRector />} />
          <Route path="/HomePageGuard" element={<HomePageGuard />} />
          <Route path="/HomePageStudent" element={<HomePageStudent />} />
          <Route path="/LeaveApplicationPage" element={<LeaveApplicationPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterForm />} />
         
        </Routes>
      </div>

    </Router>
  );
}
export default App;