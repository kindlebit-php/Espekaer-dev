import React, { useState, Fragment, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

import Auth from "../../../auth/Auth";
import Loader from "../../loader/Loader";

const Planner = () => {
   // Decryprt token
   const navigate = useNavigate();
   const decrypt = Auth.token()
   ?.split("")
   ?.map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
   .join("");

  const [currency,setCurrency]=useState("");
  const [selectPlanner, setSelectPlanner] = useState("month");
  const [getPlannerData, setGetPlannerData] = useState([]);

  const [CommonData, setCommonData] = useState({
    pageLoader: false,
  });

  // get planner api
  const getPlanner = async () => {
    setCommonData({ ...CommonData, pageLoader: true });
    const requestOption = {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}speaker/getAllPlan/${selectPlanner}`,
      requestOption
    );
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonData({ ...CommonData, currency: data?.data[0]?.price?.currency });
      setCurrency(data.data[0].price.currency);
      setCommonData({ ...CommonData, pageLoader: false });
      setGetPlannerData(data?.data);
    };
    if (res.status >= 400 && res.status <= 500) {
      const data = await res.json();
      setCommonData({ ...CommonData, pageLoader: false });
      toast.warn(data?.message);
    };
  };

  // purchase suscriptipn plan api
  const purchasePlanApi =async(token,pay) => {
    setCommonData({ ...CommonData, pageLoader: true });
    const requestValue = {
      tokenId:token.id,
      priceId:pay.price.id,
      planName:pay.price.nickname
    };
    const requestKey={
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        authToken: decrypt,
      },
      body:JSON.stringify(requestValue)
    };
    const res =await fetch(`${process.env.REACT_APP_BASE_URL}speaker/Subscription`,requestKey);
    if (res.status >= 200 && res.status <= 399) {
      const data = await res.json();
      setCommonData({ ...CommonData, pageLoader: false });
      toast.warn(data.message);
    };
    if (res.status >= 400 && res.status <= 500) {
      setCommonData({ ...CommonData, pageLoader: false });
      if (res.status === 401) {
        Auth.logout();
        navigate("/login");
      };
      const error = await res.json();
      toast.warn(error.message);
    };
};

  // Convert according to price symbol
  function getCurrencySymbol(locale, currency) {
    return (0)
      .toLocaleString(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
  };


  useEffect(() => {
    getPlanner();
    // eslint-disable-next-line
  }, [selectPlanner]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  

  return (
    <Fragment>
      {CommonData.pageLoader && <Loader />}
      <Helmet>
        <title>Planner</title>
      </Helmet>
      <div className="upgrade-page">
        <section className="upgrade-sec">
          <div className="upgrade-sec-inner container">
            <div className="sap-sm-heading sap-title-head">Upgrade</div>
            <form action="" className="upgrade-page-toggle">
              <div className="upgrade-type-check">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={selectPlanner === "month"}
                    value="month"
                    onChange={(e) => setSelectPlanner(e.target.value)}
                    name="flexRadioDefault"
                    id="monthly1"
                  />
                  <label className="form-check-label" htmlFor="monthly1">
                    Monthly plans
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={selectPlanner === "year"}
                    value="year"
                    onChange={(e) => setSelectPlanner(e.target.value)}
                    name="flexRadioDefault"
                    id="yearly1"
                  />
                  <label className="form-check-label" htmlFor="yearly1">
                    Yearly plans
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={selectPlanner === "free"}
                    value="free"
                    onChange={(e) => setSelectPlanner(e.target.value)}
                    name="flexRadioDefault"
                    id="freeplan"
                  />
                  <label className="form-check-label" htmlFor="freeplan">
                    Free plans
                  </label>
                </div>
              </div>
            </form>

            <div className="upgrade-plans-head">
              {getPlannerData?.length > 0 ? (
                getPlannerData?.map((des) => {
                  const { _id } = des;
                  return (
                    <div
                      key={_id}
                      className="upgrade-plans-inner lightgrey-back"
                    >
                      {/* <img
                        src={des?.product?.images}
                        style={{ width: "200px", height: "200px" }}
                        alt=""
                      /> */}
                      {des?.amount?.percentage > 0 && (
                        <div>
                          {/* <div>
                            {des?.amount?.totalAmount && (
                              <span>
                                Total amount (
                                {getCurrencySymbol(
                                  "en-US",
                                  des?.price?.currency
                                )}
                                ):{des?.amount?.totalAmount / 100}
                              </span>
                            )}
                          </div> */}
                          {/* <div>
                            {des?.amount?.percentage && (
                              <span>Discount :{des?.amount?.percentage}%</span>
                            )}
                          </div> */}
                          {/* <div>
                            {des?.amount?.discountAmount && (
                              <span>
                                Discounted Price (
                                {getCurrencySymbol(
                                  "en-US",
                                  des?.price?.currency
                                )}
                                ):
                                {des?.amount?.discountAmount / 100}
                              </span>
                            )}
                          </div> */}
                          {/* <div>
                            {des?.amount?.afterDiscount && (
                              <span>
                                Payable Amount (
                                {getCurrencySymbol(
                                  "en-US",
                                  des?.price?.currency
                                )}
                                ):{des?.amount?.afterDiscount / 100}
                              </span>
                            )}
                          </div> */}
                        </div>
                      )}
                      {des?.price?.currency ? (
                        <div className="sap-sm-heading">
                          {getCurrencySymbol("en-US", des?.price?.currency)}
                          {(des?.price?.unit_amount / 100).toFixed(2)}
                          <sup>/{des?.price?.recurring?.interval}</sup>
                        </div>
                      ) : (
                        <div className="sap-sm-heading">Free</div>
                      )}

                      <div
                        className={`floating-tag ${des?.product?.name === `Platinum`
                          ? `gold`
                          : des?.product?.name === `VIP`
                            ? `silver`
                            : des?.product?.name === `free`
                              ? `bronze`
                              : ""
                          }`}
                      >
                        {des?.product?.name === "Platinum"
                          ? `${des?.product?.name} - ${des?.amount?.percentage}% OFF`
                          : des?.product?.name === "VIP"
                            ? `${des?.product?.name} - ${des?.amount?.percentage}% OFF`
                            : des?.product?.name === "free"
                              ? `${des?.product?.name} - ${0}% OFF`
                              : ""}
                      </div>
                      <div className="sap-btn-dark">
                        {des?.price?.recurring?.trial_period_days && (
                          <button type="button">
                            Free {des?.price?.recurring?.trial_period_days}-day
                            trial
                          </button>
                        )}
                      </div>
                      <ul className="top-plans">
                        {des?.product?.description?.description?.map(
                          (data, index) => {
                            return <li key={index}>{`${data}`}</li>;
                          }
                        )}
                      </ul>

                      {/* <ul className="bot-plans">
                        <li>Event organizers can contact you</li>
                        <li>No commission or transaction fees</li>
                        <li className="non-included">
                          Recommended speaking opportunities
                        </li>
                        <li className="non-included">Get featured in search</li>
                        <li className="non-included">
                          Detailed profile statistics
                        </li>
                        <li className="non-included">
                          Share presentations publicly
                        </li>
                        <li className="non-included">
                          Add workshop or training agendas
                        </li>
                        <li className="non-included">Video testimonials</li>
                        <li className="non-included">Speaker One-Sheet PDF</li>
                        <li className="non-included">
                          Promotion to event organizers
                        </li>
                        <li className="non-included">
                          Get visibility on our blog sidebar
                        </li>
                        <li className="non-included">
                          Get tweeted as Speaker of the Day
                        </li>
                        <li className="non-included">
                          VIP assistant updates your profile
                        </li>
                        <li className="non-included">
                          Priority customer service
                        </li>
                      </ul> */}
                      <div className="sap-btn-dark payment-button">
                        {des?.price?.recurring?.trial_period_days ? (
                          <button type="button">
                            Free {des?.price?.recurring?.trial_period_days}-day
                            trial
                          </button>
                        ) : (
                          des?.price?.unit_amount && <button type="button">
                            <StripeCheckout
                              stripeKey={`${process.env.REACT_APP_PAYMENT_PUBLIC_KEY}`}
                              token={(token)=>purchasePlanApi(token,des)}
                              currency={currency?.toUpperCase()}
                              billingAddress
                              label="Choose"
                              shippingAddress
                              amount={des?.price?.unit_amount}
                              name="Enter your card number"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>Currently not subscription plan available yet!</span>
              )}

              {/* <div className="upgrade-plans-inner lightgrey-back">
              <div className="floating-tag silver">silver</div>

              <div className="sap-sm-heading">
                $86.90<sup>/y</sup>
              </div>
              <div className="sap-btn-dark">
                <button type="button">Free 30-day trial</button>
              </div>
              <ul className="top-plans">
                <li>Publish your speaker page</li>
                <li>Unlimited photos, slides and VIDEOS</li>
                <li>All FREE speaking opportunities</li>
                <li>Exclusive content and webinars</li>
              </ul>
              <ul className="bot-plans">
                <li>Event organizers can contact you</li>
                <li>No commission or transaction fees</li>
                <li>Recommended speaking opportunities</li>
                <li>Get featured in search</li>
                <li>Detailed profile statistics</li>
                <li>Share presentations publicly</li>
                <li>Add workshop or training agendas</li>
                <li className="non-included">Video testimonials</li>
                <li className="non-included">Speaker One-Sheet PDF</li>
                <li className="non-included">Promotion to event organizers</li>
                <li className="non-included">
                  Get visibility on our blog sidebar
                </li>
                <li className="non-included">
                  Get tweeted as Speaker of the Day
                </li>
                <li className="non-included">
                  VIP assistant updates your profile
                </li>
                <li className="non-included">Priority customer service</li>
              </ul>
              <div className="sap-btn-dark">
                <button type="button">Free 30-day trial</button>
              </div>
            </div> */}
              {/* <div className="upgrade-plans-inner lightgrey-back">
              <div className="floating-tag gold">gold</div>

              <div className="sap-sm-heading">
                $259.90<sup>/y</sup>
              </div>
              <div className="sap-btn-dark">
                <button type="button">Free 30-day trial</button>
              </div>
              <ul className="top-plans">
                <li>Publish your speaker page</li>
                <li>Unlimited photos, slides and VIDEOS</li>
                <li>All FREE speaking opportunities</li>
                <li>Exclusive content and webinars</li>
              </ul>
              <ul className="bot-plans">
                <li>Event organizers can contact you</li>
                <li>No commission or transaction fees</li>
                <li>Recommended speaking opportunities</li>
                <li>Get featured in search</li>
                <li>Detailed profile statistics</li>
                <li>Share presentations publicly</li>
                <li>Add workshop or training agendas</li>
                <li>Video testimonials</li>
                <li>Speaker One-Sheet PDF</li>
                <li>Promotion to event organizers</li>
                <li>Get visibility on our blog sidebar</li>
                <li>Get tweeted as Speaker of the Day</li>
                <li>VIP assistant updates your profile</li>
                <li>Priority customer service</li>
              </ul>
              <div className="sap-btn-dark">
                <button type="button">Free 30-day trial</button>
              </div>
            </div> */}
            </div>

          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Planner;
