import React, { useState, useEffect, Suspense } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Building, Share2, Heart, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CityApp from "../../components/ui/Masotest";
import NavSidebar from "@/components/ui/HomeNavbarandSidebar"
const EventCard = React.lazy(() => import("./temp2"))
const GooglePaymentButton = React.lazy(() => import("../../components/ui/google-payment-button"))

function EventDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="h-[400px] w-full md:w-[600px] rounded-xl" />
        <div className="w-full md:w-1/3 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full mt-8" />
        </div>
      </div>
    </div>
  )
}

function EventDetails() {
  const navigate = useNavigate()
  const { event_id } = useParams()
  const [event, setEvent] = useState(null)
  const [similarEvents, setSimilarEvents] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [bookedTicket, setBookedTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  const visibleCards = 3
  const userDataString = localStorage.getItem("user")
  let userId

  if (userDataString) {
    const userData = JSON.parse(userDataString)
    userId = userData._id
  }

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:3002/api/event/get-event-by-id/${event_id}`)
        if (response.status === 200) {
          setEvent(response.data)
        } else {
          console.error("Failed to fetch event details")
        }
      } catch (error) {
        console.error("Error fetching event details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (event_id) {
      fetchEventDetails()
    }
  }, [event_id])

  useEffect(() => {
    const fetchSimilarEvents = async () => {
      if (!event) return
      try {
        const response = await axios.post("http://localhost:3002/api/event/genre-event", { genre: event.genre })
        if (response.data.success) {
          const filteredEvents = response.data.events.filter((e) => e._id !== event._id)
          setSimilarEvents(filteredEvents)
        } else {
          console.error("Failed to fetch similar events")
        }
      } catch (error) {
        console.error("Error fetching similar events:", error)
      }
    }

    if (event?.genre) {
      fetchSimilarEvents()
    }
  }, [event])

  useEffect(() => {
    if (paymentDone) {
      const bookTicket = async () => {
        try {
          const response = await axios.post("http://localhost:3002/api/ticket/book-ticket", {
            paymentID: `TXN-${userId}-${Math.floor(Math.random() * 100000)}`,
            userID: userId,
            eventID: event?._id,
          })
          if (response.data.success) {
            setBookedTicket(response.data.ticket)
          }
        } catch (error) {
          console.error("Error booking ticket:", error)
        }
      }
      bookTicket()
    }
  }, [paymentDone, event, userId])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, similarEvents.length - visibleCards))
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const description = showFullDescription ? event?.description : `${event?.description?.slice(0, 150)}...`

  if (bookedTicket) {
    return (
      <Suspense fallback={<div className="p-8 text-center">Loading payment success...</div>}>
        <PaymentSuccess event={event} ticket={bookedTicket} />
      </Suspense>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EventDetailsSkeleton />
      </div>
    )
  }

  const eventDate = event?.start ? new Date(event.start) : new Date()
  const eventEndDate = event?.end ? new Date(event.end) : new Date()

  return (
    <div className="container mx-auto px-4 py-24">
      <NavSidebar />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Event Image */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={event?.imageUrl || "/placeholder.svg?height=400&width=600"}
              alt={event?.title}
              className="w-full h-[400px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="border-0" variant="secondary">{event?.genre}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <Card className="w-full md:w-2/5 lg:w-1/3 border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{event?.title}</h1>
              <p className="text-muted-foreground">
                Presented by <span className="font-medium">Event Organizer</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {eventDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    -{" "}
                    {eventEndDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{event?.venue?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {event?.venue?.city}, {event?.venue?.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Ticket Information</p>
                  <p className="text-sm text-muted-foreground">Starting from ₹{event?.ticketPrice}</p>
                </div>
              </div>
            </div>

            <Suspense fallback={<Skeleton className="h-12 w-full" />}>
              <GooglePaymentButton price={event?.ticketPrice} setPaymentDone={setPaymentDone} className="w-full">
                <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">Book Now</Button>
              </GooglePaymentButton>
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Event Information */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="venue">Venue</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{description}</p>
              {event?.description && event.description.length > 150 && (
                <Button variant="link" onClick={toggleDescription} className="px-0 text-primary">
                  {showFullDescription ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="venue">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{event?.venue?.name}</p>
                  <p className="text-muted-foreground">
                    {event?.venue?.address}, {event?.venue?.city}, {event?.venue?.state}
                  </p>
                </div>
              </div>

              {/* You can add a map here if you have coordinates */}
              <div className="mt-4 bg-slate-100 h-[300px] rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Map view would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
              <div className="space-y-4">
                {/* This is where you would integrate your Ratingpage and Giverating components */}
                <p className="text-muted-foreground">
                  Reviews and ratings would be displayed here. You can integrate your existing Ratingpage and Giverating
                  components in this tab.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Events Section */}
      {similarEvents.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex >= similarEvents.length - visibleCards}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense
              fallback={
                <>
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="w-full h-[400px]">
                      <Skeleton className="h-[220px] w-full rounded-t-xl" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-12 w-full mt-4" />
                      </div>
                    </Card>
                  ))}
                </>
              }
            >
              {similarEvents.slice(currentIndex, currentIndex + visibleCards).map((similarEvent) => (
                <EventCard key={similarEvent._id} event={similarEvent} />
              ))}
            </Suspense>
          </div>
        </div>
      )}

      {/* City Events Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar events in {event?.venue?.city}</h2>
        <Suspense
          fallback={
            <div className="h-[300px] bg-slate-100 rounded-xl flex items-center justify-center">
              <p>Loading city events...</p>
            </div>
          }
        >
          {/* You would integrate your CityApp component here */}
          <div className="bg-slate-50 p-6 rounded-xl">
            <CityApp city={event?.venue?.city} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

// This is a placeholder for your PaymentSuccess component
function PaymentSuccess({ event, ticket }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto border-0 shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">Your ticket for {event?.title} has been booked successfully.</p>
          <div className="bg-slate-50 p-4 rounded-lg text-left">
            <p>
              <strong>Ticket ID:</strong> {ticket?._id}
            </p>
            <p>
              <strong>Event:</strong> {event?.title}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event?.start).toLocaleDateString()}
            </p>
            <p>
              <strong>Venue:</strong> {event?.venue?.name}
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">View Ticket</Button>
            <Button className="bg-rose-500 hover:bg-rose-600">My Bookings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EventDetails
