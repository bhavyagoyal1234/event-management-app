import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <Card className="overflow-hidden w-[360px] shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="relative">
        <img
          src={event.imageUrl || "/placeholder.svg?height=214&width=360"}
          alt={event.title}
          className="w-full h-[214px] object-cover"
        />
        <div className="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-bold">
          {event.title || "SPORTS"}
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{event.venue.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {new Date(event.start).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            , {new Date(event.start).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} onwards
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.venue.city || "Location not available"} ,{event.venue.state || "Location not available"}</span>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <span className="text-primary font-bold text-lg">
          ₹{event.ticketPrice || "Location not available"} 
        </span>
        <Link
          to={`/ticketbooking/${event._id}`}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 px-4 py-2 rounded"
        >
          Book Now
        </Link>
      </CardFooter>
    </Card>
  );
}