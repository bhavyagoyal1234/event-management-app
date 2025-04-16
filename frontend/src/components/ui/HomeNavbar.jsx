import { useUser } from "@/context/userContext";
import React from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate();

  const {isLoggedIn} = useUser();
  console.log('isLoggedIn', isLoggedIn);

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleSidebar(); // Sidebar for extra options
  };

  return (
    <header className="text-white backdrop-blur-lg backdrop-saturate-150 backdrop-brightness-150 bg-black shadow-md px-6 py-3 h-[60px] flex items-center justify-between transition-all duration-300 ease-in-out hover:bg-black/70  ">
      {/* Logo or App Name */}
      <div className="text-lg md:text-xl font-bold">Evently</div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-4">
        {[
          { text: "Home", path: "/home" },
          { text: "List Your Event", path: "/add-event" },
          { text: "About Us", path: "/aboutus" },
          { text: "Contact Us", path: "/contactus" },
        ].map(({ text, path }) => (
          <button
            key={text}
            onClick={() => handleNavigation(path)}
            className="relative text-sm font-medium hover:text-blue-600 px-4 py-2 transition duration-200"
          >
            {text}
            <span className="absolute inset-0 rounded-md border border-transparent hover:border-black hover:shadow-md transition-all duration-200"></span>
          </button>
        ))}
      </nav>

      {/* Right-side actions: Login and Sidebar */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn && <button
          onClick={() => handleNavigation("/login")}
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition duration-200"
        >
          Login
        </button>}

        {/* Sidebar Toggle */}
        <button
          className="hover:text-blue-600 transition-colors duration-200"
          onClick={handleClick}
        >
          {isSidebarOpen? <IoClose size={30}/> : <IoMenu size={30} /> }
        </button>
      </div>
    </header>
  );
}

export default Navbar;
