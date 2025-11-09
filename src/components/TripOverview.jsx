import React from "react";
import { motion } from "framer-motion";

const TripOverview = ({ parsedTripData }) => {
  if (!parsedTripData) return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-gray-400 text-center text-base"
    >
      No trip overview available.
    </motion.p>
  );

  return (
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
  );
};

export default TripOverview;
