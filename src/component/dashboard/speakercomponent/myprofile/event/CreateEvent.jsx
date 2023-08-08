import React, { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../../../auth/Auth";
import MyProfileSidebar from "../MyProfileSidebar";

const CreateEvent = () => {
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
  const [eventStatus, setEventStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [commonLoader, setCommonLoader] = useState({
    submitLoader: false,
    verifyEmailLoader: false,
  });
  
  const navigate = useNavigate();
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  // craete event api
  const createEventApi = async (e) => {
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
      // const submittedData = e.target.elements.yourInputFieldName.value;
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, submitLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, submitLoader: false });
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
      console.log("data", data?.data);
      setClientName(data?.data);
      toast.warn(data.message);
      setCommonLoader({ ...commonLoader, verifyEmailLoader: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, verifyEmailLoader: false });
    }
  };

  // handle create event validation
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if(!title && !desc && !start && !end && !startTime && !endTime && !email && !address && !clientName && !eventType && !contactNo && !eventStatus){
      setErrorMessage(true);
      toast.warn("All fields are required!");
    } else {
      if (!title) {
        setErrorMessage(true);
        toast.warn("You must provide a title for the event in the title field!");
      } else if (!desc) {
        setErrorMessage(true);
        toast.warn("The description field cannot be left empty!");
      } else if (!start) {
        setErrorMessage(true);
        toast.warn("The start date field is a required field!");
      } else if (!end) {
        setErrorMessage(true);
        toast.warn("The end date field is a required field!");
      } else if (!startTime) {
        setErrorMessage(true);
        toast.warn("The start time field is a required fieldd!");
      } else if (!endTime) {
        setErrorMessage(true);
        toast.warn("The end time field is a required field!");
      } else if (!email) {
        setErrorMessage(true);
        toast.warn("Please verify the email address first!");
      } else if (!address) {
        setErrorMessage(true);
        toast.warn("Please provide us with your complete address details!");
      }else if (!clientName) {
        setErrorMessage(true);
        toast.warn("Please provide the client's name!");
      } else if (!contactNo) {
        setErrorMessage(true);
        toast.warn("Please provide your contact number!");
      } else if (contactNo.length < 8) {
        setErrorMessage(true);
        toast.warn("Invalid contact number!");
      } else if (!eventType) {
        setErrorMessage(true);
        toast.warn("Please specify the event genre!");
      } else if (!eventStatus) {
        setErrorMessage(true);
        toast.warn("Please pick the event status from the options provided!");
      } else {
        createEventApi(e);
      }
    }
  };

  // handle validation email verify
  const handleVerify = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage(true);
      toast.warn("Please provide your email ID!");
    } else if (!emailRegex.test(email)) {
      setErrorMessage(true);
      toast.warn("Invalid email!");
    } else {
      verifyEmailApi();
    }
  };

  // handle onmouse leave email verify
  const handleVerifyEmail=(e)=>{
    email && handleVerify(e);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const eventStatusData = [
    { id: 1, name: "Confirmed", value: "confirmed" },
    { id: 2, name: "Held", value: "held" },
    { id: 3, name: "Canceled", value: "canceled" },
    { id: 4, name: "Lead", value: "lead" },
    { id: 5, name: "Postponed", value: "postponed" },
    { id: 6, name: "Closed", value: "closed" },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Create-Event</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-create-event">
          <div className="mp-form-heading">Create Event</div>
          <form action="" className="row">
            {/* Presentations input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Create Event
              </label>
              <div className="generate-panel">
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Title<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorMessage && !title ? `error-message` : ``
                    }`}
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

              
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Start Date<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errorMessage && !start ? `error-message` : ``
                    }`}
                    value={start}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    End Date<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errorMessage && !end ? `error-message` : ``
                    }`}
                    value={end}
                    min={start ? start : new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Start Time<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="time"
                    className={`form-control ${
                      errorMessage && !startTime ? `error-message` : ``
                    }`}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    End Time<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="time"
                    className={`form-control ${
                      errorMessage && !endTime ? `error-message` : ``
                    }`}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Email<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorMessage && (!email || !emailRegex.test(email)) ? `error-message` : ``
                    }`}
                    placeholder="enter email..."
                    value={email}
                    onMouseLeave={(e) => handleVerifyEmail(e)}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="sap-btn-light mt-3 mb-2"></div>
                </div>

                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Client Name<sup className="text-red">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="enter name....."
                    className={`form-control ${
                      errorMessage && !clientName ? `error-message` : ``
                    }`}
                    {...(clientName.fullName ? { disabled: true } : "")}
                    value={clientName.fullName}
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
                    className={`form-control ${
                      errorMessage && !address ? `error-message` : ``
                    }`}
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
                    className={`form-control ${
                      errorMessage && (!contactNo || contactNo.length < 8) ? `error-message` : ``
                    }`}
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
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Event-status
                  </label>
                  <select
                    className={`form-select ${
                      errorMessage && !eventStatus ? `error-message` : ``
                    }`}
                    aria-label="Default select example"
                    // defaultValue="0"
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
                <div className="col-md-12 form-group-head fill-eventType">
                  <label htmlFor="" className="form-label">
                    event Type<sup className="text-red">*</sup>
                  </label>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className={`form-check-input ${
                          errorMessage && !eventType ? `error-message` : ``
                        }`}
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
                        className={`form-check-input ${
                          errorMessage && !eventType ? `error-message` : ``
                        }`}
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
                        className={`form-check-input ${
                          errorMessage && !eventType ? `error-message` : ``
                        }`}
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

             
                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    Description<sup className="text-red">*</sup>
                  </label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      errorMessage && !desc ? `error-message` : ``
                    }`}
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
            </div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.submitLoader && { disabled: true })}
                onClick={(e) => handleSaveEvent(e)}
              >
                save event{" "}
                <span className="btn-loader">
                  {commonLoader.submitLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateEvent;
