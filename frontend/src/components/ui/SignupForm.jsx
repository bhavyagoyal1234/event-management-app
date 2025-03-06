import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';

import axios from 'axios';

function SignupForm() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [accountType, setAccountType] = useState('user');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  //   async function onSubmit(data) {
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     console.log("Submitting the form", data);
  //  }
  //  async function onSubmit(data) {
  //   console.log("Submitting the form", data);
  //   axios.post('https://your-backend-url.com/api/signup', data)
  //     .then(response => {
  //       console.log('Response:', response.data);
  //       // Handle success (e.g., show a success message or redirect)
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       // Handle error (e.g., show an error message)
  //     });
  // }
  async function onSubmit(data) {
    console.log("Submitting the form", data);
    try {
      const response = await axios.post('https://your-backend-url.com/api/request-otp', { email: data.email });
      console.log('OTP Request Response:', response.data);
      // Navigate to OTP verification page with user data
      navigate('/otpverify', { state: { name: data.name, email: data.email, password: data.pass } });
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  }

const handletypechange=(type)=>{
setAccountType(type);
if(type=='company'){
  navigate('/companyregister');
}
}

  return (
    <div className="flex justify-between p-8 bg-white rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
      <div className="w-1/2">
        <img src="signupimg.jpg" alt="Event Management" className="w-full h-auto" />
      </div>
      <div className="w-1/2 max-w-md p-4">
        <h2 className="text-2xl font-bold text-pink-600 mb-2">
          SAVE YOUR ACCOUNT NOW
          <span className="block text-gray-500 text-sm">Sign up today to start planning your perfect event!</span>
        </h2>
        <div className="flex justify-center mb-4">
          <button
            className={`mr-4 ${accountType === 'user' ? 'text-pink-600 underline' : 'text-black'}`}
            onClick={() => handletypechange('user')}
          >
            User
          </button>
          <button
            className={`${accountType === 'company' ? 'text-pink-600 underline' : 'text-black'}`}
            onClick={() =>  handletypechange('company')}
          >
            Company
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <img src="/username.png" alt="Username_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('name', { required: true, maxLength: 20, minLength: { value: 3, message: 'Minimum length should be 3' } })}
              type="text"
              placeholder="Name"
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'name' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/email.png" alt="Email_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('email', { required: true })}
              type="text"
              placeholder="Email"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'email' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/password.png" alt="Pass_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('pass', { required: true, maxLength: 20, minLength: 8 })}
              type="password"
              placeholder="Password"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'password' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/password.png" alt="Pass_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('confpass', { required: true, maxLength: 20, minLength: 8 })}
              type="password"
              placeholder="Confirm Password"
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'confirmPassword' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-pink-500 py-2 px-4 mt-4 w-full font-bold text-white">
          <Link to="/otpverify" className="text-white-600">SIGNUP</Link>
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-pink-600">Login</Link>
        </p>
        <div className="text-center my-4">OR</div>
        <button className="flex items-center justify-center border border-blue-500 text-blue-500 py-2 px-4 w-full">
          <img src="/google.png" alt="Google_icon" className="h-5 w-5 mr-2" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}

export default SignupForm;