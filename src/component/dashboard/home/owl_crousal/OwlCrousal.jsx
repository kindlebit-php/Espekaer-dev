import React from "react";

import Slider from "react-slick";

const OwlCrousal = () => {
  const settings = {
    slidesToShow: 2,
    infinite: true,
    speed: 500,
    autoplaySpeed:3000,
    slidesToScroll: 1,
    autoplay:true
  };

  return (
    <section className="testi-sec grey-back">
      <div className="testi-sec-inner container">
        <div className="testi-slider">
          <Slider {...settings}>
            <div className="item">
              <div className="testi-img">
                <img src="assets/image/testi1.png" alt="" />
              </div>
              <div className="text-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                volutpat, ante ut ornare pharetra, libero massa feugiat tellus,
                ut malesuada sem arcu ut orci. Etiam sapien tellus, fermentum
                eget pharetra at.
              </div>
              <div className="testi-mem-name">Christina Joseph</div>
              <div className="testi-des">Event Specialist, DGI</div>
            </div>
            <div className="item">
              <div className="testi-img">
                <img src="assets/image/testi2.png" alt="" />
              </div>
              <div className="text-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                volutpat, ante ut ornare pharetra, libero massa feugiat tellus,
                ut malesuada sem arcu ut orci. Etiam sapien tellus, fermentum.
              </div>
              <div className="testi-mem-name">Sheldon Brick</div>
              <div className="testi-des">CSP</div>
            </div>
            <div className="item">
              <div className="testi-img">
                <img src="assets/image/testi1.png" alt="" />
              </div>
              <div className="text-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                volutpat, ante ut ornare pharetra, libero massa feugiat tellus,
                ut malesuada sem arcu ut orci. Etiam sapien tellus, fermentum
                eget pharetra at.
              </div>
              <div className="testi-mem-name">Christina Joseph</div>
              <div className="testi-des">Event Specialist, DGI</div>
            </div>
            <div className="item">
              <div className="testi-img">
                <img src="assets/image/testi2.png" alt="" />
              </div>
              <div className="text-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                volutpat, ante ut ornare pharetra, libero massa feugiat tellus,
                ut malesuada sem arcu ut orci. Etiam sapien tellus, fermentum.
              </div>
              <div className="testi-mem-name">Sheldon Brick</div>
              <div className="testi-des">CSP</div>
            </div>
          </Slider>
        </div>
      </div>
      
    </section>
  );
};

export default OwlCrousal;
