import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { home, mail, person, shareSocialOutline } from "ionicons/icons";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
// impor } from 'react-icons/hi';

import { Link, useHistory } from "react-router-dom";
import React from "react";

import "./tabBar.css"; // import css

const TabBar: React.FC = () => {
  const history = useHistory();

  return (
    <div className="tabBarContainer">
      <div onClick={(e) => history.push("/userhome")}>
        {/* <Link to="/userhome" > */}
        <i>
          {" "}
          <FaHome />{" "}
        </i>
        <IonLabel className="label"> Home </IonLabel>
        {/* </Link> */}
      </div>

      <div onClick={ e=> history.push("/SubscriptionHome") }>
        <i > <IonIcon icon={ mail } ></IonIcon> </i>
        <IonLabel className="label" > Subscription </IonLabel>
      </div>

      <div onClick={(e) => history.push("/profile")}>
        {/* <Link to="/profile" > */}
        <i>
          {" "}
          <IonIcon icon={person}></IonIcon>{" "}
        </i>
        <IonLabel className="label"> Profile </IonLabel>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default TabBar;

{
  /* <IonTabBar > */
}
{
  /* href="/home" */
}
// <IonTabButton >
{
  /* <button > */
}
// <IonIcon icon={
//  home} ></IonIcon>
// <IonLabel >Home</IonLabel>
{
  /* </button> */
}
// </IonTabButton>

{
  /* href="/subscription" */
}
// <IonTabButton >
// <IonIcon icon={
// mail } ></IonIcon>
// <IonLabel >Subscription</IonLabel>
// </IonTabButton>

{
  /* href="/" */
}
// <IonTabButton >
// <IonIcon icon={
// person } ></IonIcon>
// <IonLabel >Profile</IonLabel>
// </IonTabButton>
// </IonTabBar>
