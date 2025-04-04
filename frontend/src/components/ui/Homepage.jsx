// HomePage.jsx
import React from "react";
import EventsPage from "./HomePage3";
import EventGenres from "./HomePage2";
import NavSidebar from "./HomeNavbarandSidebar";

function HomePage() {
  return (
    <div className="pt-16">
      <NavSidebar />

      <section className="mb-8">
        <EventsPage />
      </section>

      <section>
        <EventGenres />
      </section>
    </div>
  );
}

export default HomePage;