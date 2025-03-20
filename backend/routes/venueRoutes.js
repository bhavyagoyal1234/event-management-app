const express = require("express");
const router = express.Router();

const venueController = require("../controllers/Venue");

router.route("/addvenue").post(venueController.addVenue);
router.route("/getvenue").post(venueController.addVenue);

module.exports = router;