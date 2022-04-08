import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import App from "./App-2";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);