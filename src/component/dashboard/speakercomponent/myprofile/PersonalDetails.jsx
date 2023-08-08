import React, { Fragment, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaCircleNotch, FaPen } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import Auth from "../../../../auth/Auth";
import Loader from "../../../loader/Loader";
import MyProfileSidebar from "./MyProfileSidebar";
import ImgDropAndCrop from "./cropImage/ImgDropAndCrop";

const PersonalDetails = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const { setUserImage, setCommonData, commonData } = useContext(AppContext);

  const [bioDeleteId, setBioDelete] = useState("");
  const [bioSaveButtonToggle, setBioSaveButtonToggle] = useState(true);
  const [inputList, setInputList] = useState([
    { bioTitle: "", bio: "", visible: false },
  ]);
  const [myProfile, setMyProfile] = useState({
    loader: false,
    bioDelete: false,
    delLoader: false,
    profileImageLoader: false,
    detailsLoadr: false,
    coverImageUploadLoader: false,
    deleteProfileImageLoader: false,
    deleteCoverImageLoader: false,
    pageLoader:false
  });

  const [fullName, setFullName] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [chooseMe, setChooseMe] = useState("");
  const [storeState, setStoreState] = useState([]);
  const [storeCity, setStoreCity] = useState([]);
  const [storeCountry, setStoreCountry] = useState([]);
  const [getApiProfileImage, setGetProfileImage] = useState("");
  const [getApiCoverImage, setGetCoverImage] = useState("");
  const [getState, setGetState] = useState("");
  const [getCity, setGetCity] = useState("");
  const [getCountry, setGetCountry] = useState("");

  // handle input change
  const handleInputChange = (e, index) => {
    let { name, value, checked } = e.target;
    if (name === "visible") {
      value = checked;
    }
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // Delete biographics api
  const deleteBioGraphicsApi = async () => {
    setMyProfile({ ...myProfile, delLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteBio/${bioDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      biographiesGetApi();
      setMyProfile({ ...myProfile, delLoader: false });
      setMyProfile({ ...myProfile, bioDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setMyProfile({ ...myProfile, delLoader: false });
      setMyProfile({ ...myProfile, bioDelete: false });
    }
  };

  // handle biographies delete function
  const handleDeleteBioGraphics = (index, delId) => {
    setBioDelete(delId);
    if (!bioSaveButtonToggle && !delId) {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
      setBioSaveButtonToggle(false);
    } else {
      setMyProfile({ ...myProfile, bioDelete: true });
    }
  };

  // handle click event of the Add button
  const handleAddClick = (i) => {
    setInputList([...inputList, { bioTitle: "", bio: "", visible: false }]);
  };
  // Get details profile api
  const getProfileDetailsApi = async () => {
    setMyProfile({...myProfile,pageLoader:true});
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getDetailProfile`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setMyProfile({...myProfile,pageLoader:false});
      Auth.getSidebarProfileNameAndImage(data?.data?.speakerData);
      setFullName(data?.data?.speakerData?.fullName);
      setGetEmail(data?.data?.speakerData?.email);
      setCommonData({
        ...commonData,
        userData: data?.data?.speakerData?.fullName,
      });
      setGetProfileImage(data?.data?.speakerData?.profileImage);
      setUserImage(data?.data?.speakerData?.profileImage);
      setGetCoverImage(data?.data?.coverImage?.coverImage);
      setCredential(
        credential ? credential : data?.data?.profile?.professionalCredentials
      );
      setGender(data?.data?.speakerData?.gender);
      setGetCountry(data?.data?.profile?.country);
      setGetState(data?.data?.profile?.state);
      setGetCity(data?.data?.profile?.city);
      setChooseMe(data?.data?.profile?.whyChooseMe);
    };
    if (res.status >= 400 && res.status <= 500) {
      setMyProfile({...myProfile,pageLoader:false});
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setMyProfile({ ...myProfile, detailsLoadr: false });
      toast.warn(error?.message);
    };
  };

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

  // Biographies get api
  const biographiesGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getBio`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if ((data?.data).length > 0) {
        setInputList(data?.data);
      } else {
        setInputList([{ bioTitle: "", bio: "", visible: false }]);
        setBioSaveButtonToggle(false);
      }
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

  // Biographies post api
  const biographiesApi = async () => {
    setMyProfile({ ...myProfile, loader: true });
    const keyValue = {
      biographiesData: inputList,
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
      `${process.env.REACT_APP_BASE_URL}speaker/bioDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setMyProfile({ ...myProfile, loader: false });
      biographiesGetApi();
      toast.warn(data.message);
      setBioSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setMyProfile({ ...myProfile, loader: false });
      toast.warn(error.message);
    }
  };

  // Profile image upload api
  const profileImageApi = async (image) => {
    setMyProfile({ ...myProfile, profileImageLoader: true });
    const formData = new FormData();
    formData.append("profileImage", image);
    const requestMethod = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/uploadProfilePic`,
      requestMethod
    );
    if (res.status >= 200 && res.status <= 399) {
      getProfileDetailsApi();
      const getProfileImage = URL.createObjectURL(image);
      setProfileImage(getProfileImage);
      setMyProfile({ ...myProfile, profileImageLoader: false });
      toast.warn("Profile image uploaded successfully");
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error?.message);
      setMyProfile({ ...myProfile, profileImageLoader: false });
    }
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
      `${process.env.REACT_APP_BASE_URL}speaker/deleteProfilePic`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 399) {
      getProfileDetailsApi();
      setProfileImage("");
      setMyProfile({ ...myProfile, deleteProfileImageLoader: false });
      // const data = await res.json();
      toast.warn("Profile Image removed successfully");
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setMyProfile({ ...myProfile, deleteProfileImageLoader: false });
      toast.warn(error?.message);
    }
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
      `${process.env.REACT_APP_BASE_URL}speaker/uploadCoverImage`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setMyProfile({ ...myProfile, coverImageUploadLoader: false });
      getProfileDetailsApi();
      const getBannerImage = URL.createObjectURL(e.target.files[0]);
      setBannerImage(getBannerImage);
      const data = await res.json();
      toast.warn(data?.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error?.message);
      setMyProfile({ ...myProfile, coverImageUploadLoader: false });
    }
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
      `${process.env.REACT_APP_BASE_URL}speaker/deleteCoverPic`,
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
      gender: gender,
      professionalCredentials: credential,
      country: getCountry,
      state: getState,
      city: getCity,
      whyChooseMe: chooseMe,
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
      `${process.env.REACT_APP_BASE_URL}speaker/detailProfile`,
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
      }
      const error = await res.json();
      setMyProfile({ ...myProfile, detailsLoadr: false });
      toast.warn(error?.message);
    }
  };

  // Handle personal details validation
  const handlePerDeaiVali = (e) => {
    e.preventDefault();
    if (!fullName) {
      toast.warn("Fullname is required");
    } else if (fullName.length < 4) {
      toast.warn("Fullname length must be atleast 4 characters long");
    } else if (!credential) {
      toast.warn("Please enter your professional qualifications");
    } else if (credential.length === 1) {
      toast.warn("Credential length must be atleast 2 or 3 characters long");
    } else if (!gender) {
      toast.warn("Please select the gender");
    } else if (!getCountry) {
      toast.warn("Country is reuired!");
    } else if (!getState) {
      toast.warn("State is reuired!");
    } else if (!getCity) {
      toast.warn("City is reuired!");
    } else if (!chooseMe) {
      toast.warn("Choose me field is reuired!");
    } else {
      detailsProfileApi();
    }
  };

  //   Handle my profile validation
  const handleMyPfofileValidation = (e) => {
    e.preventDefault();
    if (!!inputList.map((data) => data.bioTitle).includes("")) {
      toast.warn("Bio title is required");
    } else if (!!inputList.map((data) => data.bio).includes("")) {
      toast.warn("Bio is required");
    } else {
      biographiesApi();
    }
  };

  useEffect(() => {
    countryApi();
    biographiesGetApi();
    getProfileDetailsApi();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    getCountry && stateApi();
    // eslint-disable-next-line
  }, [getCountry]);

  useEffect(() => {
    getCountry && getState && cityApi();
    // eslint-disable-next-line
  }, [getCountry, getState]);

  const [inputListIndex, setInputListIndex] = useState();
  useEffect(() => {
    inputList?.map((ele, ind) => setInputListIndex(ind));
  }, [inputList]);

  const profileImageApiss = () => {};
  return (
    <Fragment>
      {myProfile.pageLoader && <Loader/>}
      <Helmet>
        <title>Personal-Details</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-personaldetails">
          <div className="mp-form-heading">Personal Details</div>
          <form action="" className="row">
            <div className="profile-img-head">
              <label htmlFor="" className="form-label">
                Profile image
              </label>
              <div className="profile-img-inns">
                {getApiProfileImage && (
                  <div className="pf-img-edit-btn sap-btn-light">
                    <label htmlFor="mp-upload-photo1" className="">
                      <FaPen />
                    </label>
                  </div>
                )}
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

                <ImgDropAndCrop
                  selectImage={profileImageApiss}
                  cropImage={profileImageApi}
                />
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
                className="form-control"
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
                Professional credentials<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                className="form-control"
                placeholder="Enter your credential..."
              />
              <span className="form-caption text-grey">
                Add your 2 or 3-letter title(s) such as CSP, MBA or other.
              </span>
            </div>
            <div className="col-md-12 form-group-head fill-gender">
              <label htmlFor="" className="form-label">
                Gender<sup className="text-red">*</sup>
              </label>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={gender === "male"}
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={gender === "female"}
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={gender === "other"}
                    value="other"
                    onChange={(e) => setGender(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Other
                  </label>
                </div>
              </div>
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
                      remove
                    </button>
                  </div>
                )}
                <div className="sap-btn-light"></div>
              </div>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Country<sup className="text-red">*</sup>
              </label>
              <select
                className="form-select"
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
                className="form-select"
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
                className="form-select"
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
                why choose me?<sup className="text-red">*</sup>
              </label>
              <textarea
                cols="30"
                rows="10"
                placeholder="Please enter feedback..."
                value={chooseMe}
                onChange={(e) => setChooseMe(e.target.value)}
                className="form-control"
              ></textarea>
              <span className="form-caption text-grey">
                Your "elevator pitch" - not just your job title but what makes
                you a unique speaker/trainer/moderator. If you leave this field
                empty, the first paragraph of your Bio will appear on your
                speaker card. The why choose me section on your profile will
                still remain empty.
              </span>
            </div>

            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(myProfile.detailsLoadr && { disabled: true })}
                onClick={(e) => handlePerDeaiVali(e)}
              >
                save details{" "}
                <span className="btn-loader">
                  {myProfile.detailsLoadr && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Biographies
              </label>
              <div className="generate-panel-head">
                {inputList &&
                  inputList?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={
                                x.visible === "true" || x.visible === true
                                  ? true
                                  : false
                              }
                              value={x.visible}
                              name="visible"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Visible
                            </label>
                          </div>
                        </div>
                        <span className="form-caption text-grey">
                          You can hide or show your biographies on your profile
                          page.
                        </span>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            bio tab title<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.bioTitle}
                            name="bioTitle"
                            onChange={(e) => handleInputChange(e, i)}
                            className="form-control"
                            placeholder="Your Bio Title..."
                          />
                          <span className="form-caption text-grey">
                            If you have two or more biographies, you can give a
                            title to them, that'll be displayed on the tab.
                          </span>
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            bio<sup className="text-red">*</sup>
                          </label>
                          <textarea
                            type="text"
                            cols="30"
                            rows="10"
                            name="bio"
                            placeholder="Your Bio..."
                            value={x.bio}
                            onChange={(e) => handleInputChange(e, i)}
                            className="form-control"
                          ></textarea>
                        </div>
                        {inputList.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleDeleteBioGraphics(i, x?._id)}
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
              {inputList.length - 1 === inputListIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClick(inputListIndex);
                      setBioSaveButtonToggle(false);
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
                {...(myProfile.loader && { disabled: true })}
                onClick={(e) => handleMyPfofileValidation(e)}
              >
                save bio details
                <span className="btn-loader">
                  {myProfile.loader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Loader/> */}

      {/* bio delete modal section start */}
      <Modal
        show={myProfile.bioDelete}
        onHide={() => setMyProfile({ ...myProfile, bioDelete: false })}
        className="bio-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete bio data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() => setMyProfile({ ...myProfile, bioDelete: false })}
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(myProfile.delLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteBioGraphicsApi()}
              >
                Yes
                <span className="btn-loader">
                  {myProfile.delLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default PersonalDetails;
