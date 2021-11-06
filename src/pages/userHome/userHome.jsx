import { IonContent, IonIcon, IonPage, } from "@ionic/react";
import { BsSearch } from 'react-icons/bs';
import React from "react";
import "./userHome.css";

// import icons
import { home, arrowForward, arrowForwardOutline, search, } from "ionicons/icons";
import { useEffect, useContext, useState } from "react";
import Context from "../../context/Context";

// from firebase
import { auth } from "../../firebase/firebase";
import Cookies from 'js-cookie';


// import component
import { getAllFellowships, searchFsBar } from "../../firebase/firebase-help";
import SearchFellowship from "../../components/searchFellowship/searchFellowship";
import TabBar from "../../components/tabBar/tabBar";
import Map from '../../components/Map'
import { async } from "@firebase/util";



const UserHome = () =>{
    const { curUser, setCurUser } = useContext(Context);
    const [fellowships, setFellowships] = useState();

    // search bar variables
    // const searchBox = document.querySelector('#search-inpt');
    // const searchResults = document.querySelector('#search-results');

    // // getting search value
    // searchResults.innerHTML = searchFsBar(searchBox.value);
    // searchBox.addEventListener('keyups',async (e) => searchResults.innerHTML = await searchFsBar(e.target.value.toLowerCase()))

    useEffect(() => {
      // console.log("FROM JS-COOKIE", Cookies.get("userData") )
      setCurUser(JSON.parse(Cookies.get("userData")));

      // 
      getAllFellowships().then(data => {
        setFellowships(data);
      }); // console.log( fellowships )
    }, []);


    return (
      <IonPage className="userHome">

        <IonContent fullscreen className="container">

          {/* header */}
          <div className="home-header">

            {/* search field */}

            {/* <BsSearch className='searchIcon'/> */}
            <input
              id='search-inpt'
              type="text"
              placeholder="Search..." />


          </div>

          {/* map-container */}
          <div className="mapContainer">
            <p className="header">Fellowships near you</p>

            <div className="map">
              <Map />

            </div>
          </div>

          <div className="fellowships">

            <div id=' search-results'>

            </div>


            {/* display all fellowships available*/}
            {fellowships && fellowships.length > 0 ? (

              fellowships.map((fs, ind) => (
                <SearchFellowship key={ind}
                  name={fs.name} about={fs.about}
                  location={fs.location} time={fs.time} fsid={fs.id} />
              ))
            ) : (
              <h2> Loading.....</h2>
            )}

          </div>

          {/* the button component tab bar for navigation */}
          <TabBar />

          {/* <div className="moreFellowshipBtn" >
              <button className="moreFellowshipBtn">
                More Fellowships
                <IonIcon icon={arrowForward}> </IonIcon>
              </button>
            </div> */}

        </IonContent>
      </IonPage>
    );
  }

export default UserHome;
