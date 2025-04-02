const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/TicketBooking");

router.route("/book-ticket").post(ticketController.bookTicket);

module.exports = router;
