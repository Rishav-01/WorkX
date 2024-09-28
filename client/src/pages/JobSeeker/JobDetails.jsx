import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { jobsData } from "../../constants";
import { IoIosTrendingUp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { PiMoneyDuotone } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { RxCrossCircled } from "react-icons/rx";
import { FaBusinessTime } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  const navigate = useNavigate();
  const jobId = useParams().id;
  const [job, setJob] = useState();
  const [isApplyDivVisible, setIsApplyDivVisible] = useState(false);
  const [resume, setResume] = useState(null);
  const yearsOfExperience = useRef(null);
  const whyHireMe = useRef("");
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  // If job is already applied
  const getAppliedJobs = async (userId) => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}/api/jobSeeker/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  // Load required Job
  const getJob = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/getJobs/${jobId}`);
      setJob(res.data);
    } catch (error) {
      toast.error("Error Fetching Job", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    try {
      const jobSeeker = JSON.parse(localStorage.getItem("jobSeeker"));
      setUserId(jobSeeker.id);
      setName(jobSeeker.username);
      setEmail(jobSeeker.email);
      getJob();
      getAppliedJobs(userId).then((res) => {
        if (res.includes(jobId)) {
          setIsAlreadyApplied(true);
        }
      });
    } catch (error) {
      localStorage.removeItem("jobSeeker");
      navigate("/login");
    }
  }, [userId, setUserId, jobId]);

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    let whyHireMePara = whyHireMe.current.value;
    let yearsOfExperienceVal = Number(yearsOfExperience.current.value);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append(
      "data",
      JSON.stringify({
        jobId,
        userId,
        coverLetter: whyHireMePara,
        yearsOfExperience: yearsOfExperienceVal,
        name,
        email,
      })
    );

    // API call to send data to server
    try {
      await axios.post(`${VITE_BACKEND_URL}/api/apply/job`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Applied successfully", {
        duration: 2000,
        position: "top-center",
      });
      navigate("/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply", {
        duration: 2000,
        position: "top-center",
      });
    }
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
            <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 max-w-[750px] rounded-md border">
              <RxCrossCircled
                onClick={() => setIsApplyDivVisible(false)}
                size={20}
                className="text-red-500 cursor-pointer"
              />
              <h2 className="font-semibold mt-7 text-2xl">Application Form</h2>
              <div className="flex flex-col gap-4 mt-4">
                <label className="flex gap-2">
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
            Applying for {job && job.role}
          </h1>
          <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 max-w-[750px] rounded-md border">
            {/* Heading  */}
            <div className="p-2 flex justify-between">
              <div className="flex items-center gap-1 text-lg font-semibold">
                <IoIosTrendingUp size={15} />
                <p>Actively Hiring</p>
              </div>
              {/* Logo  */}
              <div>
                <img
                  src={`${VITE_BACKEND_URL}/uploads/${job && job.logo}`}
                  className="w-7"
                  alt="company-logo"
                />
              </div>
            </div>

            {/* Title and Role  */}
            <h1 className="mt-2 font-bold">{job && job.role}</h1>
            <h2 className="font-semibold">{job && job.company}</h2>

            {/* Details  */}
            <div className="flex justify-between gap-14 mt-4">
              <div>
                <h3 className="flex items-center gap-2 font-medium">
                  <CiLocationOn /> {job && job.location}
                </h3>
                <h3 className="font-normal">{job && job.type}</h3>
                <h3>Start Date - Immediately</h3>
              </div>
              <div>
                <h3 className="flex gap-1 items-center">
                  <FaBusinessTime /> Experience
                </h3>
                <h3>0 - {job && job.experience} years</h3>
              </div>
              <div>
                <h2 className="flex items-center gap-2 font-medium">
                  <PiMoneyDuotone /> Salary
                </h2>
                <h3>₹ {job && job.salary} LPA</h3>
              </div>
            </div>

            {/* Date Posted and Apply Now Button*/}
            <div className="mt-4">
              <h1>Posted on</h1>
              <h1 className="text-green-400">28/06/2024</h1>
            </div>
            <hr />

            {/* About company */}
            {/* <section>
              <h1 className="font-semibold mt-10 text-2xl">
                About {job && job.company}
              </h1>
              <h3>{job && job.aboutCompany}</h3>
            </section> */}

            {/* About role  */}
            <section>
              <h2 className="font-semibold mt-7 text-2xl">About Job</h2>
              <h3>{job && job.description}</h3>
            </section>

            {/* Required Skills ?  */}
            <section>
              <h2 className="font-semibold mt-7 text-base">Required Skills</h2>
              <div className="flex mt-2 gap-3">
                {job &&
                  job.skills &&
                  job.skills.map((skill, idx) => (
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
                {job &&
                  job.responsibilities &&
                  job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-sm mt-2">
                      {idx + 1}. {responsibility}
                    </li>
                  ))}
              </ul>
            </section>

            {/* Number of Openings  */}
            <section>
              <h2 className="font-semibold text-base mt-7">
                Number of Openings - <span>{job && job.openings}</span>
              </h2>
            </section>

            {/* Apply Button  */}
            <div className="text-center mt-7">
              <button
                disabled={isAlreadyApplied}
                onClick={() => {
                  setIsApplyDivVisible(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-4 py-2 bg-blue-500 text-white mx"
              >
                {isAlreadyApplied ? "Applied" : "Apply Now"}
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
