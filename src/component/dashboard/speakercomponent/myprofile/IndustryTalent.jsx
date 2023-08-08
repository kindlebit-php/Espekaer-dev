import React, { Fragment, useEffect } from "react";
import { useState } from "react";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Auth from "../../../../auth/Auth";
import { useNavigate } from "react-router-dom";

import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const IndustryTalent = () => {
  const navigate = useNavigate();
// Decryprt token
const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");

  const [getIndustry, setGetIndustry] = useState("");
  const [selectIndustry, setSelectIndustry] = useState("");
  const [getTalent, setGetTalent] = useState("");
  const [selectTalent, setSelectTalent] = useState("");
  const [getSubTalent, setGetSubTalent] = useState("");
  const [selectSubTalent, setSelectSubTalent] = useState("");
  const [getTalentId, setGetTalentId] = useState("");
  const [pageLoader,setPageLoader] = useState(false);
  

  // handle get id & talent name from talent select option
  const handlegetIdAndTalent = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const dataAttributeValue = selectedOption.getAttribute("data-id");
    setGetTalentId(dataAttributeValue);
    setSelectTalent(e.target.value);
  };

  // Get talent api
  const talentApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getTalent`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    };
    const data = await res.json();
    setGetTalent(data?.data);
  };

  // Get sub-talent api
  const subTalentApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getSubTalent/${getTalentId}`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetSubTalent(data?.data);
  };

  // Get industry api
  const industryApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getIndustry`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetIndustry(data?.data);
  };

  // get all data
  const getAllData = async () => {
    setPageLoader(true);
    const requestMethod = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getIndustryAndTalent`,
      requestMethod
    );
    if (res.status >= 200 && res.status < 400) {
      setPageLoader(false);
      const data = await res.json();
      setSelectIndustry(data?.data?.industryName);
      setSelectTalent(data?.data?.talentName);
      setSelectSubTalent(data?.data?.subTalentName);
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

  // post all data
  const postAllData = async () => {
    const requestKey = {
      talentName: selectTalent,
      subTalentName: selectSubTalent,
      industryName: selectIndustry,
    };
    const requestMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
      body: JSON.stringify(requestKey),
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/industryAndTalent`,
      requestMethod
    );
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      getAllData();
      toast.warn(data.message);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
  };

  // handle validation
  const handleAllDataValidation = (e) => {
    e.preventDefault();
    if (!selectIndustry) {
      toast.warn("Please select industry");
    } else if (!selectTalent) {
      toast.warn("Please select talent");
    } else if (!selectSubTalent) {
      toast.warn("Please select sub-talent");
    } else {
      postAllData();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
  });
  }, []);

  useEffect(() => {
    talentApi();
    industryApi();
    getAllData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTalentId && subTalentApi();
    // eslint-disable-next-line
  }, [getTalentId]);

  return (
    <Fragment>
      {pageLoader && <Loader/>}
      <Helmet>
        <title>Industry-Talent</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-industry-talent">
        <div className="mp-form-heading">Industry & Talent</div>
          <form action="" className="row">
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Industry<sup className="text-red">*</sup>
              </label>
              <select
                className="form-select"
                defaultValue="0"
                aria-label="Default select example"
                onChange={(e) => setSelectIndustry(e.target.value)}
                >
                <option value="">{`${selectIndustry ? selectIndustry :`Select`}`}</option>
                {getIndustry &&
                  getIndustry?.map((indus, index) => {
                    const { industryName } = indus;
                    return (
                      <option key={index} value={industryName}>
                        {industryName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Talent<sup className="text-red">*</sup>
              </label>
              <select
                className="form-select"
                defaultValue="0"
                aria-label="Default select example"
                onChange={(e) => handlegetIdAndTalent(e)}
              >
                <option value="">{`${selectTalent ? selectTalent :`Select`}`}</option>
                {getTalent &&
                  getTalent?.map((indus, index) => {
                    const { talentName, _id } = indus;
                    return (
                      <option key={index} value={talentName} data-id={_id}>
                        {talentName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="" className="form-label">
                Sub Talent
              </label>
              <select
                className="form-select"
                defaultValue="0"
                aria-label="Default select example"
                onChange={(e) => setSelectSubTalent(e.target.value)}
              >
                <option value="">{`${selectSubTalent ? selectSubTalent :`Select`}`}</option>
                {getSubTalent &&
                  getSubTalent?.map((indus, index) => {
                    const { subTalentName } = indus;
                    return (
                      <option key={index} value={subTalentName}>
                        {subTalentName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="divider"></div>
            <div className="sap-btn-light mt-4">
              <button type="button" onClick={(e) => handleAllDataValidation(e)}>
                Save industry & talent details
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default IndustryTalent;
