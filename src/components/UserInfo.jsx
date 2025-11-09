import React from "react";
import { motion } from "framer-motion";

const UserInfo = ({ tripDetails }) => {
  if (!tripDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="shrink-0">
          <img
            src={tripDetails.userIMG}
            alt="User"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/30 shadow-md"
          />
        </div>
        <div className="grow">
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
  );
};

export default UserInfo;
