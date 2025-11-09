import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-3xl border-t border-white/20 py-8 mt-20 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Brand or Logo with rotation */}
        <div className="flex items-center gap-3">
          <img src="./logo.svg" alt="WanderNow Logo" className="w-10 h-10" />
          <h2 className="text-white font-bold text-lg">WanderNow</h2>
        </div>

        {/* Simple Text */}
        <div className="text-slate-300 text-sm text-center md:ml-6">
          &copy; {new Date().getFullYear()} WanderNow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
