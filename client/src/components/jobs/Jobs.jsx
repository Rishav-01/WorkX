import React, { useState } from "react";
import { categories } from "../../constants";
import JobCards from "./JobCards";

const Jobs = () => {
  const [activeState, setActiveState] = useState("");
  return (
    <div className="mt-14">
      {/* Different Categories */}
      <div className="flex flex-col items-center justify-center lg:flex-row mb-20">
        <h2 className="mb-4 lg:mb-0 mr-8 whitespace-nowrap">
          Popular categories:
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((item) => (
            <button
              id="jobs-categories"
              onClick={() => setActiveState(item.title)}
              className={`px-2 py-1 text-sm ${
                activeState === item.title
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
      <JobCards />
    </div>
  );
};

export default Jobs;
