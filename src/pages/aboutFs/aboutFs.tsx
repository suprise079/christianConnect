import React, { useState } from "react";
import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';


import './aboutFs.css'; // get css
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";

// import component
import NavigateFs from "../../components/navigateFs/nagivateFs";
import TopImgFs from "../../components/topImagesFs/topImgFs";


const AboutFellowship: React.FC = () => {

  return (
    <IonPage >

      <IonContent  className="aboutFellowship" >

        {/* <div className="topbar" > */}
          {/* <IonButton > <FaArrowLeft /> */}
          {/* <IonButton > <FaEllipsisH /> */}
        {/* </div> */}


        <div className="tabbarContainer" > 
          <div className="tabbar" slot="fixed" >
            <FaArrowLeft className="iconHover" />
            <FaEllipsisH className="iconHover" />
          </div>
        </div>


        <div className="imagesA" >
          <TopImgFs />
        </div>

        <NavigateFs />

        <div className="view" >
          About a fellowship
        </div>

      </IonContent>
    </IonPage>
    
  );
}
export default AboutFellowship;
