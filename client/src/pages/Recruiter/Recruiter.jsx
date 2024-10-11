import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { RecruiterContext } from "../../context/RecruiterContext";
import { Link } from "react-router-dom";

const Recruiter = () => {
  const { recruiter } = useContext(RecruiterContext);
  return (
    <div className="h-screen flex flex-col">
      <Navbar selectedTab={"home"} />
      <main className="flex-1 p-4">
        <section className="h-96 bg-gray-100 rounded-md shadow-md p-4">
          <h1 className="text-center font-bold text-3xl text-gray-800">
            Hi, {recruiter.username} !
          </h1>
          <p className="text-center text-gray-600">
            Welcome to your recruiter dashboard!
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/post-job"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Post a Job
            </Link>
            <Link
              to="/my-jobs"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View Your Posted Jobs
            </Link>
          </div>
        </section>
      </main>
      <Footer recruiter={recruiter} />
    </div>
  );
};

export default Recruiter;
