import {
  IonContent,
  // IonHeader, IonTitle, IonToolbar,IonMenu,
  IonPage,
  IonCard,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
} from "@ionic/react";

// get css
// import "../Profile.css";
import "./Leader.css"

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

import { FaUserEdit, FaCrown } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import churchImg from "./church.jpeg";



// get context db
import Context from "../../context/Context";

// firebase imports
import { auth } from "../../firebase/firebase";
import Cookies from 'js-cookie';
import { getUserImg } from "../../firebase/firebase-help";


import React, { useContext, useEffect, useState } from "react";



var i = <FaCrown />;

const appPages = [
  {
    title: "Saved videos",
    url: "/SavedVideos",
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
    // iosIcon: createOutline,
    // mdIcon: createSharp,
    iosIcon: i.toString(),
    mdIcon: "",
  },
  {
    title: "Edit",
    url: "/editfs",
    // iosIcon: createOutline,
    // mdIcon: createSharp,
    iosIcon: i.toString(),
    mdIcon: "",
  },
  {
    title: "Upgrade To Premium",
    url: "/premium",
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

const Leader = () => {
  const { curUser, setCurUser, fellowship, setFellowship } = useContext( Context );
  const history = useHistory();
  const [ userPhoto, setUserPhoto ] = useState();
  const [ user, setUser ] = useState(
    JSON.parse(Cookies.get("userData") ? Cookies.get("userData") : "" ) )



  useEffect(() => {
    setFellowship( JSON.parse(Cookies.get("curLeaderFs")) );
    setCurUser( JSON.parse( Cookies.get("userData") ) );

    // console.log( user ) // get leader profile image
    getUserImg( user?.userId ).then( res => {
      if( res ) { setUserPhoto( res ); }
      else { setUserPhoto( false ) }
    })
  },[])



  const goToItem = (e) => {
    // console.log(e.target.id);
    // history.push( `${e.target.id}` );

    if (e.target.id === "/") {
      auth
        .signOut()
        .then((res) => {
          // Display a modal saying "User successfully signed out"
          /* setTimeout(() => {
              history.push(e.target.id);
            }, 3000); */
          // alert("Successfully signed Out ! ");
          history.push(e.target.id);
        })
        .catch((err) => alert(err));
    } else {
      history.push(e.target.id);
    }
  };



  return (
    <IonPage>
      <IonContent >
        <div id="leaderProfile" className="bgColor">
          <IonCard className="nameCard">
            
            <img // churchImg
              id="profileImg"
              src={ userPhoto ? userPhoto.photo : "" }
              alt={ "photo of " + curUser?.firstname } />

            <div className="details">
              <Link to="/editprofile">
                <FaUserEdit
                  color="#000"
                  size="20px"
                />
              </Link>

              {/* Fellowship Name */}
              <IonCardTitle> { fellowship?.name } </IonCardTitle>
              <IonCardSubtitle> { curUser?.email } </IonCardSubtitle>
            </div>

          </IonCard>
        </div>

        <IonList className="menu">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  // className={
                  //   location.pathname === appPage.url ? "selected" : ""
                  // }
                  id={ appPage.url }
                  button
                  onClick={(e) => goToItem( e )}
                  routerLink={appPage.url}
                  routerDirection="forward"
                  lines="full"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                    color="#000"
                  />
                  <IonLabel>{appPage.title} {" "}
                    { appPage.title === "Edit" ? fellowship?.name : "" }
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Leader;