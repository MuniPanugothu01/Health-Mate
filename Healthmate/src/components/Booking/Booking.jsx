import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = [
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const Booking = () => {
  const { state } = useLocation();
  const doctor = state?.doctor;

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const scrollRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-100px" });
  const formControls = useAnimation();
  const infoControls = useAnimation();

  useEffect(() => {
    if (formInView) {
      formControls.start("visible");
    }
    if (infoInView) {
      infoControls.start("visible");
    }
  }, [formInView, infoInView, formControls, infoControls]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const weekdays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdays.push({
          label: `${days[dayOfWeek]}, ${day} ${months[selectedMonth]} ${selectedYear}`,
        });
      }
    }

    setAvailableDates(weekdays);
    setSelectedDate("");
    setSelectedTime("");
  }, [selectedYear, selectedMonth]);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !company ||
      !message ||
      !selectedDate ||
      !selectedTime
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill all required fields.",
      });
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));

      const appointment = {
        doctor,
        selectedDate,
        selectedTime,
        name,
        email,
        company,
        message,
      };

      const existingAppointments =
        JSON.parse(localStorage.getItem("appointments")) || [];
      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, appointment])
      );

      setFormStatus({ type: "success", message: "Booking successful!" });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      setFormStatus({ type: "error", message: "Submission failed." });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Booking Form */}
        <motion.div
          ref={formRef}
          className="w-full lg:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-blue-100"
          variants={containerVariants}
          initial="hidden"
          animate={formControls}
        >
          <motion.h2
            className="text-3xl font-bold text-blue-800 mb-6 tracking-tight"
            variants={itemVariants}
          >
            Book an Appointment
          </motion.h2>

          {doctor && (
            <motion.div
              className="flex items-center gap-4 mb-6"
              variants={itemVariants}
            >
              <motion.img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium">
                  {doctor.specialization}
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.input
              type="text"
              placeholder="Your Name *"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variants={itemVariants}
            />
            <motion.input
              type="email"
              placeholder="Email Address *"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variants={itemVariants}
            />
            <motion.input
              type="text"
              placeholder="Company *"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm transition-all"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              variants={itemVariants}
            />
            <motion.textarea
              placeholder="Message *"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm transition-all"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variants={itemVariants}
            />

            {/* Year & Month Select */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-1/2 px-4 py-3 border border-blue-200 rounded-lg"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-1/2 px-4 py-3 border border-blue-200 rounded-lg"
              >
                {months.map((month, idx) => (
                  <option key={idx} value={idx}>
                    {month}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Scrollable Dates */}
            <motion.div
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <motion.button
                type="button"
                onClick={() => handleScroll("left")}
                className="p-2 rounded-full bg-blue-100 text-blue-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronLeft size={20} />
              </motion.button>

              <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto py-2 px-1 w-full"
                style={{ scrollBehavior: "smooth" }}
              >
                {availableDates.map((dateObj, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(dateObj.label)}
                    className={`min-w-max px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium ${
                      selectedDate === dateObj.label
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-100"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {dateObj.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={() => handleScroll("right")}
                className="p-2 rounded-full bg-blue-100 text-blue-600"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg"
                
              >
                <option className="" value="">Select Time</option>
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </motion.select>
            )}

            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </motion.button>

            {formStatus && (
              <motion.p
                className={`text-sm font-medium ${
                  formStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
               
              >
                {formStatus.message}
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          ref={infoRef}
          className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-blue-100 space-y-4 mt-6 lg:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate={infoControls}
        >
          <motion.h3
            className="text-xl font-semibold text-blue-800"
            variants={itemVariants}
          >
            What happens next?
          </motion.h3>
          <motion.ul
            className="list-disc ml-5 space-y-2 text-gray-700"
            variants={containerVariants}
          >
            {[
              "We’ll review your details",
              "Our team will reach out shortly",
              "You’ll get meeting details via email",
            ].map((item, idx) => (
              <motion.li key={idx} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Booking;
