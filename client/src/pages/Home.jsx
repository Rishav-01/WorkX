import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4 bg-gray-400 h-[1px]" />
      <Hero />
    </>
  );
};

export default Home;
