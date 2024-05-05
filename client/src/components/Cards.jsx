import React from "react";
import {
  courseTwo,
  courseOne,
  courseThree,
  courseFour,
} from "../constants/index";

const Cards = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      {/* Slider  */}
      <div className="">
        <img src={courseOne} alt="" />
        <img src={courseTwo} alt="" />
        <img src={courseThree} alt="" />
        <img src={courseFour} alt="" />
      </div>
    </div>
  );
};

export default Cards;
