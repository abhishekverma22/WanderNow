import React from "react";
import { motion } from "framer-motion";

const DaysInput = ({ handleInputChange, loading }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
    <h2 className="text-lg sm:text-xl font-semibold text-white">How many days are you planning your trip?</h2>
    <input
      type="number"
      min={1}
      placeholder="Ex. 3"
      onChange={(e) => handleInputChange("numberOfDays", Number(e.target.value))}
      disabled={loading}
      className="border border-gray-300 w-full p-3 rounded-md bg-white text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition disabled:opacity-50"
    />
  </motion.div>
);

export default DaysInput;
