import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VenueCard from "./components/venue-card";

const SecondPage = ({ formData, setFormData, handlePageChange }) => {
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const handleGetVenues = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:3002/api/venue/getvenue",
          {
            state: formData.state,
            city: formData.city,
          }
        );

        const data = await res.data;
        setVenues(data.venues);
        toast.success("Venues fetched successfully.");
      } catch (error) {
        toast.error("Failed to retrieve venues. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    handleGetVenues();
  }, []);

  return (
    <div
      className="grid grid-cols-3 gap-y-20"
      style={{ columnGap: "60px" }} // Custom horizontal spacing
    >
      {venues.map((venue, index) => (
        <VenueCard
          key={index}
          venue={venue}
          formData={formData}
          setFormData={setFormData}
          handlePageChange={handlePageChange}
        />
      ))}
    </div>
  );
};

export default SecondPage;
