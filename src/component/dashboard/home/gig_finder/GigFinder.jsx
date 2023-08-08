import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";

const GigFinder = () => {
  const navigate = useNavigate();

  const [contactModalInputs, setContactModalInputs] = useState({
    name: "",
    email: "",
    query: "",
    contactModal: false,
    submitLoader: false,
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  // contact us speaker
  const contactUsApi = async () => {
    setContactModalInputs({ ...contactModalInputs, submitLoader: true });
    const loginKeyValue = {
      name: contactModalInputs.name,
      email: contactModalInputs.email,
      query: contactModalInputs.query,
    };
    const requestKey = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginKeyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/contactUs`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setContactModalInputs({
        name: "",
        email: "",
        query: "",
        contactModal: false,
        submitLoader: false,
      });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setContactModalInputs({ ...contactModalInputs, submitLoader: false });
    }
  };

  // handling validation on contact form
  const handleContactUsValidation = () => {
    const { name, email, query } = contactModalInputs;
    if (!name && !email && !query) {
      setErrorMessage(true);
      toast.warn("All fields are required!");
    } else {
      if (!name) {
        setErrorMessage(true);
        toast.warn("Name is required!");
      } else if (!email) {
        setErrorMessage(true);
        toast.warn("Email-id is required!");
      } else if (!emailRegex.test(email)) {
        setErrorMessage(true);
        toast.warn("Invalid email!");
      } else if (!query) {
        setErrorMessage(true);
        toast.warn("Query is required!");
      } else {
        contactUsApi();
      }
    }
  };

  return (
    <Fragment>
      <section className="gig-about-sec">
        <div className="gas-left">
          <img src="assets/image/mic-ban.png" alt="" className="mic-img" />
          <img
            src="assets/image/logo-light.png"
            alt=""
            className="floating-logo"
          />
        </div>
        <div className="gas-right">
          <div className="sap-md-heading">
            The only solution to managing & monetizing your speaker directory
          </div>
          <div className="text-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat, ante ut ornare pharetra, libero massa feugiat tellus, ut
            malesuada sem arcu ut orci. Etiam sapien tellus, fermentum eget
            pharetra at.
          </div>
          <div className="sap-btn-dark">
            <button
              type="button"
              onClick={() =>
                setContactModalInputs({
                  ...contactModalInputs,
                  contactModal: true,
                })
              }
            >
              contact us
            </button>
          </div>
        </div>
      </section>
      <Modal
        show={contactModalInputs.contactModal}
        onHide={() => {
          setContactModalInputs({
            ...contactModalInputs,
            contactModal: false,
            name: "",
            email: "",
            query: "",
          });
          setErrorMessage(false);
        }}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
        id="contactus-pop"
      >
        <Modal.Header closeButton>
          <div className="modal-header-heading">Contact Us</div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                NAME<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errorMessage && !contactModalInputs?.name
                    ? `error-message`
                    : ``
                }`}
                placeholder="Enter your name..."
                value={contactModalInputs?.name}
                onKeyPress={(e) => {
                  if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setContactModalInputs({
                    ...contactModalInputs,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                E-MAIL<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errorMessage &&
                  (!contactModalInputs?.email ||
                    !emailRegex.test(contactModalInputs.email))
                    ? `error-message`
                    : ``
                }`}
                placeholder="Enter your email..."
                value={contactModalInputs?.email}
                onChange={(e) =>
                  setContactModalInputs({
                    ...contactModalInputs,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                QUERY<sup className="text-red">*</sup>
              </label>
              <textarea
                type="text"
                className={`form-control ${
                  errorMessage && !contactModalInputs?.query
                    ? `error-message`
                    : ``
                }`}
                placeholder="Enter your query..."
                value={contactModalInputs?.query}
                onChange={(e) =>
                  setContactModalInputs({
                    ...contactModalInputs,
                    query: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <button
                type="button"
                onClick={() => {
                  setContactModalInputs({
                    ...contactModalInputs,
                    contactModal: false,
                    name: "",
                    email: "",
                    query: "",
                  });
                  setErrorMessage(false);
                }}
              >
                Close
              </button>
            </div>
            <div className="sap-btn-light">
              <button type="button" onClick={() => handleContactUsValidation()}>
                Submit
                <span className="btn-loader">
                  {contactModalInputs.submitLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default GigFinder;
