import React from "react";
import EventsPage from "./HomePage3"; // Adjust the import path as necessary
import EventGenres from "./HomePage2"; // Adjust the import path as necessary

function HomePage() {
    
  return (
    <div className="container mx-auto p-4">
      {/* Events Carousel */}
      <section className="mb-8">
       
        <EventsPage />
      </section>

      {/* Event Genres */}
      <section>
        <EventGenres />
      </section>
    </div>
  );
}

export default HomePage;