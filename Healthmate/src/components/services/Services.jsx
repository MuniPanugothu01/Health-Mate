import React from "react";
import { motion } from "framer-motion";
import "./Services.css";
import { FaStethoscope, FaComments, FaCalendarCheck, FaTasks, FaHeartbeat } from "react-icons/fa";

const serviceData = [
  {
    icon: <FaStethoscope />,
    title: "AI Symptom Checker",
  },
  {
    icon: <FaComments />,
    title: "Voice & Language Chatbot",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Doctor Appointment Scheduling",
  },
  {
    icon: <FaTasks />,
    title: "Daily Health Tasks & Rewards",
  },
  {
    icon: <FaHeartbeat />,
    title: "Personalized Health Tips",
  },
];

const Services = () => {
  return (
    <div className="services-wrapper">
      <motion.h2
        className="services-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our Services
      </motion.h2>
      <div className="services-container">
        {serviceData.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-text">{service.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;