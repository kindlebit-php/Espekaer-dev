import React from "react";

import { Navigate } from "react-router-dom";

import Auth from "../../auth/Auth";
 const PublicRoute = ({ children }) => {
    const user  = Auth.isUserAuthenticated();
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };
export default PublicRoute;
