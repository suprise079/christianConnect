import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums, home, person } from 'ionicons/icons';

import Tab2 from './pages/Tab2';
import './pages/Tab2.css';
import './tabBar.css';

const TabBar: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          {/* <Route exact path="/tab1">
            <Tab1 />
          </Route> */}
          
          <Route exact path="/tab2">
            <Tab2 />
          </Route>

          {/* <Route exact path="/tab3">
            <Tab3 />
          </Route> */}
          
        </IonRouterOutlet>

        <IonTabBar color='favorite' slot="bottom">
          {/* home button */}
          <IonTabButton  >
            <IonIcon icon={home} color='tabBtn' />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          {/* subscription button */}
          <IonTabButton  tab="tab2" href="/tab2">
            <IonIcon icon={albums} color='tabBtn' />
            <IonLabel>Subscription</IonLabel>
          </IonTabButton>
          {/* profile button */}
          <IonTabButton  >
            <IonIcon icon={person} color='tabBtn' />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default TabBar;
