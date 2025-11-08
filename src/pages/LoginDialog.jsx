import React from "react";
import { motion } from "framer-motion";
import { toast, Bounce } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginDialog = ({ open, onClose, onLoginSuccess }) => {
  if (!open) return null;

  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await getUserProfile(codeResponse);
    },
    onError: (error) => {
      console.error(error);
      toast.error("⚠️ Login failed. Please try again.", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    },
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(resp.data);
      localStorage.setItem("user", JSON.stringify(resp.data));
      

      toast.success(`✅ Welcome ${resp.data.name}!`, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

      // Close dialog
      onClose();

      // Trigger parent callback to generate trip
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      toast.error("⚠️ Failed to fetch user profile.", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 sm:px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-lg p-5 sm:p-8 space-y-5"
      >
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <motion.img
              src="../logo.svg"
              alt="App Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-wide">
              WanderWise
            </h1>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Your Smart Travel Companion
          </p>
        </div>

        <div className="text-center space-y-2 mt-2">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
            Sign In With Google
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-1">
            Sign in securely using your Google account to continue your journey.
          </p>
        </div>

        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            onClick={handleLogin}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm sm:text-base py-2 sm:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center cursor-pointer tracking-wider justify-center gap-2"
          >
            <FcGoogle size={25} />
            Sign In With Google
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 text-xs sm:text-sm underline mt-2"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginDialog;
