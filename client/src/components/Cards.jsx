import React from "react";
import {
  courseTwo,
  courseOne,
  courseThree,
  courseFour,
} from "../constants/index";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const Cards = () => {
  const slideLeft = () => {};
  const slideRight = () => {};
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* Slider  */}
      <div className="flex gap-3">
        <img src={courseOne} alt="" />
        <img src={courseTwo} alt="" />
        <img src={courseThree} alt="" />
        <img src={courseFour} alt="" />
      </div>
      <div className="flex gap-2">
        <button onClick={slideLeft}>
          <CiCircleChevLeft size={30} />
        </button>
        <button onClick={slideRight}>
          <CiCircleChevRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Cards;
