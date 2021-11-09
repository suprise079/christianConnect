import {
  IonContent,
  IonHeader,
  IonCard,
  IonRouterOutlet,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonPage,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonVirtualScroll,
} from "@ionic/react";
import Announce from "./announcements/Announcements";
import Devotions from "./devotions/Devotions.js";
import { useEffect, useState } from "react";
// import { IonHeader, IonToolbar, IonIcon,IonTitle } from "@ionic/react";
import { arrowBackSharp } from "ionicons/icons";
import "./subscriptionTabs.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Discussions from "./discussions/Discussions.js";
import { IoAddSharp } from "react-icons/io5";
import Post from "./discussions/addPost";
import { Link } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { useParams } from "react-router";
import { collection, doc, getDoc, getDocs, query } from "@firebase/firestore";
import { firestoreObj } from "../../firebase/firebase";
import React from "react";


const SubscriptionTabs = () => {
  const loop = [1, 2, 3, 4, 5, 6];
  const [page, setPage] = useState("1");
  const fellowshipId = useParams();
  const [fellowshipData, setFellowshipData] = useState({})
  

  // switch between announcement, devotions and discussion tabs
  function switchTab(id) {
    try {
      // remove background of previously selected menu
      document.getElementById(page).style.backgroundColor = "transparent";
      setPage(id);
      document.getElementById(id).style.backgroundColor = "white";
    } catch {
      setPage(id);
      document.getElementById(id).style.backgroundColor = "white";
    }
  }

  useEffect(() => {
    switchTab(page);
    // clear fellowship data
    setFellowshipData({})
    // get selected fellowship information
    const getData = async function(fellowshipId) {
      const dbQuery = doc(firestoreObj, "Fellowships", fellowshipId);
      const queryResults = await getDoc(dbQuery);
      setFellowshipData(queryResults.data())
    };
    getData(fellowshipId.fellowshipId)
  },[fellowshipId]);

  return (
    <IonPage id="subscribePage">
      <div className="headerSubTab">
        <IonButton fill="clear" style={{ color: "black", fontSize: "8pt", width:'50px' }} color="transparent">
          <Link to="/"  >
            <MdKeyboardArrowLeft size="20" />
            Back
          </Link>
        </IonButton>
        {console.log(fellowshipData)}
        <IonTitle id="mainHeading">{fellowshipData.name}</IonTitle>
      </div>
      {/* <IonHeader></IonHeader> */}

      <div id="tabs">
        <IonButton
          fill="clear"
          id="1"
          onClick={() => switchTab("1")}
          className="tabBtn"
          color="transparent"

        >
          Announcements
        </IonButton>
        <IonButton
          fill="clear"
          id="2"
          onClick={() => switchTab("2")}
          className="tabBtn"
          color="transparent"

        >
          Devotions
        </IonButton>
        <IonButton
          fill="clear"
          id="3"
          onClick={() => switchTab("3")}
          className="tabBtn"
          color="transparent"
        >
          Discussions
        </IonButton>
      </div>
      {/* <IonContent className='tabInfo' style={{backgroundColor:'inherit'}} > */}
      <div className="tabInfoDiv p-9">
        {page === "1" && <Announce />}
        {page === "2" && <Devotions />}
        {page === "3" && (
          <>
            <Discussions />
            <div>
              <IoAddSharp
                id="addPostBtn"
                size="30px"
                onClick={() => {
                  setPage("3.1");
                }}
              />
            </div>
          </>
        )}
        {page == "3.1" && <Post setPage={setPage} />}
      </div>
    </IonPage>
  );
};

// create a post page that will take the prop view and change to display discusiion

export default SubscriptionTabs;
