import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FaTrash, FaPlus, FaCircleNotch, FaTimes } from "react-icons/fa";

import Auth from "../../../../auth/Auth";

import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const Expertise = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt = Auth.token()
    ?.split("")
    ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
    .join("");

  const [text, setText] = useState("");
  const [chips, setChips] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [getAllLanguage, setGetAllLanguage] = useState([]);
  const [getAllTopics, setGetAllTopics] = useState([]);
  const [eduDeleteId, setEduDelete] = useState("");
  const [achieDeleteId, setAchieDelete] = useState("");
  const [awardDeleteId, setAwardDelete] = useState("");
  const [clientDeleteId, setClientDelete] = useState("");
  const [positionDeleteId, setPositionDelete] = useState("");
  const [eduSaveButtonToggle, setEduSaveButtonToggle] = useState(true);
  const [achieSaveButtonToggle, setAchieSaveButtonToggle] = useState(true);
  const [awardSaveButtonToggle, setAwardSaveButtonToggle] = useState(true);
  const [postSaveButtonToggle, setPostSaveButtonToggle] = useState(true);
  const [clientSaveButtonToggle, setClientSaveButtonToggle] = useState(true);

  const [currentPast, setCurrentPast] = useState([{ clientName: "" }]);
  const [educationData, setEducationData] = useState([
    { school: "", study: "", from: "", to: "" },
  ]);
  const [achieveData, setAchieveData] = useState([
    { achiveTitle: "", achiveDec: "" },
  ]);
  const [awardData, setAwardData] = useState([
    { awardTitle: "", awarsOrga: "", year: "" },
  ]);
  const [positionData, setPositionData] = useState([
    { position: "", company: "" },
  ]);

  const [enablingData, setEnablingData] = useState("");
  const [answeredData, setAnsweredData] = useState("");
  const [mainTopicsGetId, setMainTopicsGetId] = useState("");

  const [commonLoader, setCommonLoader] = useState({
    mainTopicsLoader: false,
    enablingId: "",
    enabling: false,
    eduPostLoader: false,
    eduDelete: false,
    eduLoader: false,
    achiePostLoader: false,
    achieDelete: false,
    achieveLoader: false,
    awardPostLoader: false,
    awardDelete: false,
    awardLoader: false,
    positionPostLoader: false,
    positionDelete: false,
    positionLoader: false,
    clientPostLoader: false,
    clientDelete: false,
    clientLoader: false,
    pageLoader:false
  });

  // Handle expertise data delete
  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
  }

  // Handle expertise data add
  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }
    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setText("");
    // clearing error message
    setValidationError("");
  }

  // handle current input change
  const handleCurrentInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...currentPast];
    list[index][name] = value;
    setCurrentPast(list);
  };

  // handle current/past click event of the Remove button
  const handleRemoveClickPast = (index, delId) => {
    setClientDelete(delId);
    if (!clientSaveButtonToggle && !delId) {
      const list = [...currentPast];
      list.splice(index, 1);
      setCurrentPast(list);
      setClientSaveButtonToggle(false);
    } else {
      setCommonLoader({ ...commonLoader, clientDelete: true });
    }
  };

  // handle current click event of the Add button
  const handleAddClickPast = () => {
    setCurrentPast([...currentPast, { clientName: "" }]);
  };

  // handle edu input change
  const handleEduInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationData];
    list[index][name] = value;
    setEducationData(list);
  };

  // handle edu click event of the Remove button
  const handleRemoveClickEdu = (index, delId) => {
    setEduDelete(delId);
    if (!eduSaveButtonToggle && !delId) {
      const list = [...educationData];
      list.splice(index, 1);
      setEducationData(list);
      setEduSaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, eduDelete: true });
    }
  };

  // handle edu click event of the Add button
  const handleAddClickEdu = () => {
    setEducationData([
      ...educationData,
      { school: "", study: "", from: "", to: "" },
    ]);
  };

  // handle ache input change
  const handleAcheInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...achieveData];
    list[index][name] = value;
    setAchieveData(list);
  };

  // handle ache click event of the Remove button
  const handleRemoveClickAche = (index, delId) => {
    setAchieDelete(delId);
    if (!achieSaveButtonToggle && !delId) {
      const list = [...achieveData];
      list.splice(index, 1);
      setAchieveData(list);
      setAchieSaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, achieDelete: true });
    }
  };

  // handle ache click event of the Add button
  const handleAddClickAche = () => {
    setAchieveData([...achieveData, { achiveTitle: "", achiveDec: "" }]);
  };

  // handle award input change
  const handleAwardInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...awardData];
    list[index][name] = value;
    setAwardData(list);
  };

  // handle award click event of the Remove button
  const handleRemoveClickAward = (index, delId) => {
    setAwardDelete(delId);
    if (!awardSaveButtonToggle && !delId) {
      const list = [...awardData];
      list.splice(index, 1);
      setAwardData(list);
      setAwardSaveButtonToggle(true);
    } else {
      setCommonLoader({ ...commonLoader, awardDelete: true });
    }
  };

  // handle ache click event of the Add button
  const handleAddClickAward = () => {
    setAwardData([...awardData, { awardTitle: "", awarsOrga: "", year: "" }]);
  };

  // handle ache input change
  const handlePositionInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...positionData];
    list[index][name] = value;
    setPositionData(list);
  };

  // handle position click event of the Remove button
  const handleRemoveClickPosition = (index, delId) => {
    setPositionDelete(delId);
    if (!postSaveButtonToggle && !delId) {
      const list = [...positionData];
      list.splice(index, 1);
      setPositionData(list);
      setPostSaveButtonToggle(false);
    } else {
      setCommonLoader({ ...commonLoader, positionDelete: true });
    }
  };

  // handle ache click event of the Add button
  const handleAddClickPosition = () => {
    setPositionData([...positionData, { position: "", company: "" }]);
  };

  // Main tiopics post api
  const mainTopicsApi = async () => {
    setCommonLoader({ ...commonLoader, mainTopicsLoader: true });
    const requestKey = {
      mainTopic: selectedTopics,
      language: selectedLanguage,
      tag: chips,
      ...(mainTopicsGetId ? { id: mainTopicsGetId } : ""),
    };
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(requestKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/speakerMainTopic`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 499) {
      const data = await res.json();
      getMainTopicsApi();
      setCommonLoader({ ...commonLoader, mainTopicsLoader: false });
      toast.warn(data?.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      setCommonLoader({ ...commonLoader, mainTopicsLoader: false });
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const data = await res.json();
      toast.warn(data?.message);
    }
  };

  // Main tiopics get api
  const getMainTopicsApi = async () => {
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerMainTopic`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 499) {
      const data = await res.json();
      setMainTopicsGetId(data?.data[0]?._id);
      setSelectedTopics(data?.data[0]?.mainTopic);
      setSelectedLanguage(data?.data[0]?.language);
      data?.data[0]?.tag && setChips(data?.data[0]?.tag);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const data = await res.json();
      toast.warn(data?.message);
    }
  };

  // enabling/answered tiopics get api
  const enablingAnsweredApi = async () => {
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getExpertiseQue`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 499) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, enablingId: data?.data?._id });
      setAnsweredData(data?.data?.answered);
      setEnablingData(data?.data?.ena_comp);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const data = await res.json();
      toast.warn(data?.message);
    }
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

  // Delete education data api
  const deleteEduGraphicsApi = async () => {
    setCommonLoader({ ...commonLoader, eduLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteEducation/${eduDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      eduCationGetApi();
      setCommonLoader({ ...commonLoader, eduLoader: false });
      setCommonLoader({ ...commonLoader, eduDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, eduLoader: false });
      setCommonLoader({ ...commonLoader, eduDelete: false });
    }
  };

  // Education get api
  const eduCationGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getEducation`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setEducationData(data?.data);
      } else {
        setEducationData([{ school: "", study: "", from: "", to: "" }]);
        setEduSaveButtonToggle(false);
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

  // Education post api
  const educationApi = async () => {
    setCommonLoader({ ...commonLoader, eduPostLoader: true });
    const keyValue = {
      educationData: educationData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/educationDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, eduPostLoader: false });
      eduCationGetApi();
      toast.warn(data.message);
      setEduSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, eduPostLoader: false });
      toast.warn(error.message);
    }
  };

  // Achievement post api
  const achievementApi = async () => {
    setCommonLoader({ ...commonLoader, achiePostLoader: true });
    const keyValue = {
      AchievementData: achieveData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/achievementDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, achiePostLoader: false });
      achievementGetApi();
      toast.warn(data.message);
      setAchieSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, achiePostLoader: false });
      toast.warn(error.message);
    }
  };

  // Award post api
  const awardApi = async () => {
    setCommonLoader({ ...commonLoader, awardPostLoader: true });
    const keyValue = {
      awardData: awardData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/awardDetail`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, awardPostLoader: false });
      awardGetApi();
      toast.warn(data.message);
      setAwardSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, awardPostLoader: false });
      toast.warn(error.message);
    }
  };

  // Position post api
  const positionApi = async () => {
    setCommonLoader({ ...commonLoader, positionPostLoader: true });
    const keyValue = {
      speakerPositionData: positionData,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerPosition`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, positionPostLoader: false });
      positionGetApi();
      toast.warn(data.message);
      setPostSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, awardPositionLoader: false });
      toast.warn(error.message);
    }
  };

  // Current/Past post api
  const currentPastApi = async () => {
    setCommonLoader({ ...commonLoader, clientPostLoader: true });
    const keyValue = {
      clientName: currentPast,
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
      `${process.env.REACT_APP_BASE_URL}speaker/speakerClient`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, clientPostLoader: false });
      currentPastGetApi();
      toast.warn(data.message);
      setClientSaveButtonToggle(true);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      setCommonLoader({ ...commonLoader, clientPostLoader: false });
      toast.warn(error.message);
    }
  };

  // Achievement get api
  const achievementGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAchievement`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setAchieveData(data?.data);
      } else {
        setAchieveData([{ achiveTitle: "", achiveDec: "" }]);
        setAchieSaveButtonToggle(false);
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

  // Award get api
  const awardGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAward`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setAwardData(data?.data);
      } else {
        setAwardData([{ awardTitle: "", awarsOrga: "", year: "" }]);
        setAwardSaveButtonToggle(false);
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

  // Position get api
  const positionGetApi = async () => {
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerPosition`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      if (data?.data?.length > 0) {
        setPositionData(data?.data);
      } else {
        setPositionData([{ position: "", company: "" }]);
        setPostSaveButtonToggle(false);
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

  // Current/Past get api
  const currentPastGetApi = async () => {
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
      `${process.env.REACT_APP_BASE_URL}speaker/getSpeakerClient`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      setCommonLoader({...commonLoader,pageLoader:false});
      const data = await res.json();
      if (data?.data?.length > 0) {
        setCurrentPast(data?.data);
      } else {
        setCurrentPast([{ clientName: "" }]);
        setClientSaveButtonToggle(false);
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

  // Delete achievement data api
  const deleteAchieveApi = async () => {
    setCommonLoader({ ...commonLoader, achieveLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteAchievement/${achieDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      achievementGetApi();
      setCommonLoader({ ...commonLoader, achieveLoader: false });
      setCommonLoader({ ...commonLoader, achieDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, achieveLoader: false });
      setCommonLoader({ ...commonLoader, achieDelete: false });
    }
  };

  // Delete award data api
  const deleteAwardApi = async () => {
    setCommonLoader({ ...commonLoader, awardLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteAward/${awardDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      awardGetApi();
      setCommonLoader({ ...commonLoader, awardLoader: false });
      setCommonLoader({ ...commonLoader, awardDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, awardLoader: false });
      setCommonLoader({ ...commonLoader, awardDelete: false });
    }
  };

  // Delete position data api
  const deletePositiondApi = async () => {
    setCommonLoader({ ...commonLoader, positionLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerPosition/${positionDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      positionGetApi();
      setCommonLoader({ ...commonLoader, positionLoader: false });
      setCommonLoader({ ...commonLoader, positionDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, positionLoader: false });
      setCommonLoader({ ...commonLoader, positionDelete: false });
    }
  };

  // Delete current/past data api
  const deleteCurrentPastApi = async () => {
    setCommonLoader({ ...commonLoader, clientLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/deleteSpeakerClient/${clientDeleteId}`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      currentPastGetApi();
      setCommonLoader({ ...commonLoader, clientLoader: false });
      setCommonLoader({ ...commonLoader, clientDelete: false });
      toast.warn(data.message);
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, clientLoader: false });
      setCommonLoader({ ...commonLoader, clientDelete: false });
    }
  };

  // Enabling post api
  const enablingApi = async () => {
    setCommonLoader({ ...commonLoader, enabling: true });
    const loginKeyValue = {
      ena_comp: enablingData,
      answered: enablingData === "yes" ? answeredData : "",
      ...(commonLoader?.enablingId ? { id: commonLoader?.enablingId } : ""),
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
      `${process.env.REACT_APP_BASE_URL}speaker/expertiseQue`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      enablingAnsweredApi();
      toast.warn(data?.message);
      setCommonLoader({ ...commonLoader, enabling: false });
    }
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      }
      const error = await res.json();
      toast.warn(error.message);
      setCommonLoader({ ...commonLoader, loader: false });
    }
  };

  // Handle main topics validation
  const handleFirstfieldValid = (e) => {
    e.preventDefault();
    if (selectedTopics?.length < 1) {
      toast.warn("Please choose topic");
    } else if (selectedLanguage?.length < 1) {
      toast.warn("Please choose language");
    } else if (text) {
      toast.warn("Please press enter in expertise field");
    } else if (chips.length < 1) {
      toast.warn("Expertise is required");
    } else {
      mainTopicsApi();
    }
  };

  // handle current & past client validation
  const hanndleSaveClientsValid = (e) => {
    e.preventDefault();
    if (currentPast.map((data) => data.clientName).includes("")) {
      toast.warn("Current and Past Clients details are required");
    } else {
      currentPastApi();
    }
  };

  // Handle educatuion validation
  const handleEducationValid = (e) => {
    e.preventDefault();
    if (educationData.map((data) => data.school).includes("")) {
      toast.warn("School name is required");
    } else if (educationData.map((data) => data.study).includes("")) {
      toast.warn("Study details are required");
    } else if (educationData.map((data) => data.from).includes("")) {
      toast.warn("Details are required in 'from' field");
    } else if (educationData.map((data) => data.to).includes("")) {
      toast.warn("Details are required in 'to' field");
    } else {
      educationApi();
    }
  };

  // Handle achievement validation
  const handleAchievementsValid = (e) => {
    e.preventDefault();
    if (achieveData.map((data) => data.achiveTitle).includes("")) {
      toast.warn("Achievement Title is required");
    } else if (achieveData.map((data) => data.achiveDec).includes("")) {
      toast.warn("Achievement description is required");
    } else {
      achievementApi();
    }
  };

  // Handle award validation
  const handleAwardsValid = (e) => {
    e.preventDefault();
    if (!!awardData.map((data) => data.awardTitle).includes("")) {
      toast.warn("Award field is requied");
    } else if (!!awardData.map((data) => data.awarsOrga).includes("")) {
      toast.warn("Organization field is requied");
    } else if (!!awardData.map((data) => data.year).includes("")) {
      toast.warn("Please enter award years field");
    } else {
      awardApi();
    }
  };

  // Handle position validation
  const handlePosition = (e) => {
    e.preventDefault();
    if (!!positionData.map((data) => data.position).includes("")) {
      toast.warn("Please enter position field");
    } else if (!!positionData.map((data) => data.company).includes("")) {
      toast.warn("Please enter company field");
    } else {
      positionApi();
    }
  };

  // Handle enabling validation
  const handleEnablingValid = (e) => {
    e.preventDefault();
    if (!enablingData) {
      toast.warn("Enabling competencies field is required");
    } else if (enablingData === "yes" && !answeredData) {
      toast.warn("Please enter your reviews");
    } else {
      enablingApi();
    }
  };

  useEffect(() => {
    handleLanguageApi();
    handleTopicsApi();
    eduCationGetApi();
    achievementGetApi();
    awardGetApi();
    positionGetApi();
    getMainTopicsApi();
    enablingAnsweredApi();
    currentPastGetApi();
    window.scrollTo({ top: 0, behavior: "instant" });
    // eslint-disable-next-line
  }, []);

  const [currentPastIndex, setCurrentPastIndex] = useState();
  const [educationDataIndex, setEducationDataIndex] = useState();
  const [achieveDataIndex, setAchieveDataIndex] = useState();
  const [awardDataIndex, setAwardDataIndex] = useState();
  const [positionDataIndex, setPositionDataIndex] = useState();
  useEffect(() => {
    currentPast?.map((ele, ind) => setCurrentPastIndex(ind));
    educationData?.map((ele, ind) => setEducationDataIndex(ind));
    achieveData?.map((ele, ind) => setAchieveDataIndex(ind));
    awardData?.map((ele, ind) => setAwardDataIndex(ind));
    positionData?.map((ele, ind) => setPositionDataIndex(ind));
  }, [currentPast, educationData, achieveData, awardData, positionData]);

  return (
    <Fragment>
      {commonLoader.pageLoader && <Loader/>}
      <Helmet>
        <title>Expertise</title>
      </Helmet>

      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-expertise">
          <div className="mp-form-heading">Expertise</div>
          <form action="" className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Your main topics<sup className="text-red">*</sup>
              </label>
              <Typeahead
                labelKey="topic"
                id="basic-example"
                onChange={setSelectedTopics}
                options={getAllTopics}
                placeholder="Choose topics..."
                selected={selectedTopics}
                multiple
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Languages<sup className="text-red">*</sup>
              </label>
              <Typeahead
                labelKey="language"
                id="basic-example"
                onChange={setSelectedLanguage}
                options={getAllLanguage}
                placeholder="Choose language..."
                selected={selectedLanguage}
                multiple
              />
            </div>
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Expertise tags<sup className="text-red">*</sup>
              </label>
              <div className="chip-tag-head">
                <ul className="chips">
                  {chips &&
                    chips?.map((chip, index) => (
                      <div key={index} className="chip">
                        <span>{chip}</span>
                        <FaTimes onClick={() => removeChip(chip)} />
                      </div>
                    ))}
                </ul>
                <input
                  type="text"
                  id="tags"
                  className="form-control"
                  placeholder="Press Enter to add tag"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handlePressEnter}
                />
                <div>
                  {validationError && (
                    <p className="error-message">{validationError}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.mainTopicsLoader && { disabled: true })}
                onClick={(e) => handleFirstfieldValid(e)}
              >
                save details{" "}
                <span className="btn-loader">
                  {commonLoader.mainTopicsLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div></div>
            <div className="divider"></div>

            {/* current & past clients input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Current and past clients<sup className="text-red">*</sup>
              </label>
              <div className="generate-panel-head">
                {currentPast &&
                  currentPast?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <input
                            type="text"
                            value={x.clientName}
                            placeholder="Enter Clients name..."
                            name="clientName"
                            onChange={(e) => handleCurrentInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        {currentPast.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickPast(i, x?._id)}
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
              {currentPast.length - 1 === currentPastIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickPast();
                      setClientSaveButtonToggle(false);
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
                {...(commonLoader.clientPostLoader && { disabled: true })}
                onClick={(e) => hanndleSaveClientsValid(e)}
              >
                save clients details{" "}
                <span className="btn-loader">
                  {commonLoader.clientPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* education input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Education
              </label>
              <div className="generate-panel-head">
                {educationData &&
                  educationData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            School<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.school}
                            name="school"
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => handleEduInputChange(e, i)}
                            className="form-control"
                            placeholder="Please enter your school name..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            FIELD OF STUDY OR TITLE
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="study"
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z \s]+$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="Please enter your field of study"
                            value={x.study}
                            onChange={(e) => handleEduInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            From<sup className="text-red">*</sup>
                          </label>

                          <input
                            type="date"
                            name="from"
                            value={x.from}
                            onChange={(e) => handleEduInputChange(e, i)}
                            className="form-control"
                          />
                          <label htmlFor="" className="form-label">
                            To<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="date"
                            name="to"
                            value={x.to}
                            min={x.from}
                            onChange={(e) => handleEduInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        {educationData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickEdu(i, x._id)}
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
              {educationData.length - 1 === educationDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickEdu();
                      setEduSaveButtonToggle(false);
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
                {...(commonLoader.eduPostLoader && { disabled: true })}
                onClick={(e) => handleEducationValid(e)}
              >
                save education details{" "}
                <span className="btn-loader">
                  {commonLoader.eduPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Achievements input field*/}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Achievements
              </label>
              <div className="generate-panel-head">
                {achieveData &&
                  achieveData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            ACHIEVEMENT TITLE<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.achiveTitle}
                            name="achiveTitle"
                            onChange={(e) => handleAcheInputChange(e, i)}
                            className="form-control"
                            placeholder="Your achievement..."
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
                            name="achiveDec"
                            value={x.achiveDec}
                            onChange={(e) => handleAcheInputChange(e, i)}
                            className="form-control"
                          ></textarea>
                        </div>
                        {achieveData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickAche(i, x._id)}
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
              {achieveData.length - 1 === achieveDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickAche();
                      setAchieSaveButtonToggle(false);
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
                {...(commonLoader.achiePostLoader && { disabled: true })}
                onClick={(e) => handleAchievementsValid(e)}
              >
                save achievements details{" "}
                <span className="btn-loader">
                  {commonLoader.achiePostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Awards & Certifications input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Awards & Certifications
              </label>
              <div className="generate-panel-head">
                {awardData &&
                  awardData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            TITLE OF THE AWARD
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            value={x.awardTitle}
                            name="awardTitle"
                            onChange={(e) => handleAwardInputChange(e, i)}
                            className="form-control"
                            placeholder="Your award title name..."
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            ORGANIZATION'S NAME
                            <sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="awarsOrga"
                            value={x.awarsOrga}
                            placeholder="Your organization name..."
                            onChange={(e) => handleAwardInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            Year<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="date"
                            name="year"
                            value={x.year}
                            onChange={(e) => handleAwardInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        {awardData.length !== 1 && (
                          <div className="sap-btn-dark delete-generate-panel">
                            <button
                              type="button"
                              onClick={() => handleRemoveClickAward(i, x._id)}
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
              {awardData.length - 1 === awardDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickAward();
                      setAwardSaveButtonToggle(false);
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
                {...(commonLoader.awardPostLoader && { disabled: true })}
                onClick={(e) => handleAwardsValid(e)}
              >
                save awards details{" "}
                <span className="btn-loader">
                  {commonLoader.awardPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            {/* Current position(s) input field */}
            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Current position(s)
              </label>
              {/* <div>
                <label htmlFor="" className="form-label mx-5">
                  Position
                </label>
                <label htmlFor="" className="form-label">
                  Company
                </label>
              </div> */}
              <div className="generate-panel-head">
                {positionData &&
                  positionData?.map((x, i) => {
                    return (
                      <div className="generate-panel" key={i}>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            POSITION<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={x.position}
                            placeholder="Your position..."
                            onChange={(e) => handlePositionInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label htmlFor="" className="form-label">
                            COMPANY<sup className="text-red">*</sup>
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={x.company}
                            placeholder="Your company..."
                            onChange={(e) => handlePositionInputChange(e, i)}
                            className="form-control"
                          />
                        </div>
                        {positionData.length !== 1 && (
                          <div
                            onClick={() => handleRemoveClickPosition(i, x._id)}
                            className="sap-btn-dark delete-generate-panel"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveClickPosition(i, x._id)
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
              {positionData.length - 1 === positionDataIndex && (
                <div className="sap-btn-dark">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClickPosition();
                      setPostSaveButtonToggle(false);
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
                {...(commonLoader.positionPostLoader && { disabled: true })}
                type="button"
                onClick={(e) => handlePosition(e)}
              >
                save position details{" "}
                <span className="btn-loader">
                  {commonLoader.positionPostLoader && <FaCircleNotch />}
                </span>
              </button>
            </div>
            <div className="divider"></div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Enabling Competencies<sup className="text-red">*</sup>
              </label>
              {/* <input
                value={enablingData}
                placeholder="Your enabling competencies..."
                onChange={(e) => setEnablingData(e.target.value)}
                className="form-control"
              /> */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={enablingData}
                onChange={(e) => setEnablingData(e.target.value)}
              >
                <option value="">select</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </div>
            {enablingData === "yes" ? (
              <div className="col-md-12 form-group">
                <label htmlFor="" className="form-label">
                  If you answered "Yes", please tell us when and where
                </label>
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Your review..."
                  value={answeredData}
                  onChange={(e) => setAnsweredData(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>
            ) : (
              ""
            )}

            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.enabling && { disabled: true })}
                onClick={(e) => handleEnablingValid(e)}
              >
                save details{" "}
                <span className="btn-loader">
                  {commonLoader.enabling && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Education delete modal section start */}
      <Modal
        show={commonLoader.eduDelete}
        onHide={() => setCommonLoader({ ...commonLoader, eduDelete: false })}
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
            Are you sure you want to delete education data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, eduDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.eduLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteEduGraphicsApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.eduLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Achievement delete modal section start */}
      <Modal
        show={commonLoader.achieDelete}
        onHide={() => setCommonLoader({ ...commonLoader, achieDelete: false })}
        id="achievement-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete achievement data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, achieDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.achieveLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteAchieveApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.achieveLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Award delete modal section start */}
      <Modal
        show={commonLoader.awardDelete}
        onHide={() => setCommonLoader({ ...commonLoader, awardDelete: false })}
        className="award-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete award data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, awardDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.awardLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteAwardApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.awardLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Position delete modal section start */}
      <Modal
        show={commonLoader.positionDelete}
        onHide={() =>
          setCommonLoader({ ...commonLoader, positionDelete: false })
        }
        id="position-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete position data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, positionDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.positionLoader && { disabled: true })}
                variant="cust"
                onClick={() => deletePositiondApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.positionLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Current/Past delete modal section start */}
      <Modal
        show={commonLoader.clientDelete}
        onHide={() => setCommonLoader({ ...commonLoader, clientDelete: false })}
        id="currentpast-pop"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="pop-up-heading text-center">
            Are you sure you want to delete current/past data?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="dual-btn">
            <div className="sap-btn-dark">
              <Button
                variant="cust"
                onClick={() =>
                  setCommonLoader({ ...commonLoader, clientDelete: false })
                }
              >
                No
              </Button>
            </div>
            <div className="sap-btn-light">
              <Button
                {...(commonLoader.clientLoader && { disabled: true })}
                variant="cust"
                onClick={() => deleteCurrentPastApi()}
              >
                Yes
                <span className="btn-loader">
                  {commonLoader.clientLoader && <FaCircleNotch />}
                </span>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Expertise;
