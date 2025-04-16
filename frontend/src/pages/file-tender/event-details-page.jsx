import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, MapPinIcon, PhoneIcon, TicketIcon, ClockIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import axios from "axios"

const fetchEvent = async (id) => {
  try {
    const response = await axios.post(`http://localhost:3002/api/event/get-event-by-id/${id}`);
    if (response.data.success) {
      return response.data.events;
    } else {
      console.error("Failed to fetch booked events");
    }
  } catch (error) {
    console.error("Error fetching booked events:", error);
  }

  // Mock data for demonstration
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       _id: id,
  //       title: "Summer Music Festival",
  //       genre: "Music",
  //       contactNo: "+1234567890",
  //       start: new Date(2023, 6, 15, 18, 0),
  //       end: new Date(2023, 6, 15, 23, 0),
  //       description:
  //         "A vibrant summer music festival featuring local and international artists across multiple stages.",
  //       imageUrl: "/placeholder.svg?height=200&width=400",
  //       user: { _id: "user1", name: "Event Organizer" },
  //       venue: { _id: "venue1", name: "Central Park", address: "New York, NY" },
  //       ticketPrice: 75,
  //       createdAt: new Date(),
  //     })
  //   }, 1000)
  // })
}


export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getEvent = async () => {
      if (!id) return

      try {
        const data = await fetchEvent(id)
        setEvent(data)
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }

    getEvent()
  }, [id])

  const handleSubmitTender = () => {
    if (!id) return
    navigate(`/tender-for-event/${id}`)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-[400px] w-full mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4" />
          </div>

          <div>
            <Skeleton className="h-[200px] w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleGoBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/events")}>Browse All Events</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight mr-2">{event.title}</h1>
              <Badge className="capitalize">{event.genre}</Badge>
            </div>
            <p className="text-muted-foreground flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {event.venue.name}, {event.venue.address}
            </p>
          </div>

          <div className="rounded-lg overflow-hidden mb-8">
            <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Venue Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-muted-foreground">{event.venue.name}</p>
                  <p className="text-muted-foreground">{event.venue.address}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Capacity</h3>
                  <p className="text-muted-foreground">{event.venue.capacity.toLocaleString()} people</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {event.venue.facilities.map((facility) => (
                    <Badge key={facility} variant="secondary">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-3">Organizer</h2>
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-3">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{event.user.name}</p>
                  <p className="text-sm text-muted-foreground">{event.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Event Details</h3>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CalendarIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">{format(new Date(event.start), "EEEE, MMMM d, yyyy")}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-muted-foreground">
                          {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <TicketIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Ticket Price</p>
                        <p className="text-muted-foreground">${event.ticketPrice.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <PhoneIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-muted-foreground">{event.contactNo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Ready to submit a tender?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit your proposal for this event and showcase what you can offer.
                  </p>

                  <Button className="w-full" size="lg" onClick={handleSubmitTender}>
                    Submit Tender
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
