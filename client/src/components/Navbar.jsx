import React, { useState } from "react";
import { workXLogo } from "../constants";
import useMediaQuery from "../hooks/useMediaQuery";
import SidebarComponent from "./SidebarComponent";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InternshipsDropdown from "./dropdown/InternshipsDropdown";
import JobsDropdown from "./dropdown/JobsDropdown";

const Navbar = () => {
  const user = 1,
    recruiter = null; // use context here
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [isInternshipsVisible, setIsIntershipsVisible] = useState(false);
  const [isJobsVisible, setIsJobsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibleInternships = () => {
    setIsIntershipsVisible(true);
    setIsJobsVisible(false);
  };

  const toggleVisibleJobs = () => {
    setIsJobsVisible(true);
    setIsIntershipsVisible(false);
  };

  return (
    <nav className="flex justify-around">
      <div className="h-20 w-20 cursor-pointer" onClick={() => navigate("/")}>
        <img src={workXLogo} className="h-18 w-18" alt="logo" />
      </div>

      {!isAboveSmallScreens ? (
        <SidebarComponent user={user} />
      ) : (
        <div>
          <ul className="flex gap-14 items-center justify-center h-full">
            {user && !recruiter ? (
              <>
                <li>
                  <div
                    className="flex items-center gap-x-1 cursor-default"
                    onMouseEnter={toggleVisibleInternships}
                    onClick={() => setIsIntershipsVisible(false)}
                  >
                    <Link to={"/internships"}>Internships</Link>
                    <IoMdArrowDropdown />
                    {/* Internships dropdown */}
                    {isInternshipsVisible && <InternshipsDropdown />}
                  </div>
                </li>
                <li>
                  <div
                    onMouseEnter={toggleVisibleJobs}
                    onClick={() => setIsJobsVisible(false)}
                    className="flex items-center gap-x-1 cursor-default"
                  >
                    <Link to={"/jobs"}>Jobs</Link>
                    <IoMdArrowDropdown />
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
                    src={workXLogo}
                    onClick={() => navigate("/user")}
                    alt="user-profile"
                    className="w-7 h-7 rounded-full cursor-pointer"
                  />
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
