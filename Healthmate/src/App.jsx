import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import AboutUs from "./components/Abouts/AboutUs.jsx";
import Services from "./components/services/Services.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LiveChat from "./components/LiveChat/LiveChat.jsx";
import Booking from "./components/Booking/Booking.jsx";
import Appointment from "./components/Appoitments/Appoitment.jsx";
import SpaciousAI from "../src/pages/SpaciousAI/SpaciousAI.jsx";
import HealthTasks from "./pages/HealthTasks/HealthTasks.jsx";
import DoctorProfile from "./components/Doctor/DoctorProfile.jsx";
import Admin from "./components/Admin/Admin.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Homepage shows everything stacked like a landing page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Services />
              <AboutUs />
              <ContactUs />
              {/* <Footer /> */}
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/livechat" element={<LiveChat />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/ai" element={<SpaciousAI />} />
        <Route path="/HealthTasks" element={<HealthTasks />} />
        <Route path="/doctor" element={<DoctorProfile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
