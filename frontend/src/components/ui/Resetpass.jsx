import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ResetPasswordForm() {
  const [focusedInput, setFocusedInput] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3002/api/auth/resetpassword", {
        newPassword: data.newPassword,
       
      });
      console.log("Password reset response:", response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter a new password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <img
              src="/lock.png"
              alt="Lock_icon"
              className="h-5 w-5 mr-2"
            />
            <input
              {...register("newPassword", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
              type="password"
              placeholder="Password"
              onFocus={() => setFocusedInput("newPassword")}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${
                focusedInput === "newPassword" ? "border-pink-600" : "border-gray-300"
              }`}
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
          <div className="flex items-center mb-4">
            <img
              src="/lock.png"
              alt="Lock_icon"
              className="h-5 w-5 mr-2"
            />
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              type="password"
              placeholder=" Confirm Password"
              onFocus={() => setFocusedInput("confirmPassword")}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${
                focusedInput === "confirmPassword" ? "border-pink-600" : "border-gray-300"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <button
            type="submit"
            className="bg-pink-500 text-white py-3 px-8 rounded font-bold w-full"
          >
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;