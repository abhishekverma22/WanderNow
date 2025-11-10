import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";

const MyTrip = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/"); // redirect if not logged in
      return;
    }

    const fetchTrips = async () => {
      try {
        const tripsQuery = query(
          collection(db, "AI_TRIPS"),
          where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(tripsQuery);
        const fetchedTrips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900/20 to-slate-900 px-4">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 sm:p-12 text-white text-xl sm:text-2xl font-light tracking-wide shadow-2xl animate-pulse text-center">
          Loading your journeys...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-12 bg-linear-to-br from-slate-900 via-gray-700 to-slate-900 flex flex-col items-center gap-8 pb-12">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl text-center relative overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
            My Trips
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Explore and relive your curated travel experiences with timeless
            elegance.
          </p>
        </div>
      </div>

      {/* Trips List */}
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {trips.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-4">
              No adventures yet
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">
              Your journey begins when you plan your first trip.
            </p>
            <Link
              to="/create-trip"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Plan Your First Trip
            </Link>
          </div>
        ) : (
          trips.map((trip) => {
            const tripPath = `/view-trip/${
              trip.userSelection?.traveler?.title || "solo"
            }/${trip.id}`;
            return (
              <div
                key={trip.id}
                className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden group cursor-pointer"
                onClick={() => navigate(tripPath)}
              >
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight capitalize">
                        {trip.userSelection?.destination || "-"}
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base md:text-lg font-medium capitalize">
                        {trip.userSelection?.city || "-"},{" "}
                        {trip.userSelection?.country || "-"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="bg-linear-to-r from-purple-500/15 to-blue-500/15 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm md:text-sm text-white font-semibold border border-white/20 backdrop-blur-sm">
                        {trip.userSelection?.numberOfDays || 0} Days
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-white/60 font-semibold text-sm sm:text-base min-w-24">
                        Budget
                      </span>
                      <span className="text-emerald-300 font-bold text-lg sm:text-xl">
                        {trip.userSelection?.budget || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-white/60 font-semibold text-sm sm:text-base min-w-24">
                        Traveler
                      </span>
                      <span className="text-indigo-300 font-bold text-sm sm:text-lg md:text-base capitalize">
                        {trip.userSelection?.traveler?.title || "-"}
                      </span>
                    </div>
                  </div>

                  {/* Trip ID and View Details Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-2 sm:mt-4 gap-3 sm:gap-0">
                    <p className="text-xs sm:text-sm md:text-sm text-slate-400 italic tracking-wide">
                      Trip ID: {trip.id}
                    </p>
                    <Link
                      to={tripPath}
                      onClick={(e) => e.stopPropagation()} // prevent double navigation
                      className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      View Trip Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyTrip;
