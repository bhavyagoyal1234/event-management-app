const express = require("express");
const router = express.Router();
const multer=require("multer");
const storage = multer.memoryStorage(); // You can use diskStorage if you want to save files to disk
const upload = multer({ storage: storage });


const tendorController = require("../controllers/Tendor");

router.route('/allotTendor').post(tendorController.allotTendor);
router.route("/getAllMyBooking").post(tendorController.getAllMyBookings);
router.route("/getEmptyEvent").post(tendorController.getEmptyEvents);
router.route("/getAllotedEvent").post(tendorController.getAllotedEvents);
module.exports = router;