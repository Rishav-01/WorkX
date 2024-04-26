import { IoMdHome, IoIosMenu } from "react-icons/io";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import React, { useState } from "react";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sidebar collapsed={collapsed}>
      <Menu>
        <MenuItem icon={IoMdHome}>Home</MenuItem>
      </Menu>
      <button onClick={handleToggleSidebar}>
        <IoIosMenu />
      </button>
    </Sidebar>
  );
};

export default SidebarComponent;
