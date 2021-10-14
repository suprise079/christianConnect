import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonContent,
} from "@ionic/react";
import styled from "styled-components";

// firebase
import { app } from "../../../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// react
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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
    margin: 1.2% 5%;
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input[type="submit"] {
    width: 30vw;
    font-size: 1em;
    padding: 1% 5%;
    margin: 20px 5%;
    color: #348d63;
    border: 2px solid #348d60;
    box-shadow: none;
    background: transparent;
  }
  ion-header {
    background-color: #348d63;
    padding: 0;
    border-radius: 0em 0em 1.3em 1.3em;
    box-shadow: 0 0 10px #999;
  }
  ion-title {
    margin: 0;
    text-align: center;
    color: white;
  }
  ion-back-button {
    color: white;
    position: absolute;
  }
`;

const Login = () => {
  /* To know which type of user is logging in. (value either "/SignUp" for Leaders or ""/SignUpU"for normal users") */
  const location = useLocation();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");

  // user details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    const val = e.target;
    if (val.type === "email") {
      setEmail(val.value);
    } else if (val.type === "password" || val.type === "text") {
      setPassword(val.value);
    }
    // console.log();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`email:${email} \npswd:${password}`);
  };

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    /*
    REGISTER NEW USERS(TO GO IN signUp AND signUpU) USING 
    this f(x) needs to be imported first
    createUserWithEmailAndPassword(email,password)
      .then(cred => {userCred = cred.user})

    LOGOUT => import signOut from firebase/auth
    const handleSignOut = signOut().then(()=>{console.log("Logged Out !")})

    */

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(`results : ${token},${credential},${user}`);
        setIsLoggedIn(true);
        // console.log(user);
        // ...
      })
      .then(() => {
        console.log(`isLoggedIn:${isLoggedIn}`);
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

  useEffect(() => {
    console.log(`isLoggedIn from use effect:${isLoggedIn}`);
    if (isLoggedIn) {
      history.push("/userhome");
    }
  }, [isLoggedIn, history]);

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

      <IonContent>
        <div id="logins">
          <form
            action="/"
            /* method="post" */ onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="Email address">Email</label>
            <IonInput
              id="email"
              required
              type="email"
              name="Email address"
              clearInput="true"
              className="inputField"
              value={email}
              onIonChange={(e) => {
                handleChange(e);
              }}
            />
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
              value = {password}
              onIonChange = {(e)=>{handleChange(e)}}
            />
            <input type="submit" value="Login" />
          </form>
        </div>

        <div className="google-container">
          <span className="google-login-text">Login with </span>
          <button
            onClick={() => {
              loginWithGoogle();
            }}
          >
            <span className="google-icon">
              <FcGoogle size="20px" />
            </span>
            <span className="google-text">Google</span>
          </button>
        </div>

        <div className="haveAcc">
          Don't have an account ?{" "}
          <Link className="fromWelcome" to={location.state}>
            Register
          </Link>
          {/* The line of code above uses a value from the welcome page to know what 
          type of user wanna register and determines the exact route accordingly */}
        </div>

        <div className="haveAcc">
          {/* set forgot password page */}
          <Link
            className="fromWelcome"
            onClick={(e) => alert("No Data")}
            to="/Login"
          >
            Forgot password ?
          </Link>
        </div>
      </IonContent>
    </Body>
  );
};

export default Login;
