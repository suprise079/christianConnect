import { IonTabBar, IonTabButton, IonIcon, IonLabel
 } from '@ionic/react';



import { home, mail, person } from 'ionicons/icons';


import React from 'react';

import './tabBar.css'; // import css


const TabBar: React.FC = () => {

  return (
    <div className="tabBarContainer" >
      <IonTabBar >
          {/* href="/home" */}
          <IonTabButton >
            <IonIcon icon={ home } ></IonIcon>
            <IonLabel >Home</IonLabel>
          </IonTabButton>
          {/* href="/subscription" */}
          <IonTabButton >
            <IonIcon icon={ mail } ></IonIcon>
            <IonLabel >Subscription</IonLabel>
          </IonTabButton>
          {/* href="/" */}
          <IonTabButton >
            <IonIcon icon={ person } ></IonIcon>
            <IonLabel >Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </div>
  );
}

export default TabBar;