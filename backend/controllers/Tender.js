const Tendor =require("../models/Tender");
const Event = require('../models/Event'); // Adjust path as needed
exports.allotTendor = async(req,res)=>{
    try{

        const{userID,eventID}=req.body;
        if(!userID || !eventID){
            return res.status(403).json({
                success:false,
                message:"every field is required",
            })
        }
        const isAlloted = await Tendor.findOne({event:eventID});
        if(isAlloted){
            return res.status(404).json({
                success:false,
                message:"sorry event already got tendor",
            })
        }

        const alloting = await Tendor.create({user:userID},{event:eventID});
        
        return res.status(200).json({
            success:true,
            message:"successfully tendor alloted",
            alloting,
        })

    }
    catch(error){
        return res.status(400).json({
            success:false,
            meessage:"sorry Tendor is not alloted to you"
        })
    }
}

exports.getAllMyBookings = async(req,res)=>{
    try{
        const{userID}=req.body;
        const myEvents = await Tendor.find({user:userID});
        
        return res.status(200).json({
            success:true,
            message:"returning all your bookings",
            myEvents,
        })

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"something went wrong",
            error
        })
    }
}
exports.getEmptyEvents = async (req, res) => {
  try {
    // Step 1: Get all event IDs from Tendor
    const tendorEvents = await Tendor.find({}, { event: 1 }).populate("event");
    const usedEventIds = new Set(tendorEvents.map(t => t.event._id.toString()));

    // Step 2: Find events not used in Tendor
    const emptyEvents = await Event.find({
      _id: { $nin: Array.from(usedEventIds) }
    });

    // Step 3: Return full Event docs
    return res.status(200).json({
      success: true,
      data: emptyEvents,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

exports.getAllotedEvents = async (req, res) => {
    try {
      // Step 1: Get all event IDs from Tendor
      const tendorEvents = await Tendor.find({}, { event: 1 }).populate("event");
      // Step 3: Return full Event docs
      return res.status(200).json({
        success: true,
        data: tendorEvents,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  };
