import React from "react";

const Footer = React.forwardRef((props, ref) => (
  <footer ref={ref} className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Evently</h3>
          <p className="text-gray-400">
            Discover, explore, and book tickets for the best events happening around you. Browse curated event listings across categories like music, tech, art, and more — all in one place.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Genres
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
        <p>© {new Date().getFullYear()} Evently. All rights reserved.</p>
      </div>
    </div>
  </footer>
));

export default Footer;