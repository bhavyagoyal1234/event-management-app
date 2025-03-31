import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const email = watch("email");
  const password = watch("password");
  const navigate = useNavigate();
  const isFormValid = email && password.length >= 8;

  const handleFormSubmit = (e) => {
    if (!isFormValid) {
      e.preventDefault();
      toast.error("Please check your credentials");
    }
  };

  async function login(data) {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await login(data);
      localStorage.setItem("userid", res.user._id);
      localStorage.setItem("token", res.token);

      if (res.success) {
        // Directly navigate to the /home page
        navigate('/home');
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg max-w-screen-xl w-full mx-4">
        <div className="w-1/2 flex justify-center items-center p-8">
          <img
            src="signupimg.jpg"
            alt="Event Management"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2 flex justify-center items-center p-8">
          <div className="max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">
              WELCOME BACK
            </h2>
            <span className="block text-gray-500 text-sm mb-6">
              Log in to continue planning your perfect event!
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="Email"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className={`border w-full py-2 px-3 rounded outline-none transition-colors ${
                    focusedInput === "email"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div
                  className={`flex items-center border w-full py-2 px-3 rounded transition-colors ${
                    focusedInput === "password"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    {...register("password", {
                      required: true,
                      minLength: { value: 8 },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password [Min 8 characters]"
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="text-right mb-4">
                <Button variant="link">
                  <Link to="/update-passwordemail" className="text-blue-500">
                    Forget Password?
                  </Link>
                </Button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleFormSubmit}
                className={`py-2 px-8 mt-4 font-bold text-white cursor-pointer transform transition-transform duration-200 active:scale-105 mx-auto block rounded-full flex items-center justify-center ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-400 to-blue-600"
                    : "bg-gray-400"
                }`}
                style={{ width: "100%" }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Logging In
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <Button variant="link" className="p-0 ml-1">
                <Link
                  to="/register"
                  className="text-blue-500 text-lg font-medium"
                >
                  Sign up
                </Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;