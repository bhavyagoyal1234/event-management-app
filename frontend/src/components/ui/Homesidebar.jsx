import React from 'react';
import { FaUser, FaCalendarAlt, FaTicketAlt, FaSignOutAlt, FaLifeRing, FaChevronRight } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

function Sidebar() {

    const handleBookNow = () => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    
        // Navigate to the ticket booking page with event information
        navigate('/ticketbooking', { state: { event } });
      };
    
  return (
    <div className="w-85 h-full bg-white shadow-md flex flex-col">
      <div className="p-4 border-b shadow-md" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-xl font-bold">Hey!</h2>
      </div>
      <ul className="p-4 flex-grow space-y-4">
        {[ 
          { icon: <FaUser className="text-gray-600" />, text: 'My Profile', subtext: 'View and edit your profile' },
          { icon: <FaCalendarAlt className="text-gray-600" />, text: 'My Events', subtext: 'View all your events' },
          { icon: <FaTicketAlt className="text-gray-600" />, text: 'My Bookings', subtext: 'View all your bookings and purchases' },
          { icon: <FaLifeRing className="text-gray-600" />, text: 'Help & Support', subtext: 'Get help and support' },
        ].map((item, index) => (
          <li key={index}>
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded">
              <div className="flex items-center space-x-3">
                {item.icon}
                <div>
                  <span className="text-gray-800">{item.text}</span>
                  <p className="text-sm text-gray-500">{item.subtext}</p>
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
          onClick={handleBookNow}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
          size="sm"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;