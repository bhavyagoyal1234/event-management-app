import React from "react";
import SignupForm from "./components/ui/SignupForm.jsx";
import LoginForm from "./components/ui/LoginForm.jsx";
import CompanySignup from "./components/ui/companysignup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "./components/ui/Otpverify.jsx";
import ResetPasswordForm from "./components/ui/Resetpass.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ResetPasswordFormemail from "./components/ui/Resetpassemail.jsx";
import EmailSentNotification from "./components/emailsendsuccess.jsx";
function App() {
  const GoogleAuthWrapper =()=>{
    return (
      <GoogleOAuthProvider clientId='468203105744-0cvsjak0ig3n2q735ntt6u02g2b5ot8q.apps.googleusercontent.com'>
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
      <Route path='/update-password/:id' element={<ResetPasswordForm/>}></Route>
      <Route  path='/update-passwordemail' element={<ResetPasswordFormemail/>}></Route>
      <Route  path='/emailsentsuccess' element={<EmailSentNotification/>}></Route>
    </Routes>
    </BrowserRouter>
    
   </>

  );
}

export default App;