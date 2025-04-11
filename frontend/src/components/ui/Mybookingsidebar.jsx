import React, { useEffect, useState } from "react";
import axios from "axios";
import NavSidebar from "./HomeNavbarandSidebar";
import { MapPin, Calendar, Clock } from "lucide-react";

function MyBooking() {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [selectedTab, setSelectedTab] = useState("upcoming");

    const userDataString = localStorage.getItem("user")
    let userID

    if (userDataString) {
      const userData = JSON.parse(userDataString)
      userID = userData._id
    }

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const response = await axios.post("http://localhost:3002/api/ticket/myBookedEvents", {
                    userID,
                });
                if (response.data.success) {
                    setBookedEvents(response.data.tickets);
                } else {
                    console.error("Failed to fetch booked events");
                }
            } catch (error) {
                console.error("Error fetching booked events:", error);
            }
        };

        fetchBookedEvents();
    }, [userID]);

    const now = new Date();

    const upcomingEvents = bookedEvents.filter(ticket => new Date(ticket.event.start) > now);
    const pastEvents = bookedEvents.filter(ticket => new Date(ticket.event.start) <= now);

    const sortedUpcomingEvents = upcomingEvents.sort((a, b) => new Date(a.event.start) - new Date(b.event.start));
    const sortedPastEvents = pastEvents.sort((a, b) => new Date(b.event.start) - new Date(a.event.start));

    return (
        <div className="container mx-auto p-16">
            <NavSidebar />
            <div className="flex flex-col gap-8">
                <div className="flex justify-center mb-8 mt-8 space-x-8">
                    <button
                        onClick={() => setSelectedTab("upcoming")}
                        className={`px-6 py-3 text-xl font-bold ${selectedTab === "upcoming" ? "text-blue-500 border-b-2 border-blue-500" : "text-black"}`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => setSelectedTab("previous")}
                        className={`px-6 py-3 text-xl font-bold ${selectedTab === "previous" ? "text-blue-500 border-b-2 border-blue-500" : "text-black"}`}
                    >
                        Previous Events
                    </button>
                </div>

                {selectedTab === "upcoming" && (
                    <>
                        {sortedUpcomingEvents.length > 0 ? (
                            sortedUpcomingEvents.map((ticket) => (
                                <div
                                    key={ticket._id}
                                    className="border rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start w-full md:w-3/4 mx-auto"
                                >
                                    <div className="relative">
                                        <img
                                            src={ticket.event.imageUrl}
                                            alt={ticket.event.title}
                                            className="w-75 h-75 object-cover rounded-lg mb-4 md:mb-0 md:mr-8"
                                        />
                                        <div className="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-bold">
                                            {ticket.event.genre || "SPORTS"}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-blue-500">{ticket.event.title}</h3>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <MapPin />
                                                <p>
                                                    <strong>Venue:</strong> {ticket.event.venue.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <MapPin />
                                                <p>
                                                    <strong>Location:</strong> {ticket.event.venue.city}, {ticket.event.venue.state}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <Calendar />
                                                <p>
                                                    <strong>Opening time:</strong> {new Date(ticket.event.start).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <Clock />
                                                <p>
                                                    <strong>Closing time:</strong> {new Date(ticket.event.end).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg flex justify-between items-center w-full">
                                            <p className="text-gray-600 font-bold">Amount Paid</p>
                                            <p className="text-xl font-bold">₹{ticket.event.ticketPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No upcoming bookings.</p>
                        )}
                    </>
                )}

                {selectedTab === "previous" && (
                    <>
                        {sortedPastEvents.length > 0 ? (
                            sortedPastEvents.map((ticket) => (
                                <div
                                    key={ticket._id}
                                    className="border rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start w-full md:w-3/4 mx-auto"
                                >
                                    <div className="relative">
                                        <img
                                            src={ticket.event.imageUrl}
                                            alt={ticket.event.title}
                                            className="w-75 h-75 object-cover rounded-lg mb-4 md:mb-0 md:mr-8"
                                        />
                                        <div className="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-bold">
                                            {ticket.event.genre || "SPORTS"}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-blue-500">{ticket.event.title}</h3>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <MapPin />
                                                <p>
                                                    <strong>Venue Name:</strong> {ticket.event.venue.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <MapPin />
                                                <p>
                                                    <strong>Location:</strong> {ticket.event.venue.city}, {ticket.event.venue.state}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <Calendar />
                                                <p>
                                                    <strong>Start Time:</strong> {new Date(ticket.event.start).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-gray-600 space-x-2">
                                                <Clock />
                                                <p>
                                                    <strong>End Time:</strong> {new Date(ticket.event.end).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg flex justify-between items-center w-full">
                                            <p className="text-gray-600 font-bold">Amount Paid</p>
                                            <p className="text-xl font-bold">₹{ticket.event.ticketPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No previous bookings.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MyBooking;