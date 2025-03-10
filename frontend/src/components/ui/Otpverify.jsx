import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const location = useLocation();
  const { name, email, password, accountType } = location.state || {}; // Access passed data
  

  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) { // Ensure only numeric input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);
    console.log(accountType, "accountType");

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/signup",
        {
          email,
          otp: otpCode,
          name,
          password,
          accountType,
        }
      );

      console.log("Verification Response:", response.data);
      // Handle successful verification (e.g., navigate to another page)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/resendotp",
        { email }
      );
      console.log("Resend OTP Response:", response.data);
      // Notify user that OTP has been resent
    } catch (error) {
      console.error("Error resending OTP:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex bg-white rounded-lg shadow-lg max-w-4xl w-full h-full">
        <div className="w-1/2 p-16">
          <img
            src="/your-image-path.jpg"
            alt="Event"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-1/2 p-16 border-l border-blue-200 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">
            OTP Verification
          </h2>
          <p className="mb-8 text-center">
            Enter OTP Code sent to{" "}
            {email ? `${email.charAt(0)}*****@gmail.com` : "your email"}
          </p>
          <form onSubmit={handleSubmit} className="text-center">
            <div className="flex justify-center mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-16 h-16 text-center border border-gray-300 rounded mx-2 text-2xl bg-gray-100"
                />
              ))}
            </div>
            <p className="text-sm mb-8">
              Didn't receive OTP code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-500"
              >
                Resend OTP
              </button>
            </p>
            <button
              type="submit"
              className="bg-pink-500 text-white py-3 px-8 rounded font-bold"
            >
              VERIFY AND PROCEED
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;