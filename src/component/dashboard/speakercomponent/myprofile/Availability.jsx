import React, { Fragment, useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";
import { Typeahead } from "react-bootstrap-typeahead";

import Auth from "../../../../auth/Auth";
import MyProfileSidebar from "./MyProfileSidebar";
import Loader from "../../../loader/Loader";

const Availability = () => {
  const navigate = useNavigate();
  // Decryprt token
  const decrypt=Auth.token()?.split("")?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join("");

  const [selected, setSelected] = useState([]);
  const [getAvailbleData, setGetAvailbleData] = useState([]);
  const [getVolunteer,setGetVolunteer] = useState("");
  const [priceNego, setPriceNego] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [getFees,setGetFees] = useState("");


  const [commonLoader, setCommonLoader] = useState({
    pageLoader:false,
    loader:false,
    updateId:""
  });


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

  const fees=["Ask for pricing","Up to $250","$250 - $1500","$1500 - $5000","$5000 - $10000","More than $10000" ];

  const volu = ["yes","no"];

  const handleSelectAll = () => {
    setAvailableTo((data) => {
      if (data?.length === items?.length) {
        return [];
      } else {
        return items?.map((data) => data?.name);
      }
    });
  };

  const handleCheckboxClick = (name) => {
    setAvailableTo((data) => {
      if (data?.includes(name)) {
        return data?.filter((data) => data !== name);
      } else {
        return [...data, name];
      }
    });
  };

  // Get event availble for api
  const eventAvailbleApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAvailableFor`
    );
    if(res.status===401){
      Auth.logout();
      navigate("/login");
    };
    const data = await res.json();
    setGetAvailbleData(data?.data);
  };

   // Event available all data post api
   const availabilityApi = async () => {
    setCommonLoader({ ...commonLoader, loader: true });
    const keyValue = {
      eventsAvailable: selected,
      availableTo:availableTo,
      fee:getFees,
      volunteer:getVolunteer,
      pricesNegotiable:priceNego,
      ...commonLoader.updateId ? {id:commonLoader.updateId}:""
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
      `${process.env.REACT_APP_BASE_URL}speaker/availabilityAndFees`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, loader: false });
      availabilityGetApi();
      setCommonLoader({ ...commonLoader, pageLoader: false });
      toast.warn(data.message);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setCommonLoader({ ...commonLoader, loader: false });
      toast.warn(error.message);
    };
  };

  // Event available all data get api
  const availabilityGetApi = async () => {
    setCommonLoader({ ...commonLoader, pageLoader: true });
    const requestKey = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authToken: decrypt,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAvailability`,
      requestKey
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonLoader({ ...commonLoader, pageLoader: false });
      setCommonLoader({...commonLoader,updateId:data?.data[0]?._id});
      setSelected(data?.data[0]?.eventsAvailable);
      setGetVolunteer(data?.data[0]?.volunteer);
      setPriceNego(data?.data[0]?.pricesNegotiable);
      setAvailableTo(data?.data[0]?.availableTo ? data?.data[0]?.availableTo : "");
      setGetFees(data?.data[0]?.fee);
    };
    if (res.status >= 400 && res.status <= 500) {
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      setCommonLoader({ ...commonLoader, pageLoader: false });
      toast.warn(error.message);
    };
  };

// Handle available validation
  const handleAvailability=(e)=>{
    e.preventDefault();
    if(selected.length<1){
      toast.warn("Please select event");
    }else if(availableTo.length<1){
      toast.warn("Please select available to");
    }else if(!getFees){
      toast.warn("Please select fee");
    }else if (!getVolunteer){
      toast.warn("Please choose volunteer");
    }else if(!priceNego){
      toast.warn("Please select negotiable price");
    }else {
      availabilityApi();
    };
  };

  useEffect(() => {
    eventAvailbleApi();
    availabilityGetApi();
    // eslint-disable-next-line
  }, []);

  // const data = ["apple", "banana", "orange", "mango", "Apple", "Banana", "Orange", "Mango"];
  // const sortedData = data.map(item => item.toLowerCase()).sort();
  // console.log("sortedData",sortedData);

  return (
    <Fragment>
      {commonLoader.pageLoader && <Loader/>}
      <Helmet>
        <title>Availability-Fees</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-availability-fees">
        <div className="mp-form-heading">Availability & Fees</div>
          <form action="" className="row">
            <div className="col-md-12 form-group">
              <div className="sl-fil-inner">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Events you are available for<sup className="text-red">*</sup>
                  </label>
                </div>
                <div className="form-group">
                  <Typeahead
                    id="basic-example"
                    labelKey="availableFor"
                    onChange={setSelected}
                    options={getAvailbleData}
                    placeholder="Choose a state..."
                    selected={selected}
                    multiple
                  />
                </div>
              </div>
              
              <div className="sl-fil-inner">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Available to<sup className="text-red">*</sup>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={handleSelectAll}
                    name="flexRadioDefault"
                    id="Global"
                    checked={availableTo?.length===(items?.map((data)=>data?.name))?.length}
                  />
                  <label className="form-check-label" htmlFor="Global">
                    Global
                  </label>
                </div>
                {items.map((item, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={availableTo?.includes(item?.name)}
                      onChange={() => handleCheckboxClick(item.name)}
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
                    Fee<sup className="text-red">*</sup>
                  </label>
                </div>
                {fees.map((data, index)=>{
                  return(
                    <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    value={data}
                    type="radio"
                    checked={getFees===data}
                    onChange={(e)=>setGetFees(e.target.value)}
                    name="radiobutton"
                  />
                  <label className="form-check-label">
                    {data}
                  </label>
                </div>
                  )
                })}
                
              </div>

              <div className="sl-fil-inner">
                <div className="sl-fil-heading">
                  <label htmlFor="" className="form-label">
                    Volunteer<sup className="text-red">*</sup>
                  </label>
                </div>
                {volu.map((data, index)=>{
                  return(
                    <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={data}
                    name="volunteer"
                    checked={data===getVolunteer}
                    onChange={(e)=>setGetVolunteer(e.target.value)}
                  />
                  <label className="form-check-label">
                    {data}
                  </label>
                </div>
                  )
                })}
                
                <span className="form-caption text-grey">
                Please check this if you are​ ​available occasionally ​or regularly to speak pro bono (free) at conferences, schools, charities or specific events.
                </span>
                <div className="sl-fil-inner">
                  <div className="sl-fil-heading">
                    <label htmlFor="" className="form-label">
                      Prices negotiable?<sup className="text-red">*</sup>
                    </label>
                  </div>
                  <select
                    className="form-select text-uppercase"
                    aria-label="Default select example"
                    onChange={(e) => setPriceNego(e.target.value)}
                    defaultValue="0"
                  >
                    <option value="">
                      {priceNego ? priceNego :"Select"}
                    </option>
                    {priceNego==="no" && <option value="yes">
                      Yes
                    </option>}
                    {priceNego==="yes" && <option value="no">
                      No
                    </option>}
                    {!priceNego && <><option value="yes">
                      Yes
                    </option><option value="no">
                      No
                    </option></>}
                  </select>
                </div>
              </div>
            </div>
            <div className="sap-btn-light mt-4">
              <button
                type="button"
                {...(commonLoader.loader && { disabled: true })}
                onClick={(e) => handleAvailability(e)}
              >
                save details{" "}
                <span className="btn-loader">
                  {commonLoader.loader && <FaCircleNotch />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Availability;
