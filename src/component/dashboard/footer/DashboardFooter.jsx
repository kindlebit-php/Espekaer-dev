import React,{useRef} from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Auth from "../../../auth/Auth";

import logo from "../../assets/logo-light.png"

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaRegEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const DashboardFooter = () => {
  const navigate = useNavigate();

  // Handle send email
  const handleEmailClick = (email) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`);
  };

  // const faqPageScroll = () => {
  //   const element = document.getElementById("my-element");
  //   element.scrollIntoView({ behavior: "smooth" });
  // };

  const textRef = useRef(null);

  // Handle copy phone number
  const handleClick = () => {
    const text = textRef.current.innerText;
    navigator.clipboard.writeText(text);
    toast.warn("Number is copied");
  };

  return (
    <footer className="grey-back">
      <div className="footer-inner container">
        {/* <div className="foot-top">
          <div className="foot-logo">
            <img src={logo} alt="logo-light" />
          </div>
          <ul className="foot-social">
            <li>
              <a href="#/">
                <i className="">
                  <FaFacebookF />
                </i>
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="">
                  <FaTwitter />
                </i>
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="">
                  <FaInstagram />
                </i>
              </a>
            </li>
            <li>
              <a href="#/">
                <i className="">
                  <FaLinkedinIn />
                </i>
              </a>
            </li>
          </ul>
        </div> */}
        {/* <div className="foot-main"> */}
          {/* <div className="foot-main-inner" id="foot-inner1">
            <div className="text-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat, ante ut ornare pharetra, libero massa feugiat tellus, ut
              malesuada
            </div>
          </div>
          <div className="foot-main-inner" id="foot-inner2">
            <ul>
              <li onClick={() => navigate("/about-us")}>
                <p>About Us</p>
              </li>
              <li onClick={() => navigate("/events")}>
                <p>Events</p>
              </li>
              <li onClick={() => navigate("/speaker-listing")}>
                <p>Directory</p>
              </li>
              <li onClick={() => navigate("/plan")}> 
                <p>Plan</p>
              </li>
            </ul>
          </div>
          <div className="foot-main-inner" id="foot-inner3">
            <ul>
             {!Auth.token() && <>
              <li onClick={() => navigate("/signup")}>
                <p>register</p>
              </li>
              <li onClick={() => navigate("/login")}>
                <p>sign in</p>
              </li>
              </>}
              <li>
                <p className="foot4-title" onClick={() => navigate("/faq")}>
                  FAQ
                </p>
              </li>
              <li>
                <a
                  href="https://speakerhub.com/legal"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div> */}
          {/* <div className="foot-main-inner" id="foot-inner4">
            <ul>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                    `300-999 Canada Pl, Vancouver, BC V6C 3E1, Canada`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="foot4-icon">
                    <i>
                      <FaMapMarkerAlt />
                    </i>
                  </span>
                  <span className="foot4-title">
                    300-999 Canada Pl, Vancouver,
                    <br />
                    BC V6C 3E1, Canada
                  </span>
                </a>
              </li>
              <li>
                <p>
                  <span className="foot4-icon">
                    <i>
                      <FaRegEnvelope />
                    </i>
                  </span>
                  <span
                    className="foot4-title"
                    onClick={() => handleEmailClick("info@gigfinderplus.com")}
                  >
                    info@gigfinderplus.com
                  </span>
                </p>
              </li>
              <li>
                <p
                >
                  <span className="foot4-icon">
                    <i>
                      <FaPhoneAlt />
                    </i>
                  </span>
                  <span
                    className="foot4-title"
                    id="text-to-copy"
                    ref={textRef}
                    onClick={handleClick}
                  >
                    1234567890
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="foot-bot">
          © GIG FINDER PLUS {new Date()?.getFullYear()}, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
