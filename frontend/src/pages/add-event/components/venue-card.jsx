import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Home, Calendar } from "lucide-react";

export default function VenueCard({
  venue,
  formData,
  setFormData,
  handlePageChange,
  onPriorBookingClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleBookNow = () => {
    setFormData({ ...formData, venue });
    handlePageChange(3);
  };

  return (
    <Card
      className="overflow-hidden w-[360px] transition-all duration-200 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative">
        <div className="h-[214px] overflow-hidden">
          <img
            src={venue.imageUrl || "/placeholder.svg?height=214&width=360"}
            alt={venue.name}
            className={`w-full h-full object-cover 
             
            }`}
          />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center shadow-sm">
          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
          <span className="font-medium text-sm">{venue.rating || 4.7}</span>
          <span className="text-muted-foreground text-xs ml-1">
            ({venue.reviewCount || 40})
          </span>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBookNow}
          className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
          size="sm"
        >
          Book Now
        </Button>
      </div>

      {/* Content Section */}
      <CardContent className="p-3">
        <h3 className="text-lg font-bold line-clamp-1 mb-3">{venue.name}</h3>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {venue.city} ({venue.state})
          </span>
        </div>

        {/* Price Information */}
        <div className="flex items-center justify-between ">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-primary font-bold text-xl">
              ₹{venue.price.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="px-4 pb-3 pt-0 flex justify-between items-center">
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <Users className="h-3.5 w-3.5" />
          <span>{venue.paxcapacity} pax</span>
        </Badge>

        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <Home className="h-3.5 w-3.5" />
          <span>{venue.roomcount} Rooms</span>
        </Badge>

        <Button
          onClick={onPriorBookingClick}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md flex items-center gap-1 cursor-pointer transform transition-transform duration-200 hover:scale-105"
          size="sm"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Prior Booking</span>
        </Button>
      </CardFooter>
    </Card>
  );
}