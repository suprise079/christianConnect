import {
  IonContent,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonPage,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  getPlatforms,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./Announcements.css";
// import {Calendar} from '@ionic-native/calendar';
// firebase real time database
import { firestoreObj } from "../../../firebase/firebase.js";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useParams } from "react-router";
import { MdAnnouncement } from "react-icons/md";

const Announce = () => {
  // check if there are announcements found
  const [found, setFound] = useState(false);
  // List of announcements
  const [announcements, setAnnouncements] = useState([]);
  // currently selected fellowship
  const fellowshipId = useParams();
  console.log("fellowshipId: ", fellowshipId.fellowshipId);

  useEffect(() => {
    const effect = async () => {
      // get announcements
      // temporary array to store queryed data
      var storeData = [];
      const dbQuery = query(
        collection(firestoreObj, "announcements"),
        where("fellowshipId", "==", fellowshipId.fellowshipId)
      );
      const queryResults = await getDocs(dbQuery);
      queryResults.forEach((event) => {
        // data adds Id to the data object
        var data = {};
        data["id"] = event.id;
        data["title"] = event.data().title;
        data["content"] = event.data().text;
        data["date"] = event.data().time.toDate().toString().substring(0, 15);
        storeData.push(data);
        setFound(true);
      });
      setAnnouncements(storeData);
    };
    effect();
  }, [fellowshipId.fellowshipId]);

  function readMore(event, cardId, contentId) {
    var card = document.getElementById(cardId);
    var content = document.getElementById(contentId);
    var button = event.target;

    if (button.innerHTML == "More Info") {
      card.style.transform = "scale(1.05)";
      content.style.height = "fit-content";
      button.innerHTML = "Done";
    } else {
      card.style.transform = "scale(1)";
      content.style.transition = "height 5s";
      content.style.height = "5em";
      button.innerHTML = "More Info";
    }
  }

  // console.log(Calendar.requestReadWritePermission())
  // function setReminder(){
  //   Calendar.hasReadWritePermission().then((data) => {
  //     console.log(data)
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })
  // }

  return (
    <>
      {found && (
        <IonList id="listAnnocement">
          {announcements.map((annocemnet) => {
            var id = annocemnet.id.toString();
            return (
              <IonCard key={annocemnet.id} id={"card" + id} className="p-2">
                <IonCardTitle className="text-center m-0 p-0">
                  {annocemnet.title}
                </IonCardTitle>
                <IonCardContent
                  className="text-center m-0 p-1 summary"
                  id={"content" + id}
                >
                  {annocemnet.content}
                </IonCardContent>
                <div className="timeBtn">
                  <IonCardSubtitle>{annocemnet.date}</IonCardSubtitle>
                  <IonButton
                    className="p-1"
                    style={{ backgroundColor: "CBF8FF" }}
                    onClick={(e) => {
                      readMore(e, "card" + id, "content" + id);
                    }}
                  >
                    More Info
                  </IonButton>
                </div>
              </IonCard>
            );
          })}
        </IonList>
      )}
      {!found && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{textAlign:"center"}}>No Announcement found !<br/>Come back later.</div>
          <MdAnnouncement color="lightgray" size="72px" />
        </div>
      )}
    </>
  );
};

export default Announce;
