import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import MyProfileSidebar from "./MyProfileSidebar";

const ReferralPartner = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

     // handle clipboard copy referral code 
  const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value=text; document.body.appendChild(textArea); textArea.focus();textArea.select(); try{document.execCommand('copy')}catch(err){console.error('Unable to copy to clipboard',err)}document.body.removeChild(textArea)};
  const handleReferralCodeClick = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.warn("Your unique referral code has been copied and is ready to use!");
    } else {
      unsecuredCopyToClipboard(content);
      toast.warn("Copy failed. Please try again");
    };
  };

  const [commonState, setCommonState] = useState({
    referralCode: "",
    referralLoaderGet: false,
    referralLoaderPost: false,
  });
  const [getCode,setGetCode] = useState("");
  const [getCodeApply,setGetCodeApply] = useState("");


  // Referral code post api
  const referralCodePost = async () => {
    setCommonState({ ...commonState, referralLoaderPost: true });
    const loginKeyValue = {
        friendReferralCode: commonState.referralCode,
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
      `${process.env.REACT_APP_BASE_URL}speaker/applyRefferalCode`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setCommonState({ ...commonState, referralLoaderPost: false });
      setCommonState({ ...commonState, referralCode: "" });
    };
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      toast.warn(error.message);
      setCommonState({ ...commonState, referralLoaderPost: false });
    };
  };

     // Referral code get api
     const referralCodeGet = async () => {
        setCommonState({ ...commonState, referralLoaderGet: true });
        const requestKey = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authToken: decrypt,
          },
        };
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}speaker/getRefferalCode`,
          requestKey
        );
        if (res.status >= 200 && res.status <= 399) {
          const data = await res.json();
          setGetCode(data?.data?.refferalCode);
          setGetCodeApply(data?.data?.ReferralCodeAppl);
          setCommonState({ ...commonState, referralLoaderGet: false });
        };
        if (res.status >= 400 && res.status <= 500) {
          const error = await res.json();
          if (res.status === 401) {
            Auth.logout();
            navigate("/login");
          };
          toast.warn(error.message);
          setCommonState({ ...commonState, referralLoaderGet: false });
        };
      };

  // handle referral code validation
  const handleReferralValidation = (e) => {
    e.preventDefault();
    if (!commonState.referralCode) {
      toast.warn("Enter your friend's unique code to claim your reward");
    } else {
      referralCodePost();
    };
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    referralCodeGet();
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      <Fragment>
        <Helmet>
          <title>Referral-Partner</title>
        </Helmet>
        <div className="my-profile-page">
          <MyProfileSidebar />
          <div className="mp-right-panel" id="mp-referral-partner">
            <div className="mp-form-heading">Referral Partner</div>
            <form className="row" action="">
              <div className="col-md-12 form-group set-refcode">
                <label htmlFor="" className="form-label">
                  Your referral code
                </label>
                <div>
                  {!getCode ? <span className="btn-loader">
                      <FaCircleNotch />
                  </span>:<span onClick={()=>handleReferralCodeClick(getCode)} className="set-reftext">{getCode}</span>}
                  </div>
              </div>
              
              {!getCodeApply ? <>
              <div className="col-md-12 form-group">
                <label htmlFor="" className="form-label">
                Referral code<sup className="text-red">*</sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter referral code..."
                  value={commonState.referralCode}
                  onChange={(e) =>
                    setCommonState({
                      ...commonState,
                      referralCode: e.target.value,
                    })
                  }
                />
              </div>
              
              <div className="divider"></div>
              <div className="sap-btn-light mt-4">
                <button
                  type="submit"
                  {...(commonState.referralLoaderPost && { disabled: true })}
                  onClick={(e) => handleReferralValidation(e)}
                >
                  Apply
                  <span className="btn-loader">
                    {commonState.referralLoaderPost && <FaCircleNotch />}
                  </span>
                </button>
              </div>
              </>:<span className="ref-error">It seems that a referral code has already been applied to your account</span>}
              <div>
                <div>
                  <div></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ReferralPartner;
