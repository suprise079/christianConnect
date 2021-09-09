import { IonButton, IonPage, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "../../pages/StylesForPages.css";
import styled from "styled-components";

const Body = styled(IonPage)`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  box-sizing: border-box;
`;

const SignUp = () => {
  return (
    <Body>
      {/* <div id="topBar"><IonButton routerLink="/home" id="backButton">Hello</IonButton></div> */}
      <IonHeader className="ion-no-border"><IonToolbar >
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Register your fellowship</IonTitle>
      </IonToolbar></IonHeader> 
    </Body>
  );
};

export default SignUp;
