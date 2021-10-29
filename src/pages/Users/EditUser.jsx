import { IonPage, IonItem, IonTitle, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react';

// geta css files
import '../Profile.css';
import "./EditUser.css";


import React, { useContext, useState } from 'react';

import profileImg from "./profile.jpeg";


// get db context
import Context from '../../context/Context';


// import firebase and its modules



const EditUser = () => {
  const { curUser, setCurUser } = useContext( Context )
  const [text, setText] = useState();


  const delUser = () => {
    alert("Code Coming Soon....")
  }

  const EditUser = () => {
    alert("Code Coming Soon....")
  }


  return (
    <IonPage>

      <IonContent >
      
      <div id="editUserAccount" >

        <div className="bgColor"></div>

        <img className="editProfile" src={profileImg} alt="" />

        <IonTitle id="nameTitle" > { curUser?.firstname } { curUser?.lastname } </IonTitle>

        <div id="editUser_editButtons" lines="full" >
          <IonButton
            className="editbutton"
            onClick={ e => delUser() }
            size="small"
            color="#348D63">Delete Account</IonButton>

          <IonButton
            className="editbutton"
            onClick={ e => EditUser() }
            size="small"
            color="#348D63">Edit Profile</IonButton>
        </div>



        <IonItem className="userName" lines="full">
          <IonInput value={ "" } placeholder="Display Name" onIonChange={e => setText(e.detail.value)} clearInput />
        </IonItem>

        <IonItem className="email" lines="full">
          <IonInput value={text} placeholder="E-mail" onIonChange={e => setText(e.detail.value)} clearInput />
        </IonItem>

        <IonItem className="email" lines="full">
          <IonInput value={text} placeholder="E-mail" onIonChange={e => setText(e.detail.value)} clearInput />
        </IonItem>

        <IonItem className="email" lines="full">
          <IonInput value={text} placeholder="E-mail" onIonChange={e => setText(e.detail.value)} clearInput />
        </IonItem>


        {/* <IonDatetime value="2019-10-01T15:43:40.394Z" display-timezone="utc"> */}
        {/* </IonDatetime> */}

        {/* <IonItem className="about" lines="full"> */}
        {/* </IonItem> */}
      </div>
      


      </IonContent>
    </IonPage>
  );
};

export default EditUser;

