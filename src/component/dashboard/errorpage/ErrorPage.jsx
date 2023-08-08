import React from "react";

import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

  const navigate = useNavigate();

  setTimeout(()=>{
    navigate(-1)
  },0);

  return (
    <section className="error-page">
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <div className="sap-btn-light">
            <button type="button" onClick={() => navigate("/home")}>
              Go Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
