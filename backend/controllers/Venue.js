const Venue = require("../models/Venue");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// Add venue controller
exports.addVenue = async (req, res) => {
  try {
    console.log("In venue controller");

    // Fetch data from req body
    const { name, city, state, price, paxcapacity, roomcount, description } = req.body;

    // Fetch image
    const thumbnail = req.file; // Ensure this matches the field name used in the frontend
    console.log(req.file)
    // Validation
    if (!name || !city || !state || !price || !paxcapacity || !roomcount || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload image on Cloudinary
    console.log("before");
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    console.log("after");
    // Create venue in database
    const newVenue = await Venue.create({
      name,
      city,
      state, // Ensure state is included in the database model
      price,
      imageUrl: thumbnailImage.secure_url,
      paxcapacity,
      roomcount,
      description,
    });

    // Return success status
    return res.status(200).json({
      success: true,
      message: "Venue created successfully",
      venue: newVenue, // Optionally return the created venue
    });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding venue",
    });
  }
};

// Get venue controller
exports.getVenue = async (req, res) => {
  try {
    // Fetch {state, city} from req
    const { state, city } = req.body;

    // Validation
    if (!state || !city) {
      return res.status(400).json({
        success: false,
        message: "State and City are required",
      });
    }

    // Fetch list of venues from database
    const venues = await Venue.find({ state, city });

    if (venues.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No venues found",
      });
    }

    // Returning list of venues in response
    return res.status(200).json({
      success: true,
      message: "Returning list of venues",
      venues,
    });

  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};