import { IonButton, IonPage, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "../../pages/StylesForPages.css";
import styled from "styled-components";

const Body = styled(IonPage)`
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    166.46% 95.78% at 50% 16.56%,
    rgba(255, 255, 255) 45%,
    #348d63 45.42%,
    #348d63 46.46%,
    rgba(255, 255, 255) 46.67%,
    #348d63 46.87%,
    #348d63 49.06%
  );
  box-sizing: border-box;
  // .Buttons {
  //   position: absolute;
  //   display: flex;
  //   justify-content: space-evenly;
  //   flex-direction: column;
  //   height: 100px;
  //   bottom: 10vh;
  //   align-items: center;
  //   width: 100%;
  // }
`;

const SignUp = () => {
  return (
    <Body>
      {/* <div id="topBar"><IonButton routerLink="/home" id="backButton">Hello</IonButton></div> */}
      <IonHeader ><IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Register your fellowship</IonTitle>
      </IonToolbar></IonHeader>

      {/* <div className="Buttons">
        <Buttons
          routerLink="/home"
          onClick={() => {
            console.log("Hello SignUp");
          }}
        >
          Sign up
        </Buttons>
        <Buttons>Users</Buttons>
      </div> */}
    </Body>
  );
};

export default SignUp;
