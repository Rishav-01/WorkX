import React from "react";

const Card = () => {
  return (
    <div className="w-[250px] rounded-md border mt-5 cursor-pointer hover:scale-105 transition duration-200">
      <div className="p-4">
        <div>
          <h1 className="text-lg font-semibold">
            Software Developer Intern &nbsp;
          </h1>
          <span>Company Name</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?
        </p>
        <div className="mt-2">
          <span className="mb-1 mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-900">
            #Internship
          </span>
          <span className="mb-1 mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-900">
            #Job
          </span>
          <span className="mb-1 mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-900">
            #Entry Level
          </span>
        </div>
        <button
          type="button"
          className="mt-2 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Card;
