import React, { useState } from "react";
import { IoMdHome, IoIosMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const SidebarComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex items-center z-20" onClick={handleToggleSidebar}>
        <IoIosMenu
          className={`${
            sidebarOpen ? "text-white relative left-4 hidden" : "inline-block"
          } `}
        />
        <RxCross2
          className={` ${
            sidebarOpen ? "relative left-2 inline-block text-white" : "hidden"
          } `}
        />
      </div>
      <div
        className={`bg-black fixed w-24 text-white font-bold h-full ${
          sidebarOpen ? "right-0" : "right-full"
        }`}
      >
        <ul className="flex flex-col justify-center items-center mt-14">
          <li className="flex gap-x-1 items-center rounded hover:shadow hover:bg-blue-500 my-1 p-1">
            <IoMdHome className="inline-block" size={15} />
            <a href="/">Home</a>
          </li>
          <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
            <a href="/">Login</a>
          </li>
          <li className="my-1 rounded hover:shadow hover:bg-blue-500 p-1">
            <a href="/">Register</a>
          </li>
          <li className="flex gap-x-1 items-center my-1 rounded hover:shadow hover:bg-blue-500 p-1">
            <CgProfile />
            <a href="/">Profile</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;
