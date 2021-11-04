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
import { collection, getDocs } from "@firebase/firestore";
import { firestoreObj } from "../../firebase/firebase";

import { IoMdArrowBack } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";

const Subscriptions = () => {
  // eslint-disable-next-line no-sparse-arrays
  var loop = [1, 2, 3, 4, , 5, 6, 7, 8];
  //use state view for now and later use subscriber list length to determine which view to use
  const [view, setView] = useState(true);
  // fellowships
  const [fellowships, setFellowships] = useState([]);

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
                              alt={`${fellowship.id}`}
                            />
                            {/* {fellowship.name} */}
                          </Link>
                        </IonCol>

                        {/* <IonCol id={fellowship.id}>
                          <Link to={url}>
                            <img
                              className="highlightImg"
                              src={fellowship.photo}
                              alt="fellow1"
                            />
                            <br />
                            Hope fellowship
                          </Link>
                        </IonCol>
                        <IonCol id={fellowship.id}>
                          <Link to={url}>
                            <img
                              className="highlightImg"
                              src={fellowship.photo}
                              alt="fellow1"
                            />
                            <br />
                            Hope fellowship
                          </Link>
                        </IonCol> */}
                      </>
                    );
                  })}

                  {/* <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol> */}
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

            {loop.map((announcement) => {
              return (
                <div className="ann-container">
                  {/* image */}
                  <img className="announceImg" src={hope} alt="announcement" />
                  {/* content */}
                  <div className="announceContent">
                    <h4>Gents Night</h4>
                    <h6>Mpumelelo Prayer Meeting</h6>
                    {/* button */}
                    <IonButton size="small" color="btn" className="btn p-1">
                      {" "}
                      Set Reminder{" "}
                    </IonButton>
                  </div>
                </div>
              );
            })}
          </IonContent>
          <div style={{ height: "58px", background: "#348d63" }}></div>
        </IonPage>
      )}
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
          <div style={{height:"56px"}} className="spacer"></div>
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
