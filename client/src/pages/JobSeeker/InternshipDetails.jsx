import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { internshipsData } from "../../constants";
import { IoIosTrendingUp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { PiMoneyDuotone } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const internshipId = useParams().id;
  const [internship, setInternship] = useState();
  const [isApplyDivVisible, setIsApplyDivVisible] = useState(false);
  const [resume, setResume] = useState(null);
  const whyHireMe = useRef("");
  const [availability, setAvailability] = useState("");
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load the required internship

  const getAppliedInternships = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/jobSeeker/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching Internship", {
        duration: 2000,
      });
    }
  };

  const getInternship = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/getJobs/${internshipId}`
      );
      setInternship(res.data);
    } catch (error) {
      toast.error("Error Fetching Internship", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    try {
      const jobSeeker = JSON.parse(localStorage.getItem("jobSeeker"));
      setUserId(jobSeeker.id);
      setName(jobSeeker.username);
      setEmail(jobSeeker.email);
      getInternship();
      getAppliedInternships(userId).then((res) => {
        if (res.includes(internshipId)) {
          setIsAlreadyApplied(true);
        }
      });
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("jobSeeker");
      navigate("/login");
      setIsLoading(false);
    }
  }, [userId, setUserId, internshipId]);

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    const whyHireMePara = whyHireMe.current.value;
    formData.append(
      "data",
      JSON.stringify({
        coverLetter: whyHireMePara,
        availability,
        jobId: internshipId,
        userId,
        email,
        name,
      })
    );
    // API call to send data to server
    try {
      await axios.post("http://localhost:3000/api/apply/internship", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Applied successfully !", {
        duration: 2000,
        position: "top-center",
      });
      navigate("/internships");
    } catch (error) {
      toast.error("Error occurred", { duration: 2000, position: "top-center" });
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      ) : (
        <>
          {isApplyDivVisible ? (
            <div className="p-3">
              <h1 className="text-center text-3xl font-bold mb-2">
                Apply for {internship.role}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 max-w-[750px] rounded-md border">
                  <RxCrossCircled
                    onClick={() => setIsApplyDivVisible(false)}
                    size={20}
                    className="text-red-500 cursor-pointer"
                  />
                  <h2 className="font-semibold mt-7 text-2xl">
                    Application Form
                  </h2>
                  <div className="flex flex-col gap-4 mt-4">
                    <label className="flex gap-2">
                      Upload your resume:
                      <input
                        required
                        type="file"
                        onChange={handleResumeChange}
                      />
                    </label>
                    <textarea
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                      ref={whyHireMe}
                      placeholder="Why should we hire you for this role?"
                      rows={5}
                    />
                    <div>
                      <h2 className="font-semibold text-base mt-7">
                        Availability:
                      </h2>
                      <div className="flex gap-4">
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            name="availability"
                            value="morning"
                            checked={availability === "morning"}
                            onChange={(e) => setAvailability(e.target.value)}
                          />
                          Morning
                        </label>
                        <label className="flex gap-1">
                          <input
                            type="radio"
                            name="availability"
                            value="afternoon"
                            checked={availability === "afternoon"}
                            onChange={(e) => setAvailability(e.target.value)}
                          />
                          Afternoon
                        </label>
                      </div>
                    </div>
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
                Applying for {internship && internship.role}
              </h1>
              <div className="shadow-lg mx-auto mt-20 bg-white my-4 p-2 max-w-[750px] rounded-md border">
                {/* Heading  */}
                <div className="p-2 flex justify-between">
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <IoIosTrendingUp size={15} />
                    <p>Actively Hiring</p>
                  </div>
                  {/* Logo */}
                  <div>
                    <img
                      src="/img/work-x-logo.png"
                      className="w-7"
                      alt="company-logo"
                    />
                  </div>
                </div>

                {/* Title and Role  */}
                <h1 className="mt-2 font-bold">
                  {internship && internship.role}
                </h1>
                <h2 className="font-semibold">
                  {internship && internship.company}
                </h2>

                {/* Details  */}
                <div className="flex justify-between gap-14 mt-4">
                  <div>
                    <h3 className="flex items-center gap-2 font-medium">
                      <CiLocationOn /> {internship && internship.location}
                    </h3>
                    <h3 className="font-normal">Internship</h3>
                    <h3>Start Date - Immediately</h3>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-1 font-medium">
                      <IoTimeOutline /> Duration
                    </h3>
                    <h4>{internship && internship.duration} months</h4>
                  </div>
                  <div>
                    <h2 className="flex items-center gap-2 font-medium">
                      <PiMoneyDuotone /> Stipend
                    </h2>
                    <h3>₹ {internship && internship.salary} / month</h3>
                  </div>
                </div>

                {/* Date Posted and Apply Now Button*/}
                <div className="mt-4">
                  <h1>Posted on</h1>
                  <h1 className="text-green-400">
                    {internship &&
                      internship.createdAt &&
                      internship.createdAt.slice(0, 10)}
                  </h1>
                </div>
                <hr />

                {/* About company */}
                {/* <section>
              <h1 className="font-semibold mt-10 text-2xl">
                About {internship.company}
              </h1>
              <h3>{internship.aboutCompany}</h3>
            </section> */}

                {/* About role  */}
                <section>
                  <h2 className="font-semibold mt-7 text-2xl">
                    About Internship
                  </h2>
                  <h3>{internship && internship.description}</h3>
                </section>

                {/* Required Skills ?  */}
                <section>
                  <h2 className="font-semibold mt-7 text-base">
                    Required Skills
                  </h2>
                  <div className="flex mt-2 gap-3">
                    {internship &&
                      internship.skills &&
                      internship.skills.map((skill, idx) => (
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
                    {internship &&
                      internship.responsibilities &&
                      internship.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-sm mt-2">
                          {idx + 1}. {responsibility}
                        </li>
                      ))}
                  </ul>
                </section>

                {/* Number of Openings  */}
                <section>
                  <h2 className="font-semibold text-base mt-7">
                    Number of Openings -{" "}
                    <span>{internship && internship.openings}</span>
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
        </>
      )}

      <Footer />
    </>
  );
};

export default InternshipDetails;
