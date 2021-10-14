import { 
    IonContent,
    // IonHeader, IonTitle, IonToolbar,IonMenu,
    IonPage, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon,IonMenuToggle} from '@ionic/react';
  
// import ExploreContainer from '../components/ExploreContainer';
import '../Profile.css';
import { logOutSharp, logOutOutline, bookmarkSharp, bookmarkOutline, createSharp, createOutline, walletSharp, walletOutline, } from "ionicons/icons";

import {FaUserEdit,FaCrown } from "react-icons/fa";
import { Link } from 'react-router-dom';

import churchImg from "./church.jpeg";


  
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

var i = <FaCrown />

const appPages: AppPage[] = [
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
    mdIcon: ""
  },
  {
    title: "Upgrade To Premiun",
    url: "/premiun",
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

const Leader: React.FC = () => {
  return (
    <IonPage>
      
      <IonContent >
        <div className="bgColor">
          <IonCard className="nameCard">
            <IonAvatar className="avatar">
              <img src={churchImg} alt="" />
            </IonAvatar>

            <div className="details">

              <Link to="/editleader" >
                <FaUserEdit
                  // onClick={e=> }
                  color="#000" size="20px"/>

              </Link>
              
              <IonCardTitle>Mpumemelo Fellowship </IonCardTitle>
              <IonCardSubtitle>mpumelelofellowship@gmail.com</IonCardSubtitle>
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

export default Leader;