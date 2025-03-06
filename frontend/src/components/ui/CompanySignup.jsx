import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

function CompanySignup() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [accountType, setAccountType] = useState('company');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

//   async function onSubmit(data) {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log("Submitting the form", data);
//    }


async function onSubmit(data) {
    axios.post('https://your-backend-url.com/api/signup', data)
      .then(response => {
        console.log('Response:', response.data);
        // Handle success (e.g., show a success message or redirect)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error (e.g., show an error message)
      });
  }
   const handletypechange=(type)=>{
    setAccountType(type);
    if(type=='user'){
      navigate('/register');
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
          <span className="block text-gray-500 text-sm">Join us today to secure the ideal tender for your needs!</span>
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
            onClick={() => handletypechange('company')}
          >
            Company
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <img src="/companyw.png" alt="Company_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('companyName', { required: true })}
              type="text"
              placeholder="Company Name"
              onFocus={() => setFocusedInput('companyName')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'companyName' ? 'border-pink-600' : 'border-gray-300'}`}
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
            <img src="/username.png" alt="RepName_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('repName', { required: true })}
              type="text"
              placeholder="Representative Name"
              onFocus={() => setFocusedInput('repName')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'repName' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/email.png" alt="RepEmail_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('repEmail', { required: true })}
              type="text"
              placeholder="Representative Email"
              onFocus={() => setFocusedInput('repEmail')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'repEmail' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/regno.png" alt="RegNo_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('companyRegNo', { required: true })}
              type="text"
              placeholder="Company Reg.No"
              onFocus={() => setFocusedInput('companyRegNo')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'companyRegNo' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/password.png" alt="Password_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Password"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'password' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex items-center mb-4">
            <img src="/password.png" alt="Password_icon" className="h-5 w-5 mr-2" />
            <input
              {...register('confirmPassword', { required: true })}
              type="password"
              placeholder="Confirm Password"
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'confirmPassword' ? 'border-pink-600' : 'border-gray-300'}`}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-pink-500 py-2 px-4 mt-4 w-full font-bold text-white">
            SIGNUP
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-pink-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default CompanySignup;