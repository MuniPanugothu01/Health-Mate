import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./AboutUs.css";
import aboutImg from "../../assets/About-us.jpg";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <section className="about-wrapper" ref={ref}>
        <motion.h1
          className="about-main-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          About Us
        </motion.h1>
        <motion.div
          className="about-container"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="about-image" variants={itemVariants}>
            <motion.img
              src={aboutImg}
              alt="About HealthMate"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div className="about-content" variants={itemVariants}>
            <motion.h2 className="about-title" variants={itemVariants}>
              About HealthMate
            </motion.h2>
            <motion.p className="about-text" variants={itemVariants}>
              HealthMate is an AI-powered virtual healthcare assistant aimed at
              making healthcare accessible, affordable, and easy to use. With
              multilingual voice/text chatbot support, automated appointment
              booking, and gamified health habits, we empower users across rural
              and urban regions alike.
            </motion.p>
            <motion.button
              className="about-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;