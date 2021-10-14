import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import UserHome from './pages/userHome/userHome';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';




import AboutFellowship from './pages/aboutFs/aboutFs';
import FellowshipPhotos from './pages/photosFs/photosFs';
import OverviewFs from './pages/overviewFs/overviewFs';
import ReviewFS from './pages/reviewFs/reviewFs';
import Welcome from './pages/Logins/Welcome/index';
import Login from './pages/Logins/Login';
import SignUpU from './pages/Logins/SignUp/SignUpU';
import Donate from './pages/User/donate/Donate';
import User from './pages/Users/User';
import EditUser from './pages/Users/EditUser';
import Notes from './pages/notes/Notes';
import ViewNote from './pages/notes/ViewNote';
import Donations from './pages/notes/Donations';
import SignUp from './pages/Logins/SignUp';
import Leader from './pages/Leader/Leader';
import EditLeader from './pages/Leader/EditLeader';
import Premium from './pages/Leader/Premium';
import UploadAnnouncement from './pages/Profile/UploadAnnouncement';
import UploadSermon from './pages/Profile/UploadSermons';
import PickerExample from './pages/Profile/UploadEvents';


const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>


        <Route exact path="/"> <Redirect to="/home" /> </Route>

        <Route exact path="/" component={Welcome} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SignUpU" component={SignUpU} />
        <Route exact path="/Donate" component={ Donate } /> 

        {/* user home tab pages */}
        <Route exact path="/userhome"> <UserHome /> </Route>
        <Route exact path="/aboutFellowship" ><AboutFellowship /> </Route>
        <Route exact path="/FellowshipPhotos" > <FellowshipPhotos /> </Route>
        <Route exact path="/overviewfs" > <OverviewFs /> </Route>
        <Route exact path="/reviewsfs" > <ReviewFS /> </Route>

        {/* sanah's pages for the user.... */}
        <Route exact path="/profile" > <User /> </Route>
        {/* edit user page. */}
        <Route exact path="/editprofile" > <EditUser /> </Route>
        {/* get the notes route */}
        <Route exact path="/notes" > <Notes /> </Route>
        {/* the page that shows the notes */}
        <Route exact path="/viewnotes" > <ViewNote /> </Route>
{/* <<<<<<< HEAD:src/App.tsx */}
        {/* get the donations */}
        <Route exact path="/donations" > <Donations /> </Route>
        {/* maybe leader sign up...... */}
        <Route exact path="/SignUp" component={SignUp} />
        {/* leader home page */}
        <Route exact path="/leader" > <Leader /> </Route>
        {/* route to page where leader can edit his details */}
        <Route exact path="/editleader" > <EditLeader /> </Route>
        {/* route to premiun page, where user is a premiun user. */}
        <Route exact path="/premiun" > <Premium /> </Route>
        {/* sign up leader */}
        <Route exact path="/SignUp" component={SignUp} />

        <Route exact path="/uploadAnnouncement" component={UploadAnnouncement} />
        <Route exact path="/uploadSermon" component={UploadSermon} />
        <Route exact path="/uploadEvent" component={PickerExample} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
