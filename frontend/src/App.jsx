import React from "react";
import SignupForm from "./components/ui/SignupForm.jsx";
import LoginForm from "./components/ui/LoginForm.jsx";
import CompanySignup from "./components/ui/companysignup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "./components/ui/Otpverify.jsx";
import ResetPasswordForm from "./components/ui/Resetpass.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ResetPasswordFormemail from "./components/ui/Resetpassemail.jsx";
import EmailSentNotification from "./components/ui/Emailsendsuccess.jsx";
import AddVenueForm from "./components/ui/Addvenue.jsx";
import EventListForm1 from "./components/ui/EventListForm";
import Stepper from "./pages/add-event/Stepper2.jsx";
import VenueList from "./components/ui/VenueList.jsx";
import VenueCard from "./components/ui/Venuecard.jsx";
import EventlistForm2 from "./components/ui/Eventlistform2.jsx";
import EventAddHome from "./pages/add-event/home.jsx";
import FirstPage from "./pages/add-event/first-page.jsx";
import SecondPage from "./pages/add-event/second-page.jsx";
import Prior_booking from "./pages/add-event/components/Prior_booking.jsx"
function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="468203105744-0cvsjak0ig3n2q735ntt6u02g2b5ot8q.apps.googleusercontent.com">
        <SignupForm></SignupForm>
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleAuthWrapper />} />
          <Route path="/register" element={<GoogleAuthWrapper />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/companyregister" element={<CompanySignup />}></Route>
          <Route path="/otpverify" element={<OTPVerification />}></Route>
          <Route
            path="/update-password/:id"
            element={<ResetPasswordForm />}
          ></Route>
          <Route
            path="/update-passwordemail"
            element={<ResetPasswordFormemail />}
          ></Route>
          <Route
            path="/emailsentsuccess"
            element={<EmailSentNotification />}
          ></Route>
          <Route path="/addVenue" element={<AddVenueForm />}></Route>
          <Route path="/listevent1" element={<EventListForm1 />}></Route>
          <Route path="/step" element={<Stepper />}></Route>
          <Route path="/venuelist" element={<VenueList />}></Route>
          <Route path="/venuecard" element={<VenueCard />}></Route>
          <Route path="/listevent2" element={<EventlistForm2 />}></Route>
          <Route path="/add-event" element={<EventAddHome />}></Route>
          <Route path="/venue-details" element={<Prior_booking />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
