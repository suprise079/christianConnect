import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../pages/StylesForPages.css";

const Body = styled(IonPage)`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(164, 204, 185);
  background: linear-gradient(
    0deg,
    rgba(164, 204, 185, 1) 26%,
    rgba(52, 141, 99, 1) 60%,
    rgba(52, 141, 99, 1) 100%
  );
  box-sizing: border-box;
  z-index: -1;
`;

const SignUp = () => {
  return (
    <Body>
      <IonHeader color="inherit" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Register your fellowship</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="inputs">
        <form action="/" method="post">
          <label htmlFor="name">Name of fellowship</label>
          <IonInput
          required
            name="name"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="First name">First name</label>
          <IonInput
          required
            name="First name"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Last name">Last name</label>
          <IonInput
          required
            name="Last name"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Phone number">Phone number</label>
          {/* will use regex validation to format to NUMBERS ONLY */}
          <IonInput
          required
            name="Phone number"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Email address">Email address</label>
          <IonInput
          required
            type="email"
            name="Email address"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Password">Password</label>
          <IonInput
          required
            type="password"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Confirm password">Confirm password</label>
          <IonInput
          required
            type="password"
            name="Confirm password"
            clearInput="true"
            className="inputField"
          ></IonInput>
          <input type="submit" value="Create a Fellowship" />
        </form>
        <div className="haveAcc">
          Have an account ? <Link to="/Login">Login</Link>
        </div>
      </div>
    </Body>
  );
};

export default SignUp;
