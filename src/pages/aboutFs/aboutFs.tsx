import React, { useState } from "react";
import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';


import './aboutFs.css'; // get css
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";

// import component
import NavigateFs from "../../components/navigateFs/nagivateFs";


const AboutFellowship: React.FC = () => {

  return (
    <IonPage >

      <IonContent >
        <div className="aboutFellowship" >

          <div className="topbar" >
            {/* <IonButton > */} <FaArrowLeft /> {/* </IonButton> */}
            {/* <IonButton > */} <FaEllipsisH /> {/* </IonButton> */}
          </div>


          <div className="photos" >

            <p >
              Images
            </p>

            <div >
              {/* <img alt="images" /> */}
              {/* <img alt="images" /> */}
              <p > Images </p>
              <p className="moreImage" > Images </p>
            </div>
          </div>

          <NavigateFs />

          <div className="view" >
            About a fellowship
          </div>
        </div>
      </IonContent>
    </IonPage>
    
  );
}
export default AboutFellowship;



// <IonButtons >
//   <IonButton > Overview </IonButton>
//   <IonButton > Reviews </IonButton>      
//   <IonButton > Photos </IonButton>      
//   <IonButton > About </IonButton>         
// </IonButtons>