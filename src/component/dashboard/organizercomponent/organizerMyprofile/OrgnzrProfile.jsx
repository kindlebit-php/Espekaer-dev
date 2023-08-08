import React, { Fragment, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import { AppContext } from "../../../context/AppContext";

import OrgnzrMyProfileSidebar from "./OrgnzrMyProfileSidebar";

// import ImgDropAndCrop from "./cropImage/ImgDropAndCrop";

const OrgnzrProfile = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const { setUserImage, setCommonData, commonData } = useContext(AppContext);

  const [myProfile, setMyProfile] = useState({
    loader: false,
    bioDelete: false,
    delLoader: false,
    profileImageLoader: false,
    detailsLoadr: false,
    coverImageUploadLoader: false,
    deleteProfileImageLoader: false,
    deleteCoverImageLoader: false,
  });

  const [fullName, setFullName] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [storeState, setStoreState] = useState([]);
  const [storeCity, setStoreCity] = useState([]);
  const [storeCountry, setStoreCountry] = useState([]);
  const [getApiProfileImage, setGetProfileImage] = useState("");
  
  const [getState, setGetState] = useState("");
  const [getCity, setGetCity] = useState("");
  const [getCountry, setGetCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [twitterHttps, setTwitterHttps] = useState("");
  const [linkdinHttps, setLinkdinHttps] = useState("");
  const [facebookHttps, setFacebookHttps] = useState("");
  const [getApiCoverImage, setGetCoverImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  
  const websiteRegex = /^((http|https|www):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$)/i;
  const twitterRegex =
    /^https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})$/;
  const linkdinRegex = /^https:\/\/www.linkedin.com\/in\/[a-zA-Z0-9-]+\/?$/;
  const facebookRegex = /https?:\/\/(www\.)?facebook\.com\/.+$/;

  // Get all country api
  const countryApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAllCountries`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setStoreCountry(data?.data);
  };

  // Get all state api
  const stateApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getStatesOfCountry/${getCountry}`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setStoreState(data?.data);
  };

  // Get all city api
  const cityApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getCitiesOfState/${getCountry}/${getState}`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setStoreCity(data?.data);
  };

  // Get details profile api
  const getProfileDetailsApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/getDetailProfile`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      Auth.getSidebarProfileNameAndImage(data?.data?.speakerData);
      Auth.getSidebarProfileNameAndImageOrganizer(data?.data[0]);
      setFullName(data?.data[0]?.fullName);
      setGetEmail(data?.data[0]?.email);
      setCommonData({
        ...commonData,
        userData: data?.data?.speakerData?.fullName,
      });
      setGetProfileImage(data?.data[0]?.profileImage);
      console.log("??????????????????",data?.data[0]?.coverimagesData[0]?.coverImage);
      setUserImage(data?.data[0]?.profileImag);
      setGetCountry(data?.data[0]?.organizerDetailData[0]?.country);
      setGetState(data?.data[0]?.organizerDetailData[0]?.state);
      setGetCity(data?.data[0]?.organizerDetailData[0]?.city);
      setShortDesc(data?.data[0]?.organizerDetailData[0]?.short_des);
      setWebsite(data?.data[0]?.organizerDetailData[0]?.websiteUrl);
      setTwitterHttps(data?.data[0]?.organizerDetailData[0]?.twitter);
      setLinkdinHttps(data?.data[0]?.organizerDetailData[0]?.linkedin);
      setFacebookHttps(data?.data[0]?.organizerDetailData[0]?.facebook);
      setGetCoverImage(data?.data[0]?.coverimagesData[0]?.coverImage);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setMyProfile({ ...myProfile, detailsLoadr: false });
      toast.warn(error?.message);
    };
  };

  // Profile image upload api
  const profileImageApi = async (e) => {
    setMyProfile({ ...myProfile, profileImageLoader: true });
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    const requestMethod = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/uploadProfilePic`,
      requestMethod
    );
    if (res.status >= 200 && res.status <= 399) {
      getProfileDetailsApi();
      const getProfileImage = URL.createObjectURL(e.target.files[0]);
      setProfileImage(getProfileImage);
      setMyProfile({ ...myProfile, profileImageLoader: false });
      toast.warn("Profile image uploaded successfully");
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error?.message);
      setMyProfile({ ...myProfile, profileImageLoader: false });
    };
  };

  // Delete profile image api
  const deleteProfileImageApi = async () => {
    setMyProfile({ ...myProfile, deleteProfileImageLoader: true });
    const requestKey = {
      path: getApiProfileImage,
    };
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(requestKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/deleteProfilePic`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 399) {
      getProfileDetailsApi();
      setProfileImage("");
      setMyProfile({ ...myProfile, deleteProfileImageLoader: false });
      toast.warn("Profile Image removed successfully");
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setMyProfile({ ...myProfile, deleteProfileImageLoader: false });
      toast.warn(error?.message);
    };
  };

  // Delete cover image api
  const deleteCoverImageApi = async () => {
    setMyProfile({ ...myProfile, deleteCoverImageLoader: true });
    const requestKey = {
      path: getApiCoverImage,
    };
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(requestKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/deleteCoverPic`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 399) {
      setMyProfile({ ...myProfile, deleteCoverImageLoader: false });
      const data = await res.json();
      setBannerImage("");
      getProfileDetailsApi();
      toast.warn(data?.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setMyProfile({ ...myProfile, deleteCoverImageLoader: false });
      toast.warn(error?.message);
    }
  };


  // Post details profile api
  const detailsProfileApi = async () => {
    setMyProfile({ ...myProfile, detailsLoadr: true });
    const valueKey = {
      fullName: fullName,
      country: getCountry,
      state: getState,
      city: getCity,
      short_des: shortDesc,
      ...(website ? {websiteUrl:website}:""),
      ...(facebookHttps ? {facebook:facebookHttps}:""),
...(linkdinHttps ? {linkedin:linkdinHttps}:""),
...(twitterHttps ? {twitter:twitterHttps}:"")
    };
    const requestKey = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(valueKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/updateDetailProfile`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      getProfileDetailsApi();
      toast.warn("Personal details saved successfully");
      setMyProfile({ ...myProfile, detailsLoadr: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setMyProfile({ ...myProfile, detailsLoadr: false });
      toast.warn(error?.message);
    };
  };

   // Cover image upload api
   const coverImageApi = async (e) => {
    setMyProfile({ ...myProfile, coverImageUploadLoader: true });
    const formData = new FormData();
    formData.append("coverImage", e.target.files[0]);
    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/uploadCoverImage`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setMyProfile({ ...myProfile, coverImageUploadLoader: false });
      getProfileDetailsApi();
      const getBannerImage = URL.createObjectURL(e.target.files[0]);
      setBannerImage(getBannerImage);
      const data = await res.json();
      toast.warn(data?.message);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error?.message);
      setMyProfile({ ...myProfile, coverImageUploadLoader: false });
    };
  };

  // Handle personal details validation
  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (
      !fullName &&
      !getCountry &&
      !getState &&
      !getCity &&
      !shortDesc &&
      !website &&
      !facebookHttps &&
      !linkdinHttps &&
      !twitterHttps
    ) {
      setErrorMessage(true);
      toast.warn("All fields are required!");
    } else {
      if (!fullName) {
        setErrorMessage(true);
        toast.warn("Fullname is required");
      } else if (fullName.length < 4) {
        setErrorMessage(true);
        toast.warn("Fullname length must be atleast 4 characters long");
      } else if (!getCountry) {
        setErrorMessage(true);
        toast.warn("Country is required!");
      } else if (!getState) {
        setErrorMessage(true);
        toast.warn("State is required!");
      } else if (!getCity) {
        setErrorMessage(true);
        toast.warn("City is required!");
      } else if (!shortDesc) {
        setErrorMessage(true);
        toast.warn("Short description field is required!");
      } else if (!websiteRegex.test(website) && website) {
        toast.warn("Website link is not valid!");
      } else if (!facebookRegex.test(facebookHttps) && facebookHttps) {
        toast.warn("Facebook link is not valid!");
      } else if (!linkdinRegex.test(linkdinHttps) && linkdinHttps) {
        toast.warn("Linkedin link is not valid!");
      } else if (!twitterRegex.test(twitterHttps) && twitterHttps) {
        toast.warn("Twitter link is not valid!");
      } else {
        detailsProfileApi();
      };
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    countryApi();
    getProfileDetailsApi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCountry && stateApi();
    // eslint-disable-next-line
  }, [getCountry]);

  useEffect(() => {
    getCountry && getState && cityApi();
    // eslint-disable-next-line
  }, [getCountry, getState]);

  return (
    <Fragment>
      <Helmet>
        <title>Organizer-My-Profile</title>
      </Helmet>
      <div className="my-profile-page">
        <OrgnzrMyProfileSidebar />
        <div className="mp-right-panel" id="mp-personaldetails">
          <div className="mp-form-heading">Profile</div>
          <form action="" className="row">
            <div className="profile-img-head">
              <label htmlFor="" className="form-label">
                Profile image
              </label>
              <div className="profile-img-inns">
                {/* {getApiProfileImage && (
                  <div className="pf-img-edit-btn sap-btn-light">
                    <label htmlFor="mp-upload-photo1" className="">
                      <FaPen />
                    </label>
                  </div>
                )} */}
                <div className="profile-img-inner">
                  <img
                    src={`${
                      profileImage
                        ? profileImage
                        : getApiProfileImage
                        ? `${process.env.REACT_APP_IMAGE_URL}${getApiProfileImage}`
                        : `assets/image/user-placeholder.jpg`
                    }`}
                    alt="test1"
                  />
                </div>
              </div>

              <div className="dual-btn">
                {!getApiProfileImage && (
                  <div className="sap-btn-dark">
                    <label htmlFor="mp-upload-photo1">
                      upload
                      <span className="btn-loader">
                        {myProfile.profileImageLoader && <FaCircleNotch />}
                      </span>
                    </label>
                  </div>
                )}
                <input
                  type="file"
                  name="photo"
                  id="mp-upload-photo1"
                  style={{ display: "none" }}
                  onChange={(e) => profileImageApi(e)}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                />

                {/* <ImgDropAndCrop
                  selectImage={profileImageApiss}
                  cropImage={profileImageApi}
                /> */}
                {(getApiProfileImage || profileImage) && (
                  <div className="sap-btn-dark">
                    <button
                      type="button"
                      {...(myProfile.deleteProfileImageLoader && {
                        disabled: true,
                      })}
                      onClick={() => deleteProfileImageApi()}
                    >
                      remove
                      <span className="btn-loader">
                        {myProfile.deleteProfileImageLoader && (
                          <FaCircleNotch />
                        )}
                      </span>
                    </button>
                  </div>
                )}
                <div className="sap-btn-light">
                  {/* <button type="button">crop</button> */}
                </div>
              </div>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                full name<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errorMessage && !fullName ? `error-message` : ``
                }`}
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyPress={(e) => {
                  if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Email<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your email"
                value={getEmail}
                disabled
                onChange={(e) => setGetEmail(e.target.value)}
              />
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Country<sup className="text-red">*</sup>
              </label>
              <select
                className={`form-select ${
                  errorMessage && !getCountry ? `error-message` : ``
                }`}
                defaultValue="0"
                aria-label="Default select example"
                onChange={(e) => setGetCountry(e.target.value)}
              >
                <option value="">
                  {(storeCountry &&
                    storeCountry?.filter(
                      (data) => data?.isoCode === getCountry
                    ))[0]?.name
                    ? (storeCountry &&
                        storeCountry?.filter(
                          (data) => data?.isoCode === getCountry
                        ))[0]?.name
                    : "Select"}
                </option>
                {storeCountry &&
                  storeCountry?.map((data, index) => {
                    const { name, isoCode } = data;
                    return (
                      <option key={index} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                State<sup className="text-red">*</sup>
              </label>
              <select
                 className={`form-select ${
                  errorMessage && !getState ? `error-message` : ``
                }`}
                aria-label="Default select example"
                defaultValue="0"
                onChange={(e) => setGetState(e.target.value)}
              >
                <option value="">
                  {(storeState &&
                    storeState?.filter((data) => data?.isoCode === getState))[0]
                    ?.name
                    ? (storeState &&
                        storeState?.filter(
                          (data) => data?.isoCode === getState
                        ))[0]?.name
                    : "Select"}
                </option>
                {storeState &&
                  storeState?.map((data, index) => {
                    const { name, isoCode } = data;
                    return (
                      <option key={index} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                City<sup className="text-red">*</sup>
              </label>
              <select
                className={`form-select ${
                  errorMessage && !getCity ? `error-message` : ``
                }`}
                aria-label="Default select example"
                defaultValue="0"
                onChange={(e) => setGetCity(e.target.value)}
              >
                <option value="">{getCity ? getCity : "Select"}</option>
                {storeCity &&
                  storeCity?.map((data, index) => {
                    const { name, isoCode } = data;
                    return (
                      <option key={index} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Short description<sup className="text-red">*</sup>
              </label>
              <textarea
                cols="30"
                rows="10"
                placeholder="Please enter feedback..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className={`form-control ${
                  errorMessage && !shortDesc ? `error-message` : ``
                }`}
              ></textarea>
            </div>
            <div className="col-md-12 form-group upload-cover-banner">
              <label htmlFor="" className="form-label">
                cover banner
              </label>
              <div className="profile-img-inner">
                <img
                  src={`${
                    bannerImage
                      ? bannerImage
                      : getApiCoverImage
                      ? `${process.env.REACT_APP_IMAGE_URL}${getApiCoverImage}`
                      : `assets/image/cover.png`
                  }`}
                  alt="cover"
                />
              </div>
              <div className="dual-btn">
                {!getApiCoverImage && (
                  <div className="sap-btn-dark">
                    <label htmlFor="mp-upload-photo2">
                      upload
                      <span className="btn-loader">
                        {myProfile.coverImageUploadLoader && <FaCircleNotch />}
                      </span>
                    </label>
                  </div>
                )}
                <input
                  type="file"
                  name="photo"
                  id="mp-upload-photo2"
                  style={{ display: "none" }}
                  onChange={(e) => coverImageApi(e)}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                />
                {getApiCoverImage && (
                  <div className="sap-btn-dark">
                    <button type="button" onClick={() => deleteCoverImageApi()}>
                      remove<span className="btn-loader">
                        {myProfile.deleteCoverImageLoader && <FaCircleNotch />}
                      </span>
                    </button>
                  </div>
                )}
                <div className="sap-btn-light"></div>
              </div>
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                website (Optional)
              </label>
              <input
                type="text"
                className={`form-control ${(website && !websiteRegex.test(website)) ? `error-message` : ``
                }`}
                placeholder="https://..."
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Facebook (Optional)
              </label>
              <input
                type="text"
                className={`form-control ${(facebookHttps && !facebookRegex.test(facebookHttps)) ? `error-message` : ``
                }`}
                placeholder="https://..."
                value={facebookHttps}
                onChange={(e) => setFacebookHttps(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                LinkedIn (Optional)
              </label>
              <input
                type="text"
                className={`form-control ${(linkdinHttps && !linkdinRegex.test(linkdinHttps)) ? `error-message` : ``
                }`}
                placeholder="https://..."
                value={linkdinHttps}
                onChange={(e) => setLinkdinHttps(e.target.value)}
              />
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Twitter (Optional)
              </label>
              <input
                type="text"
                className={`form-control ${(twitterHttps && !twitterRegex.test(twitterHttps)) ? `error-message` : ``
                }`}
                placeholder="https://..."
                value={twitterHttps}
                onChange={(e) => setTwitterHttps(e.target.value)}
              />
            </div>
            <div className="sap-btn-light mt-4">
              <button type="button" onClick={(e) => handleSaveDetails(e)}>
                save details
                <span className="btn-loader">
                  {myProfile.detailsLoadr && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OrgnzrProfile;
