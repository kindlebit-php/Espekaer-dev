import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import moment from "moment";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";

import Auth from "../../../auth/Auth";

const OrgnzrAddEvent = () => {
  const navigate = useNavigate();

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
  const [selectFees, setSelectFees] = useState("");
  const [audSize, setAudSize] = useState("");
  const [audSeniority, setAudSeniority] = useState("");
  const [presentationType, setPresentationType] = useState("");
  const [speakerFrom, setSpeakerFrom] = useState("");
  const [speakerTravel, setSpeakerTravel] = useState("");
  const [speakerAccommodation, setSpeakerAccommodation] = useState("");
  const [registrationEntrance, setRegistrationEntrance] = useState("");
  const [topicsRelated, setTopicsRelated] = useState("");
  const [speakerSpeakLang, setSpeakerSpeakLang] = useState("");
  const [senderImage, setSenderImage] = useState("");
  const [sendApiImage, setSendApiImage] = useState("");
  const [storeState, setStoreState] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeCountry, setStoreCountry] = useState("");
  const [getState, setGetState] = useState("");
  const [getCity, setGetCity] = useState("");
  const [getCountry, setGetCountry] = useState("");

  const [getTopicApi, setGetTopicApi] = useState("");
  const [getLanguageApi, setGetLanguageApi] = useState("");
  const [getAvailableApi, setGetAvailableApi] = useState("");

  const [commonState, setCommonState] = useState({
    eventModal: false,
    eventSubmitLoader: false,
  });

  const speakerFormArr = [
    "Europe",
    "North America",
    "South America",
    "Central Asia",
    "South-East Asia",
    "Middle East, Africa",
    "India",
    "Australia & New Zealand",
  ];

  // Event fees json
  const fees = [
    { id: 1, name: "Ask for pricing" },
    { id: 2, name: "Up to $250" },
    { id: 3, name: "$250 - $1500" },
    { id: 4, name: "$1500 - $5000" },
    { id: 5, name: "$5000 - $10000" },
    { id: 6, name: "More than $10000" },
  ];

  const audienceSize = [
    { id: 1, size: "1-10" },
    { id: 2, size: "10-50" },
    { id: 3, size: "50-100" },
    { id: 4, size: "100-500" },
    { id: 5, size: "500-1000" },
    { id: 6, size: "1000-5000" },
    { id: 7, size: "5000+" },
  ];

  const audienceSeniority = [
    { id: 1, option: "yes" },
    { id: 2, option: "no" },
  ];

  const speakerPresentation = [
    { id: 1, option: "Conference (Full-day Event)" },
    { id: 2, option: "Workshop (3+ hour Event)" },
    { id: 1, option: "Session (1-2 hour Event)" },
    { id: 2, option: "Moderator" },
    { id: 1, option: "Webinar (Virtual Event)" },
    { id: 2, option: "School (incl. charity)" },
    { id: 1, option: "Meetup" },
    { id: 2, option: "Panel" },
    { id: 2, option: "Certificate Program" },
    { id: 2, option: "Emcee" },
  ];

  const speakerTravelCoveredArr = [
    { id: 1, option: "yes" },
    { id: 2, option: "Partially" },
    { id: 3, option: "no" },
  ];

  const speakerAccommodationArr = [
    { id: 1, option: "yes" },
    { id: 2, option: "Partially" },
    { id: 3, option: "no" },
  ];

  const registrationEntranceFeeArr = [
    { id: 1, option: "Free for speakers" },
    { id: 2, option: "speaker must pay a discounted fee" },
    { id: 3, option: "speaker must pay the full pay" },
  ];

  const eventTypeArr = [
    { id: 1, type: "on-site presentation" },
    { id: 2, type: "phone conference" },
    { id: 3, type: "virtual meeting" },
  ];

  const genderArr = [
    { id: 1, type: "male" },
    { id: 2, type: "female" },
    { id: 3, type: "any" },
  ];

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

  // Get all topics api
  const handleTopicsApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getTopic`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetTopicApi(data?.data);
  };

  // Get all language api
  const handleLanguageApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getLanguage`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetLanguageApi(data?.data);
  };

  // Get event availble for api
  const eventAvailbleApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAvailableFor`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetAvailableApi(data?.data);
  };

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

  // craete event api
  const createEventApi = async () => {
    setCommonState({ ...commonState, eventSubmitLoader: true });
    const formData = new FormData();
    formData.append("eventTittle", title);
    formData.append("orgContact", contactNo);
    formData.append("eventCountry", getCountry);
    formData.append("eventState", getState);
    formData.append("eventCity", getCity);
    formData.append("eventDescription", desc);
    formData.append("eventStartDate", start);
    formData.append("eventEndDate", end);
    formData.append("eventStartTime", startTime);
    formData.append("eventEndTime", endTime);
    formData.append("eventAddress", address);
    formData.append("eventImage", sendApiImage);
    formData.append("speakerFrom", speakerFrom);
    formData.append("eventFees", selectFees);
    formData.append("eventType", eventType);
    formData.append("eventGender", gender);
    formData.append("applicationStartDate", appStartDate);
    formData.append("applicationEndDate", appEndDate);
    formData.append("eventAudienceSize", audSize);
    formData.append("eventAudienceType", audSeniority);
    formData.append("eventTopic", topicsRelated);
    formData.append("eventLanguage", speakerSpeakLang);
    formData.append("eventPresentType", presentationType);
    formData.append("speakerTravelCovered", speakerTravel);
    formData.append("eventAccommodationCovered", speakerAccommodation);
    formData.append("eventEntranceFees", registrationEntrance);

    const requestKey = {
      method: "POST",
      headers: {
        authToken: decrypt,
      },
      body: formData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/userEventCreate`,
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
    } else if (!contactNo) {
      toast.warn("Please provide your contact number!");
    } else if (contactNo.length < 8) {
      toast.warn("Invalid contact number!");
    } else if (!getCountry) {
      toast.warn("Country is required!");
    } else if (!getState) {
      toast.warn("State is required!");
    } else if (!getCity) {
      toast.warn("City is required!");
    } else if (!address) {
      toast.warn("Please provide us with your complete address details!");
    } else if (!senderImage) {
      toast.warn("Please upload file!");
    } else if (!speakerFrom) {
      toast.warn("Please select speaker from!");
    } else if (!selectFees) {
      toast.warn("Please select fee!");
    } else if (!eventType) {
      toast.warn("Please specify the event genre!");
    } else if (!gender) {
      toast.warn("Please select gender!");
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
    } else if (!appStartDate) {
      toast.warn("application period start date is required!");
    } else if (!appEndDate) {
      toast.warn("application period end date is required!");
    } else if (!audSize) {
      toast.warn("Please define audience size!");
    } else if (!audSeniority) {
      toast.warn("Please select audience type/seniority!");
    } else if (!topicsRelated) {
      toast.warn("Please select topics related to your event!");
    } else if (!speakerSpeakLang) {
      toast.warn("Please select languages speakers need to speak!");
    } else if (!presentationType) {
      toast.warn("Please select speakers presentation type!");
    } else if (!speakerTravel) {
      toast.warn("Please select speakers travel covered!");
    } else if (!speakerAccommodation) {
      toast.warn("Please select speakers accommodation covered!");
    } else if (!registrationEntrance) {
      toast.warn("Please select event registration/entrance fee!");
    } else {
       createEventApi();
      //  toast.warn("success");
    }
  };

  useEffect(() => {
    countryApi();
    handleTopicsApi();
    handleLanguageApi();
    eventAvailbleApi();
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
        <title>Add Event</title>
      </Helmet>
      <div className="upgrade-page">
        <section className="upgrade-sec">
          <div className="upgrade-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Add Event</div>
            <div className="row">
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Title<sup className="text-red">*</sup>
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter available or not-available..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Contact no:<sup className="text-red">*</sup>
                  </label>
                </div>
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
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Country<sup className="text-red">*</sup>
                  </label>
                </div>
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
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    State<sup className="text-red">*</sup>
                  </label>
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="0"
                  onChange={(e) => setGetState(e.target.value)}
                >
                  <option value="">
                    {(storeState &&
                      storeState?.filter(
                        (data) => data?.isoCode === getState
                      ))[0]?.name
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
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    City<sup className="text-red">*</sup>
                  </label>
                </div>
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
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Full Address<sup className="text-red">*</sup>
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Content type (png, gif, jpg or jpeg)
                  </label>
                </div>
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
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    speaker from
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={speakerFrom}
                  onChange={(e) => setSpeakerFrom(e.target.value)}
                >
                  <option value="">select</option>
                  {speakerFormArr.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    FEE
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={selectFees}
                  onChange={(e) => setSelectFees(e.target.value)}
                >
                  <option value="">select</option>
                  {fees.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    event Type
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="">select</option>
                  {eventTypeArr.map((item) => (
                    <option key={item.id} value={item.type}>
                      {item.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    gender
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">select</option>
                  {genderArr.map((item) => (
                    <option key={item.id} value={item.type}>
                      {item.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Description<sup className="text-red">*</sup>
                  </label>
                </div>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Please enter description..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="divider"></div>
              <label htmlFor="" className="form-label">
                DATE OF YOUR EVENT<sup className="text-red">*</sup>
              </label>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Start Date<sup className="text-red">*</sup>
                  </label>
                </div>
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
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    End Date<sup className="text-red">*</sup>
                  </label>
                </div>
                <input
                  type="date"
                  className="form-control"
                  value={moment(end).format("YYYY-MM-DD")}
                  min={moment(start).format("YYYY-MM-DD")}
                  onChange={(e) => setEnd(new Date(e.target.value))}
                />
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Start Time<sup className="text-red">*</sup>
                  </label>
                </div>
                <input
                  type="time"
                  className="form-control"
                  value={startTime}
                  // min={moment(start).format("YYYY-MM-DD")}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    End Time<sup className="text-red">*</sup>
                  </label>
                </div>
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
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Start Date<sup className="text-red">*</sup>
                  </label>
                </div>
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
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    End Date<sup className="text-red">*</sup>
                  </label>
                </div>
                <input
                  type="date"
                  className="form-control"
                  value={moment(appEndDate).format("YYYY-MM-DD")}
                  min={moment(appStartDate).format("YYYY-MM-DD")}
                  onChange={(e) => setAppEndDate(new Date(e.target.value))}
                />
              </div>
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

              <div className="divider"></div>
              <label htmlFor="" className="form-label">
                event information<sup className="text-red">*</sup>
              </label>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Audience Size
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={audSize}
                  onChange={(e) => setAudSize(e.target.value)}
                >
                  <option value="">select</option>
                  {audienceSize.map((item) => (
                    <option key={item.id} value={item.size}>
                      {item.size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Audience type/seniority
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={audSeniority}
                  onChange={(e) => setAudSeniority(e.target.value)}
                >
                  <option value="">select</option>
                  {audienceSeniority.map((item) => (
                    <option key={item.id} value={item.option}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="divider"></div>
              <label htmlFor="" className="form-label">
                required topics & skills<sup className="text-red">*</sup>
              </label>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    select topics related to your event
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={topicsRelated}
                  onChange={(e) => setTopicsRelated(e.target.value)}
                >
                  <option value="">select</option>
                  {getTopicApi &&
                    getTopicApi.map((data) => {
                      return <option value={data.topic}>{data.topic}</option>;
                    })}
                </select>
              </div>

              <div className="divider"></div>
              <label htmlFor="" className="form-label">
                Other Info<sup className="text-red">*</sup>
              </label>
              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    select languages speakers need to speak
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={speakerSpeakLang}
                  onChange={(e) => setSpeakerSpeakLang(e.target.value)}
                >
                  <option value="">select</option>
                  {getLanguageApi &&
                    getLanguageApi?.map((lang) => {
                      return (
                        <option value={lang?.language}>{lang?.language}</option>
                      );
                    })}
                </select>
              </div>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    select the speakers presentation type
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={presentationType}
                  onChange={(e) => setPresentationType(e.target.value)}
                >
                  <option value="">select</option>
                  {getAvailableApi &&
                    getAvailableApi?.map((item) => (
                      <option key={item.id} value={item.availableFor}>
                        {item.availableFor}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    speaker travel covered
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={speakerTravel}
                  onChange={(e) => setSpeakerTravel(e.target.value)}
                >
                  <option value="">select</option>
                  {speakerTravelCoveredArr.map((item) => (
                    <option key={item.id} value={item.option}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    speaker accommodation covered
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={speakerAccommodation}
                  onChange={(e) => setSpeakerAccommodation(e.target.value)}
                >
                  <option value="">select</option>
                  {speakerAccommodationArr.map((item) => (
                    <option key={item.id} value={item.option}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 form-group">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    event registration/entrance fee
                  </label>
                </div>
                <select
                  className="form-select"
                  defaultValue="0"
                  aria-label="Default select example"
                  value={registrationEntrance}
                  onChange={(e) => setRegistrationEntrance(e.target.value)}
                >
                  <option value="">select</option>
                  {registrationEntranceFeeArr.map((item) => (
                    <option key={item.id} value={item.option}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sap-btn-light">
              <button
                onClick={(e) => setNewAppointment(e)}
                {...(commonState.eventSubmitLoader && { disabled: true })}
              >
                Submit
                <span className="btn-loader">
                  {commonState.eventSubmitLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default OrgnzrAddEvent;
