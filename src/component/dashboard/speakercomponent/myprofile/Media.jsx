import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaCircleNotch, FaDownload } from "react-icons/fa";

import Auth from "../../../../auth/Auth";

import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const Media = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");
  const [commonLoader, setCommonLoader] = useState({
    slidesPostLoader: false,
    slidesDelete: false,
    slidesLoader: false,
    pressPostLoader: false,
    pressDelete: false,
    pressLoader: false,
    galleryPostLoader: false,
    galleryDelete: false,
    galleryLoader: false,
    videoPostLoader: false,
    videoDelete: false,
    videoLoader: false,
    pageLoader:false
  });
  const [slidesSaveButtonToggle, setSlidesSaveButtonToggle] = useState(true);
  const [pressSaveButtonToggle, setPressSaveButtonToggle] = useState(true);
  const [gallerySaveButtonToggle, setGallerySaveButtonToggle] = useState(true);
  const [videoSaveButtonToggle, setVideoSaveButtonToggle] = useState(true);
  const [slidesDeleteId, setSlidesDelete] = useState("");
  const [pressDeleteId, setPressDelete] = useState("");
  const [galleryDeleteId, setGalleryDelete] = useState("");
  const [videoDeleteId, setVideoDelete] = useState("");
  const [slidesDataIndex, setSlidesDataIndex] = useState();
  const [informationDataIndex, setInformationDataIndex] = useState();
  const [videoInputIndex, setVideoInputIndex] = useState();
  const [galleryDataIndex, setGalleryDataIndex] = useState();

  const [slidesData, setSlidesData] = useState([
    {
      paresentName: "",
      paresentFiles: "",
      paresentLinks: "",
    },
  ]);

  const [informationData, setInformationData] = useState([
    { informationName: "", informationFiles: "", informationLinks: "" },
  ]);

  const [galleryData, setGalleryData] = useState([
    { galleryName: "", gallery: "" },
  ]);
  const [videoInput, setVideoInput] = useState([{ videoUrl: "" }]);

  const expression = /^((http|https|www):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$)/i;

  // handle paresent click event of the Remove button
  const handleRemoveClickParesent = (index, delId) => {
    setSlidesDelete(delId);
    if (!slidesSaveButtonToggle && !delId) {
      const list = [...slidesData];
      list.splice(index, 1);
      setSlidesData(list);
      setSlidesSaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, slidesDelete: true });
    }
  };

  // handle paresent click event of the Add button
  const handleAddClickParesent = () => {
    setSlidesData([
      ...slidesData,
      {
        paresentName: "",
        paresentFiles: "",
        paresentLinks: "",
      },
    ]);
  };

  // handle information input change
  const handleInformationInputChange = (e, index) => {
    let { name, value, files } = e.target;
    if (name === "informationFiles") {
      value = files[0];
    }
    const list = [...informationData];
    list[index][name] = value;
    setInformationData(list);
  };

  // handle gallery input change
  const handleGalleryInputChange = (e, index) => {
    let { name, value, files } = e.target;
    if (name === "gallery") {
      value = files[0];
    }
    const list = [...galleryData];
    list[index][name] = value;
    setGalleryData(list);
  };

  // handle paresent click event of the Remove button
  const handleRemoveClickInformation = (index, delId) => {
    setPressDelete(delId);
    if (!pressSaveButtonToggle && !delId) {
      const list = [...informationData];
      list.splice(index, 1);
      setInformationData(list);
      setPressSaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, pressDelete: true });
    }
  };

  // handle gallery click event of the Remove button
  const handleRemoveClickGallery = (index, delId) => {
    setGalleryDelete(delId);
    if (!gallerySaveButtonToggle && !delId) {
      const list = [...galleryData];
      list.splice(index, 1);
      setGalleryData(list);
      setGallerySaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, galleryDelete: true });
    }
  };

  // handle paresent click event of the Add button
  const handleAddClickInformation = () => {
    setInformationData([
      ...informationData,
      { informationName: "", informationFiles: "", informationLinks: "" },
    ]);
  };

  // handle gallery click event of the Add button
  const handleAddClickGallery = () => {
    setGalleryData([...galleryData, { galleryName: "", gallery: "" }]);
  };

  // handle current input change
  const handleVideoInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...videoInput];
    list[index][name] = value;
    setVideoInput(list);
  };

  // handle current click event of the Remove button
  const handleVideoRemoveClick = (index, delId) => {
    setVideoDelete(delId);
    if (!videoSaveButtonToggle && !delId) {
      const list = [...videoInput];
      list.splice(index, 1);
      setVideoInput(list);
      setVideoSaveButtonToggle(false);
    } else {
      setCommonLoader({ ...commonLoader, videoDelete: true });
    }
  };

  // handle current click event of the Add button
  const handleVideoAddClick = () => {
    setVideoInput([...videoInput, { videoUrl: "" }]);
  };

  // slides & presentation get api
  const slidesGetApi = async () => {
    setCommonLoader({...commonLoader,pageLoader:true});
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerSlidesAndPresentation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonLoader({...commonLoader,pageLoader:false});
      const data = await res.json();
      if (data?.data?.length > 0) {
        setSlidesData(data?.data);
      } else {
        setSlidesData([
          { paresentName: "", paresentFiles: "", paresentLinks: "" },
        ]);
        setSlidesSaveButtonToggle(false);
      };
    };
    if (res.status >= 400 && res.status <= 500) {
      setCommonLoader({...commonLoader,pageLoader:false});
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
  };

  // press information get api
  const pressInformationGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPressInformation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setInformationData(data?.data);
      } else {
        setInformationData([
          { informationName: "", informationFiles: "", informationLinks: "" },
        ]);
        setPressSaveButtonToggle(false);
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

  // gallery get api
  const galleryGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerGallery`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setGalleryData(data?.data);
      } else {
        setGalleryData([{ galleryName: "", gallery: "" }]);
        setGallerySaveButtonToggle(false);
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

  // video url get api
  const videoUrlGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerVideoUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setVideoInput(data?.data);
      } else {
        setVideoInput([{ videoUrl: "" }]);
        setVideoSaveButtonToggle(false);
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

  // slides & presentation delete api
  const deleteSlidesApi = async () => {
    setCommonLoader({ ...commonLoader, slidesLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerSlidesAndPresentation/${slidesDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      slidesGetApi();
      setCommonLoader({ ...commonLoader, slidesLoader: false });
      setCommonLoader({ ...commonLoader, slidesDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, slidesLoader: false });
      setCommonLoader({ ...commonLoader, slidesDelete: false });
    }
  };

  // press information delete api
  const deletePressInformationApi = async () => {
    setCommonLoader({ ...commonLoader, pressLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPressInformation/${pressDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      pressInformationGetApi();
      setCommonLoader({ ...commonLoader, pressLoader: false });
      setCommonLoader({ ...commonLoader, pressDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, pressLoader: false });
      setCommonLoader({ ...commonLoader, pressDelete: false });
    }
  };

  // gallery delete api
  const deleteGalleryApi = async () => {
    setCommonLoader({ ...commonLoader, galleryLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerGallery/${galleryDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      galleryGetApi();
      setCommonLoader({ ...commonLoader, galleryLoader: false });
      setCommonLoader({ ...commonLoader, galleryDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, galleryLoader: false });
      setCommonLoader({ ...commonLoader, galleryDelete: false });
    }
  };

  // Delete video url api
  const deleteVideoUrlApi = async () => {
    setCommonLoader({ ...commonLoader, videoLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerVideoUrl/${videoDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      videoUrlGetApi();
      setCommonLoader({ ...commonLoader, videoLoader: false });
      setCommonLoader({ ...commonLoader, videoDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, videoLoader: false });
      setCommonLoader({ ...commonLoader, videoDelete: false });
    }
  };

  // slides & presentation post api
  const slidesApi = async () => {
    setCommonLoader({ ...commonLoader, slidesPostLoader: true });
    const formData = new FormData();
    formData.append(
      "speakerSlide",
      JSON.stringify(
        slidesData?.map((data) => [
          {
            paresentName: data?.paresentName,
            paresentLinks: data.paresentLinks,
            id: data?._id,
          },
        ])
      )
    );
    slidesData
      ?.map((data) => data?.paresentFiles)
      ?.map((data) => formData?.append("paresentFiles", data));
    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerSlidesAndPresentation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, slidesPostLoader: false });
      slidesGetApi();
      toast.warn(data.message);
      setSlidesSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, slidesPostLoader: false });
      toast.warn(error.message);
    }
  };

  // press information post api
  const pressInformationPostApi = async () => {
    setCommonLoader({ ...commonLoader, pressPostLoader: true });
    const formData = new FormData();
    formData.append(
      "speakerPressInfo",
      JSON.stringify(
        informationData?.map((data) => [
          {
            informationName: data?.informationName,
            informationLinks: data.informationLinks,
            id: data?._id,
          },
        ])
      )
    );
    informationData
      ?.map((data) => data?.informationFiles)
      ?.map((data) => formData?.append("informationFiles", data));
    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPressInformation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, pressPostLoader: false });
      pressInformationGetApi();
      toast.warn(data.message);
      setPressSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, pressPostLoader: false });
      toast.warn(error.message);
    }
  };

  // gallery post api
  const galleryPostApi = async () => {
    setCommonLoader({ ...commonLoader, galleryPostLoader: true });
    const formData = new FormData();
    formData.append(
      "speakerGalleryData",
      JSON.stringify(
        galleryData?.map((data) => [
          { galleryName: data?.galleryName, id: data?._id },
        ])
      )
    );
    galleryData
      ?.map((data) => data?.gallery)
      ?.map((data) => formData?.append("gallery", data));
    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerGallery`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, galleryPostLoader: false });
      galleryGetApi();
      toast.warn(data.message);
      setGallerySaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, galleryPostLoader: false });
      toast.warn(error.message);
    }
  };

  // Video post api
  const videoPostApi = async () => {
    setCommonLoader({ ...commonLoader, videoPostLoader: true });
    const keyValue = {
      videoData: videoInput,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerVideoUrl`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, videoPostLoader: false });
      videoUrlGetApi();
      toast.warn(data?.message);
      setVideoSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, videoPostLoader: false });
      toast.warn(error.message);
    }
  };

  //   Handle slides & presentattion validation
  const handleSlidesPresentValidation = (e) => {
    e.preventDefault();
    if (slidesData?.map((data) => data.paresentName).includes("")) {
      toast.warn("Kindly input your presentations in the appropriate field");
    } else if (
      slidesData?.map((data) => data.paresentFiles).includes("") &&
      slidesData?.map((data) => data.paresentLinks).includes("")
    ) {
      toast.warn("Please choose whether to upload a file or input a URL");
    } else if (
      !slidesData?.map((data) => data.paresentLinks).includes("") &&
      !expression.test(slidesData?.map((data) => data.paresentLinks))
    ) {
      toast.warn("Incorrect URL format");
    } else {
      slidesApi();
    }
  };

  // handle paresent input change
  const handleParesentInputChange = (e, index) => {
    let { name, value, files } = e.target;
    if (name === "paresentFiles") {
      value = files[0];
    }
    const list = [...slidesData];
    list[index][name] = value;
    setSlidesData(list);
  };

  // handle gallery validation
  const handleGalleryValidation = (e) => {
    e.preventDefault();
    if (galleryData.map((data) => data.galleryName).includes("")) {
      toast.warn("Please describe the content of the image in the text box");
    } else if (galleryData.map((data) => data.gallery).includes("")) {
      toast.warn("Please choose: ppsx, pptx, ppt, pps or odp");
    } else {
      galleryPostApi();
    }
  };
  // handle information save details validations
  const handleInformationSaveDetails = (e) => {
    e.preventDefault();
    if (informationData?.map((data) => data.informationName).includes("")) {
      toast.warn(
        "Kindly input your press information in the appropriate field"
      );
    } else if (
      informationData?.map((data) => data.informationFiles).includes("") &&
      informationData?.map((data) => data.informationLinks).includes("")
    ) {
      toast.warn("Please choose whether to upload a file or input a URL");
    } else if (
      !informationData?.map((data) => data.informationLinks).includes("") &&
      !expression.test(informationData?.map((data) => data.informationLinks))
    ) {
      toast.warn("Incorrect URL format");
    } else {
      pressInformationPostApi();
    }
  };

  // handle video url validations
  const handleVideoValidation = (e) => {
    e.preventDefault();
    if (videoInput?.map((data) => data.videoUrl).includes("")) {
      toast.warn("Please enter the URL");
    } else if (
      !videoInput?.map((data) => data.videoUrl).includes("") &&
      !expression.test(videoInput?.map((data) => data.videoUrl))
    ) {
      toast.warn("Incorrect URL format");
    } else {
      videoPostApi();
    }
  };

  useEffect(() => {
    slidesGetApi();
    pressInformationGetApi();
    galleryGetApi();
    videoUrlGetApi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  
  useEffect(() => {
    slidesData?.map((ele, ind) => setSlidesDataIndex(ind));
    informationData?.map((ele, ind) => setInformationDataIndex(ind));
    videoInput?.map((ele, ind) => setVideoInputIndex(ind));
    galleryData?.map((ele, ind) => setGalleryDataIndex(ind));
  }, [slidesData, informationData, videoInput, galleryData]);

  // Only files with the following extensions are allowed: jpg jpeg gif png txt doc xls pdf ppt pps odt ods odp.
  return (
    <Fragment>
      {commonLoader.pageLoader && <Loader/>}
      <Helmet>
        <title>Media</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-media">
          <div className="mp-form-heading">Media</div>
          <form action="" className="row">
            {/* Presentations input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Slides and presentations
              </label>
              <div className="generate-panel-head">
                {slidesData &&
                  slidesData?.map((x, i) => {
                    return (
                        <div className="generate-panel" key={i}>
                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              Content name
                            </label>
                            <input
                              type="text"
                              value={x.paresentName}
                              name="paresentName"
                              onChange={(e) => handleParesentInputChange(e, i)}
                              className="form-control"
                              placeholder="Your Presentation..."
                            />
                          </div>

                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-caption">
                              Content type (ppsx, pptx, pdf, ppt, pps or odp.)
                            </label>
                            {!(!x.paresentFiles?.size && x.paresentFiles) && (
                              <input
                                type="file"
                                name="paresentFiles"
                                accept=".ppsx,.pptx,.pdf,.ppt,.pps,.odp"
                                onChange={(e) =>
                                  handleParesentInputChange(e, i)
                                }
                                className="form-control"
                              />
                            )}
                          </div>

                          {/* upload file large message show */}
                          {x?.paresentFiles?.size / (1024 * 1024) > 5 &&
                          x?.paresentFiles?.size ? (
                            <span className="form-caption text-red error-message">
                              Please ensure that the uploaded file size does not
                              exceed 5MB
                            </span>
                          ) : (
                            ""
                          )}

                          {/* Download button */}
                          {x._id && (
                            <div className="sap-btn-light mt-3">
                                     <a
                              title={x?.paresentFiles
                                ?.split("-")
                                ?.slice(1)
                                ?.join("-")}
                              className="text-dark-grey"
                              href={`${process.env.REACT_APP_IMAGE_URL}${x.paresentFiles}`}
                            >
                              <span className="file">
                                <FaDownload />&nbsp;Download file
                              </span>
                            </a>
                            </div>
                           
                          )}

                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              URL (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="http://..."
                              name="paresentLinks"
                              value={x.paresentLinks}
                              onChange={(e) => handleParesentInputChange(e, i)}
                              className={`form-control ${
                                !slidesData
                                  ?.map((data) => data.paresentLinks)
                                  .includes("") &&
                                !expression.test(
                                  slidesData?.map((data) => data.paresentLinks)
                                )
                                  ? `error-message`
                                  : ``
                              }`}
                            />
                          </div>
                          {slidesData.length !== 1 && (
                            <div className="sap-btn-dark delete-generate-panel">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveClickParesent(i, x._id)
                                }
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
              {slidesData.length - 1 === slidesDataIndex && (
                <div className="sap-btn-dark delete-generate-panel">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickParesent();
                      setSlidesSaveButtonToggle(false);
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
            <div className="sap-btn-light mt-3">
              <button
                type="button"
                {...(commonLoader.slidesPostLoader && { disabled: true })}
                onClick={(e) => handleSlidesPresentValidation(e)}
              >
                slides save details
                <span className="btn-loader">
                  {commonLoader.slidesPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Press information input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Press information
              </label>
              <div className="generate-panel-head">
                {informationData &&
                  informationData?.map((x, i) => {
                    return (
                        <div key={i} className={`generate-panel${i} pside`}>
                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              Content name
                            </label>
                            <input
                              type="text"
                              value={x.informationName}
                              name="informationName"
                              onChange={(e) =>
                                handleInformationInputChange(e, i)
                              }
                              className="form-control"
                              placeholder="Your Information..."
                            />
                          </div>
                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              Content type (pdf, doc, docx.)
                            </label>

                            {!(
                              !x.informationFiles?.size && x.informationFiles
                            ) && (
                              <input
                                type="file"
                                name="informationFiles"
                                onChange={(e) =>
                                  handleInformationInputChange(e, i)
                                }
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                              />
                            )}
                          </div>

                          {/* upload file large message show */}
                          {x?.informationFiles?.size / (1024 * 1024) > 5 &&
                          x?.informationFiles?.size ? (
                            <span className="form-caption text-red error-message">
                              Please ensure that the uploaded file size does not
                              exceed 5MB
                            </span>
                          ) : (
                            ""
                          )}

                          {/* Download button */}
                          {x?._id && (
                            <div className="sap-btn-light mt-3">
                               <a
                              title={x?.informationFiles
                                ?.split("-")
                                ?.slice(1)
                                ?.join("-")}
                              className="text-dark-grey"
                              href={`${process.env.REACT_APP_IMAGE_URL}${x.informationFiles}`}
                            >
                              <span className="file">
                                <FaDownload />&nbsp;Download file
                              </span>
                            </a>
                            </div>
                           
                          )}

                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              URL (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="http://..."
                              value={x.informationLinks}
                              name="informationLinks"
                              onChange={(e) =>
                                handleInformationInputChange(e, i)
                              }
                              className={`form-control ${
                                !informationData
                                  ?.map((data) => data.informationLinks)
                                  .includes("") &&
                                !expression.test(
                                  informationData?.map(
                                    (data) => data.informationLinks
                                  )
                                )
                                  ? `error-message`
                                  : ``
                              }`}
                            />
                          </div>
                          {informationData.length !== 1 && (
                            <div className="sap-btn-dark delete-generate-panel">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveClickInformation(i, x._id)
                                }
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
              {informationData.length - 1 === informationDataIndex && (
                <div className="sap-btn-dark delete-generate-panel">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickInformation();
                      setPressSaveButtonToggle(false);
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
            <div className="sap-btn-light mt-3">
              <button
                type="button"
                {...(commonLoader.pressPostLoader && { disabled: true })}
                onClick={(e) => handleInformationSaveDetails(e)}
              >
                information save details
                <span className="btn-loader">
                  {commonLoader.pressPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* videos input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Videos
              </label>
              <div className="generate-panel-head">
                {videoInput &&
                  videoInput?.map((x, i) => {
                    return (
                        <div className="generate-panel" key={i}>
                          <div className="col-md-12 form-group">
                            <input
                              type="text"
                              placeholder="http://..."
                              value={x.videoUrl}
                              name="videoUrl"
                              onChange={(e) => handleVideoInputChange(e, i)}
                              className={`form-control ${
                                !videoInput
                                  ?.map((data) => data.videoUrl)
                                  .includes("") &&
                                !expression.test([
                                  videoInput
                                    ?.map((data) => data.videoUrl)
                                    .at(-1),
                                ])
                                  ? `error-message`
                                  : ``
                              }`}
                            />
                          </div>
                          {videoInput.length !== 1 && (
                            <div className="sap-btn-dark delete-generate-panel">
                              <button
                                type="button"
                                onClick={() =>
                                  handleVideoRemoveClick(i, x?._id)
                                }
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
              {videoInput.length - 1 === videoInputIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleVideoAddClick();
                      setVideoSaveButtonToggle(false);
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

            {/* <div className="divider"></div> */}
            <div className="sap-btn-light mt-3">
              <button
                type="button"
                {...(commonLoader.videoPostLoader && { disabled: true })}
                onClick={(e) => handleVideoValidation(e)}
              >
                video save details
                <span className="btn-loader">
                  {commonLoader.videoPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Gallery information input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Gallery <span>(Maximum 30 images uploads)</span>
              </label>
              <div className="generate-panel-head">
                {galleryData &&
                  galleryData?.map((x, i) => {
                    return (
                        <div key={i} className={`generate-panel${i} pside`}>
                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              Content name ({i + 1})
                            </label>
                            <input
                              type="text"
                              value={x.galleryName}
                              name="galleryName"
                              onChange={(e) => handleGalleryInputChange(e, i)}
                              className="form-control"
                              placeholder="Your content name..."
                            />
                          </div>

                          <div className="col-md-12 form-group">
                            <label htmlFor="" className="form-label">
                              Content type (jpg, jpeg, heic, png.)
                            </label>
                            {!x?._id && (
                              <input
                                type="file"
                                name="gallery"
                                accept=".jpg,.jpeg,.png,.heic"
                                onChange={(e) => handleGalleryInputChange(e, i)}
                                className="form-control"
                              />
                            )}
                          </div>

                          <div className="gallery-image">
                            {x?._id && (
                              <img
                                title={x?.gallery?.name}
                                className="gallery-images"
                                src={`${process.env.REACT_APP_IMAGE_URL}${x.gallery}`}
                                height="80px"
                                width="80px"
                                style={{ borderRadius: "50%" }}
                                alt={x?.gallery?.name}
                              />
                            )}
                          </div>
                          {/* select gallery image show */}
                          {x?.gallery?.name && (
                            <img
                              title={x?.gallery?.name}
                              className="gallery-images"
                              src={URL.createObjectURL(x.gallery)}
                              height="80px"
                              width="80px"
                              style={{ borderRadius: "50%" }}
                              alt={x?.gallery?.name}
                            />
                          )}
      
                          {galleryData.length !== 1 && (
                            <div className="sap-btn-dark delete-generate-panel">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveClickGallery(i, x?._id)
                                }
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
              {galleryData.length - 1 === galleryDataIndex && (
                <div className="sap-btn-dark delete-generate-panel">
                  <button
                    {...(galleryData.length > 29 && { disabled: true })}
                    type="button"
                    onClick={() => {
                      handleAddClickGallery();
                      setGallerySaveButtonToggle(false);
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
            <div className="sap-btn-light mt-3">
              <button
                type="button"
                {...(commonLoader.galleryPostLoader && { disabled: true })}
                onClick={(e) => handleGalleryValidation(e)}
              >
                save gallery images
                <span className="btn-loader">
                  {commonLoader.galleryPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Slides/Presentation delete modal section start */}
      <Modal
        show={commonLoader.slidesDelete}
        onHide={() => setCommonLoader({ ...commonLoader, slidesDelete: false })}
        id="slides-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete slides/presentation data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, slidesDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.slidesLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteSlidesApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.slidesLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Press information delete modal section start */}
      <Modal
        show={commonLoader.pressDelete}
        onHide={() => setCommonLoader({ ...commonLoader, pressDelete: false })}
        className="pressinformation-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Do you really want to delete this press information data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, pressDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.pressLoader && { disabled: true })}
                variant="cust"
                onClick={() => deletePressInformationApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.pressLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* gallery images delete modal section start */}
      <Modal
        show={commonLoader.galleryDelete}
        onHide={() =>
          setCommonLoader({ ...commonLoader, galleryDelete: false })
        }
        id="gallery-image-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you absolutely sure you want to delete this image?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, galleryDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.galleryLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteGalleryApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.galleryLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* video delete modal section start */}
      <Modal
        show={commonLoader.videoDelete}
        onHide={() => setCommonLoader({ ...commonLoader, videoDelete: false })}
        className="vediourl-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete video url?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, videoDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.videoLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteVideoUrlApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.videoLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Media;
