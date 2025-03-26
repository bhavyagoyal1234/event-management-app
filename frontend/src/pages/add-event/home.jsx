import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import FirstPage from "./first-page";
import SecondPage from "./second-page";
import Stepper from "@/components/ui/Stepper2";
import ThirdPage from "./third-page";

const EventAddHome = () => {
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    state: "Andhra Pradesh",
    city: "Vijayawada",
    title: "Hey there how are you?",
    genre: "Cultural Fest",
    contactNo: "131231",
    startDate: "2025-03-26",
    startTime: "11:10",
    endDate: "2025-03-26",
    endTime: "11:20",
    description: "sdfsdflskjdfljsd ",
    file: null,
    agree: false,
    venue: null,
    user: localStorage.getItem("userid"),
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handlePageChange = (page) => {
    if (page < 1 || page > 3) return;
    setPage(page);
  };

  // shows a confirmation dialog if user tries to refresh the page or navigate
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="p-6">
      {/* <Stepper currentStep={page} /> */}
      {page === 1 && (
        <FirstPage
          formData={formData}
          setFormData={setFormData}
          handlePageChange={handlePageChange}
        />
      )}
      {page === 2 && (
        <SecondPage
          formData={formData}
          setFormData={setFormData}
          handlePageChange={handlePageChange}
        />
      )}
      {page === 3 && (
        <ThirdPage
          formData={formData}
          setFormData={setFormData}
          handlePageChange={handlePageChange}
        />
      )}
      {/* <div className="flex gap-10">
        {page !== 1 && (
          <Button onClick={() => handlePageChange(page - 1)}>Back</Button>
        )}
        {page !== 3 && (
          <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
        )}
      </div> */}
    </div>
  );
};

export default EventAddHome;
