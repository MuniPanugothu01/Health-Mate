import React from "react";
import { motion } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <motion.img
        src="/Doctor-img.jpeg"
        alt="Doctor"
        className="background-image"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="overlay">
        <motion.div
          className="text-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Revolutionize the Way You Manage Health
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            AI-powered support, personalized care, and rewards — all in your language.
          </motion.p>
          <div className="button-group flex justify-center items-center gap-4">
           <Link to="/contact">
            <motion.button
              className="get-in-touch"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Get in Touch <SlArrowRight size={14} />
            </motion.button></Link>
            <Link to="/HealthTasks">
            <motion.span
              className="see-more"
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              See More →
            </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;