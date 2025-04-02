import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EventCard from "./Homeeventcard";  // Import your Card component
import { ChevronLeft, ChevronRight, Music, Clock, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import CityApp from './Masotest'; // Import the App component

function EventDetails() {
    const location = useLocation();
    const event = location.state?.event || {};
    const [similarEvents, setSimilarEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const visibleCards = 3;

    useEffect(() => {
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.post("http://localhost:3002/api/event/genre-event", { genre: event.genre });
                if (response.data.success) {
                    const filteredEvents = response.data.events.filter(e => e._id !== event._id);
                    setSimilarEvents(filteredEvents);
                } else {
                    console.error("Failed to fetch similar events");
                }
            } catch (error) {
                console.error("Error fetching similar events:", error);
            }
        };

        if (event.genre) {
            fetchSimilarEvents();
        }
    }, [event.genre, event._id]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, similarEvents.length - visibleCards)
        );
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const description = showFullDescription ? event.description : `${event.description.slice(0, 100)}...`;

    const handleBookNow = (e) => {
        e.stopPropagation();
        // Add your booking logic here
        console.log("Book Now clicked");
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex mt-8 ml-8">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="rounded-lg"
                    style={{ width: '600px', height: '400px', objectFit: 'cover' }}
                />
                <div className="w-1/2 p-4 ml-8">
                    <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                    <p className="text-gray-600 flex items-center mb-4">
                        <Music className="mr-2" /> {event.genre}
                    </p>
                    <p className="text-gray-600 flex items-center mb-4">
                        <Clock className="mr-2" /> {new Date(event.start).toLocaleString()}
                    </p>
                    <p className="text-gray-600 flex items-center mb-4">
                        <Building className="mr-2" /> {event.venue.name}
                    </p>
                    <p className="text-gray-600 flex items-center mb-4">
                        <MapPin className="mr-2" /> {event.venue.city}, {event.venue.state}
                    </p>
                    <p className="text-xl font-bold mt-2 mb-4">₹{event.venue.price}</p>
                    <Button
                        onClick={handleBookNow}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
                        size="sm"
                    >
                        Proceed to make payment
                    </Button>
                </div>
            </div>

            <div className="mt-8 ml-8">
                <h3 className="text-xl font-bold">About the Event</h3>
                <p className="text-gray-700">{description}</p>
                <button onClick={toggleDescription} className="text-blue-500">
                    {showFullDescription ? "Show Less" : "Show More"}
                </button>
            </div>
            <div className="mt-8 ml-8">
                <h3 className="text-xl font-bold">You May Also Like</h3>
                <div className="flex items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="p-2 disabled:opacity-50 hover:scale-150 hover:cursor-pointer transition-transform"
                    >
                        <ChevronLeft className="h-8 w-8 text-pink-500" />
                    </button>
                    <div className="flex overflow-hidden space-x-4 p-4">
                        {similarEvents.slice(currentIndex, currentIndex + visibleCards).map((similarEvent) => (
                            <EventCard
                                key={similarEvent._id}
                                event={similarEvent} // Pass the entire event object
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= similarEvents.length - visibleCards}
                        className="p-2 disabled:opacity-50 hover:scale-150 hover:cursor-pointer transition-transform"
                    >
                        <ChevronRight className="h-8 w-8 text-pink-500" />
                    </button>
                </div>
            </div>
            <div className="mt-8 ml-8">
                <h3 className="text-xl font-bold">Similar events in your {event.venue.city}</h3>
                <CityApp city={event.venue.city} />
            </div>
        </div>
    );
}

export default EventDetails;