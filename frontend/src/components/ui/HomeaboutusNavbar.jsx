import React from 'react';
import { Play } from 'lucide-react';
const AboutUs = () => {
  return (
    <div className="font-sans">
      {/* About Our Agency Section */}
      <section className="relative bg-cover bg-center py-35">
  <img src="teammember.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-orange-500 opacity-20"></div>
  <div className="relative z-10 flex items-center justify-between px-10">
    <div className="text-left">
    
      <h1 className="text-5xl font-extrabold mb-4 text-white">About Our Agency</h1>
    </div>
    <div className="text-white">
      <button className="flex items-center justify-center w-16 h-16 bg-white rounded-full transform transition-transform duration-200 hover:scale-110">
        <Play className="text-orange-500 w-8 h-8" />
      </button>
    </div>
  </div>
</section>

      {/* About Your Company Section */}
      <section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto flex items-center space-x-12">
    <div className="w-1/2 relative">
      <div className="absolute inset-0 bg-orange-200 transform rotate-6 scale-110 rounded-full" style={{ clipPath: 'ellipse(75% 50% at 50% 50%)' }}></div>
      <img src="teammember.png" alt="Company" className="relative mx-auto w-2/3 rounded-full overflow-hidden" style={{ clipPath: 'ellipse(75% 50% at 50% 50%)' }} />
    </div>
    <div className="w-1/2 text-left">
      <h2 className="text-3xl font-bold mb-4">About Your Company</h2>
      <p className="text-gray-600 mb-8">
        Welcome to our event management platform, where clients can list events and users can easily purchase tickets. Whether it's a wedding, conference, or festival, our intuitive interface makes event organization simple and effective. For users, we offer a seamless ticket buying experience with secure transactions, ensuring you can focus on enjoying the event. Additionally, our platform features a tender system for vendors, allowing them to bid on venue tenders. This competitive environment encourages vendors to showcase their best offerings and secure valuable contracts. Join us to connect, create, and celebrate unforgettable events with ease.
      </p>
      <div className="flex space-x-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-orange-500">27k</h3>
          <p className="text-gray-600">Active Clients</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-orange-500">985+</h3>
          <p className="text-gray-600">Events Done</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-orange-500">78+</h3>
          <p className="text-gray-600">Team Member</p>
        </div>
      </div>
      <button className="bg-orange-500 text-white py-2 px-4 rounded">More Details</button>
    </div>
  </div>
</section>

      {/* Our Team Section */}
      <section className="py-20 bg-orange-50 bg-opacity-20 text-center">
  <h2 className="text-orange-500 text-lg mb-2">Our Great</h2>
  <h2 className="text-3xl font-bold mb-4">Our Team Members</h2>
  <p className="text-gray-600 mb-8">
    Meet the talented individuals who drive our success. <br />
    Their expertise and dedication are unmatched.
  </p>
  <div className="flex justify-center space-x-12">
    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded-lg">
      <img src="teammember.png" alt="Team Member 1" className="w-full h-full object-cover rounded-lg" />
    </div>
    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded-lg">
      <img src="teammember.png" alt="Team Member 2" className="w-full h-full object-cover rounded-lg" />
    </div>
    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded-lg">
      <img src="teammember.png" alt="Team Member 3" className="w-full h-full object-cover rounded-lg" />
    </div>
  </div>
</section>
    </div>
  );
};

export default AboutUs;