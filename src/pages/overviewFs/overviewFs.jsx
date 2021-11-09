import {
  IonContent,
  IonIcon,
  IonItem,
  IonSelect,
  IonLabel,
  IonPage,
  IonTitle,
  IonTabBar,
  IonImg,
  IonProgressBar,
} from "@ionic/react";
import "./overviewFs.css";
import Stars from "../../components/starRating/starRating";

//import icons
import {
  shareSocialOutline,
  returnUpForward,
  call,
  bookmarkSharp,
  locationSharp,
  timeSharp,
  earthSharp,
  star,
} from "ionicons/icons";
import { GrAdd } from "react-icons/gr";
import {
  FaArrowLeft,
  FaEllipsisH,
  FaStar,
  FaStarHalf,
  FaStarHalfAlt,
  FaRegStarHalf,
} from "react-icons/fa";

// session management and firebase db
import Cookies from "js-cookie";
import Context from "../../context/Context";

import { Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

// import component
// import NavigateFs from '../../components/navigateFs/navigateFs';
// getFsImg, paste back later was giving me an error
import TopImgFs from "../../components/topImagesFs/topImgFs";
import TopNavBar from "../../components/topNavBar/topNavBar";
import {
  AddReview,
  getFsImg,
  getReviews,
  Subs,
} from "../../firebase/firebase-help";
import { dummyPhoto } from "../../components/helpFunc";
import Session from "../../components/session";

// has, location of fellowship, time, websites, contact details
// able to share to other apps and books marks
const ContactLocAddr = (props) => {
  const { curUser, setCurUser } = useContext(Context);
  const [allFellowships,setAllFellowships] = useState(localStorage.getItem("allFellowships"))

  const subs = () => {
    Subs(Session.getUserId(), props.fsid).then((ref) => {
      if (ref) alert("Subscription Added");
      else {
        alert("Error Adding Subscription");
      }
    });
  };

  useEffect(() => {
    setCurUser(JSON.parse(localStorage.getItem("current")));
  });

  return (
    <>
      <div className="FsButtons">
        {/* <IonIcon icon={returnUpForward}></IonIcon> */}
        {/* call fellowship */}
        {/* <Link to="" href={"tel:" + "" } >
          <IonIcon icon={call}></IonIcon>
        </Link> */}
        {/* subscription button */}
        Subscribe ?{" "}
        <span style={{ textDecoration: "underline" }}>{props.name}</span>
        <IonIcon onClick={(e) => subs()} icon={bookmarkSharp}></IonIcon>
        {/* share fellowship */}
        {/* <IonIcon icon = {shareSocialOutline}></IonIcon> */}
      </div>

      <div className="locaWebTime">
        <IonItem color=" #348D63" lines="none" className="itemBorderTop">
          <IonIcon icon={locationSharp} className="icon"></IonIcon>
          <small style={{ color: "white" }}> {props.location} </small>
        </IonItem>

        {/* <IonItem  color = " #348D63" lines="none" className="itemBorderTop time" >
          <IonIcon icon ={timeSharp} className = "icon"></IonIcon>
          <small> { props.time } </small>
          <div>
            <small>Schedule</small>
            <IonSelect className = "selector" ></IonSelect>
          </div>
        </IonItem> */}
        {/* <IonIcon icon ={locationSharp} id="icon-location"></IonIcon> */}
        {/* <small>{ props.location } </small> */}
        {/* </IonItem> */}

        <IonItem color=" #348D63" lines="none" className="itemBorderTop">
          <IonIcon icon={earthSharp} className="icon"></IonIcon>
          <small> {"www.cnxjnsdn.co.za"} </small>
        </IonItem>
      </div>
    </>
  );
};

// contains the reviews of a fellowship
const ReviewsFs = (props) => {
  const [rateTxt, setRateTxt] = useState();
  const [stars, setStars] = useState(0);
  const {  curUser, setCurUser } = useContext(Context);
  const [curFs, setCurFs] = useState();
  const [show, setShow] = useState(0);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    // get current user data
    setCurUser(JSON.parse(Cookies.get("userData")));

    const url = window.location.search; // get the search part of the local url..
    const usp = new URLSearchParams(url); // make obj used to search params in url
    const fellowshipId = usp.get("fsid"); // get param with the passed name

    setCurFs(
      JSON.parse(Cookies.get("allFellowships")).filter(
        (doc) => doc.id === fellowshipId
      )[0]
    );

    // get all reviews from reviews collections
    getReviews(fellowshipId).then((doc) => {
      if (doc) {
        var rev = doc;
        setReviews(rev);
      } else {
        console.log("ERROR GETTING REVIEWS");
      }
    });
  }, []);

  function addReview() {
    if (stars > 0 && rateTxt) {
    
      AddReview(
        Session.getUserId(),
        curFs?.id,
        stars,
        rateTxt,
        Session.getFirstName(),
        Session.getLastName()
      ).then((res) => {
        if (res) {
          alert("Review Added Successfull");
          setStars(0);
          setRateTxt("");
          // get all reviews from reviews collections
          getReviews(curFs?.id).then((doc) => {
            if (doc) {
              var rev = doc;
              setReviews(rev);
              // console.log("SJKBFKJDBK")
              // console.log( _.sortBy( rev, 'stars' ).reverse() )
              // console.log(
              //   rev.sort((a, b) => a.stars.localeCompare(b.stars))
              // )
            } else {
              console.log("ERROR GETTING REVIEWS");
            }
          });
        } else {
          alert("Error Adding Reviews");
        }
      });
    } else {
      console.error("RATING ERROR: adding review error");
    }
  }

  return (
    <>
      <h4 id="fellow-rev">
        {" "}
        Review{" "}
        <span style={{ textDecoration: "underline" }}>{props.name} </span>{" "}
        fellowship{" "}
      </h4>

      <div id="reviewsFs">
        <div className="rev-item">
          <IonLabel>
            {/* add review container */}
            <h2>Rate and review</h2>

            <div className="add-review">
              {/* star rating stars={ stars } setStars={ setStars } */}
              <Stars hoverValue={stars} setHoverValue={setStars} />
            </div>

            {/* reviews text area */}
            <textarea
              className="reviewTextArea"
              value={rateTxt}
              placeholder="How was your experience?"
              onChange={(e) => setRateTxt(e.target.value)}
            />

            <br />

            {/* add review button */}
            <button onClick={(e) => addReview()} className="reviewBtn">
              Add review
            </button>
          </IonLabel>
        </div>

        <div className="sortBy">
          {" "}
          {/* sort buttons */}
          {/* create functions for them to work */}
          <small>Sort By</small>
          <div id="sortBtn">
            {/* <button className="sort-btn" >Newest</button> */}
            <button className="sort-btn">Highest</button>
            <button className="sort-btn">Lowest</button>
          </div>
        </div>

        <div>
          {/* display reviews from datatbase */}
          <div id="reviews">
            {reviews && reviews?.length > 0 ? (
              reviews?.map((review, ind) => (
                <div className="review" key={ind}>
                  <div style={{ textTransform: "capitalize" }}>
                    <img
                      className="revPic"
                      src={dummyPhoto}
                      alt={review.firstname}
                    />
                    {review.firstname} {review.lastname}
                  </div>

                  <div className="infos">
                    <span> Stars: {review?.stars} </span>
                    <p> {review?.text} </p>
                  </div>
                </div>
              ))
            ) : reviews?.length === 0 ? (
              <h2>
                No Reviews For{" "}
                <span style={{ textDecoration: "underline" }}>
                  {curFs?.name}{" "}
                </span>{" "}
              </h2>
            ) : (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// contains the photo's of a fellowship
const PhotosFs = (props) => {
  const [photos, setPhotos] = useState();

  useEffect(() => {
    getFsImg(props.fsId).then((res) => {
      var fss = res;
      if (fss) {
        // console.log( fss );
        setPhotos(fss);
      } else {
        console.error("Error getting fellowships");
      }
    });
  }, []);

  return (
    <>
      <h3>
        {" "}
        Photos of{" "}
        <span style={{ textDecoration: "underline" }}>{props.name} </span>{" "}
        fellowship{" "}
      </h3>

      <div id="fsImages">
        {photos && photos?.length > 0 ? (
          photos?.map((image, ind) => (
            <img src={image?.photo} key={ind} width="130" alt={props.name} />
          ))
        ) : photos?.length === 0 ? (
          <h2>No FS Images</h2>
        ) : (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        )}
      </div>
    </>
  );
};

// contains the abouts of a fellowship
const AboutFs = (props) => {
  return (
    <>
      <h3 id="fellow-hding" style={{ textAlign: "center" }}>
        About <span style={{ textDecoration: "underline" }}>{props.name} </span>{" "}
        fellowship{" "}
      </h3>
      <div id="fellow-abt" style={{ padding: ".5em" }}>
        {props.aboutFs}
      </div>
    </>
  );
};

const OverviewFs = () => {
  // const { allFellowships } = useContext(Context);
  const [curFs, setCurFs] = useState();
  const [show, setShow] = useState(0);
  const [photos, setPhotos] = useState();
  const [three, setThree] = useState([]);

  useEffect(() => {
    const url = window.location.search; // get the search part of the local url..
    const usp = new URLSearchParams(url); // make obj used to search params in url
    const fsId = usp.get("fsid"); // get param with the passed name
    // console.log( 'URL IS:', fellowshipId ); ///

    // read all fellowships from firebase... get the 1 that matches the in from url
    // it will return an array of one element... get the 1st element of the array
    // and assign to current fellowship[ curFs ] state variable
    // console.log(
    // JSON.parse(Cookies.get("allFellowships")).filter( doc=>doc.id===fellowshipId)[0] )

    getFsImg(fsId).then((res) => {
      var fss = res;
      if (fss) {
        // console.log( fss );
        setPhotos(fss);
        // setThree( three.concat( p ) )
        setThree(fss.filter((p, i) => i < 3));
      } else {
        console.error("Error getting fellowships");
      }
    });

    setCurFs(
      JSON.parse(localStorage.getItem("allFellowships")).filter(
        (doc) => doc.id === fsId
      )[0]
    );
  }, []);

  return (
    <IonPage id="overviewFS">
      <IonContent className="overview" fullscreen>
        <TopNavBar />

        {/* delete this at your own risk */}
        {/* <div className="imagesO" ></div> */}

        <TopImgFs photo={three[0]} photo1={three[1]} photo2={three[2]} />

        <div className="nameFs">
          <p id="fsName"> {curFs?.name} </p>

          {/* <p>
            <h3 id="fsName" > { curFs?.name } </h3>
            <p>
              <i >{"4.2"}</i> <FaStar className = "icon1" />
              <FaStar className = "icon1" />
              <FaStar className = "icon1" />
              <FaStar className = "icon1" />
              <FaStarHalfAlt className = "icon1" /> 
              <i> {"34" } </i> */}
          {/* </p> */}
        </div>

        {/* navigation tab */}
        <div id="navigatorFs">
          <span
            to="#"
            onClick={(e) => setShow(0)}
            className="navFsBtn"
            style={{ borderBottom: show === 0 ? ".2em solid white" : "" }}
          >
            {" "}
            Overview{" "}
          </span>

          <span
            to="#"
            onClick={(e) => setShow(1)}
            className="navFsBtn"
            style={{ borderBottom: show === 1 ? ".2em solid white" : "" }}
          >
            {" "}
            Reviews{" "}
          </span>

          <span
            to="#"
            className="navFsBtn"
            onClick={(e) => setShow(2)}
            style={{ borderBottom: show === 2 ? ".2em solid white" : "" }}
          >
            {" "}
            Photos{" "}
          </span>

          <span
            to="#"
            className="navFsBtn"
            onClick={(e) => setShow(3)}
            style={{ borderBottom: show === 3 ? ".2em solid white" : "" }}
          >
            About{" "}
          </span>
        </div>

        {/* icon buttons */}
        <div>
          {show === 0 ? (
            <ContactLocAddr
              location={curFs?.location}
              time={curFs?.time}
              fsid={curFs?.id}
              name={curFs?.name}
              // user = { curUser }
            />
          ) : show === 1 ? (
            <ReviewsFs name={curFs?.name} />
          ) : show === 2 ? (
            <PhotosFs name={curFs?.name} fsId={curFs?.id} />
          ) : (
            // pass about a fellow details to this components
            <AboutFs aboutFs={curFs?.about} name={curFs?.name} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OverviewFs;
