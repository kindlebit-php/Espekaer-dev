import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import OtpTimer from "otp-timer";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../auth/Auth";

const VerifyOtp = () => {
  const navigate = useNavigate();
 // Decryprt token
 const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");
  const getRole = localStorage.getItem("role");
  const [code, setCode] = useState("");
  const [loginValue, setLoginValue] = useState({
    loader: false,
  });
  // Forget password api
  // const resendOtpApi = async () => {
  //   const keyValue = {
  //     email: localStorage.getItem("email"),
  //   };
  //   const requestKey = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(keyValue),
  //   };
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}speaker/forgetPassword`,
  //     requestKey
  //   );
  //   if (response.status >= 200 && response.status <= 399) {
  //     const data = await response.json();
  //     toast.success(data.message);
  //   }
  //   if (response.status >= 400 && response.status <= 500) {
  //     const error = await response.json();
  //     toast.error(error.message);
  //   }
  // };

  // Verified otp api
  const verifiOtp = async () => {
    setLoginValue({ ...loginValue, loader: true });
    const keyValue = {
      otp: code,
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(keyValue),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/verifyOtp`,
      requestKey
    );
    if (response.status >= 200 && response.status <= 399) {
      const data = await response.json();
      setLoginValue({ ...loginValue, loader: false });
      localStorage.setItem("reset_password_id", data?.data?.speaker?._id);
      // localStorage.setItem("reset_password_token", data?.data?.authToken);
      toast.warn(data.message);
      navigate("/login");
    }
    if (response.status >= 400 && response.status <= 500) {
      if(response.status===401){
        Auth.logout();
        navigate("/login");
      };
      const error = await response.json();
      toast.warn(error.message);
      setLoginValue({ ...loginValue, loader: false });
    }
  };

  // handle verify otp validation
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!code) {
      toast.warn("Please enter the OTP");
    } else if (code.length < 6) {
      toast.warn("Invalid otp");
    } else {
      verifiOtp();
    }
  };

  // Resend otp api
  const resendOtpApi = async () => {
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}${
        getRole === `speaker`
          ? `speaker/speakerResendEmailVerification`
          : `user/userResendEmailVerification`
      }`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if(res.status===401){
        Auth.logout();
        navigate("/login");
      };
      
      const error = await res.json();
      toast.warn(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify OTP</title>
      </Helmet>
      <div class="otp-pass-page">
        <section class="otp-pass-sec">
          <svg
            class="dotted-lines"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke-dasharray="7 7"
              ></path>
              <path
                id="Path_333"
                data-name="Path 333"
                d="M6357.633,297.626C6388.769,384.931,6448.143,521.5,6533,589c130.75,104,356,126,466,92s299.5-100.25,325-217-82.25-252.75-217-283-217,11-304,108c-26,36-75,134-7,273,84,111,184.5,148.75,361,153s249-52,392-164,37.75-186.75,102-284a702.612,702.612,0,0,1,72.049-91.355"
                transform="translate(-6358 -2)"
                fill="none"
                stroke="#edc967"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke-dasharray="7"
              ></path>
            </g>
          </svg>
          <div class="otp-pass-sec-inner container">
            <div class="sap-sm-heading sap-title-head">
              Verify OTP (One Time Password)
            </div>
            <div class="sap-card-head">
              <form onSubmit={(e) => handleVerifyOtp(e)}>
                <div class="form-group">
                  <div className="otp-head">
                    <OtpInput
                      value={code}
                      onChange={(code) => setCode(code)}
                      numInputs={6}
                      separator={<span style={{ width: "8px" }}></span>}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      className="otp-inner"
                    />
                  </div>
                </div>
                <div class="dual-btn">
                  <div class="sap-btn-light">
                    <button
                      type="submit"
                      {...(loginValue.loader && { disabled: true })}
                    >
                      {" "}
                      submit{" "}
                      <span className="btn-loader">
                        {loginValue.loader && <FaCircleNotch />}
                      </span>
                    </button>
                  </div>
                  <div className="otp_timer sap-btn-dark">
                    <OtpTimer
                      minutes={2}
                      seconds={59}
                      text="Time:"
                      ButtonText="Resend"
                      resend={() => resendOtpApi()}
                    />
                  </div>
                </div>
                <div className="sign-up-link">
                  Don't have an account?{" "}
                  <span
                    className="text-yellow"
                    onClick={() => navigate("/signup")}
                  >
                    Go to back!
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default VerifyOtp;
