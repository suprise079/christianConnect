import {
  IonToolbar,
  IonPage,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonIcon,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
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


// import from react modules
import { useEffect, useState } from "react";

import { FaUserEdit } from "react-icons/fa";

import TabBar from "../../components/tabBar/tabBar";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

// firebase for signOut
import { auth } from "../../firebase/firebase";
import { signOut } from "@firebase/auth";



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
  const [ user, setUser ] = useState();



  useEffect(() => {
    // get the value of auth.current user that keeps user's data.
    var d = auth.currentUser?.providerData[0].displayName;
    console.log( d ); // for debuggin purposes
    setUser( JSON.parse( d ) ) // set user for this page
  },[])



  const goToItem = (e) => {
    console.log(e.target.id);

    history.push( `${e.target.id}` );

    if (e.target.id === "/") {
      auth
        .signOut()
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

  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Profile User</IonTitle>
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

              <IonCardTitle>{ user.firstname } {" "} {user.lastname } </IonCardTitle>
              <IonCardSubtitle>
                { user.email }
              </IonCardSubtitle>
            </div>
          </div>
        </div>
        
        <div className="content">
          <div className="menu">
            {appPages.map((appPage, index) => (
                <div
                  key={index}
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

      {/* tabbar for navigating user pages */}
      <TabBar />

    </Body>
  );
};

export default Profile;
