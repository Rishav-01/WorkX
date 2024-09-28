import React, { useContext, useState } from "react";
import { workXLogo } from "../constants";
import useMediaQuery from "../hooks/useMediaQuery";
import SidebarComponent from "./SidebarComponent";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InternshipsDropdown from "./dropdown/InternshipsDropdown";
import JobsDropdown from "./dropdown/JobsDropdown";
import { JobSeekerContext } from "../context/JobSeekerContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { RecruiterContext } from "../context/RecruiterContext";
import toast from "react-hot-toast";

const Navbar = ({ selectedTab }) => {
  const { jobSeeker, setJobSeeker } = useContext(JobSeekerContext);
  const { recruiter, setRecruiter } = useContext(RecruiterContext);
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isInternshipsVisible, setIsIntershipsVisible] = useState(false);
  const [isJobsVisible, setIsJobsVisible] = useState(false);
  const [isUserDivVisible, setIsUserDivVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibleInternships = () => {
    setIsIntershipsVisible((prev) => !prev);
    setIsJobsVisible(false);
  };

  const toggleVisibleJobs = () => {
    setIsJobsVisible((prev) => !prev);
    setIsIntershipsVisible(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("jobSeeker");
        localStorage.removeItem("recruiter");
        setJobSeeker(null);
        setRecruiter(null);
        setIsUserDivVisible(false);
        toast.success("Successfully Logged out !", { duration: 2000 });
        navigate("/");
      })
      .catch(() => toast.error("Some error occurred", { duration: 2000 }));
  };

  return (
    <nav className="flex justify-around">
      <div
        className="h-20 w-20 cursor-pointer"
        onClick={() => {
          if (recruiter) {
            navigate("/recruiter");
          } else navigate("/");
        }}
      >
        <img src={workXLogo} className="h-18 w-18" alt="logo" />
      </div>

      {!isAboveSmallScreens ? (
        <SidebarComponent
          handleLogout={handleLogout}
          jobSeeker={jobSeeker}
          recruiter={recruiter}
        />
      ) : (
        <div>
          <ul className="flex gap-14 items-center justify-center h-full">
            {jobSeeker && (
              <>
                <li>
                  <div className="flex items-center gap-x-1 cursor-default">
                    <Link to={"/internships"}>Internships</Link>
                    <IoMdArrowDropdown onClick={toggleVisibleInternships} />
                    {/* Internships dropdown */}
                    {isInternshipsVisible && <InternshipsDropdown />}
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-x-1 cursor-default">
                    <Link to={"/jobs"}>Jobs</Link>
                    <IoMdArrowDropdown onClick={toggleVisibleJobs} />
                    {isJobsVisible && <JobsDropdown />}
                  </div>
                </li>
                <li className="flex items-center gap-x-2">
                  <div>
                    <IoIosSearch />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="outline-none"
                      placeholder="Search.."
                    />
                  </div>
                </li>
                <li>
                  <span
                    onMouseEnter={() => setIsUserDivVisible(true)}
                    src={workXLogo}
                    alt="user-profile"
                    className="w-7 h-7 p-2 bg-orange-300 rounded-full cursor-pointer"
                  >
                    {jobSeeker.name ? jobSeeker.name : jobSeeker.username}
                  </span>
                  {isUserDivVisible && (
                    <div
                      onMouseLeave={() => setIsUserDivVisible(false)}
                      className="absolute rounded shadow-md z-10 p-2 bg-white"
                    >
                      <ul className="flex flex-col">
                        <li className="p-1 rounded hover:bg-slate-200 transition duration-100">
                          <Link to={"/"}>Home</Link>
                        </li>
                        <li className="p-1 rounded hover:bg-slate-200 transition duration-100">
                          <Link to={`/user/${jobSeeker.id}/applications`}>
                            My Applications
                          </Link>
                        </li>
                        <li className="p-1 rounded hover:bg-slate-200 transition duration-100">
                          <Link onClick={handleLogout}>Logout</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            )}
            {recruiter && (
              <>
                <li className={`${selectedTab === "home" && "underline"}`}>
                  <Link to={"/recruiter"}>Home</Link>
                </li>
                <li className={`${selectedTab === "postJob" && "underline"}`}>
                  <Link to={"/post-job"}>Post a Job</Link>
                </li>
                <li className={`${selectedTab === "myJobs" && "underline"}`}>
                  <Link to={"/my-jobs"}>My jobs</Link>
                </li>
                <li>
                  <Link to={"/"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!jobSeeker && !recruiter && (
              <>
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="border-blue-600 border px-4 py-2 rounded-full"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/recruiter-login"}
                      className="border-yellow-400 border hover:bg-yellow-500 hover:text-teal-50 transition duration-150 px-4 py-2 rounded-full"
                    >
                      Hire Talent
                    </Link>
                  </li>
                </>
              </>
            )}
            <li>
              <button className="bg-slate-100 px-4 py-2 rounded-full">
                About Us
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
