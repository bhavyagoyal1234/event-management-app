import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleSidebar(); // Sidebar for extra options
  };

  return (
    <header className="text-white backdrop-blur-lg backdrop-saturate-150 backdrop-brightness-150 bg-black/70 hover:bg-black shadow-md px-6 py-3 h-[60px] flex items-center justify-between transition-all duration-300 ease-in-out">
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
            className="relative text-sm font-medium  hover:text-blue-600 px-4 py-2 transition duration-200"
          >
            {text}
            <span className="absolute inset-0 rounded-md border border-transparent hover:border-black hover:shadow-md transition-all duration-200"></span>
          </button>
        ))}
      </nav>

      {/* Always-visible Sidebar Toggle (extra options) */}
      <button
        className="hover:text-blue-600 transition-colors duration-200 ml-4"
        onClick={handleClick}
      >
        <FaBars size={20} />
      </button>
    </header>
  );
}

export default Navbar;
