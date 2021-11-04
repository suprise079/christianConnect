import { 
    //IonContent, IonHeader, IonTitle, IonToolbar,IonMenu,
    IonPage, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon,IonMenuToggle, IonContent} from '@ionic/react';

// import ExploreContainer from '../components/ExploreContainer';
import "../LeaderProfile.css";
import { logOutSharp, logOutOutline, documentTextOutline,documentTextSharp, createSharp, createOutline,videocamOutline,videocamSharp,calendarNumberOutline,calendarNumberSharp, } from "ionicons/icons";
import {
  useLocation,
   Link 
} from "react-router-dom";
import {FaCrown} from "react-icons/fa";
import {FaUserEdit} from "react-icons/fa";

// import images 
// import profileImg from "../components/Images/profile.jpeg";
import churchImg from "../church.jpeg";

import { useHistory } from 'react-router';
import { auth } from "../../../firebase/firebase";


// import session managements and firebase functions
import Cookies from 'js-cookie'
import Context from '../../../context/Context';

import React, { useEffect, useContext } from 'react'


  
const appPages = [
  {
    title: "Upload Sermons",
    url: "/uploadSermon",
    iosIcon: videocamOutline,
    mdIcon: videocamSharp,

  },
  {
    title: "Post Announcements",
    url: "/uploadAnnouncement",
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp,

  },
  {
    title: "Upload Daily Devotion",
    url: "/uploadDevotions",
    iosIcon: calendarNumberOutline,
    mdIcon: calendarNumberSharp,
  },
  {
    title: "Post a discussion",
    url: "/notes",
    iosIcon: createOutline,
    mdIcon: createSharp,
  },
  {
    title: "Logout",
    url: "/Login",
    iosIcon: logOutOutline,
    mdIcon: logOutSharp,

  },
];



const Premium = () => {
  const { curUser, setCurUser, fellowship, setFellowship } = useContext( Context );
  const history = useHistory()

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
        .catch((err) => alert(err));
    } else {
      history.push(e.target.id);
    }
  };
  

  useEffect(() => {
    setFellowship( JSON.parse(Cookies.get("curLeaderFs")) );
    setCurUser( JSON.parse( Cookies.get("userData") ) );
  },[])



  return (
    <>
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
        </>
    // <IonPage>

    //   <IonContent >
    //     <div style={{textAlign:"center"}} className="bgColor">
    //       <IonCard className="nameCard">
    //         <IonAvatar className="avatar">
    //           <img src={churchImg} alt="" />
    //         </IonAvatar>

    //         <div className="details">
    //           <Link to="/editprofile" >
    //             <FaUserEdit color="#000" size="20px"/>
    //           </Link>

    //           <IonCardTitle><FaCrown color="#FFD700" /> { fellowship?.name } </IonCardTitle>
    //           <IonCardSubtitle> { curUser?.email } </IonCardSubtitle>
    //         </div>
    //       </IonCard>
    //     </div>


  
        

    //   </IonContent>

    // </IonPage>
  );
};

export default Premium;