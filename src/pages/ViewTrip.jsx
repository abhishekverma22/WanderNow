// src/pages/ViewTrip.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";
import { motion } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserInfo from "../components/UserInfo";
import TripOverview from "../components/TripOverview";
import HotelList from "../components/HotelList";
import DailyItinerary from "../components/DailyItinerary";
import TravelQuote from "../components/TravelQuote";

const ViewTrip = () => {
  const { travelerType, tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [parsedTripData, setParsedTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  const bgImages = {
    solo: "/solo.webp",
    couple: "/couple.webp",
    family: "/family.webp",
    friends: "/friends.webp",
  };

  const backgroundImage =
    bgImages[travelerType?.toLowerCase()] || "/default_bg.webp";

  useEffect(() => {
    if (tripId) getTripDetails();
  }, [tripId]);

  const getTripDetails = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "AI_TRIPS", tripId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        toast.error("No trip found for this ID!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setTripDetails(null);
        setParsedTripData(null);
        setLoading(false);
        return;
      }

      const data = docSnap.data();
      setTripDetails(data);

      const jsonString = data.tripData?.replace(/```json|```/g, "").trim();
      try {
        setParsedTripData(JSON.parse(jsonString));
      } catch (err) {
        toast.error("Trip data is malformed!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setParsedTripData(null);
      }

      toast.success("Trip loaded successfully!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to fetch trip data!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      setTripDetails(null);
      setParsedTripData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center text-white overflow-x-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center min-h-[40vh]"
          >
            <motion.p
              className="text-center text-xl font-medium"
              transition={{ duration: 0.5 }}
            >
              Loading trip details...
            </motion.p>
          </motion.div>
        ) : !tripDetails ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-300 text-lg"
          >
            Trip not found.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="space-y-8"
          >
            <UserInfo tripDetails={tripDetails} />
            <TripOverview parsedTripData={parsedTripData} />
            <HotelList hotels={parsedTripData?.hotels} />
            <DailyItinerary itinerary={parsedTripData?.itinerary} />
            <TravelQuote travelerType={travelerType} />
          </motion.div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ViewTrip;
