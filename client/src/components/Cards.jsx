import React from "react";
import { courseData } from "../constants";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const Cards = () => {
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft -= 350;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft += 350;
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Slider  */}
      <div className="flex items-center relative">
        <div
          id="slider"
          className="flex gap-2 w-[1000px] h-full overflow-hidden whitespace-nowrap scroll-smooth"
        >
          {courseData.map((item) => (
            <img
              src={item.img}
              className="h-56 hover:scale-105 p-2 duration-200 cursor-pointer"
              key={item.id}
              alt="img"
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

export default Cards;
