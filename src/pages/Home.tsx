import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';


// import component
import SearchFellowship from '../components/searchFellowship/searchFellowship';

const Home: React.FC = () => {
  return (
    <IonPage>
      
      <IonHeader>
        <div className="searchField" >
          <p >Search Fellowship</p>
          <input type="text" placeholder="Search........" />
        </div>
      </IonHeader>


      <IonContent fullscreen>
        <div className="mapContainer" >
          <p className="header" >Showing Fellowship near you:</p>
          <p className="map" >Map</p>
        </div>

        <div className="fellowships" >

          <SearchFellowship />
          <SearchFellowship />
          <SearchFellowship />
        </div>
      </IonContent>


    </IonPage>
  );
};

export default Home;
