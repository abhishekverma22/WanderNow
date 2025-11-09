import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your images
import screen1 from "/login-page.webp";
import screen2 from "/Trip-create-page.webp";
import screen3 from "/view-trip-details.webp";
import screen4 from "/view-trip-details-daily-itineray-1.webp";
import screen5 from "/view-trip-details-daily-itineray-2.webp";
import screen6 from "/view-trip-details-daily-itineray-3.webp";
import screen7 from "/Show-you-all-trip.webp";

const screens = [
  { src: screen1, alt: "Login Page", title: "Secure Login" },
  { src: screen2, alt: "Trip Creation Page", title: "Plan Your Trip" },
  { src: screen3, alt: "View Trip Details", title: "Trip Overview" },
  { src: screen4, alt: "Daily Itinerary 1", title: "Day 1 Itinerary" },
  { src: screen5, alt: "Daily Itinerary 2", title: "Day 2 Itinerary" },
  { src: screen6, alt: "Daily Itinerary 3", title: "Day 3 Itinerary" },
  { src: screen7, alt: "All Trips View", title: "My Trips" },
];

const AppScreens = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => setSelectedImage(imageSrc);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className="relative mt-20 px-4 sm:px-6 lg:px-12 z-10 py-12">
      {/* Glass Background Container */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl rounded-3xl -z-10"></div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-white tracking-tight relative z-10"
      >
        Explore Our App
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {screens.map((screen, index) => (
          <motion.div
            key={index}
            className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{
              scale: 1.05,
              rotate: 0.5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            onClick={() => openModal(screen.src)}
          >
            <div className="relative">
              <img
                src={screen.src}
                alt={screen.alt}
                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:brightness-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-1">{screen.title}</h3>
                  <p className="text-sm opacity-90">Click to enlarge</p>
                </div>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="text-white/80 text-sm font-medium">{screen.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged Screenshot"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AppScreens;
