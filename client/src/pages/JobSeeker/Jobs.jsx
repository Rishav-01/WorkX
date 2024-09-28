import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { CiFilter, CiSearch } from "react-icons/ci";
import useMediaQuery from "../../hooks/useMediaQuery";
import { jobsData } from "../../constants";
import JobPageCards from "../../components/jobs/JobPageCards";
import axios from "axios";
import toast from "react-hot-toast";

const Jobs = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isFilterDivAvailable, setisFilterDivAvailable] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJobs = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/jobSeeker/jobs`);
      const jobs = res.data.filter((job) => job.openings > 0);
      setAllJobs(jobs);
      setFilteredJobs(jobs);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching Jobs", {
        duration: 2000,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // States for the bigger screens filter options
  const category = useRef();
  const location = useRef();
  const filter = useRef({
    inOffice: false,
    workFromHome: false,
  }); // Either WFH or part time
  const salRange = useRef();

  const handleFilterCheckBox = (e) => {
    const { id, checked } = e.target;
    filter.current = {
      ...filter.current,
      [id]: checked,
    };
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (isFilterDivAvailable) setisFilterDivAvailable(false);

    // console.log(category.current.value, location.current.value, filter.current);
    let salVal = salRange.current.value;
    // console.log(salVal);

    let wfh = false,
      office = false;
    if (filter.current.inOffice) office = true;
    if (filter.current.workFromHome) wfh = true;

    // Filter jobs on the basis of profile, location and wfh or part time
    const jobs = allJobs.filter((item) => {
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
    let inOfficeJobs = [],
      wfhJobs = [];
    if (office) {
      inOfficeJobs = jobs.filter((item) => item.mode == "In Office");
    }
    if (wfh) {
      wfhJobs = jobs.filter((item) => item.mode == "Work from Home");
    }

    let totalJobs = [];
    if (office && wfh) totalJobs = inOfficeJobs.concat(wfhJobs);
    else if (office) totalJobs = inOfficeJobs;
    else if (wfh) totalJobs = wfhJobs;
    else totalJobs = jobs;

    totalJobs = totalJobs.filter((item) => {
      let salary = parseInt(item.salary.replace(/,/g, ""));
      return salary >= salVal;
    });

    setFilteredJobs(totalJobs);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <div className="flex border-gray-500 my-2 max-w-full bg-gray-100">
          {/* Filters section  for bigger screens */}
          {isAboveSmallScreens && (
            <form className="sticky h-fit top-5 max-w-1/6 bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
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
                    onChange={handleFilterCheckBox}
                    type="checkbox"
                    id="partTime"
                  />
                  <label htmlFor="partTime">Part-Time</label>
                </div>
                <div className="flex gap-4">
                  <input
                    onChange={handleFilterCheckBox}
                    type="checkbox"
                    id="workFromHome"
                  />
                  <label htmlFor="workFromHome">Work from home</label>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <p>Desired minimum CTC in Lakhs (&#8377;)</p>
                <input
                  type="range"
                  id="stipend-range"
                  ref={salRange}
                  max={10}
                />
                <label htmlFor="stipend-range" className="flex justify-between">
                  <p>0L</p>
                  <p>2L</p>
                  <p>4L</p>
                  <p>6L</p>
                  <p>8L</p>
                  <p>10L</p>
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
            </form>
          )}

          {/* Jobs card showcase section  */}
          <div className="gap-1 p-4 mx-auto">
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
                  <form className="z-10 max-w-1/6 absolute top-4 right-[50%] bg-white mt-2 border-gray-500 border my-2 rounded p-3 text-wrap ml-5 flex flex-col">
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
                          onChange={handleFilterCheckBox}
                          type="checkbox"
                          id="partTime"
                        />
                        <label htmlFor="partTime">Part-Time</label>
                      </div>
                      <div className="flex gap-4">
                        <input
                          onChange={handleFilterCheckBox}
                          type="checkbox"
                          id="workFromHome"
                        />
                        <label htmlFor="workFromHome">Work from home</label>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                      <p>Desired minimum CTC (&#8377;) in Lakhs</p>
                      <input
                        type="range"
                        id="stipend-range"
                        ref={salRange}
                        max={10}
                      />
                      <label
                        htmlFor="stipend-range"
                        className="flex justify-between"
                      >
                        <p>0</p>
                        <p>2L</p>
                        <p>4L</p>
                        <p>6L</p>
                        <p>8L</p>
                        <p>10L</p>
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
                  </form>
                )}
              </div>
            )}
            <div>
              {/* Internship Cards with Pagination  */}
              <div className="flex gap-10 items-center">
                {/* <FaChevronLeft className="cursor-pointer" size={20} /> */}
                <JobPageCards jobs={filteredJobs} />
                {/* <FaChevronRight className="cursor-pointer" size={20} /> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Jobs;
