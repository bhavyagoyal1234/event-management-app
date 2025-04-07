const Rating = require('../models/Rating');
const Event = require('../models/Event'); // Assuming this exists
const mongoose = require('mongoose');

// Add or update rating
exports.rateEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const { rating, comment } = req.body;
    const {userId} = req.body; // Assuming user is authenticated and available

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success:false, 
        message: 'Invalid event ID' 
      });
    }

    // Check if the event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ 
        success:false,
        message: 'Event not found'
        });
    }

    // Check if the user has already rated this event
    const existingRating = await Rating.findOne({ user: userId, event: eventId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await existingRating.save();
      return res.status(200).json({
        success:true, 
        message: 'Rating updated', 
        existingRating 
        });
    }

    // Create new rating
    const newRating = new Rating({
      user: userId,
      event: eventId,
      rating,
      comment
    });

    await newRating.save();
    return res.status(200).json({
        success:true, 
        message: 'Rating submitted', 
        data: newRating 
    });
  } 
  catch (error) {
    console.error('Error rating event:', error);
    return res.status(500).json({ 
        success:false,
        message: 'Server error' 
    });
  }
};

// Get average rating of an event
exports.getAverageRating = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({
          success:false, 
          message: 'Invalid event ID' 
        });
      }

    const avgResult = await Rating.aggregate([
      { $match: { event: new mongoose.Types.ObjectId(eventId) } },
      {
        $group: {
          _id: '$event',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 }
        }
      }
    ]);

    if (avgResult.length === 0) {
      return res.status(200).json({ 
        success:true,
        averageRating: 0, totalRatings: 0
     });
    }

    const { averageRating, totalRatings } = avgResult[0];
    return res.status(200).json({ 
        success:true,
        averageRating: averageRating.toFixed(2), totalRatings 
    });
  } 
  catch (error) {
    console.error('Error fetching average rating:', error);
    return res.status(500).json({ 
        success:false,
        message: 'Server error' 
    });
  }
};
