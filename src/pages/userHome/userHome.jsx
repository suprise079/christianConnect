import {
  IonContent,
  IonProgressBar,
  IonPage,
  IonSearchbar,
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
    setCurUser(JSON.parse(Cookies.get("userData")));

    getAllFellowships().then((data) => {
      setFellowships(data);
    });
    console.log(word);
    console.log(FS);
  }, [setCurUser, word, FS]);

  return (
    <IonPage className="userHome">
      <IonContent fullscreen className="container">
        {/* header */}
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
          ></IonSearchbar>
        </div>

        {/* map-container */}
        <div className="mapContainer">
          <p style={{ textAlign: "center" }} className="header">
            Fellowships near you
          </p>

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

        {/* the button component tab bar for navigation */}
        <TabBar />
      </IonContent>
    </IonPage>
  );
};

export default UserHome;
