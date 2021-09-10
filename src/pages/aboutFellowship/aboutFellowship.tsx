import React, { useState } from "react";
import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';


import './aboutFellowship.css'; // get css
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";



const AboutFellowship: React.FC = () => {
  const [ fellowshipNavig, setFellowshipNavig ] = useState( 0 );


  function ChangeView( view: number ) {
    setFellowshipNavig( view ); // alert( view );
  }

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

          <div className="navigator" >
            <button onClick={ e => ChangeView(0) }  > 
            Overview
            </button> 
            <button onClick={ e => ChangeView(1) }  > Reviews </button> 
            <button onClick={ e => ChangeView(2) }  > 
              <Link to="/FellowshipPhotos" > Photos </Link> </button> 
            <button onClick={ e => ChangeView(3) }  > About </button> 
          </div>

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