import React from "react";
import { motion } from "framer-motion";
import { SelectTravelsList } from "../constant/option";

const TravelerSelector = ({ handleInputChange, formData, loading }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
    <h2 className="text-lg sm:text-xl font-semibold text-white">Who do you plan on travelling with?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {SelectTravelsList.map((item) => (
        <motion.div
          key={item.id}
          onClick={() =>
            !loading && handleInputChange("traveler", { title: item.title, people: item.people })
          }
          whileHover={!loading ? { scale: 1.05 } : {}}
          className={`p-5 bg-black/40 border border-white/20 rounded-xl text-center cursor-pointer shadow-lg transition ${
            formData.traveler?.title === item.title ? "border-8 border-amber-600" : ""
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="flex justify-center">{item.icon}</div>
          <h2 className="text-base sm:text-lg font-semibold text-white">{item.title}</h2>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default TravelerSelector;
