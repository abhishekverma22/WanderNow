import React from "react";
import { motion } from "framer-motion";

const DestinationInput = ({ handleInputChange, loading }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
    <h2 className="text-lg sm:text-xl font-semibold text-white">What is your destination of choice?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
      {["city", "country", "destination"].map((field, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Enter ${field}...`}
          onChange={(e) => handleInputChange(field, e.target.value)}
          disabled={loading}
          className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition disabled:opacity-50"
        />
      ))}
    </div>
  </motion.div>
);

export default DestinationInput;
