import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const InternshipPageCards = ({ internships }) => {
  return (
    <div>
      {internships.length === 0
        ? "No Internships"
        : internships.map((item) => (
            <InternshipPageCard key={item._id} item={item} />
          ))}
    </div>
  );
};

const InternshipPageCard = ({ item }) => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/internships/internshipDetails/${item._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="shadow-lg bg-white hover:bg-slate-100 my-4 p-2 cursor-pointer hover:scale-105 transition max-w-[700px] duration-200 rounded-md border"
    >
      {/* Heading  */}
      <div className="p-2 flex justify-between">
        <div className="inline-flex items-center gap-1 text-lg font-semibold">
          <IoIosTrendingUp size={15} />
          <p>Actively Hiring</p>
        </div>
        {/* Logo  */}
        <div>
          <img
            src={`${VITE_BACKEND_URL}/uploads/${item.logo}`}
            className="w-7"
            alt="company-logo"
          />
        </div>
      </div>

      {/* Title and Role  */}
      <h1 className="mt-2 font-bold">{item.role}</h1>
      <h2 className="font-semibold">{item.company}</h2>

      {/* Details  */}
      <div className="flex gap-14 mt-4">
        <div>
          <h3 className="font-medium">{item.location}</h3>
          <h3 className="font-normal">Internship ({item.mode})</h3>
          <h3>Start Date - Immediately</h3>
        </div>
        <div>
          <h3 className="font-medium">Duration</h3>
          <h4>{item.duration} months</h4>
        </div>
        <div>
          <h2 className="font-medium">Stipend</h2>
          <h3>₹ {item.salary} / month</h3>
        </div>
      </div>

      {/* Date Posted and Apply Now Button*/}
      <div className="mt-4">
        <h1>Posted on</h1>
        <h1 className="text-green-400">{item.createdAt.slice(0, 10)}</h1>
      </div>
    </div>
  );
};

export default InternshipPageCards;
