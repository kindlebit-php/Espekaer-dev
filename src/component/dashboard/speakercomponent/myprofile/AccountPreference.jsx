import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

import Auth from "../../../../auth/Auth";

import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const AccountPreference = () => {
  const navigate = useNavigate();
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [profileVisibility, setProfileVisibility] = useState();
  const [profileNewsLetter, setProfileNewsLetter] = useState("");
  const [profileLoginEmail, setProfileLoginEmail] = useState("");
  const [commonState, setCommonState] = useState({
    visibilityLoader: false,
    deleteAccountModal:false,
    deleteAccountModalLoader:false,
    pageLoader:false
  });
  const [otpModal, setOtpModal] = useState(false);
  const [code, setCode] = useState("");
  const [loginValue, setLoginValue] = useState({
    loader: false,
  });
  const getRole = localStorage.getItem("role");

    // Decryprt token
    const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");

  // visibility & notification post api
  const visibilityAndNotificationPost = async () => {
    setCommonState({ ...commonState, visibilityLoader: true });
    const loginKeyValue = {
      profileVisibility: profileVisibility,
      newsletters: profileNewsLetter,
      emailPrivate: profileLoginEmail,
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
    //
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerProfileVisibility`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      visibilityAndNotificationGet();
      toast.warn(data?.message);
      setCommonState({ ...commonState, visibilityLoader: false });
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      setCommonState({ ...commonState, visibilityLoader: false });
    };
  };

   // visibility & notification get api
   const visibilityAndNotificationGet = async () => {
    setCommonState({...commonState,pageLoader:true});
    const requestKey = {
      method: "GEt",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerProfileVisibility`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonState({...commonState,pageLoader:false});
      const data = await res.json();
      setProfileVisibility(data?.data?.profileVisibility);
      setProfileNewsLetter(data?.data?.newsletters);
      setProfileLoginEmail(data?.data?.emailPrivate ? data?.data?.emailPrivate:Auth.loginEmail()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join(""));
    };
    if (res.status >= 400 && res.status <= 500) {
      setCommonState({...commonState,pageLoader:false});
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
  };


  // handle manage profile
  const handleManageProfile = (e) => {
    e.preventDefault();
    if (!profileVisibility) {
      toast.warn("Choose the profile visibility option for your profile");
    } else if (!profileNewsLetter) {
      toast.warn("Choose the news letters option for your profile");
    } else if (!profileLoginEmail) {
      toast.warn("Email is required!");
    } else if (!emailRegex.test(profileLoginEmail)) {
      toast.warn("Invalid email!");
    } else {
      visibilityAndNotificationPost();
    }
  };

   // Verified otp api
  // const verifiOtp = async () => {
  //   setLoginValue({ ...loginValue, loader: true });
  //   const keyValue = {
  //     otp: code,
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
  //     `${process.env.REACT_APP_BASE_URL}speaker/verifyOtp`,
  //     requestKey
  //   );
  //   if (response.status >= 200 && response.status <= 399) {
  //     const data = await response.json();
  //     setLoginValue({ ...loginValue, loader: false });
  //     localStorage.setItem("reset_password_id", data?.data?.speaker?._id);
  //     // localStorage.setItem("reset_password_token", data?.data?.authToken);
  //     toast.warn(data.message);
  //     navigate("/login");
  //   }
  //   if (response.status >= 400 && response.status <= 500) {
  //     if (response.status === 401) {
  //       Auth.logout();
  //       navigate("/login");
  //     }
  //     const error = await response.json();
  //     toast.warn(error.message);
  //     setLoginValue({ ...loginValue, loader: false });
  //   }
  // };

  // const resendOtpApi = async () => {
  //   const requestOption = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       authToken: decrypt,
  //     },
  //   };
  //   const res = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}${
  //       getRole === `speaker`
  //         ? `speaker/speakerResendEmailVerification`
  //         : `user/userResendEmailVerification`
  //     }`,
  //     requestOption
  //   );
  //   if (res.status >= 200 && res.status <= 399) {
  //     const data = await res.json();
  //     toast.warn(data.message);
  //   }
  //   if (res.status >= 400 && res.status <= 500) {
  //     if (res.status === 401) {
  //       Auth.logout();
  //       navigate("/login");
  //     }

  //     const error = await res.json();
  //     toast.warn(error.message);
  //   }
  // };

  // handle verify otp validation

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!code) {
      toast.warn("Please enter the OTP");
    } else if (code.length < 6) {
      toast.warn("Invalid otp");
    } else {
      toast.warn("success");
      // verifiOtp();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
  });
  }, []);

  useEffect(()=>{
    visibilityAndNotificationGet();
    // eslint-disable-next-line
  },[]);

  return (
    <Fragment>
      {commonState.pageLoader && <Loader/>}
      <Helmet>
        <title>Account-Preferences</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-preferenceId">
        <div className="mp-form-heading">Account Preferences</div>
          <form action="" className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Visibility & Notifications
              </label>
              <div className="generate-panel">
                <div className="col-md-12 form-group-head">
                  <label htmlFor="" className="form-label">
                    PROFILE VISIBILITY
                  </label>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaultab"
                        id="flexRadioDefault1"
                        value={true}
                        checked={profileVisibility?.toString()==="true" ? true :false}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Published (visibility to everyone)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaultab"
                        id="flexRadioDefault2"
                        value={false}
                        checked={profileVisibility?.toString()==="false" ? true :false}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Private (only you and site administrators can see your
                        profile)
                      </label>
                    </div>
                  </div>
                  <span className="form-caption text-grey">
                    Make your profile visible to others by selecting
                    “Published”, or select “Private" if you wish to add more
                    information before publishing. Note: you can always go back
                    to the draft version later.
                  </span>
                </div>
                <div className="col-md-12 form-group-head">
                  <label htmlFor="" className="form-label">
                    MY SPEAKER PROFILE CAN BE FEATURED IN NEWSLETTERS OR OTHER
                    PUBLICATIONS
                  </label>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaulac"
                        id="flexRadioDefault3"
                        checked={profileNewsLetter?.toString()==="true" ? true :false}
                        value={true}
                        onChange={(e) => setProfileNewsLetter(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaulac"
                        id="flexRadioDefault4"
                        value={false}
                        checked={profileNewsLetter?.toString()==="false" ? true :false}
                        onChange={(e) => setProfileNewsLetter(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault4"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                E-mail
              </label>
              <div className="generate-panel">
                <div className="col-md-6 form-group">
                  <label htmlFor="" className="form-label">
                    E-MAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={profileLoginEmail}
                    onChange={(e) => setProfileLoginEmail(e.target.value)}
                    className="form-control"
                    placeholder="Your email"
                  />
                </div>
                <span className="form-caption text-grey">
                  A valid e-mail address. All e-mails from the system will be
                  sent to this address. The e-mail address is not made public
                  and will only be used if you wish to receive a new password or
                  wish to receive certain news or notifications by e-mail.
                </span>
              </div>
            </div>
            <div className="divider"></div>
            <div className="sap-btn-light mt-3">
              <button
                type="button"
                // {...(commonState.visibilityLoader && { disabled: true })}
                onClick={() => setOtpModal(true)}
              >
                Manage profile
                <span className="btn-loader">
                  {commonState.visibilityLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Delete account
              </label>
              <span className="form-caption text-grey">
                Delete your account using the link below. Warning: this action
                is irreversible.
              </span>
              <div className="sap-btn-dark mt-4">
                <button type="button" onClick={() => setCommonState({ ...commonState, deleteAccountModal: true })}>Delete my account</button>
              </div>
            </div>

            <div className="col-md-12 form-group term-condition-scroll">
              <label htmlFor="" className="form-label">
                Terms and Conditions of Use
              </label>
              <div className="generate-panel">
                <div className="term-condition-scroll-inner">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  saepe quod vitae tempore facilis numquam, aliquam repudiandae
                  rerum voluptates voluptas placeat amet assumenda voluptatibus
                  debitis quis exercitationem fugiat. Autem ab dolore iusto
                  reprehenderit molestiae ipsa nulla soluta delectus culpa,
                  consequatur mollitia cum explicabo nisi excepturi rerum
                  voluptates ratione tempora iste blanditiis voluptate
                  distinctio exercitationem. Tempora vero dolorum provident
                  autem aspernatur, dicta quo eveniet eos nam? Cupiditate quos
                  consequuntur rerum tenetur ad porro fugit. Eos consectetur
                  magnam natus mollitia odit. Sint aliquid corrupti, porro fugit
                  ad modi quae, iusto quos possimus deserunt veritatis illo
                  minus ipsam, officiis error sed delectus molestiae. Aut
                  quaerat quo officia amet minus esse enim magnam id voluptate
                  vitae exercitationem reiciendis voluptatem atque quisquam, a
                  hic inventore? Architecto similique earum ullam quae
                  temporibus dolores debitis quidem modi dignissimos! Asperiores
                  itaque ad in fugiat accusamus facere minima alias, amet dolor.
                  Eos unde necessitatibus possimus nobis reprehenderit quae,
                  asperiores in voluptate praesentium illo mollitia esse
                  corporis ea atque consectetur nostrum quos doloribus dolorem
                  est, neque perferendis. Fugiat odit recusandae distinctio
                  facilis, ad velit beatae error nesciunt quas sed repellendus
                  assumenda rem necessitatibus ipsam. Quisquam autem ducimus
                  asperiores doloremque reiciendis corporis ab vel numquam?
                  Temporibus ipsam, facere odit sunt accusamus assumenda nemo.
                  Beatae doloremque, explicabo voluptatibus animi fuga molestiae
                  vero perspiciatis aspernatur molestias nemo numquam ratione,
                  in dolore quibusdam! Rerum dolorum architecto laboriosam nisi
                  debitis impedit eaque obcaecati, quaerat aperiam.
                  Reprehenderit eveniet architecto sed vel. Repellendus nostrum
                  asperiores voluptate veritatis deserunt minima? Similique iste
                  impedit ratione doloribus molestiae? Rem animi optio hic eaque
                  sequi dolore facere iure dolorem laborum, possimus minima fuga
                  labore rerum ratione sunt tenetur, quibusdam reiciendis
                  exercitationem doloremque? Eum adipisci earum minima
                  voluptatum explicabo ad totam, sed nam, ea tempora illum
                  reprehenderit in fuga ab cupiditate recusandae rerum repellat
                  incidunt veritatis commodi molestiae similique. Nam, tempora
                  quo!
                </div>
                <div className="col-md-12 form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Accept Terms &amp; Conditions of Use
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Delete account modal */}
      <Modal
        show={commonState.deleteAccountModal}
        onHide={() => setCommonState({ ...commonState, deleteAccountModal: false })}
        id="delete-account-prm-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body><div className="pop-up-heading text-center"> This action will permanently delete your account. Are you sure you want to proceed?</div>
         </Modal.Body>
        <Modal.Footer>
        <div className="dual-btn">
            <div className="sap-btn-dark">
            <Button
            variant="cust"
            onClick={() => setCommonState({ ...commonState, deleteAccountModal: false })}
          >
            No
          </Button>
            </div>
            <div className="sap-btn-light">
            <Button
            {...(commonState.deleteAccountModalLoader && { disabled: true })}
            variant="cust"
            onClick={() => setCommonState({ ...commonState, deleteAccountModal: false })}
            // onClick={() => deleteBioGraphicsApi()}
          >
            Yes
            <span className="btn-loader">
              {commonState.deleteAccountModalLoader && <FaCircleNotch />}
            </span>
          </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Verify OTP Modal */}
      <Modal
        show={otpModal}
        onHide={() => setOtpModal(false)}
        id="verify-otp-pop"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <div className="modal-header-heading">
            Verify OTP (One Time Password)
          </div>
        </Modal.Header>
        <Modal.Body>
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
                          // resend={() => resendOtpApi()}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default AccountPreference;
