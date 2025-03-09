import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3002/api/auth/reset-password-token", {
        email: data.email,
      });
      console.log("Password reset response:", response.data);
      setMessage("Password reset email sent successfully!");
      // Optionally navigate to another page
      // navigate("/some-page");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <img
          src="resetpassemail.jpg" // Replace with your image link
          alt="Illustration"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot your Password?
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your Email and we'll help you reset your password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <img
              src="/email.png" // Replace with your icon link
              alt="Email_icon"
              className="h-5 w-5 mr-2"
            />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${
                focusedInput === "email" ? "border-pink-600" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {message && (
            <p className="text-center text-green-500 mb-4">{message}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded font-bold"
            >
              CONTINUE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;