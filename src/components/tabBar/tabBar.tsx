import { IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/react';
import { home, mail, person, shareSocialOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
// impor } from 'react-icons/hi';

import React from 'react';

import './tabBar.css'; // import css


const TabBar: React.FC = () => {

  return (
    <div className="tabBarContainer" >
      <div >
        {/* <IonIcon icon={ home } ></IonIcon> */}
        <i > <FaHome /> </i> 
        <IonLabel className="label" > Home </IonLabel>
      </div>

      <div >
        <i >
          <IonIcon icon={ mail } ></IonIcon>
        </i>
        
        <IonLabel className="label" > Subscription </IonLabel>
      </div>

      <div >
        <i >
          <IonIcon icon={ person } ></IonIcon>
        </i>
        <IonLabel className="label" > Profile </IonLabel>
      </div>
    </div>
  );
}

export default TabBar;




{/* <IonTabBar > */}
  {/* href="/home" */}
  // <IonTabButton >
    {/* <button > */}
      // <IonIcon icon={
        //  home} ></IonIcon>
      // <IonLabel >Home</IonLabel>
    {/* </button> */}
  // </IonTabButton>

  {/* href="/subscription" */}
  // <IonTabButton >
    // <IonIcon icon={ 
      // mail } ></IonIcon>
    // <IonLabel >Subscription</IonLabel>
  // </IonTabButton>

  {/* href="/" */}
  // <IonTabButton >
    // <IonIcon icon={ 
      // person } ></IonIcon>
    // <IonLabel >Profile</IonLabel>
  // </IonTabButton>
// </IonTabBar>