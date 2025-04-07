import EventsCarousel from "./events-carousel";
import EventsPage from './events-page'
import EventGenres from "./event-genres";
import NavSidebar from "@/components/ui/HomeNavbarandSidebar";
// import NavSidebar from "./nav-sidebar";
import { CalendarDays, MapPin, TrendingUp } from "lucide-react";
import HeroSection from "@/components/ui/Homestartingpage";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavSidebar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <HeroSection />
        {/* <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Amazing Events Near You
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Find and book tickets for the best concerts, festivals, workshops
              and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Events
              </button>
              <button className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
                Create Event
              </button>
            </div>
          </div>
        </div> */}

        {/* Stats */}
        {/* <div className="container mx-auto px-4 pb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-wrap justify-between gap-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-pink-300" />
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm opacity-80">Events this month</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-pink-300" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm opacity-80">Locations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-pink-300" />
              <div>
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-sm opacity-80">Happy attendees</p>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      <section>
        <EventsCarousel />
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 overflow-hidden">
        <EventsPage />
      </section>

      {/* Event Genres Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <EventGenres />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EventHub</h3>
              <p className="text-gray-400">
                Discover and book tickets for the best events happening around
                you.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Genres
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@eventhub.com</li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
