import { IonContent, IonIcon, IonItem, IonSelect, IonLabel, IonPage, IonTitle, IonTabBar,  } from '@ionic/react';
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
  

  function addRev(){
    // addReview()
  }

  return (
    <>
      <h3 > Review { props.name } fellowship </h3>
      
      <div id="reviewsFs" >
        <div  className = "item">
          
          <IonLabel>
            {/* add review container */}
              
              <h2>Rate and review</h2> 

              <div className='add-review'>                 
                {/* star rating stars={ stars } setStars={ setStars } */}
                <Stars hoverValue={ stars } setHoverValue={ setStars } />                            
              </div>

              {/* reviews text area */}
              <textarea className='reviewTextArea' value={rateTxt}  placeholder="How was your experience?"  onChange={(e)=> setRateTxt(e.target.value)}/>

              <br />
              
              {/* add review button */}
              <button className='reviewBtn'>Add review</button>
            
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
            
            {/* <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1"></IonIcon>
            <IonIcon icon={star} className="star"></IonIcon> */}

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

        {/* overview container */}
        <div id='overview-cont' >
          {/* delete this at your own risk */}
          <div className="imagesO" ></div>
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
        </div>
        
        

      </IonContent>
    </IonPage>

    // malebo's overview code

    // <IonPage className = "overviewFS">
 
    //   <IonContent className="overview" fullscreen >

    //     <TopNavBar />
        
    //     {/* delete this at your own risk */}
    //     <div className="imagesO" ></div>

    //     <TopImgFs img1={ "" } img2={ "" } img3={ "" } />
       

            
    //     <div className = "nameFs">
    //       <p> { "Mpumelelo Prayer Meeting" } </p>
    //       <p>
    //         <i >{"4.2"}</i> <FaStar className = "icon1" />
    //         <FaStar className = "icon1" />
    //         <FaStar className = "icon1" />
    //         <FaStar className = "icon1" />
    //         <FaStarHalfAlt className = "icon1" /> 
    //         <i> {"34" } </i>
    //       </p>
    //     </div>


    //     <NavigateFs pn={"overview"} />

        
    //     <div className="buttons" >
    //       <IonIcon icon={returnUpForward}></IonIcon>

    //       <Link to="" href="tel:0738189349" >
    //         <IonIcon icon={call}></IonIcon>
    //       </Link>

    //       <GrAdd id='add-btn'/>

    //       <IonIcon icon = {shareSocialOutline}></IonIcon>
    //     </div>
        
      

    //     <div className="locaWebTime"  >
    //       <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
            
    //         <IonIcon icon ={locationSharp} className = "icon"></IonIcon>
    //         <p>{"Landau, Terrace rd"} </p>
            
    //       </IonItem>
              
    //       <IonItem  color = " #348D63" lines="none" className="itemBorderTop time" >

    //         <IonIcon icon ={timeSharp} className = "icon"></IonIcon>
    //         <p> Open between {"12:00 - 22:00"} </p>

    //       </IonItem>
            
            
    //       <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >

    //         <IonIcon icon= {earthSharp} className = "icon"></IonIcon>
    //         <p> {"www.cnxjnsdn.co.za"} </p>
            
    //       </IonItem>
    //     </div>
          

    //   </IonContent>
    // </IonPage>




  );
};

export default OverviewFs;