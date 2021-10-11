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


const App: React.FC = () => (
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
        {/* get the donations */}
        <Route exact path="/donations" > <Donations /> </Route>
        {/* maybe leader sign up...... */}
        <Route exact path="/SignUp" component={SignUp} />
        


        {/* <Route exact path="/UploadAnnouncement" component={UploadAnnouncement} /> */}
        {/* <Route exact path="/UploadSermon" component={UploadSermon} /> */}
        {/* <Route exact path="/UploadEvent" component={PickerExample} /> */}
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
