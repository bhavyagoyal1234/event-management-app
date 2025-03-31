import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const genres = [
  { title: 'Cultural Fest', image: 'combedy.jpeg' },
  { title: 'Sports', image: 'combedy.jpeg' },
  { title: 'Musical Concerts', image: 'combedy.jpeg' },
  { title: 'Combedy Shows', image: 'combedy.jpeg' },
  { title: 'Science Fair', image: 'combedy.jpeg' },
];

const EventGenres = () => {
  const navigate = useNavigate();
  const [eventCounts, setEventCounts] = useState({});

  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const response = await axios.post("http://localhost:3002/api/event/getAllEvent");
        const events = response.data.events;

        

        // Calculate the count of events for each genre
        const counts = genres.reduce((acc, genre) => {
          const count = events.filter(event => event.genre === genre.title).length;
         
          acc[genre.title] = count;
          return acc;
        }, {});

        setEventCounts(counts);
      } catch (error) {
        console.error('Error fetching event counts:', error);
      }
    };

    fetchEventCounts();
  }, []);

  const handleCardClick = (genre) => {
    navigate('/genrepagefilter', { state: { genreTitle: genre.title } });
  };

  return (
    <div className="text-center p-5">
      <h2 className="text-2xl font-bold mb-5">The Best Of Upcoming events</h2>
      <div className="flex flex-wrap justify-center">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="w-48 m-3 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => handleCardClick(genre)}
          >
            <img
              src={genre.image}
              alt={genre.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold">{genre.title}</h3>
              <p className="text-gray-600">{eventCounts[genre.title] || 0} Events</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGenres;