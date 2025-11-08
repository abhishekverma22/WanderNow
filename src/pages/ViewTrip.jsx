import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";
import { motion } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (err) {
        console.error("JSON parsing error:", err);
        toast.error("Trip data is malformed!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setParsedTripData(null);
        setLoading(false);
        return;
      }

      setParsedTripData(parsed);

      toast.success("Trip loaded successfully!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error fetching trip:", error);
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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* pt-32 ensures no overlap with navbar */}
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
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={tripDetails.userIMG}
                    alt="User"
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/30 shadow-md"
                  />
                </div>
                <div className="flex-grow">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                    {tripDetails.userName}
                  </h1>
                  <p className="text-sm text-gray-300 mb-2">
                    {tripDetails.userEmail}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs lg:text-sm text-gray-300 items-center ">
                    <span className="bg-white/10 px-2 py-1 rounded-full">
                      {tripDetails.userSelection?.city?.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span className="bg-white/10 px-2 py-1 rounded-full">
                      {tripDetails.userSelection?.country?.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span className="bg-white/10 px-2 py-1 rounded-full">
                      {tripDetails.userSelection?.budget}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trip Overview */}
            {parsedTripData ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
                      ✈️ {parsedTripData.location}
                    </h2>
                    <p className="text-gray-300 text-sm lg:text-base">
                      Duration: {parsedTripData.duration_days} Days
                    </p>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl">
                    <span className="text-gray-300 text-sm">
                      Traveler Type: {parsedTripData.travelers}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400 text-center text-base"
              >
                No trip overview available.
              </motion.p>
            )}

            {/* Hotels */}
            {parsedTripData?.hotels?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl lg:text-3xl font-semibold flex items-center gap-2">
                  🏨 Hotels
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {parsedTripData.hotels.map((hotel, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <h3 className="text-lg lg:text-xl font-semibold mb-2">
                        {hotel.hotel_name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {hotel.hotel_address}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3 text-xs lg:text-sm">
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          💰 {hotel.price}
                        </span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          ⭐ {hotel.rating}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {hotel.description}
                      </p>
                      <a
                        href={hotel.hotel_image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 text-sm inline-block hover:text-blue-200 transition-colors duration-200"
                      >
                        🔗 View Images
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Daily Itinerary */}
            {parsedTripData?.itinerary?.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h2 className="text-2xl lg:text-3xl font-semibold flex items-center gap-2">
                  📅 Daily Itinerary
                </h2>
                {parsedTripData.itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg"
                  >
                    <h3 className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 flex  items-center justify-center rounded-full bg-white/10 text-white font-bold text-lg shadow-lg">
                        Day {day.day}
                      </div>
                      <span className="text-xl lg:text-2xl font-bold text-white">
                        {day.theme}
                      </span>
                    </h3>

                    <div className="space-y-5">
                      {day.plan?.length > 0 ? (
                        day.plan.map((place, placeIndex) => (
                          <motion.div
                            key={placeIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: placeIndex * 0.1,
                            }}
                            className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <h4 className="text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2">
                              📍 {place.place_name}
                            </h4>
                            <p className="text-gray-300 text-sm lg:text-base mb-3">
                              {place.place_details}
                            </p>
                            <div className="flex flex-wrap gap-3 mb-3 text-xs lg:text-sm text-gray-400">
                              <span className="bg-white/10 px-3 py-1 rounded-full">
                                🎟️ {place.ticket_price_inr}
                              </span>
                              <span className="bg-white/10 px-3 py-1 rounded-full">
                                🕒 {place.time_to_spend}
                              </span>
                              <span className="bg-white/10 px-3 py-1 rounded-full">
                                🌤️ {place.best_time_to_visit}
                              </span>
                            </div>
                            <a
                              href={place.place_image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 text-sm inline-block hover:text-blue-200 transition-colors duration-200"
                            >
                              🔗 View Images
                            </a>
                          </motion.div>
                        ))
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-gray-400 text-center text-base"
                        >
                          No itinerary available for this day.
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400 text-center text-base"
              >
                No itinerary available for this trip.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ViewTrip;
