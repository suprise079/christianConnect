import {
  IonToolbar,
  IonPage,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonIcon,
  IonImg,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
// import "../Profile.css";
import "./profile.css";
import {
  logOutSharp,
  logOutOutline,
  bookmarkSharp,
  bookmarkOutline,
  createSharp,
  createOutline,
  walletSharp,
  walletOutline,
} from "ionicons/icons";


// import from react modules
import React, { useContext, useEffect, useState } from "react";

import { FaUserEdit } from "react-icons/fa";

import TabBar from "../../components/tabBar/tabBar";

import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

// firebase for signOut
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import Context from "../../context/Context";
// get firebase functions
import {
  getUserImg
} from "../../firebase/firebase-help";
import Cookies from 'js-cookie';



var profileImg = "/assets/icon/prayer.jpeg";

const appPages = [
  {
    title: "Saved videos",
    url: "/savedVideos",
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkSharp,
  },
  {
    title: "Donate",
    url: "/Donate",
    iosIcon: walletOutline,
    mdIcon: walletSharp,
  },
  {
    title: "Notes",
    url: "/notes",
    iosIcon: createOutline,
    mdIcon: createSharp,
  },
  {
    title: "Logout",
    url: "/",
    iosIcon: logOutOutline,
    mdIcon: logOutSharp,
  },
];
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
  ion-header {
    background-color: #a3d7be;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
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
  div.body {
    overflow-y: scroll;
  }
  div.container {
    position: relative;
    height: 30vh;
    // border: 2px solid;
    display: flex;
    flex-direction: column;
  }
  div.headerTrail {
    height: 50%;
    background: linear-gradient(
      180deg,
      #a3d7be 35.42%,
      rgba(52, 141, 99, 0.76) 86.98%
    );
    border-radius: 0 0 20px 20px;
  }
  div.infos {
    position: absolute;
    top: 15%;
    left: 5%;
    width: 90%;
    background-color: white;
    height: 11em;
    padding: 0em 0em .5em 0em;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  div.content {
    height: 500px;
  }
  div.menu {
    margin-top: 40px;
    overflow-y: scroll;
  }
`;


const Profile = () => {
  const history = useHistory(); // use this for routing in js codes.
  const { curUser, setCurUser } = useContext( Context );
  const [ userPhoto, setUserPhoto ] = useState();
  const [ user, setUser ] = useState(
    JSON.parse(Cookies.get("userData") ? Cookies.get("userData") : "" ) ? JSON.parse(Cookies.get("userData")) : "" )




  useEffect(() => {
    // console.log( JSON.parse( Cookies.get("userData") ) );
    setCurUser( JSON.parse( Cookies.get("userData") ) );

    // console.log( user )
    getUserImg( user?.userId ).then( res => {
      if( res ) { setUserPhoto( res ); }
      else { setUserPhoto( false ) }
    })
  },[])



  const goToItem = (e) => {
    // console.log(e.target.id);
    // history.push( `${e.target.id}` );

    if (e.target.id === "/") {
      auth.signOut()
        .then((res) => {
          // Display a modal saying "User successfully signed out"
          /* setTimeout(() => {
              history.push(e.target.id);
            }, 3000); */
          alert("Successfully signed Out ! ");
          history.push(e.target.id);
        })
        .catch((err) => history.push('/'));
    } else {
      history.push(e.target.id);
    }
  };


  return (
    <IonPage id="userProfile" >

      <Body>
        <IonHeader color="white" className="ion-no-border">
          <IonToolbar color="white">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Profile User</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div id="profileContent" className="body">

          <div className="container">
            <div className="headerTrail"></div>

            <div className="infos">
              <div className="profile" >
                <img
                  src={ userPhoto ? userPhoto?.photo : profileImg }
                  alt={"photo of " + curUser?.firstname }  />
              </div>
              
            

              <div id="details">
                <Link to="/editprofile" >
                  <FaUserEdit
                    className="editButton"
                    // onClick={(e) => history.push("/editprofile")}
                    size="25px"/>
                </Link>
               
                <IonCardTitle style={{textTransform:"capitalize"}} >
                  { curUser?.firstname } { curUser?.lastname } </IonCardTitle>
                <IonCardSubtitle> { curUser?.email } </IonCardSubtitle>
              </div>
            </div>

          </div>
          
          <div className="content">
            <div id="profile_items" className="menu">
              {appPages.map((appPage, index) => (
                <Link
                  key={index}
                  id={appPage.url}
                  onClick={(e) => goToItem(e)}
                  className="item"
                  to={ appPage?.url }
                >
                  <IonIcon
                    className="icon"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </Link>
                )
              )}
            </div>
          </div>

        </div>

        {/* tabbar for navigating user pages */}
        <TabBar />

      </Body>

    </IonPage>

  );
};

export default Profile;
