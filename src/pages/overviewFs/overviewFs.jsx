import { IonContent, IonIcon, IonItem, IonSelect, IonLabel, IonPage, IonTitle, IonTabBar, IonImg,  } from '@ionic/react';
import './overviewFs.css';
import Stars from '../../components/starRating/starRating';

//import icons
import { shareSocialOutline, returnUpForward, call, bookmarkSharp,locationSharp, timeSharp, earthSharp, star } from 'ionicons/icons'
import { GrAdd } from 'react-icons/gr';
import { FaArrowLeft, FaEllipsisH, FaStar, FaStarHalf, FaStarHalfAlt, FaRegStarHalf } from 'react-icons/fa';

// session management and firebase db
import Cookies from 'js-cookie';
import Context from '../../context/Context';


import { Link } from 'react-router-dom';

import React, { useContext, useEffect, useState } from 'react'

// import component
// import NavigateFs from '../../components/navigateFs/navigateFs';
import TopImgFs from '../../components/topImagesFs/topImgFs';
import TopNavBar from '../../components/topNavBar/topNavBar';
import { AddReview, getReviews } from '../../firebase/firebase-help';
import { dummyPhoto } from '../../components/helpFunc';




// has, location of fellowship, time, websites, contact details
// able to share to other apps and books marks
const ContactLocAddr = () => {
  return (
    <>
      <div className="FsButtons" >
        <IonIcon icon={returnUpForward}></IonIcon>

        {/* call fellowship */}
        <Link to="" href="tel:0738189349" >
          <IonIcon icon={call}></IonIcon>
        </Link>

        {/* subscription button */}
        <IonIcon icon = {bookmarkSharp}></IonIcon>

        {/* share fellowship */}
        <IonIcon icon = {shareSocialOutline}></IonIcon>
      </div>

      <div className="locaWebTime"  >
        <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
          <IonIcon icon ={locationSharp} className = "icon"></IonIcon>
          <small>{"Landau, Terrace rd"} </small>
        </IonItem>
            
          
        <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
          <IonIcon icon= {earthSharp} className = "icon"></IonIcon>
          <small> {"www.cnxjnsdn.co.za"} </small>
        </IonItem>
      </div>
    </>
  )
}


// contains the reviews of a fellowship
const ReviewsFs = ( props ) => {

  const [rateTxt, setRateTxt] = useState ();
  const [ stars, setStars ] = useState(0);
  const { allFellowships, curUser, setCurUser } = useContext( Context );
  const [ curFs, setCurFs ] = useState();
  const [ show, setShow ] = useState(0);
  const [ reviews, setReviews ] = useState();



  useEffect(() => {
    // get current user data
    setCurUser( JSON.parse( Cookies.get("userData") ));

    const url = window.location.search; // get the search part of the local url..
    const usp = new URLSearchParams( url ); // make obj used to search params in url
    const fellowshipId = usp.get("fsid"); // get param with the passed name
   
    setCurFs(
      JSON.parse( Cookies.get("allFellowships") ).filter( doc => doc.id===fellowshipId)[0]
    )

    // get all reviews from reviews collections
    getReviews().then( doc => {
      if( doc ) { var rev = doc; setReviews( rev ) }
      else { console.log("ERROR GETTING REVIEWS"); }
    })
  }, [])
  

  function addReview(){
    if( stars > 0 && rateTxt ) {
      // console.log( stars, rateTxt ); console.log( "USER ID:", curUser?.userId )
      // console.log( "FS ID:", curFs?.id );
      // uid, fsid, stars, text
      AddReview( curUser?.userId, curFs?.id, stars, rateTxt ).then( res=>{
        if( res ) {
          alert("Review Added Successfull");
          setStars(0); setRateTxt("");
          // get all reviews from reviews collections
          getReviews().then( doc => {
            if( doc ) { var rev = doc; setReviews( rev ) }
            else { console.log("ERROR GETTING REVIEWS"); }
          })
        }
        else { alert("Error Adding Reviews") }
      })
    }
    else { console.error("RATING ERROR: adding review error" ) }
  }

  return (
    <>
      <h3 id='fellow-rev' > Review { props.name } fellowship </h3>
      
      <div id="reviewsFs" >
        <div  className = "rev-item">
          
          <IonLabel>
            {/* add review container */}
            <h2>Rate and review</h2> 

            <div className='add-review'>                 
              {/* star rating stars={ stars } setStars={ setStars } */}
              <Stars hoverValue={ stars } setHoverValue={ setStars } />                            
            </div>

            {/* reviews text area */}
            <textarea
              className='reviewTextArea' value={rateTxt}
              placeholder="How was your experience?"
              onChange={(e)=> setRateTxt(e.target.value)}/>

            <br />
            
            {/* add review button */}
            <button
              onClick={ e => addReview() }
              className='reviewBtn'>Add review</button>
           </IonLabel>

        </div>

        
        <div className="sortBy" >
          {/* sort buttons */}
          {/* create functions for them to work */}
              <small>Sort By</small>
              <button className="sort-btn" >Newest</button>
              <button className="sort-btn" >Highest</button>
              <button className="sort-btn" >Lowest</button>
        </div>

         <div>
            {/* display reviews from datatbase */}

          <div className='reviewCont'>

            <div slot=" start" className="avatar1">

              {/* display profile picture */}
              {/* <img src={img3} /> */}

              {/* name of user */}
              <p><i> {"Marie Hope"} </i></p>
            </div>

            {/* display stars */}
          

            {/* date review created */}
            <p>{'date'}</p>
            
            {/* review content */}
            <p>I love this app, it has brought me close to God</p>


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
          {/* <div className="imagesO" ></div> */}

          <TopImgFs img1={ "" } img2={ "" } img3={ "" } />
              
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

          
          {/* navigation tab */}
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


          {/* icon buttons */}
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