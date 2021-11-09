import {
  IonToolbar,
  IonPage,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonIcon,
  IonImg,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonTextarea,
  IonModal,
  useIonToast,
} from "@ionic/react";
// import "../Profile.css";
import "./profile.css";
import {
  logOutSharp,
  logOutOutline,
  bookmarkSharp,
  bookmarkOutline,
  createSharp,
  createOutline,
  walletSharp,
  walletOutline,
  documentTextOutline,
  documentTextSharp,
  videocamOutline,
  videocamSharp,
  calendarNumberOutline,
  calendarNumberSharp,
} from "ionicons/icons";

import { GiUpgrade } from "react-icons/gi";

// import from react modules
import React, { useContext, useEffect, useState } from "react";

import { FaUserEdit, FaEdit, FaCrown } from "react-icons/fa";

import TabBar from "../../components/tabBar/tabBar";

import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

// firebase for signOut
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import Context from "../../context/Context";

// get firebase functions
import { getUserImg } from "../../firebase/firebase-help";
import Cookies from "js-cookie";
// default profile image
import dummyPicture from "./dummy_profile.jpg";
import Premium from "./premium/Premium";
import Session from "../../components/session";
import About from "../About/About";
import { FcAbout } from "react-icons/fc";
import SavedVideos from "../UserProfile/savedVideos/savedVideos";
import Donate from "../UserProfile/Donate";
import UploadAnnouncement from "./premium/UploadAnnouncement";
import UploadSermon from "./premium/UploadSermons";
import UploadDevotions from "./premium/UploadDevotion";
import Post from "../subscription/discussions/addPost";
import Notes from "../notes/Notes";

var profileImg = "/assets/icon/prayer.jpeg";

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
    background-color: white;
    height: 11em;
    padding: 0em 0em 0.5em 0em;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  div.content {
    height: 500px;
  }
  div.menu {
    margin-top: 40px;
    overflow-y: scroll;
  }
