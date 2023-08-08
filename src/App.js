import React, { Fragment, useContext,useEffect } from "react";

import { ToastContainer, Zoom } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from "./component/layout/Layout";
import DashboardLayout from "./component/layout/DashboardLayout";

import Auth from "./auth/Auth";
import { AppContext } from "./component/context/AppContext";
import PublicRoute from "./component/protactroute/PublicRoute";
import PrivateRoute from "./component/protactroute/PrivateRoute";

import Login from "./component/onboarding/Login";
import Home from "./component/dashboard/home/Home";
import Signup from "./component/onboarding/Signup";
import SpeakerListing from "./component/SpeakerListing";
import VerifyOtp from "./component/onboarding/VerifyOtp";
import ErrorPage from "./component/dashboard/errorpage/ErrorPage";
import ForgetPassword from "./component/onboarding/ForgetPassword";
import Events from "./component/dashboard/speakercomponent/Events";
import FaqPage from "./component/dashboard/speakercomponent/FaqPage";
import AboutUs from "./component/dashboard/speakercomponent/AboutUs";
import Planner from "./component/dashboard/speakercomponent/Planner";
import ForgetPasswordOtp from "./component/onboarding/ForgetPasswordOtp";
import Media from "./component/dashboard/speakercomponent/myprofile/Media";
import ChangePasswordUser from "./component/onboarding/ChangePasswordUser";
import ForgetPasswordEmail from "./component/onboarding/ForgetPasswordEmail";
import ChangePasswordSpeaker from "./component/onboarding/ChangePasswordSpeaker";
import Expertise from "./component/dashboard/speakercomponent/myprofile/Expertise";
import Booked from "./component/dashboard/speakercomponent/myprofile/event/Booked";
import Calandar from "./component/dashboard/speakercomponent/myprofile/event/Calandar";
import Publication from "./component/dashboard/speakercomponent/myprofile/Publication";
import EventList from "./component/dashboard/speakercomponent/myprofile/event/EventList";
import SingleSpeakerList from "./component/dashboard/speakercomponent/SingleSpeakerList";
import Availability from "./component/dashboard/speakercomponent/myprofile/Availability";
import WebsiteSocial from "./component/dashboard/speakercomponent/myprofile/WebsiteSocial";
import SpeakingTopics from "./component/dashboard/speakercomponent/myprofile/SpeakingTopics";
import IndustryTalent from "./component/dashboard/speakercomponent/myprofile/IndustryTalent";
import PersonalDetails from "./component/dashboard/speakercomponent/myprofile/PersonalDetails";
import ReferralPartner from "./component/dashboard/speakercomponent/myprofile/ReferralPartner";

import ChangePassword from "./component/dashboard/speakercomponent/myprofile/ChangePassword";
import AccountPreference from "./component/dashboard/speakercomponent/myprofile/AccountPreference";
import CreateEvent from "./component/dashboard/speakercomponent/myprofile/event/CreateEvent";
import NotificationPreference from "./component/dashboard/speakercomponent/myprofile/NotificationPreference";

import OrgnzrAccountPreference from "./component/dashboard/organizercomponent/organizerMyprofile/OrgnzrAccountPreference";
import OrgnzrChangePassword from "./component/dashboard/organizercomponent/organizerMyprofile/OrgnzrChangePassword";
import OrgnzrNotificationPreference from "./component/dashboard/organizercomponent/organizerMyprofile/OrgnzrNotificationPreference";
import OrgnzrProfile from "./component/dashboard/organizercomponent/organizerMyprofile/OrgnzrProfile";
import OrgnzrAddEvent from "./component/dashboard/organizercomponent/OrgnzrAddEvent";

// Planner page for testing purpose
import TestPlanner from "./component/dashboard/speakercomponent/TestPlanner";

import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.scss";




