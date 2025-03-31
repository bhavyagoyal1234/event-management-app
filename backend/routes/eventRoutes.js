const express = require("express");
const router = express.Router();
const eventController = require("../controllers/Event");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/add-event").post(upload.single("file"), eventController.addEvent);
router.route("/genre-event").post(eventController.getEventByGenre);
router.route("/getAllEvent").post(eventController.getAllEvents);
module.exports = router;
