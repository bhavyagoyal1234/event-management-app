import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleSidebar();
  }

  return (
    <header className="flex items-center justify-between bg-[#0C172F] p-4" style={{ height: '55px' }}>
      <nav className="flex items-center space-x-6 ml-auto mr-2">
        {[
          { text: 'Home', path: '/home' },
          { text: 'List Your Event', path: '/add-event' },
          { text: 'About Us', path: '/aboutus' },
          { text: 'Contact Us', path: '/contactus' }
        ].map(({ text, path }) => (
          <div
            key={text}
            className="relative cursor-pointer"
            onClick={() => handleNavigation(path)}
          >
            <button
              className="relative text-white px-4 py-2 font-extrabold transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
            >
              {text}
            </button>
            <span className="absolute inset-0 rounded-full border border-white opacity-30 hover:opacity-100 hover:border-2"></span>
          </div>
        ))}
        <button className="text-white cursor-pointer" onClick={(e) => handleClick(e)}>
          <FaBars size={24} />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;