import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";

const Recruiter = () => {
  const recruiter = 1; // TODO: Fetch this data.
  return (
    <>
      <Navbar selectedTab={"home"} />
      <section className="h-96">
        <h1 className="text-center font-bold text-2xl">Hi, Recruiter !</h1>
        <div className="text-center my-6">
          <h3>Your Name: Name</h3>
          <h3>Your Company: Company</h3>
          <h3>Your Position: Position</h3>
          <h3>Number of Jobs Posted: 2</h3>
        </div>
      </section>
      <Footer recruiter={recruiter} />
    </>
  );
};

export default Recruiter;
