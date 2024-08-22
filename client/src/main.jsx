import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JobSeekerContextProvider } from "./context/JobSeekerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JobSeekerContextProvider>
      <App />
    </JobSeekerContextProvider>
  </React.StrictMode>
);
