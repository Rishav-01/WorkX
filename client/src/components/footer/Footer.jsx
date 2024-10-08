import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobSeekerContext } from "../../context/JobSeekerContext";
import { RecruiterContext } from "../../context/RecruiterContext";

const Footer = () => {
  const navigate = useNavigate();
  const { jobSeeker } = useContext(JobSeekerContext);
  const { recruiter } = useContext(RecruiterContext);
  return (
    <footer className="w-full h-fit mt-5">
      {recruiter || jobSeeker ? null : (
        <div className="bg-blue-600 flex mx-auto rounded-md max-w-[90vw] items-center justify-between px-4 py-2 lg:px-0">
          <div className="p-4 inline-flex items-center">
            <p className="text-white">Empower your career with WorkX today</p>
          </div>
          <div className="p-2 hidden items-center md:inline-flex md:gap-5">
            <button
              onClick={() => navigate("/login")}
              className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-black before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-black before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Register
            </button>
          </div>
        </div>
      )}
      <hr className="my-3" />
      <div className=" bg-gray-700 rounded-md p-3 mx-auto flex max-w-[90vw] flex-col items-start space-x-8 md:flex-row">
        <div className="mt-8 grid grid-cols-3 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-4">
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white">
              Internship by places
            </p>
            <ul className="flex flex-col space-y-2 text-[14px] font-medium text-white">
              <li>Delhi</li>
              <li>Hyderabad</li>
              <li>Bengaluru</li>
              <li>Noida</li>
              <li>Sonipat</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white">
              Internship by streams
            </p>
            <ul className="flex flex-col space-y-2 text-[14px] font-medium text-white">
              <li>About us</li>
              <li>Careers</li>
              <li>Our Team</li>
              <li>Our Vision</li>
              <li>Press Release</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white">Job places</p>
            <ul className="flex flex-col space-y-2 text-[14px] font-medium text-white">
              <li>Blogs</li>
              <li>News letters</li>
              <li>Events</li>
              <li>Help center</li>
              <li>Tutorials</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white">
              Jobs by streams
            </p>
            <ul className="flex flex-col space-y-2 text-[14px] font-medium text-white">
              <li>Startups</li>
              <li>Enterprise</li>
              <li>Government</li>
              <li>Marketplaces</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black h-5"></div>
    </footer>
  );
};

export default Footer;
