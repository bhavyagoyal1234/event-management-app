import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileTextIcon, MapPinIcon, PhoneIcon, TagIcon } from "lucide-react";

const stateCityMap = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  Assam: ["Guwahati", "Dibrugarh"],
  Bihar: ["Patna", "Gaya"],
  Chhattisgarh: ["Raipur", "Bhilai"],
  Goa: ["Panaji", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat"],
  Haryana: ["Gurgaon", "Faridabad"],
};

const genreOptions = [
  "Cultural Fest",
  "Musical Concerts",
  "Comedy Shows",
  "Sports",
  "Science Fair",
];

const FirstPage = ({ formData, setFormData, handlePageChange }) => {
  const [valid, setValid] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (!formData) return;
    const isValid =
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.genre.trim() !== "" &&
      formData.contactNo.trim() !== "" &&
      formData.state !== "" &&
      formData.city !== "";
    setValid(isValid);
  }, [formData]);

  useEffect(() => {
    if (formData.state && stateCityMap[formData.state]) {
      setAvailableCities(stateCityMap[formData.state]);
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border shadow-md">
      <CardHeader className="bg-muted/40 border-b">
        <CardTitle className="text-2xl font-semibold text-primary">
          Event Information
        </CardTitle>
        <CardDescription>
          Please provide the basic details about your event
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Event Title */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="font-medium text-base">Event Title</Label>
              </div>
              <Input
                name="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
                className="h-10"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="font-medium text-base">
                  Event Description
                </Label>
              </div>
              <Textarea
                name="description"
                placeholder="Provide a detailed description of your event"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[120px] resize-y"
              />
              {/* <div className="mt-4 whitespace-pre-wrap">
                {formData.description}
              </div> */}
            </div>

            {/* Genre */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <TagIcon className="h-4 text-muted-foreground" />
                <Label className="font-medium text-base">Genre</Label>
              </div>
              <Select
                name="genre"
                value={formData.genre}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, genre: value }))
                }
                className="w-full"
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genreOptions.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Number */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="font-medium text-base">Contact Number</Label>
              </div>
              <Input
                name="contactNo"
                placeholder="10-digit phone number"
                type={"number"}
                value={formData.contactNo}
                onChange={handleChange}
                className="h-10 w-full"
              />
            </div>

            {/* Location Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-semibold">Event Location</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State */}
                <div className="col-span-1 md:col-span-1">
                  <Label className="font-medium">State</Label>
                  <Select
                    name="state"
                    value={formData.state}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: value,
                        city: "",
                      }))
                    }
                  >
                    <SelectTrigger className="h-10 mt-1 w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(stateCityMap).map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div className="col-span-1 md:col-span-1">
                  <Label className="font-medium">City</Label>
                  <Select
                    name="city"
                    value={formData.city}
                    disabled={!availableCities.length}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, city: value }))
                    }
                  >
                    <SelectTrigger className="h-10 mt-1 w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              className={`${
                valid
                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                  : "bg-gray-800"
              } w-full md:w-auto px-8 py-2 h-11 text-white font-medium`}
              type="button"
              onClick={() => handlePageChange(2)}
              disabled={!valid}
            >
              Continue to Select Venue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FirstPage;