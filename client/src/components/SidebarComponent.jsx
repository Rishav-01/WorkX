import React, { useState } from "react";
import { IoMdHome, IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const SidebarComponent = ({ handleLogout, jobSeeker, recruiter }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        className={`fixed top-0 right-0 z-20 p-2 bg-gray-100 rounded-full shadow-md transition duration-300 ease-in-out ${
          sidebarOpen ? "hidden" : "block"
        }`}
        onClick={handleToggleSidebar}
      >
        <IoIosMenu size={20} className="text-gray-600 cursor-pointer" />
      </button>

      <div
        className={`fixed top-0 right-0 z-10 w-64 bg-white shadow-md transition duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="p-2 bg-gray-100 rounded-full shadow-md transition duration-300 ease-in-out"
            onClick={handleToggleSidebar}
          >
            <RxCross2 size={20} className="text-gray-600 cursor-pointer" />
          </button>
        </div>

        <ul className="flex flex-col justify-center items-center py-4">
          {jobSeeker ? (
            <>
              <li className="flex gap-x-1 items-center py-2 px-4 hover:bg-gray-100">
                <IoMdHome className="inline-block" size={15} />
                <Link to="/">Home</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/internships">Internships</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to={`/user/${jobSeeker.id}/applications`}>
                  My Applications
                </Link>
              </li>

              <li
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex gap-x-1 items-center py-2 px-4 hover:bg-gray-100"
              >
                <IoLogOutOutline />
                <Link to="/">Logout</Link>
              </li>
            </>
          ) : recruiter ? (
            <>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/recruiter">Home</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/post-job">Post A Job</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/my-jobs">Posted Jobs</Link>
              </li>
              <li
                onClick={handleLogout}
                className="flex gap-1 items-center py-2 px-4 hover:bg-gray-100"
              >
                <IoLogOutOutline />
                <Link to="/">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/login">Login</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/register">Register</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-100">
                <Link to="/recruiter-login">Hire Talent</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;
