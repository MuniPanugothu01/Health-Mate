import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const linkVariants = {
    hover: { x: 5, color: "#bfdbfe", transition: { duration: 0.3 } },
  };

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* About Section */}
        <motion.div className="footer-section" variants={itemVariants}>
          <motion.h2 
            className="footer-title"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            About HealthMate
          </motion.h2>
          <motion.p variants={itemVariants}>
            HealthMate is your AI-powered smart healthcare assistant—making health
            support accessible, affordable, and personalized through voice,
            regional language support, and gamified health habits.
          </motion.p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div className="footer-section" variants={itemVariants}>
          <motion.h2 
            className="footer-title"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Navigation
          </motion.h2>
          <ul className="footer-list">
            {["/", "/about", "/services", "/contact"].map((path, index) => (
              <motion.li 
                key={index} 
                variants={itemVariants}
                whileHover="hover"
              >
                <Link 
                  to={path} 
                  className="footer-link"
                  variants={linkVariants}
                >
                  {["Home", "About Us", "Services", "Contact"][index]}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Our Services List */}
        <motion.div className="footer-section" variants={itemVariants}>
          <motion.h2 
            className="footer-title"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Our Services
          </motion.h2>
          <ul className="footer-list">
            {[
              "AI Symptom Checker",
              "Voice & Language Chatbot",
              "Appointment Scheduling",
              "Daily Health Tasks",
              "Personalized Health Tips",
            ].map((service, index) => (
              <motion.li
                key={index}
                className="footer-link"
                variants={itemVariants}
                whileHover="hover"
                variants={linkVariants}
              >
                {service}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="footer-section" variants={itemVariants}>
          <motion.h2 
            className="footer-title"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Contact Us
          </motion.h2>
          <ul className="footer-list">
            <motion.li variants={itemVariants} whileHover="hover">
              <a 
                href="mailto:support@healthmate.ai" 
                className="footer-link"
                variants={linkVariants}
              >
                support@healthmate.ai
              </a>
            </motion.li>
            <motion.li variants={itemVariants} whileHover="hover">
              <a 
                href="tel:+919876543210" 
                className="footer-link"
                variants={linkVariants}
              >
                +91 98765 43210
              </a>
            </motion.li>
            <motion.li 
              className="footer-link" 
              variants={itemVariants}
              whileHover="hover"
              variants={linkVariants}
            >
              Hyderabad, India
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="footer-bottom"
        variants={itemVariants}
        initial="hidden"
        animate={controls}
      >
        <p>&copy; {new Date().getFullYear()} HealthMate. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;