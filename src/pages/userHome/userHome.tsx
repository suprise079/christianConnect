import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React from "react";
import "./userHome.css";

// import icons
import {
  home,
  arrowForward,
  arrowForwardOutline,
  search,
} from "ionicons/icons";

// import component
import SearchFellowship from "../../components/searchFellowship/searchFellowship";
import TabBar from "../../components/tabBar/tabBar";

const UserHome: React.FC = () => {
  return (
    <IonPage className="userHome">
      <IonHeader class="ion-no-border">
        <div className="searchField">
          <p>Search Fellowship</p>
          <div id="search">
            <input type="text" placeholder="Search..." />
            <span id="searchIcon">
              <IonIcon icon={search}> </IonIcon>
            </span>{" "}
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen className="container">
        <div className="mapContainer">
          <p className="header">Showing Fellowship near you:</p>
          <p className="map">Map</p>
        </div>

        <div className="fellowships">
          <SearchFellowship />
          <SearchFellowship />
        </div>

        {/* the button component tab bar for navigation */}
        <TabBar />

        {/* <div className="moreFellowshipBtn" > */}
        <button className="moreFellowshipBtn">
          More Fellowships <IonIcon icon={arrowForward}> </IonIcon>
        </button>
        {/* </div> */}
      </IonContent>
    </IonPage>
  );
};

export default UserHome;
