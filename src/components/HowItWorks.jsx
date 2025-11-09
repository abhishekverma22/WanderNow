import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Login with Google",
    description: "Sign in with your Google account to access all features.",
  },
  {
    title: "Create Your Trip",
    description: "Generate a personalized trip plan using AI according to your preferences.",
  },
  {
    title: "View Trip Plan",
    description: "See your trip overview with dynamic details based on traveler type (Solo, Couple, Friends, Family).",
  },
  {
    title: "Access Trip Details",
    description: "Click on any trip to explore detailed itineraries, budget, and other info.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative mt-32 px-4 sm:px-6 lg:px-12 z-10 py-12">
      <h2 className="text-4xl font-extrabold mb-16 text-center text-white tracking-tight">
        How It Works
      </h2>

      <div className="relative flex flex-col md:flex-row items-center justify-between">
        {/* Horizontal progress line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/20 z-0 rounded-full"></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center text-center z-10 mb-12 md:mb-0 md:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Step Circle */}
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-xl shadow-lg">
              {index + 1}
            </div>

            {/* Step Title */}
            <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>

            {/* Step Description */}
            <p className="text-slate-300 text-sm">{step.description}</p>

            {/* Vertical connector line for mobile */}
            {index < steps.length - 1 && (
              <div className="md:hidden w-1 h-16 bg-white/20 mt-4 rounded-full"></div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
