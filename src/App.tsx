import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums } from 'ionicons/icons';
import Tab2 from './pages/Tab2';
import './pages/Tab2.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          
          
        </IonRouterOutlet>
        <IonTabBar color='favorite' slot="bottom">
          <IonTabButton  tab="tab2" href="/tab2">
            <IonIcon icon={albums} />
            <IonLabel>Subscription</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
