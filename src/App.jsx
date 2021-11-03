import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useState } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

// firebase

// context for state handling
import Context from "./context/Context";


import AboutFellowship from "./pages/aboutFs/aboutFs";
import FellowshipPhotos from "./pages/photosFs/photosFs";
import OverviewFs from "./pages/overviewFs/overviewFs";
import ReviewFS from "./pages/reviewFs/reviewFs";
import Welcome from "./pages/Logins/Welcome/index";
import Login from "./pages/Logins/Login";
import Donate from "./pages/User/donate/Donate";
import Profile from "./pages/Users/Profile";
import EditUser from "./pages/Users/EditUser";
import Notes from "./pages/notes/Notes";
import ViewNote from "./pages/notes/ViewNote";
import Donations from "./pages/notes/Donations";
import SignUp from "./pages/Logins/SignUp";
import Leader from "./pages/Leader/Leader";
import EditLeader from "./pages/Leader/EditLeader";
import Premium from "./pages/Leader/Premium";
import UploadAnnouncement from "./pages/Profile/UploadAnnouncement";
import UploadSermon from "./pages/Profile/UploadSermons";
import PickerExample from "./pages/Profile/UploadEvents";
import SavedVideos from "./pages/User/savedVideos/savedVideos";
import SubscriptionHome from "./pages/subscription/SubscriptionHome"
import NoteContent from "./pages/notes/NoteContent";
import UserHome from "./pages/userHome/userHome";




const App = () => {
  // check if the user is logged in
  var [ isLoggedIn, setIsLoggedIn ] = useState(false);
  var [ curUser, setCurUser ] = useState();
  var [ fellowship, setFellowship ] = useState();
  const [ allFellowships, setAllFellowships ] = useState();


  return (
    <Context.Provider value={{
      curUser, setCurUser,
      isLoggedIn, setIsLoggedIn,
      fellowship, setFellowship,
      allFellowships, setAllFellowships
      }}>
      
     

      <IonApp>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
        <IonReactRouter>
          <IonRouterOutlet>
            
            <Route exact path="/">
              {" "}
              <Redirect to="/home" />{" "}
            </Route>

            <Route exact path="/" component={Welcome} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Donate" component={Donate} />
            <Route exact path="/savedVideos" component={SavedVideos} />
            <Route exact path="/addnote" component={ NoteContent } />



            {/* get the notes route */}
            <Route exact path="/notes"
              // component={Notes}
            >
              <Notes />
            </Route>


            
            {/* user home tab pages */}
            <Route exact path="/userhome" component={UserHome} />



            <Route exact path="/aboutFellowship">
              <AboutFellowship />{" "}
            </Route>
            <Route exact path="/FellowshipPhotos">
              {" "}
              <FellowshipPhotos />{" "}
            </Route>
            <Route exact path="/overviewfs">
              {" "}
              <OverviewFs />{" "}
            </Route>
            <Route exact path="/reviewsfs">
              {" "}
              <ReviewFS />{" "}
            </Route>

            {/* sanah's pages for the user.... */}
            <Route exact path="/profile">
              {" "}
              <Profile />{" "}
            </Route>
            {/* edit user page. */}
            <Route exact path="/editprofile">
              <EditUser />{" "}
            </Route>

            {/* the page that shows the notes */}
            <Route exact path="/viewnotes">
              {" "}
              <ViewNote />{" "}
            </Route>

            {/* get the donations */}
            <Route exact path="/donations">
              {" "}
              <Donations />{" "}
            </Route>
            {/* maybe leader sign up...... */}
            <Route exact path="/SignUp" component={SignUp} />
            {/* leader home page */}
            <Route exact path="/leader" component={Leader} />
            {/* route to page where leader can edit his details */}
            <Route exact path="/editleader">
              {" "}
              <EditLeader />{" "}
            </Route>
            {/* route to premium page, where user is a premium user. */}
            <Route exact path="/premium">
              <Premium />
            </Route>
            {/* sign up leader */}
            <Route exact path="/SignUp" component={SignUp} />

            <Route exact path="/uploadAnnouncement" component={UploadAnnouncement} />
            <Route exact path="/uploadSermon" component={UploadSermon} />
            <Route exact path="/uploadEvent" component={PickerExample} />


            {/* Subscription Home page */}
            <Route exact path="/SubscriptionHome">
              <SubscriptionHome />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context.Provider>
  );
};

export default App;
