import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
import axios from 'axios';
function LoginForm() {
  const [focusedInput, setFocusedInput] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

//    async function onSubmit(data) {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//      console.log("Submitting the form", data);
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
  return (
    <div className="flex justify-between p-8 bg-white rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
      <div className="w-1/2">
        <img src="signupimg.jpg" alt="Event Management" className="w-full h-auto" />
      </div>
      <div className="w-1/2 max-w-md p-4">
        <h2 className="text-2xl font-bold text-pink-600 mb-2">
          WELCOME BACK
          <span className="block text-gray-500 text-sm">Log in to continue planning your perfect event.</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-4">
            <img src="/email.png" alt="Email Icon" className="h-5 w-5 mr-2" />
            <input
              {...register('email', { required: 'Email is required' })}
              type="text"
              placeholder="Email"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'email' ? 'border-pink-600' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex items-center mb-4">
            <img src="/password.png" alt="Password Icon" className="h-5 w-5 mr-2" />
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Password"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              className={`border-b-2 w-full py-2 outline-none transition-colors ${focusedInput === 'password' ? 'border-pink-600' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="text-right mb-4">
            <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-pink-500 py-2 px-4 mt-4 w-full font-bold text-white">
            LOGIN
          </button>
        </form>
        <p className="mt-4">
          Don’t have an account? <Link to="/register" className="text-pink-600">Sign up</Link>
        </p>
        <div className="text-center my-4">OR</div>
        <button className="flex items-center justify-center border border-blue-500 text-blue-500 py-2 px-4 w-full">
          <img src="/google.png" alt="Google Icon" className="h-5 w-5 mr-2" />
          Log in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;