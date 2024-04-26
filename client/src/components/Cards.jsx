import React from "react";
import Card from "./Card";

const Cards = () => {
  return (
    <div className="flex items-center justify-center gap-5 bg-blue-50 h-[380px]">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Cards;
