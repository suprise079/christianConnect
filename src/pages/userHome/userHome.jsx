import {
  IonContent,
  IonProgressBar,
  IonPage,
  IonSearchbar,
  IonRouterOutlet,
} from "@ionic/react";
import { BsSearch } from "react-icons/bs";
import React from "react";
import "./userHome.css";

// import icons
import {
  home,
  arrowForward,
  arrowForwardOutline,
  search,
} from "ionicons/icons";
import { useEffect, useContext, useState } from "react";
import Context from "../../context/Context";

// from firebase
import { auth } from "../../firebase/firebase";
import Cookies from "js-cookie";

// import component
import { getAllFellowships, searchFsBar } from "../../firebase/firebase-help";
import SearchFellowship from "../../components/searchFellowship/searchFellowship";
import TabBar from "../../components/tabBar/tabBar";
import Map from "../../components/Map";
import { async } from "@firebase/util";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import OverviewFs from "../overviewFs/overviewFs";

const UserHome = () => {
  const { curUser, setCurUser } = useContext(Context);
  const [fellowships, setFellowships] = useState();
  const [word, setWord] = useState();
  const [FS, setFS] = useState();
  const [searchText, setSearchText] = useState("");

  const search_ = async (e) => {
    e.preventDefault();
    // console.log( fellowships )
    var res = await fellowships.filter((fs) => {
      return fs.name.toLowerCase().includes(word);
    });
    console.log(res);
    console.log("IN SEARCH_:", res);
    await setFS(res);
  };
  useEffect(() => {
    setCurUser(JSON.parse(localStorage.getItem("currentUser")));

    getAllFellowships().then((data) => {
      setFellowships(data);
    });
    console.log(word);
    console.log(FS);
  }, [setCurUser, word, FS]);

  return (
    <>
      <IonPage className="userHome">
        <IonContent fullscreen className="container">
          <div className="home-header">
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => {
                setSearchText(e.target.value);
                search_(e);
                setWord(e.target.value);
              }}
              showCancelButton="never"
              cancelButtonText="Cancel"
              placeholder="Search a fellowship..."
              className="homePageSearchBar"
            ></IonSearchbar>
          </div>

          {/* map-container */}
          <div className="mapContainer">
            <span
              style={{
                textAlign: "left",
                margin: "0 10px",
                fontWeight: "lighter",
                fontSize: "20px",
              }}
              className="header"
            >
              fellowships near you
            </span>

            <div className="map">
              <Map />
            </div>
          </div>

          <div className="fellowships">
            <div id=" search-results"></div>
            {console.log(typeof FS)}
            {/* display all fellowships available*/}
            {word && FS && FS.length ? (
              FS.map((fs, ind) => (
                <SearchFellowship
                  key={ind}
                  name={fs.name}
                  about={fs.about}
                  location={fs.location}
                  time={fs.time}
                  fsid={fs.id}
                />
              ))
            ) : word && word.length <= 2 && FS.length === 0 ? (
              <h3>Please enter at least 3 letters!</h3>
            ) : word && word.length > 2 && FS.length === 0 ? (
              <h3>{word} Not Found !</h3>
            ) : fellowships ? (
              fellowships.map((fs, ind) => (
                <SearchFellowship
                  key={ind}
                  name={fs.name}
                  about={fs.about}
                  location={fs.location}
                  time={fs.time}
                  fsid={fs.id}
                />
              ))
            ) : (
              <IonProgressBar
                id="progressBar"
                type="indeterminate"
              ></IonProgressBar>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
const UserHomeRoutes = () => {
  return (
    <>
      {/* <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={UserHome} />
          <Route exact path="/overviewfs?" component={OverviewFs} />
        </IonRouterOutlet>
      </IonReactRouter> */}
        <UserHome />
    </>
  );
};

export default UserHomeRoutes;
