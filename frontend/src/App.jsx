import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';
import SignupForm from "./components/ui/SignupForm.jsx";
import LoginForm from "./components/ui/LoginForm.jsx";
import CompanySignup from "./components/ui/companysignup.jsx";
import OTPVerification from "./components/ui/Otpverify.jsx";
import ResetPasswordForm from "./components/ui/Resetpass.jsx";
import ResetPasswordFormemail from "./components/ui/Resetpassemail.jsx";
import EmailSentNotification from "./components/ui/Emailsendsuccess.jsx";
import AddVenueForm from "./components/ui/Addvenue.jsx";
import EventListForm1 from "./components/ui/EventListForm";
import Stepper from "./pages/add-event/Stepper2.jsx";
import VenueList from "./components/ui/VenueList.jsx";
import VenueCard from "./components/ui/Venuecard.jsx";
import EventlistForm2 from "./components/ui/Eventlistform2.jsx";
import EventAddHome from "./pages/add-event/home.jsx";
import Prior_booking from "./pages/add-event/components/Prior_booking.jsx";
import Homepage from "./components/ui/Homepage.jsx";
import Homepage2 from "./components/ui/Homepage2.jsx";
import Genrepagefilter from "./components/ui/Homegenrefilteradded.jsx";
import HomepageBooking from "./components/ui/Homepagebooking.jsx";
import PaymentForEvent from "./pages/ticket-booking/event-payment.jsx";
import Navbar from "./components/ui/Homenavbar.jsx";
import Sidebar from "./components/ui/Homesidebar.jsx";
import Myprofile from "./components/ui/Myprofilesidebar.jsx";
import MyBooking from "./components/ui/Mybookingsidebar.jsx";
import AboutUS from "./components/ui/HomeaboutusNavbar.jsx";
import ContactUS from "./components/ui/HomefooterContactus.jsx";
import ProtectedRoute from "./components/ui/Protectedroute.jsx";
import MyEvents from "./components/ui/Myeventssidebar.jsx"; // Import the ProtectedRoute component

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <SignupForm />
      </GoogleOAuthProvider>
    );
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleAuthWrapper />} />
          <Route path="/register" element={<GoogleAuthWrapper />} />
          <Route path="/companyregister" element={<CompanySignup />} />
          <Route path="/otpverify" element={<OTPVerification />} />
          <Route path="/update-password/:id" element={<ResetPasswordForm />} />
          <Route path="/update-passwordemail" element={<ResetPasswordFormemail />} />
          <Route path="/emailsentsuccess" element={<EmailSentNotification />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route path="/addVenue" element={<ProtectedRoute element={AddVenueForm} />} />
          <Route path="/listevent1" element={<ProtectedRoute element={EventListForm1} />} />
          <Route path="/step" element={<ProtectedRoute element={Stepper} />} />
          <Route path="/venuelist" element={<ProtectedRoute element={VenueList} />} />
          <Route path="/venuecard" element={<ProtectedRoute element={VenueCard} />} />
          <Route path="/listevent2" element={<ProtectedRoute element={EventlistForm2} />} />
          <Route path="/add-event" element={<ProtectedRoute element={EventAddHome} />} />
          <Route path="/venue-details" element={<ProtectedRoute element={Prior_booking} />} />
          <Route path="/home" element={<ProtectedRoute element={Homepage} />} />
          <Route path="/home2" element={<ProtectedRoute element={Homepage2} />} />
          <Route path="/genrepagefilter" element={<ProtectedRoute element={Genrepagefilter} />} />
          <Route path="/ticketbooking/:event_id" element={<ProtectedRoute element={HomepageBooking} />} />
          <Route path="/event-booking-payment" element={<ProtectedRoute element={PaymentForEvent} />} />
          <Route path="/navbar" element={<ProtectedRoute element={Navbar} />} />
          <Route path="/sidebar" element={<ProtectedRoute element={Sidebar} />} />
          <Route path="/myprofile" element={<ProtectedRoute element={Myprofile} />} />
          <Route path="/mybooking" element={<ProtectedRoute element={MyBooking} />} />
          <Route path="/aboutus" element={<ProtectedRoute element={AboutUS} />} />
          <Route path="/contactus" element={<ProtectedRoute element={ContactUS} />} />
          <Route path="/myevent" element={<ProtectedRoute element={MyEvents} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;