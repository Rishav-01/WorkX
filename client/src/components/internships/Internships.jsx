import { useState } from "react";
import InternshipCards from "./InternshipCards";
import { categories } from "../../constants";

export default function JobCards() {
  const [selectedCategory, setSelectedCategory] = useState("Big brands");
  return (
    <div className="mt-14">
      <h1 className="text-center my-10 font-semibold text-3xl">
        Latest Internships on WorkX
      </h1>
      {/* Different Categories */}
      <div className="flex flex-col items-center justify-center lg:flex-row mb-20">
        <h2 className="mb-4 lg:mb-0 mr-8 whitespace-nowrap">
          Popular categories:
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((item) => (
            <button
              key={item.id}
              id="internship-categories"
              onClick={() => setSelectedCategory(item.title)}
              className={`px-2 py-1 text-sm  ${
                selectedCategory === item.title
                  ? "text-blue-500 border-blue-500 hover:text-blue-700"
                  : "text-gray-500 hover:text-gray-700 border-gray-300"
              } rounded-full border `}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {/* Internship Listing Cards */}
      <InternshipCards category={selectedCategory} />
    </div>
  );
}
