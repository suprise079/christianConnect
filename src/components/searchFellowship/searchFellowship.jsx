import { IonButton, IonIcon, IonLabel, IonTabButton
 } from '@ionic/react';

import { 
  home, codeDownload, downloadSharp, download
} from 'ionicons/icons';

import React from 'react'

import './searchFellowship.css';


const SearchFellowship = ( props ) => {


  return (
    <div className="searchFellowship" >
      <div >
        <p className="fellowshipName" > { props.name } </p>
        <p className="subInfo" >
          {/* { "2" + "km " } away */}
          { props.location }
        </p>
        <p className="subInfo" > { props.about } </p>
        <p className="subInfo" > { props.time } </p>
      </div>

      <div className="viewInfo" >
        <IonTabButton href={"/overviewfs?fsid=" + props.fsid } >
          {/* <IonIcon icon={ downloadSharp } ></IonIcon> <br /> */}
          <IonLabel >View</IonLabel>
        </IonTabButton>
      </div>
    </div>
  );

}


export default SearchFellowship;