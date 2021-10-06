import { IonButton, IonPage } from "@ionic/react";
import "../StylesForPages.css";
import logo from "./Logo_transp.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

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
`;
const Buttons = styled(IonButton)`
  height: 35px;
  border-radius: 10px;
  color: #348d63;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Welcome = () => {
  const [clicked, setclicked] = useState(false);
  const [uClicked, setuClicked] = useState(false)
  return (
    <Body>
      <img src={logo} alt="Logo" />
      <div className="Buttons">
        <Buttons>
          <Link
            className="welcomeLink"
            to={{ pathname: "/Login", state: "/SignUp" }}
            onClick={()=>setclicked(false)}
          >
            {clicked ? "Loading..." : "I am a fellowship leader"}
          </Link>
        </Buttons>
        <Buttons>
          <Link
            className="welcomeLink"
            to={{ pathname: "/Login", state: "/SignUpU" }}
          >
            {clicked ? "Loading..." : "I am just a fellowship member"}
          </Link>
        </Buttons>
      </div>
    </Body>
  );
};

export default Welcome;
