import { IonPage, IonItem, IonTitle, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react';

// geta css files
import '../Profile.css';
import "./EditUser.css";


import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import profileImg from "./profile.jpeg";


// get db context
import Context from '../../context/Context';
import { editUser, LoginUser } from '../../firebase/firebase-help';


// import firebase and its modules
import { auth } from '../../firebase/firebase';
import {
  updateProfile,
} from "firebase/auth";




const EditUser = () => {
  const { curUser, setCurUser } = useContext( Context )
  const history = useHistory();
  const [fname, setFname] = useState( curUser.firstname );
  const [lname, setLname] = useState( curUser.lastname );
  const [phone, setPhone] = useState( curUser.phoneNumber );


  const delUser = () => {
    var isTrue = window.confirm("Continue To Delete Account..?");

    if( isTrue ) {
      alert("Will Delete Soon")
    }
  }

  const EditUser = () => {

    if( fname && lname && phone ) {
      var res = window.confirm("Continue, You'll Be Logged Out?");

      if( res ) { 
        editUser( fname, lname, phone, curUser.id ).then(() => {
        
          LoginUser( curUser.userId )
          .then(( data ) => {
  
            if( data ) {
              // BEST OPTION IS TO LOG OUT THE USER
              history.push( "/" )
  
              // console.log("IN THE AUTH FUNC")
              // updating user's data.. i couldnt find a place to store this, 
              // displayName, receives a string, i stringify users data from firebase
              // and update user profile with stringify that, needs JSON.parse
              // to get the user data.
              // console.log( auth.currentUser.providerData[0])
              // updateProfile( auth.currentUser, {
              //   displayName: JSON.stringify(data)
              // }).then( () => {
              //   console.log("WHEN AUTH IS DONE")
              //   // profile updated and user data is added to firebase auth.
              //   console.log("ROUTING TO:", data.isLeader)
              //   history.push( data.isLeader ? "/leader" : "/profile" ); // route to user page
  
              // }).catch( error => {
              //   // an error occured....
              //   console.error("Error:", error.code ) 
              // })
  
            }
  
          })
          .catch( err => {
            console.error( err.code );
          })
        })
      }
     
    }
    else {
      alert("Please Fill All fields....")
    }
  }


  return (
    <IonPage>

      <IonContent >
      
      <div id="editUserAccount" >

        <div className="bgColor"></div>

        <div className="editProfileImg" >
          <img
            src={ profileImg }
            alt={ "photo of " + curUser.firstname + " " + curUser.lastname } />
        </div>

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



        <div id="inputFields" >

          <div className="edituserField" lines="full">
            <IonInput
              value={ fname }
              className="field"
              placeholder="Firstname"
              onIonChange={e => setFname(e.detail.value)}
              clearInput />
          </div>

          <div className="edituserField" lines="full">
            <IonInput
              value={ lname }
              className="field"
              placeholder="Lastname"
              onIonChange={e => setLname(e.detail.value)}
              clearInput />
          </div>

          <div className="edituserField" lines="full">
            <IonInput
              value={ phone }
              className="field"
              placeholder="Phone number"
              onIonChange={e => setPhone(e.detail.value)}
              clearInput />
          </div>

          {/* <div className="edituserField" lines="full">
            <IonInput
              className="field"
              placeholder="E-mail"
              onIonChange={e => setText(e.detail.value)}
              clearInput />
          </div> */}

          {/* <div className="edituserBtn" lines="full">
            <IonButton
              className="editbutton"
              onClick={ e => EditUser() }
              size="small"
              color="#348D63">Edit Profile</IonButton>
          </div> */}
        </div>

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

