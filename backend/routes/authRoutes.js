const express = require("express");
const router = express.Router();

const authController = require("../controllers/Auth");
const resetpassController = require("../controllers/ResetPassword");

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/sendotp").post(authController.sendotp);

router.route("/changepassword").post(authController.changePassword);

router.route("/reset-password").post(resetpassController.resetPassword);
router.route("/reset-password-token").post(resetpassController.resetPasswordToken);
router.route("/googleLogin").get(authController.googleLogin);
module.exports = router;
