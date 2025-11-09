import React from "react";

const PlaceImage = ({ placeName }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    placeName
  )}&zoom=15&size=600x400&markers=color:red%7C${encodeURIComponent(
    placeName
  )}&key=${apiKey}`;

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      {placeName ? (
        <img src={mapImage} alt={placeName} className="w-full h-60 object-cover" />
      ) : (
        <p className="text-gray-400 text-center">No image found</p>
      )}
    </div>
  );
};

export default PlaceImage;
