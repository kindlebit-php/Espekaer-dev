import React, { Fragment, useEffect } from "react";
import { useState } from "react";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
// import Auth from "../../../../auth/Auth";
// import { useNavigate } from "react-router-dom";

import MyProfileSidebar from "./MyProfileSidebar";

import { Modal, Button } from "react-bootstrap";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const GenerateEvent = () => {
  BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);

  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});
  console.log("openSlot", openSlot);
  console.log("openEvent", openEvent);

  const today = moment().startOf("day");
  const selected = moment(start, "YYYY-MM-DD").startOf("day");

  // handle event modal closed
  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
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
    console.log("event", event);
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
    setClickedEvent(event);
    setOpenEvent(true);
  };
  // handle add event function
  const setNewAppointment = () => {
    if (!title) {
      toast.warn("The title name is required. Please fill it in.");
    } else if (!desc) {
      toast.warn("The description name is required");
    }
    //  else if (!startDate) {
    //   toast.warn("Please specify the starting date for your session");
    // } else if (!endDate) {
    //   toast.warn("Please specify the ending date for your session");
    // }
    else {
      const appointment = { title, start, end, desc };
      const updatedEvents = [...events, appointment];
      setEvents(updatedEvents);
      setOpenSlot(false);
    }
  };

  // handle update event function
  const updateEvent = () => {
    const index = events.findIndex((event) => event === clickedEvent);
    const updatedEvent = [...events];
    updatedEvent[index] = { title, desc, start, end };
    setEvents(updatedEvent);
    setOpenSlot(false);
    setOpenEvent(false);
  };

  // handle delete event function
  const deleteEvent = () => {
    const updatedEvents = events.filter((event) => event.start !== start);
    setEvents(updatedEvents);
    setOpenEvent(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
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
    const backgroundColor = event.backgroundColor ;
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
        <title>Generate Event</title>
      </Helmet>

      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="generate-event">
          <h1>Generate-Event</h1>
          <div id="Calendar">
            <BigCalendar
              events={events}
              views={["month", "week", "day", "agenda"]}
              timeslots={2}
              defaultView="month"
              defaultDate={new Date()}
              selectable={true}
              tooltipAccessor={(event)=>event.desc}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={(event) => handleEventSelected(event)}
              onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
            />
            {/* Add event modal */}
            <Modal show={openSlot} id="add-event-pop" onHide={handleClose} centered>
              <Modal.Header closeButton>
                <div className="modal-header-heading">
                {`Book an appointment on ${moment(
                start
              ).format("MMMM Do YYYY")}`}
                </div>
               </Modal.Header>

              <Modal.Body>
                <div className="col-md-12 form-group">
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

                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Description<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Start Date (optional)
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
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    End Date (optional)
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={moment(end).format("YYYY-MM-DD")}
                    min={moment(start).format("YYYY-MM-DD")}
                    onChange={(e) => setEnd(new Date(e.target.value))}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="dual-btn">
                <div className="sap-btn-dark">
                  <Button onClick={() => handleClose()}>Cancel</Button>
                </div>
                <div className="sap-btn-light">
                  <Button onClick={() => setNewAppointment()}>Submit</Button>
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
                <div className="modal-header-heading">
                {`View/Edit Appointment of ${moment(
                start
              ).format("MMMM Do YYYY")}`}</div></Modal.Header>
              <Modal.Body>
                <div className="col-md-12 form-group">
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

                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Description<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
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
                <div className="col-md-12 form-group">
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
              </Modal.Body>
              <Modal.Footer>
                <div className="dual-btn">
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
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GenerateEvent;
