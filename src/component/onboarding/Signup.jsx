import React, { Fragment, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
  FaCircleNotch,
} from "react-icons/fa";

import Auth from "../../auth/Auth";

const Signup = () => {
  const navigate = useNavigate();
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const [errorMessage, setErrorMessage] = useState(false);
  const [radioButton, setRadioButton] = useState("speaker");
  const [sidnUpValue, setSignupValue] = useState({
    fName: "",
    eMails: "",
    password: "",
    conPassword: "",
    gender: "",
    acceptTandC: "",
    passIcon: false,
    confirmPassIcon: false,
    loader: false,
  });

  useEffect(() => {
    localStorage.setItem("email", sidnUpValue.eMails);
    localStorage.setItem("role", radioButton);
  }, [sidnUpValue.eMails, radioButton]);

  // Handle speaker signup Api
  const speakerSignUpApi = async () => {
    setSignupValue({ ...sidnUpValue, loader: true });
    const speakerSignUpKey = {
      fullName: sidnUpValue.fName,
      gender: sidnUpValue.gender,
      email: sidnUpValue.eMails,
      password: sidnUpValue.password,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(speakerSignUpKey),
    };
    // user/signUpUser
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}${
        radioButton === `speaker` ? `speaker/signUpSpeaker` : `user/signUpUser`
      }`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data?.message);
      setSignupValue({ ...sidnUpValue, loader: false });
      navigate("/verify_otp");
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }

      const error = await res.json();
      toast.warn(error.message);
      setSignupValue({ ...sidnUpValue, loader: false });
    }
  };


  // Hhandle Signup validation
  const handleSignup = (e) => {
    e.preventDefault();
    const { fName, eMails, password, conPassword, gender, acceptTandC } =
      sidnUpValue;
    if (
      !fName &&
      !eMails &&
      !password &&
      !conPassword &&
      !gender &&
      !acceptTandC
    ) {
      setErrorMessage(true);
      toast.warn("All fields are mandatory!");
    } else {
      if (!fName) {
        setErrorMessage(true);
        toast.warn("Please enter fullname");
      } else if (fName?.length < 4) {
        setErrorMessage(true);
        toast.warn("Fullname length must be atleast 4 characters long");
      } else if (fName?.match(/^[\s]*/g)[0].length) {
        setErrorMessage(true);
        toast.warn("White space is not allowed in fullname field!");
      } else if (!eMails) {
        setErrorMessage(true);
        toast.warn("Please enter email");
      } else if (!emailRegex.test(eMails)) {
        setErrorMessage(true);
        toast.warn("Invalid email!");
      } else if (!password) {
        setErrorMessage(true);
        toast.warn("Please enter password");
      } else if (!pass.test(password)) {
        setErrorMessage(true);
        toast.warn("Please enter strong password!");
      } else if (!conPassword) {
        setErrorMessage(true);
        toast.warn("Please enter confirm password");
      } else if (password !== conPassword) {
        setErrorMessage(true);
        toast.warn("Password doesn't match");
      } else if (!gender) {
        setErrorMessage(true);
        toast.warn("Please choose the gender");
      } else if (!acceptTandC) {
        setErrorMessage(true);
        toast.warn("Please agree to our T&C");
      } else {
        // setSignupValue({fName:"",eMails:"",password:"",conPassword:"",gender:"",acceptTandC:""})
        speakerSignUpApi();
      }
    }
  };

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
          radioButton === `speaker` ? `Sign up speaker` : `Sign up organizer`
        }`}</title>
      </Helmet>
      <div className="register-page">
        <section className="register-page-sec">
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
          <div className="register-page-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Sign Up</div>
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
                    id="logintospeaker2"
                  />
                  <label className="form-check-label" htmlFor="logintospeaker2">
                    Sign Up as a Speaker
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="user"
                    checked={radioButton === "user"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    name="flexRadioDefault"
                    id="logintoorganizer2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="logintoorganizer2"
                  >
                    Sign Up as an Organizer
                  </label>
                </div>
              </div>
              <form onSubmit={(e) => handleSignup(e)} className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    full name<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    value={sidnUpValue?.fName}
                    onChange={(e) =>
                      setSignupValue({ ...sidnUpValue, fName: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className={`form-control ${
                      errorMessage &&
                      (!sidnUpValue?.fName ||
                        sidnUpValue?.fName?.length < 4 ||
                        sidnUpValue?.fName?.match(/^[\s]*/g)[0].length)
                        ? `error-message`
                        : ``
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    E-MAIL<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    value={sidnUpValue?.eMails}
                    onChange={(e) =>
                      setSignupValue({ ...sidnUpValue, eMails: e.target.value })
                    }
                    className={`form-control ${
                      errorMessage && (!sidnUpValue?.eMails || !emailRegex.test(sidnUpValue?.eMails))
                        ? `error-message`
                        : ``
                    }`}
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!sidnUpValue.passIcon ? `password` : `text`}`}
                    value={sidnUpValue?.password}
                    onChange={(e) =>
                      setSignupValue({
                        ...sidnUpValue,
                        password: e.target.value,
                      })
                    }
                    className={`form-control ${
                      errorMessage && (!sidnUpValue?.password || !pass.test(sidnUpValue?.password))
                        ? `error-message`
                        : ``
                    }`}
                    placeholder="Enter Password..."
                  />
                  <div
                    className="show-pass"
                    onClick={() =>
                      setSignupValue({
                        ...sidnUpValue,
                        passIcon: !sidnUpValue.passIcon,
                      })
                    }
                  >
                    {!sidnUpValue.passIcon ? (
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
                {!pass.test(sidnUpValue?.password) && sidnUpValue?.password && (
                  <span className="pass-error">
                    Password must has at least 8 characters that include at
                    least 1 lowercase character, 1 uppercase characters, 1
                    number, and 1 special character
                  </span>
                )}
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    confirm PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${
                      !sidnUpValue.confirmPassIcon ? `password` : `text`
                    }`}
                    value={sidnUpValue?.conPassword}
                    onChange={(e) =>
                      setSignupValue({
                        ...sidnUpValue,
                        conPassword: e.target.value,
                      })
                    }
                    className={`form-control ${
                      errorMessage && (!sidnUpValue?.conPassword || sidnUpValue?.password !== sidnUpValue?.conPassword)
                        ? `error-message`
                        : ``
                    }`}
                    placeholder="Enter Password..."
                  />
                  <div
                    className="show-pass"
                    onClick={() =>
                      setSignupValue({
                        ...sidnUpValue,
                        confirmPassIcon: !sidnUpValue.confirmPassIcon,
                      })
                    }
                  >
                    {!sidnUpValue.confirmPassIcon ? (
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
                <div className="col-md-12 form-group-head fill-gender">
                  <label htmlFor="" className="form-label">
                    Gender<sup className="text-red">*</sup>
                  </label>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className={`form-check-input ${
                          errorMessage && !sidnUpValue?.gender
                            ? `error-message`
                            : ``
                        }`}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="male"
                        onChange={(e) =>
                          setSignupValue({
                            ...sidnUpValue,
                            gender: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className={`form-check-input ${
                          errorMessage && !sidnUpValue?.gender
                            ? `error-message`
                            : ``
                        }`}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="female"
                        onChange={(e) =>
                          setSignupValue({
                            ...sidnUpValue,
                            gender: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className={`form-check-input ${
                          errorMessage && !sidnUpValue?.gender
                            ? `error-message`
                            : ``
                        }`}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        value="other"
                        onChange={(e) =>
                          setSignupValue({
                            ...sidnUpValue,
                            gender: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        errorMessage && !sidnUpValue?.acceptTandC
                          ? `error-message`
                          : ``
                      }`}
                      type="checkbox"
                      id="flexCheckDefault"
                      value={sidnUpValue?.acceptTandC}
                      onChange={(e) =>
                        setSignupValue({
                          ...sidnUpValue,
                          acceptTandC: e.target.checked,
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      I ACCEPT THE &nbsp;
                      <a
                        href="https://speakerhub.com/legal"
                        target="_blank"
                        rel="noreferrer"
                        className="text-yellow"
                      >
                        TERMS & CONDITIONS
                      </a>
                    </label>
                  </div>
                </div>
                <div className="sap-btn-light create-ac-btn">
                  <button
                    type="submit"
                    {...(sidnUpValue.loader && { disabled: true })}
                  >
                    create account{" "}
                    <span className="btn-loader">
                      {sidnUpValue.loader && <FaCircleNotch />}
                    </span>
                  </button>
                </div>
                <div className="log-in-link">
                  Already have an account?{" "}
                  <Link to="/login" className="text-yellow">
                    Log in here!
                  </Link>
                </div>
                <div className="sign-in-with-sec">
                  <div className="card-block">
                    <p className="card-text">Log In with</p>
                  </div>
                  <div className="dual-btn">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <i className="">
                          <FaGoogle />
                        </i>
                      </button>
                    </div>
                    <div className="sap-btn-dark">
                      <button type="button">
                        <i className="">
                          <FaFacebookF />
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Signup;
