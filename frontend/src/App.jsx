import React from "react";
import SignupForm from "./components/ui/SignupForm.jsx";
import LoginForm from "./components/ui/LoginForm.jsx";
import CompanySignup from "./components/ui/companysignup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "./components/ui/Otpverify.jsx";
import ResetPasswordForm from "./components/ui/Resetpass.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const GoogleAuthWrapper =()=>{
    return (
      <GoogleOAuthProvider clientId='127988388634-ocf6dq7ts0pjvu7cv0jpd0k61nsdsnq6.apps.googleusercontent.com'>
        <SignupForm></SignupForm>
      </GoogleOAuthProvider>
    )
  }
  return (
   <>
    

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<GoogleAuthWrapper />} /> 
      <Route path='/register' element={<GoogleAuthWrapper/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='/companyregister' element={<CompanySignup/>}></Route>
      <Route path='/otpverify' element={<OTPVerification/>}></Route>
      <Route path='/resetpass' element={<ResetPasswordForm/>}></Route>
    </Routes>
    </BrowserRouter>
    
   </>

  );
}

export default App;