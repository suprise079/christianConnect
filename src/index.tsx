import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import SliderMain from "./MainSlider";
import "./index.css";
import { IonPage, IonApp } from "@ionic/react";

{
  /* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" /> */
}

ReactDOM.render(
  <React.StrictMode>
    <IonPage></IonPage>
    <IonApp>
      <SliderMain />
    </IonApp>
  </React.StrictMode>,
  document.getElementById("root")
);
