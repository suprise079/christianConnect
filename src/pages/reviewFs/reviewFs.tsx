import { IonContent, IonLabel, IonPage, IonTitle, IonIcon, IonItem, IonButton } from "@ionic/react";
import { Link } from 'react-router-dom';
import TopImgFs from "../../components/topImagesFs/topImgFs";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import { star, starHalf, personCircleSharp } from 'ionicons/icons';

import img3 from './prayer.jpeg';

import React from "react";

// get css
import './reviewFs.css';
import TopNavBar from "../../components/topNavBar/topNavBar";

const ReviewFS: React.FC = () => {

  return (
    <IonPage id="review" >

      <IonContent className="reviewContent" >

        <TopNavBar />

        {/* delete this at your own risk..... */}
        <div className="imagesR" >  </div>

        <TopImgFs />

        <div className = "nameFs">
          <p> { "Mpumelelo Prayer Meeting" } </p>
          <p>
            <i >{"4.2"}</i> <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStarHalfAlt className = "icon1" /> 
            <i> {"34" } </i>
          </p>
        </div>


        <IonItem  className="item" color = "#348D63" lines = "full">
          <IonLabel>
            <IonLabel>Rate and review</IonLabel> 

            <IonLabel>
              <small className="small" >Share your experience to help others</small>
            </IonLabel>

            <div > 
            <IonIcon icon={personCircleSharp} className="person"></IonIcon>
            <i >
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>  </i> </div>
           </IonLabel>
        </IonItem>


         <IonItem  color = " #348D63" lines = "full">
          <IonLabel  >
            <IonLabel className="sortBy" >
              <small>Sort By</small>
              <button className="btn" >Newest</button>
              <button className="btn" >Highest</button>
              <button className="btn" >Lowest</button>
            </IonLabel>
           
          <div slot=" start" className="avatar">
            <img src={img3} />
            <p > <i > {"Marie Hope"} </i>  <i> {"2"} reviews </i> </p>
          </div>
          
          <IonIcon icon={star} className="icon1" ></IonIcon>
          <IonIcon icon={star} className="icon1" ></IonIcon>
          <IonIcon icon={star} className="icon1" ></IonIcon>
          <IonIcon icon={star} className="icon1"></IonIcon>
          <IonIcon icon={star} className="star"></IonIcon>
          <IonLabel > <small>2 months ago</small></IonLabel>
          <IonLabel><small>I love this app, it has brought me close to God</small></IonLabel>
            </IonLabel>
        </IonItem>

      </IonContent>


    </IonPage>
  );
}

export default ReviewFS;