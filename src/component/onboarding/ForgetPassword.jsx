import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCircleNotch } from "react-icons/fa";

import Auth from "../../auth/Auth";

const ForgetPassword = () => {
  const [loginValue, setLoginValue] = useState({
    password: "",
    conPassword: "",
    passIcon: false,
    conPassIcon: false,
    loader: false,
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const navigate = useNavigate();

  // Forget password api
  const forgetPasswordApi = async () => {
    setLoginValue({ ...loginValue, loader: true });
    const keyValue = {
      id: localStorage.getItem("reset_password_id"),
      new_password: loginValue.password,
      confirm_password: loginValue.conPassword,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(keyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/resetPassword`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setLoginValue({ ...loginValue, loader: false });
      navigate("/login");
    }
    if (res.status >= 400 && res.status <= 500) {
      if(res.status===401){
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setLoginValue({ ...loginValue, loader: false });
      toast.warn(error.message);
    }
  };

  // Forget password validation
  const handleForgetPassword = () => {
    if(!loginValue.password && !loginValue.conPassword){
      setErrorMessage(true);
      toast.warn("All fields are required!");
    } else {
      if (!loginValue.password) {
        setErrorMessage(true);
        toast.warn("Please enter password");
      } else if(!pass.test(loginValue.password)){
        setErrorMessage(true);
        toast.warn("Please enter strong password!");
      } else if (!loginValue.conPassword) {
        setErrorMessage(true);
        toast.warn("Please enter confirm-password");
      } else if (loginValue.password !== loginValue.conPassword){
        setErrorMessage(true);
        toast.warn("Confirm password doesn't match with new passwor");
      }else {
        forgetPasswordApi();
      }
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Forget Password</title>
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
            <div className="sap-sm-heading sap-title-head">Forget Password</div>
            <div className="sap-card-head">
              <form action="">
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    NEW PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.conPassIcon ? `password` : `text`}`}
                    className={`form-control ${
                      errorMessage && (!loginValue?.password || !pass.test(loginValue.password)) ? `error-message`:``
                    }`}
                    placeholder="********"
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
                        conPassIcon: !loginValue.conPassIcon,
                      })
                    }
                  >
                    {!loginValue.conPassIcon ? (
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
                {!pass.test(loginValue?.password) && loginValue?.password && (
                  <span className="pass-error">
                    Password must has at least 8 characters that include at
                    least 1 lowercase character, 1 uppercase characters, 1
                    number, and 1 special character
                  </span>
                )}
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    CONFIRM PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.passIcon ? `password` : `text`}`}
                    className={`form-control ${
                      errorMessage && (!loginValue?.conPassword || loginValue.password !== loginValue.conPassword) ? `error-message`:``
                    }`}
                    placeholder="********"
                    value={loginValue?.conPassword}
                    onChange={(e) =>
                      setLoginValue({
                        ...loginValue,
                        conPassword: e.target.value,
                      })
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
                    type="button"
                    {...(loginValue.loader && { disabled: true })}
                    onClick={(e) => handleForgetPassword(e)}
                  >
                    Submit
                    <span className="btn-loader">
                      {loginValue.loader && <FaCircleNotch />}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* <Loader /> */}
    </Fragment>
  );
};

export default ForgetPassword;
