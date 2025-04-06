import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Reviews() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h3 className="text-lg font-bold">Total Reviews</h3>
          <p className="text-3xl font-bold">10.1K+</p>
          <p className="text-sm text-gray-500">Average rating on this year</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Average rating</h3>
          <div className="flex items-center justify-center">
            <p className="text-3xl font-bold">4.0</p>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-yellow-500 ${i < 4 ? '' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">Average rating on this year</p>
        </div>
        <div className="text-sm text-gray-500">
          <ul>
            <li>5 <span className="text-green-500">▇▇▇▇▇</span> 2.5K+</li>
            <li>4 <span className="text-blue-500">▇▇▇▇</span> 2.5K+</li>
            <li>3 <span className="text-purple-500">▇▇▇</span> 2.5K+</li>
            <li>2 <span className="text-yellow-500">▇▇</span> 2.5K+</li>
            <li>1 <span className="text-red-500">▇</span> 2.5K+</li>
          </ul>
        </div>
      </div>

      {[1, 2].map((review, index) => (
        <div key={index} className="mb-6 border-t pt-4">
          <div className="flex items-center mb-2">
            <img src="teammember.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-bold">Rahul Gandhi</h4>
              <p className="text-sm text-gray-500">Total reviews: 10</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-yellow-500 ${i < 4 ? '' : 'text-gray-300'}`} />
            ))}
            <p className="text-sm text-gray-500 ml-2">31-01-2025</p>
          </div>
          <p className="mb-2">
            I recently used your site and was thoroughly impressed. The website is user friendly, with a sleek design and intuitive navigation. It offers comprehensive features like service packages, an interactive calendar, and virtual venue tours, making event planning seamless.
          </p>
          <p className="text-sm text-gray-500 mb-2">Was this review helpful?</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Yes</button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">No</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;