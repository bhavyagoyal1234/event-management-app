const Ticket = require("../models/Ticket");

//book ticket
// frontend-->user id and event id and payment id
// response ticket

// Book a ticket
exports.bookTicket = async (req, res) => {
  try {
    const { userID, eventID, paymentID } = req.body;

    if (!userID || !eventID || !paymentID) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newTicket = await Ticket.create({
      user: userID,
      event: eventID,
      paymentID: paymentID,
    });

    return res.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while booking ticket",
    });
  }
};

// get all tickets by user id
// frontend -->user id

//
exports.getMyBookedEvents = async(req,res) =>{
    try{
        const {userID} =req.body;
        const tickets=await Ticket.find({user:userID}).populate("event");
        return res.status(200).json({
            success:true,
            message:"succesffully fetched my booked events",
            tickets
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"something went wrong while fetching my booked events"
        })
    }
}
