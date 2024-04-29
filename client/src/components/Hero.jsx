import React from "react";
import Card from "./Card";
import Cards from "./Cards";

const Hero = () => {
  return (
    <section className="mt-10 text-2xl font-semibold">
      <div className="flex gap-4 flex-col text-center">
        <p>Hi, Rishav ! &#9996;</p>
        <p>Let's help you land your dream career !</p>
      </div>
      <p className="my-11 font-bold text-center">Hiring on WorkX &#9889;</p>

      {/* Jobs Component  */}
      <Cards />
    </section>
  );
};

export default Hero;
