import React, { useState } from "react";
import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';


import './aboutFs.css'; // get css

// import component
import NavigateFs from "../../components/navigateFs/navigateFs";
import TopImgFs from "../../components/topImagesFs/topImgFs";
import TopNavBar from "../../components/topNavBar/topNavBar";


const AboutFellowship: React.FC = () => {

  return (
    <IonPage >

      <IonContent  className="aboutFellowship" >

        <TopNavBar />

        <div className="imagesA" > <TopImgFs /> </div>

        <NavigateFs pn={"about"} />

        <div className="view" >
          About a fellowship
        </div>

      </IonContent>
    </IonPage>
    
  );
}
export default AboutFellowship;
