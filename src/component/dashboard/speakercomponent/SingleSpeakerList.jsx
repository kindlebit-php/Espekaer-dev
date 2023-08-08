import React, { Fragment, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
  FaFacebookF,
  FaLinkedinIn,
  // FaInstagram,
  FaTwitter,
  FaMicrophoneAlt,
  FaChalkboardTeacher,
  FaRecordVinyl,
  FaUserTie,
  FaUserFriends,
  FaAward,
  FaUsers,
  FaGraduationCap,
  FaTv,
  FaMapMarkerAlt,
  FaCity,
  FaLanguage,
  FaCompass,
  FaCommentsDollar,
  FaHandPaper,
  FaUserEdit,
  FaHeart,
  FaBullhorn,
  // FaPinterest,
  FaInstagram,
  FaMediumM,
  FaPodcast,
  FaSkype,
  FaSnapchat,
  FaTiktok,
  FaRocketchat,
  FaTencentWeibo,
  FaYoutube,
} from "react-icons/fa";
import Auth from "../../../auth/Auth";

import speakerImage from "../../assets/user-placeholder.jpg";
import { toast } from "react-toastify";

const settings = {
  slidesToShow: 1,
  infinite: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToScroll: 1,
  autoplay: true,
};

const SingleSpeakerList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [getSingleList, setGetSingleList] = useState("");
  const [bookViewMore, setbookViewMore] = useState(true);
  const [allViewMore, setAllViewMore] = useState(true);
  const [articleViewMore, setarticleViewMore] = useState(true);
  const [addFavourite, setAddFavourite] = useState("");
  const [read, setRead] = useState(false);
  const [commonState, setCommonState] = useState({
    bioViewMore: false,
  });

  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Get single speaker listing api
  const singleSpeakerListApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        AuthToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerData/${id}`,
      requestKey
    );
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      setGetSingleList(data);
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

  // Like/Dislike post api
  const likeDislikeApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        AuthToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/favoriteSpeaker/${id}`,
      requestKey
    );
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      setAddFavourite(data?.data?.favorite);
      toast.warn(data?.message);
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

  // Like/Dislike get api
  const likeDislikeGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        AuthToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getFavoriteSpeaker/${id}`,
      requestKey
    );
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      setAddFavourite(data?.data?.favorite);
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

  useEffect(() => {
    singleSpeakerListApi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    likeDislikeGetApi();
    // eslint-disable-next-line
  }, [addFavourite]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Speaker listing</title>
      </Helmet>
      <div className="single-speaker-lisitng" id="mp-single-speaker-list">
        <section className="single-speaker-ban">
          <img
            src={
              getSingleList
                ? `${process.env.REACT_APP_IMAGE_URL}${getSingleList?.data[0]?.coverimagesData[0]?.coverImage}`
                : speakerImage
            }
            alt=""
            className="ssb-back"
          />
          <div className="container ssb-inner">
            <img
              src={
                getSingleList
                  ? `${process.env.REACT_APP_IMAGE_URL}${getSingleList?.data[0]?.coverimagesData[0]?.coverImage}`
                  : speakerImage
              }
              alt=""
            />
          </div>
        </section>
        <section className="single-speaker-lisitng-sec">
          <div className="single-speaker-lisitng-sec-inner container">
            <form action="">
              <div className="sl-right-head">
                <div className="sl-right-inner">
                  <div className="floating-tag gold">
                    {getSingleList && getSingleList?.data[0]?.planName}
                  </div>
                  <div className="slri-img">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}${
                        getSingleList && getSingleList?.data[0]?.profileImage
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="slri-con">
                    <div className="slri-top">
                      <div className="slri-top-left">
                        <div className="slri-name">
                          {getSingleList && getSingleList?.data[0]?.fullName}{" "}
                          {getSingleList && getSingleList?.mes
                            ? getSingleList && getSingleList?.mes
                            : getSingleList &&
                              `(${
                                getSingleList?.data[0]?.gender.split("")[0]
                              })`}
                        </div>
                        <div className="slri-desg">Director</div>
                        <div className="slri-company">
                          Professional Services BD
                        </div>
                        <div className="contact-sl">
                          {/* <div className="sap-btn-dark">
                            <button type="button">contact roger</button>
                          </div> */}
                          {getSingleList && getSingleList?.mes !== "(You)" && (
                            <div
                              className={`${
                                addFavourite === true
                                  ? `add-to-fav`
                                  : `add-to-fav heart`
                              } `}
                              onClick={() => likeDislikeApi()}
                            >
                              <i className="fa fa-heart">
                                <FaHeart />
                              </i>
                              add to favourite
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="slri-top-right">
                        <ul>
                          <li>
                            <span className="slri-tr-heading">
                              <i>
                                <FaMapMarkerAlt />
                              </i>
                              COUNTRY/ STATE
                            </span>
                            <span className="slri-tr-con">
                              {getSingleList &&
                                getSingleList?.data[0]?.userdetailsData[0]
                                  ?.country}/ {getSingleList &&
                                    getSingleList?.data[0]?.userdetailsData[0]
                                      ?.state}
                            </span>
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              <i className="fa-solid fa-city">
                                <FaCity />
                              </i>{" "}
                              city
                            </span>
                            <span className="slri-tr-con">
                              {getSingleList &&
                                getSingleList?.data[0]?.userdetailsData[0]
                                  ?.city}
                            </span>
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              <i>
                                <FaLanguage />
                              </i>{" "}
                              LANGUAGES
                            </span>
                            {getSingleList &&
                              getSingleList?.data[0]?.speakertopicsData[0]?.language?.map(
                                (data, index) => {
                                  return (
                                    <span className="slri-tr-con" key={index}>
                                      {`${(index ? "," : "") + data?.language}`}
                                    </span>
                                  );
                                }
                              )}
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              {/* <i>
                                <FaLanguage />
                              </i>{" "} */}
                              MAIN TOPICS
                            </span>
                            {getSingleList &&
                              getSingleList?.data[0]?.speakertopicsData[0]?.mainTopic?.map(
                                (data, index) => {
                                  return (
                                    <span className="slri-tr-con" key={index}>
                                      {`${(index ? "," : "") + data?.topic}`}
                                    </span>
                                  );
                                }
                              )}
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              <i>
                                <FaCompass />
                              </i>{" "}
                              AVAILABLE TO
                            </span>
                            {getSingleList && (
                              <>
                                {getSingleList?.data[0]?.availabilitiesData?.map(
                                  (data, index) => {
                                    return (
                                      <span className="slri-tr-con" key={index}>
                                        {`${
                                          (index ? "," : "") + data?.availableTo
                                        }`}
                                      </span>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              <i>
                                <FaCommentsDollar />
                              </i>{" "}
                              fee
                            </span>
                            <span className="slri-tr-con">
                              <div className="pricing-modal">
                                {getSingleList &&
                                  getSingleList?.data[0]?.availabilitiesData[0]
                                    ?.fee}
                              </div>
                            </span>
                          </li>
                          <li>
                            <span className="slri-tr-heading">
                              <i>
                                <FaHandPaper />
                              </i>{" "}
                              VOLUNTEER
                            </span>
                            <span className="slri-tr-con">
                              {getSingleList &&
                                getSingleList?.data[0]?.availabilitiesData[0]
                                  ?.volunteer}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <span onClick={() => navigate(-1)}>{`<<Back`}</span> */}
                    <div className="doable-head">
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor ===
                                `Conference (Full-day Event)`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaMicrophoneAlt />
                          </i>
                        </div>
                        <div className="doable-title">Conference</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor === `Workshop (3+ hour event)`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaChalkboardTeacher />
                          </i>
                        </div>
                        <div className="doable-title">workshop</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor === `Session (1-2 hour event)`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaRecordVinyl />
                          </i>
                        </div>
                        <div className="doable-title">session</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return data.availableFor === `Moderator`;
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaUserTie />
                          </i>
                        </div>
                        <div className="doable-title">moderator</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor === `Webinar (Virtual event)`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaTv />
                          </i>
                        </div>
                        <div className="doable-title">webinar</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor === `School (incl. charity)`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaGraduationCap />
                          </i>
                        </div>
                        <div className="doable-title">school</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return data.availableFor === `Meetup`;
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaUsers />
                          </i>
                        </div>
                        <div className="doable-title">meetup</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return data.availableFor === `Panel`;
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaUserFriends />
                          </i>
                        </div>
                        <div className="doable-title">panel</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return (
                                data.availableFor === `Certificate Program`
                              );
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaAward />
                          </i>
                        </div>
                        <div className="doable-title">certificate program</div>
                      </div>
                      <div
                        className={`doable-list ${
                          getSingleList &&
                          getSingleList?.data[0]?.availabilitiesData[0]?.eventsAvailable?.find(
                            (data) => {
                              return data.availableFor === `Emcee`;
                            }
                          )
                            ? `active`
                            : ``
                        }`}
                      >
                        <div className="doable-icon">
                          <i className="">
                            <FaBullhorn />
                          </i>
                        </div>
                        <div className="doable-title">Emcee</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-sp-list-details">
                <div className="sspld-left">
                  <div className="sap-min-card" id="m-card-testi">
                    <div className="sap-min-card-heading">
                      TESTIMONIALS<span className="card-counter">(2)</span>
                    </div>
                    <div className="sp-card-testi-slider owl-carousel owl-theme">
                      <Slider {...settings}>
                        <div className="item">
                          <div className="text-para">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec volutpat, ante ut ornare pharetra,
                            libero massa feugiat tellus, ut malesuada sem arcu
                            ut orci. Etiam sapien tellus, fermentum eget
                            pharetra at.
                          </div>
                          <div className="testi-mem-name">Jhon Mc. Felon</div>
                          <div className="testi-des">
                            Director of Bilar Logistics
                          </div>
                        </div>
                        <div className="item">
                          <div className="text-para">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec volutpat, ante ut ornare pharetra,
                            libero massa feugiat tellus, ut malesuada sem arcu
                            ut orci. Etiam sapien tellus, fermentum.
                          </div>
                          <div className="testi-mem-name">Sheldon Brick</div>
                          <div className="testi-des">CSP</div>
                        </div>
                      </Slider>
                    </div>
                    <div className="add-testi">
                      <i>
                        <FaUserEdit />
                      </i>
                      <span className="add-testi-heading">
                        Add Testimonials
                      </span>
                    </div>
                  </div>
                  <div className="sap-min-card" id="m-card-why-me">
                    <div className="sap-min-card-heading">WHY CHOOSE ME?</div>
                    <div className="text-para">
                      {getSingleList &&
                        getSingleList?.data[0]?.userdetailsData?.map(
                          (data, index) => {
                            return (
                              <div key={index}>
                                {!read
                                  ? `${data.whyChooseMe?.slice(0, 300)}...`
                                  : `${data.whyChooseMe}`}

                                <span
                                  style={{
                                    color: "#edc967",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setRead(!read)}
                                >
                                  {!read ? "Read more" : " Read less"}
                                </span>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                  <div className="sap-min-card" id="m-card-social-links">
                    <div className="sap-min-card-heading">social media</div>
                    <ul>
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.facebook && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.facebook
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-facebook-f">
                                <FaFacebookF />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.twitter && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.twitter
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-twitter">
                                <FaTwitter />
                              </i>
                            </a>
                          </li>
                        )}

                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.linkedin && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.linkedin
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaLinkedinIn />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.instagram && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]
                                  ?.instagram
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaInstagram />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.medium && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.medium
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaMediumM />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.priscope && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.priscope
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaPodcast />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.skype && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.skype
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaSkype />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.snapchat && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.snapchat
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaSnapchat />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.tiktok && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.tiktok
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaTiktok />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.wechat && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.wechat
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaRocketchat />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]?.weibo && (
                          <li>
                            <a
                              href={
                                getSingleList &&
                                getSingleList?.data[0]
                                  ?.speakersavedsocialmediaurlsData[0]?.weibo
                              }
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaTencentWeibo />
                              </i>
                            </a>
                          </li>
                        )}
                      {getSingleList &&
                        getSingleList?.data[0]
                          ?.speakersavedsocialmediaurlsData[0]
                          ?.youtubeChannel && (
                          <li>
                            <a
                              href="https://www.linkedin.com/company/espeakers"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in">
                                <FaYoutube />
                              </i>
                            </a>
                          </li>
                        )}
                    </ul>
                  </div>
                  <div className="sap-min-card" id="m-card-affiliations">
                    <div className="sap-min-card-heading">AFFILIATIONS</div>
                    <div className="mcard-aff-head">
                      <a>Society Speaker Directory</a>
                    </div>
                  </div>
                </div>
                {/* First tab */}
                <div className="sspld-right">
                  <div className="sap-min-card">
                    <Tabs
                      selectedIndex={tabIndex}
                      onSelect={(tabIndex) => setTabIndex(tabIndex)}
                    >
                      <TabList>
                        <Tab>
                          <li className="nav-item">
                            BIO
                            <span className="card-counter">
                              (
                              {getSingleList &&
                                getSingleList?.data[0]?.bioData.map(
                                  (bio, index) => {
                                    return <div key={index}>{bio.bio}</div>;
                                  }
                                )?.length}
                              )
                            </span>
                          </li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">
                            CURRENT POSITION{" "}
                            <span className="card-counter">
                              (
                              {getSingleList &&
                                getSingleList?.data[0].speakerpositionsData?.map(
                                  (pos, index) => {
                                    return (
                                      <div key={index}>{pos?.position}</div>
                                    );
                                  }
                                )?.length}
                              )
                            </span>
                          </li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">
                            ACHIEVEMENTS
                            <span className="card-counter">
                              (
                              {getSingleList &&
                                getSingleList?.data[0]?.achievementData?.map(
                                  (ach, index) => {
                                    return (
                                      <div key={index}>{ach.achiveDec}</div>
                                    );
                                  }
                                )?.length}
                              )
                            </span>
                          </li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">
                            DEGREES{" "}
                            <span className="card-counter">
                              (
                              {getSingleList &&
                                getSingleList?.data[0]?.educationsData?.length}
                              )
                            </span>
                          </li>
                        </Tab>
                      </TabList>

                      <div className="tab-content">
                        <TabPanel>
                          {/* <div className="m-card-heading-in">
                            {getSingleList &&
                              getSingleList?.data[0]?.bioData?.map(
                                (bioti, index) => {
                                  return (
                                    <div key={index}>{bioti?.bioTitle}</div>
                                  );
                                }
                              )}
                          </div> */}
                          {commonState?.bioViewMore ? (
                            <div className="text-para">
                              {getSingleList &&
                                getSingleList?.data[0]?.bioData?.map(
                                  (bio, index) => {
                                    return (
                                      <div key={index} className="speaker-tab">
                                        <h5>{index + 1}. {bio?.bioTitle}</h5>
                                        <p>
                                          {bio?.bio}
                                        </p>
                                      </div>
                                    );
                                  }
                                )}
                              {getSingleList &&
                                getSingleList?.data[0]?.bioData?.length > 1 && (
                                  <span
                                    style={{
                                      color: "#edc967",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      setCommonState({
                                        ...commonState,
                                        bioViewMore: !commonState?.bioViewMore,
                                      })
                                    }
                                  >
                                    {!commonState?.bioViewMore
                                      ? "Read more"
                                      : "Read less"}
                                  </span>
                                )}
                            </div>
                          ) : (
                            <div className="text-para">
                              {getSingleList &&
                                getSingleList?.data[0]?.bioData
                                  ?.slice(0, 1)
                                  ?.map((bio, index) => {
                                    return (
                                      <div key={index} className="speaker-tab">
                                      <h5>{index + 1}. {bio?.bioTitle}</h5>
                                      <p>
                                        {bio?.bio}
                                      </p>
                                    </div>
                                    );
                                  })}
                              {getSingleList &&
                                getSingleList?.data[0]?.bioData?.length > 1 && (
                                  <span
                                    style={{
                                      color: "#edc967",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      setCommonState({
                                        ...commonState,
                                        bioViewMore: !commonState?.bioViewMore,
                                      })
                                    }
                                  >
                                    {!commonState?.bioViewMore
                                      ? "Read more"
                                      : "Read less"}
                                  </span>
                                )}
                            </div>
                          )}
                          {/* {getSingleList && getSingleList?.data[0]?.bioData?.length>1 && 
                          <div onClick={()=>setCommonState({...commonState,bioViewMore:!commonState?.bioViewMore}) } className="view-more-btn">{!commonState?.bioViewMore ? "View more" : "View less" }</div>} */}
                        </TabPanel>
                      </div>
                      <TabPanel>
                        <div className="text-para">
                          <p>
                            {getSingleList &&
                              getSingleList?.data[0].speakerpositionsData?.map(
                                (pos, index) => {
                                  return( 
                                  <div key={index} className="speaker-tab">
                                    <h5>{pos?.company}</h5>
                                    <p>{pos?.position}</p>
                                    </div>
                                  );
                                }
                              )}
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="text-para">
                          {getSingleList &&
                            getSingleList?.data[0]?.achievementData?.map(
                              (ach, index) => {
                                return <div key={index} className="speaker-tab">
                                  <h5>{ach?.achiveTitle}</h5>
                                  <p>{ach?.achiveDec}</p>
                                  
                                  </div>;
                              }
                            )}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="text-para">
                          <table>
                            <tr>
                              <th>School</th>
                              <th>Study</th>
                              <th>From</th>
                              <th>To</th>
                            </tr>
                            {getSingleList &&
                              getSingleList?.data[0]?.educationsData?.map(
                                (edu, index) => {
                                  const { school, study, from, to } = edu;
                                  return (
                                    <tr key={index}>
                                      <td>{school}</td>
                                      <td>{study}</td>
                                      <td>{from}</td>
                                      <td>{to}</td>
                                    </tr>
                                  );
                                }
                              )}
                          </table>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>

                  {/* Second tab section start */}
                  <div className="sap-min-card">
                    <Tabs
                    // selectedIndex={tabIndex}
                    // onSelect={(tabIndex) => setTabIndex(tabIndex)}
                    >
                      <TabList>
                        <Tab>
                          <li className="nav-item">AS A CREATIVE INFLUENCER</li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">AS AN ACTor & WRITER</li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">AS A SPEAKER & ADVOCATE</li>
                        </Tab>
                      </TabList>
                      <div className="tab-content">
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="text-para">
                              Phasellus volutpat sapien quam, sed vulputate
                              risus pretium ac. Morbi ut scelerisque massa,
                              vitae egestas risus. Aenean a tortor neque. Nunc
                              consectetur, mi euismod pellentesque suscipit,
                              augue ipsum ornare sapien, eleifend ultricies
                              tortor ipsum vel lorem.
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="text-para">
                              Your role as an actor usually involves
                              interpreting the work of a writer under the
                              instruction
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="text-para">
                              Define communication apprehension and note
                              strategies to manage anxiety before speaking
                            </div>
                          </div>
                        </TabPanel>
                        {/* <TabPanel>
                          <div className="tab-pane">
                            <p>Fourth</p>
                          </div>
                        </TabPanel> */}
                      </div>
                    </Tabs>
                  </div>

                  <div className="sap-min-card">
                    <Tabs>
                      <TabList>
                        <Tab>
                          <li className="nav-item">
                            PRESENTATIONS{" "}
                            <span className="card-counter">
                              (
                              {getSingleList &&
                                getSingleList?.data[0]?.presentationsData
                                  ?.length}
                              )
                            </span>
                          </li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">
                            PAST TALKS <span className="card-counter">(1)</span>
                          </li>
                        </Tab>
                        <Tab>
                          <li className="nav-item">Contact</li>
                        </Tab>
                        {/* <Tab>
                    <li className="nav-item">
                    </li></Tab> */}
                      </TabList>
                      <div className="tab-content">
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="m-card-con-loop">
                              <div className="m-card-heading-in">
                                {getSingleList &&
                                  getSingleList?.data[0]?.presentationsData?.map(
                                    (pre, index) => {
                                      return (
                                        <div key={index}>
                                          {pre?.paresentTitle}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                              <div className="text-para">
                                {getSingleList &&
                                  getSingleList?.data[0]?.presentationsData?.map(
                                    (pre, index) => {
                                      return (
                                        <div key={index}>
                                          {pre?.paresentDec}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>

                            {/* <div className="view-more-btn">view more</div> */}
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="text-para">
                              something that was true for some time in the past
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane">
                            <div className="text-para">
                              the act or state of touching; a touching or
                              meeting, as of two things or people
                            </div>
                          </div>
                        </TabPanel>
                        {/* <TabPanel>
                          <div className="tab-pane">
                            <p>Fourth</p>
                          </div>
                        </TabPanel> */}
                      </div>
                    </Tabs>
                  </div>

                  <div className="sap-min-card">
                    <ul className="nav nav-pills mb-3">
                      <li className="nav-item">
                        <button className="nav-link active">
                          ALL{" "}
                          {getSingleList &&
                            getSingleList?.data[0]?.speakergalleriesData
                              ?.length > 0 && (
                              <span className="card-counter">{`(${
                                getSingleList &&
                                getSingleList?.data[0]?.speakergalleriesData
                                  ?.length
                              })`}</span>
                            )}
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade show active">
                        {!allViewMore ? (
                          <div className="m-card-gall-head">
                            {getSingleList &&
                              getSingleList?.data[0]?.speakergalleriesData?.map(
                                (data, index) => {
                                  const { galleryName, gallery } = data;
                                  return (
                                    <div
                                      className="m-card-gall-inner"
                                      key={index}
                                    >
                                      <div className="mcgi-img">
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_URL}${gallery}`}
                                          alt=""
                                        />
                                      </div>
                                      <div className="mcgi-heading">
                                        {galleryName}
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <i className="fa-solid fa-chart-line"></i>
                              </div>
                              <div className="mcgi-heading">
                                Lorem ipsum dolor sit amet consec adipiscing elit
                              </div>
                            </div> */}
                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <i className="fa-regular fa-file-lines"></i>
                              </div>
                              <div className="mcgi-heading">
                                Malesuada sem arc adipiscing elit donec volutpat.
                              </div>
                            </div> */}
                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <img src="assets/image/comedian.png" alt="" />
                              </div>
                              <div className="mcgi-heading">
                                Lorem ipsum dolor sit amet consec adipiscing elit
                              </div>
                            </div> */}
                          </div>
                        ) : (
                          <div className="m-card-gall-head">
                            {getSingleList &&
                              getSingleList?.data[0]?.speakergalleriesData
                                ?.slice(0, 3)
                                ?.map((data, index) => {
                                  const { galleryName, gallery } = data;
                                  return (
                                    <div
                                      className="m-card-gall-inner"
                                      key={index}
                                    >
                                      <div className="mcgi-img">
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_URL}${gallery}`}
                                          alt=""
                                        />
                                      </div>
                                      <div className="mcgi-heading">
                                        {galleryName}
                                      </div>
                                    </div>
                                  );
                                })}

                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <i className="fa-solid fa-chart-line"></i>
                              </div>
                              <div className="mcgi-heading">
                                Lorem ipsum dolor sit amet consec adipiscing elit
                              </div>
                            </div> */}
                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <i className="fa-regular fa-file-lines"></i>
                              </div>
                              <div className="mcgi-heading">
                                Malesuada sem arc adipiscing elit donec volutpat.
                              </div>
                            </div> */}
                            {/* <div className="m-card-gall-inner">
                              <div className="mcgi-img">
                                <img src="assets/image/comedian.png" alt="" />
                              </div>
                              <div className="mcgi-heading">
                                Lorem ipsum dolor sit amet consec adipiscing elit
                              </div>
                            </div> */}
                          </div>
                        )}

                        {getSingleList &&
                          getSingleList?.data[0]?.speakergalleriesData?.length >
                            3 && (
                            <div className="sap-btn-light">
                              <button
                                onClick={() => setAllViewMore(!allViewMore)}
                                type="button"
                              >
                                {allViewMore ? "view more" : "view less"}
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  {/* {console.log("article", getSingleList && getSingleList?.data[0]?.speakerpublicationarticlesData)}
                  {console.log("book", getSingleList && getSingleList?.data[0]?.speakerpublicationbooksData)} */}

                  <div className="sap-min-card" id="m-card-booksnarticles">
                    <div className="sap-min-card-heading">
                      BOOKS & articles
                      <span className="card-counter">
                        (
                        {getSingleList &&
                          getSingleList?.data[0]?.speakerpublicationbooksData
                            ?.length}
                        )
                      </span>
                    </div>

                    {!bookViewMore ? (
                      <div className="sap-min-card-box">
                        {getSingleList &&
                          getSingleList?.data[0]?.speakerpublicationbooksData?.map(
                            (book, index) => {
                              const {
                                bookTitle,
                                bookCoverImage,
                                bookPublisher,
                                bookYearPublisher,
                                bookLink,
                              } = book;
                              return (
                                <div className="m-card-books-head" key={index}>
                                  <div className="m-card-books-inner">
                                    <a
                                      href={bookLink}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <div className="mcbki-img">
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_URL}${bookCoverImage}`}
                                          alt="coverimage"
                                        />
                                      </div>
                                      <div className="mcbki-con">
                                        <div className="mcbki-title">
                                          {bookTitle}
                                        </div>
                                        <div className="text-para">
                                          {bookPublisher}
                                        </div>
                                        <div className="text-para">
                                          {bookYearPublisher}
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    ) : (
                      <div className="sap-min-card-box">
                        {getSingleList &&
                          getSingleList?.data[0]?.speakerpublicationbooksData
                            ?.slice(0, 3)
                            ?.map((book, index) => {
                              const {
                                bookTitle,
                                bookCoverImage,
                                bookPublisher,
                                bookYearPublisher,
                                bookLink,
                              } = book;
                              return (
                                <div className="m-card-books-head" key={index}>
                                  <div className="m-card-books-inner">
                                    <a
                                      href={bookLink}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <div className="mcbki-img">
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_URL}${bookCoverImage}`}
                                          alt="coverimage"
                                        />
                                      </div>
                                      <div className="mcbki-con">
                                        <div className="mcbki-title">
                                          {bookTitle}
                                        </div>
                                        <div className="text-para">
                                          {bookPublisher}
                                        </div>
                                        <div className="text-para">
                                          {bookYearPublisher}
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    )}

                    <div>
                      {getSingleList &&
                        getSingleList?.data[0]?.speakerpublicationbooksData
                          ?.length > 3 && (
                          <div className="sap-btn-light">
                            <button
                              onClick={() => setbookViewMore(!bookViewMore)}
                              type="button"
                            >
                              {bookViewMore ? "view more" : "view less"}
                            </button>
                          </div>
                        )}

                      {articleViewMore ? (
                        <div>
                          {getSingleList &&
                            getSingleList?.data[0]?.speakerpublicationarticlesData
                              ?.slice(0, 1)
                              ?.map((arti, index) => {
                                const { articleTitle, articleLink } = arti;
                                return (
                                  <div
                                    className="m-card-article-head"
                                    key={index}
                                  >
                                    <div className="m-card-article-inner">
                                      <a
                                        href={articleLink}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="mcart-title"
                                      >
                                        {articleTitle}
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                        </div>
                      ) : (
                        <div>
                          {getSingleList &&
                            getSingleList?.data[0]?.speakerpublicationarticlesData?.map(
                              (arti, index) => {
                                const { articleTitle, articleLink } = arti;
                                return (
                                  <div
                                    className="m-card-article-head"
                                    key={index}
                                  >
                                    <div className="m-card-article-inner">
                                      <a
                                        href={articleLink}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="mcart-title"
                                      >
                                        {articleTitle}
                                      </a>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      )}
                      <div></div>

                      {getSingleList &&
                        getSingleList?.data[0]?.speakerpublicationarticlesData
                          ?.length > 1 && (
                          <div className="sap-btn-light">
                            <button
                              onClick={() =>
                                setarticleViewMore(!articleViewMore)
                              }
                              type="button"
                            >
                              {articleViewMore ? "view more" : "view less"}
                            </button>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="sap-min-card" id="awardsncert">
                    <div className="sap-min-card-heading">
                      AWARDS & CERTIFICATIONS
                      <span className="card-counter">
                        (
                        {getSingleList &&
                          getSingleList?.data[0]?.awardsData?.length}
                        )
                      </span>
                    </div>
                    {getSingleList &&
                      getSingleList?.data[0]?.awardsData?.map(
                        (award, index) => {
                          const { awarsOrga, year } = award;
                          return (
                            <div className="m-card-aw-cert-head" key={index}>
                              <div className="m-card-aw-cert-inner">
                                <div className="sap-min-card-heading">
                                  {awarsOrga}
                                </div>
                                <div className="sap-min-card-heading text-grey">
                                  {year}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="sap-min-card" id="awardsncert">
                    <div className="sap-min-card-heading">
                    COMPETENCIES
                    </div>
                    {getSingleList &&
                      getSingleList?.data[0]?.expertisequesData?.map(
                        (data, index) => {
                          return (
                            <div className="m-card-aw-cert-head" key={index}>
                              <div className="m-card-aw-cert-inner">
                                <div className="sap-min-card-heading">
                                  {data?.answered}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="sap-min-card" id="awardsncert">
                  <div className="sap-min-card-heading">
                  EVENTS (PAST OR UPCOMING)
                    </div>
                     <div className="text-para">
                          <p>
                            {getSingleList &&
                              getSingleList?.data[0].eventsData?.map(
                                (data, index) => {
                                  return( 
                                  <div key={index} className="speaker-tab">
                                    <h5>Name :</h5>
                                    <p>{data?.name}</p>
                                    <h5>Title :</h5>
                                    <p>{data?.title}</p>
                                    <h5>Location :</h5>
                                    <p>{data?.location}</p>
                                    <h5>Date :</h5>
                                    <p>{data?.date}</p>
                                    <h5>Link :</h5>
                                    <p>{data?.link}</p>
                                    </div>
                                  );
                                }
                              )}
                          </p>
                        </div>
                  </div>

                  <div className="sap-min-card" id="awardsncert">
                    <div className="sap-min-card-heading">
                    INDUSTRY & TALENT
                      {/* <span className="card-counter">
                        (
                        {getSingleList &&
                          getSingleList?.data[0]?.awardsData?.length}
                        )
                      </span> */}
                    </div>
                    {getSingleList &&
                      getSingleList?.data[0]?.industrytalentsData?.map(
                        (data, index) => {
                          return (
                            <div className="m-card-aw-cert-head" key={index}>
                              <div className="m-card-aw-cert-inner">
                                <div className="sap-min-card-heading">
                                  {data?.industryName}
                                </div>
                                <p>
                                  {data?.talentName}
                                </p>
                                <p>
                                  {data?.subTalentName}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="sap-min-card" id="m-card-expertise">
                    <div className="sap-min-card-heading">
                      EXPERTISE <span className="card-counter">({getSingleList &&
                        getSingleList?.data[0]?.speakertopicsData[0]?.tag?.length})</span>
                    </div>
                    <div className="hashtags">
                      {getSingleList &&
                        getSingleList?.data[0]?.speakertopicsData[0]?.tag?.map(
                          (data, index) => {
                            return (
                              <p key={index}>
                                {`
                                #${data}
                              `}
                              </p>
                            );
                          }
                        )}
                    </div>
                  </div>

                  <div className="sap-min-card" id="m-card-clients">
                    <div className="sap-min-card-heading">CLIENTS</div>
                    <div className="m-card-clients-head">
                      {getSingleList &&
                        getSingleList?.data[0]?.speakerclientsData?.map(
                          (client, index) => {
                            return (
                              <div className="m-card-clients-inner" key={index}>
                                {client?.clientName}
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default SingleSpeakerList;
