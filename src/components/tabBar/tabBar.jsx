import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { home, mail, person, shareSocialOutline } from "ionicons/icons";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
// impor } from 'react-icons/hi';

import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import "./tabBar.css"; // import css
import Context from "../../context/Context";

const TabBar = () => {
  const history = useHistory();
  const { curUser } = useContext( Context );

  return (
    <div className="tabBarContainer">
      <div onClick={(e) => history.push("/userhome")}>
        <i> <FaHome /></i>
        <IonLabel className="label"> Home </IonLabel>
      </div>

      <div onClick={ e=> { history.push("/subscriptions") } }>
        <i > <IonIcon icon={ mail } ></IonIcon> </i>
        <IonLabel className="label" > Subscription </IonLabel>
      </div>

      <div onClick={(e) => history.push( curUser?.isLeader ? "/leader":"/profile" )}>
        <i> <IonIcon icon={person}></IonIcon> </i>
        <IonLabel className="label"> Profile </IonLabel>
      </div>
    </div>
  );
};

export default TabBar;
