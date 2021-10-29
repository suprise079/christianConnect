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
import "../Profile.css";
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
import { useContext, useEffect } from "react";



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
  const { curUser, setCurUser, fellowship } = useContext( Context );
  const history = useHistory();


  // useEffect(() => {
    
  // }, [])


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
            <IonAvatar className="avatar">
              <img src={churchImg} alt="" />
            </IonAvatar>

            <div className="details">
              <Link to="/editleader">
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
                  <IonLabel>{appPage.title}</IonLabel>
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