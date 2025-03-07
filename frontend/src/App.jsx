import React from "react";
import SignupForm from "./components/ui/SignupForm.jsx";
import LoginForm from "./components/ui/LoginForm.jsx";
import CompanySignup from "./components/ui/companysignup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "./components/ui/Otpverify.jsx";
import ResetPasswordForm from "./components/ui/Resetpass.jsx";
function App() {
  return (
   <>
    

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignupForm />} /> 
      <Route path='/register' element={<SignupForm/>}></Route>
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