`;

const Leader = () => {
  // Donate variables
  const [donateModal, setDonateModal] = useState(false);
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(0)
  

  const [present, dismiss] = useIonToast();

  // modal variables
  const [aboutModal, setAboutModal] = useState(false);

  // context and global variables....
  const { fellowship, setFellowship } = useContext(Context);
  const history = useHistory(); // use this for routing in js codes.
  const [userPhoto, setUserPhoto] = useState();
  // state to switch between premium features and leader account
  const [page, setPage] = useState(true);
  const [Pages, setPages] = useState();

  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("currentUser")
        ? localStorage.getItem("currentUser")
        : ""
    )
  );

  // pages
  const appPages = [
    {
      title: "Saved videos",
      url: "/savedVideos",
      iosIcon: bookmarkOutline,
      mdIcon: bookmarkSharp,
      p: false,
    },
    {
      title: "Donate",
      url: "/Donate",
      iosIcon: walletOutline,
      mdIcon: walletSharp,
    },
    {
      title: "Upload Sermons",
      url: "/uploadSermon",
      iosIcon: videocamOutline,
      mdIcon: videocamSharp,
      p: true,
    },
    {
      title: "Post Announcements",
      url: "/uploadAnnouncement",
      iosIcon: documentTextOutline,
      mdIcon: documentTextSharp,
      p: true,
    },
    {
      title: "Upload Daily Devotion",
      url: "/uploadDevotions",
      iosIcon: calendarNumberOutline,
      mdIcon: calendarNumberSharp,
      p: true,
    },
    {
      title: "Post a discussion",
      url: "/notes",
      iosIcon: createOutline,
      mdIcon: createSharp,
      p: true,
    },
    {
      title: "Notes",
      url: "/notes",
      iosIcon: createOutline,
      mdIcon: createSharp,
      p: false,
    },
    {
      title: "Edit",
      url: "/editfs",
      // iosIcon: createOutline,
      mdIcon: createSharp,
      // iosIcon: i.toString(),
    },
    {
      title: "Up/Down Grade Premium",
      url: "/ispremium",
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

  useEffect(() => {
    setPages([]);
    // console.log( JSON.parse( Cookies.get("userData") ) );
    setFellowship(JSON.parse(localStorage.getItem("curLeaderFs")));
    if (Session.getIsPremium()) {
      setPages(appPages);
    } else {
      // only pages of normal user
      console.log(Session.getIsPremium());
      setPages(
        appPages.filter(
          (app) =>
            ![
              "Post a discussion",
              "Upload Daily Devotion",
              "Upload Sermons",
              "Post Announcements",
            ].includes(app.title)
        )
      );
    }

    // console.log( user )
    getUserImg(user?.userId).then((res) => {
      // added this empty to make the dummy picture show because i dont understand the code
      if (res) {
        setUserPhoto(res);
      } else {
        setUserPhoto(false);
      }
    });
  }, []);

  function openModal(number) {
    setModal(true)
    setModalContent(number)
  }

  function closeModal(){
    setModal(false)
    setModalContent(0)
  }

  const goToItem = (e) => {
    if (e.target.id === "/") {
    } else {
      history.push(e.target.id);
    }
  };

  return (
    <IonPage id="userProfile">
      <Body>
        <IonHeader color="white" className="ion-no-border">
          <IonToolbar color="white">
            <IonTitle>Leader Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div id="profileContent" className="body">
          <div className="container">
            <div className="headerTrail"></div>

            <div className="infos">
              <div className="userProfile">
                {userPhoto ? (
                  <img src={userPhoto?.photo} alt="profile" />
                ) : (
                  <img src={dummyPicture} alt="No Profile set" />
                )}
              </div>

              <div id="details">
                <Link to="/editprofile">
                  <FaUserEdit
                    className="editButton"
                    onClick={(e) => history.push("/editprofile")}
                    size="25px"
                  />
                </Link>

                <IonCardTitle style={{ textTransform: "capitalize" }}>
                  {Session.getIsPremium() ? (
                    <FaCrown id="crown" color="red" size="25px" />
                  ) : (
                    ""
                  )}{" "}
                  {Session.getFirstName()} {Session.getLastName()}
                </IonCardTitle>

                <IonCardSubtitle> {Session.getEmail()} </IonCardSubtitle>
              </div>
            </div>
          </div>
          {/* {
            user.isPremium && (
              <div className="pageSwitch">
                <button onClick={() => setPage(true)}>Manage profile</button>
                <button onClick={() => setPage(false)}>premium features</button>
              </div>
            )
          } */}
          <div className="content">
            <div id="profile_items" className="menu">
              {page &&
                Pages?.map((appPage, index) => {
                  return appPage.url != "/" ? (
                    <div key={index} id={appPage.url} onClick={(e) => openModal(index+1)} className="item" style={{ display: !appPage ? "none" : "" }}>
                      <IonIcon className="icon" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </div>
                  ) : appPage.url === "/" ? (
                    <div
                      key={index}
                      id={appPage.url}
                      onClick={(e) =>
                        present({
                          translucent: true,
                          position: "top",
                          buttons: [
                            {
                              text: "Yes",
                              handler: async () => {
                                await auth
                                  .signOut()
                                  .then(() => {
                                    Session.clearUser();
                                    console.log("logged out");
                                    history.push("/");
                                  })
                                  .catch((err) =>
                                    console.log("Couldn't log out :", err)
                                  );
                              },
                            },
                            { text: "No", handler: () => dismiss() },
                          ],
                          message: "LOG OUT ?",
                        })
                      }
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
                  ) : (
                    <Link
                      key={index}
                      id={appPage.url}
                      onClick={(e) => goToItem(e)}
                      className="item"
                      to={appPage?.url}
                      style={{ display: !appPage ? "none" : "" }}
                    >
                      <IonIcon
                        className="icon"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>
                        {appPage.title}{" "}
                        {appPage.title === "Edit" ? fellowship?.name : ""}
                      </IonLabel>
                    </Link>
                  );
                })}
              {!page && <Premium />}
              <div
                onClick={(e) => {
                  try {
                    setAboutModal(true);
                  } catch (TypeError) {
                    console.log("err");
                  }
                }}
                className="item"
              >
                <FcAbout className="profileIcons" size="1.5em" />
                <IonLabel>About us</IonLabel>
              </div>
            </div>
          </div>

          <div style={{ height: "70px" }}></div>
        </div>

        <IonModal isOpen={donateModal}>
          
        </IonModal>
        <IonModal isOpen={modal}>
          {modalContent == 1 && <SavedVideos closeModal={closeModal}/>}
          {modalContent == 2 && <Donate closeModal={closeModal} />}
          {modalContent == 3 && <UploadSermon closeModal={closeModal} />}
          {modalContent == 4 && <UploadAnnouncement closeModal={closeModal} />}
          {modalContent == 5 && <UploadDevotions closeModal={closeModal} />}
          {modalContent == 6 && <Post closeModal={closeModal} />}
          {modalContent == 7 && <Notes closeModal={closeModal} />}

          {/* <About setIsOpen={setAboutModal} /> */}
        </IonModal>
      </Body>
    </IonPage>
  );
};

export default Leader;
