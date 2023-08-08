import React, { useState, useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Auth from "../auth/Auth";
import Loader from "./loader/Loader";
import Header from "./dashboard/header/Header";
import Pagination from "./dashboard/custompagination/Pagination";

import {
  FaMicrophoneAlt,
  FaChalkboardTeacher,
  FaRecordVinyl,
  FaUserTie,
  FaUserFriends,
  FaAward,
  FaMapMarkerAlt,
  FaLanguage,
  FaRegCompass,
  FaUsers,
  FaGraduationCap,
  FaTv,
  FaMicrophone, 
} from "react-icons/fa";

let PageSize = 5;

const SpeakerListing = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  // Decryprt token
  const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");

  const [storeCountry, setStoreCountry] = useState([]);
  const [getCountry, setGetCountry] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [getAllTopics, setGetAllTopics] = useState([]);
  const [getAllLanguage, setGetAllLanguage] = useState([]);
  const [getAllIndustry, setGetAllIndustry] = useState([]);
  const [getAllTalent, setGetAllTalent] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState([]);
  const [availableTo, setAvailableTo] = useState([]);
  const [getAvailbleData, setGetAvailbleData] = useState([]);
  const [availableFor, setSelectedAvailableFor] = useState([]);
  const [selectGender, setSelectGender] = useState([]);
  const [selectFees, setSelectFees] = useState([]);
  const [getTagName, setGetTagName] = useState("");
  const [getNego, setGetNego] = useState("");
  const [speakerListData, setSpeakerListData] = useState([]);

  const [sortByData, setSortByData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [defaultMessage, setDefaultMessage] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState([]);
  const [searchNameEmail, setSearchNameEmail] = useState("");
  
  const [commonState, setCommonState] = useState({
    speakListLoader: false,
    searchLoader: false,
    filterMes: "",
  });

   // Decryprt token
   const decryptRoll = Auth.getRol()
   ?.split("")
   ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
   .join("");

  const items = [
    { id: 1, name: "Europe" },
    { id: 2, name: "North America" },
    { id: 3, name: "South America" },
    { id: 4, name: "Central Asia" },
    { id: 5, name: "South-East Asia" },
    { id: 6, name: "Middle East, Africa" },
    { id: 7, name: "India" },
    { id: 8, name: "Australia & New Zealand" },
  ];

  const fees = [
    { id: 1, name: "Ask for pricing" },
    { id: 2, name: "Up to $250" },
    { id: 3, name: "$250 - $1500" },
    { id: 4, name: "$1500 - $5000" },
    { id: 5, name: "$5000 - $10000" },
    { id: 6, name: "More than $10000" },
  ];

  const sortBy = [
    // { id: 1, name: "Random",value:"" },
    // { id: 2, name: "Relevance",value:"" },
    // { id: 3, name: "Most recommended",value:"" },
    { id: 1, name: "Name (a-z)", value: "fullName-asc" },
    { id: 2, name: "Name (z-a)", value: "fullName-desc" },
    { id: 3, name: "Member since (oldest first)", value: "oldest" },
    { id: 4, name: "Member since (recent first)", value: "newest" },
    { id: 5, name: "Most recommended", value: "mostview" },
    // { id: 6, name: "Fee (highest first)",value:"" },
    // { id: 7, name: "Fee (volunteer first)",value:"" },
  ];

  const genders = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
    // { id: 3, name: "other" },
  ];

  const nego = ["Yes", "No"];

  // Handle select available to checkbox
  const handleCheckboxClick = (name) => {
    setAvailableTo((data) => {
      if (data.includes(name)) {
        return data.filter((data) => data !== name);
      } else {
        return [...data, name];
      }
    });
  };

  // Handle select gender to checkbox
  const handleCheckboxGenderClick = (name) => {
    setSelectGender((data) => {
      if (data.includes(name)) {
        return data.filter((data) => data !== name);
      } else {
        return [...data, name];
      }
    });
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
  // Get search keyword api
  const searchKeywordApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/suggestions`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setSearchKeyWord(data?.data);
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
    setGetAllTopics(data?.data);
  };

    // Get all industry api
    const getIndustryApi = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}speaker/getIndustry`
      );
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const data = await res.json();
      setGetAllIndustry(data?.data);
    };

  // Get all talent api
  const getTalentApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getTalent`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    };
    const data = await res.json();
    setGetAllTalent(data?.data);
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
    setGetAllLanguage(data?.data);
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
    setGetAvailbleData(data?.data);
  };

  // Get speaker listing api & all type of filteration
  const getSpeakerListApi = async () => {
    setCommonState({ ...commonState, searchLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}${decryptRoll===`speaker` ? `speaker`:`user`}/getSpeakerSearchList?gender[]=${selectGender}&fee[]=${selectFees}&country[]=${
        getCountry && getCountry?.map((isCo) => isCo?.isoCode)
      }&topic[]=${
        selectedTopics && selectedTopics?.map((data) => data?.topic)
      }&availableFor[]=${
        availableFor && availableFor?.map((data) => data?.availableFor)
      }&language[]=${
        selectedLanguage && selectedLanguage?.map((data) => data?.language)
      }&availableTo[]=${availableTo}&pricesNegotiable=${getNego}&tags[]=${getTagName}&limit=${PageSize}&page=${currentPage}&sort=${sortByData}&search=${searchNameEmail}&talent[]=${
        selectedTalent && selectedTalent?.map((data) => data?.talentName)
      }&industry[]=${
        selectedIndustry && selectedIndustry?.map((data) => data?.industryName==="energy(oil,gas & utilities)" ? "energy":data?.industryName)
      }${id ? `&homePage=${id==="energy(oil,gas & utilities)" ? "energy":id}`:``}`,
      requestKey
    );
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      setDefaultMessage(data?.mes);
      setCommonState({ ...commonState, searchLoader: false });
      setSpeakerListData(data?.data);
      setTotalData(data?.totalData);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error?.message);
      setCommonState({ ...commonState, searchLoader: false });
    };
  };

  useEffect(() => {
    countryApi();
    handleTopicsApi();
    eventAvailbleApi();
    handleLanguageApi();
    searchKeywordApi();
    getIndustryApi();
    getTalentApi();
    window.scrollTo({
      top: 0,
      behavior: 'instant',
  });
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    const debounce = setTimeout(() => {
      getSpeakerListApi();
      window.scrollTo({
        top: 0,
        behavior: 'instant',
    });
    }, 600);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line
  }, [
    selectGender,
    selectFees,
    getCountry,
    selectedTopics,
    availableFor,
    selectedLanguage,
    availableTo,
    getNego,
    getTagName,
    currentPage,
    sortByData,
    searchNameEmail,
    // searchKeyWord,
    selectedIndustry,
    selectedTalent,
  ]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({top:0,behavior:"instant"});
  }, [
    selectGender,
    selectFees,
    getCountry,
    selectedTopics,
    availableFor,
    selectedLanguage,
    availableTo,
    getNego,
    getTagName,
    sortByData,
    searchNameEmail,
    searchKeyWord,
    selectedIndustry,
    selectedTalent
  ]);


  return (
    <>
      {(commonState.searchLoader && !searchNameEmail) && <Loader />}
      <Helmet>
        <title>Speaker listing</title>
      </Helmet>
      <Header />
      <div className="speakers-lisitng">
        <section className="speakers-lisitng-sec">
                 
          <div className="speakers-lisitng-sec-inner container">
            <div className="sap-sm-heading sap-title-head">
              Find Your Next Talent {`${totalData ? `(${totalData})` : ``}`}
            </div>
            <form className="add-event-head add-event-head-clone-splisting">
              <div className="add-event-inner">
                <div className="form-group" id="sort-search">
                  <ReactSearchAutocomplete
                    items={searchKeyWord}
                    maxResults={2}
                    placeholder="Search..."
                    onSelect={(item) => setSearchNameEmail(item.name)}
                    onClear={() => setSearchNameEmail("")}
                    onSearch={(string)=>setSearchNameEmail(string)}
                    // styling={{zIndex:5,backgroundColor:"#f2f2f2",border:"2px solid #edc967",borderRadius:"50px"}}
                    className="search-autocomplete"
                  />
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
                    onChange={(e) => setSortByData(e.target.value)}
                  >
                    <option value="">Select</option>
                    {sortBy.map((data, index) => {
                      return (
                        <option key={index} value={data.value}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

            </form>

            <div className="sl-page-sl-header">
              <div className="sl-head">
                <div className="sl-left">
                  <div className="sl-left-heading">
                    <label htmlFor="" className="form-label">
                      filters {defaultMessage ? `(${defaultMessage})` : ""}
                    </label>
                    {/* <div className="clear-filter">Clear filters</div> */}
                  </div>
                  {/* <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        industry
                      </label>
                      <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Automotive
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Energy (oil and gas, utilities)
                        </label>
                      </div>
                    </div>
                  </div> */}
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
                    {fees.map((item, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          defaultChecked={selectFees.includes(item.name)}
                          onClick={() => handleFeeCheckboxClick(item.name)}
                          name="flexRadioDefault"
                          id={item.id}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        KEYWORD
                      </label>
                      <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div>
                    </div>
                    <div className="form-group">
                      <Typeahead
                        id="basic-example"
                        onChange={setSelected}
                        options={options}
                        placeholder="Choose a state..."
                        selected={selected}
                        multiple
                      />
                    </div>
                  </div> */}
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        COUNTRY
                      </label>
                      {/* <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div> */}
                    </div>
                    {/* <div className="form-group">
                      <select
                        className="form-select"
                        defaultValue="0"
                        aria-label="Default select example"
                        onChange={(e) => setGetCountry(e.target.value)}
                      >
                        <option value="">Select</option>
                        {storeCountry &&
                          storeCountry?.map((data) => {
                            const { name, isoCode, id } = data;
                            return (
                              <option key={id} value={isoCode}>
                                {name}
                              </option>
                            );
                          })}
                      </select>
                    </div> */}
                    <div className="form-group">
                      <Typeahead
                        id="basic-example"
                        labelKey="name"
                        onChange={setGetCountry}
                        options={storeCountry}
                        placeholder="Choose country..."
                        selected={getCountry}
                      />
                    </div>
                  </div>
                  {/* <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        ADVANCED
                      </label>
                      <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="advance"
                      />
                      <label className="form-check-label" htmlFor="advance">
                        Has video
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="advanced"
                      />
                      <label className="form-check-label" htmlFor="advanced">
                        Has recommendationApply
                      </label>
                    </div>
                  </div> */}
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        TOPICS
                      </label>
                      {/* <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div> */}
                    </div>
                    <div className="form-group">
                      <Typeahead
                        labelKey="topic"
                        id="basic-example"
                        className={`${selectedTopics?.length<1 ? `empty-select-tag`:``}`}
                        onChange={setSelectedTopics}
                        options={getAllTopics}
                        placeholder="Choose topics..."
                        selected={selectedTopics}
                        multiple
                      />
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="topics1"
                        />
                        <label className="form-check-label" htmlFor="topics1">
                          Leadership
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="topics2"
                        />
                        <label className="form-check-label" htmlFor="topics2">
                          Business
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="topics3"
                        />
                        <label className="form-check-label" htmlFor="topics3">
                          Education
                        </label>
                      </div> */}
                    </div>
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        AVAILABLE FOR
                      </label>
                      {/* <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div> */}
                    </div>
                    <div className="form-group">
                      <Typeahead
                        id="basic-example"
                        labelKey="availableFor"
                        className={`${availableFor?.length<1 ? `empty-select-tag`:``}`}
                        onChange={setSelectedAvailableFor}
                        options={getAvailbleData}
                        placeholder="Choose available for..."
                        selected={availableFor}
                        multiple
                      />
                    </div>
                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="avail1"
                      />
                      <label className="form-check-label" htmlFor="avail1">
                        Moderator
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="avail2"
                      />
                      <label className="form-check-label" htmlFor="avail2">
                        MeetupApply
                      </label>
                    </div> */}
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        LANGUAGE
                      </label>
                    </div>
                    <Typeahead
                      labelKey="language"
                      id="basic-example"
                      className={`${selectedLanguage?.length<1 ? `empty-select-tag`:``}`}
                      onChange={setSelectedLanguage}
                      options={getAllLanguage}
                      placeholder="Choose language..."
                      selected={selectedLanguage}
                      multiple
                    />
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        INDUSTRY
                      </label>
                    </div>
                    <Typeahead
                      labelKey="industryName"
                      id="basic-example"
                      className={`${selectedIndustry?.length<1 ? `empty-select-tag`:``}`}
                      onChange={setSelectedIndustry}
                      options={getAllIndustry}
                      placeholder="Choose industry..."
                      selected={selectedIndustry}
                      multiple
                    />
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        Talent
                      </label>
                    </div>
                    <Typeahead
                      labelKey="talentName"
                      id="basic-example"
                      className={`${selectedTalent?.length<1 ? `empty-select-tag`:``}`}
                      onChange={setSelectedTalent}
                      options={getAllTalent}
                      placeholder="Choose talent..."
                      selected={selectedTalent}
                      multiple
                    />
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        GENDER
                      </label>
                    </div>
                    {genders.map((item ,index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={selectGender.includes(item.name)}
                          onClick={() => handleCheckboxGenderClick(item.name)}
                          name="flexRadioDefault"
                          id={item.id}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="sl-fil-inner">
                    <div className="sl-fil-heading">
                      <label htmlFor="" className="form-label">
                        AVAILABLE TO
                      </label>
                      {/* <div className="drop-arrow">
                        <i>
                          <FaAngleDown />
                        </i>
                      </div> */}
                    </div>
                    {items.map((item, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked={availableTo.includes(item.name)}
                          onClick={() => handleCheckboxClick(item.name)}
                          name="flexRadioDefault"
                          id={item.id}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.name}
                        </label>
                      </div>
                    ))}

                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="to1"
                      />
                      <label className="form-check-label" htmlFor="to1">
                        Global
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexRadioDefault"
                        id="to2"
                      />
                      <label className="form-check-label" htmlFor="to2">
                        North America
                      </label>
                    </div> */}
                  </div>
                  <div className="sl-fil-heading">
                    <label htmlFor="" className="form-label">
                      Negotiable<sup className="text-red">*</sup>
                    </label>
                  </div>
                  {nego.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={data}
                          name="volunteer"
                          defaultChecked={data === getNego}
                          onChange={(e) => setGetNego(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>

                <div className="sl-right">
                  <div className="sl-right-head">
                    {speakerListData?.length > 0
                      ? speakerListData?.map((data, index) => {
                          const { id, profileImage, planName, fullName } = data;
                          return (
                            <div className="sl-right-inner" key={index}>
                              <div
                                className={`floating-tag ${
                                  planName === `Platinum`
                                    ? `gold`
                                    : planName === `VIP`
                                    ? `silver`
                                    : planName === `free`
                                    ? `bronze`
                                    : ""
                                }`}
                              >
                                {planName}
                              </div>
                              <div className="slri-img">
                                <img
                                  src={
                                    profileImage
                                      ? `${process.env.REACT_APP_IMAGE_URL}${profileImage}`
                                      : `assets/image/user-placeholder.jpg`
                                  }
                                  onClick={() =>
                                    navigate(
                                      `/single-speaker-list/${data?._id}`
                                    )
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="slri-con">
                                <div className="slri-top">
                                  <div className="slri-top-left">
                                    <div className="slri-name" onClick={() =>
                                    navigate(
                                      `/single-speaker-list/${data?._id}`
                                    )
                                  }>{fullName}</div>
                                    <div className="slri-desg">
                                      {
                                        data?.userdetailsData[0]
                                          ?.professionalCredentials
                                      }
                                    </div>
                                    {data?.speakerpositionsData?.map(
                                      (com, index) => {
                                        return (
                                          <span
                                            key={index}
                                            className="slri-company"
                                          >
                                            {(index ? "," : "") + com?.company}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                  <div className="slri-top-right">
                                    <ul>
                                      <li>
                                        <i className="">
                                          <FaMapMarkerAlt />
                                        </i>{" "}
                                        {data?.userdetailsData[0]?.country}
                                      </li>
                                      <li>
                                        <i className="">
                                          <FaLanguage />
                                        </i>{" "}
                                        {data?.speakertopicsData[0]?.language?.map(
                                          (data, index) => {
                                            return (
                                              <div key={index}>{`${
                                                (index ? "," : "") +
                                                data?.language
                                              }`}</div>
                                            );
                                          }
                                        )}
                                      </li>
                                      <li>
                                        <i>
                                          <FaRegCompass />
                                        </i>{" "}
                                        {data?.availabilitiesData[0]?.availableTo
                                          ?.slice(0, 1)
                                          ?.map((data, index) => {
                                            return `${
                                              (index ? "," : "") + data
                                            }`;
                                          })}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                {data?.userdetailsData
                                  ?.slice(0, 1)
                                  ?.map((choose, index) => {
                                    return (
                                      <div key={index} className="text-para">
                                        {" "}
                                        {choose?.whyChooseMe?.split("")
                                          ?.length > 260
                                          ? `${choose?.whyChooseMe?.slice(
                                              0,
                                              260
                                            )}...`
                                          : choose?.whyChooseMe}
                                      </div>
                                      // <div key={bioD.id}>
                                      //   {/* <div className="slri-top">
                                      //   <div className="slri-company">
                                      //         {bioD?.bioTitle}
                                      //   </div>
                                      //   </div> */}
                                      //   <div className="text-para"> {bioD?.bio}</div>
                                      //   {/* {Object.keys(bioD)?.map((key) => {
                                      //     return (
                                      //       <div className="slri-company" key={key}>
                                      //         {bioD[key]?.split(" ")?.length > 50
                                      //           ? `${bioD[key]?.slice(0, 250)}...`
                                      //           : bioD[key]}
                                      //       </div>
                                      //     );
                                      //   })} */}
                                      // </div>
                                    );
                                  })}
                                <div className="doable-head">
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            `Conference (Full-day Event)`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaMicrophoneAlt />
                                      </i>
                                    </div>
                                    <div className="doable-title">
                                      Conference
                                    </div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            `Workshop (3+ hour event)`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaChalkboardTeacher />
                                      </i>
                                    </div>
                                    <div className="doable-title">workshop</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            `Session (1-2 hour event)`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaRecordVinyl />
                                      </i>
                                    </div>
                                    <div className="doable-title">session</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor === `Moderator`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    } `}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaUserTie />
                                      </i>
                                    </div>
                                    <div className="doable-title">
                                      moderator
                                    </div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            `Webinar (Virtual event)`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaTv />
                                      </i>
                                    </div>
                                    <div className="doable-title">webinar</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            `School (incl. charity)`
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaGraduationCap />
                                      </i>
                                    </div>
                                    <div className="doable-title">school</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return data.availableFor === "Meetup";
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaUsers />
                                      </i>
                                    </div>
                                    <div className="doable-title">meetup</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return data.availableFor === "Panel";
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaUserFriends />
                                      </i>
                                    </div>
                                    <div className="doable-title">panel</div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return (
                                            data.availableFor ===
                                            "Certificate Program"
                                          );
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaAward />
                                      </i>
                                    </div>
                                    <div className="doable-title">
                                      certificate program
                                    </div>
                                  </div>
                                  <div
                                    className={`doable-list ${
                                      data?.availabilitiesData[0]?.eventsAvailable?.find(
                                        (data) => {
                                          return data.availableFor === "Emcee";
                                        }
                                      )
                                        ? `active`
                                        : ``
                                    }`}
                                  >
                                    <div className="doable-icon">
                                      <i className="">
                                        <FaMicrophone />
                                      </i>
                                    </div>
                                    <div className="doable-title">Emcee</div>
                                  </div>
                                </div>
                                <div className="hashtags">
                                  {data?.speakertopicsData[0]?.tag?.map(
                                    (item, index) => {
                                      return (
                                        <p
                                          key={index}
                                          className=""
                                          onClick={() => setGetTagName(item)}
                                        >
                                          {`#${item}`}
                                        </p>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : !commonState.searchLoader && (
                          <div className="no-speaker-ban">
                            <div className="nsb-svg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                width="676"
                                height="676"
                                viewBox="0 0 676 676"
                                // xmlns:xlink="http://www.w3.org/1999/xlink"
                              >
                                <path
                                  d="M938,450a337.45265,337.45265,0,0,1-17.85,108.68q-1.02008,3-2.09,5.98a338.39278,338.39278,0,0,1-53.77,96.05q-10.32,12.945-21.87,24.82-11.55,11.895-24.25,22.63a336.248,336.248,0,0,1-165.78,75.8h-.01q-11.7,1.815-23.63,2.83Q614.545,787.99,600,788A336.94,336.94,0,0,1,358.09,686.05q-3.315-3.39-6.53-6.88-8.01-8.685-15.41-17.91-4.155-5.19-8.11-10.54a336.714,336.714,0,0,1-40.24-70.98,332.25383,332.25383,0,0,1-11.7-32.84c-.24-.79-.47-1.57995-.7-2.37q-.75-2.55-1.45-5.13A338.38,338.38,0,0,1,262,450c0-186.67,151.33-338,338-338S938,263.33,938,450Z"
                                  transform="translate(-262 -112)"
                                  fill="#f2f2f2"
                                />
                                <path
                                  d="M692.33,753.02l-6.84,24.07a337.62955,337.62955,0,0,1-33.1,6.87h-.01q-11.7,1.815-23.63,2.83L651,755l3.16-.28Z"
                                  transform="translate(-262 -112)"
                                  fill="#2f2e41"
                                />
                                <path
                                  d="M864.29,660.71q-10.32,12.945-21.87,24.82l-26.38.02-141.87.16-25.54.03-16.98.02-25.26.02-19.43.02-35.89.04-21.17.03-44.58.04-21.28.03-58.97.06-37.04.04-9.94.01q-3.315-3.39-6.53-6.88-8.01-8.685-15.41-17.91l20.58-.02,14.02-.01,32.46-.04,62.64-.06,21.17-.02,8.56-.01h.03l6.72-.01,3.01-.01,7.71-.01h3.26l22.86-.02,49.31-.06,21.7-.02,20.78-.02,19.48-.02,27.95-.03,149.28-.15Z"
                                  transform="translate(-262 -112)"
                                  fill="#ccc"
                                />
                                <ellipse
                                  cx="244.01981"
                                  cy="558.88337"
                                  rx="20.13233"
                                  ry="6.42521"
                                  fill="#3f3d56"
                                />
                                <ellipse
                                  cx="244.01981"
                                  cy="554.5999"
                                  rx="20.13233"
                                  ry="6.42521"
                                  fill="#3f3d56"
                                />
                                <path
                                  d="M502.48018,670.90564l3-.04492-.82764-56.01855a52.25792,52.25792,0,0,1,25.36915-45.5L587.281,535.11609l-1.53906-2.57519L528.48262,566.768a55.26517,55.26517,0,0,0-26.83008,48.11914Z"
                                  transform="translate(-262 -112)"
                                  fill="#3f3d56"
                                />
                                <rect
                                  x="578.51265"
                                  y="500.40107"
                                  width="14.56381"
                                  height="59.96865"
                                  rx="7.2819"
                                  transform="translate(909.58912 948.77079) rotate(-180)"
                                  fill="#edc967"
                                />
                                <path
                                  d="M585.54031,429.08343l78.525,92.79429L731.0156,550.537l17.84505-34.68754c-16.37136-19.47847-69.78911-42.85782-69.78911-42.85782l-72.53371-65.05906c-.1299-.47864-.26979-.95671-.44346-1.43114a17.23112,17.23112,0,1,0-20.55406,22.582Z"
                                  transform="translate(-262 -112)"
                                  fill="#a0616a"
                                />
                                <path
                                  d="M741.86308,505.30705l-17.3206,44.34448.0173.17253c1.72662,17.03672,28.34206,32.81193,50.36559,43.045a31.59624,31.59624,0,0,0,40.98449-13.455h0a31.66589,31.66589,0,0,0-2.02245-33.36659L796.401,521.56Z"
                                  transform="translate(-262 -112)"
                                  fill="#edc967"
                                />
                                <path
                                  d="M842.26,589.29l-9.21,33.15-5.38,38.31-1.66,11.78-.04.25-10.23,9.72.3,3.05.8,8.13,1.33,14.48a336.484,336.484,0,0,1-165.78,75.8c-.01.01-.01,0-.01,0-8.17-2.34-14.58-4.88-17.16-6.73-1.02-.72-1.48-1.36-1.46-2.01.11-4.33,12.4-19.87,14.26-22.2L652.9,732.82l9.96-3.96-2.46-14.21L673.72,700.59l.38-14.47.07-.41,4.22-24.81,8.42-49.41.86-5.06-.78-39.02-.23-11.82-.27-13.48a55.41152,55.41152,0,0,1,.76-10.35,53.31269,53.31269,0,0,1,1.84-7.6,55.24513,55.24513,0,0,1,27.4-32.29c.51-.26,1.02-.51,1.54-.76,0,0,0-.01.01,0a54.90616,54.90616,0,0,1,12.55-4.17l1.26-2.24,12.34-21.92,37.81994.97,22.56,35.31,18.83,18.69A73.31171,73.31171,0,0,1,842.26,589.29Z"
                                  transform="translate(-262 -112)"
                                  fill="#edc967"
                                />
                                <circle
                                  cx="497.69948"
                                  cy="289.84957"
                                  r="50.1036"
                                  fill="#a0616a"
                                />
                                <path
                                  d="M753.58721,452.62357a136.26549,136.26549,0,0,0,23.18064-1.62c7.59923-1.54533,24.59947-14.00321,29.33857-21.4998h0c3.52093-5.56988,5.77245-14.26767,7.04152-20.583a60.91435,60.91435,0,0,0-10.65372-48.35812,19.24493,19.24493,0,0,0-7.77316-6.63436c-.27845-.10888-.565-.20537-.85455-.28786a23.74467,23.74467,0,0,1-11.81175-7.30888,19.58284,19.58284,0,0,0-1.96357-2.02086,29.24834,29.24834,0,0,0-12.20275-6.12729c-7.25395-1.94141-17.752-.0143-31.20185,5.73333-6.75724,2.88773-14.14724,1.84266-19.83225.60946a1.86017,1.86017,0,0,0-1.75136.6,13.13152,13.13152,0,0,1-8.92486,3.55767c-2.032.08922-4.16392,2.90277-6.74081,6.57173-.5847.83285-1.267,1.80487-1.75914,2.39607l-.06607-1.13583-1.14926,1.26711a15.93482,15.93482,0,0,0,7.19416,25.96108,31.07643,31.07643,0,0,0,6.2501.996c1.27917.11508,2.60234.23412,3.87033.45412a24.02454,24.02454,0,0,1,17.85279,15.59016,6.28287,6.28287,0,0,0,9.483,3.05032,10.38066,10.38066,0,0,1,9.459-1.72244,6.8913,6.8913,0,0,1,3.046,3.455,8.98034,8.98034,0,0,0,3.40768,3.97566c5.14969,2.65507,5.50461,14.41709,3.6551,24.22218-1.78279,9.45122-5.307,16.28835-8.57,16.62633-2.512.25987-2.79926.43831-2.98113.88257l-.16247.39771.28219.372A10.26073,10.26073,0,0,0,753.58721,452.62357Z"
                                  transform="translate(-262 -112)"
                                  fill="#2f2e41"
                                />
                                <path
                                  d="M721.13324,591.12423,701.8146,552.60874C673.77367,554.52417,618.12,586.94608,618.12,586.94608L512.82128,609.27163a19.02347,19.02347,0,1,0,5.18644,32.5081L651.954,632.17847Z"
                                  transform="translate(-262 -112)"
                                  fill="#a0616a"
                                />
                                <path
                                  d="M713.34148,597.44838l50.45383-37.4945,8.88732-32.0271a34.98194,34.98194,0,0,0-10.52128-35.39424h0a34.89929,34.89929,0,0,0-47.624,1.53654c-18.98655,18.95124-40.64184,45.39-35.99009,63.72324l.04709.18583Z"
                                  transform="translate(-262 -112)"
                                  fill="#edc967"
                                />
                                <path
                                  d="M348.48,548.11c-.06.09-.12.18-.19.28a48.04572,48.04572,0,0,0-6-.01q-1.70994.105-3.42.33a7.17893,7.17893,0,0,0-3.08,13.02l.12.08c.09.06.16.11.25.17a70.53036,70.53036,0,0,1-48.36,17.76,332.25383,332.25383,0,0,1-11.7-32.84,43.49067,43.49067,0,0,1,19.33-10.51c14.5-3.5,30.68.45,45.19-.99C347.6,534.71,352.45,542.32,348.48,548.11Z"
                                  transform="translate(-262 -112)"
                                  fill="#fff"
                                />
                                <path
                                  d="M361.17,436.69c-.04.11-.07995.23-.13.35-1.14.07-2.28.19-3.42.34a7.1723,7.1723,0,0,0-3.08,13.01l.12.09a70.90452,70.90452,0,0,1-6.34,8.78,73.50659,73.50659,0,0,1-53.01,25.53c-.66.02-1.3.04-1.95.04a174.57918,174.57918,0,0,1-10.84,44.02,160.236,160.236,0,0,1-7.12,15.68q-.75-2.55-1.45-5.13c.12-.23.23-.44995.34-.68a161.94169,161.94169,0,0,0,6.99-16.77q2.47494-7.035,4.32-14.25a170.46277,170.46277,0,0,0,1.04-79.74,45.36209,45.36209,0,0,1-8.46-25.83,34.64872,34.64872,0,0,1,1.29-9.88c.77.51,1.58.99,2.38,1.44.25.14.51.28.77.42l.09.05a5.23769,5.23769,0,0,0,7.59-5.81c-.14-.61-.29-1.22-.43-1.83-.22-.94-.45-1.88-.66-2.82a1.56671,1.56671,0,0,1-.08-.29c-.25-1.07-.51-2.13-.76-3.2a15.11766,15.11766,0,0,1,6.57-2.16c8.01-.64,15.41,6.07,17.18,13.9,1.8,7.84-1.19,16.18-6.17,22.48-4.27,5.39-9.88,9.52-15.72,13.2.13.6.28,1.19.41,1.78a172.44785,172.44785,0,0,1,3.76,33.33c3.56-10.62,11.27-21.75,18.25-27.96,7.95-7.07,18.43-11.2,28.19-15.92C352.55,413.19,365.53,424.42,361.17,436.69Z"
                                  transform="translate(-262 -112)"
                                  fill="#fff"
                                />
                                <path
                                  d="M898.92,591.47c1.67,2.12,3.4,4.23,5.13,6.35a335.12226,335.12226,0,0,1-20.06,35.52q-.825-.58494-1.65-1.17a2.11907,2.11907,0,0,1-.25-.16c-2.05-1.46-4.11005-2.9-6.16-4.36005v-.01a70.003,70.003,0,0,1-2.81-17.7,5.288,5.288,0,0,0,1.23-9.86c-.27-.47-.46-.81-.73-1.29.01-.12.03-.25.04-.37C875.23,585.93,891.15,581.57,898.92,591.47Z"
                                  transform="translate(-262 -112)"
                                  fill="#fff"
                                />
                                <path
                                  d="M916.87,548.67q1.8,4.95,3.28,10.01-1.02008,3-2.09,5.98-.405-1.575-.84-3.15a161.95532,161.95532,0,0,0-5.85-17.2q-2.79-6.915-6.18-13.54a170.35634,170.35634,0,0,0-51.96-60.5,45.35008,45.35008,0,0,1-23.43-13.78,34.85779,34.85779,0,0,1-5.57-8.26c.92-.13,1.84-.31,2.74-.5.28-.06.57-.13.85-.19l.11-.02a5.24142,5.24142,0,0,0,1.85-9.38c-.51-.37-1.03-.73-1.54-1.09-.78-.57-1.57-1.11-2.36-1.67a2.48881,2.48881,0,0,1-.24-.17c-.9-.63995-1.8-1.26-2.69-1.91a15.19516,15.19516,0,0,1,3.49-5.96c5.59-5.77,15.57-5.64,22.09-.94,6.53,4.7,9.81,12.93,10.23,20.95.37,6.87-1.11,13.67-3.06,20.3.49.36005,1,.7,1.49,1.07a171.32637,171.32637,0,0,1,24.86,22.51c-4.35-10.32-5.93-23.78-4.8-33.05,1.29-10.56,6.42-20.59,10.62-30.58,5.03-12,22.19-12.16,27.03-.08.05.12.1.23.14.35q-1.215,1.215-2.34,2.52a7.175,7.175,0,0,0,6.29,11.8l.15-.02a72.0958,72.0958,0,0,1,1.06,10.79,73.50775,73.50775,0,0,1-22.88,54.2c-.48.45-.95.89-1.44,1.32a170.65756,170.65756,0,0,1,12.45,20.67A172.445,172.445,0,0,1,916.87,548.67Z"
                                  transform="translate(-262 -112)"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                            <div className="sap-sm-heading">
                              There is no speakers found!
                            </div>
                          </div>
                        )}
                    {/* Pagination sectiobn start */}
                    <Pagination
                      className="pagination"
                      currentPage={currentPage}
                      totalCount={totalData ? totalData : 1}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                    
                    {/* <div
                      className="sl-right-inner"
                      onClick={() => navigate("/single-speaker-list")}
                    >
                      <div className="floating-tag silver">silver</div>
                      <div className="slri-img">
                        <img src="assets/image/testi1.png" alt="" />
                      </div>
                      <div className="slri-con">
                        <div className="slri-top">
                          <div className="slri-top-left">
                            <div className="slri-name">roger ferris</div>
                            <div className="slri-desg">Director</div>
                            <div className="slri-company">
                              Professional Services BD
                            </div>
                          </div>
                          <div className="slri-top-right">
                            <ul>
                              <li>
                                <i className="fa fa-map-marker-alt"></i> United
                                States
                              </li>
                              <li>
                                <i className="fa fa-language"></i> English,
                                spanish
                              </li>
                              <li>
                                <i className="fa fa-compass"></i> global
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="text-para">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat, ante ut ornare pharetra, libero
                          massa feugiat tellus, ut malesuada sem arcu ut orci.
                          Etiam sapien tellus, fermentum. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit.
                        </div>
                        <div className="doable-head">
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaMicrophoneAlt />
                              </i>
                            </div>
                            <div className="doable-title">Conference</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaChalkboardTeacher />
                              </i>
                            </div>
                            <div className="doable-title">workshop</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaRecordVinyl />
                              </i>
                            </div>
                            <div className="doable-title">session</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaUserTie />
                              </i>
                            </div>
                            <div className="doable-title">moderator</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaTv />
                              </i>
                            </div>
                            <div className="doable-title">webinar</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaGraduationCap />
                              </i>
                            </div>
                            <div className="doable-title">school</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaUsers />
                              </i>
                            </div>
                            <div className="doable-title">meetup</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="doable-title">panel</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaAward />
                              </i>
                            </div>
                            <div className="doable-title">
                              certificate program
                            </div>
                          </div>
                        </div>
                        <div className="hashtags">
                          <a href="#/">#Business Development</a>
                          <a href="#/">#New Business Generation</a>
                          <a href="#/">#Sales conversion</a>
                        </div>
                      </div>
                    </div> */}

                    {/* <div
                      className="sl-right-inner"
                      onClick={() => navigate("/single-speaker-list")}
                    >
                      <div className="floating-tag bronze">bronze</div>
                      <div className="slri-img">
                        <img src="assets/image/testi1.png" alt="" />
                      </div>
                      <div className="slri-con">
                        <div className="slri-top">
                          <div className="slri-top-left">
                            <div className="slri-name">roger ferris</div>
                            <div className="slri-desg">Director</div>
                            <div className="slri-company">
                              Professional Services BD
                            </div>
                          </div>
                          <div className="slri-top-right">
                            <ul>
                              <li>
                                <i className="fa fa-map-marker-alt"></i> United
                                States
                              </li>
                              <li>
                                <i className="fa fa-language"></i> English,
                                spanish
                              </li>
                              <li>
                                <i className="fa fa-compass"></i> global
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="text-para">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat, ante ut ornare pharetra, libero
                          massa feugiat tellus, ut malesuada sem arcu ut orci.
                          Etiam sapien tellus, fermentum. Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit.
                        </div>
                        <div className="doable-head">
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaMicrophoneAlt />
                              </i>
                            </div>
                            <div className="doable-title">Conference</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaChalkboardTeacher />
                              </i>
                            </div>
                            <div className="doable-title">workshop</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaRecordVinyl />
                              </i>
                            </div>
                            <div className="doable-title">session</div>
                          </div>
                          <div className="doable-list active">
                            <div className="doable-icon">
                              <i className="">
                                <FaUserTie />
                              </i>
                            </div>
                            <div className="doable-title">moderator</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaTv />
                              </i>
                            </div>
                            <div className="doable-title">webinar</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaGraduationCap />
                              </i>
                            </div>
                            <div className="doable-title">school</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaUsers />
                              </i>
                            </div>
                            <div className="doable-title">meetup</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="doable-title">panel</div>
                          </div>
                          <div className="doable-list">
                            <div className="doable-icon">
                              <i className="">
                                <FaAward />
                              </i>
                            </div>
                            <div className="doable-title">
                              certificate program
                            </div>
                          </div>
                        </div>
                        <div className="hashtags">
                          <a href="#/">#Business Development</a>
                          <a href="#/">#New Business Generation</a>
                          <a href="#/">#Sales conversion</a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SpeakerListing;
