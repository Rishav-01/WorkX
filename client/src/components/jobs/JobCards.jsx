import { useState } from "react";
import InternshipCards from "./InternshipCards";

export default function JobCards() {
  const [activeState, setActiveState] = useState("");
  return (
    <div className="mt-14">
      {/* Different Categories */}
      <div className="flex flex-col items-center justify-center lg:flex-row mb-20">
        <h2 className="mb-4 lg:mb-0 mr-8 whitespace-nowrap">
          Popular categories:
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveState("big-brands")}
            className={`px-2 py-1 text-sm ${
              activeState === "big-brands"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } rounded-full border `}
          >
            Big brands
          </button>
          <button
            onClick={() => setActiveState("work-from-home")}
            className={`${
              activeState === "work-from-home"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm rounded-full border`}
          >
            Work from home
          </button>
          <button
            onClick={() => setActiveState("part-time")}
            className={`${
              activeState === "part-time"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm rounded-full border`}
          >
            Part-time
          </button>
          <button
            onClick={() => setActiveState("mba")}
            className={`${
              activeState === "mba"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm  rounded-full border`}
          >
            MBA
          </button>
          <button
            onClick={() => setActiveState("engineering")}
            className={`${
              activeState === "engineering"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm rounded-full border`}
          >
            Engineering
          </button>
          <button
            onClick={() => setActiveState("media")}
            className={`${
              activeState === "media"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm rounded-full border`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveState("design")}
            className={`${
              activeState === "design"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm rounded-full border`}
          >
            Design
          </button>
          <button
            onClick={() => setActiveState("data-science")}
            className={`${
              activeState === "data-science"
                ? "text-blue-500 border-blue-500 hover:text-blue-700"
                : "text-gray-500 hover:text-gray-700 border-gray-300"
            } px-2 py-1 text-sm  rounded-full border`}
          >
            Data Science
          </button>
        </div>
      </div>
      {/* Job Listing Cards */}
      <InternshipCards />
    </div>
  );
}
