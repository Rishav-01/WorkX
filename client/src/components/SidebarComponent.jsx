import React, { useState } from "react";
import { IoMdHome, IoIosMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const SidebarComponent = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hireTalent = false;
  const handleToggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex items-center z-20" onClick={handleToggleSidebar}>
        <IoIosMenu
          size={20}
          className={`${
            sidebarOpen
              ? "relative left-4 hidden"
              : "inline-block cursor-pointer"
          } `}
        />
        <RxCross2
          size={20}
          className={` ${
            sidebarOpen
              ? "cursor-pointer z-20 fixed right-40 text-black"
              : "hidden"
          } `}
        />
      </div>
      <div
        className={`bg-gray-300 fixed w-1/2 z-10 text-black font-bold h-80 ${
          sidebarOpen ? "left-1/2" : "right-full"
        }`}
      >
        <ul className="flex flex-col justify-center items-center mt-14">
          {user ? (
            <>
              <li className="flex gap-x-1 items-center rounded hover:shadow hover:bg-blue-500 my-1 p-1">
                <IoMdHome className="inline-block" size={15} />
                <Link to="/">Home</Link>
              </li>
              <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
                <Link to="/internships">Internships</Link>
              </li>
              <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
                <Link to="/jobs">Jobs</Link>
              </li>

              <li className="flex gap-x-1 items-center my-1 rounded hover:shadow hover:bg-blue-500 p-1">
                <CgProfile />
                <Link to="/user">Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
                <Link to="/login">Login</Link>
              </li>
              <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
                <Link to="/register">Register</Link>
              </li>
              <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
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
