import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cards from "../components/jobs/Cards";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4 bg-gray-400 h-[1px]" />
      <Hero />
      <h1 className="text-center my-5 font-bold text-2xl">
        Recently Posted Internships
      </h1>
      <Cards />
    </>
  );
};

export default Home;
