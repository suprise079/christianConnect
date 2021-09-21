import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';




import AboutFellowship from './pages/aboutFs/aboutFs';
import FellowshipPhotos from './pages/photosFs/photosFs';
import OverviewFs from './pages/overviewFs/overviewFs';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/aboutFellowship" >
          <AboutFellowship />
        </Route>

        <Route exact path="/FellowshipPhotos" >
          <FellowshipPhotos />
        </Route>

        <Route exact path="/overviewfs" >
          <OverviewFs />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
