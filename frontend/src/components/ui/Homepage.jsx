// HomePage.jsx
import React from "react";
import EventsPage from "./HomePage3";
import EventGenres from "./HomePage2";
import NavSidebar from "./HomeNavbarandSidebar";
import Homeimage from "./Homepageimages";
import Homestart from "./Homestartingpage";

function HomePage() {
  return (
    <div className="">
      <NavSidebar />
      <section className=" ">
        <Homestart />
      </section>
      <section className="mb-20 ">
        <Homeimage />
      </section>

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