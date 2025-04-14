import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

function Reviews({ eventId }) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.post('http://localhost:3002/api/rating/getAvgRating', {
          eventId,
        });

        if (response.data.success) {
          setAverageRating(response.data.averageRating || 0);
          setTotalRatings(response.data.totalRatings || 0);
          console.log("response data success",response.data)
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    if (eventId) {
      fetchAverageRating();
    }
  }, [eventId]);

  useEffect(() => {
    const fetchEventRatings = async () => {
      try {
        const response = await axios.post('http://localhost:3002/api/rating/getEventRating', {
          eventID: eventId,
        });
        
        if (response.data.success) {
          setReviews(response.data.ratings);
        }
      } catch (error) {
        console.error('Error fetching event ratings:', error);
      }
    };

    if (eventId) {
      fetchEventRatings();
    }
  }, [eventId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h3 className="text-lg font-bold">Total Reviews</h3>
          <p className="text-3xl font-bold">{totalRatings}</p>
          <p className="text-sm text-gray-500">Average rating on this year</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Average rating</h3>
          <div className="flex items-center justify-center">
            <p className="text-3xl font-bold">{averageRating}</p>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-500 ${i < Math.round(averageRating) ? '' : 'text-gray-300'}`}
                />
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

      {reviews.map((review, index) => (
        <div key={index} className="mb-6 border-t pt-4">
          <div className="flex items-center mb-2">
            <img src={review.user.profile.profilePhoto || 'teammember.png'} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-bold">{review.user.name}</h4>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-yellow-500 ${i < review.rating ? '' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="mb-2">{review.comment}</p>
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