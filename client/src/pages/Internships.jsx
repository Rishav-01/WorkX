import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import { CiFilter, CiSearch } from "react-icons/ci";
import InternshipPageCard from "../components/internships/InternshipPageCard";
import useMediaQuery from "../hooks/useMediaQuery";

const Internships = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isFilterDivAvailable, setisFilterDivAvailable] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex border-gray-500 my-2 max-w-full bg-gray-100">
        {/* Filters section  */}
        <div>
          <div className="max-w-1/6 bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
            <p className="text-center flex items-center justify-center">
              <CiFilter color="blue" />
              Filters
            </p>
            <div className="flex flex-col gap-1">
              <p>Profile</p>
              <input
                type="text"
                className="border p-1 rounded-lg"
                placeholder="Eg - Marketing"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <p>Location</p>
              <input
                type="text"
                className="border p-1 rounded-lg"
                placeholder="Eg - Mumbai"
              />
            </div>

            <div className="flex mt-3 mx-auto flex-col items-start justify-center gap-2">
              <div className="flex gap-4">
                <input type="checkbox" id="part-time" />
                <label htmlFor="part-time">Part-Time</label>
              </div>
              <div className="flex gap-4">
                <input type="checkbox" id="work-from-home" />
                <label htmlFor="work-from-home">Work from home</label>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <p>Desired minimum monthly Stipend (&#8377;)</p>
              <input type="range" id="stipend-range" />
              <label htmlFor="stipend-range" className="flex justify-between">
                <p>0</p>
                <p>2K</p>
                <p>4K</p>
                <p>6K</p>
                <p>8K</p>
                <p>10K</p>
              </label>
            </div>
            <p className="mt-3 cursor-pointer text-end text-blue-400">
              Clear All
            </p>
          </div>

          <div className="flex items-center">
            <input
              className="ml-5 my-2 border-gray-500 border outline-none"
              type="text"
              placeholder="Eg - Design, Mumbai"
            />
            <CiSearch
              size={25}
              className="bg-blue-500 text-white cursor-pointer"
            />
          </div>
        </div>

        {/* Internships card showcase section  */}
        <div className="flex flex-col gap-1 p-4 mx-auto">
          {/* Filter section for small devices  */}
          {!isAboveSmallScreens && (
            <div className="flex items-center cursor-pointer relative">
              <CiFilter className="text-blue-600" />
              <p onClick={() => setisFilterDivAvailable((prev) => !prev)}>
                Filters
              </p>
              {!isFilterDivAvailable && (
                <div className="max-w-1/6 absolute top-4 right-[50%] bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
                  <div className="flex flex-col gap-1">
                    <p>Profile</p>
                    <input
                      type="text"
                      className="border p-1 rounded-lg"
                      placeholder="Eg - Marketing"
                    />
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    <p>Location</p>
                    <input
                      type="text"
                      className="border p-1 rounded-lg"
                      placeholder="Eg - Mumbai"
                    />
                  </div>
                  <div className="flex mt-3 mx-auto flex-col items-start justify-center gap-2">
                    <div className="flex gap-4">
                      <input type="checkbox" id="part-time-small" />
                      <label htmlFor="part-time-small">Part-Time</label>
                    </div>
                    <div className="flex gap-4">
                      <input type="checkbox" id="work-from-home-small" />
                      <label htmlFor="work-from-home-small">
                        Work from home
                      </label>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <p>Desired minimum monthly Stipend (&#8377;)</p>
                    <input type="range" id="stipend-range-small" />
                    <label
                      htmlFor="stipend-range-small"
                      className="flex justify-between"
                    >
                      <p>0</p>
                      <p>2K</p>
                      <p>4K</p>
                      <p>6K</p>
                      <p>8K</p>
                      <p>10K</p>
                    </label>
                  </div>
                  <p className="mt-3 cursor-pointer text-end text-blue-400">
                    Clear All
                  </p>
                </div>
              )}
            </div>
          )}
          <div>
            <p className="text-center text-3xl font-bold">
              0 Total Internships
            </p>
            <InternshipPageCard />
            <InternshipPageCard />
            <InternshipPageCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Internships;
