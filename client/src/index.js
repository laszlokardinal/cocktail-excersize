import "@babel/polyfill";

import "./index.css";

import ReactDOM from "react-dom";
import React from "react";
import window from "window";

import { App } from "./view";

ReactDOM.render(
  React.createElement(App),
  window.document.getElementById("react-root")
);
