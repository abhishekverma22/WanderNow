import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelsList,
} from "../constant/option";
import "../App.css";
import { sendMessageToGemini } from "../services/AiModel";
import LoginDialog from "./LoginDialog";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";
import { useNavigate } from "react-router-dom";

// Generate AI Prompt from formData
const getFinalPrompt = (formData) => {
  const { city, country, destination, numberOfDays, traveler, budget } =
    formData;
  return AI_PROMPT.replace("{city}", city || "Unknown City")
    .replace("{country}", country || "Unknown Country")
    .replace("{destination}", destination || "Unknown Destination")
    .replace("{numberOfDays}", numberOfDays || 1)
    .replace("{traveler}", traveler?.title || "Solo")
    .replace("{people}", traveler?.people || "1 Person")
    .replace("{budget}", budget || "Standard");
};

const CreateTrip = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    const { city, country, destination, numberOfDays, budget, traveler } =
      formData;

    // Validate input
    if (
      !city ||
      !country ||
      !destination ||
      !numberOfDays ||
      !budget ||
      !traveler
    ) {
      toast.warning("✈️ Please share trip details before we take off 🚀", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    // Generate final prompt
    const FINAL_PROMPT = getFinalPrompt(formData);

    console.log("📝 Sending prompt to Gemini:", FINAL_PROMPT);

    setLoading(true);

    try {
      // Call Gemini AI
      const resultText = await sendMessageToGemini(FINAL_PROMPT);

      // Log response in console
      console.log("✅ Gemini Response:", resultText);
      saveAiTrip(resultText);

      // Check if we got a valid response
      if (resultText && !resultText.includes("⚠️")) {
        toast.success(
          "🌍 Your personalized trip is ready! Check console for details.",
          {
            position: "bottom-right",
            autoClose: 4000,
            theme: "colored",
            transition: Bounce,
          }
        );
      } else {
        toast.error(resultText || "⚠️ No response from Gemini", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.error("❌ Error generating trip:", err);
      toast.error("⚠️ Something went wrong while generating your trip.", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  // save response in firestore
  const user = JSON.parse(localStorage.getItem("user"));
  const saveAiTrip = async (tripData) => {
    const docID = Date.now().toString();
    const travelerType = formData.traveler.title.toLowerCase();

    await setDoc(doc(db, "AI_TRIPS", docID), {
      userSelection: formData,
      tripData: tripData,
      userEmail: user.email,
      userName: user.name,
      userIMG: user.picture,
    });

    navigate(`/view-trip/${travelerType}/${docID}`);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-y-auto"
      style={{ backgroundImage: "url('/createTrip.webp')" }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl text-white drop-shadow-md">
            Tell Us Your Travel Preference
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg mt-4 pb-2 border-white/20 border-b max-w-3xl mx-auto drop-shadow">
            Provide a few details, and our AI Trip Planner will create a
            personalized itinerary just for you.
          </p>
        </motion.div>

        {/* Destination Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow tracking-wider">
            What is your destination of choice?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter City..."
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={loading}
              className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="text"
              placeholder="Enter Country..."
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={loading}
              className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="text"
              placeholder="Enter Destination Name..."
              onChange={(e) => handleInputChange("destination", e.target.value)}
              disabled={loading}
              className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </motion.div>

        {/* Number of Days */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow tracking-wider">
            How many days are you planning your trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            min={1}
            step={1}
            onChange={(e) =>
              handleInputChange("numberOfDays", Number(e.target.value))
            }
            disabled={loading}
            className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-5"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow tracking-wider">
            What is your budget?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
            {SelectBudgetOption.map((item) => (
              <motion.div
                key={item.title}
                onClick={() =>
                  !loading && handleInputChange("budget", item.title)
                }
                className={`p-5 bg-black/40 border border-white/20 rounded-xl cursor-pointer text-center space-y-2 shadow-lg transition ${
                  formData.budget === item.title
                    ? "border-8 border-amber-600"
                    : ""
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                whileHover={!loading ? { scale: 1.05 } : {}}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h2 className="text-base sm:text-lg font-semibold text-white drop-shadow-md">
                  {item.title}
                </h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Companions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-5"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow tracking-wider">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            {SelectTravelsList.map((item) => (
              <motion.div
                key={item.id}
                onClick={() =>
                  !loading &&
                  handleInputChange("traveler", {
                    title: item.title,
                    people: item.people,
                  })
                }
                className={`p-5 bg-black/40 border border-white/20 rounded-xl hover:bg-black/30 cursor-pointer text-center space-y-2 shadow-lg transition ${
                  formData.traveler?.title === item.title
                    ? "border-8 border-amber-600"
                    : ""
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                whileHover={!loading ? { scale: 1.05 } : {}}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h2 className="text-base sm:text-lg font-semibold text-white drop-shadow-md">
                  {item.title}
                </h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div className="flex items-center justify-center pt-6">
          <motion.button
            whileHover={
              !loading
                ? {
                    boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                    backgroundColor: "rgba(37,99,235,0.8)",
                  }
                : {}
            }
            whileTap={!loading ? { scale: 0.95 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-blue-500/50 text-sm sm:text-lg text-white font-semibold rounded-full shadow-md border border-blue-400/40 hover:bg-blue-600/90 focus:ring-4 focus:ring-blue-400/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerateTrip}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Trip ✈️"
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Dialog */}
      <LoginDialog
        open={openDailog}
        onClose={() => setOpenDailog(false)}
        onLoginSuccess={handleGenerateTrip}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default CreateTrip;
