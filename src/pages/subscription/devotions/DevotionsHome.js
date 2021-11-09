import {
  IonCard,
  IonButton,
  IonCardContent,
  IonRouterOutlet,
  IonCardSubtitle,
  IonSkeletonText,
} from "@ionic/react";
import fearless from "../fearless.jpg";
// import Video from "./dummy.mp4"
import "../devotions/Devotions.css";
import { useContext, useEffect, useState } from "react";
import { getDocs, query, collection, where } from "@firebase/firestore";
import { firestoreObj, storage } from "../../../firebase/firebase.js";
import { FiPlayCircle } from "react-icons/fi";
import { ref, getDownloadURL } from "firebase/storage";
import { VideoContext } from "./VideoContext";
import React from "react";
import { useParams } from "react-router";
import { GiNotebook } from "react-icons/gi";

const DevotionsHome = () => {
  const [skeletonLoader, setSkeletonLoader] = useState(
    <div className="ion-padding custom-skeleton">
      <IonSkeletonText
        animated
        style={{ width: "60%", margin: "10px 20%", height: "20vh" }}
      />
      <IonSkeletonText animated />
      <IonSkeletonText animated style={{ width: "60%", margin: "10px 20%" }} />
      <IonSkeletonText animated style={{ width: "70%", margin: "10px 15%" }} />
      <IonSkeletonText animated style={{ width: "88%", margin: "10px 6%" }} />
      <IonSkeletonText
        animated
        style={{ width: "30%", marginLeft: "35%", height: "27px" }}
      />
    </div>
  );
  // dummy list to display 6 dummy videos
  const loop = [1, 2, 3, 4, 5, 6];
  // Store daily devotion
  const [dailyDevotion, setDailyDevotion] = useState({});

  // store sermon videos
  const { videos, playingVideo, setPages, setPlayingVideo } =
    useContext(VideoContext);
  // reload states
  const [load, setLoad] = useState(true);
  const fellowshipId = useParams();

  // expand devotional massage
  function readMore(event) {
    var content = document.getElementById("devotionContent");
    var button = event.target;
    var card = document.getElementById("devotionCard");

    if (button.innerHTML === "Read") {
      card.style.transform = "scale(1.05)";
      card.style.height = "fit-content";
      content.style.height = "fit-content";
      button.innerHTML = "Done";
    } else {
      content.style.height = "11em";
      button.innerHTML = "Read";
      card.style.transform = "scale(1)";
    }
  }

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

  useEffect(() => {
    // Get devotion from firestore

    setDailyDevotion({});
    setInterval(() => {
      setSkeletonLoader(
        <>
          <GiNotebook color="gray" size="3.3em" />
          <div style={{ color: "gray" }}>No sermon found !</div>
        </>
      );
    }, 3000);
    const ref = async () => {
      const dbQuery = query(
        collection(firestoreObj, "devotions"),
        where("fellowshipId", "==", fellowshipId.fellowshipId)
      );
      // put a where query to get corresponding fellowship data and today's date
      var devo = {};
      const queryResult = await getDocs(dbQuery);
      queryResult.forEach((devotion) => {
        devo = devotion.data();
      });
      setDailyDevotion(devo);
    };
    ref();
    setLoad(!load);
  }, [fellowshipId]);

  return (
    <div className="body ">
      <h6>Daily devotions:</h6>
      {dailyDevotion.title ? (
        <IonCard
          className="text-center p-2"
          id="devotionCard"
          color="transparent"
        >
          <div className="devoPic">
            <img src={dailyDevotion.image} alt="Devotional representation" />
            <br />
          </div>
          <div className="massage p-2" id="devotionContent">
            <h3 className="p-0 m-0">{dailyDevotion.title}</h3>
            <p className="p-2">{dailyDevotion.message}</p>
          </div>
          <IonButton color="primary" onClick={(e) => readMore(e)}>
            Read
          </IonButton>
        </IonCard>
      ) : (
        skeletonLoader
      )}
      <h5>Sermons:</h5>
      <div className="">
        {videos &&
          videos.map((video, key) => {
            return (
              <IonCard key={key} className="sermon">
                {/* get video from database */}
                <video
                  controls={true}
                  src={video.url}
                  onMouseEnter={(e) => {
                    startPreview(e);
                  }}
                  onMouseLeave={(e) => {
                    stopPreview(e);
                  }}
                ></video>
                <IonCardSubtitle>
                  <b>{video.title}</b>
                </IonCardSubtitle>
                <IonCardSubtitle>{video.author}</IonCardSubtitle>
                <IonButton
                  color="danger"
                  onClick={() => {
                    handlePlay(video);
                  }}
                >
                  Play
                  <FiPlayCircle />
                </IonButton>
              </IonCard>
            );
          })}
        {videos.length <= 0 && <span>No videos yet!</span>}
      </div>
    </div>
  );
};

export default DevotionsHome;
