const Rating = require('../models/Rating');
const Event = require('../models/Event'); // Assuming this exists
const Profile = require('../models/Profile'); // Make sure you import this if not already
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

// get event rating 
exports.getEventRating = async (req, res) => {
  try {
    const { eventID } = req.body;
    console.log("in get event rating controller");

    // Step 1: Get ratings with user data
    const ratings = await Rating.find({ event: eventID })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .lean(); // .lean() makes the documents plain JS objects so we can add to them

    // Step 2: Get all unique user IDs
    const userIds = ratings.map(r => r.user._id.toString());

    // Step 3: Get profiles for those user IDs
    const profiles = await Profile.find({ user: { $in: userIds } }).lean();

    // Step 4: Attach profile data to the corresponding user in ratings
    const profileMap = {};
    for (const profile of profiles) {
      profileMap[profile.user.toString()] = profile;
    }

    const ratingsWithProfile = ratings.map(rating => {
      const userId = rating.user._id.toString();
      return {
        ...rating,
        user: {
          ...rating.user,
          profile: profileMap[userId] || null
        }
      };
    });

    return res.status(200).json({
      success: true,
      message: "Event rating of particular event fetched successfully",
      ratings: ratingsWithProfile
    });

  } catch (error) {
    console.log("Error fetching event ratings:", error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch event ratings',
      error: error.message
    });
  }
};
// get event rating cnt 
exports.ratingCnt = async (req, res) => {
  try {
    const { eventID } = req.body;
    const oneCnt = await Event.countDocuments({ event: eventID, rating: 1 });
    const twoCnt = await Event.countDocuments({ event: eventID, rating: 2 });
    const threeCnt = await Event.countDocuments({ event: eventID, rating: 3 });
    const fourCnt = await Event.countDocuments({ event: eventID, rating: 4 });
    const fiveCnt = await Event.countDocuments({ event: eventID, rating: 5 });

    return res.status(200).json({
      success: true,
      message: "Rating count fetched successfully",
      oneCnt,
      twoCnt,
      threeCnt,
      fourCnt,
      fiveCnt
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};
