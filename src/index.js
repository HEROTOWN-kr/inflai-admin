import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./css/common.scss";
import App from "./components/App";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}
