import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";

import React, { useState } from "react";
import "./userHome.css";

// import icons
import {
  arrowForward,
  search,
} from "ionicons/icons";

import { useEffect, useContext } from "react";
import Context from "../../context/Context";

// from firebase
import { auth } from "../../firebase/firebase";
import Cookies from 'js-cookie';


// import component
import SearchFellowship from "../../components/searchFellowship/searchFellowship";
import TabBar from "../../components/tabBar/tabBar";
import { getAllFellowships } from "../../firebase/firebase-help";




const UserHome = () => {
  const { curUser, setCurUser } = useContext( Context );
  const [ fellowships, setFellowships ] = useState();

  useEffect(() => {
    // console.log("FROM JS-COOKIE", Cookies.get("userData") )
    setCurUser( JSON.parse( Cookies.get("userData") ));

    // 
    getAllFellowships().then( data =>  { // console.log( data );
      setFellowships( data )
    }); // console.log( fellowships )
  }, [])


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

        {/* display all fellowships available */}
        <div className="fellowships">
          {
            fellowships && fellowships.length > 0 ? (

              fellowships.map( (fs, ind) => (
                <SearchFellowship key={ ind }
                  name={fs.name} about={fs.about}
                  location={ fs.location } time={ fs.time } fsid={ fs.id } />
              ))
            ) : (
              <h2> Loading..... </h2>
            )
          }
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
