import React from "react";
import { motion } from "framer-motion";

const DailyItinerary = ({ itinerary }) => {
  if (!itinerary?.length)
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-400 text-center text-base"
      >
        No itinerary available for this trip.
      </motion.p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-2xl lg:text-3xl font-semibold flex items-center gap-2">
        📅 Daily Itinerary
      </h2>

      {itinerary.map((day) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg"
        >
          {/* Day Header */}
          <h3 className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 text-white font-bold text-lg shadow-lg">
              Day {day.day}
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white">
              {day.theme}
            </span>
          </h3>

          {/* Daily Plan */}
          <div className="space-y-5">
            {day.plan?.length ? (
              day.plan.map((place, index) => {
                // Create Google Maps search URL
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  place.place_name
                )}`;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Place Name (clickable to map) */}
                    <h4 className="text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2">
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition-colors duration-200"
                      >
                        📍 {place.place_name}
                      </a>
                    </h4>

                    <p className="text-gray-300 text-sm lg:text-base mb-3">
                      {place.place_details}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-3 text-xs lg:text-sm text-gray-400">
                      <span className="bg-white/10 px-3 py-1 rounded-full">
                        🎟️ {place.ticket_price_inr}
                      </span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">
                        🕒 {place.time_to_spend}
                      </span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">
                        🌤️ {place.best_time_to_visit}
                      </span>
                    </div>

                    {/* Links Section */}
                    <div className="flex items-center gap-4 text-sm">
                      {place.place_image_url && (
                        <a
                          href={place.place_image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                        >
                          🔗 View Images
                        </a>
                      )}

                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-green-200 transition-colors duration-200"
                      >
                        📍 View on Map
                      </a>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-400 text-center text-base"
              >
                No itinerary available for this day.
              </motion.p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DailyItinerary;
