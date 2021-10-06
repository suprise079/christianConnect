import { 
    //IonContent, IonHeader, IonTitle, IonToolbar,IonMenu,
    IonPage, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel, IonIcon,IonMenuToggle} from '@ionic/react';
  
  // import ExploreContainer from '../components/ExploreContainer';
  import './Profile.css';
  import { logOutSharp, logOutOutline, bookmarkSharp, bookmarkOutline, createSharp, createOutline, walletSharp, walletOutline, } from "ionicons/icons";
  // import {
  //   useLocation,
  //    Link 
  // } from "react-router-dom";
  import {FaUserEdit} from "react-icons/fa";
  
  
  // import images 
  import profileImg from "../../components/Images/profile.jpeg";
  // import Sermons from "../pages/extends/Sermons";
  // import Donate from "../pages/extends/Donate";
  // import Notes from "../pages/extends/Notes";
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  
  }
  
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
      url: "/Notes",
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
  
  const User: React.FC = () => {
    return (
      <IonPage>
        
  
        <div className="bgColor">
          <IonCard className="nameCard">
            <IonAvatar className="avatar">
              <img src={profileImg} alt="" />
            </IonAvatar>
  
            <div className="details">
            <FaUserEdit color="#000" size="20px"/>
              <IonCardTitle>Jane Doe</IonCardTitle>
              <IonCardSubtitle>janedoe@gmail.com</IonCardSubtitle>
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
  
  export default User;