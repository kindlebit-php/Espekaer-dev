import React, { Fragment, useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import FacebookAuth from "react-facebook-auth";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { FaEye, FaEyeSlash, FaCircleNotch } from "react-icons/fa";
// import jwt_decode from "jwt-decode";
// import { GoogleLogin } from "@react-oauth/google";

import Auth from "../../auth/Auth";
import { AppContext } from "../context/AppContext";

const btnStyles = {
  backgroundColor: "#008CBA",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
};

const Login = () => {
  const { setTestName } = useContext(AppContext);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [errorMessage, setErrorMessage] = useState(false);
  const [radioButton, setRadioButton] = useState("speaker");
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
    passIcon: false,
    loader: false,
  });

  const navigate = useNavigate();

  // Detect browser name
  const browserName = (function (agent) {
    switch (true) {
      case agent.indexOf("edge") > -1:
        return "MS Edge";
      case agent.indexOf("edg/") > -1:
        return "Edge";
      // return "Edge ( chromium based)";
      case agent.indexOf("opr") > -1 && !!window.opr:
        return "Opera";
      case agent.indexOf("chrome") > -1 && !!window.chrome:
        return "Chrome";
      case agent.indexOf("trident") > -1:
        return "MS IE";
      case agent.indexOf("firefox") > -1:
        return "Mozilla Firefox";
      case agent.indexOf("safari") > -1:
        return "Safari";
      default:
        return "other";
    }
  })(window?.navigator?.userAgent?.toLowerCase());

  // Login speaker
  const loginApi = async () => {
    setLoginValue({ ...loginValue, loader: true });
    const loginKeyValue = {
      email: loginValue.email,
      password: loginValue.password,
      userBrower: browserName,
    };
    const requestKey = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginKeyValue),
    };
    //
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}${
        radioButton === `speaker` ? `speaker/loginSpeaker` : `user/loginUser`
      }`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      Auth.login(data?.data);
      const speaker_role = data?.data?.speakerData?.role;
      const user_role = data?.data?.userData?.role;
      setTestName(speaker_role ? speaker_role : user_role);
      setLoginValue({ ...loginValue, loader: false });
      navigate("/");
    }
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      toast.warn(error.message);
      setLoginValue({ ...loginValue, loader: false });
    }
  };

  // Validation login
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginValue;
    if (!email && !password) {
      setErrorMessage(true);
      toast.warn("All fields are mandatory!");
    } else {
      if (!email) {
        setErrorMessage(true);
        toast.warn("Email is required!");
      } else if (!emailRegex.test(email)) {
        setErrorMessage(true);
        toast.warn("Invalid email!");
      } else if (!password) {
        setErrorMessage(true);
        toast.warn("Password is required!");
      } else {
        loginApi();
      }
    }
  };

  // Facebook response get
  const responseFacebook = (response) => {
    console.log("Facebook", response);
  };

  const MyFacebookButton = ({ onClick }) => <FaFacebookF onClick={onClick} />;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{`${
          radioButton === `speaker` ? `Login Speaker` : `Login Organizer`
        }`}</title>
      </Helmet>
      <div className="login-page">
        <section className="login-page-sec">
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
          <div className="login-page-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Login</div>
            <div className="sap-card-head">
              <div className="login-type-check">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="speaker"
                    checked={radioButton === "speaker"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    type="radio"
                    name="flexRadioDefault"
                    id="logintospeaker1"
                  />
                  <label className="form-check-label" htmlFor="logintospeaker1">
                    Login as a Speaker
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="user"
                    checked={radioButton === "user"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    type="radio"
                    name="flexRadioDefault"
                    id="logintoorganizer1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="logintoorganizer1"
                  >
                    Login as an Organizer
                  </label>
                </div>
              </div>
              <form onSubmit={(e) => handleLogin(e)}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    E-MAIL<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errorMessage && (!loginValue?.email || !emailRegex.test(loginValue.email)) ? `error-message`:``
                    }`}
                    placeholder="Enter your email..."
                    value={loginValue?.email}
                    onChange={(e) =>
                      setLoginValue({ ...loginValue, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.passIcon ? `password` : `text`}`}
                    className={`form-control ${
                      errorMessage && !loginValue?.password ? `error-message`:``
                    }`}
                    placeholder="Enter Password..."
                    value={loginValue?.password}
                    onChange={(e) =>
                      setLoginValue({ ...loginValue, password: e.target.value })
                    }
                  />
                  <div
                    className="show-pass"
                    onClick={() =>
                      setLoginValue({
                        ...loginValue,
                        passIcon: !loginValue.passIcon,
                      })
                    }
                  >
                    {!loginValue.passIcon ? (
                      <i>
                        <FaEyeSlash />
                      </i>
                    ) : (
                      <i>
                        <FaEye />
                      </i>
                    )}
                  </div>
                </div>
                <div className="sap-btn-light login-btn">
                  <button
                    type="submit"
                    {...(loginValue.loader && { disabled: true })}
                    onClick={(e) => handleLogin(e)}
                  >
                    Log in
                    <span className="btn-loader">
                      {loginValue.loader && <FaCircleNotch />}
                    </span>
                  </button>
                </div>

                <div className="sign-up-link">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-yellow">
                    Create one now!
                  </Link>
                </div>
                <div className="sign-up-link">
                  <Link to="/forget-password-email" className="text-yellow">
                    Have you forgotten your password?
                  </Link>
                </div>
                <div className="sign-in-with-sec">
                  <div className="card-block">
                    <p className="card-text">Log In with</p>
                  </div>
                  <div className="dual-btn">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <i>
                          <FaGoogle />
                        </i>
                      </button>
                    </div>
                    {/* <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        var decoded = jwt_decode(
                          credentialResponse?.credential
                        );
                        console.log("Google decoded", decoded);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    /> */}
                    <div className="sap-btn-dark">
                      <button type="button">
                        {/* <i>
                          <FaFacebookF />
                        </i> */}
                        <FacebookAuth
                          appId="1168632437077085"
                          // appId="1212198992999215"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          component={MyFacebookButton}
                          customProps={{ styles: btnStyles }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* {/ <Loader /> /} */}
    </Fragment>
  );
};

export default Login;
