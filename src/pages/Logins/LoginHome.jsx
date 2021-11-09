import {IonReactRouter} from "@ionic/react-router";
import{IonRouterOutlet} from "@ionic/react";
import { Route } from "react-router";

import Welcome from "./Welcome"
import Login from "./Login";
import SignUp from "./SignUp";

export default function LoginHome() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/SignUp" component={SignUp}/>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}
