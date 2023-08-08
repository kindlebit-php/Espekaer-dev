import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import Auth from "../../../../auth/Auth";

const SearchIndustry = () => {
  const navigate = useNavigate();

  const [getAllIndustry, setGetAllIndustry] = useState([]);
  const [getAllTalent, setGetAllTalent] = useState([]);
  const [industryDataShow,setIndustryDataShow] = useState(true);
  const [talentDataShow,setTalentDataShow] = useState(true);

  // Get all industry api
  const getIndustryApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}home/getIndustryData`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    };
    const data = await res.json();
    setGetAllIndustry(data?.data);
  };

  // Get all talent api
  const getTalentApi = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}home/getTalentData`
    );
    if (res.status === 401) {
      Auth.logout();
      navigate("/login");
    }
    const data = await res.json();
    setGetAllTalent(data?.data);
  };

  useEffect(() => {
    getIndustryApi();
    getTalentApi();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="search-by-sec">
      <div className="search-by-sec-inner container">
        <div className="sb-industry">
          <div className="sap-sm-heading">Search by Industry</div>
          {!industryDataShow ? <div className="sb-industry-list">
            {getAllIndustry &&
              getAllIndustry?.map((indus, index) => {
                const { industryName, imagePath } = indus;
                return (
                  <Link key={index} to={`speaker-listing/${industryName}`} className="sb-industry-list-inner">
                    <div className="sbil-img">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${imagePath}`}
                        alt=""
                      />
                    </div>
                    <div className="sbil-title">{industryName}</div>
                  </Link>
                );
              })}
          </div>:<div className="sb-industry-list">
            {getAllIndustry &&
              getAllIndustry?.slice(0,4)?.map((indus, index) => {
                const { industryName, imagePath } = indus;
                return (
                  <Link key={index} to={`speaker-listing/${industryName}`} className="sb-industry-list-inner">
                    <div className="sbil-img">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${imagePath}`}
                        alt=""
                      />
                    </div>
                    <div className="sbil-title">{industryName}</div>
                  </Link>
                );
              })}
          </div>}

          {getAllIndustry?.length>4 && <div className="sap-btn-light"><button onClick={()=>setIndustryDataShow(!industryDataShow)} type='button'>{industryDataShow ? "view more":"view less"}</button></div>}
        </div>

        <div className="sb-talent">
          <div className="sap-sm-heading">Search by Talent</div>
          {!talentDataShow ? <div className="sb-talent-list">
            {getAllTalent &&
              getAllTalent?.map((talent, index) => {
                const { talentName, imagePath } = talent;
                return (
                  <Link key={index} to={`speaker-listing/${talentName}`} className="sb-talent-list-inner">
                    <div className="sbtl-img">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${imagePath}`}
                        alt=""
                      />
                    </div>
                    <div className="sbtl-title">{talentName}</div>
                  </Link>
                );
              })}
          </div>:<div className="sb-talent-list">
            {getAllTalent &&
              getAllTalent?.slice(0,4)?.map((talent, index) => {
                const { talentName, imagePath } = talent;
                return (
                  <Link key={index} to={`speaker-listing/${talentName}`} className="sb-talent-list-inner">
                    <div className="sbtl-img">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${imagePath}`}
                        alt=""
                      />
                    </div>
                    <div className="sbtl-title">{talentName}</div>
                  </Link>
                );
              })}
          </div>}

          {getAllTalent?.length>4 && <div className="sap-btn-light"><button onClick={()=>setTalentDataShow(!talentDataShow)} type='button'>{talentDataShow ? "view more":"view less"}</button></div>}
        </div>
      </div>
    </section>
  );
};

export default SearchIndustry;
