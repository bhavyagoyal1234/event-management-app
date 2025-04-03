import React, { useState, useEffect, useRef } from "react";
import EventsPage from "./HomePage3";
import EventGenres from "./HomePage2";
import Navbar from "./HomeNavbar";
import Sidebar from "./Homesidebar";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="pt-16">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-16 right-0 w-80 h-[calc(100%-4rem)] z-40"
        >
          <Sidebar />
        </div>
      )}

      <section className="mb-8">
        <EventsPage />
      </section>

      <section>
        <EventGenres />
      </section>
    </div>
  );
}

export default HomePage;