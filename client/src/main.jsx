import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JobSeekerContextProvider } from "./context/JobSeekerContext.jsx";
import { RecruiterContextProvider } from "./context/RecruiterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JobSeekerContextProvider>
      <RecruiterContextProvider>
        <App />
      </RecruiterContextProvider>
    </JobSeekerContextProvider>
  </React.StrictMode>
);
