import { useEffect, useState } from "react"
import axios from "axios"
import { MapPin, Calendar, Clock, Loader2 } from "lucide-react"
import NavSidebar from "./HomeNavbarandSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"


export default function MyBooking() {
  const navigate = useNavigate();
  const [bookedEvents, setBookedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const userDataString = localStorage.getItem("user")
  let userID

  if (userDataString) {
    const userData = JSON.parse(userDataString)
    userID = userData._id
  }

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        setLoading(true)
        const response = await axios.post("http://localhost:3002/api/ticket/myBookedEvents", {
          userID,
        })
        if (response.data.success) {
          setBookedEvents(response.data.tickets)
        } else {
          console.error("Failed to fetch booked events")
        }
      } catch (error) {
        console.error("Error fetching booked events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookedEvents()
  }, [userID])

  const now = new Date()

  const upcomingEvents = bookedEvents.filter((ticket) => new Date(ticket.event.start) > now)
  const pastEvents = bookedEvents.filter((ticket) => new Date(ticket.event.start) <= now)

  const sortedUpcomingEvents = upcomingEvents.sort(
    (a, b) => new Date(a.event.start).getTime() - new Date(b.event.start).getTime(),
  )
  const sortedPastEvents = pastEvents.sort(
    (a, b) => new Date(b.event.start).getTime() - new Date(a.event.start).getTime(),
  )

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your tickets...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleNavigate = (id) => {
    console.log("Navigating to ticket booking with id:", id);
    navigate(`/ticketbooking/${id}`);
  };


  const TicketCard = ({ ticket, handleNavigate }) => {
    return (
      <Card
        className="overflow-hidden transition-all hover:shadow-md py-0 cursor-pointer"
        onClick={() => handleNavigate(ticket.event._id)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 w-full md:h-auto md:w-1/3">
            <img
              src={ticket.event.imageUrl || "/placeholder.svg"}
              alt={ticket.event.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute left-3 top-3" variant="secondary">
              {ticket.event.genre || "EVENT"}
            </Badge>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-primary">
                {ticket.event.title}
              </CardTitle>
              <CardDescription>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {ticket.event.venue.name}, {ticket.event.venue.city},{" "}
                  {ticket.event.venue.state}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-0">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(ticket.event.start)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Time:</span>{" "}
                  {formatTime(ticket.event.start)} -{" "}
                  {formatTime(ticket.event.end)}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Amount Paid
                </span>
                <span className="text-lg font-bold text-primary">
                  ₹{ticket.event.ticketPrice}
                </span>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">No tickets found</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )

  return (
    <div className="container mx-auto p-4 md:p-8">
      <NavSidebar />

      <div className="mx-auto max-w-4xl py-16">
        <h1 className="mb-6 text-center text-3xl font-bold">My Tickets</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="previous">Previous Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-16">
            {sortedUpcomingEvents.length > 0 ? (
              sortedUpcomingEvents.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} handleNavigate={handleNavigate} />)
            ) : (
              <EmptyState message="You don't have any upcoming events. Browse events to book tickets." />
            )}
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            {sortedPastEvents.length > 0 ? (
              sortedPastEvents.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} handleNavigate={handleNavigate}/>)
            ) : (
              <EmptyState message="You don't have any past events." />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
