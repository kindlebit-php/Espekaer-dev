import React from "react";

import { NavLink, useLocation,Link } from "react-router-dom";

// import {AppContext} from "../../../context/AppContext";
import { FaCircleNotch} from "react-icons/fa";

import Auth from "../../../../auth/Auth";

const OrgnzrMyProfileSidebar = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  // const {userImage,commonData} = useContext(AppContext);

  // Decrypt loginid
  const decrypt = Auth.loginId()
  ?.split("")
  ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
  .join("");

  return  (
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

        <><div className="mp-lb-name">{`${Auth.getSidebarName()
          ?.split("")
          ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
          .join("")}`}
        </div>
        <div className="view-profile sap-btn-light">
        <Link to={`/single-speaker-list/${decrypt}`} title="My Public profile">My Profile</Link></div></>
      ) : (
        <span className="btn-loade">
          {/* <FaCircleNotch /> */}
          Mintu Kumar
        </span>
      )}

      <ul className="mp-lb-list">
        <li
          className={`${
            location.pathname === `/organizer-profile` ? `active` : ``
          }`}
        >
          <NavLink to="/organizer-profile">profile</NavLink>
        </li>

        <li className={`${location.pathname === `/organizer-notification-preference` ? `active` : ``}`}>
          <NavLink to="/organizer-notification-preference">notification preferences</NavLink>
        </li>
        <li
          className={`${
            location.pathname === `/organizer-account-preference` ? `active` : ``
          }`}
        >
          <NavLink to="/organizer-account-preference">account preferences</NavLink>
        </li>

        <li
          className={`${
            location.pathname === `/organizer-change-password` ? `active` : ``
          }`}
        >
          <NavLink to="/organizer-change-password">change password</NavLink>
        </li>

      </ul>
    </div>
  );
};

export default OrgnzrMyProfileSidebar;
