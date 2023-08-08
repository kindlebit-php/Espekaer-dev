import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import moment from "moment";
import BigCalendar from "react-big-calendar";

import Auth from "../../../../../auth/Auth";
import MyProfileSidebar from "../MyProfileSidebar";
import Loader from "../../../../loader/Loader";

const Booked = () => {
  BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  const navigate = useNavigate();

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
  const [eventStatus, setEventStatus] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [getEventList, setGetEventList] = useState([]);
  const [openEvent, setOpenEvent] = useState(false);
  const [pageLoader,setPageLoader] = useState(false);
  
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  // handle event modal closed
  const handleClose = () => {
    setOpenEvent(false);
    // setOpenSlot(false);
  };

  // handle unsave event show in modal
  const handleSlotSelected = (slotInfo) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setTitle("");
    setDesc("");
    // setOpenSlot(true);
  };

  // handle save event show in modal
  const handleEventSelected = (event) => {
    const {eventStartTime,eventEndTime,eventAddress,eventType,eventClintEmail,eventClintContact,start,end,title,desc,eventClintName,eventStatus} = event;
    setStartTime(eventStartTime);
    setEndTime(eventEndTime);
    setAddress(eventAddress);
    setEventType(eventType);
    setEmail(eventClintEmail);
    setContactNo(eventClintContact);
    setStart(start);
    setEnd(end);
    setTitle(title);
    setDesc(desc);
    setClientName(eventClintName);
    setOpenEvent(true);
    setEventStatus(eventStatus);
  };

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
      borderRadius: "10px",
      borderBottomLeftRadius: "10px",
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

//  modify event accoerind to calendar

  const modifyData = getEventList && getEventList?.map((obj) => {
    const {} = obj;
    const formattedStartDate = moment(obj.eventStartDate, "YYYY-M-DD").format(
      "YYYY, M, DD"
    );
    const formattedStartTime = moment(obj.eventStartTime, "HH:mm").format(
      "H, m"
    );
    const [year, month, day] = formattedStartDate.split(",").map(Number);
    const [hour, minute] = formattedStartTime.split(",").map(Number);
    const startDate = new Date(year, month - 1, day, hour, minute);
    const formattedEndDate = moment(obj.eventStartDate, "YYYY-M-DD").format(
      "YYYY, M, DD"
    );
    const formattedEndTime = moment(obj.eventStartTime, "HH:mm").format("H, m");
    const [endyear, endmonth, endday] = formattedEndDate.split(",").map(Number);
    const [endhour, endminute] = formattedEndTime.split(",").map(Number);
    const endDate = new Date(endyear, endmonth - 1, endday, endhour, endminute);
    return {
      title: obj.eventTittle,
      desc: obj.eventDescription,
      start: startDate,
      end: endDate,
      eventStartTime: obj.eventStartTime,
      eventEndTime: obj.eventEndTime,
      backgroundColor: obj.background,
      eventAddress: obj.eventAddress,
      eventClintContact: obj.eventClintContact,
      eventClintEmail: obj.eventClintEmail,
      eventClintName: obj.eventClintName,
      eventStatus: obj.eventStatus,
      eventType: obj.eventType,
      _id: obj._id,
    };
  });

  // get event list api
  const getEventListApi = async () => {
    setPageLoader(true);
    const requestKey = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerSaveEventCalender`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setPageLoader(false);
      const data = await res.json();
      setGetEventList(data?.data?.result);
    };
    if (res.status >= 400 && res.status <= 500) {
      setPageLoader(false);
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    getEventListApi();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {pageLoader && <Loader/>}
      <Helmet>
        <title>Event-Booked</title>
      </Helmet>

      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-generate-event">
          <div className="mp-form-heading">Event Booked</div>
          <div id="Calendar">
            <BigCalendar
              events={modifyData}
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

            {/* Preview event modal */}
            <Modal
              show={openEvent}
              onHide={handleClose}
              centered
              backdrop="static"
              id="add-event-pop"
            >
              <Modal.Header closeButton>
                <div className="modal-header-heading">{`Preview event of ${moment(
                  start
                ).format("MMMM Do YYYY")}`} <span className="event-status" style={{
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
                }}>{`(${eventStatus})`}</span></div>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="" className="form-label">
                      Title<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      placeholder="title..."
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                      placeholder="enter name....."
                      className="form-control"
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
                    <label htmlFor="" className="form-label">
                      Address<sup className="text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                      disabled
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
                      disabled
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
                      disabled
                      className="form-control"
                      placeholder="description..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              {/* <Modal.Footer>
                <div className="sap-btn-dark">
                  <Button onClick={handleClose}>Cancel</Button>
                </div>
                <div className="sap-btn-dark">
                  <Button
                    onClick={() => {
                      deleteEvent();
                      handleClose();
                    }}
                  >
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
              </Modal.Footer> */}
            </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Booked;
