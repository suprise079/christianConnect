import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
  IonContent,
  IonButton,
} from "@ionic/react";

import styled from "styled-components";

// firebase and db func
import { app, auth } from "../../../firebase/firebase";

import {
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// import js cookie for holding user data
import Cookies from "js-cookie";

// react
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Context from "../../../context/Context";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../StylesForPages.css";
import bg from "./bg.png";
import { useLocation } from "react-router";
import {
  getAllFellowships,
  getLeaderFs,
  LoginUser,
} from "../../../firebase/firebase-help";

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
    background-color: #fff;
  }

  #logins-cont {
    background-color: #fff;
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
  const { curUser, setCurUser, isLoggedIn, setIsLoggedIn, setFellowship } =
    useContext(Context);
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // variables for forgot password
  const [forgotPswdModal, setForgotPswdModal] = useState(false);
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage(
          <h4
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid lightgray",
              background: " #fff",
              padding: " 20px",
              borderRadius: "10px",
              margin: "20vh 10px 0 10px",
              boxShadow: " 0 0 10px #00000029",
            }}
          >
            <p style={{ textAlign: "center" }}>
              The email recovery link has been sent successfully, please check
              your emails and follow the instructions to reset your email.
            </p>
            <button
              style={{
                margin: "10px",
                background: "#348d60",
                padding: "5px",
                color: "white",
                borderRadius: "5px",
                width: "auto",
                boxShadow: "#0000004a 0px 6px 6px",
              }}
              onClick={() => {
                setForgotPswdModal(false);
              }}
            >
              Proceed to Login
            </button>
          </h4>
        );
      })
      .catch((err) => alert(err));
  };
  const [message, setMessage] = useState("");

  // use effect, run when pages loads
  useEffect(() => {
    // alert("login", location.state );

    // reset data in the cookie
    Cookies.remove("userData");
    Cookies.remove("allFellowships");
  }, []);

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
        // console.log( result )
        auth.onAuthStateChanged((user) => {
          if (user.email && user.uid) {
            // pass user id from auth .. get user data from firestore ..
            LoginUser(user.uid).then((data) => {
              // console.log( data );
              // if data is true
              if (data) {
                // use cookies js to set user's dats
                // console.log( data )
                // set user data to session cookies...
                Cookies.set("userData", JSON.stringify(data));

                // then get all fellowships from firebase and set them to
                // session cookie
                getAllFellowships().then((fellows) => {
                  // console.log( Object.assign({}, fellows ) )
                  var afs = JSON.stringify(fellows);
                  // var afs = JSON.stringify(  Object.assign({}, fellows ) );
                  // console.log( afs )
                  // set to cookies js session var
                  Cookies.set("allFellowships", afs);
                  // console.log( Cookies.get("AllFellowships") )

                  // get leader's fellowship data... run only user is leader
                  if (data.isLeader) {
                    // get user fellowship data. pass user auth id
                    getLeaderFs(data.userId).then((refDoc) => {
                      var fs = refDoc;
                      if (fs) {
                        // if user data is valid and available
                        // set data in global context
                        setFellowship(fs);
                        // console.log( fs );
                        // set current leader fs in session cookie
                        Cookies.set("curLeaderFs", JSON.stringify(fs));
                      }
                      console.log("here");
                      history.push("/userhome?user=" + data.userId); // route to user page
                    });
                  }

                  // console.log( data )
                  setEmail("");
                  setPassword("");
                  setLoading(false);
                  history.push("/userhome?user=" + data.userId); // route to user page
                });
              }
            });
          } else {
            history.push("/Login");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        // error handling
        if (err.code.includes("invalid-email")) {
          alert("Invalid User Email");
          setEmail("");
          setPassword("");
        } else if (err.code.includes("auth/user-not-found")) {
          alert("User Not Found.");
          setEmail("");
          setPassword("");
        } else if (err.code.includes("auth/wrong-password")) {
          alert("Wrong Password");
          setPassword("");
        } else if (err.code.includes("auth/network-request-failed")) {
          alert("Network Error, Please Check Your Network Connection");
          setPassword("");
        } else {
          alert(err);
          console.error(err);
          setEmail("");
          setPassword("");
        }
      });
    // console.log("HERE AND HERE")
    setLoading(false);
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

      <IonContent id="logins-cont">
        <div id="logins">
          <form
            action="/"
            // /* method="post" */ onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="Email address">Email</label>
            <IonInput
              id="email"
              required
              autofocus
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
                  <AiFillEyeInvisible size="20px" />
                ) : (
                  <AiFillEye size="20px" />
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
            <button onClick={(e) => handleSubmit(e)} type="submit">
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

        <div style={{ textAlign: "center" }} className="haveAcc">
          Don't have an account ?{" "}
          <Link
            className="fromWelcome"
            // to={{ pathname: location.state, state: location.state }}
            to={"/SignUp"}
          >
            Register
          </Link>
          {/* The line of code above uses a value from the welcome page to know what 
          type of user wanna register and determines the exact route accordingly */}
        </div>

        <div style={{ textAlign: "center" }}>
          {/* set forgot password page */}
          <span
            className="fromWelcome"
            onClick={() => {
              setForgotPswdModal(true);
              setMessage("");
            }}
            style={{ color: "#348d60" }}
          >
            Forgot password ?
          </span>
        </div>
      </IonContent>
      <IonModal className="forgotPasswordModal" isOpen={forgotPswdModal}>
        {message ? (
          message
        ) : (
          <form
            onSubmit={(e) => {
              handleForgotPassword(e);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid lightgray",
              background: " #fff",
              padding: " 20px",
              borderRadius: "10px",
              margin: "20vh 10px 0 10px",
              boxShadow: " 0 0 10px #00000029",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              {`You forgot your password? Don't worry, we got you ;)`}
            </h1>
            <IonInput
              style={{ border: "1px solid #348d60" }}
              placeholder="Please enter your email"
              id="ForgotEmail"
              required
              autofocus
              type="email"
              name="Email address"
              clearInput="true"
              className="inputField"
              value={email}
              onIonChange={(e) => {
                handleChange(e);
              }}
            />
            <div>
              <button
                style={{
                  margin: "10px",
                  color: "#348d60",
                  padding: "5px",
                  background: "white",
                  borderRadius: "5px",
                  width: "100px",
                  border: "1px solid #348d60",
                  boxShadow: "#0000004a 0px 6px 6px",
                }}
                id="forgotPswdButton"
                type="submit"
                onClick={() => {
                  setForgotPswdModal(false);
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  margin: "10px",
                  background: "#348d60",
                  padding: "5px",
                  color: "white",
                  borderRadius: "5px",
                  width: "100px",
                  boxShadow: "#0000004a 0px 6px 6px",
                }}
                id="forgotPswdButton"
                type="submit"
                // onClick={() => {

                // }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </IonModal>
    </Body>
  );
};

export default Login;
