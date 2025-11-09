import React from "react";
import HeroSection from "../components/HeroSection";
import AppScreens from "../components/AppScreens";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-linear-to-b from-slate-900 via-slate-700 to-slate-600 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* App Screens Section */}
      <section className="relative px-4 sm:px-6 lg:px-12 mt-20">
        <AppScreens />
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 sm:px-6 lg:px-12 mt-32 mb-20">
        <HowItWorks />
      </section>
      <Footer/>

    </div>
  );
};

export default Home;
