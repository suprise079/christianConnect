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
import bg from "./bg.png";

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
  #logins {
    margin-top: 30%;
    padding: 10px 3px;
    // width:
    background-image: url("${bg}");
    background-size: 42% 100%;
    background-repeat: no-repeat;
    background-position-x: right;
  }
  ion-input {
    border: 1px solid gray;
    width: 70%;
    margin: 1.2% 5%;
    background: transparent;
  }
  label {
    text-shadow: none;
    margin: 1.2% 5%;
  }
  input[type="submit"] {
    width: 30vw;
    padding: 1% 5%;
    margin: 20px 5%;
    color: #348d63;
    background: transparent;
    // background: rgb(164, 204, 185);
    // background: linear-gradient(
    //   345deg,
    //   rgba(164, 204, 185, 1) 26%,
    //   rgba(52, 141, 99, 1) 60%,
    //   rgba(52, 141, 99, 1) 100%
    // );
  }
`;
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target);
};
const Login = () => {
  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="logins">
        <form
          action="/"
          /* method="post" */ onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="Email address">Email</label>
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

          <input type="submit" value="Login" />
        </form>
      </div>
      <div className="haveAcc">
        Don't have an account ? <Link to="/home">Login</Link>
      </div>
      <div className="haveAcc">
        <Link to="/home">Forgot password ?</Link>
      </div>
    </Body>
  );
};

export default Login;
