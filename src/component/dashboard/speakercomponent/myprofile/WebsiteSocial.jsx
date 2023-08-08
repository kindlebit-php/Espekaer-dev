import React, { Fragment, useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

import { FaTrash, FaPlus, FaCircleNotch } from "react-icons/fa";

import MyProfileSidebar from "./MyProfileSidebar";
import Auth from "../../../../auth/Auth";
import Loader from "../../../loader/Loader";

const WebsiteSocial = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  // const websiteRegex = /^((http|https|www):\/\/)?([A-z]+)\.([A-z]{2,})/;

  const websiteRegex = /^((http|https|www):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$)/i;

  const skypeRegex = /^https?:\/\/join\.skype\.com\/invite\/[a-zA-Z0-9_-]+$/;
  const twitterRegex =
    /^https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})$/;
  const linkdinRegex = /^https:\/\/www.linkedin.com\/in\/[a-zA-Z0-9-]+\/?$/;
  const facebookRegex = /https?:\/\/(www\.)?facebook\.com\/.+$/;
  const youtubeChannelRege =
    /^https?:\/\/(www\.)?youtube\.com\/@([a-zA-Z0-9_-]+)$/;
  // const periscopeRegex = /^https?:\/\/rtmp:\/\/(www\.)?(pscp|pscp-global)\.tv\/[a-zA-Z0-9_-]+$/;
  // const periscopeRegex = /^https?:\/\/(?:www\.)?periscope\.(?:tv|tv\/w)\/([\w-]+)$/i
  const periscopeRegex = /^rtmp:\/\/sg-pscp\.tv\.80\/x\/[\w-]+$/i;
  const tiktokRegex = /^https?:\/\/(?:www\.)?tiktok\.com\/@([a-zA-Z0-9._-]+)$/;
  const instagarmRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_]+\/*$/;
  const mediumRegex = /^https?:\/\/medium\.com\/@([a-zA-Z0-9._]+)$/i;
  const spanchatRegex = /^https:\/\/www\.snapchat\.com\/add\/[a-zA-Z0-9_]+$/;
  const wechatRegex = /^https?:\/\/(w{0,3}\.)?weixin\.qq\.com\/.*$/;
  const weiboRegex = /https?:\/\/(?:www\.)?weibo\.com\/\d{6,}\/[a-zA-Z0-9]+/;

  const [commonState, setCommonState] = useState({
    loader: false,
    clientPostLoader: false,
    clientDelete: false,
    clientLoader: false,
    pageLoader:false
  });

  const [websiteInput, setWebsiteInput] = useState([{ websiteUrl: "" }]);
  const [twitterHttps, setTwitterHttps] = useState("");
  const [linkdinHttps, setLinkdinHttps] = useState("");
  const [facebookHttps, setFacebookHttps] = useState("");
  const [youtubeHttps, setYoutubeHttps] = useState("");
  const [periscopHttps, setPeriscopHttps] = useState("");
  const [tiktokHttps, setTiktokHttps] = useState("");
  const [instagramHttps, setInstagramHttps] = useState("");
  const [mediumHttps, setMediumHttps] = useState("");
  const [spanchatHttps, setSpanchatHttps] = useState("");
  const [skypeHttps, setSkypeHttps] = useState("");
  const [weChatHttps, setweChatHttps] = useState("");
  const [weiboHttps, setweiboHttps] = useState("");

  const [webSiteSaveButtonToggle, setWebsiteSaveButtonToggle] = useState(true);
  const [websiteDeleteId, setWebsiteDeleteId] = useState("");

  // Website url get api
  const websiteUrlGetApi = async () => {
    setCommonState({...commonState,pageLoader:true});
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerSavedWebsiteUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonState({...commonState,pageLoader:false});
      const data = await res.json();
      if (data?.data?.length > 0) {
        setWebsiteInput(data?.data);
      } else {
        setWebsiteInput([{ websiteUrl: "" }]);
        setWebsiteSaveButtonToggle(false);
      };
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

  // website post api
  const websiteApi = async () => {
    setCommonState({ ...commonState, clientPostLoader: true });
    const keyValue = {
      webUrl: websiteInput,
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
      `${process.env.REACT_APP_BASE_URL}speaker/SpeakerSavedWebsiteUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonState({ ...commonState, clientPostLoader: false });
      websiteUrlGetApi();
      toast.warn(data.message);
      setWebsiteSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonState({ ...commonState, clientPostLoader: false });
      toast.warn(error.message);
    }
  };

  // Delete website url data api
  const deleteWebsiteUrlApi = async () => {
    setCommonState({ ...commonState, clientLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerSavedWebsiteUrl/${websiteDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      websiteUrlGetApi();
      setCommonState({ ...commonState, clientLoader: false });
      setCommonState({ ...commonState, clientDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonState({ ...commonState, clientLoader: false });
      setCommonState({ ...commonState, clientDelete: false });
    }
  };

  //   Handle slides & presentattion validation
  const handleWebsiteSocialValidation = (e) => {
    e.preventDefault();
    if (!!websiteInput?.map((data) => data.websiteUrl).includes("")) {
      toast.warn("Link is required website field");
    } else if (
      !websiteInput?.map((data) => data.websiteUrl).includes("") &&
      !websiteRegex.test([websiteInput?.map((data) => data.websiteUrl).at(-1)])
    ) {
      toast.warn("Invalid link in website field");
    } else {
      websiteApi();
    }
  };

  // handle current input change
  const handlewebsiteInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...websiteInput];
    list[index][name] = value;
    setWebsiteInput(list);
  };

  // handle current click event of the Remove button
  const handleVideoRemoveClick = (index, delId) => {
    setWebsiteDeleteId(delId);
    if (!webSiteSaveButtonToggle && !delId) {
      const list = [...websiteInput];
      list.splice(index, 1);
      setWebsiteInput(list);
      setWebsiteSaveButtonToggle(false);
    } else {
      setCommonState({ ...commonState, clientDelete: true });
    }
  };

  // handle current click event of the Add button
  const handleVideoAddClick = () => {
    setWebsiteInput([...websiteInput, { websiteUrl: "" }]);
  };

  // social media post api
  const postSocialMediaApi = async () => {
    setCommonState({ ...commonState, loader: true });
    const loginKeyValue = {
      twitter: twitterHttps,
      linkedin: linkdinHttps,
      facebook: facebookHttps,
      youtubeChannel: youtubeHttps,
      priscope: periscopHttps,
      tiktok: tiktokHttps,
      instagram: instagramHttps,
      medium: mediumHttps,
      snapchat: spanchatHttps,
      skype: skypeHttps,
      wechat: weChatHttps,
      weibo: weiboHttps,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerSavedSocialMediaUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      getSocialMediaApi();
      toast.warn(data.message);
      setCommonState({ ...commonState, loader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      toast.warn(error.message);
      setCommonState({ ...commonState, loader: false });
    }
  };

  // social media get api
  const getSocialMediaApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerSavedSocialMediaUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setTwitterHttps(data?.data?.twitter);
      setLinkdinHttps(data?.data?.linkedin);
      setFacebookHttps(data?.data?.facebook);
      setYoutubeHttps(data?.data?.youtubeChannel);
      setInstagramHttps(data?.data?.instagram);
      setPeriscopHttps(data?.data?.priscope);
      setTiktokHttps(data?.data?.tiktok);
      setInstagramHttps(data?.data?.instagram);
      setMediumHttps(data?.data?.medium);
      setSpanchatHttps(data?.data?.snapchat);
      setSkypeHttps(data?.data?.skype);
      setweChatHttps(data?.data?.wechat);
      setweiboHttps(data?.data?.weibo);
    }
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      toast.warn(error.message);
    }
  };

  //   const skypeLinkRegex = /^https?:\/\/(?:www\.)?skype\.com\/(?:[a-z]{2}-[a-z]{2}\/)?invite\/[a-zA-Z0-9-_]+\/?$/;

  //   console.log("verify",skypeLinkRegex.test("https://join.skype.com/invite/ulNHSS6WIqXa"));

  // const skypeRegex = /^([a-zA-Z0-9._-]+)@(skype|hotmail|live|outlook)\.com$/;

  // console.log("haka",skypeRegex.test("https://join.skype.com/invite/ulNHSS6WIqXa"));

  //   handle social media input field validation
  const handleSocialhttpValidation = (e) => {
    e.preventDefault();
    if (!twitterRegex.test(twitterHttps) && twitterHttps) {
      toast.warn("Invalid twitter url!");
    } else if (!linkdinRegex.test(linkdinHttps) && linkdinHttps) {
      toast.warn("Invalid linkdin url!");
    } else if (!facebookRegex.test(facebookHttps) && facebookHttps) {
      toast.warn("Invalid facebook url!");
    } else if (!youtubeChannelRege.test(youtubeHttps) && youtubeHttps) {
      toast.warn("Invalid youtube channel url!");
    } else if (!periscopeRegex.test(periscopHttps) && periscopHttps) {
      toast.warn("Invalid periscope url!");
    } else if (!tiktokRegex.test(tiktokHttps) && tiktokHttps) {
      toast.warn("Invalid tiktok url!");
    } else if (!instagarmRegex.test(instagramHttps) && instagramHttps) {
      toast.warn("Invalid instagram url!");
    } else if (!mediumRegex.test(mediumHttps) && mediumHttps) {
      toast.warn("Invalid medium url!");
    } else if (!spanchatRegex.test(spanchatHttps) && spanchatHttps) {
      toast.warn("Invalid snapchat url!");
    } else if (!skypeRegex.test(skypeHttps) && skypeHttps) {
      toast.warn("Invalid skype url!");
    } else if (!wechatRegex.test(!weChatHttps) && weChatHttps) {
      toast.warn("Invalid wechat url!");
    } else if (!weiboRegex.test(weiboHttps) && weiboHttps) {
      toast.warn("Invalid webio url!");
    } else if (
      twitterHttps ||
      linkdinHttps ||
      facebookHttps ||
      youtubeHttps ||
      periscopHttps ||
      tiktokHttps ||
      instagramHttps ||
      mediumHttps ||
      spanchatHttps ||
      skypeHttps ||
      weChatHttps ||
      weiboHttps
    ) {
      postSocialMediaApi();
    }
  };

  useEffect(() => {
    getSocialMediaApi();
    websiteUrlGetApi();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const [websiteInputIndex, setWebsiteInputIndex] = useState();
  useEffect(() => {
    websiteInput?.map((ele, ind) => setWebsiteInputIndex(ind));
  }, [websiteInput]);

  return (
    <Fragment>
      {commonState.pageLoader && <Loader/>}
      <Helmet>
        <title>Website-Social</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-website-social">
          <div className="mp-form-heading">Website Social</div>
          <form action="" className="row">
            {/* video input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Website
              </label>
              <div className="generate-panel-head">
                {websiteInput &&
                  websiteInput?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <input
                            type="text"
                            placeholder="https://..."
                            value={x.websiteUrl}
                            name="websiteUrl"
                            onChange={(e) => handlewebsiteInputChange(e, i)}
                            className={`form-control ${
                              !websiteInput
                                ?.map((data) => data.websiteUrl)
                                .includes("") &&
                              !websiteRegex.test([
                                websiteInput
                                  ?.map((data) => data.websiteUrl)
                                  .at(-1),
                              ])
                                ? `error-message`
                                : ``
                            }`}
                          />
                        </div>
                        {websiteInput.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleVideoRemoveClick(i, x?._id)}
                            >
                              <i>
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {websiteInput.length - 1 === websiteInputIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleVideoAddClick();
                      setWebsiteSaveButtonToggle(false);
                    }}
                  >
                    <i className="add-new-icon">
                      <FaPlus />
                    </i>{" "}
                    &nbsp;add new
                  </button>
                </div>
              )}
            </div>

            <div className="sap-btn-light mt-4">
              <button
                type="button"
                onClick={(e) => handleWebsiteSocialValidation(e)}
              >
                Website save details
                <span
                  {...(commonState.clientPostLoader && { disabled: true })}
                  className="btn-loader"
                >
                  {commonState.clientPostLoader && <FaCircleNotch />}
                </span>
              </button>
              <div className="divider"></div>
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Twitter
              </label>
              <input
                type="text"
                className={`form-control ${
                  !twitterRegex.test(twitterHttps) && twitterHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={twitterHttps}
                onChange={(e) => setTwitterHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                LinkedIn
              </label>
              <input
                type="text"
                className={`form-control ${
                  !linkdinRegex.test(linkdinHttps) && linkdinHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={linkdinHttps}
                onChange={(e) => setLinkdinHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Facebook
              </label>
              <input
                type="text"
                className={`form-control ${
                  !facebookRegex.test(facebookHttps) && facebookHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={facebookHttps}
                onChange={(e) => setFacebookHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Youtube channel
              </label>
              <input
                type="text"
                className={`form-control ${
                  !youtubeChannelRege.test(youtubeHttps) && youtubeHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={youtubeHttps}
                onChange={(e) => setYoutubeHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Periscope
              </label>
              <input
                type="text"
                className={`form-control ${
                  !periscopeRegex.test(periscopHttps) && periscopHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="rtmp://..."
                value={periscopHttps}
                onChange={(e) => setPeriscopHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Tiktok
              </label>
              <input
                type="text"
                className={`form-control ${
                  !tiktokRegex.test(tiktokHttps) && tiktokHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={tiktokHttps}
                onChange={(e) => setTiktokHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Instagram
              </label>
              <input
                type="text"
                className={`form-control ${
                  !instagarmRegex.test(instagramHttps) && instagramHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={instagramHttps}
                onChange={(e) => setInstagramHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Medium
              </label>
              <input
                type="text"
                className={`form-control ${
                  !mediumRegex.test(mediumHttps) && mediumHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={mediumHttps}
                onChange={(e) => setMediumHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Snapchat
              </label>
              <input
                type="text"
                className={`form-control ${
                  !spanchatRegex.test(spanchatHttps) && spanchatHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={spanchatHttps}
                onChange={(e) => setSpanchatHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Skype
              </label>
              <input
                type="text"
                className={`form-control ${
                  !skypeRegex.test(skypeHttps) && skypeHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={skypeHttps}
                onChange={(e) => setSkypeHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                WeChat
              </label>
              <input
                type="text"
                className={`form-control ${
                  !wechatRegex.test(!weChatHttps) && weChatHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={weChatHttps}
                onChange={(e) => setweChatHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Weibo
              </label>
              <input
                type="text"
                className={`form-control ${
                  !weiboRegex.test(weiboHttps) && weiboHttps
                    ? `error-message`
                    : ``
                }`}
                placeholder="https://..."
                value={weiboHttps}
                onChange={(e) => setweiboHttps(e.target.value)}
              />
            </div>
            <div className="divider"></div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonState.loader && { disabled: true })}
                onClick={(e) => handleSocialhttpValidation(e)}
              >
                Save social media link details
                <span className="btn-loader">
                  {commonState.loader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Current/Past delete modal section start */}
      <Modal
        show={commonState.clientDelete}
        onHide={() => setCommonState({ ...commonState, clientDelete: false })}
        id="websiteurl-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete website url?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonState({ ...commonState, clientDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonState.clientLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteWebsiteUrlApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonState.clientLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default WebsiteSocial;
