import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupRector from "./Components/SignupRector/SignupRector.js";
import RegisterForm from "./Components/SignupStudent/RegisterForm.js";
import SignupOptions from "./Components/SignupOptions/SignupOptions.js";
import HomePageRector from "./Components/HomePageRector/HomePageRector.js";
import HomePageGuard from "./Components/HomePageGuard/HomePageGuard.js";
import HomePageStudent from "./Components/HomePageStudent/HomePageStudent.js";
import LeaveApplicationPage from "./Components/LeaveApplicationPage/LeaveApplicationPage.js";
// import HomePage from "./src/Components/HomePage/HomePage.js";
import FormListOfUser from "./Components/FormListOfUser/FormListOfUser.js";
import FormDetail from "./Components/FormDetail/FormDetail.js";
import StatusTracker from "./Components/StatusTracker/StatusTracker.js";  
import LeaveForm from "./Components/LeaveForm/LeaveForm.js";
import RejectPage from "./Components/RejectForm.js";
import LoginPage from "./Components/LoginPage/LoginPage.js";
import Home from "./Components/Home/Home.js";
// import ErrorBoundary from "./Components/ErrorBoundary.js" // Import error boundary
import GuestRoom from "./Components/GuestRoom/GuestRoom.js";
import "./App.css";
// import { Router } from "express";


const App = () => {
  return (
   
    <Router> 
      {/* <Home/> */}
      <div>
        {/* <HomePageGuard> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/HomePage" element={<HomePage />} />  */}
          <Route path="/SignupOptions" element={<SignupOptions />} />
          <Route path="/SignupRector" element={<SignupRector />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          {/* <Route path="/SignupRector" element={<SignupRector />} /> */}
          {/* <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} /> */}
          <Route path="/HomePageRector" element={<HomePageRector />} />
          <Route path="/HomePageGuard" element={<HomePageGuard />} />
          <Route path="/HomePageStudent" element={<HomePageStudent />} />
          <Route path="/LeaveApplicationPage" element={<LeaveApplicationPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/status-track/:formId" element={<StatusTracker />} />  
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/leaveForm" element={<LeaveForm/>} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
          <Route path="/leave" element={<LeaveForm />} />
          <Route path="reject/:formId" element={<RejectPage/>}/>
          <Route path="/guestRoom" element={<GuestRoom/>}/>
          <Route path="/formlist" element={<FormListOfUser/>}/>
          <Route path="/formDetail/:formId" element={<FormDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
