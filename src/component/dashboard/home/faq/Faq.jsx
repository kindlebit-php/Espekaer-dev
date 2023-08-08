import React, { useEffect,useState } from "react";

import Accordion from "react-bootstrap/Accordion";

const Faq = () => {
  const [getFaqData, setGetFaqData] = useState("");
  const [faqDataToggle,setfaqDataToggle] = useState(true);
   // Get faq data api
   const faqApi = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}home/getFaq`);
    const data = await res.json();
    setGetFaqData(data?.data);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
  });
  faqApi();
  }, []);

  return (
    <section className="faq-sec">
      <div className="faq-sec-inner container">
        <div className="sap-md-heading">FAQ</div>
        <div className="accordion" id="faq-accor">
          <Accordion defaultActiveKey="0">
           {!faqDataToggle ?  <>
            {getFaqData && getFaqData?.map((faq,index)=>{
              const {question,_id,answer} = faq;
              return(
                <Accordion.Item eventKey={_id} key={index}>
              <Accordion.Header>{question}</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-body">
                  <div className="text-para">
                    <p>{answer}</p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
              )
            })}
            </>:<>
            {getFaqData && getFaqData?.slice(0,3)?.map((faq,index)=>{
              const {question,_id,answer} = faq;
              return(
                <Accordion.Item eventKey={_id} key={index}>
              <Accordion.Header>{question}</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-body">
                  <div className="text-para">
                    <p>{answer}</p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
              )
            })}
            </>}
        {getFaqData?.length>3 && <div className="sap-btn-light"><button onClick={()=>setfaqDataToggle(!faqDataToggle)} type='button'>{faqDataToggle ? "view more":"view less"}</button></div>}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
