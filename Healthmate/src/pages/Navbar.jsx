// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { motion, useInView, useAnimation } from "framer-motion";
// import AuthForm from "./Sign/AuthForm";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showAuthForm, setShowAuthForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const location = useLocation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-50px" });
//   const controls = useAnimation();

//   const toggleAuthForm = () => setShowAuthForm(!showAuthForm);
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     setShowAuthForm(false);
//   };

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const navVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const linkVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//     hover: { scale: 1.05, color: "#3b82f6", transition: { duration: 0.3 } },
//   };

//   const mobileMenuVariants = {
//     hidden: { opacity: 0, height: 0 },
//     visible: {
//       opacity: 1,
//       height: "auto",
//       transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
//     },
//   };

//   return (
//     <>
//       <motion.nav
//         className="bg-gradient-to-r from-blue-900 to-blue-500 text-white fixed top-0 left-0 w-full z-50 shadow-lg"
//         ref={ref}
//         variants={navVariants}
//         initial="hidden"
//         animate={controls}
//       >
//         <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//           <div className="flex  lg:flex-row items-center justify-between py-4 gap-4 lg:gap-0">
//             {/* Logo */}
//             <motion.div
//               className="text-2xl font-extrabold text-blue-100 uppercase tracking-wide"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               HEALTHMATE
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {[
//                 { path: "/", label: "Home" },
//                 { path: "/about", label: "About" },
//                 { path: "/appointments", label: "Appointment" },
//                 { path: "/contact", label: "Contact Us" },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   variants={linkVariants}
//                   initial="hidden"
//                   animate="visible"
//                   whileHover="hover"
//                   transition={{ delay: 0.3 + index * 0.1 }}
//                 >
//                   <Link
//                     to={item.path}
//                     className={`text-lg text-slate-200 font-medium relative hover:text-blue-200 transition-colors ${
//                       location.pathname === item.path
//                         ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400"
//                         : ""
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Auth Buttons */}
//             <motion.div
//               className="hidden lg:flex items-center gap-6"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             >
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/livechat">
//                     <motion.button
//                       className="bg-blue-800 text-white px-5 py-2 rounded-xl hover:bg-blue-900 hover:shadow-lg transition-all"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       LIVE CHAT
//                     </motion.button>
//                   </Link>
//                   <Link to="/ai">
//                     <motion.div
//                       className="flex items-center gap-2 px-5 py-3 text-white rounded-xl bg-gradient-to-r from-[#5bfcc4] to-[#71a4f0] shadow-[inset_0_0_5px_#ffffffa9,inset_0_35px_30px_#000,0_5px_10px_#000000cc] relative cursor-pointer"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {/* your existing SVG and text */}
//                       Ask Spacious AI
//                     </motion.div>
//                   </Link>
//                 </>
//               ) : (
//                 <motion.button
//                   className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all"
//                   onClick={toggleAuthForm}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   SIGN IN
//                 </motion.button>
//               )}
//             </motion.div>

//             {/* Mobile Toggle */}
//             <motion.div
//               className="lg:hidden flex justify-end"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//             >
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-white hover:text-blue-200 transition-colors"
//               >
//                 {isOpen ? <X size={28} /> : <Menu size={28} />}
//               </button>
//             </motion.div>
//           </div>

//           {/* Mobile Menu */}
//           {isOpen && (
//             <motion.div
//               className="lg:hidden flex flex-col items-center gap-4 p-4 bg-blue-800"
//               variants={mobileMenuVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {[
//                 { path: "/", label: "Home" },
//                 { path: "/about", label: "About" },
//                 { path: "/appointments", label: "Appointment" },
//                 { path: "/contact", label: "Contact Us" },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   variants={linkVariants}
//                   whileHover="hover"
//                 >
//                   <Link
//                     to={item.path}
//                     className={`text-lg text-slate-200 hover:text-blue-200 relative transition-colors ${
//                       location.pathname === item.path
//                         ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400"
//                         : ""
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.label}
//                   </Link>
//                 </motion.div>
//               ))}
//               {isLoggedIn ? (
//                 <>
//                   <motion.div variants={linkVariants}>
//                     <Link to="/livechat" onClick={() => setIsOpen(false)}>
//                       <button className="bg-blue-800 text-white px-5 py-2 rounded-xl hover:bg-blue-900 hover:shadow-lg w-full transition-all">
//                         LIVE CHAT
//                       </button>
//                     </Link>
//                   </motion.div>
//                   <motion.div
//                     className="flex items-center justify-center gap-2 px-5 py-3 text-white rounded-xl bg-gradient-to-r from-[#5bfcc4] to-[#71a4f0] shadow-[inset_0_0_5px_#ffffffa9,inset_0_35px_30px_#000,0_5px_10px_#000000cc] w-full"
//                     variants={linkVariants}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <svg
//                       viewBox="0 0 24 24"
//                       height="24"
//                       width="24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="flex-shrink-0"
//                     >
//                       <g fill="none">
//                         <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.10z" />
//                         <path
//                           d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
//                           fill="currentColor"
//                         />
//                       </g>
//                     </svg>
//                     Ask Spacious AI
//                   </motion.div>
//                 </>
//               ) : (
//                 <motion.button
//                   className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 hover:shadow-lg w-full transition-all"
//                   onClick={toggleAuthForm}
//                   variants={linkVariants}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   SIGN IN
//                 </motion.button>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </motion.nav>

//       {/* Modal for Auth Form */}
//       {showAuthForm && (
//         <AuthForm onClose={toggleAuthForm} onLogin={handleLoginSuccess} />
//       )}
//     </>
//   );
// };

// export default Navbar;

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
