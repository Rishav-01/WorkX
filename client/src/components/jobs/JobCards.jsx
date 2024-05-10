import React from "react";
import JobCard from "./JobCard";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { jobsData } from "../../constants";
import useMediaQuery from "../../hooks/useMediaQuery";

const JobCards = () => {
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
            isAboveSmallScreens && "w-[1000px]"
          } h-full overflow-hidden whitespace-nowrap scroll-smooth`}
        >
          {jobsData.map((item) => (
            <JobCard
              title={item.title}
              company={item.company}
              location={item.location}
              salary={item.salary}
              yearsOfExperience={item.experienceRequired}
            />
          ))}
        </div>
      </div>

      {/* Buttons  */}
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
    </div>
  );
};

export default JobCards;
