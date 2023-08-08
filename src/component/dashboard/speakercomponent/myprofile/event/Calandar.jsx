import React, { Fragment, useEffect,useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import MyProfileSidebar from "../MyProfileSidebar";

import moment from "moment";
import BigCalendar from "react-big-calendar";
import { Modal, Button } from "react-bootstrap";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Auth from "../../../../../auth/Auth";

const Calandar = () => {
  BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  const navigate=useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [eventType, setEventType] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [events, setEvents] = useState([]);
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [eventStatus, setEventStatus] = useState("");

  const today = moment().startOf("day");
  const selected = moment(start, "YYYY-MM-DD").startOf("day");

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

    // Event status json
    const eventStatusData = [
      { id: 1, name: "Confirmed", value: "confirmed" },
      { id: 2, name: "Held", value: "held" },
      { id: 3, name: "Canceled", value: "canceled" },
      { id: 4, name: "Lead", value: "lead" },
      { id: 5, name: "Postponed", value: "postponed" },
      { id: 6, name: "Closed", value: "closed" },
    ];

  // handle event modal closed
  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  // handle unsave event show in modal
  const handleSlotSelected = (slotInfo) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setStartTime(slotInfo.startTime);
    setEndTime(slotInfo.endTime);
    setTitle("");
    setDesc("");
    setClientName("");
    setAddress("");
    setEventType("");
    setEmail("");
    setContactNo("");
    // setOpenSlot(true);
  };

  // handle save event show in modal
  const handleEventSelected = (event) => {
    setStart(event.start);
    setEnd(event.end);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setTitle(event.title);
    setDesc(event.desc);
    setClientName(event.clientName);
    setAddress(event.address);
    setEventType(event.eventType);
    setEmail(event.email);
    setContactNo(event.contactNo);
    setClickedEvent(event);
    setOpenEvent(true);
  };
 

  // handle delete event function
  const deleteEvent = () => {
    const updatedEvents = events.filter((event) => event.start !== start);
    setEvents(updatedEvents);
    setOpenEvent(false);
    setDeleteEventModal(false);
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

  // handle onmouse leave email verify
  const handleVerifyEmail=(e)=>{
    email && handleVerify(e);
  };

    // verify email api
    const verifyEmailApi = async () => {
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
        console.log("data", data?.data);
        setClientName(data?.data?.fullName);
        toast.warn(data.message);
      }
      if (res.status >= 400 && res.status <= 500) {
        const error = await res.json();
        toast.warn(error.message);
      }
    };

   // craete event api
   const createEventApi = async (e) => {
    // setCommonLoader({ ...commonLoader, submitLoader: true });
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
      eventClintRegister: clientName.fullName ? true : false,
      clintId: clientName?._id,
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
      toast.warn(data.message);
      setOpenSlot(false);
      setOpenEvent(false);
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
      // setEventStatus("");
      // const submittedData = e.target.elements.yourInputFieldName.value;
      // setCommonLoader({ ...commonLoader, submitLoader: false });
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
      // setCommonLoader({ ...commonLoader, submitLoader: false });
    };
  };

    // handle update event function
    const updateEvent = () => {
      const index = events.findIndex((event) => event === clickedEvent);
      const updatedEvent = [...events];
      updatedEvent[index] = {
        title,
        desc,
        start,
        end,
        startTime,
        endTime,
        clientName,
        address,
        eventType,
        email,
        contactNo,
      };
      createEventApi();
      setEvents(updatedEvent);
    };

   // handle add event function
   const setNewAppointment = (e) => {
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
    } else if (!clientName) {
      toast.warn("Please type client name!");
    } else if (!address) {
      toast.warn("Please provide us with your complete address details!");
    } else if (!eventType) {
      toast.warn("Please specify the event genre!");
    } else if (!email) {
      toast.warn("Please provide your email ID!");
    } else if (!emailRegex.test(email)) {
      toast.warn("Invalid email!");
    } else if (!contactNo) {
      toast.warn("Please provide your contact number!");
    } else if (contactNo.length < 8) {
      toast.warn("Invalid contact number!");
    } else {
      const appointment = {
        title,
        start,
        end,
        desc,
        startTime,
        endTime,
        clientName,
        address,
        eventType,
        email,
        contactNo,
      };
      const updatedEvents = [...events, appointment];
      setEvents(updatedEvents);
      createEventApi(e);
    };
  };


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (selected?.isBefore(today) && start) {
      setOpenSlot(false);
    } else if (selected?.isSame(today) && start) {
      !openEvent && setOpenSlot(true);
    } else if (start) {
      !openEvent && setOpenSlot(true);
    }
    // eslint-disable-next-line
  }, [start]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log("event", event.title);
    // console.log("start", start);
    // console.log("end", end);
    // console.log("isSelected", isSelected);
    const backgroundColor = event.backgroundColor;
    const style = {
      backgroundColor,
      opacity: 0.8,
      color: "black",
      border: "0px",
      lineHeight: "normal",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "25px",
      borderRadius: "50px",
      borderBottomLeftRadius: "3px",
      fontSize: "10px",
      fontWeight: "500",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      outline: 0,
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    };
    return {
      style,
    };
  };

  return (
    <Fragment>
      <Helmet>
        <title>Generate-Event</title>
      </Helmet>

      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-generate-event">
          <div className="mp-form-heading" onClick={()=>navigate(-1)}>Generate Event</div>
          <div id="Calendar">
            <BigCalendar
              events={events}
              views={["month", "week", "day", "agenda"]}
              timeslots={2}
              defaultView="month"
              defaultDate={new Date()}
              selectable={true}
              tooltipAccessor={(event) => event.desc}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={(event) => handleEventSelected(event)}
              onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
            />

            {/* Add event modal */}
            <Modal
              show={openSlot}
              id="add-event-pop"
              onHide={handleClose}
              centered
              backdrop="static"
            >
              <Modal.Header closeButton>
                <div className="modal-header-heading">{`Book an appointment on ${moment(
                  start
                ).format("MMMM Do YYYY")}`}</div>
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
                  <div className="col-md-6 form-group">
                    <label htmlFor="" className="form-label">
                      Client Name<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      placeholder="enter name....."
                      className="form-control"
                      {...(clientName ? { disabled: true } : "")}
                    value={clientName}
                      onKeyPress={(e) => {
                        if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group">
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
                </div>
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
                      Email<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="enter email..."
                      value={email}
                      onMouseLeave={(e) => handleVerifyEmail(e)}
                      onChange={(e) => setEmail(e.target.value)}
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
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="dual-btn">
                  <div className="sap-btn-dark">
                    <Button onClick={() => handleClose()}>Cancel</Button>
                  </div>
                  <div className="sap-btn-light">
                    <Button onClick={(e) => setNewAppointment(e)}>Submit</Button>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Edit event modal */}
            <Modal
              show={openEvent}
              onHide={handleClose}
              id="edit-event-pop"
              centered
              backdrop="static"
            >
              <Modal.Header closeButton>
                <div className="modal-header-heading">{`View/Edit Appointment of ${moment(
                  start
                ).format("MMMM Do YYYY")}`}</div>
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
                      placeholder="title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="" className="form-label">
                      Description<sup className="text-red">*</sup>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="description..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="" className="form-label">
                      Start Date<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Your full name"
                      value={moment(start).format("YYYY-MM-DD")}
                      min={moment(start).format("YYYY-MM-DD")}
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
                      placeholder="Your full name"
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
                  <div className="col-md-6 form-group">
                    <label htmlFor="" className="form-label">
                      Client Name<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      placeholder="enter name....."
                      className="form-control"
                      {...(clientName.fullName ? { disabled: true } : "")}
                    value={clientName ? clientName : clientName.fullName}
                      onKeyPress={(e) => {
                        if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
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
                      Email<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="enter email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="dual-btn">
                  <div className="sap-btn-dark">
                    <Button onClick={handleClose}>Cancel</Button>
                  </div>
                  <div className="sap-btn-dark">
                    <Button onClick={() => setDeleteEventModal(true)}>
                      Delete
                    </Button>
                  </div>
                  <div className="sap-btn-light">
                    <Button
                      onClick={() => {
                        updateEvent();
                        handleClose();
                      }}
                    >
                      Confirm Edit
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>

            {/* Delete event modal */}
            <Modal
              show={deleteEventModal}
              onHide={() => setDeleteEventModal(false)}
              id="education-pop"
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                {/* <Modal.Title>Modal title</Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <div className="pop-up-heading text-center">
                  Are you sure you want to delete this event?
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="dual-btn">
                  <div className="sap-btn-dark">
                    <Button
                      variant="cust"
                      onClick={() => setDeleteEventModal(false)}
                    >
                      No
                    </Button>
                  </div>
                  <div className="sap-btn-light">
                    <Button variant="cust" onClick={() => deleteEvent()}>
                      Yes
                      {/* <span className="btn-loader">
                  <FaCircleNotch />
                </span> */}
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calandar;
