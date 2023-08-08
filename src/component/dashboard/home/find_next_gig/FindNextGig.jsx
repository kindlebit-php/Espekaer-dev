import React from "react";
import { useNavigate } from "react-router-dom";

const FindNextGig = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-sec">
      <svg
        className="dotted-lines"
        xmlns="http://www.w3.org/2000/svg"
        width="1368.982"
        height="545.754"
        viewBox="0 0 1368.982 545.754"
      >
        <g
          id="Group_138"
          data-name="Group 138"
          transform="translate(1.645 -168.462)"
        >
          <path
            id="Path_334"
            data-name="Path 334"
            d="M6359.55,194.19c60.121-.139,194.815,5.485,337.45,50.81,192.75,61.25,183.75,187.25,400,195s302.75-117,479-117c65.389,0,113.366,16.1,147.969,36.432"
            transform="translate(-6358 -2)"
            fill="none"
            stroke="#edc967"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeDasharray="7 7"
          />
          <path
            id="Path_333"
            data-name="Path 333"
            d="M6357.633,297.626C6388.769,384.931,6448.143,521.5,6533,589c130.75,104,356,126,466,92s299.5-100.25,325-217-82.25-252.75-217-283-217,11-304,108c-26,36-75,134-7,273,84,111,184.5,148.75,361,153s249-52,392-164,37.75-186.75,102-284a702.612,702.612,0,0,1,72.049-91.355"
            transform="translate(-6358 -2)"
            fill="none"
            stroke="#edc967"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeDasharray="7"
          />
        </g>
      </svg>

      <div className="hero-sec-inner container">
        <div className="hero-left">
          <div className="sap-lg-heading">
            Find Your Next<span className="text-gold"> Gig</span>
          </div>
          <div className="text-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            volutpat, ante ut ornare pharetra, libero massa feugiat tellus, ut
            malesuada sem arcu ut orci. Etiam sapien tellus, fermentum eget
            pharetra.
          </div>
          <div className="sap-btn-dark">
            <button type="button" onClick={()=>navigate("/speaker-listing")}>Book Your Next Gig</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-ban">
            <img src="assets/image/hero-ban.png" alt="" />
          </div>
          <div className="floating-plus">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="71.1"
              height="71.1"
              viewBox="0 0 71.1 71.1"
            >
              <path
                id="Path_337"
                data-name="Path 337"
                d="M36.814-21.33V-48.664H9.48v-16.59H36.814V-92.43H53.4v27.176H80.58v16.59H53.4V-21.33Z"
                transform="translate(-9.48 92.43)"
                fill="#edc967"
              />
            </svg>
          </div>
          <div className="subtract-art">
            <img
              src="assets/image/hero-art-subtraction.png"
              alt=""
              className="subtract-art-img"
            />
            <img
              src="assets/image/hero-ban.png"
              alt=""
              className="subtract-art-img-inside"
            />
          </div>
        </div>
      </div>

      {/* <a href="#wmud" className="scroll-down-arrow"> */}
      <a href="/#" className="scroll-down-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15.431"
          height="9"
          viewBox="0 0 15.431 9"
        >
          <path
            id="Path_336"
            data-name="Path 336"
            d="M38.733,168.548a1.287,1.287,0,0,0,1.82,0l6.427-6.427a1.287,1.287,0,0,0-1.82-1.82l-5.519,5.519-5.519-5.515a1.287,1.287,0,0,0-1.82,1.82l6.427,6.427Z"
            transform="translate(-31.925 -159.925)"
            fill="#edc967"
          />
        </svg>
      </a>
    </section>
  );
};

export default FindNextGig;
