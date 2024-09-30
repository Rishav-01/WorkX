import React, { useEffect, useState } from "react";
import { categories } from "../../constants";
import JobCards from "./JobCards";
import axios from "axios";
import toast from "react-hot-toast";

const Jobs = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const { VITE_BACKEND_URL } = import.meta.env;

  const getJobs = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/jobSeeker/jobs`);
      setAllJobs(res.data);
    } catch (error) {
      toast.error("Error fetching jobs", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-5">
      <h1 className="text-center font-bold text-2xl mb-6">
        Latest Jobs on WorkX
      </h1>
      {/* Different Categories */}
      <div className="text-base md:text-lg flex flex-col items-center justify-center mb-8">
        <h2 className="mb-4 font-bold">Popular categories:</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((item) => (
            <button
              key={item.id}
              id="jobs-categories"
              onClick={() => setSelectedCategory(item.title)}
              className={`p-2 rounded-full border-2 text-sm ${
                selectedCategory && selectedCategory === item.title
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "text-gray-500 bg-white hover:bg-gray-100"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {/* Job Listing Cards */}
      <JobCards category={selectedCategory} allJobs={allJobs} />
    </div>
  );
};

export default Jobs;
