// src/components/CreateTrip/CreateTrip.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../App.css";
import { sendMessageToGemini } from "../services/AIMODEL";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";
import { useNavigate } from "react-router-dom";
import LoginDialog from "./LoginDialog";

// Modular components
import DestinationInput from "../components/DestinationInput";
import DaysInput from "../components/DaysInput";
import BudgetSelector from "../components/BudgetSelector";
import TravelerSelector from "../components/TravelerSelector";
import GenerateButton from "../components/GenerateButton";

import { AI_PROMPT } from "../constant/option";

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
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const { city, country, destination, numberOfDays, budget, traveler } =
      formData;
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

    const FINAL_PROMPT = getFinalPrompt(formData);
    console.log("📝 Sending prompt to Gemini:", FINAL_PROMPT);
    setLoading(true);

    try {
      const resultText = await sendMessageToGemini(FINAL_PROMPT);
      console.log("✅ Gemini Response:", resultText);
      saveAiTrip(resultText);

      if (resultText && !resultText.includes("⚠️")) {
        toast.success("🌍 Your personalized trip is ready!", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Bounce,
        });
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

  const user = JSON.parse(localStorage.getItem("user"));
  const saveAiTrip = async (tripData) => {
    const docID = Date.now().toString();
    const travelerType = formData.traveler.title.toLowerCase();

    await setDoc(doc(db, "AI_TRIPS", docID), {
      userSelection: formData,
      tripData,
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
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl text-white">
            Tell Us Your Travel Preference
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg mt-4 pb-2 border-b border-white/20 max-w-3xl mx-auto">
            Provide a few details, and our AI Trip Planner will create a
            personalized itinerary just for you.
          </p>
        </motion.div>

        <DestinationInput
          handleInputChange={handleInputChange}
          loading={loading}
        />
        <DaysInput handleInputChange={handleInputChange} loading={loading} />
        <BudgetSelector
          handleInputChange={handleInputChange}
          formData={formData}
          loading={loading}
        />
        <TravelerSelector
          handleInputChange={handleInputChange}
          formData={formData}
          loading={loading}
        />

        <GenerateButton
          loading={loading}
          handleGenerateTrip={handleGenerateTrip}
        />
      </div>

      <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default CreateTrip;
