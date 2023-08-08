import React from "react";

import { Navigate } from "react-router-dom";

import Auth from "../../auth/Auth";

 const PrivateRoute = ({ children }) => {
  const user  = Auth.isUserAuthenticated();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
