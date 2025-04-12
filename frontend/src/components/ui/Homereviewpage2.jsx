import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";

function Giverating({ eventId, userId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [experience, setExperience] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.warning("Please provide a rating");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/rating/rate-event', {
        eventId,
        userId,
        rating,
        comment: experience,
      });

      if (response.data.success) {
        toast.success("Review Submitted");
      } else {
        toast.error("Failed to Submit rating");
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('An error occurred while submitting your rating.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-12">
      <h3 className="text-2xl font-bold mb-4">Rate this event</h3>
      <p className="text-lg text-gray-500 mb-6">Tell others what you think</p>
      <div className="flex mb-6 space-x-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={40}
            className={`cursor-pointer ${i < (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(rating)}
          />
        ))}
      </div>
      <textarea
        className="w-full h-40 p-4 border rounded mb-6"
        placeholder="Describe your experience (optional)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        maxLength={500}
      />
      <Button
  onClick={handleSubmit}
  className="px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
>
  Post
</Button>
    </div>
  );
}

export default Giverating;