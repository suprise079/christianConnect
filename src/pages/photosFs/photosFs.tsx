
import { IonContent, IonPage } from "@ionic/react";
import { Link } from 'react-router-dom'
import './photosFs.css';
import React from 'react';
// import component
import TopNavBar from "../../components/topNavBar/topNavBar";


const FellowshipPhotos: React.FC = () => {



  return (
    <IonPage >

      <IonContent className="fellowshipPhotos" >

        <TopNavBar />

        {/* <div className="navMargin" > </div> */}
        <br /><br /><br />

        <div className="imagesFS" >
          <div >
            <p style={{padding: '3em', backgroundColor:"lightgrey"}} > Main Image </p>
          </div>

          <div className="moreImages" >
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((imgs, i ) => (
                <p key={i}
                style={{ width:"32%", textAlign: "center", padding: '2em',
                backgroundColor:"lightgrey", margin: ".1em" 
              }} > { imgs } </p>
              ))
            }
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
}

export default FellowshipPhotos;