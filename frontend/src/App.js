import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupRector from "./Components/SignupRector/SignupRector.js";
import RegisterForm from "./Components/SignupStudent/RegisterForm.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import HomePageRector from "./Components/HomePageRector/HomePageRector.js";
import HomePageGuard from "./Components/HomePageGuard/HomePageGuard.js";
import HomePageStudent from "./Components/HomePageStudent/HomePageStudent.js";
import LeaveApplicationPage from "./Components/LeaveApplicationPage/LeaveApplicationPage.js";
import HomePage from "./Components/HomePage/HomePage.js";
import FormListOfUser from "./Components/FormListOfUser/FormListOfUser.js";
import FormDetail from "./Components/FormDetail/FormDetail.js";
import StatusTracker from "./Components/StatusTracker/StatusTracker";  
import LeaveForm from "./Components/LeaveForm/LeaveForm.js";
import RejectPage from "./Components/RejectForm.js";
import LoginPage from "./Components/Login/Login.js";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        {/* <HomePageGuard> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignupOptions" element={<SignupOptions />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/HomePageRector" element={<HomePageRector />} />
          <Route path="/HomePageGuard" element={<HomePageGuard />} />
          <Route path="/HomePageStudent" element={<HomePageStudent />} />
          <Route path="/LeaveApplicationPage" element={<LeaveApplicationPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/status-track/:formId" element={<StatusTracker />} />  
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/leaveForm" element={<LeaveForm/>} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
          <Route path="/formlist" element={<FormListOfUser/>}/>
          <Route path="/formDetail/:formId" element={<FormDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
