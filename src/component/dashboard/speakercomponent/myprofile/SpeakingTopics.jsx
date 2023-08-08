import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../auth/Auth";
import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const SpeakingTopics = () => {
  const navigate = useNavigate();
  const expression = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const [presentDeleteId, setPresentDeleteId] = useState("");
  const [eventDeleteId, seteventDeleteId] = useState("");

  const [commonLoader, setCommonLoader] = useState({
    presentPostLoader: false,
    presentDelete: false,
    presentLoader: false,
    presentButTog: false,
    eventPostLoader: false,
    eventDelete: false,
    eventLoader: false,
    eventButTog: false,
    pageLoader:false
  });

  const [paresentData, setPresentData] = useState([
    { paresentTitle: "", paresentDec: "" },
  ]);

  const [eventData, setEventData] = useState([
    { name: "", location: "", date: "", title: "", link: "" },
  ]);

  // handle event input change
  const handleEventInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...eventData];
    list[index][name] = value;
    setEventData(list);
  };

  // handle event click event of the Remove button
  const handleRemoveClickEvent = (index, delId) => {
    seteventDeleteId(delId);
    if (!commonLoader.eventButTog && !delId) {
      const list = [...eventData];
      list.splice(index, 1);
      setEventData(list);
      setCommonLoader({ ...commonLoader, eventButTog: true });
    } else if (delId) {
      setCommonLoader({ ...commonLoader, eventDelete: true });
    }
  };

  // handle event click event of the Add button
  const handleAddClickEvent = () => {
    setEventData([
      ...eventData,
      { name: "", location: "", date: "", title: "", link: "" },
    ]);
  };

  // handle paresent input change
  const handleParesentInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...paresentData];
    list[index][name] = value;
    setPresentData(list);
  };

  // handle paresent click event of the Remove button
  const handleRemoveClickParesent = (index, delId) => {
    setPresentDeleteId(delId);
    if (!commonLoader.presentButTog && !delId) {
      const list = [...paresentData];
      list.splice(index, 1);
      setPresentData(list);
      setCommonLoader({ ...commonLoader, presentButTog: true });
    } else {
      setCommonLoader({ ...commonLoader, presentDelete: true });
    }
  };

  // handle paresent click event of the Add button
  const handleAddClickParesent = () => {
    setPresentData([...paresentData, { paresentTitle: "", paresentDec: "" }]);
  };

  // Presentation post api
  const presentationApi = async () => {
    setCommonLoader({ ...commonLoader, presentLoader: true });
    const keyValue = {
      PresentationData: paresentData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPresentationDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, presentLoader: false });
      presentationGetApi();
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, presentButTog: true });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, presentLoader: false });
      toast.warn(error.message);
    }
  };

  // event post api
  const eventPostApi = async () => {
    setCommonLoader({ ...commonLoader, eventLoader: true });
    const keyValue = {
      eventData: eventData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerEventDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, eventLoader: false });
      eventGetApi();
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, eventButTog: true });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, eventLoader: false });
      toast.warn(error.message);
    }
  };

  // Presentation get api
  const presentationGetApi = async () => {
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
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPresentation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonLoader({...commonLoader,pageLoader:false});
      const data = await res.json();
      if (data?.data?.length > 0) {
        setPresentData(data?.data);
      } else {
        setPresentData([{ paresentTitle: "", paresentDec: "" }]);
        setCommonLoader({ ...commonLoader, presentButTog: false });
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

  // Event get api
  const eventGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerEvent`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setEventData(data?.data);
      } else {
        setEventData([
          { name: "", location: "", date: "", title: "", link: "" },
        ]);
        setCommonLoader({ ...commonLoader, eventButTog: false });
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

  // Delete presentation data api
  const deletePresentationApi = async () => {
    setCommonLoader({ ...commonLoader, presentLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPresentation/${presentDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      presentationGetApi();
      setCommonLoader({ ...commonLoader, presentLoader: false });
      setCommonLoader({ ...commonLoader, presentDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, presentLoader: false });
      setCommonLoader({ ...commonLoader, presentDelete: false });
    }
  };

  // Delete event data api
  const deleteeventApi = async () => {
    setCommonLoader({ ...commonLoader, eventLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerEvent/${eventDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      eventGetApi();
      setCommonLoader({ ...commonLoader, eventLoader: false });
      setCommonLoader({ ...commonLoader, eventDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, eventLoader: false });
      setCommonLoader({ ...commonLoader, eventDelete: false });
    }
  };

  // Handle presentation validation
  const handlePresentationValidation = (e) => {
    e.preventDefault();
    if (!!paresentData.map((data) => data.paresentTitle).includes("")) {
      toast.warn("Paresent title field is required");
    } else if (!!paresentData.map((data) => data.paresentDec).includes("")) {
      toast.warn("Paresent description field is required");
    } else {
      presentationApi();
    }
  };

  //   Handle my event validation
  const handleMyPfofileValidation = (e) => {
    e.preventDefault();
    if (!!eventData.map((data) => data.name).includes("")) {
      toast.warn("Event name field is required");
    } else if (!!eventData.map((data) => data.location).includes("")) {
      toast.warn("Location field is required");
    } else if (!!eventData.map((data) => data.date).includes("")) {
      toast.warn("Date field is required");
    } else if (!!eventData.map((data) => data.title).includes("")) {
      toast.warn("Title field is required");
    } else if (!!eventData.map((data) => data.link).includes("")) {
      toast.warn("Link field is required");
    } else if (
      expression.test([eventData.map((data) => data.link)?.at(-1)]) === false
    ) {
      toast.warn("Invalid Link");
    } else {
      eventPostApi();
    }
  };

  useEffect(() => {
    presentationGetApi();
    eventGetApi();
    window.scrollTo({ top: 0, behavior: "instant" });
    // eslint-disable-next-line
  }, []);

  // console.log(">>>>>>>>",expression.test([eventData.map((data) => data.link)?.at(-1)]) === false &&
  // eventData.map((data) => data.link).includes("") === false);

  // console.log("sdaDASDAS",expression.test([eventData.map((data) => data.link)?.at(-1)]));
  const [paresentDataIndex, setParesentDataIndex] = useState();
  const [eventDataIndex, setEventDataIndex] = useState();
  useEffect(() => {
    paresentData?.map((ele, ind) => setParesentDataIndex(ind));
    eventData?.map((ele, ind) => setEventDataIndex(ind));
  }, [paresentData, eventData]);

  return (
    <Fragment>
      {commonLoader.pageLoader && <Loader/>}
      <Helmet>
        <title>Speaking-Topics</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-speaking-topics">
          <div className="mp-form-heading">Speaking Topics</div>
          <form action="" className="row">
            {/* Presentations input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Presentations
              </label>
              <div className="generate-panel-head">
                {paresentData &&
                  paresentData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            TITLE<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.paresentTitle}
                            name="paresentTitle"
                            onChange={(e) => handleParesentInputChange(e, i)}
                            className="form-control"
                            placeholder="Your title..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            DESCRIPTION<sup className="text-red">*</sup>
                          </label>
                          <textarea
                            type="text"
                            cols="30"
                            rows="10"
                            placeholder="Please enter description..."
                            name="paresentDec"
                            value={x.paresentDec}
                            onChange={(e) => handleParesentInputChange(e, i)}
                            className="form-control"
                          ></textarea>
                        </div>
                        {paresentData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveClickParesent(i, x?._id)
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
              {paresentData.length - 1 === paresentDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickParesent();
                      setCommonLoader({
                        ...commonLoader,
                        presentButTog: false,
                      });
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
                {...(commonLoader.presentLoader && { disabled: true })}
                onClick={(e) => handlePresentationValidation(e)}
              >
                save presentations{" "}
                <span className="btn-loader">
                  {commonLoader.presentLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* education input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Events (past or upcoming)
              </label>
              <div className="generate-panel-head">
                {eventData &&
                  eventData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            Name<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.name}
                            name="name"
                            onChange={(e) => handleEventInputChange(e, i)}
                            className="form-control"
                            placeholder="Your event name..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            LOCATION<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={x.location}
                            onChange={(e) => handleEventInputChange(e, i)}
                            placeholder="Enter your location..."
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            Date<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={x.date}
                            onChange={(e) => handleEventInputChange(e, i)}
                            className="form-control"
                          />
                          <label htmlFor="" className="form-label">
                            PRESENTATION TITLE
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={x.title}
                            placeholder="Please enter presentation..."
                            onChange={(e) => handleEventInputChange(e, i)}
                            className="form-control"
                          />
                          <label htmlFor="" className="form-label">
                            Link<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="link"
                            value={x.link}
                            placeholder="https://..."
                            onChange={(e) => handleEventInputChange(e, i)}
                            className={`form-control ${
                              expression.test([
                                eventData.map((data) => data.link)?.at(-1),
                              ]) === false &&
                              eventData
                                .map((data) => data.link)
                                .includes("") === false
                                ? `error-message`
                                : ``
                            }`}
                          />
                        </div>
                        {eventData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickEvent(i, x?._id)}
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
              {eventData.length - 1 === eventDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickEvent();
                      setCommonLoader({ ...commonLoader, eventButTog: false });
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
            <div className="divider"></div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.eventLoader && { disabled: true })}
                onClick={(e) => handleMyPfofileValidation(e)}
              >
                save details{" "}
                <span className="btn-loader">
                  {commonLoader.eventLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* presentation delete modal section start */}
      <Modal
        show={commonLoader.presentDelete}
        onHide={() =>
          setCommonLoader({ ...commonLoader, presentDelete: false })
        }
        id="presentation-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete presentation data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, presentDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.presentLoader && { disabled: true })}
                variant="cust"
                onClick={() => deletePresentationApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.presentLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* event delete modal section start */}
      <Modal
        show={commonLoader.eventDelete}
        onHide={() => setCommonLoader({ ...commonLoader, eventDelete: false })}
        className="event-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete event data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, eventDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.eventLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteeventApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.eventLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SpeakingTopics;
