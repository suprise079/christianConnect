import { 
    //IonContent, IonHeader, IonTitle, IonToolbar,IonMenu,
    IonPage, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon,IonMenuToggle, IonContent} from '@ionic/react';

// import ExploreContainer from '../components/ExploreContainer';
import '../Profile.css';
import { logOutSharp, logOutOutline, documentTextOutline,documentTextSharp, createSharp, createOutline,videocamOutline,videocamSharp,calendarNumberOutline,calendarNumberSharp, } from "ionicons/icons";
import {
  useLocation,
   Link 
} from "react-router-dom";
import {FaCrown} from "react-icons/fa";
import {FaUserEdit} from "react-icons/fa";

// import images 
// import profileImg from "../components/Images/profile.jpeg";
import churchImg from "./church.jpeg";


// import session managements and firebase functions
import Cookies from 'js-cookie'
import Context from '../../context/Context';

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
    title: "Upload Events",
    url: "/uploadEvent",
    iosIcon: calendarNumberOutline,
    mdIcon: calendarNumberSharp,
  },
  {
    title: "Notes",
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
  

  useEffect(() => {
    setFellowship( JSON.parse(Cookies.get("curLeaderFs")) );
    setCurUser( JSON.parse( Cookies.get("userData") ) );
  },[])



  return (
    <IonPage>

      <IonContent >
        <div style={{textAlign:"center"}} className="bgColor">
          <IonCard className="nameCard">
            <IonAvatar className="avatar">
              <img src={churchImg} alt="" />
            </IonAvatar>

            <div className="details">
              <Link to="/editprofile" >
                <FaUserEdit color="#000" size="20px"/>
              </Link>

              <IonCardTitle><FaCrown color="#FFD700" /> { fellowship?.name } </IonCardTitle>
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
                button onClick={() => { }}

                routerLink={ appPage.url }
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
                <IonLabel>{appPage.title}</IonLabel>

              </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>

      </IonContent>

    </IonPage>
  );
};

export default Premium;