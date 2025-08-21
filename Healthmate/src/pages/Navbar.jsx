import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "./Sign/AuthForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleAuthForm = () => setShowAuthForm(!showAuthForm);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthForm(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, color: "#3b82f6", transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      <motion.nav
        className="bg-gradient-to-r from-blue-900 to-blue-500 text-white fixed top-0 left-0 w-full z-50 shadow-lg"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">
            {/* Logo */}
            <motion.div
              className="text-2xl font-extrabold text-blue-100 uppercase tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              HEALTHMATE
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/appointments", label: "Appointment" },
                { path: "/contact", label: "Contact Us" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`text-lg text-slate-200 font-medium relative hover:text-blue-200 transition-colors ${
                      location.pathname === item.path
                        ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons (Desktop) */}
            <motion.div
              className="hidden lg:flex items-center gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {isLoggedIn ? (
                <>
                  <Link to="/livechat">
                    <motion.button
                      className="bg-blue-800 text-white px-5 py-2 rounded-xl hover:bg-blue-900 hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LIVE CHAT
                    </motion.button>
                  </Link>
                  <Link to="/ai">
                    <motion.div
                      className="flex items-center gap-2 px-5 py-3 text-white rounded-xl bg-gradient-to-r from-[#5bfcc4] to-[#71a4f0] shadow-[inset_0_0_5px_#ffffffa9,inset_0_35px_30px_#000,0_5px_10px_#000000cc] relative cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ask Spacious AI
                    </motion.div>
                  </Link>
                </>
              ) : (
                <motion.button
                  className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all"
                  onClick={toggleAuthForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SIGN IN
                </motion.button>
              )}
            </motion.div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="lg:hidden flex flex-col items-center gap-4 p-4 bg-blue-800"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/appointments", label: "Appointment" },
                  { path: "/contact", label: "Contact Us" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <Link
                      to={item.path}
                      className={`text-lg text-slate-200 hover:text-blue-200 relative transition-colors ${
                        location.pathname === item.path
                          ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn ? (
                  <>
                    <motion.div variants={linkVariants}>
                      <Link to="/livechat" onClick={() => setIsOpen(false)}>
                        <button className="bg-blue-800 text-white px-5 py-2 rounded-xl hover:bg-blue-900 hover:shadow-lg w-full transition-all">
                          LIVE CHAT
                        </button>
                      </Link>
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-center gap-2 px-5 py-3 text-white rounded-xl bg-gradient-to-r from-[#5bfcc4] to-[#71a4f0] shadow-[inset_0_0_5px_#ffffffa9,inset_0_35px_30px_#000,0_5px_10px_#000000cc] w-full"
                      variants={linkVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ask Spacious AI
                    </motion.div>
                  </>
                ) : (
                  <motion.button
                    className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 hover:shadow-lg w-full transition-all"
                    onClick={toggleAuthForm}
                    variants={linkVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SIGN IN
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      {/* Modal for Auth Form */}
      {showAuthForm && (
        <AuthForm onClose={toggleAuthForm} onLogin={handleLoginSuccess} />
      )}
    </>
  );
};

export default Navbar;
