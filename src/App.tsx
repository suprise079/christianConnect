import {IonApp } from '@ionic/react';
import TabBar from './tabBar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <IonApp>

    <TabBar />

  </IonApp>
);

export default App;
