import { 
    //IonContent, IonHeader, IonTitle, IonToolbar,IonMenu,
    IonPage, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon,IonMenuToggle} from '@ionic/react';
  
  // import ExploreContainer from '../components/ExploreContainer';
  import '../Profile.css';
  import { logOutSharp, logOutOutline, documentTextOutline,documentTextSharp, createSharp, createOutline,videocamOutline,videocamSharp,calendarNumberOutline,calendarNumberSharp, } from "ionicons/icons";
  // import {
  //   useLocation,
  //    Link 
  // } from "react-router-dom";
  import {FaCrown} from "react-icons/fa";
  import {FaUserEdit} from "react-icons/fa";
  
  
  // import images 
  // import profileImg from "../components/Images/profile.jpeg";
  import churchImg from "../../components/Images/church.jpeg";
 
  
  
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    
  
  }
  
  const appPages: AppPage[] = [
    {
      title: "Upload Sermons",
      url: "/",
      iosIcon: videocamOutline,
      mdIcon: videocamSharp,
  
    },
    {
      title: "Post Announcements",
      url: "/Donate",
      iosIcon: documentTextOutline,
      mdIcon: documentTextSharp,
  
    },
    {
      title: "Upload Events",
      url: "/Notes",
      iosIcon: calendarNumberOutline,
      mdIcon: calendarNumberSharp,
    },
    {
      title: "Notes",
      url: "/UpgradeAccount",
      iosIcon: createOutline,
      mdIcon: createSharp,
    },
    {
      title: "Logout",
      url: "/Logout",
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
  
    },
  ];
  
  const Premium: React.FC = () => {
    return (
      <IonPage>
        
  
        <div className="bgColor">
          <IonCard className="nameCard">
            <IonAvatar className="avatar">
              <img src={churchImg} alt="" />
            </IonAvatar>
  
            <div className="details">
              <FaUserEdit color="#000" size="20px"/>
              <IonCardTitle><FaCrown color="#FFD700" />Mpumemelo Fellowship</IonCardTitle>
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
  
                routerLink="/Edit"
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
  
      </IonPage>
    );
  };
  
  export default Premium;