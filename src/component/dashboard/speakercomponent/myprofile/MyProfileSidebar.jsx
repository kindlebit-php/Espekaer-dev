import React, { useState, useEffect } from "react";
import { NavLink, useLocation,Link } from "react-router-dom";
// import {AppContext} from "../../../context/AppContext";
import { FaCircleNotch, FaChevronDown, FaChevronUp,FaUserCircle } from "react-icons/fa";
import Auth from "../../../../auth/Auth";

const MyProfileSidebar = () => {
  const [eventToggle, setEventToggle] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  // const {userImage,commonData} = useContext(AppContext);

  useEffect(() => {
    if (
      location.pathname === `/event-list` ||
      location.pathname === "/create-event" ||
      location.pathname === "/calandar" ||
      location.pathname === "/booked"
    ) {
      setEventToggle(true);
    }
    // eslint-disable-next-line
  }, []);

  const decrypt = Auth.loginId()
  ?.split("")
  ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
  .join("");

  return (
    <div className="mp-left-bar">
      <div className="mp-lb-img">
      
        <img
          src={
            Auth.getSidebarImage()
              ? `${process.env.REACT_APP_IMAGE_URL}${Auth.getSidebarImage()
                  ?.split("")
                  ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
                  .join("")}`
              : `assets/image/user-placeholder.jpg`
          }
          alt=""
        />
        
      </div>
      {Auth.getSidebarName() ? (
        <>
        <div className="mp-lb-name">{`${Auth.getSidebarName()
          ?.split("")
          ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
          .join("")}`}
        </div>
        <div className="view-profile sap-btn-light"><Link to={`/single-speaker-list/${decrypt}`} title="My Public profile">My Profile</Link></div>
        </>
        
      ) : (
        <span className="btn-loader">
          <FaCircleNotch />
        </span>
      )}

      <ul className="mp-lb-list">
        <li
          className={`${
            location.pathname === `/personal-details` ? `active` : ``
          }`}
        >
          <NavLink to="/personal-details">personal details</NavLink>
        </li>

        <li className={`${location.pathname === `/expertise` ? `active` : ``}`}>
          <NavLink to="/expertise">Expertise</NavLink>
        </li>
        <li
          className={`${
            location.pathname === `/speaking-topics` ? `active` : ``
          }`}
        >
          <NavLink to="/speaking-topics">Speaking topics</NavLink>
        </li>

        <li
          className={`${
            location.pathname === `/industry-talent` ? `active` : ``
          }`}
        >
          <NavLink to="/industry-talent">Industry & Talent</NavLink>
        </li>
        <li
          className={`${location.pathname === `/availability` ? `active` : ``}`}
        >
          <NavLink to="/availability">Availability & Fees</NavLink>
        </li>

        <li
          onClick={() => setEventToggle(!eventToggle)}
          className={`${
            location.pathname === `/event-list` ||
            location.pathname === `/booked` ||
            location.pathname === `/calandar` ||
            location.pathname === `/create-event` ||
            eventToggle
              ? `active`
              : ``
          }`}
        >
          <p className={eventToggle ? "active" : ""}>
            event{" "}
            <span className="toggle-arrow">
              {!eventToggle ? <FaChevronDown /> : <FaChevronUp />}
            </span>
            </p>
        </li>
        {eventToggle && (
          <>
            <li
              className={`sub-event ${
                location.pathname === `/event-list` ? `active` : ``
              }`}
            >
              <NavLink to="/event-list">event list</NavLink>
            </li>
            <li
              className={`sub-event ${
                location.pathname === `/create-event` ? `active` : ``
              }`}
            >
              <NavLink to="/create-event">create event</NavLink>
            </li>
            <li
              className={`sub-event ${
                location.pathname === `/calandar` ? `active` : ``
              }`}
            >
              <NavLink to="/calandar">calendar</NavLink>
            </li>
            <li
              className={`sub-event ${
                location.pathname === `/booked` ? `active` : ``
              }`}
            >
              <NavLink to="/booked">booked</NavLink>
            </li>
          </>
        )}

        {/* <li className={`${location.pathname===`/generate-event` ? `active`:``}`}>
              <NavLink to="/generate-event">event schedule</NavLink>
            </li>
            <li className={`${location.pathname===`/events-calandar` ? `active`:``}`}>
              <NavLink to="/events-calandar">schedule events</NavLink>
            </li> */}
        <li className={`${location.pathname === `/media` ? `active` : ``}`}>
          <NavLink to="/media">media</NavLink>
        </li>

        <li
          className={`${location.pathname === `/publication` ? `active` : ``}`}
        >
          <NavLink to="/publication">Publications</NavLink>
        </li>

        <li
          className={`${location.pathname === `/referral-partner` ? `active` : ``}`}
        >
          <NavLink to="/referral-partner">referral partner</NavLink>
        </li>

        <li
          className={`${
            location.pathname === `/website-social` ? `active` : ``
          }`}
        >
          <NavLink to="/website-social">Website & Social</NavLink>
        </li>
        <li
          className={`${
            location.pathname === `/notification-preferences` ? `active` : ``
          }`}
        >
          <NavLink to="/notification-preferences">
            Notification preferences
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="#/">One-sheet generator</NavLink>
        </li> */}
        <li
          className={`${
            location.pathname === `/account-preference` ? `active` : ``
          }`}
        >
          <NavLink to="/account-preference">Account preferences</NavLink>
        </li>
        <li
          className={`${
            location.pathname === `/change-password` ? `active` : ``
          }`}
        >
          <NavLink to="/change-password">Change Password</NavLink>
        </li>
        {/* <li>
              <NavLink to="#/">Embed your speaker card</NavLink>
            </li> */}
      </ul>
    </div>
  );
};

export default MyProfileSidebar;
