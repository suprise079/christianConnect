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
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../StylesForPages.css";

const Body = styled(IonPage)`
  overflowY:scroll
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
    ion-header {
      background-color: #fff;
      padding: 0;
      border-radius: 0;
      box-shadow: 0 0 10px #000;
    }
    ion-title {
      margin:0;
      text-align:center;
      color:rgba(52, 141, 99, 1);
    }
    ion-back-button{
      color:rgba(52, 141, 99, 1);
      position:absolute;
    }

  `;

const SignUpU = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const [confpswd, setconfpswd] = useState("password");
  const [showConf, setshowConf] = useState(false);
  const history = useHistory(); // use for routing to other pages in code.

  const RegisterClick = () => {
    alert("ACTIONS FOR REGISTERING USER COMING SOON....");

    history.push("/Login");
  };

  return (
    <Body style={{ overflowY: "scroll" }}>
      <IonHeader color="inherit" className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create your account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id="inputs">
        <form onClick={(e) => RegisterClick(e)} action="/" method="post">
          <label htmlFor="First name">First name</label>
          <IonInput
            name="First name"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Last name">Last name</label>
          <IonInput
            name="Last name"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Phone number">Phone number</label>
          {/* will use regex validation to format to NUMBERS ONLY */}
          <IonInput
            name="Phone number"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Email address">Email address</label>
          <IonInput
            type="email"
            name="Email address"
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Password">
            Password{" "}
            <span
              onClick={() => {
                setshowPassword(showPassword ? false : true);
                setpswdType(showPassword ? "password" : "text");
              }}
            >
              {showPassword ? (
                <AiFillEyeInvisible size="23px" />
              ) : (
                <AiFillEye size="23px" />
              )}
            </span>
          </label>
          <IonInput
            required
            type={pswdType}
            clearInput="true"
            className="inputField"
          ></IonInput>

          <label htmlFor="Confirm password">
            Confirm password
            <span
              onClick={() => {
                setshowConf(showConf ? false : true);
                setconfpswd(showConf ? "password" : "text");
              }}
            >
              {showConf ? (
                <AiFillEyeInvisible size="23px" />
              ) : (
                <AiFillEye size="23px" />
              )}
            </span>
          </label>
          <IonInput
            required
            type={confpswd}
            name="Confirm password"
            clearInput="true"
            className="inputField"
          ></IonInput>
          <input type="submit" value="Register" />
        </form>

        <div className="haveAcc">
          {" "}
          Register with
          <Link className="toGoogle" style={{}} to="/">
            {" "}
            <FcGoogle className="google" /> Google
          </Link>
        </div>
        <div className="haveAcc">
          Have an account ? <Link to="/Donate"> Donate </Link>
        </div>
      </div>
    </Body>
  );
};

export default SignUpU;
