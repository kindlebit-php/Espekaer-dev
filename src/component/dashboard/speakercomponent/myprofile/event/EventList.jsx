import React, { Fragment, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import moment from "moment";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  FaTrashAlt,
  FaEdit,
  FaCircleNotch,
  FaEye,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Loader from "../../../../loader/Loader";
import Auth from "../../../../../auth/Auth";

import MyProfileSidebar from "../MyProfileSidebar";
import Pagination from "../../../custompagination/Pagination";

const EventList = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [eventClientRegister,setEventClientRegister] = useState("");
  const [address, setAddress] = useState("");
  const [eventType, setEventType] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [crudId, setCrudId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal, setEditModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sortArrowShow, setShortArrowShow] = useState(0);
  const [searchNameEmailContact, setSearchNameEmailcontact] = useState("");

  const eventStatusData = [
    { id: 1, name: "Confirmed", value: "confirmed" },
    { id: 2, name: "Held", value: "held" },
    { id: 3, name: "Canceled", value: "canceled" },
    { id: 4, name: "Lead", value: "lead" },
    { id: 5, name: "Postponed", value: "postponed" },
    { id: 6, name: "Closed", value: "closed" },
  ];

  const [commonLoader, setCommonLoader] = useState({
    listLoader: false,
    editLoader: false,
    deleteLoder: false,
    verifyEmailLoader: false,
    submitLoader: false,
  });

  const [getEventList, setGetEventList] = useState([]);
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const handleDownload = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 2, 0);
      pdf.save("table.pdf");
    });
  };

  // get event list api
  const getEventListApi = async () => {
    setCommonLoader({ ...commonLoader, listLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }speaker/getSpeakerSaveEventCalender?filter=${filterBy}&limit=${10}&page=${currentPage}&sort=${sortArrowShow}&search=${searchNameEmailContact}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setGetEventList(data?.data);
      setCommonLoader({ ...commonLoader, listLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, listLoader: false });
    }
  };

  // verify email api
  const verifyEmailApi = async () => {
    setCommonLoader({ ...commonLoader, verifyEmailLoader: true });
    const loginKeyValue = {
      email: email,
    };
    const requestKey = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginKeyValue),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getUserEmail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setClientName(data?.data);
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, verifyEmailLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, verifyEmailLoader: false });
    }
  };

  // create event api
  const createEventApi = async () => {
    setCommonLoader({ ...commonLoader, submitLoader: true });
    const loginKeyValue = {
      eventTittle: title,
      eventDescription: desc,
      eventStartDate: start,
      eventEndDate: end,
      eventStartTime: startTime,
      eventEndTime: endTime,
      eventClintEmail: email,
      eventClintName: clientName?.fullName ? clientName?.fullName :clientName,
      eventAddress: address,
      eventType: eventType,
      eventClintContact: contactNo,
      eventStatus: eventStatus,
      eventClintRegister: clientName?.fullName ? true : false,
      id: crudId,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerSaveEventCalender`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      getEventListApi();
      setTitle("");
      setDesc("");
      setStart("");
      setEnd("");
      setStartTime("");
      setEndTime("");
      setClientName("");
      setAddress("");
      setEventType("");
      setEmail("");
      setContactNo("");
      setEventStatus("");
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, submitLoader: false });
      setEditModal(false);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, submitLoader: false });
      setCommonLoader(false);
    };
  };

  // delete event list api
  const deleteEventListApi = async () => {
    setCommonLoader({ ...commonLoader, deleteLoder: true });
    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerSaveEventCalender/${crudId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      toast.warn(data.message);
      setDeleteModal(false);
      getEventListApi();
      setCommonLoader({ ...commonLoader, deleteLoder: false });
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      setDeleteModal(false);
      setCommonLoader({ ...commonLoader, deleteLoder: false });
    };
  };

  // handle create event validation
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!title) {
      toast.warn("You must provide a title for the event in the title field!");
    } else if (!desc) {
      toast.warn("The description field cannot be left empty!");
    } else if (!start) {
      toast.warn("The start date field is a required field!");
    } else if (!end) {
      toast.warn("The end date field is a required field!");
    } else if (!startTime) {
      toast.warn("The start time field is a required fieldd!");
    } else if (!endTime) {
      toast.warn("The end time field is a required field!");
    } else if (!email) {
      toast.warn("Please verify the email address first!");
    } else if (!address) {
      toast.warn("Please provide us with your complete address details!");
    } else if (!eventType) {
      toast.warn("Please specify the event genre!");
    } else if (!contactNo) {
      toast.warn("Please provide your contact number!");
    } else if (contactNo.length < 8) {
      toast.warn("Invalid contact number!");
    } else if (!eventStatus) {
      toast.warn("Please pick the event status from the options provided!");
    } else {
      createEventApi();
    }
  };

  // handle validation email verify
  const handleVerify = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Please provide your email ID!");
    } else if (!emailRegex.test(email)) {
      toast.warn("Invalid email!");
    } else {
      verifyEmailApi();
    }
  };

  

  const handleEditModalData = (data) => {
    const {
      eventAddress,
      eventClintRegister,
      eventClintContact,
      eventClintEmail,
      eventDescription,
      eventEndDate,
      eventEndTime,
      eventStartDate,
      eventStartTime,
      eventStatus,
      eventTittle,
      eventType,
      eventClintName,
      _id,
    } = data;
    setEventClientRegister(eventClintRegister);
    setTitle(eventTittle);
    setDesc(eventDescription);
    setStart(eventStartDate);
    setEnd(eventEndDate);
    setStartTime(eventStartTime);
    setEndTime(eventEndTime);
    setAddress(eventAddress);
    setEventType(eventType);
    setEmail(eventClintEmail);
    setContactNo(eventClintContact);
    setEventStatus(eventStatus);
    setCrudId(_id);
    setClientName(eventClintName);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    getEventListApi();
    // eslint-disable-next-line
  }, [filterBy, currentPage, sortArrowShow, searchNameEmailContact]);

  useEffect(() => {
    setCurrentPage(1);
    setShortArrowShow(0);
  }, [filterBy, searchNameEmailContact]);

  // handle onmouse leave email verify
  const handleVerifyEmail=(e)=>{
    (email && !previewModal) && handleVerify(e);
  };

  return (
    <Fragment>
      {commonLoader.listLoader && !searchNameEmailContact && <Loader />}
      <Helmet>
        <title>Event-List</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-event-list">
          <div className="mp-form-heading">Event List</div>

          <div className="dual-btn">
            <div className="set-btn-rt">
              <div className="sap-btn-dark">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="Download as XLS"
                />
              </div>
              <div className="sap-btn-dark">
                <button onClick={() => handleDownload()}>
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
          <div className="add-event-inner">
            <div className="form-group" id="sort-search">
              <ReactSearchAutocomplete
                // items={searchKeyWord}
                items={getEventList?.clientNameSuggestion}
                maxResults={2}
                placeholder="Search..."
                onSelect={(item) => setSearchNameEmailcontact(item.name)}
                onClear={() => setSearchNameEmailcontact("")}
                onSearch={(string) => setSearchNameEmailcontact(string)}
                className="search-autocomplete"
              />
            </div>
            <div className="sort-head">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  filter by
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  // defaultValue="0"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="held">Held</option>
                  <option value="canceled">Canceled</option>
                  <option value="lead">Lead</option>
                  <option value="postponed">Postponed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-responsive set-table">
            <table
              className="table table-striped mt-4"
              id="table-to-xls"
              ref={tableRef}
            >
              <tbody>
                <tr>
                  <th>#</th>
                  <th>
                    Client Name
                    <span
                      onClick={() => setShortArrowShow(1)}
                      className={`down-arrow ${
                        sortArrowShow === 1 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltDown />
                    </span>
                    <span
                      onClick={() => setShortArrowShow(-1)}
                      className={`up-arrow ${
                        sortArrowShow === -1 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltUp />
                    </span>
                  </th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>
                    Start Date{" "}
                    <span
                      onClick={() => setShortArrowShow(2)}
                      className={`down-arrow ${
                        sortArrowShow === 2 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltDown />
                    </span>
                    <span
                      onClick={() => setShortArrowShow(-2)}
                      className={`up-arrow ${
                        sortArrowShow === -2 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltUp />
                    </span>
                  </th>
                  <th>
                    End Date{" "}
                    <span
                      onClick={() => setShortArrowShow(3)}
                      className={`down-arrow ${
                        sortArrowShow === 3 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltDown />
                    </span>
                    <span
                      onClick={() => setShortArrowShow(-3)}
                      className={`up-arrow ${
                        sortArrowShow === -3 ? `active` : ``
                      }`}
                    >
                      <FaLongArrowAltUp />
                    </span>
                  </th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Event Type</th>
                  <th>Venue</th>
                  <th>Client Email</th>
                  <th>Client Contact No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

                {getEventList &&
                  getEventList?.result?.map((data, index) => {
                    const {
                      eventClintName,
                      eventAddress,
                      eventClintContact,
                      eventClintEmail,
                      eventDescription,
                      eventEndDate,
                      eventEndTime,
                      eventStartDate,
                      eventStartTime,
                      eventStatus,
                      eventTittle,
                      eventType,
                      _id,
                    } = data;
                    return (
                      <tr key={index}>
                        <td>{currentPage * 10-9 + index}</td>
                        <td className="cell">{eventClintName}</td>
                        <td>{eventTittle}</td>
                        <td>{`${eventDescription?.length > 10 ? `${eventDescription?.slice(0,10)}...`: eventDescription}`}</td>
                        <td>{moment(eventStartDate)?.format("YYYY-MM-DD")}</td>
                        <td>{moment(eventEndDate)?.format("YYYY-MM-DD")}</td>
                        <td>{eventStartTime}</td>
                        <td>{eventEndTime}</td>
                        <td>{eventType}</td>
                        <td>{eventAddress}</td>
                        <td>{eventClintEmail}</td>
                        <td>{eventClintContact}</td>
                        <td
                          style={{
                            color:
                              eventStatus === "confirmed"
                                ? "darkgreen"
                                : eventStatus === "held"
                                ? "#edc967"
                                : eventStatus === "canceled"
                                ? "red"
                                : eventStatus === "lead"
                                ? "skyblue"
                                : eventStatus === "postponed"
                                ? "maroon"
                                : eventStatus === "closed"
                                ? "gray"
                                : "",
                          }}
                        >
                          {eventStatus}
                        </td>
                        <td className="table-action cell1">
                          {eventStatus === "closed" ? (
                            <span
                              className="preview-icon"
                              onClick={() => {
                                setPreviewModal(true);
                                setEditModal(true);
                                handleEditModalData(data);
                              }}
                            >
                              <FaEye />
                            </span>
                          ) : (
                            <>
                              <span
                                className="preview-icon"
                                onClick={() => {
                                  setPreviewModal(true);
                                  setEditModal(true);
                                  handleEditModalData(data);
                                }}
                              >
                                <FaEye />
                              </span>
                              <span
                                className="edit-icon"
                                onClick={() => {
                                  setEditModal(true);
                                  handleEditModalData(data);
                                }}
                              >
                                <FaEdit />
                              </span>
                              <span
                                className="del-icon"
                                onClick={() => {
                                  setDeleteModal(true);
                                  setCrudId(_id);
                                }}
                              >
                                <FaTrashAlt />
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {getEventList?.result?.length < 1 &&
            !filterBy &&
            !commonLoader.listLoader && (
              <div className="sap-sm-heading">
                There are currently no events available.!
              </div>
            )}
          {getEventList?.result?.length < 1 && filterBy && (
            <div className="null-data">There is no event found.!</div>
          )}
          {/* Pagination sectiobn start */}
          <Pagination
            className="pagination"
            currentPage={currentPage}
            totalCount={getEventList?.totalCount ? getEventList?.totalCount : 1}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* delete event modal*/}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        id="logout-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete this event?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button variant="cust" onClick={() => setDeleteModal(false)}>
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <div
                className="sap-btn-light"
                {...(commonLoader.deleteLoder && { disabled: true })}
              >
                <Button variant="cust" onClick={() => deleteEventListApi()}>
                  Yes
                  <span className="btn-loader">
                    {commonLoader.deleteLoder && <FaCircleNotch />}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* edit & preview event modal*/}
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
          setPreviewModal(false);
        }}
        id="edit-event-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <div className="modal-header-heading">
            {!previewModal ? "Edit Event" : "Preview Event"}
          </div>
        </Modal.Header>
        <Modal.Body className="mb-3">
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Title<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                onKeyPress={(e) => {
                  if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                placeholder="Please enter available or not-available..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Start Date<sup className="text-red">*</sup>
              </label>
              <input
                type="date"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                value={start}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                End Date<sup className="text-red">*</sup>
              </label>
              <input
                type="date"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                value={end}
                min={start ? start : new Date().toISOString().split("T")[0]}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Start Time<sup className="text-red">*</sup>
              </label>
              <input
                type="time"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                End Time<sup className="text-red">*</sup>
              </label>
              <input
                type="time"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            {/* {!(clientName && previewModal) && ( */}
              <div className="col-md-6 form-group">
                <label htmlFor="" className="form-label">
                  Client Name<sup className="text-red">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="enter name....."
                  className="form-control"
                  {...(previewModal || eventClientRegister) ? {disabled:true}:""}
                  value={clientName?.fullName ? clientName?.fullName : clientName}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
            {/* )}  */}
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Address<sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                {...previewModal ? {disabled:true}:""}
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
                {...previewModal ? {disabled:true}:""}
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Event-status
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue="0"
                value={eventStatus}
                {...previewModal ? {disabled:true}:""}
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
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Email<sup className="text-red">*</sup>
              </label>
              <input
                type="email"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                placeholder="enter email..."
                onMouseOut={(e) => handleVerifyEmail(e)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {!previewModal && <div className="sap-btn-light mt-3">
                <button
                  type="button"
                  {...(commonLoader.verifyEmailLoader && {
                    disabled: true,
                  })}
                  onClick={(e) => handleVerify(e)}
                >
                  Verify email{" "}
                  <span className="btn-loader">
                    {commonLoader.verifyEmailLoader && <FaCircleNotch />}
                  </span>
                </button>
              </div>} */}
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
                    {...previewModal ? {disabled:true}:""}
                    value="On-Site Presentation"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    On-Site Presentation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...previewModal ? {disabled:true}:""}
                    checked={eventType === "Phone Conference"}
                    value="Phone Conference"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Phone Conference
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...previewModal ? {disabled:true}:""}
                    checked={eventType === "Virtual Meeting"}
                    value="Virtual Meeting"
                    onChange={(e) => setEventType(e.target.value)}
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Virtual Meeting
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Description<sup className="text-red">*</sup>
              </label>
              <textarea
                type="text"
                {...previewModal ? {disabled:true}:""}
                className="form-control"
                placeholder="Please enter description..."
                value={desc}
                onKeyPress={(e) => {
                  if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="sap-btn-light mt-4">
              <button type="button" {...commonLoader.submitLoader && {disabled:true}} 
              onClick={(e) => handleSaveEvent(e)}
              >
                edit event <span className="btn-loader">
                  {commonLoader.submitLoader && <FaCircleNotch />}
                </span>
              </button>
            </div> */}
        </Modal.Body>
        {!previewModal && (
          <Modal.Footer>
            <div className="dual-btn">
              <div className="sap-btn-dark">
                <Button variant="cust" onClick={() => setEditModal(false)}>
                  No
                </Button>
              </div>
              <div
                className="sap-btn-light"
                {...(commonLoader.submitLoader && { disabled: true })}
              >
                <Button variant="cust" onClick={(e) => handleSaveEvent(e)}>
                  Yes
                  <span className="btn-loader">
                    {commonLoader.submitLoader && <FaCircleNotch />}
                  </span>
                </Button>
              </div>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </Fragment>
  );
};

export default EventList;
