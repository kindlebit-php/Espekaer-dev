import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../auth/Auth";

const ForgetPasswordEmail = () => {
  const navigate = useNavigate();

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [loginValue, setLoginValue] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Handle forgetpassword email api
  const forgetPasswordEmail = async () => {
    setButtonLoader(true);
    const emailKey = {
      email: loginValue,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/forgetPassword`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setButtonLoader(false);
      navigate("/forget-password-otp");
    }
    if (res.status >= 400 && res.status <= 500) {
      if(res.status===401){
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      setButtonLoader(false);
    }
  };

  // Handle forget password email
  const handleForgetPassword = (e) => {
    e.preventDefault();
    if (!loginValue) {
      toast.warn("Email is required!");
      setErrorMessage(true);
    } else if (!emailRegex.test(loginValue)) {
      setErrorMessage(true);
      toast.warn("Invalid email!");
    } else {
      forgetPasswordEmail();
    }
  };
  useEffect(() => {
    localStorage.setItem("email", loginValue);
  }, [loginValue]);
  return (
    <Fragment>
      <Helmet>
        <title>Forget password</title>
      </Helmet>
      <div className="forgot-pass-page">
        <section className="forgot-pass-sec">
          <svg
            className="dotted-lines"
            xmlns="http://www.w3.org/2000/svg"
            width="1368.982"
            height="545.754"
            viewBox="0 0 1368.982 545.754"
          >
            <g
              id="Group_138"
              data-name="Group 138"
              transform="translate(1.645 -168.462)"
            >
              <path
                id="Path_334"
                data-name="Path 334"
                d="M6359.55,194.19c60.121-.139,194.815,5.485,337.45,50.81,192.75,61.25,183.75,187.25,400,195s302.75-117,479-117c65.389,0,113.366,16.1,147.969,36.432"
                transform="translate(-6358 -2)"
                fill="none"
                stroke="#edc967"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeDasharray="7 7"
              ></path>
              <path
                id="Path_333"
                data-name="Path 333"
                d="M6357.633,297.626C6388.769,384.931,6448.143,521.5,6533,589c130.75,104,356,126,466,92s299.5-100.25,325-217-82.25-252.75-217-283-217,11-304,108c-26,36-75,134-7,273,84,111,184.5,148.75,361,153s249-52,392-164,37.75-186.75,102-284a702.612,702.612,0,0,1,72.049-91.355"
                transform="translate(-6358 -2)"
                fill="none"
                stroke="#edc967"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeDasharray="7"
              ></path>
            </g>
          </svg>
          <div className="forgot-pass-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Forgot Password</div>
            <div className="sap-card-head">
              <form onSubmit={(e) => handleForgetPassword(e)}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    E-MAIL<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="type"
                    className={`form-control ${
                      errorMessage && (!loginValue || !emailRegex.test(loginValue)) ? `error-message` : ``
                    }`}
                    placeholder="Enter your email..."
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                  />
                </div>
                <div className="dual-btn">
                  <div className="sap-btn-light">
                    <button
                      type="submit"
                      {...(loginValue.loader && { disabled: true })}
                    >
                      Submit
                      <span className="btn-loader">
                        {buttonLoader && <FaCircleNotch />}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="sign-up-link">
                  Already have an account? &nbsp;
                  <Link to="/login" className="text-yellow">
                    Log in here!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ForgetPasswordEmail;