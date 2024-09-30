import { useEffect, useState } from "react";
import InternshipCards from "./InternshipCards";
import { categories } from "../../constants";
import toast from "react-hot-toast";
import axios from "axios";

export default function JobCards() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allInternships, setAllInternships] = useState([]);

  const getInternships = async () => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}/api/jobSeeker/internships`
      );
      setAllInternships(res.data);
    } catch (error) {
      toast.error("Error fetching Internships", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getInternships();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-6">
      <h1 className="text-center text-2xl font-bold mb-6">
        Latest Internships on WorkX
      </h1>
      {/* Different Categories */}
      <div className="text-base md:text-lg flex flex-col items-center justify-center mb-8">
        <h2 className="font-bold mb-4">Popular categories:</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((item) => (
            <button
              key={item.id}
              id="internship-categories"
              onClick={() => setSelectedCategory(item.title)}
              className={`p-2 text-sm rounded-full border-2 ${
                selectedCategory && selectedCategory === item.title
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {/* Internship Listing Cards */}
      <InternshipCards
        category={selectedCategory}
        allInternships={allInternships}
      />
    </div>
  );
}
