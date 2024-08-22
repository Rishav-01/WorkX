import React, { useContext, useState } from "react";
import { workXLogo } from "../constants";
import useMediaQuery from "../hooks/useMediaQuery";
import SidebarComponent from "./SidebarComponent";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InternshipsDropdown from "./dropdown/InternshipsDropdown";
import JobsDropdown from "./dropdown/JobsDropdown";
import { JobSeekerContext } from "../context/JobSeekerContext";

const Navbar = () => {
  const { jobSeeker, setJobSeeker } = useContext(JobSeekerContext);
  const [recruiter, setRecruiter] = useState(null);
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
    localStorage.removeItem("jobSeeker");
    setJobSeeker(null);
    setIsUserDivVisible(false);
    navigate("/");
  };

  return (
    <nav className="flex justify-around">
      <div className="h-20 w-20 cursor-pointer" onClick={() => navigate("/")}>
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
            {jobSeeker && !recruiter ? (
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
                  <img
                    onMouseEnter={() => setIsUserDivVisible(true)}
                    src={workXLogo}
                    alt="user-profile"
                    className="w-7 h-7 rounded-full cursor-pointer"
                  />
                  {isUserDivVisible && (
                    <div
                      onMouseLeave={() => setIsUserDivVisible(false)}
                      className="absolute rounded shadow-md z-10 p-2 bg-white"
                    >
                      <ul className="flex flex-col">
                        <Link to={"/"} className="p-1">
                          Home
                        </Link>
                        <Link
                          to={`/user/${jobSeeker.id}/applications`}
                          className="p-1"
                        >
                          My Applications
                        </Link>
                        <Link onClick={handleLogout} className="p-1">
                          Logout
                        </Link>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            ) : (
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
