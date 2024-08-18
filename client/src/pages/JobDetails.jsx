import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { jobsData } from "../constants";
import { IoIosTrendingUp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { PiMoneyDuotone } from "react-icons/pi";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import { RxCrossCircled } from "react-icons/rx";
import { FaBusinessTime } from "react-icons/fa";

const JobDetails = () => {
  const jobId = Number(useParams().id);
  const job = jobsData.find((item) => item.id === jobId);
  const [isApplyDivVisible, setIsApplyDivVisible] = useState(false);
  const [resume, setResume] = useState(null);
  const yearsOfExperience = useRef(null);
  const whyHireMe = useRef("");

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
    let whyHireMePara = whyHireMe.current.value;
    let yearsOfExperienceVal = Number(yearsOfExperience.current.value);
    console.log(jobId, whyHireMePara, yearsOfExperienceVal);
    whyHireMe.current.value = "";
    yearsOfExperience.current.value = null;
  };

  return (
    <>
      <Navbar />
      {isApplyDivVisible ? (
        <div className="p-3">
          <h1 className="text-center text-3xl font-bold mb-2">
            Apply for {job.role}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 w-[750px] rounded-md border">
              <RxCrossCircled
                onClick={() => setIsApplyDivVisible(false)}
                size={20}
                className="text-red-500 cursor-pointer"
              />
              <h2 className="font-semibold mt-7 text-2xl">Application Form</h2>
              <div className="flex flex-col gap-4 mt-4">
                <label>
                  Upload your resume:
                  <input type="file" onChange={handleResumeChange} />
                </label>
                <input
                  type="text"
                  ref={yearsOfExperience}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Years of experience"
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  ref={whyHireMe}
                  placeholder="Why should we hire you for this role?"
                  rows={5}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-3">
          <h1 className="text-center text-3xl font-bold mb-2">
            Applying for {job.role}
          </h1>
          <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 w-[750px] rounded-md border">
            {/* Heading  */}
            <div className="p-2 flex justify-between">
              <div className="flex items-center gap-1 text-lg font-semibold">
                <IoIosTrendingUp size={15} />
                <p>Actively Hiring</p>
              </div>
              {/* Logo  */}
              <div>
                <img
                  src="/img/work-x-logo.png"
                  className="w-7"
                  alt="company-logo"
                />
              </div>
            </div>

            {/* Title and Role  */}
            <h1 className="mt-2 font-bold">{job.role}</h1>
            <h2 className="font-semibold">{job.company}</h2>

            {/* Details  */}
            <div className="flex justify-between gap-14 mt-4">
              <div>
                <h3 className="flex items-center gap-2 font-medium">
                  <CiLocationOn /> {job.location}
                </h3>
                <h3 className="font-normal">{job.type}</h3>
                <h3>Start Date - Immediately</h3>
              </div>
              <div>
                <h3 className="flex gap-1 items-center">
                  <FaBusinessTime /> Experience
                </h3>
                <h3>0 - {job.experienceRequired} years</h3>
              </div>
              <div>
                <h2 className="flex items-center gap-2 font-medium">
                  <PiMoneyDuotone /> Salary
                </h2>
                <h3>₹ {job.salary} LPA</h3>
              </div>
            </div>

            {/* Date Posted and Apply Now Button*/}
            <div className="mt-4">
              <h1>Posted on</h1>
              <h1 className="text-green-400">28/06/2024</h1>
            </div>
            <hr />

            {/* About company */}
            <section>
              <h1 className="font-semibold mt-10 text-2xl">
                About {job.company}
              </h1>
              <h3>{job.aboutCompany}</h3>
            </section>

            {/* About role  */}
            <section>
              <h2 className="font-semibold mt-7 text-2xl">About Job</h2>
              <h3>{job.description}</h3>
            </section>

            {/* Required Skills ?  */}
            <section>
              <h2 className="font-semibold mt-7 text-base">Required Skills</h2>
              <div className="flex mt-2 gap-3">
                {job.skillsRequired.map((skill, idx) => (
                  <h3
                    key={idx}
                    className="text-xs rounded-xl px-2 py-2 bg-blue-200"
                  >
                    {skill}
                  </h3>
                ))}
              </div>
            </section>

            {/* Responsibilities  */}
            <section>
              <h2 className="font-semibold text-base mt-7">
                Responsibilities -:
              </h2>
              <ul>
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-sm mt-2">
                    {idx + 1}. {responsibility}
                  </li>
                ))}
              </ul>
            </section>

            {/* Number of Openings  */}
            <section>
              <h2 className="font-semibold text-base mt-7">
                Number of Openings - <span>{job.openings}</span>
              </h2>
            </section>

            {/* Apply Button  */}
            <div className="text-center mt-7">
              <button
                onClick={() => setIsApplyDivVisible(true)}
                className="px-4 py-2 bg-blue-500 text-white mx"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default JobDetails;
