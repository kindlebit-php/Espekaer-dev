import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCircleNotch } from "react-icons/fa";

import Auth from "../../auth/Auth";

const ChangePasswordSpeaker = () => {
  const pass= /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  // Decryprt token
const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");
  const [loginValue, setLoginValue] = useState({
    oldPassword: "",
    newPassword: "",
    conPassword: "",
    oldPassIcon: false,
    newPassIcon: false,
    conPassIcon: false,
    loader: false,
  });
  const navigate = useNavigate();

  // Handle speaker change password api
  const speakerChangePassword = async () => {
    setLoginValue({ ...loginValue, loader: true });
    const keyValue = {
      old_password: loginValue.oldPassword,
      new_password: loginValue.newPassword,
      confirm_password: loginValue.conPassword,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(keyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/changePassword`,
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
      toast.warn(error.message);
      setLoginValue({ ...loginValue, loader: false });
    }
  };

  // Handle change password validation
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!loginValue.oldPassword) {
      toast.warn("Please enter old password");
    } else if (!loginValue.newPassword) {
      toast.warn("Please enter new password");
    }else if (!pass.test(loginValue.newPassword)) {
      toast.warn("Please enter strong password!");
    } else if (!loginValue.conPassword) {
      toast.warn("Please enter con password");
    } else if (loginValue.newPassword !== loginValue.conPassword) {
      toast.warn("New password & Confirm password doesn't match");
    } else {
      speakerChangePassword();
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Change Password Speaker</title>
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
            <div className="sap-sm-heading sap-title-head">Change Password</div>
            <div className="sap-card-head">
              <form onSubmit={(e) => handleChangePassword(e)}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    OLD PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.oldPassIcon ? `password` : `text`}`}
                    className="form-control"
                    placeholder="Enter Password..."
                    value={loginValue?.oldPassword}
                    onChange={(e) =>
                      setLoginValue({
                        ...loginValue,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                  <div
                    className="show-pass"
                    onClick={() =>
                      setLoginValue({
                        ...loginValue,
                        oldPassIcon: !loginValue.oldPassIcon,
                      })
                    }
                  >
                    {!loginValue.oldPassIcon ? (
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
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    NEW PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.newPassIcon ? `password` : `text`}`}
                    className="form-control"
                    placeholder="Enter Password..."
                    value={loginValue?.password}
                    onChange={(e) =>
                      setLoginValue({
                        ...loginValue,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <div
                    className="show-pass"
                    onClick={() =>
                      setLoginValue({
                        ...loginValue,
                        newPassIcon: !loginValue.newPassIcon,
                      })
                    }
                  >
                    {!loginValue.newPassIcon ? (
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
                {!pass.test(loginValue?.newPassword) && loginValue?.newPassword && <span className="pass-error">Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character</span>}
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    CONFIRM PASSWORD<sup className="text-red">*</sup>
                  </label>
                  <input
                    type={`${!loginValue.conPassIcon ? `password` : `text`}`}
                    className="form-control"
                    placeholder="Enter Password..."
                    value={loginValue?.password}
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

                <div className="sap-btn-light login-btn">
                  <button
                    type="submit"
                    {...(loginValue.loader && { disabled: true })}
                  >
                    Submit
                    <span className="btn-loader">
                      {loginValue.loader && <FaCircleNotch />}
                    </span>
                  </button>
                </div>
                <div className="sign-up-link">
                  <p onClick={() => navigate(-1)} className="text-yellow">
                    Go to back!
                  </p>
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

export default ChangePasswordSpeaker;