import { IonPage, IonItem, IonTitle, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react';

// geta css files
import '../Profile.css';
import "./EditUser.css";


import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import profileImg from "./profile.jpeg";


// get db context
import Context from '../../context/Context';
import { deleteDocument, editUser, LoginUser
} from '../../firebase/firebase-help';
import Cookies from 'js-cookie';


// import firebase and its modules
import { auth } from '../../firebase/firebase';
import {
  updateProfile, deleteUser
} from "firebase/auth";




const EditUser = () => {
  // for editing purposes
  const [ user, setUser ] = useState(
    JSON.parse(Cookies.get("userData")) ? JSON.parse(Cookies.get("userData")) : "" )
  const { curUser, setCurUser } = useContext( Context )
  const history = useHistory();
  const [fname, setFname] = useState( user?.firstname );
  const [lname, setLname] = useState( user?.lastname );
  const [phone, setPhone] = useState( user?.phoneNumber );

  useEffect(() => {
    // console.log( JSON.parse( Cookies.get("userData")) )
    setCurUser( JSON.parse( Cookies.get("userData")) )
  }, [])


  const delUser = () => {
    var isTrue = window.confirm("Continue To Delete Account..?");

    if( isTrue ) {
      deleteDocument("Users", curUser.id ).then(() => {
        const user = auth.currentUser; // get the current user
        // delete user from auth
        deleteUser( user ).then(() => {
          // Cookies.remove("userData"); // delete user data from session cookie
          alert("User Account Deleted");
          history.push("/");
        }).catch( error => {
          console.error( error.code );
          alert( error.code );
        })
      })
    }
  }

  const EditUser = () => {

    if( fname && lname && phone ) {
      var res = window.confirm("Continue..?");

      if( res ) { 
        editUser( fname, lname, phone, curUser.id ).then(() => {
        
          LoginUser( curUser.userId )
          .then(( data ) => {
  
            if( data ) {
              Cookies.remove("userData"); // remove current user data
              Cookies.set("userData", JSON.stringify( data ) ); // set new user data from fb 
              setCurUser( JSON.parse( Cookies.get("userData")) ); // set user in Context
              history.push( data?.isLeader ? "/leader" : "/profile" ) // redirect user to homepage
            }
  
          })
          .catch( err => {
            console.error( err.code );
          })
        })
      }
     
    }
    else { alert("Please Fill All fields....") }
  }


  return (
    <IonPage>

      <IonContent >
      
      <div id="editUserAccount" >

        <div className="bgColor"></div>

        <div className="editProfileImg" >
          <img
            src={ profileImg }
            alt={ "photo of " + curUser?.firstname + " " + curUser?.lastname } />
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

