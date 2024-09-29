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
    <div className="mt-14">
      <h1 className="text-center my-10 font-semibold text-3xl">
        Latest Jobs on WorkX
      </h1>
      {/* Different Categories */}
      <div className="flex flex-col items-center justify-center lg:flex-row mb-20">
        <h2 className="mb-4 lg:mb-0 mr-8 whitespace-nowrap">
          Popular categories:
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((item) => (
            <button
              key={item.id}
              id="jobs-categories"
              onClick={() => setSelectedCategory(item.title)}
              className={`px-2 py-1 text-sm ${
                selectedCategory && selectedCategory === item.title
                  ? "text-blue-500 border-blue-500 hover:text-blue-700"
                  : "text-gray-500 hover:text-gray-700 border-gray-300"
              } rounded-full border `}
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
