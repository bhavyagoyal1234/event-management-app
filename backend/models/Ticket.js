const Ticket = require("../models/Ticket");

// Book a ticket
exports.ticketBooking = async (req, res) => {
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

        return res.status(200).json({
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
