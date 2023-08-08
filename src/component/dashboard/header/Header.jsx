import React, { Fragment, useState, useEffect, useContext } from "react";

import { FaUserPlus } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, NavLink,useLocation } from "react-router-dom";

import logo from "../../assets/logo-light.png"

import Auth from "../../../auth/Auth";
import { AppContext } from "../../context/AppContext";

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { setTestName,testName } = useContext(AppContext);
  const [isModal, setIsModal] = useState(false);

  

  // Handle logout
  const handleLogOut = () => {
    setIsModal(false);
    Auth.logout();
    navigate("/login");
    localStorage.clear();
    setTestName("");
  };

   // Decryprt token
   const decryptRoll = Auth.getRol()
   ?.split("")
   ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
   .join("");
   
  useEffect(() => {
    Auth.token();
  }, [isModal]);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-xl bg-light">
        <div className="container-fluid">
          <span className="navbar-brand" onClick={() => navigate("/")}>
            <img src={logo} alt="logo-light" />
          </span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {Auth.token() && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about-us">
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item" >
                    <NavLink className="nav-link" to="/events">
                      Events
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${(location.pathname===`/single-speaker-list` || location.pathname.split("/")[1]==="single-speaker-list") ? `header-custom`:``}`} to="/speaker-listing">
                    Directory
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/plan">
                      Plan
                    </NavLink>
                  </li>
                  {/* Speaker profile */}
                  {decryptRoll==="speaker" ? <li className="nav-item">
                    <NavLink className={`nav-link ${(location.pathname===`/expertise` || location.pathname===`/publication` || location.pathname===`/events-calandar` || location.pathname===`/event-list`||location.pathname===`/calandar` || location.pathname===`/booked`|| location.pathname===`/create-event`|| location.pathname===`/speaking-topics` || location.pathname===`/account-preference`|| location.pathname===`/media` || location.pathname===`/generate-event` || location.pathname===`/change-password` || location.pathname===`/website-social` || location.pathname===`/availability` || location.pathname===`/industry-talent`) ? `header-custom`:``}`} to="/personal-details">
                      My Profile
                    </NavLink>
                  </li>
                  :
                  // Organizer profile
                  <li className="nav-item">
                    <NavLink className={`nav-link ${(location.pathname===`/organizer-profile` || location.pathname===`/organizer-change-password` || location.pathname===`/organizer-account-preference` || location.pathname===`/organizer-notification-preference`) ? `header-custom`:``}`} to="/organizer-profile">
                      My Profile
                    </NavLink>
                  </li>}
                </>
              )}
            </ul>
          </div>
          <div className="header-rlink">
            {!Auth.token() && <button className="header-rlink-inner" id="hrlink-register">
              <i onClick={() => navigate("/signup")}>
                <FaUserPlus />
              </i>
            </button>}

            <div className="sap-btn-light">
              {Auth.token() ? (
                <button
                  className="header-rlink-inner"
                  onClick={() => setIsModal(true)}
                  id="hrlink-login"
                >
                  Logout
                </button>
              ) : (
                <button
                  className="header-rlink-inner"
                  id="hrlink-login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Logout modal section start */}
      <Modal
        show={isModal}
        onHide={() => setIsModal(false)}
        id="logout-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <div className="pop-up-heading text-center">Are you sure you want to logout?</div>
          </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
            <Button variant="cust" onClick={() => setIsModal(false)}>
            No
          </Button>
            </div>
            <div className="sap-btn-light">
            <Button variant="cust" onClick={() => handleLogOut()}>
            Yes
          </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Header;
