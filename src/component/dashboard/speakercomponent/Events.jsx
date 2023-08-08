import React, { Fragment, useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import moment from "moment";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../auth/Auth";
import Loader from "../../loader/Loader";
import Pagination from "../custompagination/Pagination";

const Events = () => {
  const navigate = useNavigate();
  let PageSize = 5;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appStartDate, setAppStartDate] = useState("");
  const [appEndDate, setAppEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [eventType, setEventType] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [selectFees, setSelectFees] = useState([]);
  const [senderImage, setSenderImage] = useState("");
  const [sendApiImage, setSendApiImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [radioButton, setRadioButton] = useState("all");
  const [totalData, setTotalData] = useState("");
  const [allEventData, setAllEventData] = useState([]);


  const [commonState, setCommonState] = useState({
    eventModal: false,
    eventSubmitLoader: false,
    pageLoader: false
  });

  // Decryprt token
  const decryptRoll = Auth.getRol()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  // Event fees json
  const fees = [
    { id: 1, name: "Ask for pricing" },
    { id: 2, name: "Up to $250" },
    { id: 3, name: "$250 - $1500" },
    { id: 4, name: "$1500 - $5000" },
    { id: 5, name: "$5000 - $10000" },
    { id: 6, name: "More than $10000" },
  ];

  // upload image function
  const handleParesentInputChange = (e) => {
    setSendApiImage(e.target.files[0]);
    const getImage = URL.createObjectURL(e.target.files[0]);
    setSenderImage(getImage);
  };

  // Handle select fees to checkbox
  const handleFeeCheckboxClick = (name) => {
    setSelectFees((data) => {
      if (data.includes(name)) {
        return data.filter((data) => data !== name);
      } else {
        return [name];
      }
    });
  };

  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  //fetch event api
  const fetchEventApi = async () => {
    setCommonState({ ...commonState, pageLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/GetUserEvent?event=${radioButton}&page=${currentPage}`,
      requestKey
    );

    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setAllEventData(data.data);
      setTotalData(data.totalData);
      setCommonState({ ...commonState, eventSubmitLoader: false });
      setCommonState({ ...commonState, pageLoader: false });
    };

    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      setCommonState({ ...commonState, eventSubmitLoader: false });
      setCommonState({ ...commonState, pageLoader: false });
    };
  };



  // craete event api
  const createEventApi = async () => {
    setCommonState({ ...commonState, eventSubmitLoader: true });
    const formData = new FormData();
    formData.append("profileImage", title);
    formData.append("profileImage", start);
    formData.append("profileImage", end);
    formData.append("profileImage", startTime);
    formData.append("profileImage", endTime);
    formData.append("profileImage", appStartDate);
    formData.append("profileImage", appEndDate);
    formData.append("profileImage", address);
    formData.append("profileImage", contactNo);
    formData.append("profileImage", desc);
    formData.append("profileImage", sendApiImage);
    formData.append("profileImage", selectFees);
    formData.append("profileImage", eventType);
    formData.append("profileImage", gender);

    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
      page: currentPage,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/GetUserEvent`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setCommonState({ ...commonState, eventSubmitLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonState({ ...commonState, eventSubmitLoader: false });
    }
  };
  // handle add event function
  const setNewAppointment = (e) => {
    e.preventDefault();
    if (!title) {
      toast.warn("title is required!");
    } else if (!desc) {
      toast.warn("desc is required!");
    } else if (!start) {
      toast.warn("start date is required!");
    } else if (!end) {
      toast.warn("end date is required!");
    } else if (!startTime) {
      toast.warn("start time is required!");
    } else if (!endTime) {
      toast.warn("end time is required!");
    } else if (!address) {
      toast.warn("Please provide us with your complete address details!");
    } else if (!eventType) {
      toast.warn("Please specify the event genre!");
    } else if (!contactNo) {
      toast.warn("Please provide your contact number!");
    } else if (contactNo.length < 8) {
      toast.warn("Invalid contact number!");
    } else {
      // createEventApi();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    fetchEventApi();
  }, [radioButton]);

  return (
    <Fragment>
      {commonState.pageLoader && <Loader />}
      <Helmet>
        <title>Events</title>
      </Helmet>
      <div className="speakers-lisitng sl-cloned-events-page">
        <section className="speakers-lisitng-sec">
          <div className="speakers-lisitng-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Events</div>
            <form action="" className="add-event-head">
              <div className="add-event-inner">
                {decryptRoll === "user" && (
                  <div
                    // onClick={() =>
                    //   setCommonState({ ...commonState, eventModal: true })
                    // }
                    className="sap-btn-dark"
                  >
                    <Link to="/events/organizer-add-event">add event</Link>
                  </div>
                )}
                <div className="form-group">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue="0"
                  >
                    <option value="0">All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="event-radio">
                <div className="form-check login-type-check">
                  <input
                    className="form-check-input"
                    value="all"
                    {...(radioButton === "all") ? {checked:true}:""}
                    // checked={radioButton === "all"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    type="radio"
                    name="eventButton"
                    id="event1"
                  />
                  <label className="form-check-label" htmlFor="event1">
                    All
                  </label>
                </div>
                <div className="form-check login-type-check">
                  <input
                    className="form-check-input"
                    value="my-event"
                    {...(radioButton === "my-event") ? {checked:true}:""}
                    // checked={radioButton === "my-event"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    type="radio"
                    name="eventButton"
                    id="event2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="event2"
                  >
                    My events
                  </label>
                </div>
                <div className="form-check login-type-check">
                  <input
                    className="form-check-input"
                    value="recommend"
                    {...(radioButton === "recommend") ? {checked:true}:""}
                    // checked={radioButton === "recommend"}
                    onChange={(e) => setRadioButton(e.target.value)}
                    type="radio"
                    name="eventButton"
                    id="event3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="event3"
                  >
                    Recommended
                  </label>
                </div>
              </div>

              <div className="sort-head">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    sort by
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue="0"
                  >
                    <option value="0">Relevance</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="events-page-sl-header">
              <div className="sl-head sl-head-cloned-events-head">
                <div className="sl-left">
                  <div className="sl-left-heading">
                    <label htmlFor="" className="form-label">
                      filters
                    </label>
                    <div className="clear-filter">Clear filters</div>
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        industry
                      </label>
                      <div className="drop-arrow">
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="industry"
                          id="industry1"
                        />
                        <label className="form-check-label" htmlFor="industry1">
                          Automotive
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="industry"
                          id="industry2"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="industry2">
                          Energy (oil and gas, utilities)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        keyword
                      </label>
                      <div className="drop-arrow">
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </div>
                    <div className="form-group">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue="0"
                      >
                        <option value="0">Select</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* event listing section start */}
                <div className="sl-right">
                  <div className="sl-right-head">
                    {allEventData.length > 0 ? (Array.from(allEventData)?.map((data) => {
                      const { _id, eventTittle, eventTopic, eventFees, eventImage } = data.item
                      return (
                        <div className="aum-inner" key={_id}>
                          <div className="aum-img blurred-img">
                            <img src={eventImage ? `${process.env.REACT_APP_IMAGE_URL}${eventImage}` : `assets/image/RogerFerris.png`} alt="" />
                            <div className="floating-upgrade">
                              <div className="aum-fl-title-top">
                                Upgrade to Gold to see details
                              </div>
                              <div className="sap-btn-light">
                                <button type="button">upgrade</button>
                              </div>
                              <a
                                href="#/"
                                target="_blank"
                                className="aum-fl-title-bot"
                              >
                                Already Gold? Log in here.
                              </a>
                            </div>
                          </div>
                          <div className="aum-bot">
                            <div className="aum-left">
                              <div className="aum-name">{eventTittle}</div>
                              <div className="aum-desg">{eventTopic}</div>
                              <div className="aum-price">{eventFees}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })) : <div className="sap-sm-heading">
                      There is no event listing!
                    </div>}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* custom pagination */}
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalCount={totalData ? totalData : 1}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Add event modal */}
      <Modal
        show={commonState.eventModal}
        id="add-event-pop"
        onHide={() => setCommonState({ ...commonState, eventModal: false })}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <div className="modal-header-heading">Create Event</div>
          <p className="event-title">
            (This event does not require speakers to pay for speaking)
          </p>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Title<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Please enter available or not-available..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label htmlFor="" className="form-label">
              DATE OF YOUR EVENT<sup className="text-red">*</sup>
            </label>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Start Date<sup className="text-red">*</sup>
              </label>
              <input
                type="date"
                className="form-control"
                value={moment(start).format("YYYY-MM-DD")}
                min={moment(start).format("YYYY-MM-DD")}
                // max={moment("2023-05-20").format("YYYY-MM-DD")}
                onChange={(e) => setStart(new Date(e.target.value))}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                End Date<sup className="text-red">*</sup>
              </label>
              <input
                type="date"
                className="form-control"
                value={moment(end).format("YYYY-MM-DD")}
                min={moment(start).format("YYYY-MM-DD")}
                onChange={(e) => setEnd(new Date(e.target.value))}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Start Time<sup className="text-red">*</sup>
              </label>
              <input
                type="time"
                className="form-control"
                value={startTime}
                // min={moment(start).format("YYYY-MM-DD")}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                End Time<sup className="text-red">*</sup>
              </label>
              <input
                type="time"
                className="form-control"
                value={endTime}
                // min={moment(start).format("YYYY-MM-DD")}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="divider"></div>
            <label htmlFor="" className="form-label">
              APPLICATION PERIOD<sup className="text-red">*</sup>
            </label>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Start Date<sup className="text-red">*</sup>
              </label>

              <input
                type="date"
                className="form-control"
                value={moment(appStartDate).format("YYYY-MM-DD")}
                min={moment(appStartDate).format("YYYY-MM-DD")}
                // max={moment("2023-05-20").format("YYYY-MM-DD")}
                onChange={(e) => setAppStartDate(new Date(e.target.value))}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                End Date<sup className="text-red">*</sup>
              </label>

              <input
                type="date"
                className="form-control"
                value={moment(appEndDate).format("YYYY-MM-DD")}
                min={moment(appStartDate).format("YYYY-MM-DD")}
                onChange={(e) => setAppEndDate(new Date(e.target.value))}
              />
            </div>
            <div className="divider"></div>
            {/* <div className="col-md-6 form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Event-status
              </label>
              <select
                className={`form-select`}
                aria-label="Default select example"
                defaultValue="0"
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
              >
                <option value="">Select</option>
                {eventStatusData.map((data) => {
                  return (
                    <option key={data.id} value={data.value}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Address<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Contact no:<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter contact number...."
                maxLength={15}
                value={contactNo}
                onKeyPress={(e) => {
                  if (!/(?<=^| )\d+(\.\d+)?(?=$| )/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Description<sup className="text-red">*</sup>
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Please enter description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Content type (png, gif, jpg or jpeg)
              </label>
              <input
                type="file"
                name="paresentFiles"
                accept=".png,.gif,.jpg,.jpeg"
                onChange={(e) => handleParesentInputChange(e)}
                className="form-control"
              />
              {senderImage && (
                <img
                  style={{ width: "100px" }}
                  className="event-image"
                  src={senderImage}
                  alt="uploade"
                />
              )}
            </div>

            <div className="sl-fil-inner">
              <div className="sl-fil-heading">
                <label htmlFor="" className="form-label">
                  FEE
                </label>
                {/* <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div> */}
              </div>
              {fees.map((item) => (
                <div className="form-check" key={item.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={selectFees.includes(item.name)}
                    onClick={() => handleFeeCheckboxClick(item.name)}
                    name="flexRadioDefaultButton"
                    id={item.id}
                  />
                  <label className="form-check-label" htmlFor={item.id}>
                    {item.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="col-md-6 form-group-head fill-eventType">
              <label htmlFor="" className="form-label">
                event Type<sup className="text-red">*</sup>
              </label>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={eventType === "On-Site Presentation"}
                    value="On-Site Presentation"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="event1"
                  />
                  <label className="form-check-label" htmlFor="event1">
                    On-Site Presentation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={eventType === "Phone Conference"}
                    value="Phone Conference"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="event2"
                  />
                  <label className="form-check-label" htmlFor="event2">
                    Phone Conference
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={eventType === "Virtual Meeting"}
                    value="Virtual Meeting"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="event3"
                  />
                  <label className="form-check-label" htmlFor="event3">
                    Virtual Meeting
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6 form-group-head fill-eventType">
              <label htmlFor="" className="form-label">
                Gender<sup className="text-red">*</sup>
              </label>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    name="radioButtn"
                    id="male1"
                  />
                  <label className="form-check-label" htmlFor="male1">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    name="radioButtn"
                    id="male2"
                  />
                  <label className="form-check-label" htmlFor="male2">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="any"
                    onChange={(e) => setGender(e.target.value)}
                    name="radioButtn"
                    id="male3"
                  />
                  <label className="form-check-label" htmlFor="male3">
                    Any
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                onClick={() =>
                  setCommonState({ ...commonState, eventModal: false })
                }
              >
                Cancel
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                onClick={(e) => setNewAppointment(e)}
                {...(commonState.eventSubmitLoader && { disabled: true })}
              >
                Submit
                <span className="btn-loader">
                  {commonState.eventSubmitLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Events;
