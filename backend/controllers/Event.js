const Event = require("../models/Event");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.addEvent = async (req, res) => {
  try {
    const {
      title,
      genre,
      contactNo,
      startDate,
      endDate,
      startTime,
      endTime,
      description,
      user,
      venue,
    } = req.body;

    console.log(req.body);

    if (
      !title ||
      !genre ||
      !contactNo ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !description ||
      !user ||
      !venue
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time format. Use HH:mm (24-hour format).",
      });
    }

    const start = new Date(`${startDate}T${startTime}:00`);
    const end = new Date(`${endDate}T${endTime}:00`);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "Start must be before end.",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(venue)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user or venue ID." });
    }

    const imageFile = req.file;
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Event thumbnail is required." });
    }

    const image = await uploadImageToCloudinary(
      imageFile,
      process.env.EVENT_IMAGES
    );

    const newEvent = new Event({
      title,
      genre,
      contactNo,
      start,
      end,
      description,
      imageUrl: image.secure_url,
      user,
      venue,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ success: true, message: "Event added successfully", newEvent });
  } catch (error) {
    console.error("Error in addEvent:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user").populate("venue");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }
    const event = await Event.findById(id).populate("user").populate("venue");
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }

    // Validate date fields if provided
    if (
      updates.startDate &&
      updates.endDate &&
      new Date(updates.startDate) >= new Date(updates.endDate)
    ) {
      return res
        .status(400)
        .json({ message: "Start date must be before end date." });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event ID." });
    }
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
