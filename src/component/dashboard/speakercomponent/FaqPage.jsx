import React, { Fragment, useEffect } from "react";

import { Helmet } from "react-helmet";

import Accordion from "react-bootstrap/Accordion";

const FaqPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
  });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <div className="faq-page">
        <section className="faq-sec">
          <div className="faq-sec-inner container">
            <div className="sap-sm-heading sap-title-head">FAQ</div>
            <form action="" className="faq-search">
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder="Type to find an answer..."
              />
            </form>
            <div className="accordion" id="faq-accor">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="">
                  <Accordion.Header> Who is Gig Finder+?</Accordion.Header>
                  <Accordion.Body>
                    <div className="accordion-body">
                      <div className="text-para">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat, ante ut ornare pharetra, libero
                          massa feugiat tellus, ut malesuada sem arcu ut orci.
                          Etiam sapien tellus, fermentum eget pharetra at,
                          bibendum rutrum augue. Nunc vestibulum at ex in
                          congue. Aliquam augue nisi, tristique blandit risus
                          ut, ultricies iaculis purus. Aliquam hendrerit aliquam
                          porta. Ut sed lorem in diam consequat commodo vel ac
                          nunc. Quisque massa turpis, venenatis vel dictum sed,
                          porttitor non justo.
                        </p>
                        <p>
                          Phasellus dolor lectus, posuere vulputate orci id,
                          efficitur posuere mi. Cras sed metus id tortor
                          suscipit tincidunt eget at mauris. Cras at aliquam
                          nibh.
                        </p>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>What Does Gig Finder+ Do?</Accordion.Header>
                  <Accordion.Body>
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    What Sets our Professional Speakers Website Apart?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="accordion-body">
                      <strong>This is the third item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classNamees that we use to style each
                      element. These classNamees control the overall appearance,
                      as well as the showing and hiding via CSS transitions. You
                      can modify any of this with custom CSS or overriding our
                      default variables. It's also worth noting that just about
                      any HTML can go within the <code>.accordion-body</code>,
                      though the transition does limit overflow.
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="sap-btn-light">
            <button type="button">load more</button>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default FaqPage;
