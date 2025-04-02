import React from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between bg-[#0C172F] p-4" style={{ height: '55px' }}>
      {/* Navigation Links and Hamburger Menu */}
      <nav className="flex items-center space-x-6 ml-auto mr-2">
        {['Home', 'List Your Event', 'About Us', 'Contact Us'].map((text) => (
          <div key={text} className="relative">
            <button
              className="relative text-white px-4 py-2 font-extrabold transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
            >
              {text}
            </button>
            {/* Border Effect */}
            <span className="absolute inset-0 rounded-full border border-white opacity-30 hover:opacity-100 hover:border-2"></span>
          </div>
        ))}
        <div className="text-white cursor-pointer" onClick={toggleSidebar}>
          <FaBars size={24} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;