function App() {
  const { testName } = useContext(AppContext);


  useEffect(()=>{
Auth.token();
  },[testName])

  // Decryprt roll
  const decryptRoll = Auth.getRol()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  
  return (
    <Fragment>
      {/* {console.log("roll", decryptRoll)} */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="verify_otp" element={<PublicRoute><VerifyOtp /></PublicRoute>} />
          <Route path="forget-password" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
          <Route path="forget-password-otp" element={<PublicRoute><ForgetPasswordOtp /></PublicRoute>} />
          <Route path="forget-password-email" element={<PublicRoute><ForgetPasswordEmail /></PublicRoute>} />
          <Route path="change-password-speaker" element={<PublicRoute><ChangePasswordSpeaker /></PublicRoute>} />
          <Route path="change-password-user" element={<PublicRoute><ChangePasswordUser /></PublicRoute>} />

          {/* Private route */}
          <Route path="faq" element={<FaqPage />} />
          <Route path="events" element={<Events />} />
          <Route path="plan" element={<Planner />} />

          {/* testing */}
          <Route path="test-plan" element={<TestPlanner />} />
          
          <Route path="about-us" element={<AboutUs />} />
          <Route path="speaker-listing/:id" element={<PrivateRoute><SpeakerListing /></PrivateRoute>} />
          <Route path="speaker-listing" element={<PrivateRoute><SpeakerListing /></PrivateRoute>} />
          <Route path="single-speaker-list/:id" element={<PrivateRoute><SingleSpeakerList /></PrivateRoute>} />
          {
            decryptRoll==="user" && <Route path="events/organizer-add-event" element={<PrivateRoute><OrgnzrAddEvent /></PrivateRoute>} />
          }
          
          <Route path="*" element={<ErrorPage />} />  
          </Route>
          <Route element={<DashboardLayout/>}>
              {decryptRoll==="speaker" ? <>
              {/* Speaker router */}
              <Route path="personal-details" element={<PrivateRoute><PersonalDetails /></PrivateRoute>} />
              <Route path="expertise" element={<PrivateRoute><Expertise /></PrivateRoute> } />
              <Route path="availability" element={<PrivateRoute><Availability /></PrivateRoute> } />
              <Route path="speaking-topics" element={<PrivateRoute><SpeakingTopics /></PrivateRoute>} />
              <Route path="media" element={<PrivateRoute><Media /></PrivateRoute>} />
              <Route path="event-list" element={<PrivateRoute><EventList /></PrivateRoute>} />
              <Route path="create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
              <Route path="calandar" element={<PrivateRoute><Calandar /></PrivateRoute>} />
              <Route path="booked" element={<PrivateRoute><Booked /></PrivateRoute>} />
              <Route path="referral-partner" element={<PrivateRoute><ReferralPartner /></PrivateRoute>} />
              <Route path="publication" element={<PrivateRoute><Publication /></PrivateRoute>} />
              <Route path="account-preference" element={<PrivateRoute><AccountPreference /></PrivateRoute>} />
              <Route path="change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              <Route path="industry-talent" element={<PrivateRoute><IndustryTalent /></PrivateRoute>} />
              <Route path="notification-preferences" element={<PrivateRoute><NotificationPreference /></PrivateRoute>} />
              <Route path="website-social" element={<PrivateRoute><WebsiteSocial /></PrivateRoute>} />
              </>:
              <>
              {/* Organizer router */}
              <Route path="organizer-account-preference" element={<PrivateRoute><OrgnzrAccountPreference /></PrivateRoute>} />
              <Route path="organizer-change-password" element={<PrivateRoute><OrgnzrChangePassword /></PrivateRoute>} />
              <Route path="organizer-notification-preference" element={<PrivateRoute><OrgnzrNotificationPreference /></PrivateRoute>} />
              <Route path="organizer-profile" element={<PrivateRoute><OrgnzrProfile /></PrivateRoute>} />
              </>}
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" autoClose="2000" transition={Zoom} />
    </Fragment>
  );
}

export default App;
