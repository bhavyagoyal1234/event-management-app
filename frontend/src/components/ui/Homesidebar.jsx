import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaTicketAlt, FaLifeRing, FaChevronRight } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/myprofile');
  };

  const handleEventsClick = () => {
    navigate('/myevent');
  };

  const handleBookingsClick = () => {
    navigate('/mybooking');
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  const handleLogOut = () => {
    // Open the modal
    setIsModalOpen(true);
  };

  const confirmLogOut = () => {
    // Remove user and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Log the action for debugging
    console.log('User and token removed from local storage');

    // Show a toast notification
    toast.success('Logout successful');

    // Navigate to the login page
    navigate('/login');

    // Close the modal
    setIsModalOpen(false);
  };

  const cancelLogOut = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="w-85 h-full bg-white shadow-md flex flex-col relative">
      <div className="p-4 border-b shadow-md" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-xl font-bold">Hey!</h2>
      </div>
      <ul className="p-4 flex-grow space-y-4">
        {[
          { icon: <FaUser className="text-gray-600" />, text: 'My Profile', subtext: 'View and edit your profile', onClick: handleProfileClick },
          { icon: <FaCalendarAlt className="text-gray-600" />, text: 'My Events', subtext: 'View all your events', onClick: handleEventsClick },
          { icon: <FaTicketAlt className="text-gray-600" />, text: 'My Bookings', subtext: 'View all your bookings and purchases', onClick: handleBookingsClick },
          { icon: <FaLifeRing className="text-gray-600" />, text: 'Help & Support', subtext: 'Get help and support', onClick: handleSupportClick },
        ].map((item, index) => (
          <li key={index}>
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded">
              <div className="flex items-center space-x-3 w-full">
                {item.icon}
                <div className="flex-grow">
                  <button
                    onClick={item.onClick}
                    className="text-gray-800 focus:outline-none text-left"
                  >
                    {item.text}
                    <p className="text-sm text-gray-500">{item.subtext}</p>
                  </button>
                </div>
              </div>
              <FaChevronRight className="text-gray-400" />
            </div>
            <hr className="border-t border-gray-200" />
          </li>
        ))}
      </ul>
      <div className="p-4 border-t shadow-md" style={{ boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Button
          onClick={handleLogOut}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
          size="sm"
        >
          Log Out
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to log out?</h3>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={cancelLogOut}
                className="bg-gray-300 text-gray-800 cursor-pointer hover:bg-gray-300 hover:text-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmLogOut}
                className="bg-red-500 text-white cursor-pointer hover:bg-red-500 hover:text-white"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;