import React, { useState, useRef, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSwipeable } from "react-swipeable";
import Stepper from "./Stepper2";
import axios from "axios"; // Ensure axios is imported
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

function OtherDetails() {
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [venueImage, setVenueImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    file: null,
    agree: false,
  });

  const [focusedInput, setFocusedInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access passed data
  const { venue, formData: venueFormData } = location.state || {}; // Destructure the data

  useEffect(() => {
    const isValid =
      formData.startDate.trim() !== "" &&
      formData.startTime.trim() !== "" &&
      formData.endDate.trim() !== "" &&
      formData.endTime.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.agree &&
      selectedFile !== undefined;

    setIsFormValid(isValid);
  }, [formData, selectedFile]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setVenueImage(imageUrl);
    } else {
      setVenueImage(null);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }
  
    setLoading(true);
  
    const dataToSend = {
      startdate: formData.startDate,
      starttime: formData.startTime,
      enddate: formData.endDate,
      endtime: formData.endTime,
      description: formData.description,
      file: formData.selectedFile,
      ...venueFormData, // Append formData from VenueCard
      
    };
    console.log(dataToSend)
    try {
      
      const response = await axios.post("http://localhost:3002/api/venue/getvenue", dataToSend);
      console.log("Response:", response.data);
      if (response.data.success) {
        toast.success("Booking details");
        
        
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to retrieve venues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => {
      formRef.current.scrollBy({ top: 100, behavior: "smooth" });
    },
    onSwipedDown: () => {
      formRef.current.scrollBy({ top: -100, behavior: "smooth" });
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <br></br>
      <Stepper currentStep={3} />
      <div
        ref={formRef}
        className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full mt-4 overflow-y-auto"
        style={{ maxHeight: "500px" }}
        {...handlers}
      >
        <h2 className="text-2xl font-bold mb-6">Other Details</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="startDate"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "startDate" ? "border-blue-500" : "border-gray-300"}`}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput("startDate")}
                onBlur={() => setFocusedInput("")}
              />
              <input
                type="time"
                name="startTime"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "startTime" ? "border-blue-500" : "border-gray-300"}`}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput("startTime")}
                onBlur={() => setFocusedInput("")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="endDate"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "endDate" ? "border-blue-500" : "border-gray-300"}`}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput("endDate")}
                onBlur={() => setFocusedInput("")}
              />
              <input
                type="time"
                name="endTime"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "endTime" ? "border-blue-500" : "border-gray-300"}`}
                onChange={handleInputChange}
                onFocus={() => setFocusedInput("endTime")}
                onBlur={() => setFocusedInput("")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span> (Minimum 150 Words)
            </label>
            <textarea
              name="description"
              className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "description" ? "border-blue-500" : "border-gray-300"}`}
              rows="4"
              onChange={handleInputChange}
              onFocus={() => setFocusedInput("description")}
              onBlur={() => setFocusedInput("")}
            ></textarea>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-dashed border-2 p-6 text-center rounded-md bg-gray-50 w-[60%] ${focusedInput === "uploadPhoto" ? "border-blue-500" : "border-gray-300"}`}
              onFocus={() => setFocusedInput("uploadPhoto")}
              onBlur={() => setFocusedInput("")}
              tabIndex={0}
            >
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <label className="cursor-pointer" onClick={handleBrowseClick}>
                <p>Drag and drop to upload your files</p>
                <button type="button" className="bg-blue-500 text-white py-1 px-3 rounded mt-2">Browse Files</button>
              </label>
              {fileName && <p className="mt-2 text-sm text-gray-600">{fileName}</p>}
            </div>
          </div>

          <div className="venueImage mb-4 flex justify-start">
            {venueImage && <img src={venueImage} alt="Selected Venue" className="w-[60%] h-auto object-cover rounded-md" />}
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

          <button
            type="submit"
            className={`${isFormValid
              ? "bg-gradient-to-r from-blue-400 to-blue-600"
              : "bg-gray-400"
              } py-2 px-8 mt-4 font-bold text-white cursor-pointer transform transition-transform duration-200 active:scale-105 mx-auto block rounded-full flex items-center justify-center`}
            style={{ width: "100%" }}
            disabled={!isFormValid}
          >
            {loading ? (
              <>
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Continue to Add Venue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtherDetails;