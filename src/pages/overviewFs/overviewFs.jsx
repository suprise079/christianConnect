import { IonContent,IonIcon, IonItem,IonButton,IonSelect,IonTabButton,IonLabel,IonPage, IonTitle, IonTabBar,  } from '@ionic/react';
import './overviewFs.css';
import {
  shareSocialOutline, arrowBack,ellipsisHorizontalSharp,personCircleSharp,star,starHalf,returnUpForward,call,bookmarkSharp,locationSharp,timeSharp,earthSharp
} from 'ionicons/icons'

import { FaArrowLeft, FaEllipsisH, FaStar, FaStarHalf, FaStarHalfAlt, FaRegStarHalf } from 'react-icons/fa';


// session management and firebase db
import Cookies from 'js-cookie';
import Context from '../../context/Context';


import { Link } from 'react-router-dom';

import React, { useContext, useEffect, useState } from 'react'

// import component
import TopImgFs from '../../components/topImagesFs/topImgFs';
import TopNavBar from '../../components/topNavBar/topNavBar';






// has, location of fellowship, time, websites, contact details
// able to share to other apps and books marks
const ContactLocAddr = () => {
  return (
    <>
      <div className="FsButtons" >
        <IonIcon icon={returnUpForward}></IonIcon>

        <Link to="" href="tel:0738189349" >
          <IonIcon icon={call}></IonIcon>
        </Link>

        <IonIcon icon = {bookmarkSharp}></IonIcon>

        <IonIcon icon = {shareSocialOutline}></IonIcon>
      </div>

      <div className="locaWebTime"  >
        <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
          <IonIcon icon ={locationSharp} className = "icon"></IonIcon>
          <IonLabel ><small>{"Landau, Terrace rd"} </small></IonLabel><br></br>
        </IonItem>
            
        <IonItem  color = " #348D63" lines="none" className="itemBorderTop time" >
          <IonIcon icon ={timeSharp} className = "icon"></IonIcon>
          <small> Today {"12:00pm"} </small>

          <div>
            <small>Schedule</small>
            <IonSelect className = "selector" ></IonSelect>
          </div>
        </IonItem>
          
        <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
          <IonIcon icon= {earthSharp} className = "icon"></IonIcon>
          <IonLabel ><small> {"www.cnxjnsdn.co.za"} </small></IonLabel>
        </IonItem>
      </div>
    </>
  )
}


// contains the reviews of a fellowship
const ReviewsFs = ( props ) => {
  return (
    <>
      <h3 > Review { props.name } fellowship </h3>
      
      <div id="reviewsFs" >
        <div  className="item" >
          <small>Rate and review</small> 

          <small className="small" >Share your experience to help others</small>

          <div > 
            <IonIcon icon={personCircleSharp} className="person"></IonIcon>
            <i >
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            </i> 
          </div>
        </div>


        <div id="reviews"  color = " #348D63" lines = "full">
          <div className="sortBy" >
            <small>Sort By</small>
            <button className="btn" >Newest</button>
            <button className="btn" >Highest</button>
            <button className="btn" >Lowest</button>
          </div>
           
          <div className="review" >
            <div className="userPicName">
              <img src={""} alt="IMG" />
              <i > {"Marie Hope"} </i>  <i> {"2"} reviews </i>
            </div>
            <div className="reviewed" >
              <IonIcon icon={star} className="icon1" ></IonIcon>
              <IonIcon icon={star} className="icon1" ></IonIcon>
              <IonIcon icon={star} className="icon1" ></IonIcon>
              <IonIcon icon={star} className="icon1"></IonIcon>
              <IonIcon icon={star} className="star"></IonIcon><br />
              <small>2 months ago</small> <br />
              <small>I love this app, it has brought me close to God</small>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

// contains the photo's of a fellowship
const PhotosFs = ( props ) => {
  return (
    <>
      <h3 > Photos of { props.name } fellowship </h3>
      Photos Component
    </>
  )
}


// contains the abouts of a fellowship
const AboutFs = ( props ) => {
  return (
    <>
      <h3 > About { props.name } fellowship </h3>
      <div >
        { props.aboutFs }
      </div>
    </>
  )
}



const OverviewFs = () => {
  const { allFellowships } = useContext( Context );
  const [ curFs, setCurFs ] = useState();
  const [ show, setShow ] = useState(0);


  useEffect(() => {
    const url = window.location.search; // get the search part of the local url..
    const usp = new URLSearchParams( url ); // make obj used to search params in url
    const fellowshipId = usp.get("fsid"); // get param with the passed name
    // console.log( 'URL IS:', fellowshipId ); ///

    // read all fellowships from firebase... get the 1 that matches the in from url
    // it will return an array of one element... get the 1st element of the array
    // and assign to current fellowship[ curFs ] state variable
    // console.log( 
      // JSON.parse(Cookies.get("allFellowships")).filter( doc=>doc.id===fellowshipId)[0] )
    setCurFs(
      JSON.parse( Cookies.get("allFellowships") ).filter( doc => doc.id===fellowshipId)[0]
    )
  }, [])


  return (
    <IonPage id = "overviewFS">
 
      <IonContent className="overview" fullscreen >

        <TopNavBar />
        
        {/* delete this at your own risk */}
        <div className="imagesO" ></div>
        {/* <div className="imagesO" ></div> */}
        

        {/* <TopImgFs img1={ "" } img2={ "" } img3={ "" } /> */}
            
        <div className = "nameFs">
          <p id="fsName" > { curFs?.name } </p>
          <p>
            <i >{"4.2"}</i> <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStarHalfAlt className = "icon1" /> 
            <i> {"34" } </i>
          </p>
        </div>


        <div id="navigatorFs" >
          <span to="#"
            onClick={ e=> setShow(0) }
            className="navFsBtn"
            style={{ borderBottom: "props.pn" ==="overview" ? ".2em solid white" : "" }} > Overview </span>

          <span to="#"
            onClick={ e=> setShow(1) }
            className="navFsBtn"
            style={{ borderBottom: "props.pn" ==="reviews" ? ".2em solid white" : "" }} > Reviews </span> 

          <span to="#"
            className="navFsBtn"
            onClick={ e=> setShow(2) }
            style={{ borderBottom: "props.pn" ==="photo" ? ".2em solid white" : "" }} > Photos </span>

          <span to="#"
            className="navFsBtn"
            onClick={ e=> setShow(3) }
            style={{ borderBottom: "props.pn" ==="about" ? ".2em solid white" : "" }} >
              About </span> 
        </div>

        <div >
          {
            show === 0 ? (
              <ContactLocAddr />
            ) : show === 1 ? (
              <ReviewsFs name={ curFs?.name }  />
            ) : show === 2 ? (

              <PhotosFs name={ curFs?.name } />
            ) : (
              // pass about a fellow details to this components
              <AboutFs aboutFs = { curFs?.about } name={ curFs?.name }  />
            )
          }
        </div >

        

          

      </IonContent>
    </IonPage>
  );
};

export default OverviewFs;