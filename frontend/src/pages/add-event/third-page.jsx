import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { CalendarIcon, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GooglePaymentButton from "./components/google-payment-button";
import { useNavigate } from "react-router-dom";

const ThirdPage = ({ formData, setFormData, handlePageChange }) => {
  const [formValid, setFormValid] = useState(false);
  const [image, setImage] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      formData.startDate.trim() !== "" &&
      formData.startTime.trim() !== "" &&
      formData.endDate.trim() !== "" &&
      formData.endTime.trim() !== "" &&
      formData.agree &&
      formData.file

    setFormValid(isValid);
  }, [formData, paymentDone]);

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    console.log("in file change");
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "venue") formDataToSend.append(key, formData[key]._id);
      else formDataToSend.append(key, formData[key]);
    }

    console.log(Object.fromEntries(formDataToSend.entries()));

    try {
      const response = await axios.post(
        "http://localhost:3002/api/event/add-event",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border shadow-md">
      <CardHeader className="bg-muted/40 border-b py-0">
        <CardTitle className="text-2xl font-semibold text-primary">
          Event Schedule
        </CardTitle>
        <CardDescription>
          Provide the schedule details and an event image.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-8" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-semibold">Event Schedule</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="h-10 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="font-medium">Start Time</Label>
                    <Input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="h-10 mt-1"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="h-10 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="font-medium">End Time</Label>
                    <Input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="h-10 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="font-medium text-base">Event Image</Label>
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-10"
              />
            </div>

            <div className="venueImage md:col-span-2 mb-4 flex justify-start">
              {image && (
                <img
                  src={image}
                  alt="Selected Venue"
                  className="w-[60%] h-auto object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                className="mr-2"
                onChange={handleInputChange}
              />
              By signing you agree to your{" "}
              <a href="#" className="text-blue-500 underline ml-1">
                Terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline ml-1">
                Privacy policy
              </a>
              .
            </label>
          </div>

          {formValid && !paymentDone && (
            <GooglePaymentButton
              price={formData.venue.price}
              setPaymentDone={setPaymentDone}
            />
          )}

          {formValid && paymentDone && (
            <div className="pt-4 border-t">
              <Button
                type="submit"
                className="w-full md:w-auto px-8 py-2 h-11 bg-primary hover:bg-primary/90 text-white font-medium"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Event Details"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ThirdPage;
