import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { myJobs, recruiters } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostedJob = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white shadow-md rounded-lg max-w-full p-2 mb-5 ${
        job.openings === 0 && "bg-red-300"
      }`}
    >
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2 max-w-full">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Company Name:
          </label>
          <span className="text-gray-700 text-lg">{job.company}</span>
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Job Role:
          </label>
          <span className="text-gray-700 text-lg">{job.role}</span>
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Job Type:
          </label>
          <span className="text-gray-700 text-lg">
            {job.type === "internship" ? "Internship" : "Full Time"}
          </span>
        </div>
        <div className="flex flex-col w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            {job.type === "internship" ? "Stipend" : "Salary"}
          </label>
          <span className="text-gray-700 text-lg">
            ₹{job.salary} {job.type === "internship" ? " / month" : " LPA"}
          </span>
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Openings Left
          </label>
          <span className="text-gray-700 text-lg">{job.openings}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`${job._id}/applicants`)}
            className="px-3 bg-blue-500 text-white rounded-lg"
          >
            View Applicants
          </button>
        </div>
      </div>
    </div>
  );
};

const PostedJobs = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allPostedJobs, setAllPostedJobs] = useState([]);

  const getJobs = async (recruiterEmail) => {
    try {
      const res = await axios.post(`${VITE_BACKEND_URL}/api/getJobs`, {
        recruiterEmail,
      });
      setAllPostedJobs(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching posted jobs");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      let email = JSON.parse(localStorage.getItem("recruiter")).email;
      getJobs(email);
    } catch (err) {
      localStorage.removeItem("recruiter");
      navigate("/recruiter-login");
    }
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navbar selectedTab={"myJobs"} />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <section>
          <h1 className="text-center font-bold text-2xl my-5">
            All Posted Jobs
          </h1>
          <div className="text-center">
            {allPostedJobs.map((job) => (
              <PostedJob key={job._id} job={job} />
            ))}
          </div>
        </section>
      )}

      <Footer recruiter={true} />
    </div>
  );
};

export default PostedJobs;
