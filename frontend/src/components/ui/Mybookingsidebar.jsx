import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBooking() {
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const response = await axios.post("http://localhost:3002/api/ticket/myBookedEvents", {
          userID: localStorage.getItem("userid"),
        });
        console.log("data", response.data.success);
        if (response.data.success) {
          console.log("data", response.data.tickets);
          setBookedEvents(response.data.tickets);
        } else {
          console.error("Failed to fetch booked events");
        }
      } catch (error) {
        console.error("Error fetching booked events:", error);
      }
    };

    fetchBookedEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookedEvents.map((ticket) => (
          <div key={ticket._id} className="border rounded-lg shadow-md p-4">
            <div className="relative">
              <img
                src={ticket.event.venue.imageUrl}
                alt={ticket.event.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded">
                {ticket.event.genre}
              </div>
            </div>
            <h3 className="text-xl font-bold mt-4">{ticket.event.title}</h3>
            <p className="text-gray-600 mt-2">
              <strong>Venue Name:</strong> {ticket.event.venue.name}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {ticket.event.venue.city}, {ticket.event.venue.state}
            </p>
            <p className="text-gray-600">
              <strong>Start Time:</strong> {new Date(ticket.event.start).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <strong>End Time:</strong> {new Date(ticket.event.end).toLocaleString()}
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">Amount Paid</p>
              <p className="text-xl font-bold">₹{ticket.event.ticketPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBooking;