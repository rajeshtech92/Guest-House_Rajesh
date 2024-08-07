import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/UserRegistrationComp/LoginPage';
import Registration from './Components/UserRegistrationComp/Registration';
import ForgotPassword from './Components/UserRegistrationComp/ForgotPassword';
import ChangePassword from './Components/UserRegistrationComp/ChangePassword';
import UserProfilePage from './Components/UserRegistrationComp/UserProfilePage';
import HeaderBar from './Components/HeaderComp/Headerbar';  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/headerHome" element={<HeaderBar />} />
      
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
