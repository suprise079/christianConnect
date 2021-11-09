import {
  IonToolbar,
  IonPage,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonIcon,
  IonModal,
  IonHeader,
  IonButtons,
  IonCard,
  IonBackButton,
  IonTitle,
  IonContent,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
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
import { useContext, useEffect, useState } from "react";
// import { confirmAlert } from "react-confirm-alert";
import "./profile.css";
import "./donate.css";

import { FaEdit, FaUserEdit } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

// firebase for signOut
import { auth } from "../../firebase/firebase";
// import { signOut } from "firebase/auth";
import Context from "../../context/Context";
// get firebase functions
import { getUserImg } from "../../firebase/firebase-help";

import { dummyPhoto } from "../../components/helpFunc";
import NoProfileImg from "./noProfileSet.png";
import EditUser from "./EditUser";
import Session from "../../components/session";
import { FcAbout } from "react-icons/fc";
// import { url } from "inspector";
import About from "../About/About";

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
    padding: 0;
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
  div.menu {
    margin-top: 40px;
    overflow-y: scroll;
  }
`;

const Profile = () => {
  // Donate variables
  const [donateModal, setDonateModal] = useState(false);
  const [text, setText] = useState("");
  const [paymentType, setPaymentType] = useState("Card");
  const [confirmDonation, setConfirmDonation] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [donateAnonymously, setDonateAnonymously] = useState(false);
  const [donationConfirmed, setDonationConfirmed] = useState(false);

  // modals variables
  const [aboutModal, setAboutModal] = useState(false);

  // Profile Variables
  const [present, dismiss] = useIonToast();
  const [userPhoto, setUserPhoto] = useState();
  // const [user, setUser] = useState(
  //   JSON.parse(
  //     localStorage.getItem("userData") ? localStorage.getItem("userData") : ""
  //   )
  // );

  const goToItem = async (e) => {
    const url = e.target.id;
    if (url === "/") {
    }
  };
  // useEffect(() => {
  //   setCurUser(JSON.parse(localStorage.getItem("userData")));

  //   // console.log( user )
  //   getUserImg(user?.userId).then((res) => {
  //     if (res) {
  //       setUserPhoto(res);
  //     } else {
  //       setUserPhoto(false);
  //     }
  //   });
  // });
  const history = useHistory();
  return (
    <Body>
      <IonHeader color="white" className="ion-no-border">
        <IonToolbar color="white">
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profileIonContent">
        <div id="profileContent" className="body">
          <div className="container">
            <div className="headerTrail"></div>

            <div className="infos">
              <div className="userProfile">
                {Session.getPhoto() ? (
                  <img src={Session.getPhoto()} alt="profile" />
                ) : (
                  <img src={NoProfileImg} alt="No Profile set" />
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
                  {Session.getFirstName()} {Session.getLastName()}
                </IonCardTitle>
                <IonCardSubtitle> {Session.getEmail()}</IonCardSubtitle>
              </div>
            </div>
          </div>

          <div className="content">
            <div id="profile_items" className="menu">
              {appPages.map((appPage, index) => {
                return appPage.url === "/Donate" ? (
                  <div
                    key={index}
                    id={appPage.url}
                    onClick={(e) => setDonateModal(true)}
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
                  >
                    <IonIcon
                      className="icon"
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </Link>
                );
              })}
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
        </div>
      </IonContent>
      <div style={{ height: "56px" }}></div>
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
                    paymentType === "EFT" ? "paymentTypeChecked" : "paymentType"
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
      <IonModal isOpen={confirmDonation}>
        <IonContent className="ion-padding" id="DonateConfirmationContainer">
          <IonCard className="confirmDonationMessage">
            {donationConfirmed ? (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column-reverse",
                }}
              >
                <div>Thank you for you contribution !</div>
                <BsFillCheckCircleFill size="4em" color="white" />
              </p>
            ) : (
              <p style={{ textAlign: "center" }}>
                Your are about to make a donation of{" "}
                <b>
                  <em>R{donateAmount}</em>
                </b>{" "}
                <b>{donateAnonymously ? "Anonymously " : ""}</b>
                to the Christian Connect Dev Team. Please Confirm
              </p>
            )}
          </IonCard>
          {donationConfirmed ? (
            ""
          ) : (
            <div
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
              }}
              className="donateButtonsContainer"
            >
              <button
                onClick={() => {
                  setConfirmDonation(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDonationConfirmed(true);
                  setTimeout(() => {
                    setConfirmDonation(false);
                    setDonateModal(false);
                    setDonateAmount("");
                  }, 1500);
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </IonContent>
      </IonModal>
      {/* <EditUser isOpen={modalControler} setIsOpen={setModalControler} /> */}
    </Body>
  );
};

export default Profile;
