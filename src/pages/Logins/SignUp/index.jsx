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
import { useState, useEffect, useContext } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {FiLoader} from "react-icons/fi"
import "../StylesForPages.css";

import Context from "../../../context/Context";
import { app } from "../../../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  button[type="submit"]{
    width:100px;
    padding: 10px 5px;
    border-radius: 5px;
    color: white;
    margin: 5% 0;
    font-size: 1.2em;
    box-shadow: 0 0 5px rgba(17, 17, 17, 0.249);
    background: #348d60;
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
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [pswdType, setpswdType] = useState("password");
  const [confpswd, setconfpswd] = useState("password");
  const [showConf, setshowConf] = useState(false);
  const history = useHistory(); // use for routing to other pages in code.
  const [loading, setLoading] = useState(false);

  // form details variables
  const [fsName, setFsName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

  const handleChange = (e) => {
    const val = e.target;
    if (val.type === "email") {
      setEmail(val.value);
    } else if (val.name === "password") {
      setPswd(val.value);
    } else if (val.name === "First name") {
      setFirstName(val.value);
    } else if (val.name === "Last name") {
      setLastName(val.value);
    } else if (val.name === "Phone number") {
      setPhoneNumber(val.value);
    } else if (val.name === "Confirm Password") {
      setConfirmPswd(val.value);
    } else if (val.name === "fsName") {
      setFsName(val.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(getAuth(), email, pswd)
      .then((result) => {
        console.log(result.user);
        setEmail("");
        setPswd("");
        setIsLoggedIn(true);
        setLoading(false);
        // add to firestore all other user details
      })
      .catch((err) => {
        // error handling
        alert(err);
        setEmail("");
        setPswd("");
        setIsLoggedIn(false);
        setLoading(false);
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name">Name of fellowship</label>
            <IonInput
              value={fsName}
              onIonChange={(e) => handleChange(e)}
              required
              name="fsName"
              clearInput="true"
              className="inputField"
            ></IonInput>

            <label htmlFor="First name">First name</label>
            <IonInput
              required
              name="First name"
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={firstName}
            ></IonInput>

            <label htmlFor="Last name">Last name</label>
            <IonInput
              required
              name="Last name"
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={lastName}
            ></IonInput>

            <label htmlFor="Phone number">Phone number</label>
            {/* will use regex validation to format to NUMBERS ONLY */}
            <IonInput
              required
              name="Phone number"
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={phoneNumber}
            ></IonInput>

            <label htmlFor="Email address">Email address</label>
            <IonInput
              required
              type="email"
              name="Email address"
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={email}
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
              name="password"
              type={pswdType}
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={pswd}
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
              name="Confirm Password"
              clearInput="true"
              className="inputField"
              onIonChange={(e) => handleChange(e)}
              value={confirmPswd}
            />

            <button type="submit">
              {loading ? <span className="loader"></span> : "Register"}
            </button>
          </form>

          <div style={{ marginTop: "10px" }} className="google-container">
            <span className="google-login-text">Register with </span>
            <button
              onClick={() => {
                console.log("hello");
              }}
            >
              <span className="google-icon">
                <FcGoogle size="20px" />
              </span>
              <span className="google-text">Google</span>
            </button>
          </div>
          <div className="haveAcc">
            Have an account ?
            <Link
              style={{
                color: "#348d60",
                textDecoration: "underline",
                margin: "10px",
              }}
              to={{ pathname: "/Login", state: "/SignUp" }}
            >
              Login
            </Link>
          </div>
        </div>
      </Content>
    </Body>
  );
};

export default SignUp;
