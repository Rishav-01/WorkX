import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full mt-5">
      <div className="bg-blue-600 flex mx-auto rounded-md max-w-[90vw] items-center justify-between px-4 py-2 lg:px-0">
        <div className="p-4 inline-flex items-center">
          <p className="text-white">Empower your career with WorkX today</p>
        </div>
        <div className="p-2 hidden items-center md:inline-flex md:gap-5">
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="transition duration-200 rounded-md px-3 py-2 text-sm font-semibold bg-white hover:bg-black hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            type="button"
            className="transition duration-200 rounded-md bg-black text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white hover:text-black"
          >
            Register
          </button>
        </div>
      </div>
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
