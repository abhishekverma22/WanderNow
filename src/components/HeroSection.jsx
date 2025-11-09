import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 text-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/background.mp4"
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-8xl">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-gray-200 to-red-50 drop-shadow-lg mb-4 leading-snug sm:leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Explore the World, One Destination at a Time
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-8 px-2 sm:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          Your personal trip planner and travel curator — crafting custom itineraries
          tailored to your interests and budget.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 120 }}
        >
          <Link
            to="/create-trip"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 text-white text-base sm:text-lg border border-gray-400 rounded-lg shadow-lg hover:bg-black/80 transition-transform transform hover:scale-105"
          >
            Get Started — It's Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
