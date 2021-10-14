import { IonPage, IonItem, IonTitle, IonButton, IonInput, IonDatetime } from '@ionic/react';
import '../Profile.css';
import React, { useState } from 'react';

import profileImg from "./profile.jpeg";

const EditUser: React.FC = () => {
  const [text, setText] = useState<string>();

  return (
    <IonPage>

      <div className="bgColor"></div>

      <img className="editProfile" src={profileImg} alt="" />
      
      <IonTitle>Jane Doe</IonTitle>

      <IonItem className="editButtons" lines="full" >
        <IonButton
          className="editButton"
          size="small"
          color="#348D63">Delete Account</IonButton>

        <IonButton
          className="editButton"
          size="small"
          color="#348D63">Edit Pofile</IonButton>

      </IonItem>



      <IonItem className="userName" lines="full">
        <IonInput value={text} placeholder="Display Name" onIonChange={e => setText(e.detail.value!)} clearInput>

        </IonInput>

      </IonItem>
      <IonItem className="email" lines="full">
        <IonInput value={text} placeholder="E-mail" onIonChange={e => setText(e.detail.value!)} clearInput>

        </IonInput>
      </IonItem>
      <IonDatetime value="2019-10-01T15:43:40.394Z" display-timezone="utc">

      </IonDatetime>
      <IonItem className="about" lines="full">

      </IonItem>


    </IonPage>
  );
};

export default EditUser;

