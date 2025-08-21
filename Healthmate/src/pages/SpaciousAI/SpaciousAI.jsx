import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../../components/LiveChat/doctorsData";

const SpaciousAI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const navigate = useNavigate();

  const interpretQueryWithGemini = async (query) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in .env file.");
      }

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
                    text: `You are a health assistant. For the query "${query}", provide:
                    - Specialization (e.g., Cardiologist, Dermatologist)
                    - Description of the issue
                    - Suggested action
                    - Recommended foods (comma-separated)
                    - Recommended vitamins (comma-separated)
                    - Suggested workouts (list with description and a placeholder image URL)
                    If the query includes age, weight, and height (e.g., "23 years 52kg 175cm"), calculate BMI and suggest relevant actions. If no specific issue is identified, provide general health advice. Format the response as JSON, without wrapping it in Markdown or code blocks.`,
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

      const data = await response.json();
      console.log("Gemini API response:", JSON.stringify(data, null, 2)); // Debug log

      // Validate response structure
      if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
        throw new Error("Invalid API response: candidates missing or empty");
      }

      const candidate = data.candidates[0];
      if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0] || !candidate.content.parts[0].text) {
        throw new Error("Invalid API response: content structure missing");
      }

      let text = candidate.content.parts[0].text;
      // Strip Markdown code block if present
      if (text.startsWith){
        text = text.replace(/^```json\n/, "").replace(/\n```$/, "");
      }

      let content;
      try {
        content = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Failed to parse API response as JSON: " + parseError.message);
      }

      // Validate content structure
      if (!content || typeof content !== "object") {
        throw new Error("Parsed content is not a valid object");
      }

      // Handle specialization as array or string
      const specialization = Array.isArray(content.specialization)
        ? content.specialization[0] // Use first specialization for filtering
        : content.specialization || "";

      return {
        specialization,
        description: content.description || "No specific medical issue identified.",
        solution: content.suggested_action || "Please provide clearer symptoms or health information.",
        food: content.recommended_foods || "Balanced diet with fruits and proteins.",
        vitamins: content.recommended_vitamins ? content.recommended_vitamins.split(", ") : ["Multivitamin"],
        workouts: content.suggested_workouts
          ? content.suggested_workouts.map((w) => ({
              desc: w.description,
              image: w.image_url || "https://via.placeholder.com/150",
            }))
          : [],
      };
    } catch (error) {
      console.error("Error with Gemini API:", error.message, error.stack);
      return {
        specialization: "",
        description: "Failed to fetch AI response. Please try again.",
        solution: "Check your query or try again later.",
        food: "Balanced diet with fruits and proteins.",
        vitamins: ["Multivitamin"],
        workouts: [],
      };
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (!query.trim()) {
      setAiResponse(null);
      setFilteredDoctors(doctorsData);
      return;
    }

    const ai = await interpretQueryWithGemini(query);
    setAiResponse(ai);

    // Filter doctors based on specialization
    const filtered = doctorsData.filter((doctor) =>
      ai.specialization
        ? doctor.specialization.toLowerCase().includes(ai.specialization.toLowerCase())
        : true
    );

    setFilteredDoctors(filtered.length ? filtered : doctorsData);
  };

  const handleBookAppointment = (doctor) => {
    navigate("/booking", { state: { doctor } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 pt-24">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Ask Spacious AI
        </h1>
        <p className="text-gray-600 text-lg">Get personalized health tips and find doctors</p>
      </header>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative group">
          <input
            type="text"
            placeholder="e.g., chest pain, 23 years 52kg 175cm"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-blue-200 rounded-full shadow-md focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
          <ArrowRight
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 cursor-pointer group-hover:scale-110 transition-transform duration-200"
            onClick={() => handleSearch(searchTerm)}
          />
        </div>
        {loading && (
          <p className="text-center mt-4 text-blue-600 animate-pulse font-medium">
            Analyzing your query with Spacious AI...
          </p>
        )}
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related: <span className="text-blue-600">{aiResponse.specialization || "General Health"}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong className="font-semibold">Description:</strong>{" "}
                {aiResponse.description}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Suggested Action:</strong>{" "}
                {aiResponse.solution}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Recommended Food:</strong>{" "}
                {aiResponse.food}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Vitamins:</strong>{" "}
                {aiResponse.vitamins.join(", ")}
              </p>
            </div>
            {aiResponse.workouts.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Workouts</h3>
                <div className="grid grid-cols-1 gap-6">
                  {aiResponse.workouts.map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <img
                        src={w.image}
                        alt="Workout"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <p className="text-gray-800 text-center font-medium">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommended Doctors */}
      {aiResponse && filteredDoctors.length > 0 && (
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Doctors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-blue-100 object-cover shadow-sm"
                />
                <h3 className="text-xl font-semibold mt-4 text-center text-gray-900">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 text-center font-medium mt-1">
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
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaciousAI;