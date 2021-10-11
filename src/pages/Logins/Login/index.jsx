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

// firebase
import { app } from "../../../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// react
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../StylesForPages.css";
import bg from "./bg.png";
import { useLocation } from "react-router";

const InitFirebase = app;

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




const Login = () => {
  const location = useLocation();
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const history = useHistory();



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    
    history.push("/userhome"); // go to specified path..
  };  

  const LoginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(`results : ${token},${credential},${user}`);
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          `Errors : ${errorCode},${errorMessage},${email},${credential}`
        );
        // ...
      });
  };

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
          <label htmlFor="Password">
            Password
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

          <input type="submit" value="LOGIN" />
        </form>
      </div>




      <div className="google-container">
        <span className="google-login-text">Login with </span>
        <button onClick={LoginWithGoogle}>
          <span className="google-icon">
            <FcGoogle size="20px" />
          </span>
          <span className="google-text">Google</span>
        </button>
      </div>
      <div className="haveAcc">
        Don't have an account ?{" "}
        <Link to={"/SignUpU"}>
          Register
        </Link>
      </div>
      <div className="haveAcc">
        {/* set forgot password page */}
        <Link onClick={e=>alert("No Data")} to="/Login">Forgot password ?</Link>
      </div>
    </Body>
  );
};

export default Login;
