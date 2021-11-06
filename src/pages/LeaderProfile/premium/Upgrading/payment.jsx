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
  IonContent,
  IonCheckbox,
} from "@ionic/react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import "./payment.css";
import { ellipsisHorizontal } from "ionicons/icons";
import Cookies from 'js-cookie'
import Context from "../../../../context/Context";
import { LoginUser, upDownLeader } from "../../../../firebase/firebase-help";
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

const Payment = () => {
  const { curUser, setCurUser } = useContext( Context )
  const [text, settext] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const history = useHistory();
  const [isChecked, setIsChecked] = useState( curUser?.isPremiun );


  useEffect(() => {
    setCurUser( JSON.parse( Cookies.get("userData") ) )
  }, [])


  const upDownLeader_ = () => {
    upDownLeader( curUser?.id, isChecked );

    LoginUser( curUser.userId ).then( data => {
      var dd = data;
      if( dd ) {
        Cookies.set("userData", JSON.stringify( dd ));
        alert("Account Updated");
        history.push( curUser?.isLeader ? "/leader" : "/profile");
      }
      else {
        console.error("ERROR UPDATING LEADER")
      }
    })
  }

  return (
    <IonPage>
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/leader" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonTitle className="title">Change To Premium</IonTitle>
      </IonHeader>

      <IonContent >
        <div id="toPremiun" >
          <p >
            by clicking agree, you agree to the 
            terms and conditions of a permiun/normal leader user
          </p>

          <div >
            Premiun? <IonCheckbox checked={ isChecked } />
            <span onClick={ e=> setIsChecked( !isChecked ) } > Agree </span>
          </div>

          <div id="btn" >
            <button onClick={ e => upDownLeader_() } >
              Change Leader Type
            </button>
          </div>
        </div>
      </IonContent>
    
    </Body>
    </IonPage>
  );
};

export default Payment;






{/* <div id="main" className="main">
<p id="donateInfo">Payment page is still under constraction...</p>

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

</div> */}