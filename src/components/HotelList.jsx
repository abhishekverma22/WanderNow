import React from "react";
import { motion } from "framer-motion";

const HotelList = ({ hotels }) => {
  if (!hotels?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl lg:text-3xl font-semibold flex items-center gap-2">
        🏨 Hotels
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => {
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${hotel.hotel_name} ${hotel.hotel_address}`
          )}`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hotel name links to Google Maps */}
              <h3 className="text-lg lg:text-xl font-semibold mb-2">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  {hotel.hotel_name}
                </a>
              </h3>

              <p className="text-gray-300 text-sm mb-3">
                {hotel.hotel_address}
              </p>

              <div className="flex flex-wrap gap-2 mb-3 text-xs lg:text-sm">
                <span className="bg-white/10 px-3 py-1 rounded-full">
                  💰 {hotel.price}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full">
                  ⭐ {hotel.rating}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-3">{hotel.description}</p>

              {/* Two links — one for images, one for maps */}
              <div className="flex items-center gap-4 text-sm">
                <a
                  href={hotel.hotel_image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                >
                  🔗 View Images
                </a>
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
        })}
      </div>
    </motion.div>
  );
};

export default HotelList;
