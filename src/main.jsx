import React from "react";

import ReactDOM
  from "react-dom/client";

import "mapbox-gl/dist/mapbox-gl.css";

import App from "./App";

import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/map.css";
import "./styles/widget.css";
import "./styles/animations.css";

const script =
  document.createElement(
    "script"
  );

script.src =
  "https://www.google.com/recaptcha/enterprise.js?render=6Ld6MqomAAAAACj3-PD8-noxdlsK-zRs8gUD47Dx";

script.async = true;

document.body.appendChild(
  script
);

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
 
    <App />
 
);