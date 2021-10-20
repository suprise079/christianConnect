import {
  IonToolbar,
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
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
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

import TabBar from "../../components/tabBar/tabBar";

import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
// import images
import profileImg from "./profile.jpeg";
// import Sermons from "../pages/extends/Sermons";
// import Donate from "../pages/extends/Donate";
// import Notes from "../pages/extends/Notes";

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
    url: "/Login",
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
    background: white;
    height: 30vh;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  div.profile {
    position: relative;
    top: -10%;
    left: 35%;
    width: 30%;
    height: 50%;
    background-image: url(${"/assets/icon/prayer.jpeg"});
    background-size: cover;
    // border: 2px solid;
    border-radius: 100%;
    box-shadow: 0px 2px 7px 2px rgb(0 0 0 / 14%);
  }
  div.content {
    height: 500px;
  }
  div.menu {
    margin-top: 40px;
    overflow-y: scroll;
  }
  div.item {
    box-shadow: 0px 1px 0px 1px rgb(0 0 0 / 10%);
    display: flex;
    align-items: center;
    background: white;
    padding: 15px 10px;
    margin: 5px 5px;
    border-radius: 5px;
  }
  .icon {
    font-size: 1.5em;
    padding: 0 10px;
  }
`;
const Profile = () => {
  const history = useHistory(); // use this for routing in js codes.

  const goToItem = (e) => {
    console.log(e.target.id);
    history.push( `${e.target.id}` );
  };
  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="body">
        <div className="container">
          <div className="headerTrail"></div>
          <div className="infos">
            <div className="profile"></div>
            <div className="details">
              <FaUserEdit
                onClick={(e) => history.push("/editprofile")}
                color="#000"
                size="20px"
              />

              <IonCardTitle>Jane Doe</IonCardTitle>
              <IonCardSubtitle>janedoe@gmail.com</IonCardSubtitle>
            </div>
          </div>
        </div>
        
        <div className="content">
          <div className="menu">
            {appPages.map((appPage, index) => (
                <div
                  id={appPage.url}
                  onClick={(e) => goToItem(e)}
                  className="item"
                >
                  <IonIcon
                    className="icon"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <TabBar />
    </Body>
  );
};

export default Profile;
