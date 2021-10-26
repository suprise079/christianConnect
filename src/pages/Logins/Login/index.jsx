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
import { app, auth } from "../../../firebase/firebase";

import {
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

// react
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Context from "../../../context/Context";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../StylesForPages.css";
import bg from "./bg.png";
import { useLocation } from "react-router";
import { async } from "@firebase/util";
import { LoginUser } from "../../../firebase/firebase-help";

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
  button[type="submit"] {
    border: 2px solid #348d60 !important;
    border-radius: 5px;
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
  // Trackers
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // user details
  const { curUser, setCurUser, isLoggedIn, setIsLoggedIn } = useContext(Context);
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // use effect, run when pages loads
  useEffect(() => {
    // alert("login", location.state );
  }, [])

  // check if the user is logged in
  const handleChange = (e) => {
    const val = e.target;
    if (val.type === "email") {
      setEmail(val.value);
    } else if (val.type === "password" || val.type === "text") {
      setPassword(val.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        auth.onAuthStateChanged((user) => {
          if (user.email && user.uid ) {
            // pass user id from auth .. get user data from firestore ..
            LoginUser( user.uid ).then( data => {
              // console.log( data );
              // if data is true
              if( data ) {
                // updating user's data.. i couldnt find a place to store this, 
                // displayName, receives a string, i stringify users data from firebase
                // and update user profile with stringify that, needs JSON.parse
                // to get the user data.
                updateProfile( auth.currentUser, {
                  displayName: JSON.stringify(data)
                }).then( () => {
                  // profile updated and user data is added to firebase auth.
                  history.push("/userhome?user=" + data.id ); // route to user page
                }).catch( error => {
                  // an error occured....
                })
              }
              
            })
          }else{ history.push("/Login"); }
        });

        setEmail("");
        setPassword("");
        setLoading(false);
      })
      .catch((err) => {
        // error handling
        alert(err);
        setEmail("");
        setPassword("");
        setLoading(false);
      });

    // setLoading( false );
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

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

      <IonContent>
        <div id="logins">
          <form
            action="/"
            // /* method="post" */ onSubmit={(e) => handleSubmit(e)}
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
              value={password}
              onIonChange={(e) => {
                handleChange(e);
              }}
            />
            {/* <input type="submit" value={loading ? <span className="loader"></span> : "Login"} /> */}
            <button
              onClick={ e => handleSubmit(e) }
              type="submit">
              {loading ? (
                <span
                  style={{ borderColor: "#348d60" }}
                  className="loader"
                ></span>
              ) : (
                "Login"
              )}
            </button>
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
          <Link
            className="fromWelcome"
            to={{ pathname: location.state, state: location.state }}
          >
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
