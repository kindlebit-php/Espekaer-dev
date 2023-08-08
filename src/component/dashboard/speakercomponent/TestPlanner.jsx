import React from 'react'

const TestPlanner = () => {
  return (
   <div className="upgrade-page">
   <section className="upgrade-sec grey-back">
       <div className="upgrade-sec-inner container">
           <div className="sap-sm-heading sap-title-head">Save BIG on Annual Plans!</div>
           <div className="text-para text-center">Sign up today for an annual plan to receive all the best features to empower your business and save 10% over a month-to-month plan.</div>

           
           <div className="upgrade-plans-head">
               <div className="upgrade-plans-inner lightgrey-back text-center">
                   <div className="floating-tag bronze">FREE</div>
                  
                   <div className="sap-lg-heading setbasiccolr"><sup>$</sup>179</div>
                   <div className="text-para pb-0 setbasiccolr">USD/YEAR</div>
             
                   <div className="top-plans">
                       <div className="text-para text-center">FREE For Participating Association Members</div>
                       <div className="sap-btn-light"><button>Join Today</button></div>
                           <div className="text-para text-center pt-3">Basic Marketing Basic Management</div>
                   </div>
               </div>

               <div className="upgrade-plans-inner lightgrey-back text-center">
                   <div className="floating-tag silver">VIP</div>

                  
                   <div className="sap-lg-heading setpluscolr"><sup>$</sup>39<sup>.95</sup></div>
                   <div className="text-para pb-0 setpluscolr">USD/MONTH</div>
             
                   <div className="top-plans">
                       <div className="text-para text-center">or SAVE BIG on Annual Plans
                           <span className="setpluscolr">$439 USD/YEAR</span></div>
                       <div className="sap-btn-light"><button>Join Today</button></div>
                           <div className="text-para text-center pt-3">Maximum Marketing Basic Management</div>
                   </div>
               </div>
               <div className="upgrade-plans-inner lightgrey-back text-center">
                   <div className="floating-tag gold">PLATINUM</div>

                   <div className="sap-lg-heading setprocolr"><sup>$</sup>74<sup>.95</sup></div>
                   <div className="text-para pb-0 setprocolr">USD/MONTH</div>
             
                   <div className="top-plans">
                       <div className="text-para text-center">or SAVE BIG on Annual Plans
                           <span className="setprocolr">$809 USD/YEAR</span></div>
                       <div className="sap-btn-light"><button>Join Today</button></div>
                           <div className="text-para text-center pt-3">Maximum Marketing Maximum Management</div>
                   </div>
               </div>

           </div>
           </div>
   </section>

   <section className="chart-sec">
       <div className="chart-sec-inner container">
          <div className="sap-sm-heading text-center">Comparison Chart</div>
          <div className="chart-sheet">
             <table className="table">
                <thead>
                   <tr>
                      <th>Benefit</th>
                      <th style={{width: "20%"}}><div className="floating-tag bronze">Free</div></th>
                      <th style={{width: "20%"}}><div className="floating-tag silver">VIP</div></th>
                      <th style={{width: "20%"}}><div className="floating-tag gold">Platinum</div></th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td>Bio</td>
                      <td>500 Words</td>
                      <td>same</td>
                      <td>same</td>
                   </tr>
                   <tr>
                      <td>Tips and Articles</td>
                      <td>Gratis</td>
                      <td>Gratis</td>
                      <td>Gratis</td>
                   </tr>
                   <tr>
                      <td>Images</td>
                      <td>up to 3</td>
                      <td>6</td>
                      <td>Library</td>
                   </tr>
                   <tr>
                      <td>Programs/Landing Pages</td>
                      <td>1</td>
                      <td>3</td>
                      <td>4,$100 per additional (annual)</td>
                   </tr>
                   <tr>
                      <td>Video</td>
                      <td>-</td>
                      <td>1 per program</td>
                      <td>1 per program</td>
                   </tr>
                   <tr>
                      <td>Ratings from Planners</td>
                      <td>-</td>
                      <td>Cannot Remove</td>
                      <td>Can Remove</td>
                   </tr>
                   <tr>
                      <td>Calendar - Availability, Event Locations, Date/Time</td>
                      <td>-</td>
                      <td>1 month in advance</td>
                      <td>1 year in advance</td>
                   </tr>
                   <tr>
                      <td>References/Testimonials</td>
                      <td>-</td>
                      <td>1</td>
                      <td>3 per program</td>
                   </tr>
                   <tr>
                      <td>Event Ticket</td>
                      <td>-</td>
                      <td>Discount</td>
                      <td>One Ticket free, spouse free</td>
                   </tr>
                   <tr>
                      <td>Blog</td>
                      <td>-</td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                   </tr>
                   <tr>
                      <td>Picture Library</td>
                      <td>-</td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                   </tr>
                   <tr>
                      <td>Concierge Service</td>
                      <td>-</td>
                      <td>-</td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                   </tr>
                   <tr>
                      <td>Shopping Cart (stripe)</td>
                      <td>-</td>
                      <td>-</td>
                      <td><i className="fa fa-check" aria-hidden="true"></i></td>
                   </tr>
                   <tr>
                      <td>Integrations</td>
                      <td>-</td>
                      <td>-</td>
                      <td>Zapier</td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>
    </section>


</div>  
  )
}

export default TestPlanner