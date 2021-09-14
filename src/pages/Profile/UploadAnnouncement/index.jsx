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
  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
  import "../styles.css";
  
  // const Body = styled(IonPage)`
  //   position: relative;
  //   justify-content: flex-start;
  //   width: 100%;
  //   height: 100%;
  
  //   background: white;
  //   box-sizing: border-box;
  //   z-index: -1;
  //   * {
  //     color: black;
  //   }
  //   }
  //   input[type="submit"] {
  //     width: 30vw;
  //     padding: 1% 5%;
  //     margin: 20px 5%;
  //     color: #348d63;
  //     background: transparent;
  //   }
  // `;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  const UploadAnnouncement = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [pswdType, setpswdType] = useState("password");
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar >
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Upload announcements</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <div id="UploadAnnouncements">
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
  
            <input type="submit" value="UploadAnnouncement" />
          </form>
        </div>
        <div className="haveAcc">
          Don't have an account ? <Link to="/home">Register</Link>
        </div>
        <div className="haveAcc">
          {/* set forgot password page */}
          <Link to="/home">Forgot password ?</Link>
        </div>
      </IonPage>
    );
  };
  
  export default UploadAnnouncement;
  