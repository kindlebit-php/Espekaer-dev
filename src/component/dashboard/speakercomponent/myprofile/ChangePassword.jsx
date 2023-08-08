import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import MyProfileSidebar from "./MyProfileSidebar";

const ChangePassword = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  const pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const [allPassword, setAllPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    loader: false,
    newPassIcon: false,
    oldPassIcon: false,
    conPassIcon: false,
  });

  // Change password api
  const changePAssword = async () => {
    setAllPassword({ ...allPassword, loader: true });
    const loginKeyValue = {
      oldPassword: allPassword.oldPassword,
      newPassword: allPassword.newPassword,
    };
    const requestKey = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(loginKeyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/SpeakerChangePassword`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setAllPassword({ ...allPassword, loader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      toast.warn(error.message);
      setAllPassword({ ...allPassword, loader: false });
    }
  };

  // handle all password validation
  const handlePasswordValidation = (e) => {
    e.preventDefault();
    if (!allPassword.oldPassword) {
      toast.warn("Old password is required to proceed");
    } else if (!allPassword.newPassword) {
      toast.warn("Create a new password that meets the requirements");
    } else if (!allPassword.confirmPassword) {
      toast.warn("The confirm password field cannot be left empty");
    } else if (allPassword.newPassword !== allPassword.confirmPassword) {
      toast.warn("New password and confirmation password fields must match");
    } else if (!pass.test(allPassword.newPassword)) {
      toast.warn("Please enter strong password!");
    } else {
      changePAssword();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // const handleIamge=(e)=>{
  //   console.log("sandeep",e.target.files[0]);
  // }

  return (
    <div>
      <Fragment>
        <Helmet>
          <title>Change-Password</title>
        </Helmet>
        <div className="my-profile-page">
          <MyProfileSidebar />
          <div className="mp-right-panel" id="mp-change-password">
            <div className="mp-form-heading">Change Password</div>
            <form className="row" action="">
              <div className="col-md-12 form-group">
                <label htmlFor="" className="form-label">
                  Old Password<sup className="text-red">*</sup>
                </label>
                <input
                  type={`${!allPassword.oldPassIcon ? `password` : `text`}`}
                  className="form-control"
                  placeholder="Old password"
                  value={allPassword.oldPassword}
                  onChange={(e) =>
                    setAllPassword({
                      ...allPassword,
                      oldPassword: e.target.value,
                    })
                  }
                />
                <div
                  className="show-pass"
                  onClick={() =>
                    setAllPassword({
                      ...allPassword,
                      oldPassIcon: !allPassword.oldPassIcon,
                    })
                  }
                >
                  {!allPassword.oldPassIcon ? (
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
              <div className="col-md-12 form-group">
                <label htmlFor="" className="form-label">
                  New Password<sup className="text-red">*</sup>
                </label>
                <input
                  type={`${!allPassword.newPassIcon ? `password` : `text`}`}
                  className="form-control"
                  placeholder="New password"
                  value={allPassword.newPassword}
                  onChange={(e) =>
                    setAllPassword({
                      ...allPassword,
                      newPassword: e.target.value,
                    })
                  }
                />
                <div
                  className="show-pass"
                  onClick={() =>
                    setAllPassword({
                      ...allPassword,
                      newPassIcon: !allPassword.newPassIcon,
                    })
                  }
                >
                  {!allPassword.newPassIcon ? (
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
              {!pass.test(allPassword.newPassword) &&
                allPassword.newPassword && (
                  <span className="pass-error col-md-12 form-group">
                    Password must has at least 8 characters that include at
                    least 1 lowercase character, 1 uppercase characters, 1
                    number, and 1 special character
                  </span>
                )}
              <div className="col-md-12 form-group">
                <label htmlFor="" className="form-label">
                  Confirm Password<sup className="text-red">*</sup>
                </label>
                <input
                  type={`${!allPassword.conPassIcon ? `password` : `text`}`}
                  className={`form-control ${
                    allPassword.newPassword !== allPassword.confirmPassword &&
                    allPassword.confirmPassword &&
                    allPassword.newPassword
                      ? `error-message`
                      : ``
                  }`}
                  placeholder="Confirm password"
                  value={allPassword.confirmPassword}
                  onChange={(e) =>
                    setAllPassword({
                      ...allPassword,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div
                  className="show-pass"
                  onClick={() =>
                    setAllPassword({
                      ...allPassword,
                      conPassIcon: !allPassword.conPassIcon,
                    })
                  }
                >
                  {!allPassword.conPassIcon ? (
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
              <div className="divider"></div>
              <div className="sap-btn-light mt-4">
                <button
                  type="submit"
                  {...(allPassword.loader && { disabled: true })}
                  onClick={(e) => handlePasswordValidation(e)}
                >
                  Submit
                  <span className="btn-loader">
                    {allPassword.loader && <FaCircleNotch />}
                  </span>
                </button>
              </div>
              <div>
                <div>
                  <div></div>
                </div>
              </div>
              {/* <input type="file" onChange={(e)=>handleIamge(e)}/> */}
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ChangePassword;
