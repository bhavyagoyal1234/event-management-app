import React from "react";
import EventCard from "./Homeeventcard"; // Adjust the import path as necessary

function GenrePage({ events }) {
  // Log the events to verify the data
  console.log("Events in GenrePage:", events);

  // Extract genre from the first event if available
  const genre = events.length > 0 ? events[0].genre : "Genre";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming {genre}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id || event._id} event={event} />
          ))
        ) : (
          <p>No events available for this genre.</p>
        )}
      </div>
    </div>
  );
}

export default GenrePage;