import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "../StylesForPages.css";

const Body = styled(IonPage)`
  padding: 1em 0em
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
const Content = styled.div`
  background: rgb(164, 204, 185);
  background: linear-gradient(
    0deg,
    rgba(164, 204, 185, 1) 26%,
    rgba(52, 141, 99, 1) 60%,
    rgba(52, 141, 99, 1) 100%
  );
  overflowy: scroll;
`;

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const [confpswd, setconfpswd] = useState("password");
  const [showConf, setshowConf] = useState(false);

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

      <Content style={{ overflowY: "scroll" }}>
        <div id="inputs">
          {/* <form action="/" method="post"> */}

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
          />

          <div>
            <Link to="/leader">Create A Fellowship</Link>
          </div>

          {/* </form> */}

          <div className="haveAcc">
            Have an account ?
            <Link style={{ color: "#fff" }} to="/Login">
              Login
            </Link>
          </div>
        </div>
      </Content>
    </Body>
  );
};

export default SignUp;
