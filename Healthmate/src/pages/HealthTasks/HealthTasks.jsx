import React, { useState, useEffect } from "react";
import { X, CheckCircle, Apple } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../components/LiveChat/doctorsData";

const HealthTasks = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [tasks, setTasks] = useState([]);
  const [coins, setCoins] = useState(0);
  const [foodSuggestions, setFoodSuggestions] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is visiting for the first time
  useEffect(() => {
    const savedData = localStorage.getItem("healthUserData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserData(parsedData);
      setCoins(parsedData.coins || 0);
      setTasks(parsedData.tasks || []);
      fetchHealthSuggestions(parsedData);
    } else {
      setShowModal(true);
    }
  }, []);

  // Generate tasks based on age and BMI
  const generateTasks = (data) => {
    const { age, height, weight } = data;
    const heightInMeters = parseFloat(height) / 100;
    const bmi = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(1);
    let newTasks = [];

    if (age < 18) {
      newTasks = [
        { id: 1, name: "Drink 1.5L of water", completed: false, coins: 10 },
        { id: 2, name: "30-min outdoor play", completed: false, coins: 15 },
        { id: 3, name: "Eat 2 servings of fruits", completed: false, coins: 10 },
      ];
    } else if (age >= 18 && age <= 40) {
      if (bmi < 18.5) {
        newTasks = [
          { id: 1, name: "Eat a protein-rich breakfast", completed: false, coins: 10 },
          { id: 2, name: "30-min brisk walking", completed: false, coins: 15 },
          { id: 3, name: "Drink 2L of water", completed: false, coins: 10 },
        ];
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        newTasks = [
          { id: 1, name: "30-min moderate exercise", completed: false, coins: 15 },
          { id: 2, name: "Eat a balanced meal", completed: false, coins: 10 },
          { id: 3, name: "10-min stretching", completed: false, coins: 10 },
        ];
      } else {
        newTasks = [
          { id: 1, name: "45-min walking", completed: false, coins: 15 },
          { id: 2, name: "Eat a low-carb meal", completed: false, coins: 10 },
          { id: 3, name: "Drink 2.5L of water", completed: false, coins: 10 },
        ];
      }
    } else {
      newTasks = [
        { id: 1, name: "20-min gentle walk", completed: false, coins: 10 },
        { id: 2, name: "Eat a fiber-rich meal", completed: false, coins: 10 },
        { id: 3, name: "5-min breathing exercise", completed: false, coins: 10 },
      ];
    }

    // Set health status based on BMI
    let status = "";
    if (bmi < 18.5) {
      status = "underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = "normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      status = "overweight";
    } else {
      status = "obese";
    }
    setHealthStatus(status);
    setTasks(newTasks);
    setUserData({ ...data, tasks: newTasks });
    localStorage.setItem("healthUserData", JSON.stringify({ ...data, tasks: newTasks, coins }));
  };

  // Fetch health suggestions from Gemini API
  const fetchHealthSuggestions = async (data) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in .env file.");
      }

      const heightInMeters = parseFloat(data.height) / 100;
      const bmi = (parseFloat(data.weight) / (heightInMeters * heightInMeters)).toFixed(1);
      const healthStatus = bmi < 18.5 ? "underweight" : bmi <= 24.9 ? "normal weight" : bmi <= 29.9 ? "overweight" : "obese";
      const query = `${data.name}, ${data.gender}, ${data.age} years, ${data.weight}kg, ${data.height}cm, BMI ${bmi} (${healthStatus})`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a health assistant. For a user with the profile "${query}", provide:
                    - Specialization (e.g., Cardiologist, Dietitian)
                    - Detailed food recommendations including specific meals, portion sizes, and nutritional benefits
                    Format the response as JSON, without wrapping it in Markdown or code blocks.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log("Gemini API response:", JSON.stringify(dataResponse, null, 2));

      if (!dataResponse.candidates || !Array.isArray(dataResponse.candidates) || dataResponse.candidates.length === 0) {
        throw new Error("Invalid API response: candidates missing or empty");
      }

      const candidate = dataResponse.candidates[0];
      if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0] || !candidate.content.parts[0].text) {
        throw new Error("Invalid API response: content structure missing");
      }

      let text = candidate.content.parts[0].text;
      if (text.startsWith("```json") && text.endsWith("```")) {
        text = text.replace(/^```json\n/, "").replace(/\n```$/, "");
      }

      let content;
      try {
        content = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Failed to parse API response as JSON: " + parseError.message);
      }

      if (!content || typeof content !== "object") {
        throw new Error("Parsed content is not a valid object");
      }

      const specialization = Array.isArray(content.specialization)
        ? content.specialization[0]
        : content.specialization || "Dietitian";

      setFoodSuggestions(content.food_recommendations || "Balanced diet with fruits, vegetables, and proteins");
      setSpecialization(specialization);

      // Filter doctors based on specialization
      const filtered = doctorsData.filter((doctor) =>
        specialization
          ? doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
          : true
      );
      setFilteredDoctors(filtered.length ? filtered : doctorsData);
    } catch (error) {
      console.error("Error with Gemini API:", error.message, error.stack);
      setFoodSuggestions("Balanced diet with fruits, vegetables, and proteins");
      setSpecialization("Dietitian");
      setFilteredDoctors(doctorsData);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !age || !height || !weight) {
      alert("Please fill in all fields.");
      return;
    }

    const userInfo = {
      name,
      gender,
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      coins: 0,
      tasks: [],
    };
    setUserData(userInfo);
    localStorage.setItem("healthUserData", JSON.stringify(userInfo));
    generateTasks(userInfo);
    fetchHealthSuggestions(userInfo);
    setShowModal(false);
  };

  // Handle task completion
  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    const earnedCoins = tasks.find((task) => task.id === taskId).coins;
    const newCoins = coins + earnedCoins;

    setTasks(updatedTasks);
    setCoins(newCoins);
    setUserData({ ...userData, tasks: updatedTasks, coins: newCoins });
    localStorage.setItem("healthUserData", JSON.stringify({ ...userData, tasks: updatedTasks, coins: newCoins }));

    // Check if all tasks are completed
    if (updatedTasks.every((task) => task.completed)) {
      setShowCongratsModal(true);
    }
  };

  // Handle book appointment
  const handleBookAppointment = (doctor) => {
    navigate("/booking", { state: { doctor } });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const hoverVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-teal-100 p-8 pt-24">
      {/* Initial Modal for User Details */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/30"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Welcome to HealthMate</h2>
                <X
                  className="text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white/50"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Age (years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 25"
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 170"
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 70"
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white/50"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                >
                  Get Started
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Congratulations Modal */}
      <AnimatePresence>
        {showCongratsModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/30 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Apple className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Congratulations, {userData?.name}!
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                You've completed all your daily tasks and earned <span className="font-bold text-blue-600">{coins} coins</span>! Keep up the amazing work!
              </p>
              <motion.button
                onClick={() => setShowCongratsModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="text-center mb-16">
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4 tracking-tight"
          >
            Your Health Journey, {userData?.name || "User"}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-xl max-w-2xl mx-auto"
          >
            Complete your daily tasks to earn coins and unlock a healthier you!
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-blue-600 font-semibold text-2xl mt-4"
          >
            Your Coins: <span className="font-bold">{coins} 🪙</span>
          </motion.p>
        </header>

        {/* Food Suggestions */}
        {foodSuggestions && (
          <motion.div
            variants={itemVariants}
            className="mb-16 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30"
          >
            <div className="flex items-center mb-4">
              <Apple className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Personalized Nutrition Plan</h2>
            </div>
            <p className="text-gray-700 text-lg mb-4">
              {userData?.name}, based on your profile (Gender: {userData?.gender}, Age: {userData?.age}, Height: {userData?.height}cm, Weight: {userData?.weight}kg), you are <span className="font-semibold text-blue-600">{healthStatus}</span>.
            </p>
            <p className="text-gray-700 text-lg">{foodSuggestions}</p>
            {loading && (
              <p className="text-center mt-6 text-blue-600 animate-pulse font-semibold text-lg">
                Crafting your personalized nutrition plan...
              </p>
            )}
          </motion.div>
        )}

        {/* Tasks */}
        {tasks.length > 0 && (
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Daily Tasks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={hoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/30"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {task.name}
                    </h3>
                    {task.completed ? (
                      <CheckCircle className="text-green-500 w-6 h-6" />
                    ) : (
                      <motion.button
                        onClick={() => handleTaskComplete(task.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-200"
                      >
                        Complete
                      </motion.button>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">Reward: {task.coins} coins</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommended Doctors */}
        {specialization && filteredDoctors.length > 0 && (
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recommended Doctors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={index}
                  variants={hoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/30"
                >
                  <motion.img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-100 object-cover shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="text-xl font-semibold mt-4 text-center text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-indigo-600 text-center font-medium mt-1">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-1">{doctor.hospital}</p>
                  <p className="text-sm text-gray-600 text-center mt-1">{doctor.location}</p>
                  <p className="text-sm text-center mt-2 text-gray-700">
                    <strong>Languages:</strong> {doctor.languages.join(", ")}
                  </p>
                  <p className="text-center mt-3 text-green-600 font-bold text-xl">
                    ₹{doctor.price}
                  </p>
                  <motion.button
                    onClick={() => handleBookAppointment(doctor)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold"
                  >
                    Book Appointment
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HealthTasks;