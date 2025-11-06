import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";

const App = () => {
  return (
    <>
      {/* Navbar is floating */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home fullScreen />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </>
  );
};

export default App;
