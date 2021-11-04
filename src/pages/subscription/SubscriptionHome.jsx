import {
  IonContent,
  IonGrid,
  IonRouterOutlet,
  IonRow,
  IonCol,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {FiPlayCircle} from 'react-icons/fi'
import { logoClosedCaptioning, play } from "ionicons/icons";
import church from "./church.jpeg";
import hope from "./hope.jpg";
import mpumi from "./mpumi.jpg";
import "./SubscriptionHome.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import SubscriptionTabs from "./subscriptionTabs.js";
import TabBar from "../../components/tabBar/tabBar";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { firestoreObj, storage } from "../../firebase/firebase";
import React from "react";
import { VideoContext } from "./devotions/VideoContext.js";
import { useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { getDownloadURL, ref } from "@firebase/storage";
import ViewVideos from "./devotions/viewVideos.js";


const Playlist = () => {
  const { videos, playingVideo, setPages, setPlayingVideo } = useContext(VideoContext);

    // preview video on hover
    function startPreview(event) {
      var video = event.target;
      video.muted = false;
      video.currentTime = 1;
      video.playbackRate = 1.5;
      // video.style.transform = 'scale(1.1)'
      video.play();
    }
  
    function stopPreview(event) {
      var video = event.target;
      video.currentTime = 0;
      video.playbackRate = 1;
      // video.style.transform = 'scale(1)'
      video.pause();
    }
  
    function handlePlay(video) {
      setPlayingVideo(video);
      setPages("2");
    }

  return (
    <>
      {videos.map((video) => {
        return (
          <>
            <div className="trackAlign" onClick={() => setPlayingVideo(video)}>
              <div className="videoUrl" onClick={() => setPlayingVideo(video)}>
                <video src={video.url} controls={false}></video>
              </div>
              <div className="videoInfo text-center" onClick={() => setPlayingVideo(video)} style={{width:"100%"}}>
                <b>{video.title}</b><br />
                <IonButton
                  color="danger"
                  expand='block'
                  onClick={() => {
                    handlePlay(video);
                  }}
                >
                  Play
                  <FiPlayCircle />
                </IonButton>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

const Subscriptions = () => {
  // eslint-disable-next-line no-sparse-arrays
  var loop = [1, 2, 3, 4, , 5, 6, 7, 8];
  //use state view for now and later use subscriber list length to determine which view to use
  const [view, setView] = useState(true);
  // fellowships
  const [fellowships, setFellowships] = useState([]);
  
  // store sermon videos
  const [videos, setVideos] = useState([]);
  const fellowshipId = "F0";
  // keep track to which video is playing
  const [playingVideo, setPlayingVideo] = useState({});
  // Router variable for consditional renfering
  const [pages, setPages] = useState("1");

  useEffect(() => {
    // useEffect is already an asynchronous function
    const temp = async () => {
      // temporary array to store queried data
      var storeData = [];
      console.log("useEffect");
      const queryResults = await getDocs(
        collection(firestoreObj, "Fellowships")
      );
      queryResults.forEach((fellowship) => {
        // data adds Id to the data object
        var data = {};
        data["id"] = fellowship.id;
        data["photo"] = fellowship.data().photo;
        data["name"] = fellowship.data().name;
        storeData.push(data);
        console.log(fellowship);
      });
      setFellowships(storeData);
    };
    const effect = async () => {
      var videosArr = [];
      const dbQuery = query(
        collection(firestoreObj, "videos"),
        limit(10)
      );
      const queryResults = await getDocs(dbQuery);
      queryResults.forEach((video) => {
        // Add an ID to video data
        var data = video.data();
        data["id"] = video.id;
        videosArr.push(data);
      });
      console.log("videos before lik: ", videosArr);
      // get videos from firebase storage
      videosArr.map(async (video) => {
        const videosRef = ref(
          storage,"videos/" + video.storageName
        );
        await getDownloadURL(videosRef)
          .then((url) => {
            // add url to video data
            var data = video;
            data["url"] = url;
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      });
      setVideos(videosArr);
    };
    effect();
    temp();


  }, []);


  return (
    <>
      {view && (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="headerTitle" size="large">
                Subscriptions
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="body" style={{ overflowY: "scroll" }}>
            <IonGrid>
              <div className="scrollSubscriptions">
                {/* show only ten and find the rest in view all */}
                {console.log("fellowships", fellowships)}
                <IonRow class="ion-justify-content-start">
                  {fellowships.map((fellowship, key) => {
                    var url = "/subscription/" + fellowship.id;
                    console.log("row", key);

                    return (
                      <>
                        <IonCol size="2" id={fellowship.id}>
                          <Link to={url}>
                            <img
                              className="highlightImg"
                              src={hope}
                              // src={fellowship.photo}
                              alt={`${fellowship.name}`}
                            />
                            {fellowship.name}
                          </Link>
                        </IonCol>
                      </>
                    );
                  })}

                  </IonRow>
              </div>
              {fellowships.length > 2 ? (
                <button
                  id="viewAll"
                  onClick={() => {
                    setView(false);
                  }}
                >
                  <FiExternalLink size="24px" />
                </button>
              ) : (
                ""
              )}
            </IonGrid>

            {/* <IonButton color='favorite'>View all</IonButton> */}

            {/* random videos */}
            <VideoContext.Provider value={{ videos, playingVideo,pages, setPages, setPlayingVideo }}>
              <br />
             <div style={{clear:"both"}}>
              {pages === "1" && <Playlist />}
              {pages === "2" && <ViewVideos />}
             </div>
            </VideoContext.Provider>
          </IonContent>
          <div style={{ height: "58px", background: "#348d63" }}></div>
        </IonPage>
      )}

      {/* view all subscriptions */}
      {!view && (
        <IonPage>
          <IonHeader>
            <div className="toolbar">
              <span className="backButton" onClick={() => setView(!view)}>
                <IoMdArrowBack size="2em" />
              </span>
              <IonTitle className="headerTitle" size="large">
                Subscriptions
              </IonTitle>
            </div>
          </IonHeader>
          <IonContent className="fellowshipsContainer">
            {fellowships.map((fellowship) => {
              return (
                <Link
                  style={{ color: "black" }}
                  to={`/subscription/" ${fellowship.id}`}
                >
                  <div className="fellowship">
                    <img src={hope} alt="fellowship profile" />
                    <h4>{fellowship.name}</h4>
                  </div>
                </Link>
              );
            })}
          </IonContent>
          <div style={{ height: "56px" }} className="spacer"></div>
        </IonPage>
      )}
      {console.log("sub home finished rendering")}
    </>
  );
};

const SubscriptionHome = () => {
  return (
    <>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            exact
            path="/subscription/:fellowshipId"
            component={SubscriptionTabs}
          />

          {/* <Route exact path="/SubscriptionHome"> */}
          <Route exact path="/SubscriptionHome">
            <Subscriptions />
          </Route>

          {/* <Route exact path="/tab3">
              <Tab3 />
            </Route> */}
        </IonRouterOutlet>
        {/* the button component tab bar for navigation */}
      </IonReactRouter>
      <TabBar />
    </>
  );
};

export default SubscriptionHome;

// make a function that add two num
