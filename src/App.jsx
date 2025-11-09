import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import MyTrip from "./pages/MyTrip";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home fullScreen />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:travelerType/:tripId" element={<ViewTrip />} />
        <Route path="/my-trips" element={<MyTrip />} />
      </Routes>
    </>
  );
};

export default App;
