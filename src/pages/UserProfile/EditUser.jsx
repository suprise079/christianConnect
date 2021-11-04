import {
  IonPage, IonItem, IonTitle, IonLabel, IonCheckbox, IonButton, IonInput,
  IonDatetime, IonContent
} from '@ionic/react';

import { Camera, CameraResultType } from '@capacitor/camera';


// geta css files
import './profile.css';
import "./EditUser.css";


import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import profileImg from "./profile.jpeg";


// get db context
import Context from '../../context/Context';
import {
  deleteDocument, editUser, getUserImg, LoginUser, updateProfileImg
} from '../../firebase/firebase-help';
import Cookies from 'js-cookie';



// import firebase and its modules
import { auth } from '../../firebase/firebase';
import { takePicture } from '../../components/helpFunc';
import {
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";





const EditUser = () => {
  // for editing purposes
  const [user, setUser] = useState(
    JSON.parse(Cookies.get("userData")) ? JSON.parse(Cookies.get("userData")) : "")
  const { curUser, setCurUser, fellowship, setFellowship } = useContext(Context);
  const [userPhoto, setUserPhoto] = useState();
  const history = useHistory();
  const [fname, setFname] = useState(user?.firstname);
  const [lname, setLname] = useState(user?.lastname);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [image, setImage] = useState(user?.profilePic);
  // new leader and setting fellowship name
  // const [fsName, setFsName] = useState("");
  // const [wannaBeLeader, setWannaBeLeader] = useState(false); 


  useEffect(() => {

    if( curUser?.isLeader ) { // get fellowship data only if user is leader
      setFellowship( JSON.parse( Cookies.get("curLeaderFs")) );
    }

    setCurUser(JSON.parse(Cookies.get("userData")));

    // console.log( user )
    getUserImg(user?.userId).then(res => {
      if (res) { setUserPhoto(res) }
      else { setUserPhoto(false) }
    })
  }, [])


  const delUser = async () => {
    var isTrue = window.confirm("Continue To Delete Account..?");

    if (isTrue) {
      var userId = curUser?.userId;

      deleteDocument("Users", curUser.id).then(() => {
        // delete user from auth
        signInWithEmailAndPassword( auth, curUser?.email, curUser?.password )
        .then(( result ) => {
          auth.onAuthStateChanged( user => {
            // const user = auth.currentUser; // get the current user
            deleteUser(user).then(() => {
              // delete user profile pic
              if( phone && phone?.id ) {
                deleteDocument("userProfilePic", phone?.id )
              }
    
              // delete user delete user fellowship if user is leader
              if( fellowship && fellowship?.id ) {
                deleteDocument("Fellowships", fellowship?.id ).then(() => {
                  alert("Fellowship Deleted.....")
                })
              }
    
              // Cookies.remove("userData"); // delete user data from session cookie
              alert("User Account Deleted");
              history.push("/");
            }).catch(error => {
              console.error(error.code);
              alert( "AUTH DELETE USER:" + error.code);
            })
          })

        })
        
      })
    }
  }

  const EditUser = () => {

    if (fname && lname && phone) {

      if (image && image != null && image != undefined) {
        updateProfileImg(curUser?.userId, image);
      }

      var res = window.confirm("Continue..?");

      if (res) {
        editUser(fname, lname, phone, curUser.id).then(() => {

          LoginUser(curUser.userId)
            .then((data) => {

              if (data) {
                Cookies.remove("userData"); // remove current user data
                Cookies.set("userData", JSON.stringify(data));// set new user data from fb 
                setCurUser(JSON.parse(Cookies.get("userData"))); // set user in Context
                history.push(data?.isLeader ? "/leader" : "/profile") // redirect user to homepage
              }
            })
            .catch(err => {
              console.error(err.code);
            })
        })
      }

    }
    else { alert("Please Fill All fields....") }
  }

  const EditPhoto = (fileinput) => {
    if (fileinput && fileinput != null) {
      // console.log(fileinput)

      var data = new FileReader()
      // console.log( data )
      // data.onload = function(e) {
      //   console.log( "HERE", e.target.result);
      // };

      data.addEventListener("load", function (d) {
        // console.log("FILE READER", d.target.result)
        setImage(d.target.result)
      })
      data.readAsDataURL(fileinput);
    }
    else { console.error("READ IMG ERROR") }

    // takePicture().then( image => {
    //   console.log( image )
    // })
  }

  return (
    <IonPage>

      <IonContent >

        <div id="editUserAccount" >

          <div className="bgColor"></div>

          <div className="editProfileImg" >
            <img
              // onClick={ e=> EditPhoto() }
              src={userPhoto ? userPhoto.photo : ""}
              alt={"photo of " + curUser?.firstname + " " + curUser?.lastname} />
            <br />
            <label id="editPhotoBtn" htmlFor="selectImage">Select Image</label>
            <input
              style={{ display: "none" }}
              id="selectImage"
              onChange={e => EditPhoto(e.target.files[0])}
              placeholder="Select Image"
              type={{ backgroundColoe: "red" }} type="file" />
          </div>

          <div >
            { // display the session name, if user is a leader
              curUser?.isLeader ? (
                <IonTitle id="nameTitle" >
                  {fellowship?.name} </IonTitle>
              ) : ("")
            }
            <IonTitle id="nameTitle" > {curUser?.firstname} {curUser?.lastname} </IonTitle>
          </div>

          <div id="editUser_editButtons" lines="full" >
            <IonButton
              className="editbutton"
              onClick={e => delUser()}
              size="small"
              color="#348D63">Delete Account</IonButton>

            <IonButton
              className="editbutton"
              onClick={e => EditUser()}
              size="small"
              color="#348D63">Edit Profile</IonButton>
          </div>


          <div id="inputFields" >

            {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "80%",
              padding: "0",
            }}
            onClick={() => {
              setWannaBeLeader(!wannaBeLeader);
              setFsName("");
            }}
          >
            <IonCheckbox checked={wannaBeLeader} name="checkbox" />
            <IonLabel style={{ marginLeft: "20px" }} htmlFor="checkbox">
              Register as a leader
            </IonLabel>
          </div>

          <div >
            { wannaBeLeader ? (
              <>
                <IonInput
                  placeholder="Fellowship name"
                  autofocus
                  required
                  value={fsName}
                  onIonChange={(e) => setFsName( e.target.value )}
                  name="fsName"
                  clearInput="true"
                  className="inputField"
                ></IonInput>
              </>
            ) : (
              ""
            )}
          </div> */}

            <div className="edituserField" lines="full">
              <IonInput
                value={fname}
                placeholder="user firstname"
                className="field"
                placeholder="Firstname"
                onIonChange={e => setFname(e.detail.value)}
                clearInput />
            </div>

            <div className="edituserField" lines="full">
              <IonInput
                value={lname}
                className="field"
                placeholder="user lastname"
                placeholder="Lastname"
                onIonChange={e => setLname(e.detail.value)}
                clearInput />
            </div>

            <div className="edituserField" lines="full">
              <IonInput
                value={phone}
                className="field"
                placeholder="user phone number"
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

