import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import contactBg from "../../assets/ContactUs.jpg";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  return (
    <>
      <div
        className="contact-section"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <motion.div
          className="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h2
              className="footer-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact Us
            </motion.h2>
            <motion.input
              type="text"
              placeholder="Your Name"
              required
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              required
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
            <motion.textarea
              placeholder="Your Message"
              rows="4"
              required
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;