import React, { Fragment, useEffect, useState } from "react";

import { Helmet } from "react-helmet";


const AboutUs = () => {

  const [getAboutData, setGetAboutData] = useState("");

  // Get about data api
  const aboutApi = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}home/getAboutUs`);
    const data = await res.json();
    setGetAboutData(data?.data);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    aboutApi();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>About us</title>
      </Helmet>
      <div className="aboutus-page">
        <section className="hero-sec hero-sec-cloned-aboutus">
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
              />
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
              />
            </g>
          </svg>

          {getAboutData &&
            getAboutData?.map((about, index) => {
              const {description,image} = about;
              return (
                <div className="hero-sec-inner container" key={index}>
                  <div className="hero-left">
                    <div className="sap-sm-heading">About Us</div>
                    <div className="text-para">
                      {description}
                    </div>
                  </div>
                  <div className="hero-right">
                    <div className="hero-ban">
                      <img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} alt="api_image" />
                    </div>
                    <img
                      src="assets/image/logo-light.png"
                      alt=""
                      className="floating-logo"
                    />
                  </div>
                </div>
              );
            })}
        </section>

        <section
          className="wmud-sec grey-back"
          id="wmud-sec-cloned-emp-speaker"
        >
          <div className="wmud-sec-inner container">
            <div className="sap-sm-heading">Empowering Speakers</div>
            <div className="wmud-list">
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="34.997"
                    viewBox="0 0 45 34.997"
                  >
                    <path
                      id="Path_349"
                      data-name="Path 349"
                      d="M22.521,35.75A18.286,18.286,0,0,0,10.03,41.038,27.813,27.813,0,0,0,3.882,49.5a27.9,27.9,0,0,0,6.14,8.46,18.32,18.32,0,0,0,12.5,5.289,18.286,18.286,0,0,0,12.491-5.289A27.814,27.814,0,0,0,41.16,49.5a27.9,27.9,0,0,0-6.14-8.46A18.32,18.32,0,0,0,22.521,35.75ZM7.476,38.3A21.982,21.982,0,0,1,22.521,32a21.982,21.982,0,0,1,15.046,6.3,31.187,31.187,0,0,1,7.265,10.241,2.484,2.484,0,0,1,0,1.922A31.108,31.108,0,0,1,37.567,60.7,21.982,21.982,0,0,1,22.521,67,21.982,21.982,0,0,1,7.476,60.7,30.952,30.952,0,0,1,.218,50.459a2.484,2.484,0,0,1,0-1.922A30.952,30.952,0,0,1,7.476,38.3ZM22.521,55.748a6.249,6.249,0,0,0,0-12.5h-.156a5.073,5.073,0,0,1,.156,1.25,5,5,0,0,1-5,5,5.073,5.073,0,0,1-1.25-.156V49.5A6.248,6.248,0,0,0,22.521,55.748Zm0-16.249a10,10,0,1,1-10,10A10,10,0,0,1,22.521,39.5Z"
                      transform="translate(-0.025 -32)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Increasing visibility
                  <br />
                  through speaker profiles
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                  >
                    <path
                      id="Path_350"
                      data-name="Path 350"
                      d="M22.5,0a2.809,2.809,0,0,1,2.813,2.813v.914A18.992,18.992,0,0,1,41.273,19.688h.914a2.813,2.813,0,0,1,0,5.625h-.914A18.992,18.992,0,0,1,25.313,41.273v.914a2.813,2.813,0,0,1-5.625,0v-.914A18.982,18.982,0,0,1,3.727,25.313H2.813a2.813,2.813,0,0,1,0-5.625h.914A18.982,18.982,0,0,1,19.688,3.727V2.813A2.809,2.809,0,0,1,22.5,0ZM9.439,25.313A13.379,13.379,0,0,0,19.688,35.561V33.75a2.813,2.813,0,0,1,5.625,0v1.811A13.379,13.379,0,0,0,35.561,25.313H33.75a2.813,2.813,0,0,1,0-5.625h1.811A13.366,13.366,0,0,0,25.313,9.439V11.25a2.813,2.813,0,0,1-5.625,0V9.439A13.366,13.366,0,0,0,9.439,19.688H11.25a2.813,2.813,0,0,1,0,5.625ZM22.5,19.688A2.813,2.813,0,1,1,19.688,22.5,2.813,2.813,0,0,1,22.5,19.688Z"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Creating opportunities
                  <br />
                  for speakers
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="35"
                    viewBox="0 0 45 35"
                  >
                    <path
                      id="Path_351"
                      data-name="Path 351"
                      d="M7.5,32a5,5,0,0,0-5,5V59.5h5V37h30V59.5h5V37a5,5,0,0,0-5-5Zm10,27.5V62H2.5a2.5,2.5,0,0,0,0,5h40a2.5,2.5,0,0,0,0-5h-10V59.5A2.5,2.5,0,0,0,30,57H20A2.5,2.5,0,0,0,17.5,59.5Z"
                      transform="translate(0 -32)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Providing learning
                  <br />
                  opportunities
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                  >
                    <path
                      id="Path_352"
                      data-name="Path 352"
                      d="M22.5,4.219A18.278,18.278,0,0,0,4.219,22.5v3.516a2.109,2.109,0,0,1-4.219,0V22.5a22.5,22.5,0,0,1,45,0V35.165A7.736,7.736,0,0,1,37.257,42.9l-9.694-.009A4.225,4.225,0,0,1,23.906,45H21.094a4.219,4.219,0,0,1,0-8.437h2.813a4.225,4.225,0,0,1,3.656,2.109l9.7.009a3.515,3.515,0,0,0,3.516-3.516V22.5A18.278,18.278,0,0,0,22.5,4.219ZM12.656,18.281h1.406a2.809,2.809,0,0,1,2.813,2.813v9.844a2.809,2.809,0,0,1-2.812,2.813H12.656a5.63,5.63,0,0,1-5.625-5.625V23.906A5.63,5.63,0,0,1,12.656,18.281Zm19.688,0a5.63,5.63,0,0,1,5.625,5.625v4.219a5.63,5.63,0,0,1-5.625,5.625H30.938a2.809,2.809,0,0,1-2.812-2.812V21.094a2.809,2.809,0,0,1,2.813-2.812Z"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Giving first-className
                  <br />
                  support
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wmud-sec" id="wmud-sec-cloned-connect-speaker">
          <div className="wmud-sec-inner container">
            <div className="sap-sm-heading">
              Connecting Speakers With Event Organizers
            </div>
            <div className="wmud-list">
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="36"
                    viewBox="0 0 45 36"
                  >
                    <path
                      id="Path_357"
                      data-name="Path 357"
                      d="M18,4.5h9V9H18ZM16.875,0A3.376,3.376,0,0,0,13.5,3.375v6.75A3.376,3.376,0,0,0,16.875,13.5H20.25v2.25h-18a2.25,2.25,0,0,0,0,4.5H9V22.5H5.625A3.376,3.376,0,0,0,2.25,25.875v6.75A3.376,3.376,0,0,0,5.625,36h11.25a3.376,3.376,0,0,0,3.375-3.375v-6.75A3.376,3.376,0,0,0,16.875,22.5H13.5V20.25h18V22.5H28.125a3.376,3.376,0,0,0-3.375,3.375v6.75A3.376,3.376,0,0,0,28.125,36h11.25a3.376,3.376,0,0,0,3.375-3.375v-6.75A3.376,3.376,0,0,0,39.375,22.5H36V20.25h6.75a2.25,2.25,0,0,0,0-4.5h-18V13.5h3.375A3.376,3.376,0,0,0,31.5,10.125V3.375A3.376,3.376,0,0,0,28.125,0ZM6.75,31.5V27h9v4.5ZM29.25,27h9v4.5h-9Z"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Event planners can connect
                  <br />
                  with speakers directly
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="33.75"
                    viewBox="0 0 45 33.75"
                  >
                    <path
                      id="Path_358"
                      data-name="Path 358"
                      d="M5.625,68.219a1.41,1.41,0,0,0-1.406,1.406v1.942L19.38,84.013a4.916,4.916,0,0,0,6.249,0L40.781,71.567V69.625a1.41,1.41,0,0,0-1.406-1.406ZM4.219,77.025v15.1a1.41,1.41,0,0,0,1.406,1.406h33.75a1.41,1.41,0,0,0,1.406-1.406v-15.1L28.3,87.273a9.141,9.141,0,0,1-11.6,0ZM0,69.625A5.63,5.63,0,0,1,5.625,64h33.75A5.63,5.63,0,0,1,45,69.625v22.5a5.63,5.63,0,0,1-5.625,5.625H5.625A5.63,5.63,0,0,1,0,92.125Z"
                      transform="translate(0 -64)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Offering personalized
                  <br />
                  recommendations
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="37.742"
                    viewBox="0 0 45 37.742"
                  >
                    <path
                      id="Path_359"
                      data-name="Path 359"
                      d="M20.355,56.71A4.355,4.355,0,1,0,16,52.355,4.355,4.355,0,0,0,20.355,56.71Zm11.613-7.258a2.9,2.9,0,1,0,0,5.806H58.1a2.9,2.9,0,1,0,0-5.806Zm0,14.516a2.9,2.9,0,1,0,0,5.806H58.1a2.9,2.9,0,1,0,0-5.806Zm0,14.516a2.9,2.9,0,1,0,0,5.806H58.1a2.9,2.9,0,1,0,0-5.806ZM20.355,85.742A4.355,4.355,0,1,0,16,81.387,4.355,4.355,0,0,0,20.355,85.742ZM24.71,66.871a4.355,4.355,0,1,0-4.355,4.355A4.355,4.355,0,0,0,24.71,66.871Z"
                      transform="translate(-16 -48)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Making the application
                  <br />
                  process easy
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="32.143"
                    viewBox="0 0 45 32.143"
                  >
                    <path
                      id="Path_360"
                      data-name="Path 360"
                      d="M45,116.089a12.05,12.05,0,0,1-12.054,12.054h-.8a3.214,3.214,0,1,1,0-6.429h.8a5.629,5.629,0,0,0,5.625-5.625v-.8H32.143a6.435,6.435,0,0,1-6.429-6.429v-6.429A6.435,6.435,0,0,1,32.143,96h6.429A6.435,6.435,0,0,1,45,102.429v13.661Zm-25.714,0A12.05,12.05,0,0,1,7.232,128.143h-.8a3.214,3.214,0,1,1,0-6.429h.8a5.629,5.629,0,0,0,5.625-5.625v-.8H6.429A6.435,6.435,0,0,1,0,108.857v-6.429A6.435,6.435,0,0,1,6.429,96h6.429a6.435,6.435,0,0,1,6.429,6.429v13.661Z"
                      transform="translate(0 -96)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Promoting feedback and
                  <br />
                  recommendations
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="wmud-sec grey-back"
          id="wmud-sec-cloned-emp-corporate"
        >
          <div className="wmud-sec-inner container">
            <div className="sap-sm-heading">Empowering Corporate Experts</div>
            <div className="wmud-list">
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="35.994"
                    viewBox="0 0 45 35.994"
                  >
                    <path
                      id="Path_366"
                      data-name="Path 366"
                      d="M2.25,8.394A4.5,4.5,0,1,1,8.394,2.25H23.1a4.5,4.5,0,1,1,6.144,6.144v7.958A4.5,4.5,0,1,1,23.1,22.5H8.394A4.5,4.5,0,1,1,2.25,16.352ZM8.394,6.749A4.5,4.5,0,0,1,6.749,8.394v7.958A4.5,4.5,0,0,1,8.394,18H23.1a4.5,4.5,0,0,1,1.645-1.645V8.394A4.5,4.5,0,0,1,23.1,6.749Zm13.5,27A4.5,4.5,0,1,1,15.748,27.6V24.746h4.5V27.6a4.5,4.5,0,0,1,1.645,1.645H36.6A4.5,4.5,0,0,1,38.244,27.6V19.642A4.5,4.5,0,0,1,36.6,18H33.365A6.743,6.743,0,0,0,31.5,15.213V13.5h5.1a4.5,4.5,0,1,1,6.144,6.144V27.6a4.5,4.5,0,1,1-6.144,6.144Z"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  White label speakers
                  <br />
                  directory
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="39.368"
                    viewBox="0 0 45 39.368"
                  >
                    <path
                      id="Path_365"
                      data-name="Path 365"
                      d="M30.316,32.624l11.23,11.362a11.944,11.944,0,0,1,0,16.8L31.7,70.743a2.106,2.106,0,1,1-3-2.961l9.833-9.956a7.728,7.728,0,0,0,0-10.87L27.32,35.594a2.106,2.106,0,0,1,3-2.961ZM0,49.355V36.218A4.219,4.219,0,0,1,4.218,32H17.355a5.626,5.626,0,0,1,3.981,1.643L36.1,48.406a5.622,5.622,0,0,1,0,7.953L24.367,68.09a5.622,5.622,0,0,1-7.953,0L1.652,53.327A5.577,5.577,0,0,1,0,49.355Zm12.654-7.513a2.812,2.812,0,1,0-2.812,2.812A2.812,2.812,0,0,0,12.654,41.842Z"
                      transform="translate(0 -32)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">Full customization</div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="35"
                    viewBox="0 0 45 35"
                  >
                    <path
                      id="Path_362"
                      data-name="Path 362"
                      d="M7.5,32a5,5,0,0,0-5,5V59.5h5V37h30V59.5h5V37a5,5,0,0,0-5-5Zm10,27.5V62H2.5a2.5,2.5,0,0,0,0,5h40a2.5,2.5,0,0,0,0-5h-10V59.5A2.5,2.5,0,0,0,30,57H20A2.5,2.5,0,0,0,17.5,59.5Z"
                      transform="translate(0 -32)"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Providing learning
                  <br />
                  opportunities
                </div>
              </div>
              <div className="wmud-list-inner">
                <div className="wmud-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                  >
                    <path
                      id="Path_361"
                      data-name="Path 361"
                      d="M22.5,4.219A18.278,18.278,0,0,0,4.219,22.5v3.516a2.109,2.109,0,0,1-4.219,0V22.5a22.5,22.5,0,0,1,45,0V35.165A7.736,7.736,0,0,1,37.257,42.9l-9.694-.009A4.225,4.225,0,0,1,23.906,45H21.094a4.219,4.219,0,0,1,0-8.437h2.813a4.225,4.225,0,0,1,3.656,2.109l9.7.009a3.515,3.515,0,0,0,3.516-3.516V22.5A18.278,18.278,0,0,0,22.5,4.219ZM12.656,18.281h1.406a2.809,2.809,0,0,1,2.813,2.813v9.844a2.809,2.809,0,0,1-2.812,2.813H12.656a5.63,5.63,0,0,1-5.625-5.625V23.906A5.63,5.63,0,0,1,12.656,18.281Zm19.688,0a5.63,5.63,0,0,1,5.625,5.625v4.219a5.63,5.63,0,0,1-5.625,5.625H30.938a2.809,2.809,0,0,1-2.812-2.812V21.094a2.809,2.809,0,0,1,2.813-2.812Z"
                      fill="#7b621b"
                    />
                  </svg>
                </div>
                <div className="wmud-title">
                  Giving first-className
                  <br />
                  support
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us-mem">
          <div className="about-us-mem-inner container">
            <div className="sap-sm-heading sap-title-head">Our Team</div>
            <div className="aum-head">
              <div className="aum-inner">
                <div className="aum-img">
                  <img src="assets/image/RogerFerris.png" alt="" />
                </div>
                <div className="aum-bot">
                  <div className="aum-left">
                    <div className="aum-name">Bambi</div>
                    <div className="aum-desg">Chief Marketing officer</div>
                  </div>
                  <div className="aum-right">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id="Path_367"
                            data-name="Path 367"
                            d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM6.75,10.5H7.5v-2H6.75a.75.75,0,0,1,0-1.5h1.5A.748.748,0,0,1,9,7.75V10.5h.25a.75.75,0,0,1,0,1.5H6.75a.75.75,0,0,1,0-1.5ZM8,4A1,1,0,1,1,7,5,1,1,0,0,1,8,4Z"
                            fill="#edc967"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aum-inner">
                <div className="aum-img">
                  <img src="assets/image/RogerFerris.png" alt="" />
                </div>
                <div className="aum-bot">
                  <div className="aum-left">
                    <div className="aum-name">Domingo</div>
                    <div className="aum-desg">
                      Co Founder / Managing Partner
                    </div>
                  </div>
                  <div className="aum-right">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id="Path_367"
                            data-name="Path 367"
                            d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM6.75,10.5H7.5v-2H6.75a.75.75,0,0,1,0-1.5h1.5A.748.748,0,0,1,9,7.75V10.5h.25a.75.75,0,0,1,0,1.5H6.75a.75.75,0,0,1,0-1.5ZM8,4A1,1,0,1,1,7,5,1,1,0,0,1,8,4Z"
                            fill="#edc967"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aum-inner">
                <div className="aum-img">
                  <img src="assets/image/RogerFerris.png" alt="" />
                </div>
                <div className="aum-bot">
                  <div className="aum-left">
                    <div className="aum-name">Shawn</div>
                    <div className="aum-desg">Co-Founder / Speaker</div>
                  </div>
                  <div className="aum-right">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id="Path_367"
                            data-name="Path 367"
                            d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM6.75,10.5H7.5v-2H6.75a.75.75,0,0,1,0-1.5h1.5A.748.748,0,0,1,9,7.75V10.5h.25a.75.75,0,0,1,0,1.5H6.75a.75.75,0,0,1,0-1.5ZM8,4A1,1,0,1,1,7,5,1,1,0,0,1,8,4Z"
                            fill="#edc967"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aum-inner">
                <div className="aum-img">
                  <img src="assets/image/RogerFerris.png" alt="" />
                </div>
                <div className="aum-bot">
                  <div className="aum-left">
                    <div className="aum-name">Greg</div>
                    <div className="aum-desg">Co-Founder / COO</div>
                  </div>
                  <div className="aum-right">
                    <div className="sap-btn-dark">
                      <button type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id="Path_367"
                            data-name="Path 367"
                            d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM6.75,10.5H7.5v-2H6.75a.75.75,0,0,1,0-1.5h1.5A.748.748,0,0,1,9,7.75V10.5h.25a.75.75,0,0,1,0,1.5H6.75a.75.75,0,0,1,0-1.5ZM8,4A1,1,0,1,1,7,5,1,1,0,0,1,8,4Z"
                            fill="#edc967"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="aum-inner">
              <div className="aum-img">
                <img src="assets/image/RogerFerris.png" alt="" />
              </div>
              <div className="aum-bot">
                <div className="aum-left">
                  <div className="aum-name">Alisha R. Bend</div>
                  <div className="aum-desg">editor</div>
                </div>
                <div className="aum-right">
                  <div className="sap-btn-dark">
                    <button type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          id="Path_367"
                          data-name="Path 367"
                          d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM6.75,10.5H7.5v-2H6.75a.75.75,0,0,1,0-1.5h1.5A.748.748,0,0,1,9,7.75V10.5h.25a.75.75,0,0,1,0,1.5H6.75a.75.75,0,0,1,0-1.5ZM8,4A1,1,0,1,1,7,5,1,1,0,0,1,8,4Z"
                          fill="#edc967"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default AboutUs;
