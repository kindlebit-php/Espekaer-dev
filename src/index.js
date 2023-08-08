import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { AppProvider } from "./component/context/AppContext";

// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="696134312575-2fsgealeq10shc7pmdtsunvcn0h27fmo.apps.googleusercontent.com">
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleOAuthProvider>
);
