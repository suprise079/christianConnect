import {
  //IonContent, IonHeader, IonTitle, IonToolbar,IonMenu,
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

// import ExploreContainer from '../components/ExploreContainer';
import "../Profile.css";
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
// import {
//   useLocation,
//    Link
// } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

import { useHistory, Link } from "react-router-dom";

// import images
import profileImg from "./profile.jpeg";
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

const User: React.FC = () => {
  const history = useHistory(); // use this for routing in js codes.

  return (
    <IonPage>
      <div className="bgColor">
        <IonCard className="nameCard">
          <IonAvatar className="avatar">
            <img src={profileImg} alt="" />
          </IonAvatar>

          <div className="details">
            <FaUserEdit
              onClick={(e) => history.push("/editprofile")}
              color="#000"
              size="20px"
            />

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
                // button
                // onClick={ e => history.push("/notes") }

                // routerLink={appPage.url}
                routerDirection="forward"
                lines="full"
                detail={false}
              >
                <Link to={appPage.url}>
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </Link>
              </IonItem>
            </IonMenuToggle>
          );
        })}
      </IonList>
    </IonPage>
  );
};

export default User;
