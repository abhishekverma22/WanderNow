import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import LoginDialog from "../pages/LoginDialog";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const dropdownRef = useRef();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Called after successful login
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // immediately update state
    setLoginOpen(false); // close dialog
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="fixed w-full z-50 mt-4"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 flex items-center justify-between bg-black/50 backdrop-blur-md rounded-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{
                scale: 1.05,
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

          {/* User Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.picture || "/default-profile.png"}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-50"
                  >
                    <div className="flex flex-col py-2">
                      <span className="px-4 py-2 text-white text-sm font-medium truncate">
                        {user.name}
                      </span>
                      <Link
                        to="/my-trips"
                        className="px-4 py-2 text-white text-sm hover:bg-white/20 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        🗺️ My Trips
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white text-sm hover:bg-red-600/80 transition text-left w-full"
                      >
                        🔓 Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLoginOpen(true)}
              className="text-xs sm:text-lg border border-white text-white px-3 sm:px-5 py-1 sm:py-1 rounded-lg drop-shadow-md hover:bg-white/20 transition"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Login Dialog */}
      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess} // Pass userData
      />
    </>
  );
};

export default Navbar;
