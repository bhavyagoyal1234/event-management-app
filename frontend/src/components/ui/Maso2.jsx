// Import React, Axios, and the Masonry component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from './Masonaryy';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        const response = await axios.post('http://localhost:3002/api/event/getAllEvent');
        console.log(response.data.event)
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Map the fetched events to the format expected by the Masonry component
  const mappedData = events.map((event, index) => ({
    id: event.id || index, // Use event.id if available, otherwise use index
    image: event.imageUrl, // Use the imageUrl from the fetched event
    height:  500 // Use event.height if available, otherwise default to 400
  }));

  return (
    <div>
      <Masonry data={mappedData} />
    </div>
  );
}

export default App;