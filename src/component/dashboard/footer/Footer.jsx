import React from "react";

import { Link } from "react-router-dom";

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
  FaPinterest
} from "react-icons/fa";

const Footer = () => {
  // Handle send email
  const handleEmailClick = (email) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`);
  };

  // const faqPageScroll = () => {
  //   const element = document.getElementById("my-element");
  //   element.scrollIntoView({ behavior: "smooth" });
  // };


  // Handle copy phone number
  // const handleClick = () => {
  //   const text = textRef.current.innerText;
  //   navigator.clipboard.writeText(text);
  //   toast.warn("Number is copied");
  // };

  // const handleClick = () => {
  //   const textToCopy = 'Text to be copied';
  
  //   navigator.clipboard.writeText(textToCopy)
  //     .then(() => {
  //       console.log('Text copied to clipboard');
  //     })
  //     .catch((error) => {
  //       console.error('Error copying text:', error);
  //     });
  // };

  // handle clipboard copy contact number 
  const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value=text; document.body.appendChild(textArea); textArea.focus();textArea.select(); try{document.execCommand('copy')}catch(err){console.error('Unable to copy to clipboard',err)}document.body.removeChild(textArea)};
  const handleClick = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.warn("You've successfully copied the text");
    } else {
      unsecuredCopyToClipboard(content);
      toast.warn("Copy failed. Please try again");
    }
  };

  return (
    <footer className="grey-back">
      <div className="footer-inner container">
        <div className="foot-top">
          <div className="foot-logo">
            <img src={logo} alt="logo-light" />
          </div>
          <ul className="foot-social">
            <li>
              <a href="https://www.facebook.com/espeakers" rel="noreferrer" target="_blank">
                <i className="">
                  <FaFacebookF />
                </i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/espeakers" rel="noreferrer" target="_blank">
                <i className="">
                  <FaTwitter />
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/espeakers/" rel="noreferrer" target="_blank">
                <i className="">
                  <FaPinterest />
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/espeakers" rel="noreferrer" target="_blank">
                <i className="">
                  <FaLinkedinIn />
                </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="foot-main">
          <div className="foot-main-inner" id="foot-inner1">
            <div className="text-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat, ante ut ornare pharetra, libero massa feugiat tellus, ut
              malesuada
            </div>
          </div>
          <div className="foot-main-inner" id="foot-inner2">
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/speaker-listing">Directory</Link>
              </li>
              <li> 
                <Link to="/plan">Plan</Link>
              </li>
            </ul>
          </div>
          <div className="foot-main-inner" id="foot-inner3">
            <ul>
             {!Auth.token() && <>
              <li>
                <Link to="/signup">register</Link>
              </li>
              <li>
                <Link to="/login">sign in</Link>
              </li>
              </>}
              <li>
                <Link className="foot4-title" to="/faq">
                  FAQ
                </Link>
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
          </div>
          <div className="foot-main-inner" id="foot-inner4">
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
                    {/* #7898 Avenue, Lorem Ipsum */}
                    300-999 Canada Pl, Vancouver,
                    <br />
                    {/* V3W8T8, CA. */}
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
                // onClick={() => handleClick(9876543210)}
                >
                  <span className="foot4-icon">
                    <i>
                      <FaPhoneAlt />
                    </i>
                  </span>
                  <span
                    className="foot4-title"
                    id="text-to-copy"
                    onClick={()=>handleClick(1234567890)}
                  >
                    1234567890
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          © GIG FINDER PLUS {new Date()?.getFullYear()}, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
