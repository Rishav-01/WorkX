import React from "react";
import JobCard from "./JobCard";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import useMediaQuery from "../../hooks/useMediaQuery";

const JobCards = ({ category, allJobs }) => {
  const filteredJobs = allJobs.filter((item) => {
    return item.category === category || item.mode === category;
  });
  const slideLeft = () => {
    let slider = document.getElementById("job-card");
    slider.scrollLeft -= 350;
  };
  const slideRight = () => {
    let slider = document.getElementById("job-card");
    slider.scrollLeft += 350;
  };
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Slider  */}
      <div className="flex items-center justify-center relative">
        <div
          id="job-card"
          className={`flex gap-2 ${
            isAboveSmallScreens ? "max-w-[1000px]" : "max-w-sm"
          } h-full overflow-hidden whitespace-nowrap scroll-smooth`}
        >
          {!category && <p className="text-base">Select a category</p>}
          {category && filteredJobs.length === 0 ? (
            <p className="h-32 text-base w-full text-center">
              No jobs available for {category} !
            </p>
          ) : (
            filteredJobs.map((item) => (
              <JobCard
                id={item._id}
                key={item._id}
                company={item.company}
                location={item.location}
                salary={item.salary}
                yearsOfExperience={item.experience}
              />
            ))
          )}
        </div>
      </div>

      {/* Buttons  */}
      {filteredJobs.length > 0 && (
        <div className="flex gap-2">
          <button onClick={slideLeft}>
            <CiCircleChevLeft
              className="opacity-50 hover:opacity-100"
              size={35}
            />
          </button>
          <button onClick={slideRight}>
            <CiCircleChevRight
              className="opacity-50 hover:opacity-100"
              size={35}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCards;
