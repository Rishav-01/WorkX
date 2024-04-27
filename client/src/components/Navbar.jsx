import React from "react";
import { workXLogo } from "../constants";
import useMediaQuery from "../hooks/useMediaQuery";
import SidebarComponent from "./SidebarComponent";
import { IoIosSearch, IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const user = 1; // use context here
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  return (
    <nav className="flex justify-around">
      <div className="h-20 w-20">
        <img src={workXLogo} className="h-18 w-18" alt="logo" />
      </div>

      {!isAboveSmallScreens ? (
        <SidebarComponent />
      ) : (
        // <></>
        <div>
          <ul className="flex gap-9 items-center justify-center h-full">
            {user ? (
              <>
                <li>
                  <div className="flex items-center gap-x-1">
                    <p>Internships</p>
                    <IoMdArrowDropdown />
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-x-1">
                    <p>Jobs</p>
                    <IoMdArrowDropdown />
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
                    alt="user-profile"
                    className="w-7 h-7 rounded-full cursor-pointer"
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="border-blue-600 border px-4 py-2 rounded-full">
                    Login
                  </button>
                </li>
                <li>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Register
                  </button>
                </li>
                <li>
                  <button className="border-yellow-400 border hover:bg-yellow-500 hover:text-teal-50 transition duration-150 px-4 py-2 rounded-full">
                    Hire Talent
                  </button>
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
