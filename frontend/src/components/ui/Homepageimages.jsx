import React, { useState, useEffect } from "react";
import axios from "axios";

function EventsCarousel() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post("http://localhost:3002/api/event/getAllEvent");
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % events.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [events.length]);

  const getVisibleEvents = () => {
    if (events.length < visibleCards) return events;

    const end = currentIndex + visibleCards;
    return events.slice(currentIndex, end).concat(events.slice(0, Math.max(0, end - events.length)));
  };

  return (
    <div className="flex justify-center items-center space-x-8 p-4 bg-black">
      {getVisibleEvents().map((event, index) => (
        <div
          key={event.id || event._id}
          className={`transition-transform duration-500 transform ${
            index === 1 ? 'scale-105' : 'scale-95 blur-sm'
          }`}
        >
          <img
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.title}
            className="w-[425px] h-[330px] object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-bold">
            {event.genre || "SPORTS"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsCarousel;