import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

import Auth from "../../../../auth/Auth";

import OrgnzrMyProfileSidebar from "./OrgnzrMyProfileSidebar";

const OrgnzrAccountPreference = () => {
  const navigate = useNavigate();
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  const [profileLoginEmail, setProfileLoginEmail] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [code, setCode] = useState("");
  const [loginValue, setLoginValue] = useState({
    loader: false,
  });
  const getRole = localStorage.getItem("role");

  const [commonState, setCommonState] = useState({
    visibilityLoader: false,
    deleteAccountModal: false,
    deleteAccountModalLoader: false,
  });

  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  // visibility & notification post api
  const visibilityAndNotificationPost = async () => {
    setCommonState({ ...commonState, visibilityLoader: true });
    const loginKeyValue = {
      userEmail: profileLoginEmail,
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
      `${process.env.REACT_APP_BASE_URL}user/userNotificationEmail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      visibilityAndNotificationGet();
      toast.warn(data?.message);
      setCommonState({ ...commonState, visibilityLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonState({ ...commonState, visibilityLoader: false });
    }
  };

  // visibility & notification get api
  const visibilityAndNotificationGet = async () => {
    const requestKey = {
      method: "GEt",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/getUserNotificationEmail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setProfileLoginEmail(data?.data?.userEmail);
      // setProfileVisibility(data?.data?.profileVisibility);
      // setProfileNewsLetter(data?.data?.newsletters);
      // setProfileLoginEmail(data?.data?.emailPrivate ? data?.data?.emailPrivate:Auth.loginEmail()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join(""));
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
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
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    visibilityAndNotificationGet();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Organizer-Account-Preferences</title>
      </Helmet>
      <div className="my-profile-page">
        <OrgnzrMyProfileSidebar />
        <div className="mp-right-panel" id="mp-preferenceId">
          <div className="mp-form-heading">Account Preferences</div>
          <form action="" className="row">
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                E-mail
              </label>
              <div className="generate-panel">
                <div className="col-md-6 form-group">
                  <label htmlFor="" className="form-label">
                    E-MAIL ADDRESS<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="email"
                    value={profileLoginEmail}
                    onChange={(e) => setProfileLoginEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter your email..."
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
                {...(commonState.visibilityLoader && { disabled: true })}
                onClick={() => setOtpModal(true)}
              >
                Save email
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
                <button
                  type="button"
                  onClick={() =>
                    setCommonState({ ...commonState, deleteAccountModal: true })
                  }
                >
                  Delete my account
                </button>
              </div>
            </div>

            <div className="col-md-12 form-group term-condition-scroll">
              <label htmlFor="" className="form-label">
                Terms and Conditions of Use
              </label>
              <div className="generate-panel">
                <div className="term-condition-scroll-inner">
                  Welcome to www.speakerhub.com (the “Site”). We are a fast
                  growing community of professionals, independent, and amateur
                  public speakers and trainers. Through this Site, you may
                  register as a Speaker, Trainer, Webinar Host, Moderator or
                  Speaker Bureau or Agency or browse our speakers and schedule a
                  Speaker, Trainer, Webinar Host, Moderator or Speaker Bureau or
                  Agency for your event (collectively, the foregoing is referred
                  to in this Agreement as the “Services” and the term “Speaker”
                  collectively includes Trainers, Moderators, Webinar Hosts, Pro
                  Bono or Volunteer Speakers, Speaker Bureaus and Agencies, and
                  similar performances or performers). Your use of the Site and
                  the Services are subject to the terms of a legal agreement
                  between you and SpeakerHub (“Company” or “we” or “us”,
                  registered at 13-14 Madách Imre út. Budapest, H-1075 Hungary),
                  the owner of the Site. These “Terms of Use” (the “Agreement”)
                  contain the terms of that legal agreement. The terms “you” or
                  “your” refer to the individual accessing the Site and/or using
                  the Services as well as the entity or business that the
                  individual is representing. To use the Services, you must
                  first agree to the terms of this Agreement. You acknowledge
                  your acceptance of this Agreement, our Privacy Policy and any
                  other terms posted on the Site by: i) clicking to accept or
                  agree, where this option is made available to you; or ii) by
                  actually signing up for and/or using the Services. PLEASE READ
                  THIS DOCUMENT CAREFULLY! IT CONTAINS VERY IMPORTANT
                  INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, AS WELL AS
                  LIMITATIONS AND EXCLUSIONS THAT MAY APPLY TO YOU. IF YOU DO
                  NOT AGREE WITH THESE TERMS, DO NOT USE THE SERVICES. We
                  reserve the right to amend this Agreement at any time as
                  provided in this Agreement. You may reject the changes by
                  simply not using the Services or terminating your account, if
                  applicable. Should you have any questions or concerns about
                  this Agreement or would like to simply better understand how
                  Company does things, please do not hesitate to contact us. If
                  you do not agree with some or all of the provisions of this
                  Agreement, do not use the Services. 1. Your Use of the Site
                  and the Services 1.1 You may be required to subscribe and/or
                  log in to use the Services. Through the subscription and log
                  in process, you will be asked to provide information about
                  yourself (such as name, address, email address and other
                  contact details) as well as other basic information about your
                  business and the name under which you do business. You agree
                  that all information provided is done so at your own
                  discretion and that you are not obligated to use the Services
                  or provide any particular piece of information. You agree,
                  however, that any information you give to us will always be
                  accurate, correct and up to date. Company may reject any
                  potential subscription for any reason at Company”™s sole
                  discretion. 1.2 You represent that you are of legal age to
                  form a binding contract. You must be at least 18 years old to
                  be eligible to subscribe. You also represent and warrant that
                  you are authorized to act on behalf of the business that you
                  are representing in subscribing to the Services. This
                  includes, without limitation, having the authority to
                  authorize the method of payment and charges incurred to
                  participate in the Services. 1.3 Certain topics and businesses
                  are not eligible to participate in the Services. These include
                  businesses and topics that discuss the following types of
                  transactions: Tobacco, e-cigarette sales, or related items
                  Weapons and munitions Sexually-oriented or pornographic
                  products or services Marijuana dispensaries and related
                  businesses such as “head” shops Door-to-door sales Age
                  restricted products or services Bail Bonds Bankruptcy lawyers
                  Check cashing, wire transfers or money orders Counterfeit
                  products Firms selling business opportunities, investment
                  opportunities, mortgage consulting or reduction, credit
                  counselling, repair or protection, or real estate purchases
                  with no money down Gambling Illegal products or services as
                  per the laws of any member state of the European Union, USA or
                  the jurisdiction where You are resident or where you provide
                  your services in Multi-level marketing or pyramid schemes
                  Timeshares Any product or service that infringes upon the
                  copyright, trademark, or trade secrets of a third party 2.
                  Your Obligations 2.1 You agree to use the Services only for
                  purposes that are permitted by (a) this Agreement; and (b) any
                  applicable law, regulation or generally accepted practices or
                  guidelines in the relevant jurisdiction. 2.2 You agree not to
                  access (or attempt to access) any of the Services by any means
                  other than through the web site or our applications and, if
                  required, through logging in with your user name and password
                  as intended through your use of the Services. You specifically
                  agree not to access (or attempt to access) any of the Services
                  through any automated means (including but not limited to use
                  of scripts or web crawlers). 2.3 You agree that you will not
                  engage in any activity that interferes with or disrupts the
                  Services (or the servers and networks which may be connected
                  to the Services). 2.4 You agree that you will not reproduce,
                  duplicate, copy, sell, trade or resell the Services or any
                  portion thereof. 2.5 You agree that you are solely responsible
                  for (and that we have no responsibility to you or to any third
                  party for) any breach of your obligations under these Terms
                  and for the consequences (including any loss or damage which
                  we may suffer) of any such breach. 3. Your Password and
                  Account Security. 3.1 You agree and understand that you are
                  responsible for maintaining the confidentiality of your login
                  ID and any passwords associated with any account you use to
                  access the Services. Accordingly, you agree that you will be
                  solely responsible for all activities that occur under your
                  account. You must receive permission from the owner of the
                  account to log in to the Services using another person’s
                  account. You can change your password at any time. 3.2 If you
                  become aware of any unauthorized use of your password or of
                  your account, you agree to change your password to prevent
                  further unauthorized access, and notify us immediately. 3.3
                  THE UNAUTHORIZED USE OF YOUR ACCOUNT COULD CAUSE YOU TO INCUR
                  LIABILITY TO US AND/OR THIRD PARTIES. NEITHER US NOR ANY OF
                  OUR OWNERS, EMPLOYEES, AGENTS OR AFFILIATES WILL HAVE ANY
                  LIABILITY TO YOU FOR ANY UNAUTHORIZED TRANSACTION MADE USING
                  YOUR PASSWORD THAT OCCURS BEFORE YOU HAVE NOTIFIED US OF THE
                  UNAUTHORIZED USE OF YOUR PASSWORD AND WE HAVE HAD A REASONABLE
                  OPPORTUNITY TO ACT ON THAT NOTICE. 3.4 We may, without notice,
                  suspend or cancel your account at any time and for any reason
                  including without limitation, if we believe, in our sole
                  discretion, that your password is being used without your
                  authorization or otherwise in a fraudulent manner. 4. Content
                  4.1 You understand that all information (such as data files,
                  written text, computer software, music, audio files or other
                  sounds, photographs, videos or other images) which you may
                  have access to as part of, or through your use of, the
                  Services are the sole responsibility of the person from which
                  such content originated. All such information is referred to
                  herein as the “Content” and includes, but is not limited to,
                  Content that you Post to your speaker profile or through our
                  message boards, blogs or other messaging/communication system.
                  "Post", “Posted” or “Posting” means to upload, post, transmit,
                  share, store, link to or otherwise make available on or
                  through the Services. 4.2 You should be aware that some
                  Content presented to you may be protected by intellectual
                  property rights which are owned by those who provide that
                  Content (or by other persons or companies on their behalf).
                  You may not modify, rent, lease, loan, sell, distribute or
                  create derivative works based on Content (either in whole or
                  in part) that you do not own or have permission to use and/or
                  modify. Additionally, Content you Post could be seen by the
                  general public. You should not Post any information that you
                  do not want the general public to know including, without
                  limitation, personally identifiable information. 4.3 We
                  reserve the right (but shall have no obligation) to
                  pre-screen, review, flag, filter, modify, refuse or remove any
                  or all Content from any Service. 4.4 You understand that by
                  using the Services you may be exposed to Content that you may
                  find offensive, indecent or objectionable and that, in this
                  respect, you use the Services at your own risk. We may remove
                  or edit any Content at any time and for any reason and/or ban
                  users from the Site at any time and for any reason. 4.5 You
                  agree that you are solely responsible for (and that we have no
                  responsibility to you or to any third party for) any Content
                  that you Post while using the Services and for the
                  consequences of your actions (including any loss or damage
                  which we may suffer) by doing so. 4.6 When i) using the
                  Services as a speaker; or ii) using the Services as an
                  individual or entity looking for the services of a speaker or
                  contacting a speaker; or iii) using the forum, bulletin
                  boards, messaging system or other method of communication; or
                  iv) using the Site and/or Services in any other way; you
                  represent and warrant that you will not: Discriminate against,
                  defame, abuse, harass, sexually harass or threaten others SPAM
                  other members by sending them commercial messages unrelated to
                  the services the Speaker offers Knowingly Post fraudulent
                  material, stories or misrepresent yourself in any way Make any
                  bigoted, hateful, or racially or sexually offensive statements
                  Advocate illegal activity or discuss illegal activities with
                  the intent to commit them Post, link to or distribute any
                  material that infringes and/or violates any right of a third
                  party or any law Post, link to, discuss or distribute any
                  sexually explicit, pornographic, vulgar, obscene,
                  discourteous, or indecent language or images Post, link to or
                  distribute any software or other materials that contain a
                  virus or other harmful component Post or distribute material
                  that exploits children Post Content that is copyrighted and
                  claim it as your own Post any Content that you do not own or
                  have the right to Post Register for more than one user account
                  without our written permission Register for a user account
                  that is not in your name Impersonate any person or entity, or
                  falsify or otherwise misrepresent yourself or your affiliation
                  with any person or entity Post Content that is considered to
                  be extremist such as pseudo-science or conspiracy theories 4.7
                  We are not responsible for the content or accuracy of any
                  information Posted by users, and shall not be responsible for
                  any transactions, whether paid or unpaid, made based on such
                  information. 4.8 All illegal activities will be reported to
                  appropriate authorities and will result in termination of your
                  account. 4.9 Speakers are responsible for Posting their own
                  Content. In addition to the other obligations in this
                  Agreement, as a speaker, you agree that all Content that you
                  post is truthful. You may not Post anything to create an
                  impression that you know is incorrect, misleading, or
                  deceptive. All Content you post must comply with all
                  applicable laws rules and regulations and be owned by you or
                  you have the right to Post it. 4.10 You represent and warrant
                  that you have the full legal right and title, or otherwise
                  have all rights necessary, to all Content that you Post. You
                  hereby grant to Company a worldwide, perpetual, fully paid
                  license, to use all Content provided by you for the purposes
                  of hosting such Content as part of the Services. 4.11 You may
                  not distribute, transmit, copy, download or otherwise make
                  available any Content or other material from the Site,
                  including any text, sound or images, for public or commercial
                  or any other use, without the prior written permission of the
                  Company. You also may not distribute, transmit, display,
                  perform, reproduce, publish, license, modify, rewrite, create
                  derivative works from, transfer or sell any Content or other
                  material contained on the Site without our prior written
                  permission. 5. Speakers and Users Hiring Speakers 5.1 You
                  specifically acknowledge and agree that Company is only a
                  conduit that allows for individuals and businesses to browse
                  and hire Speakers for their events. Company takes no
                  responsibility and assumes no liability for any actions,
                  non-actions, speeches or content attributable to the speaker.
                  AS A SPEAKER, YOU AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR
                  THE CONTENT OF AND PERFORMANCE OF YOUR SPEECH. AS A SPEAKER OR
                  AS A USER HIRING A SPEAKER, YOU AGREE THAT COMPANY HAS NO
                  LIABILITY OR OBLIGATION TO YOU REGARDING THE QUALITY OF A
                  SPEAKERS SPEECH OR THE PERFORMANCE OR NON-PERFORMANCE OF A
                  SPEECH. Users and speakers will work directly together
                  regarding any disputes, issues or disagreements related to the
                  Services. Company is not responsible, and has no obligation,
                  to mediate or otherwise intercede in any such disagreement.
                  Company may, but is not obligated to, forward to you any
                  complaints or concerns it receives. 6. Company Services 6.1
                  The Services are designed to help Speakers, and individuals or
                  businesses looking to hire Speakers, connect. To that end,
                  Company provides online software (“Software”) to enable you to
                  use the Service. The Software may provide a variety of ways to
                  help Speakers and interested users connect. It is your
                  responsibility to use the Software in compliance with these
                  Agreement. 6.2 Company hereby grants you a limited, restricted
                  license to use the Software solely in connection with the
                  Services. You may not use the Software for any other purpose.
                  You may not: (i) modify, disassemble, decompile or reverse
                  engineer the Software; (ii) rent, lease, loan, resell,
                  sublicense, distribute or otherwise transfer or allow access
                  to the Software to any third party or use the Software for the
                  benefit of or to provide similar services for any third party;
                  (iii) make any copies of the Software; or (v) delete the
                  copyright and other proprietary rights or notices on the
                  Software. 6.3 Company makes no representations that the
                  Service is appropriate or available for use in all locations.
                  Those who access or use the Service do so at their own
                  volition and are entirely responsible for compliance with all
                  applicable laws and regulations, including, but not limited
                  to, privacy and export and import regulations. 7. Termination
                  and Suspension 7.1 Either party can terminate this Agreement
                  at any time and for any reason including its own convenience.
                  Termination does not relieve you of your obligations as
                  defined in this Agreement. You may also choose to suspend your
                  account by making it “hidden” from the public, without
                  terminating the Agreement altogether. For accounts that are
                  suspended for a continuous period of 6 months, however,
                  Company may choose, at its sole discretion, to terminate the
                  Agreement and proceed as per Section 7.2 below. 7.2 Upon
                  termination for any reason, Company may, but is not obligated
                  to, delete all of your information and the Content you Posted.
                  Company shall not be liable to you for compensation,
                  reimbursement, or damages in connection with your use of the
                  Service, or any termination or suspension of the Service or
                  deletion of your information or other Content. You will lose
                  access to your account upon termination and any data or other
                  Content may not be able to be recovered once your account is
                  terminated and the Content and/or other data is deleted.
                  Re-subscribing at a later date will NOT result in the Content
                  and/or data being restored. 7.3 There is no refund for
                  terminations or portion of unused periods of time previously
                  paid for unless Company terminates your account for reasons
                  other than as set forth below in Section 7.4. 7.4 Company may
                  terminate or restrict your use of the Service, without any
                  refund or other compensation or notice if you are, or if
                  Company suspects that you are: (i) in violation of any term of
                  this Agreement, especially, but not limited to, Sections 1.3
                  and 4.6 of this Agreement; or (ii) engaged in illegal or
                  improper use of the Service. 7.5 Other than as stated herein
                  and on the Service’s pricing page, PAYMENTS ARE NONREFUNDABLE.
                  Refunds may nevertheless be granted at the sole discretion of
                  the Company. 8. Packages & Pricing 8.1 Information regarding
                  the different subscription packages that may be available are
                  posted on the Company website. Subscription offerings and
                  pricing is subject to change at any time at Company’s
                  discretion. Taxes, as required by law, are in addition to all
                  prices listed, unless otherwise indicated on the website. 8.2
                  Company may add new features for additional fees, or amend the
                  fees for existing Services, at any time at its sole
                  discretion. 8.3 Company may offer you free upgrades to its
                  premium packages for a limited period of time (e.g. 1 month, 6
                  months or 1 year) as part of its launch strategy or marketing
                  campaigns. Company will inform you before the expiry of such
                  upgrade period about downgrading the account or the
                  possibility to keep the premium package for payment as
                  indicated on the website. Company shall not be liable to keep
                  the free premium package beyond the period offered in the
                  promotional campaign. 8.4 You represent and warrant that you
                  are the rightful owner of, or are authorized to use, the
                  credit card utilized in connection with any transaction and
                  you authorize Company to charge the credit card for all
                  Services. Company does not keep credit card information on
                  Company’s servers. Company uses or may use PayPal, Stripe or
                  Realex for credit card processing. Their terms and conditions
                  are located at the above links. Company declines all
                  responsibility related to credit card processing and data as
                  that is the sole responsibility of the above providers as per
                  their own terms and conditions. 8.5 Company will provide a
                  seven (7) business day grace period to bring your account up
                  to date if payments fail or are rejected before suspending
                  your account or making it hidden from the public. 9.
                  Disclaimer COMPANY SHALL NOT BE LIABLE TO YOU OR TO ANY THIRD
                  PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL
                  DAMAGES ARISING OUT OF THE SERVICES UNDER THIS AGREEMENT
                  INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOST PROFITS, LOST
                  SAVINGS, OR LOST DATA, OR FOR ANY DAMAGE RELATED TO THE USE
                  OF, OR INABILITY TO USE, THE WEB SITE OR THE SERVICES EVEN IF
                  COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF ANY SUCH
                  DAMAGES. COMPANY’S TOTAL AGGREGATE LIABILITY UNDER THIS
                  AGREEMENT FOR ANY AND ALL CLAIMS SHALL BE FOR THOSE DIRECT
                  DAMAGES SUFFERED BY YOU AND SOLELY DUE TO COMPANY’S
                  PERFORMANCE UNDER THIS AGREEMENT AND SHALL NOT EXCEED THE
                  AMOUNTS ACTUALLY PAID BY YOU TO COMPANY FOR THE SERVICES
                  DIRECTLY RELATED TO THE DAMAGES SUFFERED. NO ACTION,
                  REGARDLESS OF FORM, ARISING OUT OF THIS AGREEMENT, MAY BE
                  BROUGHT BY YOU MORE THAN ONE (1) YEAR AFTER THE CAUSE OF
                  ACTION HAS ACCRUED. Some jurisdictions do not allow the
                  exclusion of certain warranties or the exclusion or limitation
                  of liability for consequential or incidental damages, so the
                  limitations in this Agreement may not apply to you. 10.
                  Warranty THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS
                  AVAILABLE" BASIS. WITHOUT LIMITING THE FOREGOING, COMPANY, ITS
                  PARTNERS AND LICENSORS, DISCLAIM ANY WARRANTIES, WHETHER
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                  NON-INFRINGEMENT. WE DO NOT WARRANT: I) THAT THE CONTENT
                  (WHETHER POSTED OR STATED BY US, SPEAKER OR ANYONE ELSE) IS
                  ACCURATE, RELIABLE OR CORRECT; or II) THAT THE SITE, SERVICES
                  OR SPEAKERS WILL MEET YOUR REQUIREMENTS; or III) THAT THE SITE
                  WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION,
                  UNINTERRUPTED OR SECURE; or IV) THAT ANY DEFECTS OR ERRORS
                  WILL BE CORRECTED; or V) THAT THE SITE OR SERVICES ARE FREE OF
                  VIRUSES OR OTHER HARMFUL COMPONENTS. ANY CONTENT DOWNLOADED OR
                  OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS
                  DOWNLOADED AT YOUR OWN RISK AND YOU WILL BE SOLELY RESPONSIBLE
                  FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT
                  RESULTS FROM SUCH DOWNLOAD. 11. Indemnity You agree to defend,
                  indemnify and hold harmless Company and its subsidiaries,
                  agents, managers, partners (including, without limitation, its
                  wireless carrier partners), and other affiliated companies,
                  and their employees, contractors, agents, investors, officers
                  and directors, from and against any and all claims, damages,
                  obligations, losses, liabilities, costs or debt, and expenses
                  (including but not limited to attorney's fees). This indemnity
                  clause does not apply until any and all claims, damages,
                  obligations, losses, liabilities, costs or debt, and expenses
                  (including but not limited to attorney's fees) are proven in a
                  court of law. 12. Confidentiality/Publicity 12.1 You agree to
                  allow Company to list your business as a Speaker or Speaker
                  Bureau or Agency or Organizer, including, but not limited to,
                  listing your name, photo and/or the name of your business,
                  and/or any other information you made publicly available on
                  your Speaker profile, to be displayed on Company’s web site,
                  and/or if your Speaker profile is associated with an
                  organization that uses the Company's White-Label Service, on
                  the White-Label partner's website, unless you opt out by
                  sending an email request to that effect. Unless you opt out
                  via your Speaker profile's settings or by an email request,
                  Company can use the above content in its advertising material
                  and promotional messages through its partners and 3rd parties.
                  12.2 If You are given or otherwise have access to consumers
                  names, IP address, email address and/or other contact
                  information, you agree to keep such information confidential
                  and to not use the name, email address or other contact
                  information for any purpose other than that contemplated by
                  this Agreement. You agree to abide by all laws including, but
                  not limited to, all privacy laws. 13. Relationship of the
                  Parties The relationship of the parties is that of an
                  independent contractor. This Agreement does not create a joint
                  venture or partnership between speakers or users and Company,
                  and each will act independently of the other. Neither you nor
                  Company is empowered to bind or commit the other to any other
                  contract or other obligation. You and Company agree that there
                  are no third party beneficiaries to this Agreement. 14.
                  Assignment This Agreement, and any rights and licenses granted
                  hereunder, may not be transferred or assigned by you without
                  the written permission of Company. Company is free to assign
                  this Agreement to any third party. 15. Governing Law; Consent
                  to Jurisdiction Unless otherwise agreed to in writing by both
                  You and the Company: (a) this Agreement shall be governed by
                  and construed in accordance with the laws of Belgium and (b)
                  the parties submit to the exclusive jurisdiction of the courts
                  in Brussels, Belgium with respect to any matter arising out of
                  or relating to this Agreement. In the event a dispute arises
                  between the parties which they have been unable to resolve
                  among themselves, the Parties agree to participate in a
                  mediation. If you are based in the US or your business is
                  governed by US law, the mediation will be conducted in
                  accordance with the mediation procedures of the American
                  Arbitration Association’s International Centre for Dispute
                  Resolution (“ICDR”). The parties agree to share the costs of
                  such mediation. If mediation fails to resolve the dispute, the
                  parties agree that the dispute may be submitted to final
                  arbitration upon written request of one Party served on the
                  other. Judgment on the arbitrator's award may be entered by
                  any court of competent jurisdiction. You agree that regardless
                  of any statute or law to the contrary, any claim or cause of
                  action arising out of or related to Your use of the Services
                  or this Agreement must be filed within one (1) year after such
                  claim or cause of action arose or be forever barred. 16.
                  Miscellaneous Terms 16.1 Severability. If and to the extent
                  that any provision of this Agreement is held illegal, invalid,
                  or unenforceable in whole or in part under applicable law,
                  such provision or such portion thereof shall be ineffective as
                  to the jurisdiction in which it is illegal, invalid, or
                  unenforceable to the extent of its illegality, invalidity, or
                  unenforceability, and, if possible, shall be deemed modified
                  to the extent necessary to conform to applicable law so as to
                  give the maximum effect to the intent of the parties. The
                  illegality, invalidity, or unenforceability of such provision
                  in that jurisdiction shall not in any way affect the legality,
                  validity, or enforceability of any other provision of this
                  Agreement in that or any other jurisdiction. 16.2 Section
                  Headings. The section headings and numbering of this Agreement
                  are for convenience of reference only, and shall not define or
                  limit any of the terms or provisions hereof. 16.3 No Waiver.
                  No failure or delay by Company in exercising any right, power
                  or privilege hereunder shall operate as a waiver thereof, and
                  no single or partial exercise thereof by Company shall
                  preclude any other or further exercise thereof or the exercise
                  of any right, power or privilege hereunder. 16.4 Entire
                  Agreement. This Agreement contains the entire agreement and
                  understanding between the parties and merges and supersedes
                  all representations and discussions between the parties.
                </div>
                <div className="col-md-12 form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
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
        onHide={() =>
          setCommonState({ ...commonState, deleteAccountModal: false })
        }
        id="delete-account-prm-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            {" "}
            This action will permanently delete your account. Are you sure you
            want to proceed?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonState({ ...commonState, deleteAccountModal: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonState.deleteAccountModalLoader && {
                  disabled: true,
                })}
                variant="cust"
                onClick={() =>
                  setCommonState({ ...commonState, deleteAccountModal: false })
                }
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

export default OrgnzrAccountPreference;
