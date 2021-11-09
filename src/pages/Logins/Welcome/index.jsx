import { IonButton, IonPage, IonSpinner } from "@ionic/react";
import "../StylesForPages.css";
import logo from "./Logo_transp.png";
import styled from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";
import { FaWalking, FaChurch } from "react-icons/fa";
// import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

// import firebase functions and modules here
import { auth } from "../../../firebase/firebase";
import Cookies from "js-cookie";
import Context from "../../../context/Context";
import { Link, useHistory } from "react-router-dom";

const Body = styled(IonPage)`
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 10vh;
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
  .Buttons {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100px;
    bottom: 10vh;
    align-items: center;
    width: 100%;
  }
  a {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const Buttons = styled(IonButton)`
  --background: white;
  text-transform: unset;
  height: 35px;
  border-radius: 10px;
  color: #348d63;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Welcome = () => {
  const [clicked, setclicked] = useState(false);
  const history = useHistory();

  return (
    <IonPage>
      <Body>
        <img style={{ marginTop: "80px" }} src={logo} alt="Logo" />
        <div className="Buttons">
          {clicked ? (
            <IonSpinner name="bubbles" />
          ) : (
            <Buttons
              className="welcomeLink"
              // to="/Login"
              onClick={() => {
                setclicked(true);
                setTimeout(() => {
                  history.push("/Login");
                  setclicked(false);
                }, 1500);
              }}
            >
              Get Started
            </Buttons>
          )}
        </div>
      </Body>
    </IonPage>
  );
};

export default Welcome;
