import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/ui/event-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/event/getAllEvent"
        );
        if (response.data.success) {
          const now = new Date();

          // Filter and sort events by date
          const filteredAndSortedEvents = response.data.events
            .filter(event => new Date(event.start) > now) // Filter events with start time greater than now
            .sort((a, b) => new Date(a.start) - new Date(b.start)); // Sort events by date

          setEvents(filteredAndSortedEvents);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, events.length - visibleCards)
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 disabled:opacity-50 hover:scale-150 hover:cursor-pointer transition-transform"
        >
          <ChevronLeft className="h-8 w-8 text-pink-500" />
        </button>
        <div className="flex overflow-hidden space-x-8 p-4">
          {events.slice(currentIndex, currentIndex + visibleCards).map((event) => (
            <EventCard key={event.id || event._id} event={event} />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= events.length - visibleCards}
          className="p-2 disabled:opacity-50 hover:scale-150 hover:cursor-pointer transition-transform"
        >
          <ChevronRight className="h-8 w-8 text-pink-500" />
        </button>
      </div>
    </div>
  );
}

export default EventsPage;