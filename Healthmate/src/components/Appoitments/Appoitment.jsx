import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleCancel = (indexToRemove) => {
    const updated = appointments.filter((_, idx) => idx !== indexToRemove);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-10"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.h2
        className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-tight"
        variants={cardVariants}
      >
        Your Appointments
      </motion.h2>

      {appointments.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 text-lg"
          variants={cardVariants}
        >
          No appointments found.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {appointments.map((appt, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Cancel Button */}
              <motion.div
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() => handleCancel(index)}
                  />
                  <div className="peer ring-0 bg-rose-500 rounded-full outline-none duration-300 after:duration-500 w-10 h-10 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0"></div>
                </label>
              </motion.div>

              {/* Doctor Image */}
              {appt.doctor?.image && (
                <motion.img
                  src={appt.doctor.image}
                  alt={appt.doctor.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4 mx-auto object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}

              {/* Doctor Info */}
              <h3 className="text-xl font-semibold text-center text-gray-800">
                {appt.doctor?.name}
              </h3>
              <p className="text-blue-600 text-center mb-4 font-medium">
                {appt.doctor?.specialization}
              </p>

              {/* Appointment Details */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-800">Date:</strong>{" "}
                  {appt.selectedDate}
                </p>
                <p>
                  <strong className="text-gray-800">Time:</strong>{" "}
                  {appt.selectedTime}
                </p>
                <p>
                  <strong className="text-gray-800">Name:</strong> {appt.name}
                </p>
                <p>
                  <strong className="text-gray-800">Email:</strong> {appt.email}
                </p>
                <p>
                  <strong className="text-gray-800">Company:</strong>{" "}
                  {appt.company}
                </p>
                <p>
                  <strong className="text-gray-800">Message:</strong>{" "}
                  {appt.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Appointment;
