import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, 
  IonToolbar 
} from '@ionic/react';

import React from 'react';
import './Home.css';


// import icons
import {
  home, arrowForward, arrowForwardOutline, 
} from 'ionicons/icons'

// import component
import SearchFellowship from '../components/searchFellowship/searchFellowship';
import TabBar from '../components/tabBar/tabBar';

const Home: React.FC = () => {
  return (
    <IonPage className="userHome" >

      <IonHeader>
        <div className="searchField" >
          <p >Search Fellowship</p>
          <input type="text" placeholder="Search........" />
        </div>
      </IonHeader>

      <IonContent fullscreen className="container" >
        
        <div className="mapContainer" >
          <p className="header" >Showing Fellowship near you:</p>
          <p className="map" >Map</p>
        </div>

        <div className="fellowships" >
          <SearchFellowship />
          <SearchFellowship />
          {/* <SearchFellowship /> */}
          {/* <SearchFellowship /> */}
          {/* <SearchFellowship /> */}
          {/* <SearchFellowship /> */}
        </div>

        {/* the button component tabbar for navigation */}
        <TabBar />


        {/* <div className="moreFellowshipBtn" > */}
          <button className="moreFellowshipBtn" >
            More Fellowships <IonIcon icon={ arrowForward } >  </IonIcon>
          </button>
          
          
        {/* </div> */}
      </IonContent>

    </IonPage>
  );
};

export default Home;