import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <header className="flex items-center justify-between bg-[#0C172F] p-4" style={{ height: '55px' }}>
      <nav className="flex items-center space-x-6 ml-auto mr-2">
        {[
          { text: 'Home', path: '/home' },
          { text: 'List Your Event', path: '/add-event' },
          { text: 'About Us', path: '/about' },
          { text: 'Contact Us', path: '/contact' }
        ].map(({ text, path }) => (
          <div key={text} className="relative">
            <button
              onClick={() => handleNavigation(path)}
              className="relative text-white px-4 py-2 font-extrabold transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
            >
              {text}
            </button>
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