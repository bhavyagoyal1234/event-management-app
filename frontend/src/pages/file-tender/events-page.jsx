import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon, PhoneIcon, TagIcon, TicketIcon, SearchIcon, ClockIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import NavSidebar from "@/components/ui/HomeNavbarandSidebar"
import axios from "axios"

const fetchEvents = async () => {
  try {
    const response = await axios.post("http://localhost:3002/api/tender/getEmptyEvent");
    if (response.data.success) {
      console.log(response.data.data, "events");
      return response.data.data;
    } else {
      console.error("Failed to fetch booked events");
    }
  } catch (error) {
    console.error("Error fetching booked events:", error);
  }
  // This would be your actual API call
  // const response = await fetch('/api/events');
  // return response.json();

  // Mock data for demonstration
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve([
  //       {
  //         _id: "1",
  //         title: "Summer Music Festival",
  //         genre: "Music",
  //         contactNo: "+1234567890",
  //         start: new Date(2023, 6, 15, 18, 0),
  //         end: new Date(2023, 6, 15, 23, 0),
  //         description:
  //           "A vibrant summer music festival featuring local and international artists across multiple stages.",
  //         imageUrl: "/placeholder.svg?height=200&width=400",
  //         user: { _id: "user1", name: "Event Organizer" },
  //         venue: { _id: "venue1", name: "Central Park", address: "New York, NY" },
  //         ticketPrice: 75,
  //         createdAt: new Date(),
  //       },
  //       {
  //         _id: "2",
  //         title: "Tech Conference 2023",
  //         genre: "Technology",
  //         contactNo: "+1987654321",
  //         start: new Date(2023, 7, 10, 9, 0),
  //         end: new Date(2023, 7, 12, 17, 0),
  //         description:
  //           "Annual technology conference showcasing the latest innovations and featuring keynote speakers from leading tech companies.",
  //         imageUrl: "/placeholder.svg?height=200&width=400",
  //         user: { _id: "user2", name: "Tech Events Inc." },
  //         venue: { _id: "venue2", name: "Convention Center", address: "San Francisco, CA" },
  //         ticketPrice: 250,
  //         createdAt: new Date(),
  //       },
  //       {
  //         _id: "3",
  //         title: "Food & Wine Festival",
  //         genre: "Food",
  //         contactNo: "+1122334455",
  //         start: new Date(2023, 8, 5, 12, 0),
  //         end: new Date(2023, 8, 7, 22, 0),
  //         description:
  //           "Celebrate culinary excellence with tastings from top chefs, wine pairings, and cooking demonstrations.",
  //         imageUrl: "/placeholder.svg?height=200&width=400",
  //         user: { _id: "user3", name: "Culinary Events Co." },
  //         venue: { _id: "venue3", name: "Waterfront Plaza", address: "Chicago, IL" },
  //         ticketPrice: 120,
  //         createdAt: new Date(),
  //       },
  //       {
  //         _id: "4",
  //         title: "Art Exhibition Opening",
  //         genre: "Art",
  //         contactNo: "+1567891234",
  //         start: new Date(2023, 9, 20, 19, 0),
  //         end: new Date(2023, 9, 20, 22, 0),
  //         description:
  //           "Opening night for a contemporary art exhibition featuring works from emerging artists around the world.",
  //         imageUrl: "/placeholder.svg?height=200&width=400",
  //         user: { _id: "user4", name: "Modern Art Gallery" },
  //         venue: { _id: "venue4", name: "Downtown Gallery", address: "Los Angeles, CA" },
  //         ticketPrice: 35,
  //         createdAt: new Date(),
  //       },
  //       {
  //         _id: "5",
  //         title: "Sports Championship",
  //         genre: "Sports",
  //         contactNo: "+1456789012",
  //         start: new Date(2023, 10, 15, 14, 0),
  //         end: new Date(2023, 10, 15, 17, 0),
  //         description: "The season finale championship game with the top teams competing for the trophy.",
  //         imageUrl: "/placeholder.svg?height=200&width=400",
  //         user: { _id: "user5", name: "Sports League" },
  //         venue: { _id: "venue5", name: "Stadium Complex", address: "Dallas, TX" },
  //         ticketPrice: 150,
  //         createdAt: new Date(),
  //       },
  //     ])
  //   }, 1000)
  // })
}

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeGenre, setActiveGenre] = useState("all")
  const [sortBy, setSortBy] = useState("date-asc")
  const navigate = useNavigate()

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    getEvents()
  }, [])

  useEffect(() => {
    let result = [...events]

    if (activeGenre !== "all") {
      result = result.filter((event) => event.genre.toLowerCase() === activeGenre.toLowerCase())
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue.name.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.start).getTime() - new Date(b.start).getTime()
        case "date-desc":
          return new Date(b.start).getTime() - new Date(a.start).getTime()
        case "price-asc":
          return a.ticketPrice - b.ticketPrice
        case "price-desc":
          return b.ticketPrice - a.ticketPrice
        default:
          return 0
      }
    })

    setFilteredEvents(result)
  }, [events, activeGenre, searchQuery, sortBy])

  const genres = ["all", ...new Set(events?.map((event) => event.genre.toLowerCase()))]

  const handleSubmitTender = (eventId) => {
    navigate(`/tender-for-event/${eventId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <NavSidebar />
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8 mt-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Events</h1>
          <p className="text-muted-foreground mt-1">Browse and submit tenders for upcoming events</p>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
              <SelectItem value="date-desc">Date (Latest first)</SelectItem>
              <SelectItem value="price-asc">Price (Low to high)</SelectItem>
              <SelectItem value="price-desc">Price (High to low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeGenre} onValueChange={setActiveGenre} className="mb-8">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {genres.map((genre) => (
            <TabsTrigger key={genre} value={genre} className="capitalize">
              {genre === "all" ? "All Events" : genre}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeGenre} className="mt-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-[200px] w-full" />
                  <CardHeader className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredEvents?.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents?.map((event) => (
                <Card key={event._id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
                    ₹{event.ticketPrice}
                    </Badge>
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {event.genre}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.venue.name}, {event.venue.address}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{format(new Date(event.start), "MMM d, yyyy")}</span>
                      <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                      <span>
                        {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                      </span>
                    </div>

                    <p className="text-sm line-clamp-3 mb-3">{event.description}</p>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      <span>{event.contactNo}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                          <DialogDescription>Organized by {event.user.name}</DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <img
                            src={event.imageUrl || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-[250px] object-cover rounded-md"
                          />

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{format(new Date(event.start), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {event.venue.name}, {event.venue.address}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.contactNo}</span>
                            </div>
                            <div className="flex items-center">
                              <TagIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.genre}</span>
                            </div>
                            <div className="flex items-center">
                              <TicketIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>${event.ticketPrice}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button onClick={() => handleSubmitTender(event._id)}>Submit Tender</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button className="flex-1" onClick={() => handleSubmitTender(event._id)}>
                      Submit Tender
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
