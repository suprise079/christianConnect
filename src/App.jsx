import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

import { app } from "./firebase/firebase";

// context for state handling
import Context from "./context/Context";
import SubscriptionHome from "./pages/subscription/SubscriptionHome.jsx";




const App = () => {
  // check if the user is logged in
  var [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <SubscriptionHome />
    </>
  )
}
export default App;
