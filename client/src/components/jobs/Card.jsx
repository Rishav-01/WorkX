import React from "react";

const Card = () => {
  return (
    <div className="w-[250px] h-full mt-15 rounded-md border cursor-pointer hover:scale-105 transition duration-200">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[150px] w-full rounded-t-md object-cover"
      />
      <div className="p-2">
        <h1 className="inline-flex items-center text-lg font-semibold">
          About Macbook &nbsp;
        </h1>
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
