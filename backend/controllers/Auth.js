const User = require("../models/User");
const OTP = require("../models/Otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();

//sign up controller
exports.signup = async (req, res) => {
  try {
    //fetching data from request
    const { name, email, password, accountType, otp } = req.body;
    console.log("req.body", req.body);

    //validation

    if (!name || !email || !password || !accountType || !otp) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    //check for exsisting user

    const exsistingUser = await User.findOne({ email });

    if (exsistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exsists",
      });
    }

    //find most recent otp
    const recentOtp = await otp
      .find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    //validate otp
    if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "otp not matching",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accountType: accountType,
    });

    return res.status(200).json({
      success: true,
      message: "user is registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered try again",
    });
  }
};
//login controlller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(403).json({
        sucess: false,
        message: "all fields are required",
      });
    }

    //check if user exsist or not
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user is not registerd",
      });
    }

    //password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      //after password matchign creating token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //sending token through cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged in successfully",
      });
    }
  } catch (error) {}
};

//send otp controller
exports.sendotp = async (req, res) => {
  console.log("in sendotp controller");
  try {
    //fetch email from req body
    const { email } = req.body;
    //check if email already exsist or not
    const checkuserpresent = await User.findOne({ email });

    if (checkuserpresent) {
      return res.status(401).json({
        success: false,
        message: "User already regisitered",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated", otp);
    //check unique otp or not

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    // const otpPayload={email,otp};
    //create an entry in db of otp
    const otpBody = await OTP.create({
      email,
      otp,
    });
    console.log(otpBody);
    //return successful response
    res.status(200).json({
      success: true,
      message: "otp sent successfullt",
      otp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//change password controller
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.name}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
