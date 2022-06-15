import React from "react";
import { render } from "react-dom";
import "./infrastructure/injector/injectAllAdmin";
import "./infrastructure/i18n";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Admin from "./infrastructure/Admin";

import "../node_modules/overlayscrollbars/css/OverlayScrollbars.css";
import "react-datepicker/dist/react-datepicker.css";
import "./infrastructure/index.scss";
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


serviceWorkerRegistration.register();

render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
