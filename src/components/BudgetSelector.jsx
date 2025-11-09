import React from "react";
import { motion } from "framer-motion";
import { SelectBudgetOption } from "../constant/option";

const BudgetSelector = ({ handleInputChange, formData, loading }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
    <h2 className="text-lg sm:text-xl font-semibold text-white">What is your budget?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {SelectBudgetOption.map((item) => (
        <motion.div
          key={item.title}
          onClick={() => !loading && handleInputChange("budget", item.title)}
          whileHover={!loading ? { scale: 1.05 } : {}}
          className={`p-5 bg-black/40 border border-white/20 rounded-xl text-center cursor-pointer shadow-lg transition ${
            formData.budget === item.title ? "border-8 border-amber-600" : ""
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="flex justify-center">{item.icon}</div>
          <h2 className="text-base sm:text-lg font-semibold text-white">{item.title}</h2>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default BudgetSelector;
  