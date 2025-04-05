import React, { useState, useEffect, useRef } from "react";
import Navbar from "./HomeNavbar"; // Ensure the correct path to your Navbar component
import Sidebar from "./Homesidebar"; // Ensure the correct path to your Sidebar component

function NavSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    console.log("isSidebaropen",isSidebarOpen)
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      console.log("Clicked outside, closing sidebar");
      if(isSidebarOpen) setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
      <div className="fixed top-0 left-0 w-full z-50">
          <div ref={sidebarRef}>
              <Navbar toggleSidebar={toggleSidebar} />
              {isSidebarOpen && (<div
                  className="fixed top-16 right-0 w-80 h-[calc(100%-4rem)] z-40"
              >
                  <Sidebar />
              </div>
              )}
          </div>
      </div>
  );
}

export default NavSidebar;