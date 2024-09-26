import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { myJobs, recruiters } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostedJob = ({ job }) => {
  const navigate = useNavigate();
  // let salaryVal = parseInt(job.salary.replace(/,/g, ""));
  // const [isEditable, setIsEditable] = useState(false);
  // const [companyName, setCompanyName] = useState(job.company);
  // const [jobRole, setJobRole] = useState(job.role);
  // const [jobType, setJobType] = useState(job.type);
  // const [salary, setSalary] = useState(salaryVal);
  // const [openings, setOpenings] = useState(job.openings);

  // const isInternship = job.internship,
  //   isFullTime = job.fullTime;

  // const handleEdit = () => {
  //   setIsEditable(true);
  // };

  // const handleSave = () => {
  //   setIsEditable(false);
  // };

  return (
    <div
      className={`bg-white shadow-md rounded-lg max-w-full p-2 mb-5 ${
        job.openings === 0 && "bg-red-200"
      }`}
    >
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2 max-w-full">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Company Name:
          </label>
          <span className="text-gray-700 text-lg">{job.company}</span>
          {/* {isEditable ? (
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{companyName}</span>
          )} */}
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Job Role:
          </label>
          <span className="text-gray-700 text-lg">{job.role}</span>
          {/* {isEditable ? (
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{jobRole}</span>
          )} */}
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Job Type:
          </label>
          <span className="text-gray-700 text-lg">
            {job.type === "internship" ? "Internship" : "Full Time"}
          </span>
          {/* {isEditable ? (
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{jobType}</span>
          )} */}
        </div>
        <div className="flex flex-col w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            {job.type === "internship" ? "Stipend" : "Salary"}
          </label>
          <span className="text-gray-700 text-lg">
            ₹{job.salary} {job.type === "internship" ? " / month" : " LPA"}
          </span>
          {/* {isEditable ? (
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">
              ₹{salary} {isInternship ? " / month" : " LPA"}
            </span>
          )} */}
        </div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 p-2">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Openings Left
          </label>
          <span className="text-gray-700 text-lg">{job.openings}</span>
          {/* {isEditable ? (
            <input
              type="number"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{openings}</span>
          )} */}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`${job._id}/applicants`)}
            className="px-3 bg-blue-500 text-white rounded-lg"
          >
            View Applicants
          </button>
          {/* <div>
            {!isEditable ? (
              <button
                onClick={handleEdit}
                className="px-3 py-2 rounded-md text-white bg-orange-500"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-md text-white bg-green-500"
              >
                Save
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

const PostedJobs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allPostedJobs, setAllPostedJobs] = useState([]);

  const getJobs = async (recruiterEmail) => {
    try {
      const res = await axios.post("http://localhost:3000/api/getJobs", {
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

  // const recruiterId = 3;
  // const recruiter = recruiters.filter((item) => item.id === recruiterId)[0];
  // const allPostedJobs = myJobs.filter((job) =>
  //   recruiter.postedJobs.includes(job.id)
  // );
  return (
    <>
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
            All Posted Jobs for {}
          </h1>
          <div className="text-center">
            {allPostedJobs.map((job) => (
              <PostedJob key={job._id} job={job} />
            ))}
          </div>
        </section>
      )}

      <Footer recruiter={true} />
    </>
  );
};

export default PostedJobs;
