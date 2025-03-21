import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Header Component
function Header() {
  return (
    <div className="bg-white py-4 px-8 shadow-md">
      <div className="flex justify-center items-center">
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full ml-2"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full ml-2"></div>
      </div>
    </div>
  );
}

const stateCityMap = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  "Assam": ["Guwahati", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya"],
  "Chhattisgarh": ["Raipur", "Bhilai"],
  "Goa": ["Panaji", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat"],
  "Haryana": ["Gurgaon", "Faridabad"],
};

function AddVenueDetails() {
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    contact: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      formData.title.trim() !== "" &&
      formData.genre.trim() !== "" &&
      formData.contact.trim() !== "" &&
      selectedState !== "" &&
      selectedCity !== "";

    setIsFormValid(isValid);
  }, [formData, selectedState, selectedCity]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }
   
    setLoading(true);
  
    const dataToSend = {
      title: formData.title,
      genre: formData.genre,
      contact: formData.contact,
      state: selectedState,
      city: selectedCity,
    };
    
    try {
      const response = await axios.post("http://localhost:3002/api/venue/addvenue", dataToSend);
      console.log("Response:", response.data);
      if (response.data.success){
        toast.success("Venue Added Successfully")
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCitySelect = (e) => {
    if (!selectedState) {
      toast.warning("Please select a state first!", {
        autoClose: 1500,
      });
      e.preventDefault();
      return;
    }
    setSelectedCity(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">General Details</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "title" ? "border-blue-500" : "border-gray-300"}`}
                required
                onFocus={() => setFocusedInput("title")}
                onBlur={() => setFocusedInput("")}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`border w-full py-2 px-3 rounded outline-none transition-colors text-left ${focusedInput === "state" ? "border-blue-500" : "border-gray-300"}`}
                  onFocus={() => setFocusedInput("state")}
                  onBlur={() => setFocusedInput("")}
                >
                  {selectedState || "Select State"}
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-y-auto w-full">
                    {Object.keys(stateCityMap).map((state, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-blue-200 cursor-pointer"
                        onClick={() => {
                          setSelectedState(state);
                          setSelectedCity("");
                          setDropdownOpen(false);
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "city" ? "border-blue-500" : "border-gray-300"}`}
                required
                value={selectedCity}
                onChange={handleCitySelect}
                onFocus={() => setFocusedInput("city")}
                onBlur={() => setFocusedInput("")}
              >
                <option value="">Select City</option>
                {selectedState &&
                  stateCityMap[selectedState].map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Enter Genre"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "genre" ? "border-blue-500" : "border-gray-300"}`}
                required
                onFocus={() => setFocusedInput("genre")}
                onBlur={() => setFocusedInput("")}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                placeholder="+91"
                className={`border w-full py-2 px-3 rounded outline-none transition-colors ${focusedInput === "contact" ? "border-blue-500" : "border-gray-300"}`}
                required
                onFocus={() => setFocusedInput("contact")}
                onBlur={() => setFocusedInput("")}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className={`${isFormValid
              ? "bg-blue-900"
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
              "Continue to Select Venue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVenueDetails;