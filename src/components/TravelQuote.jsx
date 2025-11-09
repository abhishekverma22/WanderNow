import React from "react";
import { motion } from "framer-motion";

const quotes = {
  solo: "🌍 'Travel far enough, you meet yourself.' — David Mitchell",
  couple:
    "❤️ 'We travel not to escape life, but for life not to escape us — together.'",
  family:
    "🏡 'The greatest legacy we can leave our children is happy memories.'",
  friends: "🎒 'Good times and crazy friends make the best memories.'",
  default: "✈️ 'Adventure is out there — go find it!'",
};

const TravelQuote = ({ travelerType }) => {
  const quote = quotes[travelerType?.toLowerCase()] || quotes["default"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-12 text-center text-lg italic text-gray-300"
    >
      {quote}
    </motion.div>
  );
};

export default TravelQuote;
