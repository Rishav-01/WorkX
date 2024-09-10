import React from "react";

const Statistics = () => {
  return (
    <div className="flex max-w-full justify-around items-center mt-10">
      <div>
        <div className="flex flex-col gap-1 justify-center">
          <h1 className="text-4xl text-blue-600 font-bold">500+</h1>
          <span className="text-xs font-semibold text-gray-600">
            Companies hiring
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-4xl text-blue-600 font-bold">1000+</h1>
          <span className="text-xs font-semibold text-gray-600">
            New openings everyday
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-4xl text-blue-600 font-bold">500+</h1>
          <span className="text-xs font-semibold text-gray-600">
            Active students
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-4xl text-blue-600 font-bold">500+</h1>
          <span className="text-xs font-semibold text-gray-600">Learners</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
