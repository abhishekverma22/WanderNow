import React from "react";
import { motion } from "framer-motion";

const GenerateButton = ({ loading, handleGenerateTrip }) => (
  <div className="flex items-center justify-center pt-6">
    <motion.button
      whileHover={!loading ? { scale: 1.05 } : {}}
      whileTap={!loading ? { scale: 0.95 } : {}}
      onClick={handleGenerateTrip}
      disabled={loading}
      className="px-8 py-3 sm:px-10 sm:py-4 bg-blue-500/50 text-white font-semibold rounded-full shadow-md border border-blue-400/40 hover:bg-blue-600/90 transition disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
  </div>
);

export default GenerateButton;
