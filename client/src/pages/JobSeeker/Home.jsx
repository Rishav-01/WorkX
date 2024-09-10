import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Statistics from "../../components/footer/Statistics";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4 bg-gray-400 h-[1px]" />
      <Hero />
      <div className="mt-4 bg-gray-400 h-[1px]" />
      <Statistics />
      <Footer />
    </>
  );
};

export default Home;
