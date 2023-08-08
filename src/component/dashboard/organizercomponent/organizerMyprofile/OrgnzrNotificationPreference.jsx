import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import OrgnzrMyProfileSidebar from "./OrgnzrMyProfileSidebar";

const OrgnzrNotificationPreference = () => {
  const [gigFinderPlus, setGigFinderPlus] = useState("");
  const [buttonLoader,setButtonLoader] = useState(false)

  const viaGigfinderplus = ["no", "yes"];

   // Decryprt token
   const decrypt = Auth.token()
   ?.split("")
   ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
   .join("");
   const navigate = useNavigate();

    // Notification preference post api
    const notificationPreferenceApi = async () => {
      setButtonLoader(true);
      const loginKeyValue = {
        userNotification: gigFinderPlus,
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
        `${process.env.REACT_APP_BASE_URL}user/userNotification`,
        requestKey
      );
      if (res.status >= 200 && res.status <= 399) {
        const data = await res.json();
        toast.warn(data.message);
        setButtonLoader(false);
      };
      if (res.status >= 400 && res.status <= 500) {
        const error = await res.json();
        if (res.status === 401) {
          Auth.logout();
          navigate("/login");
        };
        toast.warn(error.message);
        setButtonLoader(false);
      };
    };

     // Notification preference get api
     const notificationPreferenceGetApi = async () => {
      const requestKey = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authToken: decrypt,
        },
      };
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/getUserNotification`,
        requestKey
      );
      if (res.status >= 200 && res.status <= 399) {
        const data = await res.json();
        setGigFinderPlus(data?.data?.userNotification)
      };
      if (res.status >= 400 && res.status <= 500) {
        const error = await res.json();
        if (res.status === 401) {
          Auth.logout();
          navigate("/login");
        };
        toast.warn(error.message);
      };
    };



  // handle speaker connect you gigfinder validation
  const handleSaveDataValidation = () => {
    if (!gigFinderPlus) {
      toast.warn("Please choose speakers reach out to you via GigFinderPlus?");
    } else {
      notificationPreferenceApi();
    };
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    notificationPreferenceGetApi();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Organizer-Notification-Preferences</title>
      </Helmet>
      <div className="my-profile-page">
        <OrgnzrMyProfileSidebar />
        <div className="mp-right-panel" id="mp-notification-preference">
          <div className="mp-form-heading">Notification Preferences</div>
          <form action="" className="row">
            <span className="form-caption text-grey first-form-caption">
              You can adjust your event alerts and emails from organizers under
              the Event invitations & Alerts tab.
            </span>
            <div className="col-md-12 form-group">
              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Can speakers contact you via gigfinderplus?
                </label>
                <div className="form-group">
                  {viaGigfinderplus.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gigFinderPlus"
                          value={data}
                          checked={gigFinderPlus === data}
                          onChange={(e) => setGigFinderPlus(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
                <span className="form-caption text-grey">
                  Registered speakers, event organizers and agencies can contact
                  you on your speaker page.
                </span>
              </div>
              <div className="sap-btn-light mt-4">
                <button
                  type="button"
                  {...(buttonLoader && { disabled: true })}
                  onClick={() => handleSaveDataValidation()}
                >
                  save data
                  <span className="btn-loader">
                  {buttonLoader&& <FaCircleNotch />}
                </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OrgnzrNotificationPreference;
