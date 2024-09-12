import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/UserRegistrationComp/LoginPage';
import Registration from './Components/UserRegistrationComp/Registration';
import ForgotPassword from './Components/UserRegistrationComp/ForgotPassword';
import ChangePassword from './Components/UserRegistrationComp/ChangePassword';
import UserProfilePage from './Components/UserRegistrationComp/UserProfilePage';
import HeaderBar from './Components/HeaderComp/Headerbar'; 
import Banquet from './Components/BanquetPageComp/Banquet' ;
import MenuImage from './Components/MenuPageComp/MenuImage';
import Catering from './Components/CateringCom/Catering';
import Gallery from './Components/GalleryComp/Gallery';
import Order from './Components/OrderPageComp/Order';
import Location from './Components/LocationCom/Location';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="//headerHome/*" element={<HeaderBar />} />
        <Route path="/banquetPage/*" element={<Banquet />} />
        <Route path="/orderPage/*" element={<Order />} />
        <Route path="/menuPage/*" element={<MenuImage />} />
        <Route path="/cateringPage/*" element={<Catering />} />
        <Route path="/galleryPage/*" element={<Gallery />} />
        <Route path="/locationPage/*" element={<Location />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
