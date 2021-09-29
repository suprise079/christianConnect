import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums, home, person } from 'ionicons/icons';

import SubscriptionHome from './pages/subscription/SubscriptionHome';
import '../src/pages/subscription/SubscriptionHome.css';
import './tabBar.css';
import SubscriptionTabs from './pages/subscription/SubscriptionTabs.jsx';

const TabBar: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/tab1">
            <SubscriptionTabs />
          </Route>
          
          <Route exact path="/tab2">
            <SubscriptionHome />
          </Route>

          {/* <Route exact path="/tab3">
            <Tab3 />
          </Route> */}
          
        </IonRouterOutlet>

        <IonTabBar color='favorite' slot="bottom">
          {/* home button */}
          <IonTabButton tab="tab1" href="/tab1" >
            <IonIcon icon={home} color='tabBtn' />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          {/* subscription button */}
          <IonTabButton  tab="subscriptionHome" href="/SubscriptionHome">
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
