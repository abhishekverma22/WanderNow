import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed w-full z-50 mt-4" // slightly smaller top margin
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 flex items-center justify-between bg-black/50 backdrop-blur-md rounded-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{
              scale: 1.05, // subtle grow effect
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="flex items-center gap-2"
          >
            <img src="/logo.svg" alt="logo" className="w-5 sm:w-8 h-5 sm:h-8" />
            <h1 className="text-base sm:text-2xl font-bold text-white tracking-wide sm:tracking-wider drop-shadow-md">
              WanderNow
            </h1>
          </motion.div>
        </Link>

        {/* Sign In Button */}
        <Link to="/signin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs sm:text-lg border border-white text-white px-3 sm:px-5 py-1 sm:py-1 rounded-lg drop-shadow-md hover:bg-white/20 transition"
          >
            Sign In
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
