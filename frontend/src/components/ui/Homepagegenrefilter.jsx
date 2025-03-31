import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function Filters({ minPrice, maxPrice, setMinPrice, setMaxPrice, selectedOptions, setSelectedOptions, sortOrder, setSortOrder }) {
  const [dateOpen, setDateOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);

  const handleDateChange = (option) => {
    setSelectedOptions(prevOptions => 
      prevOptions.includes(option) 
        ? prevOptions.filter(opt => opt !== option) 
        : [...prevOptions, option]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(prevOrder => (prevOrder === order ? "" : order));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Date</h3>
          <button onClick={() => setDateOpen(!dateOpen)}>
            {dateOpen ? <ExpandLess /> : <ExpandMore />}
          </button>
        </div>
        {dateOpen && (
          <div className="flex space-x-2 mb-2">
            {["Today", "Tomorrow", "This Weekend"].map((option) => (
              <button
                key={option}
                onClick={() => handleDateChange(option)}
                className={`px-3 py-1 border rounded ${
                  selectedOptions.includes(option) ? "bg-red-500 text-white" : "text-red-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Price</h3>
          <button onClick={() => setPriceOpen(!priceOpen)}>
            {priceOpen ? <ExpandLess /> : <ExpandMore />}
          </button>
        </div>
        {priceOpen && (
          <div className="mb-4">
            <Slider
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
            />
            <div className="flex justify-between text-sm">
              <span>₹{minPrice}</span>      
              <span>₹{maxPrice}</span>      
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Sort By</h3>
          <button onClick={() => setSortOpen(!sortOpen)}>
            {sortOpen ? <ExpandLess /> : <ExpandMore />}
          </button>
        </div>
        {sortOpen && (
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => handleSortOrderChange("lowToHigh")}
              className={`px-3 py-1 border rounded ${
                sortOrder === "lowToHigh" ? "bg-red-500 text-white" : "text-red-500"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSortOrderChange("highToLow")}
              className={`px-3 py-1 border rounded ${
                sortOrder === "highToLow" ? "bg-red-500 text-white" : "text-red-500"
              }`}
            >
              Price: High to Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;