import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import doctorsData from "./doctorsData";

const categories = [
  "All",
  "Kidney Specialist",
  "Cardiologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
];

const LiveChat = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesCategory =
      selectedCategory === "All" || doctor.specialization === selectedCategory;
    const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (doctor) => {
    navigate("/booking", { state: { doctor } });
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const categoryVariants = {
    hover: { scale: 1.05, backgroundColor: "#dbeafe", color: "#1e40af", transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
    hover: { scale: 1.03, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-20"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sticky Sidebar Categories */}
        <motion.aside 
          className="lg:w-1/4 w-full space-y-6 sticky top-24 h-fit"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-800 tracking-tight"
            variants={itemVariants}
          >
            Specialists
          </motion.h2>
          <ul className="space-y-3">
            {categories.map((category) => (
              <motion.li
                key={category}
                className={`cursor-pointer px-4 py-3 rounded-lg border border-blue-200 transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setSelectedCategory(category)}
                variants={categoryVariants}
                whileHover="hover"
              >
                {category} (
                {category === "All"
                  ? doctorsData.length
                  : doctorsData.filter((d) => d.specialization === category).length}
                )
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* Main Area */}
        <motion.main 
          className="lg:w-3/4 w-full"
          variants={itemVariants}
        >
          {/* Search */}
          <motion.div 
            className="relative mb-8"
            variants={itemVariants}
          >
            <input
              type="text"
              placeholder="Search doctor by name..."
              className="w-full border border-blue-200 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </motion.div>

          {/* Doctors Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-5 border border-blue-100 flex items-center gap-5 hover:shadow-xl transition-shadow duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <motion.img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="font-bold text-lg text-gray-800">{doctor.name}</div>
                      <div className="text-blue-600 font-semibold mb-2">
                        {doctor.specialization}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
                        <p><strong>Hospital:</strong> {doctor.hospital}</p>
                        <p><strong>Location:</strong> {doctor.location}</p>
                        <p><strong>Consultation:</strong> ₹{doctor.price}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <motion.button
                        onClick={() => handleBookNow(doctor)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book An Appointment
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p 
                className="text-gray-500 text-lg text-center col-span-full"
                variants={itemVariants}
              >
                No doctors found.
              </motion.p>
            )}
          </div>
        </motion.main>
      </div>
    </motion.div>
  );
};

export default LiveChat;