import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import "./Donate.css";
import { ellipsisHorizontal } from "ionicons/icons";
//   import bg from "./bg.png";



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
    // background-image: url("${""}");
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
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input[type="submit"] {
    width: 30vw;
    padding: 1% 5%;
    margin: 20px 5%;
    color: #348d63;
    background: transparent;
  }
`;


const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target);
};

const Donate = () => {
  const [text, settext] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const history = useHistory();

  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonTitle className="title">Donate</IonTitle>
      </IonHeader>

      <div id="main" className="main">
        <p id="donateInfo">Donate To The Christian Connect Development Team</p>

        <div id="paymentType">
          <label>Payment type</label>
          <p>
            Card
            <input value ="Card" name="payment" type="radio" />
            EFT
            <input value ="EFT" name="payment" type="radio" />
          </p>
        </div>

        <div id="donateaAmount">
          <label> Amount </label>
          <p>
            <label>R</label> <input size="7" type="number" />
          </p>
        </div>

        <div id="donateMessage">
          <p> Message </p>

          <IonTextarea
            rows="7"
            placeholder="Description..."
            className="textArea"
            value={text}
            onIonChange={(e) => settext(e.target.value)}
          ></IonTextarea>
        </div>

        <div id="donateUnonymous">
          <i>Donate Unonymous</i>
          <input type="radio" />
        </div>

        <div id="donateBtn" >
          <button 
          // onClick={ e=> history.push("/donations") }
          >
            <Link to="/donations" > 
            Donate </Link >
          </button>
        </div>

      </div>
    </Body>
  );
};

export default Donate;

// <div id="logins">
//         <form
//         action="/"
//         onSubmit={(e) => {
//             handleSubmit(e);
//         }}
//         >
//         <label htmlFor="Email address">Email</label>
//         <IonInput
//             required
//             type="email"
//             name="Email address"
//             clearInput="true"
//             className="inputField"
//         ></IonInput>
//         <label htmlFor="Password">
//             Password
//             <span
//             onClick={() => {
//                 setshowPassword(showPassword ? false : true);
//                 setpswdType(showPassword ? "password" : "text");
//             }}
//             >
//             {showPassword ? (
//                 <AiFillEyeInvisible size="23px" />
//             ) : (
//                 <AiFillEye size="23px" />
//             )}
//             </span>
//         </label>
//         <IonInput
//             required
//             type={pswdType}
//             clearInput="true"
//             className="inputField"
//         ></IonInput>

//         <input type="submit" value="Login" />
//         </form>
//     </div>
//     <div className="haveAcc">
//         Don't have an account ? <Link to="/home">Register</Link>
//     </div>
//     <div className="haveAcc">
//         <Link to="/home">Forgot password ?</Link>
//     </div>
