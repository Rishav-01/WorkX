import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import { CiFilter, CiSearch } from "react-icons/ci";
import InternshipPageCard from "../components/internships/InternshipPageCard";
import useMediaQuery from "../hooks/useMediaQuery";
import { internshipsData } from "../constants";

const Internships = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isFilterDivAvailable, setisFilterDivAvailable] = useState(false);
  const [filteredInternships, setFilteredInternships] = useState([]);

  // States for the bigger screens filter options
  const category = useRef();
  const location = useRef();
  const filter = useRef({
    partTime: false,
    workFromHome: false,
  }); // Either WFH or part time

  // States for smaller screens
  // const categorySmall = useRef();
  // const locationSmall = useRef();
  // const filterSmall = useRef();

  const handleFilter = (e) => {
    const { id, checked } = e.target;
    filter.current = {
      ...filter.current,
      [id]: checked,
    };
  };

  const handleFilterSubmit = () => {
    console.log(category.current.value, location.current.value, filter.current);
    let wfh = false,
      partTime = false;
    if (filter.current.partTime) partTime = true;
    if (filter.current.workFromHome) wfh = true;

    // Filter internships on the basis of profile, location and wfh or part time
    const internships = internshipsData.filter((item) => {
      return (
        category &&
        item.category
          .toLowerCase()
          .includes(category.current.value.toLowerCase()) &&
        location &&
        item.location
          .toLowerCase()
          .includes(location.current.value.toLowerCase())
      );
    });
    let partTimeInternships = [],
      wfhInternships = [];
    if (partTime) {
      partTimeInternships = internships.filter(
        (item) => item.type == "Part time"
      );
    }
    if (wfh) {
      wfhInternships = internships.filter(
        (item) => item.type == "Work from home"
      );
    }

    let totalInternships = [];
    if (partTime && wfh)
      totalInternships = partTimeInternships.concat(wfhInternships);
    else if (partTime) totalInternships = partTimeInternships;
    else if (wfh) totalInternships = wfhInternships;
    else totalInternships = internships;

    setFilteredInternships(totalInternships);
  };
  console.log(filteredInternships);

  return (
    <>
      <Navbar />
      <div className="flex border-gray-500 my-2 max-w-full bg-gray-100">
        {/* Filters section  for bigger screens */}
        {isAboveSmallScreens && (
          <div>
            <div className="max-w-1/6 bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
              <p className="text-center flex items-center justify-center">
                <CiFilter color="blue" />
                Filters
              </p>
              <div className="flex flex-col gap-1">
                <p>Profile</p>
                <input
                  ref={category}
                  type="text"
                  className="border p-1 rounded-lg"
                  placeholder="Eg - Marketing"
                />
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <p>Location</p>
                <input
                  ref={location}
                  type="text"
                  className="border p-1 rounded-lg"
                  placeholder="Eg - Mumbai"
                />
              </div>

              <div className="flex mt-3 mx-auto flex-col items-start justify-center gap-2">
                <div className="flex gap-4">
                  <input
                    onChange={handleFilter}
                    type="checkbox"
                    id="partTime"
                  />
                  <label htmlFor="partTime">Part-Time</label>
                </div>
                <div className="flex gap-4">
                  <input
                    onChange={handleFilter}
                    type="checkbox"
                    id="workFromHome"
                  />
                  <label htmlFor="workFromHome">Work from home</label>
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
              <button
                className="mx-auto mt-3 bg-blue-700 px-2 py-2 rounded-lg text-white"
                onClick={handleFilterSubmit}
              >
                Apply
              </button>
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
        )}

        {/* Internships card showcase section  */}
        <div className="flex flex-col gap-1 p-4 mx-auto">
          {/* Filter section for small devices  */}
          {!isAboveSmallScreens && (
            <div className="flex items-center justify-center relative">
              <CiFilter className="text-blue-600" />
              <p
                className="cursor-pointer"
                onClick={() => setisFilterDivAvailable((prev) => !prev)}
              >
                Filters
              </p>
              {isFilterDivAvailable && (
                <div className="max-w-1/6 absolute top-4 right-[50%] bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
                  <div className="flex flex-col gap-1">
                    <p>Profile</p>
                    <input
                      ref={category}
                      type="text"
                      className="border p-1 rounded-lg"
                      placeholder="Eg - Marketing"
                    />
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    <p>Location</p>
                    <input
                      ref={location}
                      type="text"
                      className="border p-1 rounded-lg"
                      placeholder="Eg - Mumbai"
                    />
                  </div>
                  <div className="flex mt-3 mx-auto flex-col items-start justify-center gap-2">
                    <div className="flex gap-4">
                      <input
                        onChange={handleFilter}
                        type="checkbox"
                        id="partTime"
                      />
                      <label htmlFor="partTime">Part-Time</label>
                    </div>
                    <div className="flex gap-4">
                      <input
                        onChange={handleFilter}
                        type="checkbox"
                        id="workFromHome"
                      />
                      <label htmlFor="workFromHome">Work from home</label>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <p>Desired minimum monthly Stipend (&#8377;)</p>
                    <input type="range" id="stipend-range" />
                    <label
                      htmlFor="stipend-range"
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
                  <button
                    className="mx-auto mt-3 bg-blue-700 px-2 py-2 rounded-lg text-white"
                    onClick={handleFilterSubmit}
                  >
                    Apply
                  </button>
                  <p className="mt-3 cursor-pointer text-end text-blue-400">
                    Clear All
                  </p>
                </div>
              )}
            </div>
          )}
          <div>
            <p className="text-center text-3xl font-bold">
              {internshipsData.length} Total Internships
            </p>

            {/* Internship Cards with Pagination  */}
            <div>
              <InternshipPageCard internships={filteredInternships} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Internships;
