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
  const [text, setText] = useState("");
  const [paymentType, setPaymentType] = useState("Card");
  const [confirmDonation, setConfirmDonation] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [donateAnonymously, setDonateAnonymously] = useState(false);
  const [donationConfirmed, setDonationConfirmed] = useState(false);

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
                  return appPage.url === "/Donate" ? (
                    <div
                      key={index}
                      id={appPage.url}
                      onClick={(e) => setDonateModal(true)}
                      className="item"
                      style={{ display: !appPage ? "none" : "" }}
                    >
                      <IonIcon
                        className="icon"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
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
          <IonContent class="ion-padding" id="donateModalContent">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmDonation(true);
              }}
            >
              <p id="donateInfo">
                Donate To The Christian Connect Development Team
              </p>

              <div style={{ margin: "10px" }} id="paymentType">
                <div>Payment type:</div>
                <div className="donatePaymentContainer">
                  <label
                    className={
                      paymentType === "Card"
                        ? "paymentTypeChecked"
                        : "paymentType"
                    }
                    htmlFor="CardMethod"
                  >
                    Card
                  </label>
                  <input
                    checked={paymentType === "Card"}
                    onClick={(e) => setPaymentType(e.target.value)}
                    value="Card"
                    name="paymentDonate"
                    type="radio"
                    id="CardMethod"
                  />
                  <label
                    className={
                      paymentType === "EFT"
                        ? "paymentTypeChecked"
                        : "paymentType"
                    }
                    htmlFor="EFTMethod"
                  >
                    EFT
                  </label>
                  <input
                    className="paymentType"
                    checked={paymentType === "EFT"}
                    onClick={(e) => setPaymentType(e.target.value)}
                    value="EFT"
                    name="paymentDonate"
                    type="radio"
                    id="EFTMethod"
                  />
                </div>
              </div>

              <div style={{ margin: "10px" }} id="donateAmount">
                <label> Amount(in ZAR): </label>
                <input
                  value={parseInt(donateAmount, 10)}
                  onChange={(e) => {
                    setDonateAmount(parseInt(e.target.value, 10));
                  }}
                  required
                  style={{ border: "1px solid gray", borderRadius: "5px" }}
                  size="7"
                  type="number"
                />
              </div>

              <div style={{ margin: "10px" }} id="donateMessage">
                <p> Message </p>

                <IonTextarea
                  rows="6"
                  placeholder="A word to accompany your donation..."
                  className="donateTextArea"
                  value={text}
                  onIonChange={(e) => setText(e.target.value)}
                ></IonTextarea>
              </div>

              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  id="donateAnonymously"
                  style={{ margin: "0 10px" }}
                  type="checkbox"
                  checked={donateAnonymously}
                  onChange={() => setDonateAnonymously(!donateAnonymously)}
                />
                <label htmlFor="donateAnonymously">Donate Anonymously</label>
              </div>

              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="donateButtonsContainer"
              >
                <button onClick={() => setDonateModal(false)}>Cancel</button>
                <button type="submit">Donate</button>
              </div>
            </form>
          </IonContent>
        </IonModal>
        <IonModal isOpen={aboutModal}>
          <About setIsOpen={setAboutModal} />
        </IonModal>
      </Body>
    </IonPage>
  );
};

export default Leader;
