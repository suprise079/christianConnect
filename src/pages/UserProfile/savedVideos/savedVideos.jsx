import {
  IonToolbar,
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import TabBar from "../../../components/tabBar/tabBar";
import { logOutSharp } from "ionicons/icons";
import React from 'react';
import { FaUserEdit } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
const Body = styled(IonPage)`
    position: relative;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background: white;
    box-sizing: border-box;
    z-index: -1;
    * {
      color: black;
    }
    ion-header {
      background-color: #a3d7be;
      padding: 0;
      border-radius: 0;
      box-shadow: none;
    }
    ion-title {
      margin: 0;
      text-align: center;
      color: white;
    }
    ion-back-button {
      color: white;
      position: absolute;
    }
    div.body {
      overflow-y: scroll;
    }
  `;
const SavedVideos = () => {
  const history = useHistory(); // use this for routing in js codes.
  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>Saved videos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="body">SAVED VIDEOS</div>
      <TabBar />
    </Body>
  );
};

export default SavedVideos;
