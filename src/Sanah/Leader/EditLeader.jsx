import { IonPage, IonItem, IonTitle, IonInput } from "@ionic/react";
import "../Profile.css";
import React, { useState } from "react";

import churchImg from "../../components/Images/church.jpeg";

const EditLeader = () => {
  const [text, setText] = useState();
  const [buttonHover,setButtonHover] = useState("#348D63")
  return (
    <IonPage>
      <div className="bgColor">
        <img className="editProfile" src={churchImg} alt="" />
        <IonTitle>Mpumelelo Fellowship</IonTitle>

        <IonItem lines="full">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <button className="btn"
            onMouseEnter={()=>{setButtonHover("#ff0000")}}
            onMouseLeave={()=>{setButtonHover("#348D63")}}
            
              style={{
                margin: "10px 15px",
                padding: "10px",
                borderRadius: "10px",
                background:buttonHover,
                color: "white",
                transition:".4s",
                boxShadow:"0 0 10px #ccc"
              }}
            >
              Delete Account
            </button>
            <button
              style={{
                margin: "10px 15px",
                padding: "10px",
                borderRadius: "10px",
                background:"#348D63",
                color: "white",
                boxShadow:"0 0 10px #ccc"
              }}
            >
              Save Changes
            </button>
          </div>
        </IonItem>

        <IonItem className="fellowName" lines="full">
          <IonInput
            value={text}
            placeholder="Display Name"
            onIonChange={(e) => setText(e.target.value)}
            clearInput
          ></IonInput>
        </IonItem>
        <IonItem className="email" lines="full">
          <IonInput
            value={text}
            placeholder="E-mail"
            onIonChange={(e) => setText(e.target.value)}
            clearInput
          ></IonInput>
        </IonItem>

        <IonItem className="about" lines="full">
          <IonInput
            value={text}
            placeholder="About"
            onIonChange={(e) => setText(e.target.value)}
            clearInput
          ></IonInput>
        </IonItem>
      </div>
    </IonPage>
  );
};

export default EditLeader;
