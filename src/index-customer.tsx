import React from "react";
import { render } from "react-dom";
import "./infrastructure/injector/injectAllApp";
import "./infrastructure/i18n";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Customer from "./infrastructure/Customer";

import "../node_modules/overlayscrollbars/css/OverlayScrollbars.css";
import "react-datepicker/dist/react-datepicker.css";
import "./infrastructure/index.scss";
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


serviceWorkerRegistration.register();

render(
  <React.StrictMode>
    <Customer />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
