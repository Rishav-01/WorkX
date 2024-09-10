import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { myJobs, recruiters } from "../../constants";
import { useNavigate } from "react-router-dom";

const PostedJob = ({ job }) => {
  const navigate = useNavigate();
  let salaryVal = parseInt(job.salary.replace(/,/g, ""));
  const [isEditable, setIsEditable] = useState(false);
  const [companyName, setCompanyName] = useState(job.company);
  const [jobRole, setJobRole] = useState(job.role);
  const [jobType, setJobType] = useState(job.type);
  const [salary, setSalary] = useState(salaryVal);
  const [openings, setOpenings] = useState(job.openings);

  const isInternship = job.internship,
    isFullTime = job.fullTime;

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg max-w-full p-2 mb-5">
      <div className="flex flex-col items-center md:flex-row lg:flex-row">
        <div className="md:w-1/2 xl:w-1/3 p-2 max-w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Name:
          </label>
          {isEditable ? (
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{companyName}</span>
          )}
        </div>
        <div className="md:w-1/2 xl:w-1/3 p-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Role:
          </label>
          {isEditable ? (
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{jobRole}</span>
          )}
        </div>
        <div className="md:w-1/2 xl:w-1/3 p-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Type:
          </label>
          {isEditable ? (
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{jobType}</span>
          )}
        </div>
        <div className=":w-1/2 xl:w-1/3 p-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Salary:
          </label>
          {isEditable ? (
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
          )}
        </div>
        <div className="md:w-1/2 xl:w-1/3 p-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Openings
          </label>
          {isEditable ? (
            <input
              type="number"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          ) : (
            <span className="text-gray-700 text-lg">{openings}</span>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`${job.id}/applicants`)}
            className="px-3 bg-blue-500 text-white rounded-lg"
          >
            View Applicants
          </button>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

const PostedJobs = () => {
  const recruiterId = 3;
  const recruiter = recruiters.filter((item) => item.id === recruiterId)[0];
  const allPostedJobs = myJobs.filter((job) =>
    recruiter.postedJobs.includes(job.id)
  );
  return (
    <>
      <Navbar selectedTab={"myJobs"} />
      <section>
        <h1 className="text-center font-bold text-2xl my-5">
          All Posted Jobs for {}
        </h1>
        <div className="text-center">
          {allPostedJobs.map((job) => (
            <PostedJob key={job.id} job={job} />
          ))}
        </div>
      </section>
      <Footer recruiter={true} />
    </>
  );
};

export default PostedJobs;
