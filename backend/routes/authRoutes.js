const express = require("express");
const router = express.Router();

const authController = require("../controllers/Auth");

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/sendotp").post(authController.sendotp);

module.exports = router;
