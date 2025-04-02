import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filters from "./Homepagegenrefilter"; // Adjust the import path as necessary
import GenrePage from "./Homepagegenre"; // Adjust the import path as necessary

function App() {
  const location = useLocation();
  const genreTitle = location.state?.genreTitle || "";
  const [events, setEvents] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(genreTitle);

  useEffect(() => {
    const fetchEventsByGenre = async () => {
      try {
        const response = await axios.post("http://localhost:3002/api/event/genre-event", { genre: selectedGenre });
        console.log("API Response:", response.data);
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error("Failed to fetch events for the genre");
        }
      } catch (error) {
        console.error("Error fetching events by genre:", error);
      }
    };

    if (selectedGenre) {
      fetchEventsByGenre();
    } else {
      console.warn("No genre title provided");
    }
  }, [selectedGenre]);

  const filteredEvents = events
    .filter(event => {
      const eventPrice = event.ticketPrice || 0;
      const eventDate = new Date(event.start);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      let dateMatch = selectedOptions.length === 0;
      if (selectedOptions.includes("Today")) {
        dateMatch = dateMatch || eventDate.toDateString() === today.toDateString();
      }
      if (selectedOptions.includes("Tomorrow")) {
        dateMatch = dateMatch || eventDate.toDateString() === tomorrow.toDateString();
      }
      if (selectedOptions.includes("This Weekend")) {
        const day = eventDate.getDay();
        dateMatch = dateMatch || day === 6 || day === 0;
      }

      const stateMatch = selectedState ? event.state === selectedState : true;
      const cityMatch = selectedCity ? event.city === selectedCity : true;

      return eventPrice >= minPrice && eventPrice <= maxPrice && dateMatch && stateMatch && cityMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.ticketPrice - b.ticketPrice;
      } else if (sortOrder === "highToLow") {
        return b.ticketPrice - a.ticketPrice;
      }
      return 0;
    });

  console.log("Filtered Events:", filteredEvents);

  return (
    <div className="flex">
      <div className="w-1/4 flex items-center justify-center p-4 sticky top-0 h-screen">
        <Filters
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          currentGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <div className="w-3/4 p-4 overflow-y-auto">
        <GenrePage events={filteredEvents} />
      </div>
    </div>
  );
}

export default App;