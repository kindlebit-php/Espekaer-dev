import React, { useState } from "react";

import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

import Auth from "../../../../auth/Auth";

const PartOfGig = () => {
  const navigate = useNavigate();

  const [partGig, setPartGig] = useState(false);

  // Handle automatically number calculating function
  function scrollFunction() {
    if (document.documentElement.scrollTop > 2070) {
      setPartGig(true);
    }
  };
  window.onscroll = function () {
    scrollFunction();
  };

  return (
    <section className="part-of-gig-sec">
      <div className="part-of-gig-sec-inner container">
        <div className="pogs-left">
          <div className="sap-lg-heading">Wanna be a part of our Gig?</div>
          <div className="text-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat, ante ut ornare pharetra, libero massa feugiat tellus, ut
            malesuada sem arcu ut orci. Etiam sapien tellus, fermentum eget
            pharetra at, bibendum rutrum augue nunc vestibulum.
          </div>
          <div className="sap-btn-dark">
            {Auth.token() ? <button type="button" onClick={()=>navigate("/speaker-listing")}>JOIN OUR DIRECTORY</button>: <button type="button" onClick={()=>navigate("/signup")}>JOIN OUR DIRECTORY</button>}
          </div>  
        </div>
        <div className="pogs-right">
          <div className="prg-counter">
            <div className="prg-container row">
              <div className="col-md-6">
                <h3 className="prg-count">
                  {/* partGig  end="950" */}
                  <CountUp {...(partGig && { end: "950" })} duration={2} />
                </h3>
                <h4 className="prg-count-title">SPEAKERS</h4>
              </div>
              <div className="col-md-6">
                <h3 className="prg-count">
                  <CountUp duration={2} {...(partGig && { end: "656" })} />
                </h3>
                <h4 className="prg-count-title">ENTERTAINERS</h4>
              </div>
              <div className="col-md-6">
                <h3 className="prg-count">
                  <CountUp duration={2} {...(partGig && { end: "425" })} />
                </h3>
                <h4 className="prg-count-title">CONSULTANTS</h4>
              </div>
              <div className="col-md-6">
                <h3 className="prg-count">
                  <CountUp duration={2} {...(partGig && { end: "247" })} />
                </h3>
                <h4 className="prg-count-title">TRAINERS</h4>
              </div>
              <div className="col-md-6">
                <h3 className="prg-count">
                  <CountUp duration={2} {...(partGig && { end: "78" })} />
                </h3>
                <h4 className="prg-count-title">AUTHORS</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartOfGig;
