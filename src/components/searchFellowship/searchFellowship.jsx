import { IonButton, IonIcon, IonLabel, IonTabButton
 } from '@ionic/react';

import { 
  home, codeDownload, downloadSharp, download
} from 'ionicons/icons';

import React, { useContext, useEffect } from 'react'

// for data management and firebase
import Cookies from 'js-cookie';
import Context from '../../context/Context';

import './searchFellowship.css';


const SearchFellowship = ( props ) => {
  const { allFellowships } = useContext( Context );

  function summary( t ) {
    if( t ) return t.split(" ").splice(0, 4).join(" ") + " ........"
  }

  return (
    <div className="searchFellowship" >
      <div className="info" >
        <p className="fellowshipName" > { props.name } </p>
        <p className="subInfo" >
          {/* { "2" + "km " } away */} { props.location }
        </p>
        <p className="subInfo" > { summary( props.about ) } </p>
        <p className="subInfo" > { props.time } </p>
      </div>

      <div className="viewInfo" >

        <IonTabButton
          // onClick={ e => fs() }
          href={"/overviewfs?fsid=" + props.fsid } >
          {/* <IonIcon icon={ downloadSharp } ></IonIcon> <br /> */}
          <IonLabel >View</IonLabel>
        </IonTabButton>
      </div>
    </div>
  );

}


export default SearchFellowship;