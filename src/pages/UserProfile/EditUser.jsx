import {
  IonPage,
  IonItem,
  IonTitle,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonInput,
  IonDatetime,
  IonContent,
} from "@ionic/react";

import { Camera, CameraResultType } from "@capacitor/camera";

// geta css files
import "./profile.css";
import "./EditUser.css";

import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { reauthenticateWithCredential } from "firebase/auth";

import profileImg from "./profile.jpeg";

// get db context
import Context from "../../context/Context";
import {
  deleteDocument,
  editUser,
  getUserImg,
  LoginUser,
  updateProfileImg,
} from "../../firebase/firebase-help";
import Cookies from "js-cookie";

// import firebase and its modules
import { auth } from "../../firebase/firebase";
import { dummyPhoto, takePicture } from "../../components/helpFunc";
import {
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Session from "../../components/session";

const EditUser = () => {
  // for editing purposes
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
      ? JSON.parse(localStorage.getItem("currentUser"))
      : ""
  );
  const { curUser, setCurUser, fellowship, setFellowship } =
    useContext(Context);
  // const [userPhoto, setUserPhoto] = useState();
  const history = useHistory();
  const [firstName, setFirstName] = useState(Session.getFirstName());
  const [lastName, setLastName] = useState(Session.getLastName());
  const [phone, setPhone] = useState(Session.getPhone());
  const [image, setImage] = useState(Session.getPhoto());
  // new leader and setting fellowship name
  // const [fsName, setFsName] = useState("");
  // const [wannaBeLeader, setWannaBeLeader] = useState(false);

  useEffect(() => {
    if (Session.getIsLeader()) {
      // get fellowship data only if user is leader
      setFellowship(JSON.parse(localStorage.getItem("curLeaderFs")));
    }

    setCurUser(JSON.parse(localStorage.getItem("currentUser")));

    // console.log( user )
    getUserImg(Session.getUserId()).then((res) => {
      if (res) {
        Session.setUser(Session.getEmail());
      } else {
        alert("some thing went wrong setting user's photo");
      }
    });
  }, []);

  const promptForCredentials = async () => {
    const email = prompt("Please Enter your email :");
    const password = prompt("Please Enter your password");
    return { email, password };
  };

  const delUser = async () => {
    // get the current user
    const user = auth.currentUser;
    const credential = promptForCredentials();

    // reauthenticate them before deleting the account
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (window.confirm("Do you really want to delete your account ?")) {
          deleteUser(user)
            .then(() => {
              console.log("ACCOUNT DELETED !");
              Session.clearUser();
            })
            .catch((error) => {
              alert(error,
                " An error ocurred, Ensure your email and password are correct then try again !"
              );
            });
        }
      })
      .catch((error) => {
        alert(error,
          " An error ocurred, Ensure your email and password are correct then try again !"
        );
        // ...
      });
  };

  const EditUser = () => {
    if (firstName && lastName && phone) {
      if (image && image != null && image !== undefined) {
        updateProfileImg(Session.getUserId(), image);
      }

      var res = window.confirm("Continue...?");

      if (res) {
        editUser(firstName, lastName, phone, curUser.id).then(() => {
          LoginUser(curUser.userId)
            .then((data) => {
              if (data) {
                Cookies.remove("userData"); // remove current user data
                Cookies.set("userData", JSON.stringify(data)); // set new user data from fb
                setCurUser(JSON.parse(localStorage.getItem("currentUser"))); // set user in Context
                history.push(data?.isLeader ? "/leader" : "/profile"); // redirect user to homepage
              }
            })
            .catch((err) => {
              console.error(err.code);
            });
        });
      }
    } else {
      alert("Please Fill All fields....");
    }
  };

  const EditPhoto = (fileinput) => {
    if (fileinput && fileinput != null) {
      // console.log(fileinput)

      var data = new FileReader();
      // console.log( data )
      // data.onload = function(e) {
      //   console.log( "HERE", e.target.result);
      // };

      data.addEventListener("load", function (d) {
        // console.log("FILE READER", d.target.result)
        setImage(d.target.result);
      });
      data.readAsDataURL(fileinput);
    } else {
      console.error("READ IMG ERROR");
    }

    // takePicture().then( image => {
    //   console.log( image )
    // })
  };

  return (
    <IonPage>
      <IonContent>
        <div id="editUserAccount">
          <div className="bgColor"></div>

          <div className="editProfileImg">
            <img
              // onClick={ e=> EditPhoto() }
              src={Session.getPhoto()}
              alt="User"
            />
            <br />
            <label id="editPhotoBtn" htmlFor="selectImage">
              Select Image
            </label>
            <input
              // style={{ display: "none" }}
              id="selectImage"
              onChange={(e) => EditPhoto(e.target.files[0])}
              placeholder="Select Image"
              type="file"
            />
          </div>

          <div>
            {
              // display the session name, if user is a leader
              curUser?.isLeader ? (
                <IonTitle id="nameTitle">{fellowship?.name} </IonTitle>
              ) : (
                ""
              )
            }
            <IonTitle id="nameTitle">
              {" "}
              {curUser?.firstname} {curUser?.lastname}{" "}
            </IonTitle>
          </div>

          <div id="editUser_editButtons" lines="full">
            <IonButton
              className="editbutton"
              onClick={(e) => delUser()}
              size="small"
              color="#348D63"
            >
              Delete Account
            </IonButton>

            <IonButton
              className="editbutton"
              onClick={(e) => EditUser()}
              size="small"
              color="#348D63"
            >
              Edit Profile
            </IonButton>
          </div>

          <div id="inputFields">
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
                value={firstName}
                className="field"
                placeholder="First name"
                onIonChange={(e) => setFirstName(e.detail.value)}
                clearInput
              />
            </div>

            <div className="edituserField" lines="full">
              <IonInput
                value={lastName}
                className="field"
                placeholder="Last name"
                onIonChange={(e) => setLastName(e.detail.value)}
                clearInput
              />
            </div>

            <div className="edituserField" lines="full">
              <IonInput
                value={phone}
                className="field"
                placeholder="Phone number"
                onIonChange={(e) => setPhone(e.detail.value)}
                clearInput
              />
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
