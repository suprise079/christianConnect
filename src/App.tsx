import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";



/* Importing pages */
import Welcome from "./pages/Logins/Welcome";
import SignUp from "./pages/Logins/SignUp";
import SignUpU from "./pages/Logins/SignUp/SignUpU";
import Login from "./pages/Logins/Login";
import UploadAnnouncement from "./pages/Profile/UploadAnnouncement";
import PickerExample from "./pages/Profile/UploadEvents"
import UploadSermon from "./pages/Profile/UploadSermons/index";
import Donate from './pages/User/donate/Donate';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";


/* Theme variables */
// import "./theme/variables.css";

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Welcome} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUpU" component={SignUpU} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/UploadAnnouncement" component={UploadAnnouncement} />
        <Route exact path="/UploadSermon" component={UploadSermon} />
        <Route exact path="/UploadEvent" component={PickerExample} />
        <Route exact path="/Donate" component={ Donate } />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
